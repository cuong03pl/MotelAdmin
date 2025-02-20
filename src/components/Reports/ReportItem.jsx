import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowseReport } from "../../services/fetchAPI";

export default function ReportItem({ report, onDelete }) {
  const [isBrowse, setIsBrowse] = useState(report?.status);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBrowse, setIsOpenBrowse] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(isOpen ? false : true);
  };
  const handleOpenModalBrowse = () => {
    setIsOpenBrowse(isOpenBrowse ? false : true);
  };
  const handleOpenModalDelete = () => {
    setIsOpenDelete(isOpenDelete ? false : true);
  };
  // Xử lý duyệt báo cáo
  const handleBrowse = async (status) => {
    try {
      await BrowseReport(report?.id);
      setIsBrowse(status);
      setIsOpenBrowse(false);
    } catch (error) {
      console.error("Error updating report:", error);
    }
  };
  useEffect(() => {
    setIsBrowse(report?.status);
  }, [report]);

  const handleDelete = async (id) => {
    onDelete(id, handleOpenModalDelete);
  };
  return (
    <>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="p-4 text-sm">{report?.user?.fullName}</td>
        <td class="p-4 text-sm">{report?.post?.title}</td>
        <td class="p-4 text-sm">{report?.reason ?? "-"}</td>
        <td class="p-4 text-sm text-nowrap">{report?.note}</td>
        <td class="p-4 text-xs">
          {isBrowse === 1 && (
            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
              True
            </span>
          )}
          {isBrowse === 0 && (
            <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
              False
            </span>
          )}
        </td>
        <td class="p-4">
          <div class="flex items-center text-sm">
            <button
              onClick={handleOpenModalBrowse}
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
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
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path
                  fillRule="evenodd"
                  d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              onClick={handleOpenModalDelete}
              class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-5 h-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px]">
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

            <label class="block text-sm mb-2">
              <span class="text-gray-700 dark:text-gray-400">Full Name</span>
              <input
                class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                placeholder=""
                readOnly
                value={"Cuong 1"}
              />
            </label>
            <label class="block text-sm mb-2">
              <span class="text-gray-700 dark:text-gray-400">Title</span>
              <input
                class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                placeholder=""
                readOnly
                value={"Bai 1"}
              />
            </label>
            <label class="block text-sm mb-2">
              <span class="text-gray-700 dark:text-gray-400">Reason</span>
              <input
                class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                placeholder=""
                readOnly
                value={report?.reason}
              />
            </label>

            <label class="block text-sm mb-2">
              <span class="text-gray-700 dark:text-gray-400">Note</span>
              <textarea
                rows={5}
                class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                placeholder=""
                readOnly
                value={report?.note}
              ></textarea>
            </label>
            <div className="flex gap-6">
              <label class="flex items-center gap-4 text-sm  ">
                <span class="text-gray-700 dark:text-gray-400">Status: </span>
                {isBrowse === 1 && (
                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    True
                  </span>
                )}

                {isBrowse === 0 && (
                  <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                    False
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
      )}
      {isOpenBrowse && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">
                {!report?.status ? "Browse" : "Unsubscribe"}
              </div>
              <div className="">
                <button
                  onClick={handleOpenModalBrowse}
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
              {isBrowse
                ? "Are you sure you want to browse this report?"
                : "Are you sure you want to unsubscribe this report?"}
            </div>
            <div className="flex justify-end">
              {!isBrowse ? (
                <button
                  onClick={() => handleBrowse(1)}
                  className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Browse
                </button>
              ) : (
                <button
                  onClick={() => handleBrowse(0)}
                  className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                >
                  Unsubscribe
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {isOpenDelete && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px]">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">Delete</div>
              <div className="">
                <button
                  onClick={handleOpenModalDelete}
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
              Are you sure you want to delete this article?
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(report?.id)}
                className="w-full px-5 py-3 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
