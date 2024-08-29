import React, { Component } from "react";
import { getDocumentAllPayAmin } from "../../redux/actions/documentAction";
import ContentHeader from "../common/ContentHeader";
import withRouter from "../../helpers/withRouter";
import { getCollectiontAdmin } from "../../redux/actions/transactionAction";
import { connect } from "react-redux";
import { Select, Button, message, Skeleton, Table, Space } from "antd";
import Column from "antd/lib/table/Column";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      documents: {}, // Object to store selected dates for each account
    };
  }

  componentDidMount() {
    this.props.getDocumentAllPayAmin();
    const storedUserSession = sessionStorage.getItem("userSession");
    const UserSesion = storedUserSession ? JSON.parse(storedUserSession) : null;
    this.props.getCollectiontAdmin();
  }

  formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  render() {
    const { navigate } = this.props.router;
    const { documents, isLoading, transactions } = this.props;

    if (isLoading) {
      return (
        <>
          <ContentHeader
            navigate={navigate}
            title="Doanh thu"
            className="site-page-header"
          />
          <Skeleton active />
        </>
      );
    }

    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Doanh thu"
          className="site-page-header"
        />
        <h1>Thống kế hàng ngày</h1>
        <Table dataSource={documents} size="small" rowKey="mataikhoan">
          <Column
            title="Thời gian"
            key="thangnam"
            dataIndex="thangnam"
            width={80}
            align="center"
          />
          <Column
            title="Thu nhập tác giả"
            key="thunhaptacgia"
            dataIndex="thunhaptacgia"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>
                  + {this.formatCurrency(text)}
                </span>
              </div>
            )}
          />
          <Column
            title="Thu nhập phí quản trị"
            key="thunhapquantri"
            dataIndex="thunhapquantri"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>
                  + {this.formatCurrency(text)}
                </span>
              </div>
            )}
          />
        </Table>
        <h1>Doanh thu tài liệu</h1>
        <Table dataSource={transactions} size="small" rowKey="matailieu">
          <Column
            title="Tên tài liệu"
            key="tentailieu"
            dataIndex="tentailieu"
            width={80}
            align="center"
          />
          <Column
            title="Giá bán"
            key="giaban"
            dataIndex="giaban"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>
                  + {this.formatCurrency(text)}
                </span>
              </div>
            )}
          />
          <Column
            title="Số lần thanh toán"
            key="solanthanhtoan"
            dataIndex="solanthanhtoan"
            width={80}
            align="center"
          />
          <Column
            title="Tổng thu nhập tác giả"
            key="tongthunhaptacgia"
            dataIndex="tongthunhaptacgia"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>
                  + {this.formatCurrency(text)}
                </span>
              </div>
            )}
          />
          <Column
            title="Tổng số phí quản trị"
            key="tongthunhaptacgia"
            dataIndex="tongphiquantri"
            width={80}
            align="center"
            render={(text) => (
              <div>
                <span style={{ color: "green" }}>
                  + {this.formatCurrency(text)}
                </span>
              </div>
            )}
          />
        </Table>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
  transactions: state.transactionReducer.transactions,
  isLoading: state.commonReducer.isLoading,
});

const mapDispatchToProps = {
  getDocumentAllPayAmin,
  getCollectiontAdmin,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
