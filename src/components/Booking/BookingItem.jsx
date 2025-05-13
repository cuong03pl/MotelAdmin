import React, { useState } from "react";
import { convertPrice } from "../../utils/convertPrice";

export default function BookingItem({ booking }) {
  console.log(booking);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [name, setName] = useState(booking?.name);
  const handleOpenModal = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="p-4 text-sm">
          <div className="text-sm line-clamp-4">{booking?.post?.title}</div>
        </td>
        <td class="p-4 text-sm">
          <div className="text-sm line-clamp-4">{booking?.user?.fullName}</div>
        </td>
        <td class="p-4 text-sm">
          <div className="text-sm line-clamp-4">
            {booking?.user?.phoneNumber}
          </div>
        </td>
        <td class="p-4 text-sm">
          <div className="text-sm line-clamp-4">{convertPrice(booking?.post?.price)}</div>
        </td>
        <td class="p-4 text-sm">
          <div className="text-sm line-clamp-4">{convertPrice(booking?.price)}</div>
        </td>
        <td class="p-4 text-sm">
          {booking?.status === 1 && (
            <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
              Thành công
            </span>
          )}
          {booking?.status === 0 && (
            <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
              Chờ xử lý
            </span>
          )}
          {booking?.status === 2 && (
            <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-white dark:bg-red-600">
              Đã hủy
            </span>
          )}
        </td>
        <td class="px-2">
          <div class="flex items-center text-sm">
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
          </div>
        </td>
      </tr>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px] max-h-[500px] overflow-y-scroll">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">Chi tiết</div>
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
            <div className=" gap-3 w-full">
              <label class="block text-sm mb-2">
                <span class="text-gray-700 dark:text-gray-400">
                  Tên bài viết
                </span>
                <input
                  class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                  placeholder=""
                  readOnly
                  value={booking?.post?.title}
                />
              </label>
            </div>
            <div className="flex items-center gap-3">
              <div className="">
                <label class="block text-sm mb-2">
                  <span class="text-gray-700 dark:text-gray-400">
                    Người cọc
                  </span>
                  <input
                    class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                    placeholder=""
                    readOnly
                    value={booking?.user?.fullName}
                  />
                </label>
              </div>
              <div className="">
                <label class="block text-sm mb-2">
                  <span class="text-gray-700 dark:text-gray-400">
                    Số điện thoại người cọc
                  </span>
                  <input
                    class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                    placeholder=""
                    readOnly
                    value={booking?.user?.phoneNumber}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <label class="block text-sm mb-2">
                <span class="text-gray-700 dark:text-gray-400">Giá:</span>
                <input
                  class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                  placeholder=""
                  readOnly
                  value={convertPrice(booking?.post?.price)}
                />
              </label>
              <label class="block text-sm mb-2">
                <span class="text-gray-700 dark:text-gray-400">Tiền trả:</span>
                <input
                  class="block w-full mt-1 text-sm border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                  placeholder=""
                  readOnly
                  value={convertPrice(booking?.price)}
                />
              </label>
            </div>
            <div className="flex gap-6">
              <label class="flex items-center gap-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">
                  Trạng thái:{" "}
                </span>
                {booking?.status === 1 && (
                  <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                    Thành công
                  </span>
                )}
                {booking?.status === 0 && (
                  <span class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                    Chờ xử lý
                  </span>
                )}
                {booking?.status === 2 && (
                  <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-white dark:bg-red-600">
                    Đã hủy
                  </span>
                )}
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
