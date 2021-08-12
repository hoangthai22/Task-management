import AdminHomePage from "./../containers/AdminHomePage/index";
import Taskboard from "../containers/Taskboard/index";
import LoginPage from "../containers/LoginPage";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LayersIcon from "@material-ui/icons/Layers";
import SignupPage from "../containers/SignupPage";

export const API_ENDPOINT = "https://task-management-nodejs-api.herokuapp.com/v1";

export const STATUSES = [
  {
    value: 0,
    label: "READY",
  },
  {
    value: 1,
    label: "IN PROGRESS",
  },
  {
    value: 2,
    label: "COMPLETED",
  },
];

export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202,
  NOT_FOUND: 404,
  UNAUTHORIZATION: 401,
};

export const ADMIN_ROUTES = [
  {
    path: "/admin",
    name: "Admin Page",
    exact: true,
    component: () => <AdminHomePage />,
    componentIcon: <DashboardIcon />,
  },
  {
    path: "/admin/task-board",
    name: "Manage Task",
    exact: true,
    component: () => <Taskboard />,
    componentIcon: <LayersIcon />,
  },
];

export const ROUTES = [
  {
    path: "/",
    name: "Login Page",
    exact: true,
    component: () => <LoginPage />,
  },
  {
    path: "/signup",
    name: "Sign up Page",
    exact: true,
    component: () => <SignupPage />,
  },
];
