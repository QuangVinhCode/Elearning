import React, { Component } from "react";
import { Modal, Table } from "antd";
import { getCensorshipByDocument } from "../../redux/actions/documentAction";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import "./UserDocumentDetails.css";
import Column from "antd/lib/table/Column";
class CensorshipHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      censorships: {},
    };
  }

  componentDidMount() {
    this.props.getCensorshipByDocument(this.props.matailieu);
  }

  render() {
    const { onCancel, open } = this.props;

    const { censorships } = this.props;
    return (
      <Modal
        title="Chi tiết tài liệu"
        visible={open}
        onCancel={onCancel}
        cancelText="Đóng"
        okButtonProps={{ style: { display: "none" } }}
        width="100%"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <Table dataSource={censorships} size="small" rowKey="malichsukiemduyet">
          <Column
            title="Mã"
            key="malichsukiemduyet"
            dataIndex="malichsukiemduyet"
            width={40}
            align="center"
          />
          <Column
            title="Kết quả"
            key="ketqua"
            dataIndex="ketqua"
            width={40}
            align="center"
          />
          <Column
            title="Lý do"
            key="lydo"
            dataIndex="lydo"
            width={40}
            align="center"
          />

          <Column
            title="Thời gian kiểm duyệt"
            key="thoigiankiemduyet"
            dataIndex="thoigiankiemduyet"
            width={40}
            align="center"
          />
        </Table>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  censorships: state.censorshipReducer.censorships,
});

const mapDispatchToProps = {
  getCensorshipByDocument,
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CensorshipHistory)
);
