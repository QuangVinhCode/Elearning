import React from "react";
import { Button, Space, Table, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const DocumentList = ({ dataSource, onEdit, onDetails, onDeleteConfirm }) => {
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
        key="danhmuc"
        dataIndex="danhmuc"
        width={40}
        align="center"
        ellipsis={{
          showTitle: false,
        }}
        render={(danhmuc) => (
          <Tooltip placement="topLeft" title={danhmuc ? danhmuc.tendanhmuc : "N/A"}>
            {danhmuc ? danhmuc.tendanhmuc : "N/A"}
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
            <Button type="primary" size="small" onClick={() => onDetails(record)}>
              <EyeOutlined style={{ marginRight: 8 }} />
              Xem
            </Button>
            <Button type="primary" size="small" onClick={() => onEdit(record)}>
              <EditOutlined style={{ marginRight: 8 }} />
              Sửa
            </Button>
            <Button type="primary" danger size="small" onClick={() => onDeleteConfirm(record)}>
              <DeleteOutlined style={{ marginRight: 8 }} />
              Xóa
            </Button>
          </Space>
        )}
      />
    </Table>
  );
};

export default DocumentList;
