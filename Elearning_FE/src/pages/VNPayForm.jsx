import React from "react";
import { Form, Button, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import { getVnPay } from "../redux/actions/payAction";
import "./VNPayForm.css";

const { Option } = Select;
const useUserSession = () => {
  const storedUserSession = sessionStorage.getItem("userSession");
  return storedUserSession ? JSON.parse(storedUserSession) : null;
};
const VNPayForm = ({ getVnPay }) => {
  const userSession = useUserSession();

  const handleSubmit = (values) => {
    console.log("Số tiền:", values.amount);
    console.log("Mã tài khoản:", userSession.mataikhoan);
    console.log("Tài khoản ngân hàng:", values.bankAccount);
    getVnPay(values.amount, values.bankAccount, userSession.mataikhoan);
  };
  const formatCurrency = (value) => {
    if (!value) return "";
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const parseCurrency = (value) => value.replace(/đ\s?|,*/g, "");

  return (
    <div className="container-vnpay">
      <div className="vnpayform">
        <h2>Thanh Toán VNPay</h2>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Số tiền"
            name="amount"
            rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              step={10000}
              formatter={formatCurrency}
              parser={parseCurrency}
            />
          </Form.Item>

          <Form.Item
            label="Tài khoản ngân hàng"
            name="bankAccount"
            rules={[
              { required: true, message: "Vui lòng chọn tài khoản ngân hàng" },
            ]}
          >
            <Select placeholder="Chọn tài khoản ngân hàng">
              <Option key="SCB">Ngân hàng SCB</Option>
              <Option key="NCB">Ngân hàng NCB</Option>
              <Option key="">Không chọn</Option>
              <Option key="QRONLY">Thanh toán QRONLY</Option>
              <Option key="MBAPP">Ứng dụng MobileBanking</Option>
              <Option key="VNPAYQR">VNPAYQR</Option>
              <Option key="VNBANK">LOCAL BANK</Option>
              <Option key="IB">INTERNET BANKING</Option>
              <Option key="ATM">ATM CARD</Option>
              <Option key="INTCARD">INTERNATIONAL CARD</Option>
              <Option key="VISA">VISA</Option>
              <Option key="MASTERCARD">MASTERCARD</Option>
              <Option key="JCB">JCB</Option>
              <Option key="UPI">UPI</Option>
              <Option key="VIB">VIB</Option>
              <Option key="VIETCAPITALBANK">VIETCAPITALBANK</Option>
              <Option key="SACOMBANK">Ngân hàng SacomBank</Option>
              <Option key="EXIMBANK">Ngân hàng EximBank</Option>
              <Option key="MSBANK">Ngân hàng MSBANK</Option>
              <Option key="NAMABANK">Ngân hàng NamABank</Option>
              <Option key="VNMART">Ví điện tử VnMart</Option>
              <Option key="VIETINBANK">Ngân hàng Vietinbank</Option>
              <Option key="VIETCOMBANK">Ngân hàng VCB</Option>
              <Option key="HDBANK">Ngân hàng HDBank</Option>
              <Option key="DONGABANK">Ngân hàng Dong A</Option>
              <Option key="TPBANK">Ngân hàng TPBank</Option>
              <Option key="OJB">Ngân hàng OceanBank</Option>
              <Option key="BIDV">Ngân hàng BIDV</Option>
              <Option key="TECHCOMBANK">Ngân hàng Techcombank</Option>
              <Option key="VPBANK">Ngân hàng VPBank</Option>
              <Option key="AGRIBANK">Ngân hàng Agribank</Option>
              <Option key="MBBANK">Ngân hàng MBBank</Option>
              <Option key="ACB">Ngân hàng ACB</Option>
              <Option key="OCB">Ngân hàng OCB</Option>
              <Option key="IVB">Ngân hàng IVB</Option>
              <Option key="SHB">Ngân hàng SHB</Option>
              <Option key="APPLEPAY">Apple Pay</Option>
              <Option key="GOOGLEPAY">Google Pay</Option>
            </Select>
          </Form.Item>
          <hr />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Nạp
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getVnPay,
};

export default connect(null, mapDispatchToProps)(VNPayForm);
