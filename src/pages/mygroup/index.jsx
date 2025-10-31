import React, { useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import './myGroup.scss';
import { useForm } from 'react-hook-form';
import { TextInput } from '../../components/formFields';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';
import image from '../../utils/helpers';
import useCreateGroupUtils from './useCreateGroupUtils';
import CreateGroupModal from './CreateGroupModal';

const MyGroup = () => {
    const [groups, setGroups] = useState([
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
        { title: "Group Title", note: "Lorem Ipsum is simply dummy text of the printing..." },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleSubmit, onSubmit, errors, control, reset } = useCreateGroupUtils();

    const handleAddGroup = (data) => {
        setGroups([...groups, data]);
        onSubmit(data);
        setIsModalOpen(false);
        reset();
    };
    const handleCloseModal  =() =>{
        setIsModalOpen(false)
    }
    useEffect(() => {
        const savedGroups = localStorage.getItem("groups");
        if (savedGroups) setGroups(JSON.parse(savedGroups));
    }, []);

    useEffect(() => {
        localStorage.setItem("groups", JSON.stringify(groups));
    }, [groups])

    return (
        <div className='container'>
            <div className="group-wrapper">
                <div className="group-header">
                    <h3>My Group</h3>
                    <TextInput control={control} name="Search" placeholder="Search" />
                </div>

                <Row gutter={[20, 20]}>
                    <Col xs={24} sm={12} md={8} lg={6}>
                        <div className="group-card add-card" onClick={() => setIsModalOpen(true)}>
                            <PlusOutlined className="plus-icon" />
                            <p>Add new group</p>
                        </div>
                    </Col>

                    {groups.map((group, index) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={index}>
                            <div className="group-card">
                                <div className="group-top">
                                    <div className='group-title'>
                                        <img src={image['folder.svg']} alt='img' /><h4>{group.title}</h4>
                                    </div>
                                    <MoreOutlined className="more-icon" />
                                </div>

                                <p>{group.note}</p>
                            </div>
                        </Col>
                    ))}

                </Row>


            </div>
            <CreateGroupModal
                handleSubmit={handleSubmit}
                handleAddGroup={handleAddGroup}
                errors={errors}
                control={control}
                onClose={handleCloseModal}
                onOpen={isModalOpen}
            />
        </div>
    );
};

export default MyGroup;
