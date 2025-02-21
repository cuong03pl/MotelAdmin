import React, { useEffect, useState } from "react";
import Reviews from "../components/Reviews/Reviews";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import pagination from "../config/pagination";
import { DeleteReview, GetReviews } from "../services/fetchAPI";

export default function ReviewManagePage() {
  const [reviews, setReviews] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  useEffect(() => {
    const fetchAPI = () => {
      GetReviews({
        params: {
          page: page,
          pageSize: pagination.pageSize,
        },
      })
        .then((res) => {
          console.log(res);

          setReviews(res.data.data);
          setTotalPage(res?.data?.totalPages);
        })
        .catch((err) => console.log(err));
    };
    fetchAPI();
  }, [isReload, page]);

  const handleDelete = async (id, handleOpenModalDelete) => {
    try {
      await DeleteReview(id);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

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
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="text-[24px] font-semibold">Quản lý bình luận </div>
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="p-4">Người bình luận</th>
              <th class="p-4">Tiêu đề bài viết</th>
              <th class="p-4">Nội dung</th>
              <th class="p-4">Ngày tạo</th>
              <th class="p-4">Ngày cập nhật</th>
              <th class="p-4"></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <Reviews onDelete={handleDelete} reviews={reviews} />
          </tbody>
        </table>
      </div>
      <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3"></span>
        <span class="col-span-2"></span>
        <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
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
