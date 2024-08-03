import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { notification, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllBookAPI } from "../../services/api.service";
import BookDetail from "./book.detail";

const BookTable = (props) => {
  const [open, setOpen] = useState(false);
  const [bookDetail, setBookDetail] = useState({}); //state to store book detail

  const { dataBooks, current, pageSize, total, setCurrent, setPageSize, loadBooks, loadingTable } = props;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => <>{index + 1 + (current - 1) * pageSize}</>,
    },
    {
      title: "Id",
      key: "id",
      render: (_, record) => <a onClick={
        () => {
          setBookDetail(record);
          showDrawer();
        }
      }>{record._id}</a>,
    },
    {
      title: "Tiêu đề",
      dataIndex: "mainText",
      key: "mainText",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text) => {
        if (text) {
          return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(text);
        }
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác giả",
      key: "author",
      dataIndex: "author",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined />
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

  const onChange = async (pagination) => {
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
  };

  return (
    <>
      <div style={{ marginTop: "30px" }}>
        <Table
          columns={columns}
          dataSource={dataBooks}
          rowKey={"_id"}
          loading={loadingTable}
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
        <BookDetail open={open} onClose={onClose} bookDetail={bookDetail} loadBooks={loadBooks} setOpen={setOpen} />
      </div>
    </>
  );
};

export default BookTable;
