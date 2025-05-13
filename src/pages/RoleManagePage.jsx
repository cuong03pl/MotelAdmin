import axios from "axios";
import React, { useEffect, useState } from "react";
import Roles from "../components/Roles/Roles";
import { CreateRole, DeleteRole, GetRoles, UpdateRole } from "../services/fetchAPI";

export default function RoleManagePage() {
  const [roles, setRoles] = useState([]);
  const [isReload, setIsReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState();
  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await GetRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchAPI();
  }, [isReload]);
  const handleDelete = async (id, handleOpenModalDelete) => {
    try {
      DeleteRole(id);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  const handleOpenCreateModal = () => {
    setIsOpen(isOpen ? false : true);
  };
  const handleCreate = async () => {
    try {
      await CreateRole({ roleName: title });
      setTitle("");
      setIsReload(isReload ? false : true);
      handleOpenCreateModal();
    } catch (error) {
      console.error("Error creating role:", error);
    }
  };
  const handleUpdate = async (id, data, handleOpenModal) => {
    data.id = id;
    try {
      await UpdateRole(id, data);
      handleOpenModal();
      setIsReload(isReload ? false : true);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      <div className="flex items-center justify-between">
        <div className="text-[24px] font-semibold">Quản lý vai trò</div>
        <button
          type="button"
          onClick={handleOpenCreateModal}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Tạo mới
        </button>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th className="p-4">Tên vai trò</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <Roles
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              roles={roles}
            />
          </tbody>
        </table>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center">
          <div class="px-4 py-6 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 w-[600px] max-h-[500px] overflow-y-scroll">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[24px] font-semibold">Tạo mới</div>
              <div className="">
                <button
                  onClick={handleOpenCreateModal}
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
                <span class="text-gray-700 dark:text-gray-400">Tên role</span>
                <input
                  class="block w-full mt-1 text-sm outline-none border-[#e2e8f0] border-[1px] border-[solid] py-[8px] px-3 rounded-[8px] dark:border-gray-600 dark:bg-gray-700  dark:text-gray-300 "
                  placeholder=""
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCreate}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
