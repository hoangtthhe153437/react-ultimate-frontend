import { useEffect, useState } from "react";
import { Input, Modal, notification } from "antd";
import { updateUserAPI } from "../../services/api.service";

const UpdateUserModal = (props) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const {
    isModalUpdateOpen,
    setIsModalUpdateOpen,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setFullName(dataUpdate.fullName);
      setId(dataUpdate._id);
      setPhone(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmitButton = async () => {
    const res = await updateUserAPI(id, fullName, phone);

    if (res.data) {
      notification.success({
        message: "Update user",
        description: "Cập nhật user thành công",
      });
      resetAnCloseModal();
      await loadUser();
    } else {
      notification.error({
        message: "Create user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetAnCloseModal = () => {
    setIsModalUpdateOpen(false);
    setFullName("");
    setPhone("");
    setId("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update a User"
      open={isModalUpdateOpen}
      onOk={() => handleSubmitButton()}
      onCancel={() => setIsModalUpdateOpen(false)}
      maskClosable={false}
      okText="SAVE"
    >
      <div>
        <span>Id</span>
        <Input value={id} disabled />
      </div>
      <div>
        <span>Full Name</span>
        <Input
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
      </div>

      <div>
        <span>Phone number</span>
        <Input
          value={phone}
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
