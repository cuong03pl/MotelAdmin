import React, { useEffect, useState } from "react";
import Reports from "../components/Reports/Reports";
import axios from "axios";

export default function ReportManagePage() {
  const [reports, setReports] = useState([]);
  const [isReload, setIsReload] = useState(false);

  useEffect(() => {
    const fetchAPI = () => {
      axios
        .get("https://localhost:7224/api/Reports")
        .then((res) => setReports(res.data))
        .catch((err) => console.log(err));
    };
    fetchAPI();
  }, [isReload]);
  const handleDelete = async (id, handleOpenModalDelete) => {
    try {
      await axios.delete(`https://localhost:7224/api/Reports/${id}`);
      setIsReload(isReload ? false : true);
      handleOpenModalDelete();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };
  return (
    <div class="w-full overflow-hidden rounded-lg shadow-xs">
      <div class="text-[24px] font-semibold">Report Manage</div>
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
          <thead>
            <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
              <th class="p-4">User Report</th>
              <th class="p-4">Title</th>
              <th class="p-4">Reason</th>
              <th class="p-4">Note</th>
              <th class="p-4">Status</th>
              <th class="p-4">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
            <Reports onDelete={handleDelete} reports={reports} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
