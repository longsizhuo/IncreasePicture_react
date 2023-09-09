// server.js
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const cors = require('cors');

const app = express();
const port = 5000;

const storage = multer.memoryStorage(); // 将上传的图片存储在内存中
const upload = multer({ storage: storage });

app.use(cors()); // 允许跨域请求

app.post('/process-image', upload.single('image'), async (req, res) => {
    const imageBuffer = req.file.buffer;
    const targetSize = req.body.targetSize || 2;

    try {
        // 这里只是一个简化的例子。您可能需要使用 sharp 或其他库来处理和调整图片的大小。
        const processedImage = await sharp(imageBuffer)
            .resize({ width: 500 }) // 示例：调整图片宽度到 500px
            .toBuffer();

        // 返回处理后的图片的大小或其他信息
        res.json({ size: processedImage.length / (1024 * 1024) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process image' });
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
