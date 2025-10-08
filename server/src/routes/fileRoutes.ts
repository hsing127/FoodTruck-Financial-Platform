import express from "express";
import {
  uploadFile,
  getFile,
  deleteFile,
  listUserFiles,
  renameFile,
  archiveFile,
  checkFileDeletionTime,
} from "../controllers/fileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authMiddleware);

// File operations - From various API files
router.post("/upload", uploadFile); // API_uploadToUserStorage.js
router.get("/list", listUserFiles); // API_viewUserFiles.js
router.get("/:fileName", getFile); // API_retrieveFile.js
router.delete("/:fileName", deleteFile); // API_deleteFile.js
router.put("/rename", renameFile); // API_editFileName.js
router.post("/:fileName/archive", archiveFile); // API_archiveFile.js
router.get("/cleanup/check", checkFileDeletionTime); // API_checkFileDeletionTime.js

export default router;
