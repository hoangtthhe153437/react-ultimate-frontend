import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import UpdateUserModal from "./update.user.modal";
import DetailUserDrawer from "./detail.user.drawer";
import { deleteUserAPI } from "../../services/api.service";
import { useState } from "react";

const UserTable = (props) => {
  const { dataUsers, loadUser, current, pageSize, total, setCurrent, setPageSize } = props;
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [dataUpdate, setDataUpdate] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const confirm = async (id) => {
    await deleteUserAPI(id);
    await loadUser();
    notification.success({
      message: "Xóa user",
      description: "Xóa user thành công",
    });
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => {
        return <>{(index + 1) + (current - 1) * pageSize}</>;
      },
    },
    {
      title: "Id",
      dataIndex: "_id",
      render: (_, record) => {
        return (
          <a
            onClick={() => {
              setDataDetail(record);
              showDrawer();
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "full Name",
      dataIndex: "fullName",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
          />
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => confirm(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {

    //neu thay doi trang : current
    if (pagination && pagination.current) {
      if (+pagination.current !== +current) {
        setCurrent(+pagination.current);
      }
    }

    //neu thay doi tong so phan tu : pageSize
    if (pagination && pagination.pageSize) {
      if (+pagination.pageSize !== +pageSize) {
        setPageSize(+pagination.pageSize);
      }
    }

    console.log("params ss", pagination, filters, sorter, extra);
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {" "}
                {range[0]}-{range[1]} trên {total} rows
              </div>
            );
          },
        }}
        onChange={onChange}
      />
      ;
      <UpdateUserModal
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <DetailUserDrawer
        open={open}
        onClose={onClose}
        dataDetail={dataDetail}
        setOpen={setOpen}
        loadUser={loadUser}
      />
    </>
  );
};

export default UserTable;
