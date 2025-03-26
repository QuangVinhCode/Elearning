import React, { useState, useEffect } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import axios from "axios";
import "./PDFViewer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const PDFViewer = ({ filename, token, pageNumber, onLoadSuccess }) => {
  const [pdfUrl, setPdfUrl] = useState(null);

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

    // Cleanup the PDF URL when the component unmounts
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [filename, token]);

  return (
    <div className="pdf-viewer-container">
      {pdfUrl ? (
        <div>
          <Document file={pdfUrl} onLoadSuccess={onLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      ) : (
        <p>Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewer;
