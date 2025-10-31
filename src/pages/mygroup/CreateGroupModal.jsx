import { Modal } from 'antd'
import React from 'react'
import { TextInput } from '../../components/formFields'

const CreateGroupModal = ({handleSubmit,handleAddGroup,errors,control,onOpen,onClose}) => {
    return (
        <Modal
            title="Create Group"
            open={onOpen}
            onCancel={onClose}
            footer={null}
            className="group-modal"
        >
            <p className='sub-heading'>This pop-up creates a new file in your page</p>
            <form onSubmit={handleSubmit(handleAddGroup)}>
                <TextInput control={control} name="title" label="File Title" placeholder="Enter your new file title" error={errors.title?.message} />
                <TextInput control={control} name="note" label="Short Note" placeholder="Enter your note" error={errors.note?.message} />
                <button type="submit" className="btn-primary">Create Now</button>
            </form>

        </Modal>
    )
}

export default CreateGroupModal