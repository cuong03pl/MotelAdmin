import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { Fragment, useEffect } from "react";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { isTokenExpired } from "./utils/checkTokenExpired";
import { logOut } from "./features/user/userSlice";

function App() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user?.user_token);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    const publicPages = ["/register"];
    if (!publicPages.includes(location.pathname)) {
      if (isTokenExpired(token) || token === "") {
        navigate("/login");
        dispatch(logOut());
      }
    }
  }, [navigate, token]);

  return (
    <div className="bg-[#f1f5f9]">
      <Routes>
        {publicRoutes.map((route, index) => {
          let Comp = route.component;
          let Layout = DefaultLayout;
          if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={<Layout>{Comp}</Layout>}
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
