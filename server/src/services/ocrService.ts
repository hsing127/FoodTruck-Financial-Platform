import {
  TextractClient,
  AnalyzeDocumentCommand,
  DetectDocumentTextCommand,
} from "@aws-sdk/client-textract";

const textractClient = new TextractClient({
  region: process.env.AWS_REGION || "ca-central-1",
});

export interface OCRRequest {
  documentBase64: string;
  documentType?: "receipt" | "invoice" | "document";
}

export class OCRService {
  // From API_rawTextract.py
  async extractTextFromDocument(data: OCRRequest) {
    try {
      const { documentBase64, documentType = "receipt" } = data;

      // Convert base64 to buffer
      const documentBuffer = Buffer.from(documentBase64, "base64");

      let command;

      if (documentType === "receipt" || documentType === "invoice") {
        // Use AnalyzeDocument for structured data extraction
        command = new AnalyzeDocumentCommand({
          Document: {
            Bytes: documentBuffer,
          },
          FeatureTypes: ["TABLES", "FORMS"],
        });
      } else {
        // Use DetectDocumentText for simple text extraction
        command = new DetectDocumentTextCommand({
          Document: {
            Bytes: documentBuffer,
          },
        });
      }

      const response = await textractClient.send(command);

      if (documentType === "receipt" || documentType === "invoice") {
        return this.parseReceiptData(response);
      } else {
        return this.parseSimpleText(response);
      }
    } catch (error) {
      console.error("Textract error:", error);
      throw new Error("Failed to extract text from document");
    }
  }

  // Parse receipt/invoice data with structured information
  private parseReceiptData(response: any) {
    const blocks = response.Blocks || [];
    const result = {
      rawText: "",
      lines: [] as string[],
      keyValuePairs: {} as any,
      tables: [] as any[],
      totalAmount: null as number | null,
      vendor: null as string | null,
      date: null as string | null,
      items: [] as any[],
    };

    // Extract all text blocks
    const textBlocks = blocks.filter(
      (block: any) => block.BlockType === "LINE"
    );
    result.lines = textBlocks.map((block: any) => block.Text);
    result.rawText = result.lines.join("\n");

    // Extract key-value pairs
    const keyValueBlocks = blocks.filter(
      (block: any) => block.BlockType === "KEY_VALUE_SET"
    );
    keyValueBlocks.forEach((block: any) => {
      if (block.EntityTypes && block.EntityTypes.includes("KEY")) {
        const key = this.getTextFromBlock(block, blocks);
        const valueBlock = this.findValueForKey(block, blocks);
        if (valueBlock) {
          const value = this.getTextFromBlock(valueBlock, blocks);
          result.keyValuePairs[key] = value;
        }
      }
    });

    // Extract tables
    const tableBlocks = blocks.filter(
      (block: any) => block.BlockType === "TABLE"
    );
    result.tables = tableBlocks.map((table: any) =>
      this.parseTable(table, blocks)
    );

    // Try to extract common receipt information
    result.totalAmount = this.extractTotalAmount(result.rawText);
    result.vendor = this.extractVendor(result.rawText);
    result.date = this.extractDate(result.rawText);
    result.items = this.extractItems(result.rawText, result.tables);

    return result;
  }

  // Parse simple text extraction
  private parseSimpleText(response: any) {
    const blocks = response.Blocks || [];
    const textBlocks = blocks.filter(
      (block: any) => block.BlockType === "LINE"
    );
    const lines = textBlocks.map((block: any) => block.Text);

    return {
      rawText: lines.join("\n"),
      lines: lines,
      confidence: this.calculateAverageConfidence(blocks),
    };
  }

  private getTextFromBlock(block: any, allBlocks: any[]): string {
    if (block.Text) return block.Text;

    if (block.Relationships) {
      const childRelationship = block.Relationships.find(
        (rel: any) => rel.Type === "CHILD"
      );
      if (childRelationship) {
        const childTexts = childRelationship.Ids.map((id: string) => {
          const childBlock = allBlocks.find((b: any) => b.Id === id);
          return childBlock ? childBlock.Text || "" : "";
        });
        return childTexts.join(" ");
      }
    }

    return "";
  }

  private findValueForKey(keyBlock: any, allBlocks: any[]): any {
    if (!keyBlock.Relationships) return null;

    const valueRelationship = keyBlock.Relationships.find(
      (rel: any) => rel.Type === "VALUE"
    );
    if (valueRelationship && valueRelationship.Ids.length > 0) {
      return allBlocks.find(
        (block: any) => block.Id === valueRelationship.Ids[0]
      );
    }

    return null;
  }

  private parseTable(tableBlock: any, allBlocks: any[]): any {
    const table = {
      rows: [] as any[],
    };

    if (!tableBlock.Relationships) return table;

    const cellRelationship = tableBlock.Relationships.find(
      (rel: any) => rel.Type === "CHILD"
    );
    if (!cellRelationship) return table;

    const cells = cellRelationship.Ids.map((id: string) =>
      allBlocks.find((block: any) => block.Id === id)
    ).filter(Boolean);

    // Group cells by row
    const rowMap = new Map();
    cells.forEach((cell: any) => {
      if (cell.BlockType === "CELL") {
        const rowIndex = cell.RowIndex;
        if (!rowMap.has(rowIndex)) {
          rowMap.set(rowIndex, []);
        }
        rowMap.get(rowIndex).push({
          columnIndex: cell.ColumnIndex,
          text: this.getTextFromBlock(cell, allBlocks),
          confidence: cell.Confidence,
        });
      }
    });

    // Convert to sorted rows
    Array.from(rowMap.keys())
      .sort()
      .forEach((rowIndex) => {
        const rowCells = rowMap
          .get(rowIndex)
          .sort((a: any, b: any) => a.columnIndex - b.columnIndex);
        table.rows.push(rowCells.map((cell: any) => cell.text));
      });

    return table;
  }

  private extractTotalAmount(text: string): number | null {
    // Common patterns for total amounts
    const patterns = [
      /total[:\s]+\$?(\d+\.?\d*)/i,
      /amount[:\s]+\$?(\d+\.?\d*)/i,
      /\$(\d+\.?\d*)\s*total/i,
      /grand\s+total[:\s]+\$?(\d+\.?\d*)/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return parseFloat(match[1]);
      }
    }

    return null;
  }

  private extractVendor(text: string): string | null {
    // Extract the first line which often contains vendor name
    const lines = text.split("\n");
    if (lines.length > 0) {
      const firstLine = lines[0].trim();
      if (firstLine.length > 0 && firstLine.length < 50) {
        return firstLine;
      }
    }
    return null;
  }

  private extractDate(text: string): string | null {
    // Common date patterns
    const patterns = [
      /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
      /(\d{1,2}-\d{1,2}-\d{2,4})/,
      /(\d{4}-\d{1,2}-\d{1,2})/,
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{1,2},?\s+\d{2,4}/i,
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1] || match[0];
      }
    }

    return null;
  }

  private extractItems(text: string, tables: any[]): any[] {
    const items: any[] = [];

    // Try to extract from tables first
    tables.forEach((table) => {
      if (table.rows.length > 1) {
        // Skip header row
        table.rows.slice(1).forEach((row: string[]) => {
          if (row.length >= 2) {
            const item = {
              description: row[0],
              amount: this.extractNumberFromString(row[row.length - 1]),
            };
            if (item.description && item.amount !== null) {
              items.push(item);
            }
          }
        });
      }
    });

    // If no items from tables, try to extract from text patterns
    if (items.length === 0) {
      const lines = text.split("\n");
      lines.forEach((line) => {
        const match = line.match(/(.+?)\s+\$?(\d+\.?\d*)/);
        if (match) {
          items.push({
            description: match[1].trim(),
            amount: parseFloat(match[2]),
          });
        }
      });
    }

    return items;
  }

  private extractNumberFromString(str: string): number | null {
    const match = str.match(/\$?(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : null;
  }

  private calculateAverageConfidence(blocks: any[]): number {
    const confidenceBlocks = blocks.filter(
      (block: any) => block.Confidence !== undefined
    );
    if (confidenceBlocks.length === 0) return 0;

    const totalConfidence = confidenceBlocks.reduce(
      (sum: number, block: any) => sum + block.Confidence,
      0
    );
    return totalConfidence / confidenceBlocks.length;
  }

  // Process receipt and add to database
  async processReceiptForUser(email: string, documentBase64: string) {
    try {
      const ocrResult = await this.extractTextFromDocument({
        documentBase64,
        documentType: "receipt",
      });

      // Here you could add logic to automatically populate purchase records
      // based on the extracted receipt data

      return {
        message: "Receipt processed successfully",
        extractedData: ocrResult,
        suggestions: {
          vendor: ocrResult.vendor,
          totalAmount: ocrResult.totalAmount,
          date: ocrResult.date,
          items: ocrResult.items,
        },
      };
    } catch (error) {
      console.error("Error processing receipt:", error);
      throw new Error("Failed to process receipt");
    }
  }
}

export const ocrService = new OCRService();
