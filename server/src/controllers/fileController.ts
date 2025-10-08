import { Request, Response } from "express";
import { fileService } from "../services/fileService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

// From API_uploadToUserStorage.js
export const uploadFile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { fileName, fileData, overwrite } = req.body;
    const username = req.user!.email;

    const result = await fileService.uploadFile({
      username,
      fileName,
      fileData,
      overwrite,
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Upload file error:", error);

    if (
      error.message.includes(
        "Only PDF, TXT, PNG, JPG, and JPEG files are allowed"
      )
    ) {
      res.status(400).json({ message: error.message });
      return;
    }

    if (error.message.includes("already exists")) {
      res.status(409).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Failed to upload file" });
  }
};

// From API_retrieveFile.js
export const getFile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { fileName } = req.params;
    const username = req.user!.email;

    const result = await fileService.getFile({ username, fileName });
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Get file error:", error);

    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Failed to retrieve file" });
  }
};

// From API_deleteFile.js
export const deleteFile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { fileName } = req.params;
    const username = req.user!.email;

    const result = await fileService.deleteFile({ username, fileName });
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Delete file error:", error);

    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Failed to delete file" });
  }
};

// From API_viewUserFiles.js
export const listUserFiles = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const username = req.user!.email;
    const result = await fileService.listUserFiles(username);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("List files error:", error);
    res.status(500).json({ message: "Failed to list files" });
  }
};

// From API_editFileName.js
export const renameFile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { oldFileName, newFileName } = req.body;
    const username = req.user!.email;

    const result = await fileService.renameFile(
      username,
      oldFileName,
      newFileName
    );
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Rename file error:", error);

    if (
      error.message.includes("not found") ||
      error.message.includes("already exists")
    ) {
      res.status(400).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Failed to rename file" });
  }
};

// From API_archiveFile.js
export const archiveFile = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { fileName } = req.params;
    const username = req.user!.email;

    const result = await fileService.archiveFile({ username, fileName });
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Archive file error:", error);

    if (error.message.includes("not found")) {
      res.status(404).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "Failed to archive file" });
  }
};

// From API_checkFileDeletionTime.js
export const checkFileDeletionTime = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const username = req.user!.email;
    const result = await fileService.checkFileDeletionTime(username);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("Check file deletion time error:", error);
    res.status(500).json({ message: "Failed to check file deletion times" });
  }
};

export const fileController = {
  uploadFile,
  getFile,
  deleteFile,
  listUserFiles,
  renameFile,
  archiveFile,
  checkFileDeletionTime,
};
