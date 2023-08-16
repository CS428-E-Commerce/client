import CoursesPage from "pages/Courses";
import TutorsPage from "pages/Tutors";
import LoginPage from "pages/Login";
import TutorDetailPage from "pages/TutorDetail";
import SignupPage from "pages/Signup";
import { Redirect } from "react-router";
import CourseDetailPage from "pages/CourseDetail";

const privateRoutes = [
  { path: "/", exact: true, component: () => <Redirect to="/tutors" /> },
  { path: "/tutors", component: TutorsPage },
  { path: "/tutor/:tutorId", component: TutorDetailPage },
  { path: "/courses", component: CoursesPage },
  { path: "/courses/:courseId", component: CourseDetailPage },
];

const publicRoutes = [
  { path: "/login", component: LoginPage },
  { path: "/signup", component: SignupPage },
];

export { privateRoutes, publicRoutes };
