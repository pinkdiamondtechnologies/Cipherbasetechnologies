const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulated phone tracking API
app.post('/api/track', (req, res) => {
    const { phone } = req.body;
    if (!phone || !/^\d+$/.test(phone)) {
        return res.json({ success: false, message: 'Invalid phone number format' });
    }
    
    // Simulated response (Replace with real tracking API)
    const fakeLocation = {
        success: true,
        location: "Lagos, Nigeria",
        device: "iPhone 13 Pro",
        ip: "192.168.1.100"
    };

    res.json(fakeLocation);
});

// API to list available PDFs
app.get('/api/list-pdfs', (req, res) => {
    const pdfDir = path.join(__dirname, 'public', 'uploads');
    
    fs.readdir(pdfDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to retrieve PDFs" });
        }
        const pdfFiles = files.filter(file => file.endsWith('.pdf'));
        res.json({ pdfs: pdfFiles });
    });
});

// Support ticket submission
let supportTickets = [];
app.post('/api/support', (req, res) => {
    const { name, email, issue } = req.body;
    if (!name || !email || !issue) {
        return res.status(400).json({ error: "All fields are required" });
    }
    
    const ticket = { id: supportTickets.length + 1, name, email, issue, status: "Pending" };
    supportTickets.push(ticket);
    res.json({ success: true, message: "Support ticket submitted successfully", ticket });
});

// Retrieve all support tickets
app.get('/api/support-tickets', (req, res) => {
    res.json(supportTickets);
});

// Q&A submission
let qaList = [];
app.post('/api/qa', (req, res) => {
    const { username, question } = req.body;
    if (!username || !question) {
        return res.status(400).json({ error: "Both username and question are required" });
    }
    
    const qaEntry = { id: qaList.length + 1, username, question, answer: null };
    qaList.push(qaEntry);
    res.json({ success: true, message: "Question submitted successfully", qaEntry });
});

// Retrieve all Q&A entries
app.get('/api/qa-entries', (req, res) => {
    res.json(qaList);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
