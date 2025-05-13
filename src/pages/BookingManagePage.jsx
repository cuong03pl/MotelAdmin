import axios from "axios";
import React, { useEffect, useState } from "react";
import Users from "../components/Users/Users";
import { useSearchParams } from "react-router-dom";
import pagination from "../config/pagination";
import ReactPaginate from "react-paginate";
import { DeleteUser, ExportBooking, GetBookings } from "../services/fetchAPI";
import Booking from "../components/Booking/Booking";

export default function BookingManagePage() {
  const [bookings, setBookings] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  useEffect(() => {
    const fetchAPI = async () => {
      await GetBookings({
        params: {
          page: page,
          pageSize: pagination.pageSize,
        },
      })
        .then((res) => {
          setBookings(res.data.data);

          setTotalPage(res?.data?.totalPages);
        })
        .catch((err) => console.log(err));
    };
    fetchAPI();
  }, [isReload, page]);

  useEffect(() => {
    const pageParam = Number(searchParams.get("page")) || 1;
    setSearchParams({ page: Number(pageParam) });

    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);
  const handlePageClick = (event) => {
    setSearchParams({ page: event.selected + 1 });
  };
  const handleExportReport = async () => {
    try {
      const res = await ExportBooking();
      
      // Tạo blob từ dữ liệu phản hồi
      const blob = new Blob([res.data], { type: 'application/pdf' });
      
      // Kiểm tra kích thước blob để xác nhận nó có dữ liệu
      if (blob.size === 0) {
        alert('Không có dữ liệu để xuất báo cáo hoặc có lỗi xảy ra');
        return;
      }
      
      // Tạo URL để tải xuống
      const url = window.URL.createObjectURL(blob);
      
      // Tạo phần tử a để tải xuống
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
      const fileName = `booking_${timestamp}.pdf`;
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Giải phóng URL object
      window.URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Lỗi khi xuất báo cáo:', err);
      alert('Không thể xuất báo cáo. Vui lòng thử lại sau.');
    }
  };
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="flex items-center justify-between">
        <div className="text-[24px] font-semibold">Quản lý thanh toán</div>
        <button
          onClick={handleExportReport}
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Xuất báo cáo
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="p-4">Tên bài viết</th>
              <th className="p-4">Người cọc</th>
              <th className="p-4">Số điện thoại người cọc</th>
              <th className="p-4">Giá</th>
              <th className="p-4">Tiền trả</th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <Booking bookings={bookings} />
          </tbody>
        </table>
      </div>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3"></span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <ReactPaginate
            nextLabel={
              <svg
                class="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            }
            previousLabel={
              <svg
                class="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            }
            breakLabel="..."
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            initialPage={page > 0 ? page - 1 : 0}
            containerClassName="inline-flex items-center space-x-2"
            pageClassName="px-3 py-1 rounded-md  h-[40px] flex items-center text-[16px] cursor-pointer"
            activeClassName="bg-purple-600 text-white"
            previousClassName="px-3 py-1  rounded-l-md h-[40px] flex items-center text-[16px] cursor-pointer"
            nextClassName="px-3 py-1  rounded-r-md h-[40px] flex items-center text-[16px] cursor-pointer"
            pageLinkClassName="px-3 py-1 h-[40px]  flex items-center"
          />
        </span>
      </div>
    </div>
  );
}
