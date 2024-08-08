const puppeteer = require('puppeteer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.text({ type: 'text/html' }));

app.post('/convert', async (req, res) => {
  try {
    const html = req.body;

    // Launch Puppeteer with additional configurations
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
      headless: true, // Ensure Puppeteer runs in headless mode
      timeout: 60000, // Increase timeout for Puppeteer operations
    });
    const page = await browser.newPage();
    
    // Set HTML content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Generate PDF buffer with increased timeout
    const pdfBuffer = await page.pdf({ 
      format: 'A4',
      timeout: 120000 // Increase timeout for PDF generation
    });

    // Close the browser
    await browser.close();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');

    // Send the PDF buffer
    res.end(pdfBuffer, 'binary');

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
