import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserOne from "../../images/user/user-01.png";
import ClickOutside from "../ClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/user/userSlice";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const token = useSelector((state) => state?.user?.user_token);
  useEffect(() => {
    const fetchAPI = async () => {
      const user_data = jwtDecode(token);

      await axios
        .get(`https://localhost:7224/api/Users/${user_data?.sub}`)
        .then((res) => {
          setUser(res.data);
        });
    };
    if (token) {
      fetchAPI();
    }
  }, [token]);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user?.fullName}
          </span>
          <span className="block text-xs"> {user?.email}</span>
        </span>
        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" />
        </span>
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
          />
        </svg>
      </Link>

      {dropdownOpen && (
        <div className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11 9.625C8.422 9.625 6.359 7.597 6.359 5.122 6.359 2.647 8.422 0.619 11 0.619c2.578 0 4.641 2.028 4.641 4.503 0 2.475-2.063 4.503-4.641 4.503zm0-7.46c-1.719 0-3.094 1.34-3.094 2.956 0 1.616 1.375 2.956 3.094 2.956 1.719 0 3.094-1.34 3.094-2.956 0-1.616-1.375-2.956-3.094-2.956z" />
                  <path d="M17.772 21.416H4.228c-.688 0-1.238-.55-1.238-1.238v-3.094c0-3.368 2.75-6.118 6.118-6.118h3.815c3.369 0 6.119 2.75 6.119 6.118v3.094c0 .688-.55 1.238-1.238 1.238zM4.537 19.869h12.96v-2.785c0-2.51-2.062-4.573-4.573-4.573H9.075c-2.51 0-4.573 2.063-4.573 4.573v2.785z" />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => dispatch(logOut())}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.669 1.444c-.55-.55-1.238-.826-1.994-.826H7.425c-1.169 0-2.166.963-2.166 2.166v1.34H4.297c-.412 0-.79.344-.79.791 0 .447.344.79.79.79h.963v4.572H4.297c-.412 0-.79.344-.79.791 0 .447.344.79.79.79h.963v4.572H4.297c-.412 0-.79.344-.79.79 0 .447.344.79.79.79h.963v1.238c0 1.169.963 2.166 2.166 2.166h8.25c1.546 0 2.818-1.272 2.853-2.818V3.472c-.035-.79-.31-1.511-.86-2.027z" />
                </svg>
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
