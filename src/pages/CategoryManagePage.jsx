import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Categories from "../components/Categories/Categories";
import {
  CreateCategory,
  DeleteCategory,
  GetCategories,
  UpdateCategory,
} from "../services/fetchAPI";

export default function CategoryManagePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  // Lấy ra các category
  useEffect(() => {
    const fetchAPI = async () => {
      await GetCategories()
        .then((res) => {
          setCategories(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchAPI();
  }, [isReload]);
  // Xử lý xóa
  const handleDeleteCategory = async (id, handleOpenModalDelete) => {
    try {
      await DeleteCategory(id);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  // Xử lý update
  const handleUpdateCategory = async (id, data, handleOpenModal) => {
    data.id = id;
    try {
      await UpdateCategory(id, data);

      setIsReload(isReload ? false : true);
      handleOpenModal();
      console.log("okkk");
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // XỬ lý tạo
  const handleCreate = async () => {
    try {
      await CreateCategory({ name });
      setName("");
      setIsReload(isReload ? false : true);
      handleOpenModal();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  const handleOpenModal = () => {
    setIsOpen(isOpen ? false : true);
  };
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="flex items-center justify-between">
        <div class="text-[24px] font-semibold">Categories Manage</div>
        <button
          type="button"
          onClick={handleOpenModal}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="p-4">Title</th>
              <th class="p-4">Slug</th>
              <th class="p-4">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <Categories
              categories={categories}
              onUpdate={handleUpdateCategory}
              onDelete={handleDeleteCategory}
            />
          </tbody>
        </table>
      </div>
      <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
        <span class="flex items-center col-span-3"></span>
        <span class="col-span-2"></span>
        {/* <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
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
        </span> */}
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px] max-h-[500px] overflow-y-scroll">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">Detail</div>
              <div className="">
                <button
                  onClick={handleOpenModal}
                  class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="">
              <label class="block text-sm mb-2">
                <span class="text-gray-700 dark:text-gray-400">Title</span>
                <input
                  class="block w-full mt-1 text-sm outline-none border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700  dark:text-gray-300 "
                  placeholder=""
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreate}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
