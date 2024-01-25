import { Button, Modal } from "antd"
import { PlusOutlined } from '@ant-design/icons'
import React, { useState } from "react"
import TableComponent from "../TableComponent/TableComponent"
const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <React.Fragment>
            <div className="font-bold text-3xl">Quản lí người dùng</div>
            <div className="mt-3">
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={showModal}>
                    <PlusOutlined style={{ fontSize: '60px' }} />
                </Button>
            </div>
            <div className='mt-5'>
                <TableComponent />
            </div>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ style: { backgroundColor: "darkcyan", color: "white" } }}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </React.Fragment>
    )
}
export default AdminUser
