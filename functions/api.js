const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const router = express.Router();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.text({ type: 'text/html', limit: '50mb' }));

// Convert HTML to PDF
router.post('/convert', async (req, res) => {
  const htmlContent = req.body;
  try {
      const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      const page = await browser.newPage();

      await page.setContent(htmlContent);
      const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true }); // Set printBackground to true

      await browser.close();

      // Convert the PDF buffer to a base64 string
      const base64Pdf = pdfBuffer.toString('base64');

      // Set headers for base64-encoded data
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
      res.send(base64Pdf);
  } catch (error) {
      console.error('PDF generation failed:', error.message);
      res.status(500).json({ message: 'PDF generation failed: ' + error.message });
  }
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
