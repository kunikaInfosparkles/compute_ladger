import React, { useState } from "react";
import { Table, Pagination, Dropdown } from "antd";
import { PlusOutlined, MoreOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./sheets.scss";
import { useForm } from "react-hook-form";
import { DatePickerInput, SelectInput, TextInput } from "../../components/formFields";
import { errorMsg } from "../../utils/customFn";
import CreateSheet from "./createSheet";
import SheetDetailsModal from "./SheetDetailsModal";

const Sheets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleClose = () => {
    setIsModalOpen(false);
  };

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

  const handleViewDetails = (record) => {
    setSelectedSheet(record);
    setIsReadOnly(true);
    setIsDetailsModalOpen(true);
  };

  const handleEdit = (record) => {
    setSelectedSheet(record);
    setIsReadOnly(false);
    setIsDetailsModalOpen(true);
  };

  const handleDelete = (record) => {
    setSheets(sheets.filter((sheet) => sheet.key !== record.key));
    errorMsg("Sheet deleted successfully!");
  };

  const handleUpdateSheet = (updatedData) => {
    setSheets(
      sheets.map((sheet) =>
        sheet.key === updatedData.key ? updatedData : sheet
      )
    );
  };

  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setSelectedSheet(null);
    setIsReadOnly(false);
  };

  const getActionMenuItems = (record) => [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "View Details",
      onClick: () => handleViewDetails(record),
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: () => handleEdit(record),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: () => handleDelete(record),
    },
  ];

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
      width: 60,
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={{ items: getActionMenuItems(record) }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <MoreOutlined className="more-icon" style={{ cursor: "pointer", fontSize: "18px" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="sheets-wrapper">
        <div className="sheet-header">
          <h3>Sheets</h3>
          <button className="btn-add" onClick={() => setIsModalOpen(true)}>
            <div className="plus-icon">
              <PlusOutlined color="#fff" />
            </div>
            Add New Sheet
          </button>
        </div>

        <div className="filters">
          <div className="search">
            <TextInput control={control} name="Search" placeholder="Search by title" />
          </div>
          <DatePickerInput control={control} name="fromDate" placeholder="From date" />
          <DatePickerInput control={control} name="toDate" placeholder="To date" />
          <SelectInput control={control} name="status" placeholder="Status" />
          <SelectInput control={control} name="typeof" placeholder="Type of" />
          <button className="btn-primary" type="button">
            Find
          </button>
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

      <CreateSheet
        isModalOpen={isModalOpen}
        closeModal={handleClose}
        setSheets={setSheets}
        sheets={sheets}
      />

      <SheetDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        data={selectedSheet}
        isReadOnly={isReadOnly}
        onUpdate={handleUpdateSheet}
      />
    </div>
  );
};

export default Sheets;
