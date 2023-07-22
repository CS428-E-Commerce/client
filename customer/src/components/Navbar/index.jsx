import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import classes from "./styles.module.scss";
import { MenuIcon } from "assets/images/icons";

const Navbar = memo(() => {
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
            <NavLink to="/" className={classes.navLink}>
              Find a class
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink to="/login" className={clsx(classes.navLink, classes.navLinkButton)}>
              Login
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
});

export default Navbar;
