import routes from "../config/routes";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import PostManagePage from "../pages/PostManagePage";
import RegisterPage from "../pages/RegisterPage";
import UserManagePage from "../pages/UserManagePage";

export const publicRoutes = [
  {
    path: routes.home,
    component: <DashboardPage />,
  },
  {
    path: routes.login,
    component: <LoginPage />,
  },
  {
    path: routes.register,
    component: <RegisterPage />,
  },
  {
    path: routes.post_manage,
    component: <PostManagePage />,
  },
  {
    path: routes.user_manage,
    component: <UserManagePage />,
  },
];
