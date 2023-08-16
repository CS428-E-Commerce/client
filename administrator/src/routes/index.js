import CoursesPage from "pages/Courses";
import TutorsPage from "pages/Tutors";
import LoginPage from "pages/Login";
import SignupPage from "pages/Signup";
import { Redirect } from "react-router";
import TutorProfilePage from "pages/Profile";
import CourseDetail from "pages/CourseDetail";

const privateRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="/tutors" /> },
  { path: "/tutors", component: TutorsPage },
  { path: "/courses", component: CoursesPage },
  { path: "/tutor/:tutorId", component: TutorProfilePage },
  { path: "/course/:courseId", component: CourseDetail },
];

const publicRoutes = [
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
];

export { privateRoutes, publicRoutes };
