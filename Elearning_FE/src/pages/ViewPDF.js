import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class ViewPDF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfFile: null,
      pageNumber: 1,
      numPages: null,
    };
  }

  componentDidMount() {
    this.fetchPdf();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filename !== this.props.filename) {
      this.fetchPdf();
    }
  }

  fetchPdf = async () => {
    const response = await fetch(
      `http://localhost:8080/api/v1/tailieu/view/${this.props.filename}`,
      {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      }
    );
    const pdfBlob = await response.blob();
    this.setState({ pdfFile: pdfBlob });
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePageChange = (pageNumber) => {
    this.setState({ pageNumber });
  };

  render() {
    const { pdfFile, pageNumber, numPages } = this.state;

    return (
      <div>
        {pdfFile && (
          <Document file={pdfFile} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        )}
        {numPages && (
          <p>
            Trang {pageNumber} / {numPages}
          </p>
        )}
        <button onClick={() => this.handlePageChange(pageNumber - 1)}>Trang trước</button>
        <button onClick={() => this.handlePageChange(pageNumber + 1)}>Trang sau</button>
      </div>
    );
  }
}

export default ViewPDF;