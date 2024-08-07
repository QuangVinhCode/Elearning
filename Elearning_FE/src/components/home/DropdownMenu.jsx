import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { API_CATEGORY } from "../../services/constant";
import axios from "axios";
import "./DropdownMenu.css"; // Tạo file CSS để điều chỉnh phong cách

const DropdownMenu = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null); // State để lưu trữ mục đang được hover

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_CATEGORY);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMenuClick = (e) => {
    const { key } = e;
    console.log("key" + key);
    navigate("/users/documents/" + key);
  };

  const handleMenuItemHover = (key) => {
    setHoveredItem(key);
  };

  return (
    <>
      {categories.length > 0 && (
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick}>
              {categories.map((category) => (
                <Menu.Item
                  key={category.madanhmuc}
                  onMouseEnter={() => handleMenuItemHover(category.madanhmuc)}
                  className={
                    hoveredItem === category.madanhmuc ? "hovered" : ""
                  }
                >
                  {category.tendanhmuc}
                </Menu.Item>
              ))}
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Space>
              Danh mục
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
      {categories.length === 0 && (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>DM</Menu.Item>
              <Menu.Item>DM</Menu.Item>
              <Menu.Item>DM</Menu.Item>
              <Menu.Item>DM</Menu.Item>
            </Menu>
          }
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <Space>
              Danh mục
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      )}
    </>
  );
};

export default DropdownMenu;
