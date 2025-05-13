import axios from "axios";
import React, { useEffect, useState } from "react";
import Posts from "../components/Posts/Posts";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import pagination from "../config/pagination";
import { DeletePost, GetPosts } from "../services/fetchAPI";
import PostsFilter from "../components/Posts/PostsFilter";

export default function PostManagePage() {
  const [posts, setPosts] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPage] = useState(1);
  const [filters, setFilters] = useState({
    price: searchParams.get("price") || "",
    status: searchParams.get("status") || "",
  });
  const [loading, setLoading] = useState(false);
  
  // Xử lý thay đổi bộ lọc
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Cập nhật URL params
    const params = { page: 1 };
    if (newFilters.price) params.price = newFilters.price;
    if (newFilters.status) params.status = newFilters.status;
    
    setSearchParams(params);
    setPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  // Lấy ra các post
  useEffect(() => {
    const fetchAPI = async () => {
      setLoading(true);
      try {
        // Chuẩn bị tham số lọc
        const params = {
          page: page,
          pageSize: pagination.pageSize,
        };
        
        // Thêm các tham số lọc nếu có
        if (filters.price) {
          const [minPrice, maxPrice] = filters.price.split('-');
          params.minPrice = minPrice;
          params.maxPrice = maxPrice;
        }
        
        if (filters.status) {
          params.isBrowse = filters.status;
        }
        
     
        console.log(params);
        
        const response = await GetPosts({ params });
        setTotalPage(response?.data?.totalPages);
        setPosts(response?.data?.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAPI();
  }, [isReload, page, filters]);
  
  useEffect(() => {
    // Đồng bộ URL params với state
    const pageParam = Number(searchParams.get("page")) || 1;
    const priceParam = searchParams.get("price") || "";
    const statusParam = searchParams.get("status") || "";
    
    // Cập nhật state nếu URL params thay đổi
    if (filters.price !== priceParam || 
        filters.status !== statusParam ) {
      setFilters({
        price: priceParam,
        status: statusParam,
      });
    }
    
    if (page !== pageParam) {
      setPage(pageParam);
    }
  }, [searchParams]);
  
  // Xóa bài viết
  const handleDeletePost = async (id, handleOpenModalDelete) => {
    try {
      await DeletePost(id);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  
  const handlePageClick = (event) => {
    const params = { page: event.selected + 1 };
    if (filters.price) params.price = filters.price;
    if (filters.status) params.status = filters.status;
    
    setSearchParams(params);
  };
  
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="text-[24px] font-semibold mb-4">Quản lý bài viết</div>
      
      {/* Thêm bộ lọc */}
      <PostsFilter filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Đang tải dữ liệu...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-4">Không tìm thấy bài viết nào phù hợp với bộ lọc</div>
        ) : (
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="p-4">Người đăng</th>
                <th className="p-4">Tiêu đề</th>
                <th className="p-4">Slug</th>
                <th className="p-4">Mô tả</th>
                <th className="p-4">Giá</th>
                <th className="p-4">Địa chỉ</th>
                <th className="p-4">Diện tích</th>
                <th className="p-4">Trạng thái</th>
                <th className="p-4">Duyệt</th>
                <th className="p-4">Thanh toán</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <Posts onDelete={handleDeletePost} posts={posts} />
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
