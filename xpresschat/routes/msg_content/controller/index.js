import ContentPrice from "../model/index.js"
import { Storage } from '@google-cloud/storage';
import multer from 'multer';

// import serviceAccount from '../helper/key.json' assert {type:"json"};


const storage = new Storage({
  credentials: {
    // client_email: serviceAccount.client_email,
    // private_key: serviceAccount.private_key.replace(/\\n/g, '\n'),
  },
  projectId: 'ens-prod-proj-1',
});

const bucketName = 'ens-ondc'; // replace with your bucket name
const bucket = storage.bucket(bucketName);
export const uploadToGCP = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const uploadedUrls = [];

    for (const file of files) {
      const fileName = `${Date.now()}_${file.originalname}`;
      const blob = bucket.file(fileName);

      await blob.save(file.buffer, {
        resumable: false,
        contentType: file.mimetype,
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      uploadedUrls.push(publicUrl);
    }

    res.status(200).json({
      success: true,
      urls: uploadedUrls,
      message: `${uploadedUrls.length} file(s) uploaded successfully.`,
    });

  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createContentPrice = async (req, res) => {
  try {
    const { userId, contentType, subtypes } = req.body;

    const newContentPrice = new ContentPrice({ userId, contentType, subtypes });
    await newContentPrice.save();

    res.status(201).json(newContentPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Get user-specific price or return default price
export const getContentPrice = async (req, res) => {
  try {
    const userId = req.params.userId || null;

    let contentPrice = await ContentPrice.findOne({ userId });

    // If no user-specific pricing exists, fetch the default one
    if (!contentPrice) {
      contentPrice = await ContentPrice.findOne({ userId: null });
    }

    if (!contentPrice) {
      return res.status(404).json({ message: "No pricing data found" });
    }

    res.status(200).json(contentPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Update a user-specific price entry
export const updateContentPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedContentPrice = await ContentPrice.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedContentPrice) {
      return res.status(404).json({ message: "Content price not found" });
    }

    res.status(200).json(updatedContentPrice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Delete a price entry
export const deleteContentPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContentPrice = await ContentPrice.findByIdAndDelete(id);

    if (!deletedContentPrice) {
      return res.status(404).json({ message: "Content price not found" });
    }

    res.status(200).json({ message: "Content price deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};