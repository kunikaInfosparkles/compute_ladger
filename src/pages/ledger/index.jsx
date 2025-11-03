import React, { useState } from "react";
import { Table, Pagination, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./ledger.scss";
import { useForm } from "react-hook-form";
import { DatePickerInput, SelectInput } from "../../components/formFields";
import CreateLedger from "./createLedger";
import image from "../../utils/helpers";

const Ledger = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sheets, setSheets] = useState([
        {
            key: 1,
            reference: "First Time pay",
            paymode: "Online",
            date: "20-2-2025",
            totalAmount: "₹10,000.00",
            dueAmount: "₹9,000.00",
            balance: "₹9,000.00",
        },
        {
            key: 2,
            reference: "He gave in half a month",
            paymode: "Case amount",
            date: "10-1-2025",
            totalAmount: "₹12,500.00",
            dueAmount: "₹0.00",
            balance: "₹9,000.00",
        },
        {
            key: 3,
            reference: "First Time pay",
            paymode: "Online",
            date: "20-2-2025",
            totalAmount: "₹10,000.00",
            dueAmount: "₹9,000.00",
            balance: "₹9,000.00",
        },
        {
            key: 4,
            reference: "He gave in half a month",
            paymode: "Case amount",
            date: "10-1-2025",
            totalAmount: "₹12,500.00",
            dueAmount: "₹0.00",
            balance: "₹9,000.00",
        },
        {
            key: 5,
            reference: "First Time pay",
            paymode: "Online",
            date: "20-2-2025",
            totalAmount: "₹10,000.00",
            dueAmount: "₹9,000.00",
            balance: "₹9,000.00",
        },
        {
            key: 6,
            reference: "He gave in half a month",
            paymode: "Case amount",
            date: "10-1-2025",
            totalAmount: "₹12,500.00",
            dueAmount: "₹0.00",
            balance: "₹9,000.00",
        },
    ]);

    const { control } = useForm();

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }
    const columns = [
        {
            title: "Remarks / Reference",
            dataIndex: "reference",
            key: "reference",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Payment Mode",
            dataIndex: "paymode",
            key: "paymode",
        },
        {
            title: "Credit",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Debit",
            dataIndex: "dueAmount",
            key: "dueAmount",
        },
        {
            title: "Balance (₹)",
            dataIndex: "balance",
            key: "balance",
        },
        {
            title: "",
            key: "actions",
        },
    ];

    return (
        <div className="container">
            <div className="ledger-wrapper">
                <div className="sheet-header">
                    <div className="left-heading">
                        <h3>Real State</h3>
                        <p>Street corner house</p>
                    </div>
                    <h3>Ledger Summary</h3>
                    <button className="btn-add" onClick={() => setIsModalOpen(true)}>
                        <div className="plus-icon"> <PlusOutlined color="#fff" /></div> Add New Entry
                    </button>
                </div>

                <div className="filters">

                    <div className="total">
                        <p>Total Given Amount</p>
                        <h4>₹10,000.00</h4>
                    </div>
                    <div className="filters-options">
                        <DatePickerInput control={control} name="fromDate" placeholder="From date" />
                        <DatePickerInput control={control} name="toDate" placeholder="To date" />
                        <button className="btn-primary" type="button">Find</button>
                    </div>
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
                <div className="footer-section">
                    <Row gutter={[20, 20]}>
                        <Col md={12} sm={24}>
                            <div className="left-col">
                                <SelectInput control={control} name="status" placeholder="Status" />
                                <button className="btn-primary" type="button">Update</button>
                                <button className="btn-print" type="button"><img src={image['print.svg']} alt="print"/></button>
                            </div>
                        </Col>
                        <Col md={12} sm={24}>
                        <div className="right-col">
                            <div className="data">
                                <p>Total Credited</p>
                                <h3>₹8000.00</h3>
                            </div>
                            <div className="data">
                                <p>Total Debited</p>
                                <h3>₹7000.00</h3>
                            </div>
                            <div className="data">
                                <p>Due Amount</p>
                                <h3>₹9000.00</h3>
                            </div>
                        </div>
                        </Col>
                    </Row>
                </div>
                {/* Create Sheet Modal */}
                <CreateLedger isModalOpen={isModalOpen} closeModal={handleCloseModal} setSheets={setSheets} />
            </div>
        </div>
    );
};

export default Ledger;
