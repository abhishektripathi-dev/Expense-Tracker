// filepath: /C:/Users/Abhishek Tripathi/Desktop/Expense Tracker/Back-End/controllers/downloadController.js
const path = require('path');

exports.downloadFile = (req, res) => {
    const filePath = path.join(__dirname, '../files/premium-file.txt');
    res.download(filePath, 'premium-file.txt', (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).json({ message: "An error occurred while downloading the file" });
        }
    });
};