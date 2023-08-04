import AllCoursesPage from "pages/AllCourses";
import CourseDetail from "pages/CourseDetail";
import FindTutorsPage from "pages/FindTutors";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import MyCourse from "pages/MyCourse";
import MyProfilePage from "pages/MyProfile";
import ProfilePage from "pages/Profile";
import StudentRegisterPage from "pages/StudentRegister";
import TutorRegisterPage from "pages/TutorRegister";

const privateRoutes = [
  // { path: "/", component: HomePage }
];

const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/login", component: LoginPage },
  { path: "/student-signup", component: StudentRegisterPage },
  { path: "/tutor-signup", component: TutorRegisterPage },
  { path: "/find-tutors", component: FindTutorsPage },
  { path: "/my-profile", component: MyProfilePage },
  { path: "/profile/:id", component: ProfilePage },
  { path: "/courses", component: AllCoursesPage },
  { path: "/courses/:courseId", component: CourseDetail },
  { path: "/my-course", component: MyCourse },
];

export { privateRoutes, publicRoutes };
