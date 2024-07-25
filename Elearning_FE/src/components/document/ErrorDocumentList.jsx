import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { GiConfirmed } from "react-icons/gi";
const ListOfDocumentsBeingCensored = ({ dataSource, onConfirm, onDetails }) => {
  return (
    <Table dataSource={dataSource} size="small" rowKey="matailieu">
      <Table.Column
        title="Mã tài liệu"
        key="matailieu"
        dataIndex="matailieu"
        width={10}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )}
      />
      <Table.Column
        title="Tên tài liệu"
        key="tentailieu"
        dataIndex="tentailieu"
        width={80}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )}
      />
      <Table.Column
        title="Mô tả"
        key="mota"
        dataIndex="mota"
        width={40}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(text) => (
          <Tooltip placement="topLeft" title={text}>
            {text}
          </Tooltip>
        )}
      />
      <Table.Column
        title="Giá bán"
        key="giaban"
        dataIndex="giaban"
        width={40}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(text) => (
          <Tooltip placement="topLeft" title={text + " VND"}>
            {text}
          </Tooltip>
        )}
      />
      <Table.Column
        title="Danh mục"
        key="tendanhmuc"
        dataIndex="tendanhmuc"
        width={40}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(tendanhmuc) => (
          <Tooltip
            placement="topLeft"
            title={tendanhmuc}
          >
            {tendanhmuc}
          </Tooltip>
        )}
      />
       <Table.Column
        title="Tên tài khoản"
        key="tendangnhap"
        dataIndex="tendangnhap"
        width={40}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(tendangnhap) => (
          <Tooltip
            placement="topLeft"
            title={tendangnhap}
          >
            {tendangnhap}
          </Tooltip>
        )}
      />
      <Table.Column
        title="Tác vụ"
        key="action"
        dataIndex="action"
        width={80}
        align="center"
        render={(_, record) => (
          <Space size="middle">
            <Button
              type="primary"
              size="small"
              onClick={() => onDetails(record)}
            >
              <EyeOutlined style={{ marginRight: 8 }} />
              Xem
            </Button>
            <Button
              type="dashed"
              size="small"
              onClick={() => onConfirm(record)}
            >
              <GiConfirmed style={{ marginRight: 8 }} />
              Xác nhân lại
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default ListOfDocumentsBeingCensored;
