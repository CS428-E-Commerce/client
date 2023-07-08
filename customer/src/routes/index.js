import FindTutorsPage from "pages/FindTutors";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import TutorProfilePage from "pages/TutorProfile";

const privateRoutes = [
  // { path: "/", component: HomePage }
];

const publicRoutes = [
  { path: "/", component: FindTutorsPage },
  { path: "/login", component: LoginPage },
  { path: "/find-tutors", component: FindTutorsPage },
  { path: "/tutor-profile", component: TutorProfilePage },
];

export { privateRoutes, publicRoutes };
