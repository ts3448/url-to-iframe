// api/lti_launch.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Assuming the HTML file is small and static, it can be included directly.
        // For larger/dynamic files, consider fetching from external storage instead.
        const filePath = path.join(__dirname, '..', 'url-to-iframe.html');
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the HTML file:', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            // Serve the HTML content directly
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        });
    } else {
        // Handle non-POST requests or throw an error
        res.status(405).send('Method Not Allowed');
    }
};
