import { useState } from 'react';
import { Button, Input, InputNumber, message, Modal, notification, Select } from 'antd';
import { createBookAPI, handleUploadFile } from '../../services/api.service';

const BookCreate = (props) => {
    const { isModalOpen, setIsModalOpen, loadBooks } = props;
    const [thumbnail, setThumbnail] = useState(null);
    const [mainText, setMainText] = useState(null);
    const [author, setAuthor] = useState(null);
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState(null);
    const [selectFile, setSelectFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleCancel = () => {
        setAuthor(null);
        setMainText(null);
        setPrice(null);
        setQuantity(null);
        setCategory(null);
        setThumbnail(null);
        setSelectFile(null);
        setPreview(null);
        setCategory(null);
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setCategory(value);
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

    const changePrice = (value) => {
        setPrice(value);
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

        const resCreateBook = await createBookAPI(newAvatar, mainText, author, price, +quantity, category);

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


    return (
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleUpdateUserAvatar} onCancel={handleCancel}>
            <div>
                <span>Tiêu đề</span>
                <Input onChange={(event) => setMainText(event.target.value)} value={mainText} />
            </div>
            <div>
                <span>Tác giả</span>
                <Input onChange={(event) => setAuthor(event.target.value)} value={author} />
            </div>
            <div>
                <span>Giá tiền</span>
                <InputNumber
                    value={price}
                    onChange={changePrice}
                    addonAfter="đ"
                    defaultValue={0}
                    controls
                />
            </div>
            <div>
                <span>Số lượng</span>
                <Input onChange={(event) => setQuantity(event.target.value)} value={quantity} />
            </div>
            <div>
                <p>Thể loại</p>
                <Select
                    onChange={handleChange}
                    showSearch
                    style={{
                        width: "100%",
                    }}
                    value={category}
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
            </div>

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
                    <input type="file" hidden name="" id="btnUpload" onChange={(event) => handleOnChangeFile(event)} />
                </div>}
        </Modal>
    )
}

export default BookCreate;