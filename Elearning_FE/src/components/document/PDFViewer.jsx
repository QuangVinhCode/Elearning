import React, { useEffect, useState } from 'react';
import Pdf from '@mikecousins/react-pdf';
import axios from 'axios';

const PDFViewer = ({ filename }) => {
  const [pdfData, setPdfData] = useState(null);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [maxPages, setMaxPages] = useState(null);
  const [showPaymentMessage, setShowPaymentMessage] = useState(false);
  const [reset, setReset] = useState(false);
  const [login, setLogin] = useState(false);
  const [goToPage, setGoToPage] = useState('');

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/tailieu/view/${filename}`, {
          responseType: 'blob',
        });
        setPdfData(response.data);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [filename]);

  const onLoadSuccess = ({ pdfDocument }) => {
    console.log('PDF loaded successfully', pdfDocument);
    const numPages = pdfDocument.numPages;
    const maxPages = pdfDocument.numPages;
    setNumPages(numPages);
    setMaxPages(maxPages);
  };

  const onPageLoadSuccess = (pdfPage) => {
    console.log('Current page loaded', pdfPage.pageNumber);
    if (page === maxPages) {
      setShowPaymentMessage(true);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleGoToPage = () => {
    setPage(Number(goToPage));
  };

  return (
    <div>
      {pdfData && (
        <Pdf
          file={{ url: URL.createObjectURL(pdfData) }}
          page={page}
          onLoadSuccess={onLoadSuccess}
          onPageLoadSuccess={onPageLoadSuccess}
        >
          {({ pdfDocument, pdfPage, canvas }) => (
            <>
              {!pdfDocument && <span>Loading...</span>}
              {canvas}
              {pdfDocument && (
                <div className="nav-buttons">
                  <button
                    className="prev-button"
                    disabled={page === 1}
                    onClick={handlePrevPage}
                  >
                    Trước
                  </button>
                  <button
                    className="next-button"
                    disabled={page === maxPages}
                    onClick={handleNextPage}
                  >
                    Sau
                  </button>
                  <h3 className="pagenumber">
                    Trang {page} / {pdfDocument.numPages}
                  </h3>
                  <div className="page-navigation">
                    <input
                      type="number"
                      min="1"
                      max={pdfDocument.numPages}
                      value={goToPage}
                      onChange={(e) => setGoToPage(e.target.value)}
                      placeholder="Nhập số trang"
                    />
                    <button onClick={handleGoToPage} className="go-page">
                      Đi đến trang
                    </button>
                  </div>
                  {showPaymentMessage && (
                    <div className="message-notification">
                      <p>
                        Để xem toàn bộ nội dung và tải về, vui lòng thanh toán.
                      </p>
                      <button onClick={() => setShowPaymentMessage(false)}>
                        Đóng
                      </button>
                    </div>
                  )}
                  {reset && (
                    <div className="message-notification">
                      <p>Hãy nhấn reset website để có thể xem hoặc tải về</p>
                      <button onClick={() => setReset(false)}>
                        Đóng
                      </button>
                    </div>
                  )}
                  {login && (
                    <div className="message-notification">
                      <p>Hãy nhấn đăng nhập để có thể bình luận</p>
                      <button onClick={() => setLogin(false)}>
                        Đóng
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </Pdf>
      )}
    </div>
  );
};

export default PDFViewer;
