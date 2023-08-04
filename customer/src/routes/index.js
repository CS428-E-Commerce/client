import FindTutorsPage from "pages/FindTutors";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import StudentRegisterPage from "pages/StudentRegister";
import TutorProfilePage from "pages/TutorProfile";
import TutorRegisterPage from "pages/TutorRegister";
import MyCourse from "pages/MyCourse";

const privateRoutes = [
  // { path: "/", component: HomePage }
];

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/student-signup", component: StudentRegisterPage },
  { path: "/tutor-signup", component: TutorRegisterPage },
  { path: "/find-tutors", component: FindTutorsPage },
  { path: "/tutor/:id", component: TutorProfilePage },
  { path: "/my-course", component: MyCourse },
];

export { privateRoutes, publicRoutes };
