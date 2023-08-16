import { NavLink } from "react-router-dom";

import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
} from "assets/images";

import classes from "./styles.module.scss";


const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footerContent}>
        <div className={classes.footerColumn}>
          <h3 className={classes.footerLogo}>Vinglish</h3>
          <div className={classes.footerList}>
            <span className={classes.footerItem}>
              Empower yourself in Vietnamese and use it as your native language
            </span>
          </div>
        </div>
        <div className={classes.footerColumn}>
          <h4 className={classes.footerHeader}>For Students</h4>
          <div className={classes.footerList}>
            <NavLink to="/">Vinglish Blog</NavLink>
            <NavLink to="/">Questions and Answers</NavLink>
            <NavLink to="/">Student discount</NavLink>
            <NavLink to="/">Referral program</NavLink>
            <NavLink to="/">Test your Vietnamese for free</NavLink>
            <NavLink to="/">Test your vocab</NavLink>
            <NavLink to="/">Free Vietnamese courses</NavLink>
          </div>
        </div>
        <div className={classes.footerColumn}>
          <h4 className={classes.footerHeader}>For Tutors</h4>
          <div className={classes.footerList}>
            <NavLink to="/">Become an online tutor</NavLink>
            <NavLink to="/">Become a coach online</NavLink>
          </div>
        </div>
        <div className={classes.footerColumn}>
          <h4 className={classes.footerHeader}>About Us</h4>
          <div className={classes.footerList}>
            <NavLink to="/">Who we are</NavLink>
            <NavLink to="/">How it works</NavLink>
            <NavLink to="/">Vinglish certificates</NavLink>
            <NavLink to="/">Work at Vinglish</NavLink>
          </div>
        </div>
      </div>

      <div className={classes.footerCopyRight}>
        <div>© 2023 Vinglish. All Rights Reserved | Privacy</div>
        <div className={classes.icons}>
          <FacebookIcon />
          <InstagramIcon />
          <TwitterIcon />
          <YoutubeIcon />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
