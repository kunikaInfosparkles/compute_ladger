import { Col, Modal, Row } from 'antd';
import { TextInput, TextAreaInput } from '../../components/formFields';
import { useForm } from 'react-hook-form';
import { successMsg } from '../../utils/customFn';
import './sheets.scss';

const SheetDetailsModal = ({ isOpen, onClose, data, isReadOnly, onUpdate }) => {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      account: data?.account || '',
      description: data?.description || '',
      date: data?.date || '',
      totalAmount: data?.totalAmount || '',
      dueAmount: data?.dueAmount || '',
      status: data?.status || '',
    },
  });

  const onSubmit = (formData) => {
    if (!isReadOnly) {
      onUpdate({
        ...data,
        account: formData.account,
        description: formData.description,
        totalAmount: formData.totalAmount,
        dueAmount: formData.dueAmount,
      });
      successMsg('Sheet updated successfully!');
      onClose();
      reset();
    }
  };

  return (
    <Modal
      title={isReadOnly ? 'View Details' : 'Edit'}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      className="sheet-details-modal common-modal"
      centered
    >
      <p className="sub-heading">
        {isReadOnly
          ? 'View the details of your sheet'
          : 'This pop-up edit in your sheet'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[20]}>
          <Col sm={24} xs={24}>
            <TextInput
              control={control}
              name="account"
              label="Account / Party"
              placeholder="Enter account / party"
              readOnly={isReadOnly}
            />
          </Col>
          <Col sm={24} xs={24}>
            <TextAreaInput
              control={control}
              name="description"
              label="Description / Particulars"
              placeholder="Enter description"
              readOnly={isReadOnly}
            />
          </Col>
        </Row>
        {!isReadOnly && (
          <button type="submit" className="btn-primary">
            Update
          </button>
        )}
      </form>
    </Modal>
  );
};

export default SheetDetailsModal;
