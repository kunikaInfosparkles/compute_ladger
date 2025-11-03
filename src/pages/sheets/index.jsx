import React, { useState } from "react";
import { Table, Pagination } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import "./sheets.scss";
import { useForm } from "react-hook-form";
import {  DatePickerInput, SelectInput, TextInput } from "../../components/formFields";

import CreateSheet from "./createSheet";

const Sheets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () =>{
    setIsModalOpen(false)
  }
  const [sheets, setSheets] = useState([
    {
      key: 1,
      account: "Real State",
      description: "Street corner house",
      date: "20-2-2025",
      totalAmount: "₹10,000.00",
      dueAmount: "₹9,000.00",
      status: "Pending",
    },
    {
      key: 2,
      account: "Real State",
      description: "Oceanview Apartment",
      date: "10-1-2025",
      totalAmount: "₹12,500.00",
      dueAmount: "₹0.00",
      status: "Completed",
    },
  ]);

  const { control } = useForm();


  const columns = [
    {
      title: "Account / Party",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "Description / Particulars",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
    },
    {
      title: "Due Amount",
      dataIndex: "dueAmount",
      key: "dueAmount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span className={`status-tag ${text?.toLowerCase()}`}>{text}</span>
      ),
    },
    {
      title: "",
      key: "actions",
      render: () => <MoreOutlined className="more-icon" style={{ cursor: 'pointer' }} />,
    },
  ];

  return (
    <div className="container">
      <div className="sheets-wrapper">
        <div className="sheet-header">
          <h3>Sheets</h3>
          <button className="btn-add" onClick={() => setIsModalOpen(true)}>
            <div className="plus-icon"> <PlusOutlined color="#fff" /></div> Add New Sheet
          </button>
        </div>

        <div className="filters">
          <div className="search">
            <TextInput control={control} name="Search" placeholder="Search" />
          </div>
          <DatePickerInput control={control} name="fromDate" placeholder="From date" />
          <DatePickerInput control={control} name="toDate" placeholder="To date" />
          <SelectInput control={control} name="status" placeholder="Status" />
          <SelectInput control={control} name="typeof" placeholder="Type of" />
          <button className="btn-primary" type="button">Find</button>
        </div>

        <Table
          columns={columns}
          dataSource={sheets}
          pagination={false}
          className="sheet-table"
        />

        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>

      </div>
      <CreateSheet isModalOpen={isModalOpen} closeModal={handleClose} setSheets={setSheets}  sheets={sheets}/>
    </div>
  );
};

export default Sheets;
