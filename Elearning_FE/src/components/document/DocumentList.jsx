import React, { useState } from "react";
import { Button, Space, Table, Tooltip, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

const { Option } = Select;

const DocumentList = ({
  dataSource,
  categories,
  onEdit,
  onDetails,
  onDeleteConfirm,
}) => {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Filter the data based on search text and category filter
  const filteredData = dataSource.filter((doc) => {
    const matchesSearch = doc.tentailieu
      ? doc.tentailieu.toLowerCase().includes(searchText.toLowerCase())
      : false;
    const matchesCategory = categoryFilter
      ? doc.danhmuc?.tendanhmuc === categoryFilter
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Space style={{ marginBottom: 16, marginTop: 10 }}>
        <Input
          placeholder="Tìm kiếm tài liệu"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Chọn danh mục"
          value={categoryFilter}
          onChange={(value) => setCategoryFilter(value)}
          style={{ width: 200 }}
        >
          <Option value={null}>Tất cả</Option>
          {categories.map((category) => (
            <Option key={category.tendanhmuc} value={category.tendanhmuc}>
              {category.tendanhmuc}
            </Option>
          ))}
        </Select>
      </Space>

      <Table dataSource={filteredData} size="small" rowKey="matailieu">
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
            <Tooltip placement="topLeft" title={formatCurrency(text)}>
              {formatCurrency(text)}
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
            <Tooltip
              placement="topLeft"
              title={danhmuc ? danhmuc.tendanhmuc : "N/A"}
            >
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
              <Button
                type="primary"
                size="small"
                onClick={() => onDetails(record)}
              >
                <EyeOutlined style={{ marginRight: 8 }} />
                Xem
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => onEdit(record)}
              >
                <EditOutlined style={{ marginRight: 8 }} />
                Sửa
              </Button>
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => onDeleteConfirm(record)}
              >
                <DeleteOutlined style={{ marginRight: 8 }} />
                Xóa
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default DocumentList;
