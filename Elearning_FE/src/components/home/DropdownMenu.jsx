import { DownOutlined } from "@ant-design/icons";
import { Dropdown, message, Space, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoryAction";
import { useNavigate } from "react-router-dom";

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categoryReducer.objects);
  useEffect(() => {
    dispatch(getCategories());
    console.log("object in useEffect");
  }, [dispatch]);
  // Function to handle menu item click
  const handleMenuClick = (e) => {
    console.log(e);
    const { key } = e;
    navigate("/users/documentbycategory/" + key);
  };

  return (
    <Dropdown
      overlay={
        <Menu onClick={handleMenuClick}>
          {categories && categories.map((categorie) => (
            <Menu.Item key={categorie.madanhmuc}>
              {categorie.tendanhmuc}
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Danh mục
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownMenu;
