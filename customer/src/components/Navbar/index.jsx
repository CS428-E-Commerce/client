import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import classes from "./styles.module.scss";
import { MenuIcon } from "assets/images/icons";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

const Navbar = memo(() => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(show => !show);

  return (
    <nav className={classes.navbar}>
      <NavLink to="/" className={classes.brand}>
        Vinglish
      </NavLink>

      <button className={classes.menuToggler} onClick={toggleShow}>
        <MenuIcon className={classes.menuTogglerIcon} />
      </button>

      <div
        className={clsx(classes.navbarContainer, {
          [classes.show]: show,
        })}
      >
        <ul className={classes.navbarContent}>
          <li className={classes.navItem}>
            <NavLink to="/find-tutors" className={classes.navLink}>
              Find tutors
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/" className={classes.navLink}>
              Become a tutor
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/courses" className={classes.navLink}>
              Find a class
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <div
              onClick={() => {
                if (localStorage.getItem("token")) {
                  localStorage.clear();
                  dispatch(push(`/`));
                } else {
                  dispatch(push(`/login`));
                }
              }}
              className={clsx(classes.navLink, classes.navLinkButton)}
            >
              {localStorage.getItem("token") ? "Logout" : "Login"}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
