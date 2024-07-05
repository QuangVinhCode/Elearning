import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagramSquare,
  FaLinkedin,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoHomeOutline } from "react-icons/io5";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";
function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Kết nối với chúng tôi qua mạng xã hội:</span>
        </div>

        <div className="footerbtn">
          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            <FaFacebookF fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            <FaTwitter fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            <FaGoogle fab icon="google" />
          </MDBBtn>
          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            <FaInstagramSquare fab icon="instagram" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            <FaLinkedin fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            <FaGithub fab icon="github" />
          </MDBBtn>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon color="secondary" icon="gem" className="me-3" />E
                Learning
              </h6>
              <p>
                Website này có rất nhiều tài liệu từ mọi thể loại dành cho những
                người đam mê học tập và tìm tòi các kiến thức cần thiết
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Danh Mục</h6>
              <p>
                <a href="#!" className="text-reset">
                  Triết học
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Luận văn
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Toán học
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Văn học
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Các Tiện Ích</h6>
              <p>
                <a href="#!" className="text-reset">
                  Khuyến mãi
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Cài đặt
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Đơn hàng
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Giúp đỡ
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Liên Hệ</h6>
              <p>
                <IoHomeOutline color="secondary" icon="home" className="me-2" />
                180 Đường Cao Lỗ, Phường 4,Quận 8,TP.Hồ Chí Minh
              </p>
              <p>
                <FaRegEnvelope
                  color="secondary"
                  icon="envelope"
                  className="me-3"
                />
                tansup179@gmail.com lequangvinh@gmail.com
              </p>
              <p>
                <FiPhone color="secondary" icon="phone" className="me-3" /> + 01
                234 567 88
              </p>
              <p>
                <FiPhone color="secondary" icon="print" className="me-3" /> + 01
                234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          Elearning.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
