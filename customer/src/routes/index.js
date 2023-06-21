import HomePage from "pages/Home";
import LoginPage from "pages/Login";

const privateRoutes = [{ path: "/", component: HomePage }];

const publicRoutes = [{ path: "/login", component: LoginPage }];

export { privateRoutes, publicRoutes };
