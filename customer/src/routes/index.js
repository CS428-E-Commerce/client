import AllCoursesPage from "pages/FindCourses";
import ChangePasswordPage from "pages/ChangePassword";
import CourseDetail from "pages/CourseDetail";
import CourseSchedule from "pages/CourseSchedule";
import CreateCourse from "pages/CreateCourse";
import FindTutorsPage from "pages/FindTutors";
import HomePage from "pages/Home";
import LoginPage from "pages/Login";
import MyCourse from "pages/MyCourse";
import MyProfilePage from "pages/MyProfile";
import MyTutorCourses from "pages/MyTutorCourses";
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
  { path: "/change-password", component: ChangePasswordPage },
];

const tutorRoutes = [
  { path: "/dashboard/courses", component: MyTutorCourses },
  { path: "/dashboard/courses/create", component: CreateCourse },
  { path: "/dashboard/schedules", component: CourseSchedule },
];

export { privateRoutes, publicRoutes, tutorRoutes };
