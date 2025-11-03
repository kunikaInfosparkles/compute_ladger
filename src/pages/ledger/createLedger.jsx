import { Col, Form, Modal, Radio, Row } from 'antd';
import { CheckboxInput, DatePickerInput, SelectInput, TextInput } from '../../components/formFields';
import { Controller, useForm } from 'react-hook-form';
import './createLedgerModal.scss'

const CreateLedger = ({ isModalOpen, closeModal, setSheets }) => {
    const { control, handleSubmit, reset, watch } = useForm();
    const paymentMethod = watch('payment_method', 'credit');
    const onSubmit = (data) => {
        setSheets([
            ...sheets,
            {
                key: sheets.length + 1,
                reference: data.reference,
                paymode: data.paymode,
                date: new Date().toLocaleDateString(),
                totalAmount: `₹${data.amount}`,
                dueAmount: "₹0.00",
                balance: "₹9,000.00",
            },
        ]);
        successMsg("Sheet created successfully!");
        reset();
        closeModal()
    };
    return (
        <Modal
            title="Add New Entry"
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            className="ledger-modal common-modal"
        >
            <p className="sub-heading">This pop-up will be a new entry in your ledger.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[20]}>
                    <Col sm={24} xs={24}>
                        <TextInput
                            control={control}
                            name="reference"
                            label="Remarks / Reference"
                            placeholder="Enter your text"
                        />
                    </Col>
                    <Col sm={10} xs={24}>
                      <label className='custome-radio'> <input type='radio' name='paymentMode' />Credited Amount</label>
                    </Col>
                    <Col sm={10} xs={24}>
                       <label className='custome-radio'> <input type='radio' name='paymentMode' />Debit Amount</label>
                    </Col>
                    <Col sm={12} xs={24}>
                        <DatePickerInput
                            control={control}
                            name="date"
                            label="Date"
                            placeholder="Select Date"
                        />
                    </Col>
                    <Col sm={12} xs={24}>
                        <SelectInput
                            control={control}
                            name="paymode"
                            label="paymode / Particulars"
                            placeholder="Enter your text"
                        />
                    </Col>
                    <Col sm={24} xs={24}>
                        <TextInput
                            control={control}
                            name="amount"
                            label="Debit Amount"
                            placeholder="Enter your amount"
                        />
                    </Col>
                </Row>
                <button type="submit" className="btn-primary">
                    Add Entry
                </button>
            </form>
        </Modal>
    )
}

export default CreateLedger