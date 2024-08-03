import { Button, Drawer, notification } from 'antd';
import { useState } from 'react';
import { handleUploadFile, updateBookThumbnailAPI } from '../../services/api.service';

const BookDetail = (props) => {
    const { onClose, open, bookDetail, loadBooks, setOpen } = props;
    const [preview, setPreview] = useState(null);
    const [selectFile, setSelectFile] = useState(null);

    const handleUpdateBookAvatar = async () => {
        const resUpload = await handleUploadFile(selectFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded
            //step 2 : Update book
            const restUpdateAvatar = await updateBookThumbnailAPI(bookDetail._id, thumbnail);
            if (restUpdateAvatar.data) {
                setOpen(false);
                setPreview(null);
                setSelectFile(null);
                await loadBooks();

                notification.success({
                    message: "Update book thumbnail",
                    description: "Cập nhật thumbnail thành công"
                })


            } else {
                notification.error({
                    message: "Error update thumbnail",
                    description: JSON.stringify(restUpdateAvatar.message)
                })
            }

        } else {
            notification.error({
                message: "Error Upload file",
                description: JSON.stringify(resUpload.message)
            })
            return;
        }
    }

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

    return (
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
            <p>Id: {bookDetail._id}</p>
            <p>Tiêu đề: {bookDetail.mainText}</p>
            <p>Tác giả: {bookDetail.author}</p>
            <p>Thể loại: {bookDetail.category}</p>
            <p>Giá tiền: {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(bookDetail.price)}</p>
            <p>Số lượng: {bookDetail.quantity}</p>
            <p>Đã bán: {bookDetail.sold}</p>
            <div style={{
                marginTop: "10px",
                height: "100px", width: "150px",
                border: "1px solid #ccc"
            }}>
                <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${bookDetail?.thumbnail}`} />
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
                    <Button type='primary'
                        onClick={() => handleUpdateBookAvatar()}
                    >Save</Button>
                </>
            }

            <div>
                <label htmlFor="btnUpload">Upload Avatar</label>
                <input type="file" hidden name="" id="btnUpload" onChange={(event) => handleOnChangeFile(event)} />
            </div>

        </Drawer>
    )
}

export default BookDetail