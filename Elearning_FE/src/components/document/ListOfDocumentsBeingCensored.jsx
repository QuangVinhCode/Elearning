import React, { useState } from "react";
import { Button, Input, Select, Space, Table, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { GiConfirmed } from "react-icons/gi";
import { Option } from "antd/lib/mentions";
const ListOfDocumentsBeingCensored = ({
  dataSource,
  onConfirm,
  onDetails,
  onNote,
  onRecensorship,
  onBan,
}) => {
  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const filteredData = dataSource.filter((doc) => {
    const searchTextLower = searchText.toLowerCase();

    const matchesSearch = doc.tentailieu
      ? doc.tentailieu.toLowerCase().includes(searchTextLower) ||
        (doc.tendangnhap &&
          doc.tendangnhap.toLowerCase().includes(searchTextLower))
      : false;

    const matchesCategory = categoryFilter
      ? doc.trangthai === categoryFilter
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
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
          <Option value="Chờ kiểm duyệt"></Option>
          <Option value="Cần chỉnh sửa"></Option>
          <Option value="Đã kiểm duyệt"></Option>
          <Option value="Chặn"></Option>
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
          title="Trạng thái"
          key="trangthai"
          dataIndex="trangthai"
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
          title="Thời gian đăng tải"
          key="thoigiandangtai"
          dataIndex="thoigiandangtai"
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
          title="Tài khoản"
          key="tendangnhap"
          dataIndex="tendangnhap"
          width={20}
          align="center"
          ellipsis={{
            showTitle: false,
          }}
          render={(tendangnhap) => (
            <Tooltip
              placement="topLeft"
              title={tendangnhap ? tendangnhap : "N/A"}
            >
              {tendangnhap ? tendangnhap : "N/A"}
            </Tooltip>
          )}
        />
        <Table.Column
          title="Tác vụ"
          key="action"
          dataIndex="action"
          width={60}
          align="center"
          render={(_, record) => (
            <Space size="middle">
              <Button
                type="primary"
                size="small"
                onClick={() => onDetails(record)}
              >
                <EyeOutlined style={{ marginRight: 4 }} />
                Xem
              </Button>
              {record.trangthai === "Chờ kiểm duyệt" && (
                <>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => onConfirm(record)}
                  >
                    <GiConfirmed style={{ marginRight: 4 }} />
                    Xác nhận
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => onNote(record)}
                  >
                    <GiConfirmed style={{ marginRight: 4 }} />
                    Lỗi
                  </Button>
                </>
              )}
              {record.trangthai === "Đã kiểm duyệt" && (
                <>
                  <Button
                    type="default"
                    size="small"
                    onClick={() => onNote(record)}
                  >
                    <GiConfirmed style={{ marginRight: 4 }} />
                    Kiểm duyệt lại
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => onBan(record)}
                  >
                    <GiConfirmed style={{ marginRight: 4 }} />
                    Cấm
                  </Button>
                </>
              )}
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default ListOfDocumentsBeingCensored;
