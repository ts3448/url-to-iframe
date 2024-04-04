// api/lti_launch.js
module.exports = (req, res) => {
    if (req.method === 'POST') {
        // Directly define the HTML content as a string.
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>URL to iframe Converter</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            display: flex;
            justify-content: center;
        }
        .form-container, .result-container {
            max-width: 600px;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        .form-container {
            margin-bottom: 20px;
        }
        input, button, textarea {
            width: 100%;
        }
        textarea {
            height: 100px;
            resize: vertical;
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="form-container" role="form" aria-labelledby="formInstructions">
            <p id="formInstructions">Please paste your Google resource URL in the input field below and click on "Generate Embedding Code" to create the iframe code.</p>
            <label for="urlInput">Paste your Google resource URL:</label>
            <input type="text" id="urlInput" placeholder="https://example.com" aria-required="true">
            <button onclick="generateString()" aria-label="Generate the embedding code for the entered URL">Generate Embedding Code</button>
        </div>
        <div class="result-container">
            <label for="result">Paste the following text into the "Embed Content" tool in CourseWorks (Canvas):</label>
            <textarea id="result" readonly aria-describedby="copyInstruction"></textarea>
            <p id="copyInstruction">Use Ctrl+C or right-click to copy the iframe code displayed above.</p>
        </div>
    </div>
    <script>
        function generateString() {
            var url = document.getElementById('urlInput').value.trim();
            if(url) {
                var resultString = \`<iframe src="\${url}" width="100%" height="600"></iframe>\`;
                document.getElementById('result').value = resultString;
            } else {
                alert('Please enter a URL.');
                document.getElementById('urlInput').focus();
            }
        }
    </script>
</body>
</html>
        `;

        // Serve the HTML content directly
        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
    } else {
        // Handle non-POST requests or throw an error
        res.status(405).send('Method Not Allowed');
    }
};
