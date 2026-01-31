import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Accept multiple files from field 'files'
export const handleFileUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Upload failed', details: err.message });
    }
    next();
  });
};