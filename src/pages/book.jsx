import { useEffect, useState } from "react";
import BookTable from "../components/book/book.table";
import { fetchAllBookAPI } from "../services/api.service";
import { Button, notification, Modal } from "antd";
import BookCreate from "../components/book/book.create";
import BookCreateUnController from "../components/book/book.create.uncontroller";

const BookPage = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [dataBooks, setDataBooks] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  // Book Create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setLoadingTable(true);
    loadBooks();
    setLoadingTable(false);
  }, [current, pageSize]);

  const loadBooks = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data && res.data.result) {
      setTotal(res.data.meta.total);
      setCurrent(res.data.meta.current);
      setDataBooks(res.data.result);
    } else {
      notification.error({
        message: "Lỗi",
        description: "Không thể lấy dữ liệu sách",
      });
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <h1>Book Table</h1>
        <Button type="primary" onClick={showModal}>Create book</Button>
      </div>
      <BookTable
        dataBooks={dataBooks}
        current={current}
        pageSize={pageSize}
        total={total}
        setCurrent={setCurrent}
        setPageSize={setPageSize}
        loadBooks={loadBooks}
        loadingTable={loadingTable}
      />
      {/* <BookCreate isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadBooks={loadBooks} /> */}
      <BookCreateUnController isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} loadBooks={loadBooks} />
    </>
  );
};

export default BookPage;
