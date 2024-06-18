import React, { Component } from "react";
import ContentHeader from "../common/ContentHeader";
import ListOfDocumentsCensored from "./ListOfDocumentsCensored";
import withRouter from "../../helpers/withRouter";
import { connect } from "react-redux";
import { confirmDocument,getDocumentByCensorship } from "../../redux/actions/documentAction";
import DocumentDetails from "./DocumentDetails";
class Censored extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      document: {
        matailieu: "",
        tentailieu: "",
        mota: "",
        giaban: "",
        diachiluutru: "",
        mataikhoan: "",
        danhmuc: { madanhmuc: "" },
      },
      details: false,
    };
  }
  componentDidMount = () => {
    this.props.getDocumentByCensorship("Đã kiểm duyệt");
    console.log("object in did mount");
  };
  onDetails = (value) => {
    this.setState({ ...this.state, document: value, details: true });
  };
  render() {
    const { navigate } = this.props.router;
    const { details } = this.state;
    const { documents } = this.props;
    const { document } = this.state;
    console.log(document);
    return (
      <>
        <ContentHeader
          navigate={navigate}
          title="Danh sách đã kiểm duyệt"
          className="site-page-header"
        ></ContentHeader>

        <ListOfDocumentsCensored
          dataSource={documents}
          onDetails={this.onDetails}
        />
        {this.state.details && (
          <DocumentDetails
            document={this.state.document}
            open={details}
            onCancel={() => {
              this.setState({ ...this.state, document: {}, details: false });
            }}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  documents: state.documentReducer.documents,
});

const mapDispatchToProps = {
  confirmDocument,
  getDocumentByCensorship,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Censored));
