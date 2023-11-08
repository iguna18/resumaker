const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const { spawn } = require("child_process");
const PDFDocument = require("pdfkit");
const app = express();
const multer = require("multer");
const port = 3002;
app.use(cors())

app.use(bodyParser.json({limit:'10mb'}));

const storage = multer.memoryStorage(); // Store the file data in memory
const upload = multer({ storage }); 

app.post("/getpdf", upload.single("image"), async (req, res) => {
  const { name, email, surname, phone_number, about_me, experiences, educations } = req.body;
  let parsedExperiences = [], parsedEducations = []
  try {
    parsedExperiences = JSON.parse(experiences);
    console.log(parsedExperiences);
    parsedEducations = JSON.parse(educations);
    console.log(parsedEducations);
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  const imageBuffer = req.file.buffer
  const doc = new PDFDocument();
  console.log(req.body)

  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=generated.pdf`);

  // Load the font
  doc.font('fonts/sylfaen.ttf');
  doc.image(imageBuffer, doc.page.width - doc.page.width / 3, 0, {
    fit: [doc.page.width / 3, doc.page.height / 5],
  });
  // doc.moveDown();
  doc.fontSize(17).fillColor('orange').text(name);
  doc.fontSize(11).fillColor('black').text(`tel.: ${phone_number}`);
  doc.text(email);
  doc.fontSize(13).fillColor('orange').text(`ჩემს შესახებ`);
  doc.fillColor('black').fontSize(11).text(about_me);
  doc.lineTo(400, 100);
  doc.lineTo(0, 300);
  doc.fontSize(13).fillColor('orange').text(`გამოცდილება`);
  for(let i=0; i<parsedExperiences.length; i++) {
    doc.fontSize(11).fillColor('black').text(parsedExperiences[i].position+ ', '+parsedExperiences[i].employer);
    doc.fillColor('gray').text(parsedExperiences[i].start_date+ ' - '+parsedExperiences[i].due_date);
    doc.fillColor('black').text(parsedExperiences[i].description);
  }
  doc.fontSize(13).fillColor('orange').text(`განათლება`);
  for(let i=0; i<parsedEducations.length; i++) {
    doc.fontSize(11).fillColor('black').text(parsedEducations[i].degree_id+ ', ' +parsedEducations[i].institute);
    doc.fillColor('gray').text(parsedEducations[i].due_date);
    doc.fillColor('black').text(parsedEducations[i].description);
  }
  console.log('\n\n\nsami\n\n\n')
  // Finalize the PDF document and send as the response
  doc.end();
  doc.pipe(res);
});
/*
app.post("/getpdf", (req, res) => {
  const {name, image} = req.body;
  //console.log(name)
  const doc = new PDFDocument();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=generated.pdf`);
  doc.font('fonts/sylfaen.ttf')
  doc.pipe(res);

  doc.image(image, doc.page.width - doc.page.width / 3, 0, {
    fit: [doc.page.width / 3, doc.page.height / 5],
  });
  doc.image(image);
  doc.moveDown();
  doc.text(`Name: ${name}`);
  doc.end();
});
*/
/*
app.post("/getpdf", (req, res) => {
  const { name, image } = req.body;
  const doc = new PDFDocument();
  console.log('giogiogio\n\n')
  // Set response headers
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=generated.pdf`);

  // Pipe the PDF document directly to the response stream
  doc.pipe(res);

  // Load the font
  doc.font('fonts/sylfaen.ttf');
  console.log('\n\n\n\nnuli\n\n\n')
  // Draw the image and text
  const imageStream = doc.image(image);
  imageStream.on("finish", () => {
    console.log('\n\n\n\nerti\n\n\n')
    // The image stream has finished writing, so we can now write the text
    doc.moveDown();
    doc.text(`Name: ${name}`);

    // End the PDF document now that all content has been written
    doc.end();
  });

  imageStream.on("error", (error) => {
    console.log('\n\n\n\nori\n\n\n')
    console.error("Error writing image to PDF:", error);
    // Handle the error if necessary
    doc.end();
  });
});
*/
/*
app.post("/getpdf", async (req, res) => {
  const { name, image } = req.body;
  const doc = new PDFDocument();

  // Load the font
  doc.font('fonts/sylfaen.ttf');

  // Draw the image and text
  const imageStream = doc.image(image);
  imageStream.on("finish", () => {
    // The image stream has finished writing, so we can now write the text
    doc.moveDown();
    doc.text(`Name: ${name}`);

    // Generate the PDF content as a buffer
    const pdfBuffer = [];
    doc.on("data", (chunk) => {
      pdfBuffer.push(chunk);
    });

    doc.on("end", () => {
      // All content has been written to the buffer
      const pdfContent = Buffer.concat(pdfBuffer);

      // Set response headers
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=generated.pdf`);

      // Send the PDF content as the response
      res.end(pdfContent);
    });

    // Finalize the PDF document
    doc.end();
  });

  imageStream.on("error", (error) => {
    console.error("Error writing image to PDF:", error);
    // Handle the error if necessary
    res.status(500).send("Error generating PDF");
  });
});
*/


app.post("/generate-pdf", (req, res) => {
  console.log('shesvla')
//  console.log(req.body)
  const { htmlContent } = req.body;
  if(!htmlContent) {
    console.log('ara')
  return
  }
  console.log('ki', Object.keys(htmlContent))
  // Use wkhtmltopdf command to generate PDF
  const wkhtmltopdf = spawn("wkhtmltopdf", ["-", "-"]);
  wkhtmltopdf.on("error", (error) => {
    console.error("Error during PDF generation:", error);
    res.status(500).send("Error during PDF generation");
  });
  wkhtmltopdf.stdin.write(htmlContent);
  wkhtmltopdf.stdin.end();

  res.setHeader("Content-Disposition", "attachment; filename=generated.pdf");
  res.setHeader("Content-Type", "application/pdf");

  wkhtmltopdf.stdout.pipe(res);
  return
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

