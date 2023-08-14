import clsx from "clsx";
import { push } from "connected-react-router";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { MenuIcon } from "assets/images";
import UserMenu from "components/BasicMenu";

import classes from "./styles.module.scss";

const Navbar = memo(({ theme }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(show => !show);

  const email = localStorage.getItem("email");

  return (
    <nav
      className={clsx(classes.container, classes.navbar, {
        [classes[theme]]: !!theme,
      })}
    >
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
            <NavLink to="/tutor-signup" className={classes.navLink}>
              Become a tutor
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/courses" className={classes.navLink}>
              Find a class
            </NavLink>
          </li>
          <li className={classes.navItem}>
            {!!email ? (
              <UserMenu title={email} />
            ) : (
              <div
                onClick={() => dispatch(push(`/login`))}
                className={clsx(classes.navLink, classes.navLinkButton)}
              >
                Login
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
