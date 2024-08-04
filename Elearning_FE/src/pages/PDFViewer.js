import React, { useState, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf/dist/esm/entry.webpack";
import axios from "axios";

// Cấu hình workerSrc cho pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ filename, token }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchPDF = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/tailieu/view/${filename}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/pdf",
            },
            responseType: "blob", // Ensure we get a Blob response
          }
        );

        // Create a URL for the PDF blob
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(pdfUrl);
      } catch (error) {
        console.error("Error fetching PDF:", error);
      }
    };

    fetchPDF();
  }, [filename]);

  // Function to handle page load
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      {pdfUrl ? (
        <div>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
            <p>
              Page {pageNumber} of {numPages}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
