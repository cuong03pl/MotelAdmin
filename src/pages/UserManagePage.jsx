import axios from "axios";
import React, { useEffect, useState } from "react";
import Users from "../components/Users/Users";
import { useSearchParams } from "react-router-dom";
import pagination from "../config/pagination";
import ReactPaginate from "react-paginate";
import { DeleteUser, GetUsers, SetRole } from "../services/fetchAPI";

export default function UserManagePage() {
  const [users, setUsers] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        const params = {
          page: page,
          pageSize: pagination.pageSize,
        };
        
        const response = await GetUsers({ params });
        setUsers(response.data.data);
        setTotalPage(response?.data?.totalPages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
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

  const handleDelete = async (id, handleOpenModalDelete) => {
    try {
      await DeleteUser(id);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleSetRole = async (id, role, handleOpenModal) => {
    try {
      const formData = new FormData();
      if (role) {
        formData.append("roles", role);
      }
      await SetRole(id, formData);
      setIsReload(isReload ? false : true);
      handleOpenModal();
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const handleApproveUser = () => {
    setIsReload(isReload ? false : true);
  };

  const handlePageClick = (event) => {
    setSearchParams({ page: event.selected + 1 });
  };

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="text-[24px] font-semibold mb-4">Quản lý người dùng</div>
      
      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Đang tải dữ liệu...</div>
        ) : users.length === 0 ? (
          <div className="text-center py-4">Không tìm thấy người dùng nào</div>
        ) : (
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="p-4">Họ và tên</th>
                <th className="p-4">Username</th>
                <th className="p-4">Email</th>
                <th className="p-4">Số điện thoại</th>
                <th className="p-4">Chặn</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <Users
                onDelete={handleDelete}
                users={users}
                onSetRole={handleSetRole}
                onApprove={handleApproveUser}
              />
            </tbody>
          </table>
        )}
      </div>
      <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span className="flex items-center col-span-3"></span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <ReactPaginate
            nextLabel={
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            }
            previousLabel={
              <svg
                className="w-4 h-4 fill-current"
                aria-hidden="true"
                viewBox="0 0 20 20"
              >
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                  fillRule="evenodd"
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
