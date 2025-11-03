import { Col, Modal, Row } from 'antd';
import {  DatePickerInput, SelectInput, TextAreaInput, TextInput } from '../../components/formFields';
import {  useForm } from 'react-hook-form';
import { successMsg } from '../../utils/customFn';

const CreateSheet = ({ isModalOpen, closeModal, setSheets ,sheets}) => {
    const { control, handleSubmit, reset, watch } = useForm();
    const paymentMethod = watch('payment_method', 'credit');

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
        closeModal()
        successMsg("Sheet created successfully!");
        reset();
    };

    return (
        <Modal
            title="Create Sheet"
            open={isModalOpen}
            onCancel={closeModal}
            footer={null}
            className="ledger-modal common-modal"
        >
            <p className="sub-heading">This pop-up creates a new sheet in your page</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={[20]}>
                    <Col sm={24} xs={24}>
                        <TextInput
                            control={control}
                            name="account"
                            label="Account / Party Name"
                            placeholder="Enter your account / party"
                        />
                    </Col>
                    <Col sm={24} xs={24}>
                        <label className='custome-radio'> <input type='radio' name='paymentMode' />Fixed Amount</label>
                    </Col>

                    <Col sm={12} xs={24}>
                         <TextInput
                            control={control}
                            name="totalSuarefoot"
                            label="Price Per Square Foot"
                            placeholder="Enter price by per square feet"
                        />
                    </Col>
                    <Col sm={12} xs={24}>
                         <TextInput
                            control={control}
                            name="price"
                            label="Price Per Square Foot"
                            placeholder="Enter price by per square feet"
                        />
                    </Col>
                    <Col sm={24} xs={24}>
                        <TextAreaInput
                            control={control}
                            name="description"
                            label="Description / Particulars"
                            placeholder="Enter your text"
                        />
                    </Col>
                </Row>
                <button type="submit" className="btn-primary">
                    Create Now
                </button>
            </form>
        </Modal>
    )
}

export default CreateSheet;