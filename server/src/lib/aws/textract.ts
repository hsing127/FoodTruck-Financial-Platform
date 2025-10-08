import { textract, TEXTRACT_CONFIG } from "../../config/aws";
import { OCRResult, OCRExtractedData } from "../../types";
import { v4 as uuidv4 } from "uuid";

export class TextractService {
  /**
   * Start document text detection job
   */
  async startDocumentTextDetection(
    s3Key: string,
    bucketName: string
  ): Promise<string> {
    try {
      const params = {
        DocumentLocation: {
          S3Object: {
            Bucket: bucketName,
            Name: s3Key,
          },
        },
        JobTag: `textract-${uuidv4()}`,
        OutputConfig: {
          S3Bucket: TEXTRACT_CONFIG.outputConfig.S3Bucket,
          S3Prefix: TEXTRACT_CONFIG.outputConfig.S3Prefix,
        },
      };

      const result = await textract
        .startDocumentTextDetection(params)
        .promise();
      return result.JobId!;
    } catch (error) {
      console.error("Textract start job error:", error);
      throw new Error(`Failed to start Textract job: ${error.message}`);
    }
  }

  /**
   * Start document analysis job (with tables and forms)
   */
  async startDocumentAnalysis(
    s3Key: string,
    bucketName: string
  ): Promise<string> {
    try {
      const params = {
        DocumentLocation: {
          S3Object: {
            Bucket: bucketName,
            Name: s3Key,
          },
        },
        FeatureTypes: TEXTRACT_CONFIG.featureTypes,
        JobTag: `textract-analysis-${uuidv4()}`,
        OutputConfig: {
          S3Bucket: TEXTRACT_CONFIG.outputConfig.S3Bucket,
          S3Prefix: TEXTRACT_CONFIG.outputConfig.S3Prefix,
        },
      };

      const result = await textract.startDocumentAnalysis(params).promise();
      return result.JobId!;
    } catch (error) {
      console.error("Textract start analysis error:", error);
      throw new Error(`Failed to start Textract analysis: ${error.message}`);
    }
  }

  /**
   * Get document text detection results
   */
  async getDocumentTextDetection(jobId: string): Promise<any> {
    try {
      const params = { JobId: jobId };
      const result = await textract.getDocumentTextDetection(params).promise();
      return result;
    } catch (error) {
      console.error("Textract get results error:", error);
      throw new Error(`Failed to get Textract results: ${error.message}`);
    }
  }

  /**
   * Get document analysis results
   */
  async getDocumentAnalysis(jobId: string): Promise<any> {
    try {
      const params = { JobId: jobId };
      const result = await textract.getDocumentAnalysis(params).promise();
      return result;
    } catch (error) {
      console.error("Textract get analysis error:", error);
      throw new Error(`Failed to get Textract analysis: ${error.message}`);
    }
  }

  /**
   * Synchronous document text detection (for small documents)
   */
  async detectDocumentText(s3Key: string, bucketName: string): Promise<any> {
    try {
      const params = {
        Document: {
          S3Object: {
            Bucket: bucketName,
            Name: s3Key,
          },
        },
      };

      const result = await textract.detectDocumentText(params).promise();
      return result;
    } catch (error) {
      console.error("Textract detect text error:", error);
      throw new Error(`Failed to detect document text: ${error.message}`);
    }
  }

  /**
   * Synchronous document analysis (for small documents)
   */
  async analyzeDocument(s3Key: string, bucketName: string): Promise<any> {
    try {
      const params = {
        Document: {
          S3Object: {
            Bucket: bucketName,
            Name: s3Key,
          },
        },
        FeatureTypes: TEXTRACT_CONFIG.featureTypes,
      };

      const result = await textract.analyzeDocument(params).promise();
      return result;
    } catch (error) {
      console.error("Textract analyze document error:", error);
      throw new Error(`Failed to analyze document: ${error.message}`);
    }
  }

  /**
   * Process receipt specifically (extract receipt data)
   */
  async processReceipt(
    s3Key: string,
    bucketName: string
  ): Promise<OCRExtractedData> {
    try {
      const result = await this.analyzeDocument(s3Key, bucketName);
      return this.extractReceiptData(result);
    } catch (error) {
      console.error("Receipt processing error:", error);
      throw new Error(`Failed to process receipt: ${error.message}`);
    }
  }

  /**
   * Extract structured data from Textract result
   */
  private extractReceiptData(textractResult: any): OCRExtractedData {
    const extractedData: OCRExtractedData = {
      items: [],
      rawData: textractResult,
    };

    try {
      const blocks = textractResult.Blocks || [];

      // Extract text blocks
      const textBlocks = blocks.filter(
        (block: any) => block.BlockType === "LINE"
      );
      const allText = textBlocks.map((block: any) => block.Text).join(" ");

      // Extract vendor information
      extractedData.vendor = this.extractVendor(textBlocks);

      // Extract date
      extractedData.date = this.extractDate(textBlocks);

      // Extract total amount
      extractedData.total = this.extractTotal(textBlocks);

      // Extract tax
      extractedData.tax = this.extractTax(textBlocks);

      // Extract line items
      extractedData.items = this.extractItems(textBlocks);

      // Extract tables if available
      const tables = blocks.filter((block: any) => block.BlockType === "TABLE");
      if (tables.length > 0) {
        extractedData.items = [
          ...(extractedData.items || []),
          ...this.extractTableItems(tables, blocks),
        ];
      }
    } catch (error) {
      console.error("Data extraction error:", error);
    }

    return extractedData;
  }

  /**
   * Extract vendor name from text blocks
   */
  private extractVendor(textBlocks: any[]): string | undefined {
    // Look for vendor name in first few lines
    const firstFewLines = textBlocks.slice(0, 5);
    for (const block of firstFewLines) {
      const text = block.Text;
      // Skip common receipt headers
      if (!text.match(/(receipt|invoice|order|sale|transaction)/i)) {
        // Return the first non-header line that looks like a business name
        if (text.length > 3 && !text.match(/^\d+$/)) {
          return text.trim();
        }
      }
    }
    return undefined;
  }

  /**
   * Extract date from text blocks
   */
  private extractDate(textBlocks: any[]): Date | undefined {
    for (const block of textBlocks) {
      const text = block.Text;
      // Common date patterns
      const datePatterns = [
        /\d{1,2}\/\d{1,2}\/\d{2,4}/,
        /\d{1,2}-\d{1,2}-\d{2,4}/,
        /\d{4}-\d{1,2}-\d{1,2}/,
        /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},?\s+\d{2,4}/i,
      ];

      for (const pattern of datePatterns) {
        const match = text.match(pattern);
        if (match) {
          const date = new Date(match[0]);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Extract total amount from text blocks
   */
  private extractTotal(textBlocks: any[]): number | undefined {
    const totalPatterns = [
      /total[:\s]*\$?(\d+\.?\d*)/i,
      /amount[:\s]*\$?(\d+\.?\d*)/i,
      /\$(\d+\.?\d*)\s*total/i,
    ];

    for (const block of textBlocks) {
      const text = block.Text;
      for (const pattern of totalPatterns) {
        const match = text.match(pattern);
        if (match) {
          const amount = parseFloat(match[1]);
          if (!isNaN(amount)) {
            return amount;
          }
        }
      }
    }

    // Fallback: look for largest dollar amount
    let maxAmount = 0;
    for (const block of textBlocks) {
      const amounts = block.Text.match(/\$(\d+\.?\d*)/g);
      if (amounts) {
        for (const amount of amounts) {
          const value = parseFloat(amount.replace("$", ""));
          if (!isNaN(value) && value > maxAmount) {
            maxAmount = value;
          }
        }
      }
    }

    return maxAmount > 0 ? maxAmount : undefined;
  }

  /**
   * Extract tax amount from text blocks
   */
  private extractTax(textBlocks: any[]): number | undefined {
    const taxPatterns = [/tax[:\s]*\$?(\d+\.?\d*)/i, /\$(\d+\.?\d*)\s*tax/i];

    for (const block of textBlocks) {
      const text = block.Text;
      for (const pattern of taxPatterns) {
        const match = text.match(pattern);
        if (match) {
          const amount = parseFloat(match[1]);
          if (!isNaN(amount)) {
            return amount;
          }
        }
      }
    }
    return undefined;
  }

  /**
   * Extract line items from text blocks
   */
  private extractItems(textBlocks: any[]): Array<{
    description: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
  }> {
    const items: any[] = [];

    for (const block of textBlocks) {
      const text = block.Text;

      // Pattern for items with quantity and price
      const itemPattern = /(\d+)\s*x?\s*(.+?)\s*\$?(\d+\.?\d*)/;
      const match = text.match(itemPattern);

      if (match) {
        items.push({
          quantity: parseInt(match[1]),
          description: match[2].trim(),
          totalPrice: parseFloat(match[3]),
        });
      } else {
        // Pattern for description and price
        const simplePattern = /(.+?)\s*\$(\d+\.?\d*)$/;
        const simpleMatch = text.match(simplePattern);

        if (simpleMatch && simpleMatch[1].length > 3) {
          items.push({
            description: simpleMatch[1].trim(),
            totalPrice: parseFloat(simpleMatch[2]),
          });
        }
      }
    }

    return items;
  }

  /**
   * Extract items from table structures
   */
  private extractTableItems(
    tables: any[],
    allBlocks: any[]
  ): Array<{
    description: string;
    quantity?: number;
    unitPrice?: number;
    totalPrice?: number;
  }> {
    const items: any[] = [];

    // This is a simplified table extraction
    // In a real implementation, you'd need more sophisticated table parsing

    return items;
  }

  /**
   * Check job status
   */
  async getJobStatus(
    jobId: string,
    jobType: "text" | "analysis" = "text"
  ): Promise<{
    status: string;
    statusMessage?: string;
    pages?: number;
  }> {
    try {
      let result;
      if (jobType === "text") {
        result = await this.getDocumentTextDetection(jobId);
      } else {
        result = await this.getDocumentAnalysis(jobId);
      }

      return {
        status: result.JobStatus,
        statusMessage: result.StatusMessage,
        pages: result.DocumentMetadata?.Pages,
      };
    } catch (error) {
      console.error("Job status check error:", error);
      throw new Error(`Failed to check job status: ${error.message}`);
    }
  }

  /**
   * Calculate confidence score for extracted data
   */
  calculateConfidence(textractResult: any): number {
    const blocks = textractResult.Blocks || [];
    const textBlocks = blocks.filter(
      (block: any) => block.BlockType === "LINE"
    );

    if (textBlocks.length === 0) return 0;

    const totalConfidence = textBlocks.reduce((sum: number, block: any) => {
      return sum + (block.Confidence || 0);
    }, 0);

    return totalConfidence / textBlocks.length;
  }
}

export default new TextractService();
