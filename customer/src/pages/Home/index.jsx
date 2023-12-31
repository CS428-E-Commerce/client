import clsx from "clsx";
import { memo } from "react";
import { Link } from "react-router-dom";
import { register } from "swiper/element/bundle";

import {
  BookImageSrc,
  CommentImageSrc,
  HeroBackgroundSrc,
  HeroImageSrc,
  HowItWorksImageSrc,
  NotificationImageSrc,
  StarsImageSrc,
} from "assets/images";
import Button from "components/Button";

import Panorama from "./components/Panorama";
import Testimonials from "./components/Testimonials";
import classes from "./styles.module.scss";

register();

const HomePage = memo(() => {
  return (
    <main>
      <section
        className={clsx(classes.container, classes.heroSection)}
        style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}
      >
        <div className={classes.heroContent}>
          <h1 className={classes.heroHeading}>
            Unlock your Vietnamese with the best language tutors
          </h1>
          <p className={classes.heroParagraph}>
            Looking for an online Vietnamese tutor? Vinglish is the leading
            online Vietnamese language learning platform worldwide. Book a
            lesson with a private Vietnamese teacher today and start learning.
          </p>
          <Button as={Link} to="/find-tutors" className={classes.heroButton}>
            Learn Now
          </Button>
        </div>
        <div className={classes.heroImageContainer}>
          <img
            className={classes.heroImage}
            src={HeroImageSrc}
            alt="Student learns Vietnamese"
          />
        </div>
      </section>

      <section className={classes.howItWorksSection}>
        <header>
          <h3 className={classes.howItWorksSubHeading}>HOW IT WORKS</h3>
          <h2 className={classes.howItWorksHeading}>
            The best platform for learning Vietnamese
          </h2>
        </header>
        <div>
          <img className={classes.img} src={HowItWorksImageSrc} alt="" />
          <Button as={Link} to="/courses" className={classes.btn}>
            Get Started
          </Button>
        </div>
      </section>

      <section className={classes.platformFeaturesSection}>
        <img className={classes.illustration} src={BookImageSrc} alt="" />
        <div className={classes.container}>
          <div className={classes.featuresContent}>
            <header>
              <Panorama as="h3" style={{ color: "#467B86" }}>
                PLATFORM FEATURES
              </Panorama>
              <h2 className={classes.heading}>Vietnamese and the Platform</h2>
            </header>

            <div className={classes.features}>
              <div className={classes.group}>
                <div className={classes.item}>
                  <h4 className={classes.feature}>Single time class</h4>
                  <p className={classes.desc}>
                    Explores Vietnamese comprehensively and mastering the skills
                    to uses the language.
                  </p>
                </div>

                <div className={classes.item}>
                  <h4 className={classes.feature}>Learn with others</h4>
                  <p className={classes.desc}>
                    Unleash your potential through dynamic learning with others.
                  </p>
                </div>
              </div>

              <div className={classes.group}>
                <div className={classes.item}>
                  <h4 className={classes.feature}>Refund Policy</h4>
                  <p className={classes.desc}>
                    No question refund before taking the class.
                  </p>
                </div>

                <div className={classes.itemWithIcon}>
                  <img className={classes.icon} src={CommentImageSrc} alt="" />
                  <h5 className={classes.feature}>
                    Real-time chat with your instructors.
                  </h5>
                </div>

                <div className={classes.itemWithIcon}>
                  <img
                    className={classes.icon}
                    src={NotificationImageSrc}
                    alt=""
                  />
                  <h5 className={classes.feature}>
                    Newest updates always available.
                  </h5>
                </div>
              </div>
            </div>

            <div className={classes.rate}>
              <img className={classes.icon} src={StarsImageSrc} alt="" />
              <p className={classes.text}>
                94.76% of the tutors are 4.9 stars and above.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.testimonialsSection}>
        <header className={classes.container}>
          <Panorama as="h3" style={{ color: "#69879B" }}>
            Testimonials
          </Panorama>
          <h2 className={classes.heading}>Our students love us</h2>
        </header>

        <Testimonials />
      </section>
    </main>
  );
});

export default HomePage;
