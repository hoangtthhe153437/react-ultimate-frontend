import { Button, Input, Modal, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {
  const { loadUser } = props;
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitButton = async () => {
    const res = await createUserAPI(fullName, email, password, phone);

    if (res.data) {
      notification.success({
        message: "Create user",
        description: "Tạo user thành công",
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
    setIsModalOpen(false);
    setEmail("");
    setFullName("");
    setPassword("");
    setPhone("");
  }

  return (
    <div className="user-form">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <h3>Table Users</h3>
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Create User
        </Button>
      </div>
      <Modal
        title="Create User"
        open={isModalOpen}
        onOk={() => handleSubmitButton()}
        onCancel={() => resetAnCloseModal()}
        maskClosable={false}
        okText="Create"
      >
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
          <span>Email</span>
          <Input
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div>
          <span>Password</span>
          <Input.Password
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
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
    </div>
  );
};

export default UserForm;
