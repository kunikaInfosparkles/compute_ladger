import React, { useState } from "react";
import { Table, Modal, Row, Col, DatePicker, Select, Input, Pagination } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import "./sheets.scss";
import { useForm } from "react-hook-form";
import { CheckboxInput, DatePickerInput, SelectInput, TextInput } from "../../components/formFields";
import { successMsg } from "../../utils/customFn";

const Sheets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    setSheets([
      ...sheets,
      {
        key: sheets.length + 1,
        account: data.account,
        description: data.description,
        date: new Date().toLocaleDateString(),
        totalAmount: `₹${data.amount}`,
        dueAmount: "₹0.00",
        status: "Pending",
      },
    ]);
    successMsg("Sheet created successfully!");
    setIsModalOpen(false);
    reset();
  };

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
        <span className={`status-tag ${text.toLowerCase()}`}>{text}</span>
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
           <div className="plus-icon"> <PlusOutlined color="#fff"/></div> Add New Sheet
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

        {/* Create Sheet Modal */}
        <Modal
          title="Create Sheet"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
          className="group-modal"
        >
          <p className="sub-heading">This pop-up creates a new sheet in your page</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              control={control}
              name="account"
              label="Account / Party Name"
              placeholder="Enter your account / party"
            />

            <CheckboxInput  name='fixed' control={control} label='Fixed Amount'/>

            <TextInput
              control={control}
              name="amount"
              label="Total Amounts"
              placeholder="Enter your total amounts"
            />

            <TextInput
              control={control}
              name="description"
              label="Description / Particulars"
              placeholder="Enter your text"
            />

            <button type="submit" className="btn-primary">
              Create Now
            </button>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Sheets;
