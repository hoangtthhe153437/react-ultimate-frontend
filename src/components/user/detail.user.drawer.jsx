import { Drawer, Button, notification } from "antd";
import { useState } from "react";
import { handleUploadFile, updateUserAvatarAPI } from "../../services/api.service";

const DetailUserDrawer = (props) => {
  const { open, onClose, dataDetail, setOpen, loadUser } = props;

  const [selectFile, setSelectFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
    const resUpload = await handleUploadFile(selectFile, "avatar");
    if (resUpload.data) {
      const newAvatar = resUpload.data.fileUploaded
      //step 2 : Update user
      const restUpdateAvatar = await updateUserAvatarAPI(newAvatar, dataDetail._id, dataDetail.fullName, dataDetail.phone);
      if (restUpdateAvatar.data) {
        setOpen(false);
        setPreview(null);
        setSelectFile(null);
        await loadUser();

        notification.success({
          message: "Update user avatar",
          description: "Cập nhật avatar thành công"
        })


      } else {
        notification.error({
          message: "Error update avatar",
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

  console.log(">>> preview", preview)

  return (
    <>
      <Drawer title="Basic Drawer" width={"40vw"} onClose={onClose} open={open}>
        <p>ID: {dataDetail?._id}</p>
        <p>Full Name: {dataDetail?.fullName}</p>
        <p>Email: {dataDetail?.email}</p>
        <p>Avatar:</p>
        <div style={{
          marginTop: "10px",
          height: "100px", width: "150px",
          border: "1px solid #ccc"
        }}>
          <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
            src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail?.avatar}`} />
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
              onClick={() => handleUpdateUserAvatar()}
            >Save</Button>
          </>
        }


        <div>
          <label htmlFor="btnUpload">Upload Avatar</label>
          <input type="file" hidden name="" id="btnUpload" onChange={(event) => handleOnChangeFile(event)} />
        </div>
        {/* <Button type="primary">Upload Avatar</Button> */}
      </Drawer>
    </>
  );
};

export default DetailUserDrawer;
