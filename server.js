const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.text({ type: 'text/html' }));

app.post('/convert', async (req, res) => {
  try {
    const html = req.body;

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set HTML content
    await page.setContent(html);

    // Generate PDF buffer
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Close the browser
    await browser.close();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

    // Send the PDF buffer
    res.end(pdfBuffer);

    console.log('PDF generated successfully');

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Error generating PDF');
  }
});

// Start server
app.listen(8888, () => {
  console.log('Server running on port 8888');
});

