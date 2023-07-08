import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import TutorProfilePage from "pages/TutorProfile";

const privateRoutes = [{ path: "/", component: HomePage }];

const publicRoutes = [
  { path: "/login", component: LoginPage },
  { path: "/tutor-profile", component: TutorProfilePage },
];

export { privateRoutes, publicRoutes };
