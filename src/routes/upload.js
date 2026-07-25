const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Use memory storage so we can process with sharp before saving
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  const host = req.get('host');
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const baseUrl = host.includes('hieil.com') 
    ? `https://api.hieil.com/api-v1/api`
    : `${protocol}://${host}`;
    
  try {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = `${uniqueSuffix}.webp`;
    const filepath = path.join(uploadDir, filename);

    // If it's an image, resize and convert to webp
    if (req.file.mimetype.startsWith('image/')) {
      await sharp(req.file.buffer)
        .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(filepath);
    } else {
      // For non-images (like pdfs), just write the buffer directly
      fs.writeFileSync(filepath, req.file.buffer);
    }
    
    const fileUrl = `${baseUrl}/uploads/${filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ message: 'Error processing upload' });
  }
});

module.exports = router;
