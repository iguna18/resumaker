// PDFDownloadButton.js

import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";

const PDFDownloadButton = ({ content }) => (
  <PDFDownloadLink
    document={content}
    fileName="generated_document.pdf"
  >
    {({ blob, url, loading, error }) =>
      loading ? "Loading document..." : "Download PDF"
    }
  </PDFDownloadLink>
);

export default PDFDownloadButton;
