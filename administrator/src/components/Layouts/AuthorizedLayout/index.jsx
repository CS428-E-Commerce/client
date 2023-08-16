import { memo } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import classes from "./styles.module.scss";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const AuthorizedLayout = memo(props => {
  const { children } = props;

  const data = [
    {
      id: "tutors",
      name: "Tutors",
      link: "/tutors",
    },
    {
      id: "courses",
      name: "Courses",
      link: "/courses",
    },
  ];

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const routeName = pathname?.split("/")?.[1] ?? null;

  return (
    <div className={classes.container}>
      <Sidebar
        width="fit-content"
        rootStyles={{
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <div className={classes.sidebarContainer}>
          <div>
            <Link className="logo" to="/">
              Vinglish
            </Link>
            <p className="label">ADMIN PANEL</p>
            <Menu>
              {data?.map(item => {
                return (
                  <MenuItem
                    key={item?.id}
                    component={
                      <Link
                        className={item?.id === routeName ? "active" : ""}
                        to={item?.link}
                      />
                    }
                  >
                    {item?.name}
                  </MenuItem>
                );
              })}
            </Menu>
          </div>

          <div>
            <p className="label mb-0">Welcome,</p>
            <p className="label mb-2">{localStorage.getItem("email") ?? "N/A"}</p>
            <Menu>
              <MenuItem onClick={() => { localStorage.clear(); dispatch(push("/login")) }}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>

      <div className={classes.children}>{children}</div>
    </div>
  );
});

export default withRouter(AuthorizedLayout);
