import { useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { createBookAPI, handleUploadFile } from '../../services/api.service';

const BookCreateUnController = (props) => {
    const { isModalOpen, setIsModalOpen, loadBooks } = props;
    const [preview, setPreview] = useState(null);
    const [selectFile, setSelectFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setSelectFile(null);
        setPreview(null);
        setThumbnail(null);
        setIsModalOpen(false);
    };

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectFile(null);
            setPreview(null);
        }

        const file = event.target.files[0];
        if (file) {
            setSelectFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    const handleUpdateUserAvatar = async () => {
        const resUpload = await handleUploadFile(selectFile, "book");
        var newAvatar = "";
        if (resUpload.data) {
            newAvatar = resUpload.data.fileUploaded
            setThumbnail(newAvatar);

        } else {
            notification.error({
                message: "Error Upload file",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }

        const resCreateBook = await createBookAPI(newAvatar, mainText, author, +price, +quantity, category);

        if (resCreateBook.data) {
            message.success("Tạo sách thành công");
            await loadBooks();
        } else {
            notification.error({
                message: "Error Create Book",
                description: JSON.stringify(resCreateBook.message)
            })
        }

        handleCancel();
    }

    const onFinish = async (values) => {
        debugger
        const resUpload = await handleUploadFile(selectFile, "book");
        var newAvatar = "";
        if (resUpload.data) {
            newAvatar = resUpload.data.fileUploaded
            setThumbnail(newAvatar);

        } else {
            notification.error({
                message: "Error Upload file",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }

        const resCreateBook = await createBookAPI(newAvatar, values.mainText, values.author, values.price, +values.quantity, values.category);

        if (resCreateBook.data) {
            message.success("Tạo sách thành công");
            await loadBooks();
        } else {
            notification.error({
                message: "Error Create Book",
                description: JSON.stringify(resCreateBook.message)
            })
        }

        handleCancel();
    };


    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={() => form.submit()} onCancel={handleCancel} >
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
            >

                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your mainText!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your author!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!',
                        },
                    ]}
                >
                    <InputNumber
                        addonAfter="đ"
                        defaultValue={0}
                        controls
                    />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your quantity!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your quantity!',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{
                            width: "100%",
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        options={[
                            { value: 'Arts', label: 'Arts' },
                            { value: 'Business', label: 'Business' },
                            { value: 'Comics', label: 'Comics' },
                            { value: 'Cooking', label: 'Cooking' },
                            { value: 'Entertainment', label: 'Entertainment' },
                            { value: 'History', label: 'History' },
                            { value: 'Music', label: 'Music' },
                            { value: 'Sports', label: 'Sports' },
                            { value: 'Teen', label: 'Teen' },
                            { value: 'Travel', label: 'Travel' },
                        ]}
                    />
                </Form.Item>

                {preview &&
                    <>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px", width: "150px",
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                    </>
                }

                {!selectFile &&
                    <div>
                        <label htmlFor="btnUpload" style={{
                            display: "block", width: "100px",
                            height: "20px", background: "orange", marginTop: "10px", borderRadius: "6px",
                            padding: "4px"
                        }}>Upload Avatar</label>
                        <input style={{ display: "none" }} type="file" hidden name="" id="btnUpload" onChange={(event) => handleOnChangeFile(event)} />
                    </div>}
            </Form>
        </Modal >
    )
}

export default BookCreateUnController;