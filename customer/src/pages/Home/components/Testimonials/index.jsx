import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  ArrowBack,
  ArrowForward,
  AvatarPlaceholderSrc,
  TestimonialAvatarMaskSrc,
  TestimonialIcon,
} from "assets/images";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const Testimonials = memo(() => {
  const swiperElRef = useRef(null);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const swiperParams = {
      // Navigation element
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // Injected CSS styles
      injectStyles: [
        `
          :host .swiper {
            overflow: visible;
          }
        `,
      ],
    };

    if (swiperElRef.current) Object.assign(swiperElRef.current, swiperParams);

    swiperElRef.current.initialize();
  }, [swiperElRef]);

  useEffect(() => {
    const init = async () => {
      try {
        const discussionResponse = await ApiService.GET("/api/discussion", {
          offset: 0,
          limit: 20,
        });

        setDiscussions(discussionResponse?.data ?? []);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      }
    };
    init();
  }, []);

  // Change API to return FE needs
  return (
    <div className={classes.swiper}>
      <swiper-container slides-per-view="3" ref={swiperElRef} init="false">
        {discussions.map(discussion => (
          <swiper-slide key={discussion.id}>
            <div className={classes.swiperSlide}>
              <div className={classes.info}>
                <div
                  className={classes.avatar}
                  style={{
                    WebkitMaskImage: `url(${TestimonialAvatarMaskSrc})`,
                    WebkitMaskRepeat: "no-repeat",
                    maskImage: `url(${TestimonialAvatarMaskSrc})`,
                    maskRepeat: "no-repeat",
                    WebkitMaskPosition: "top right",
                    maskPosition: "top right",
                  }}
                >
                  <img
                    className={classes.img}
                    src={discussion.avatar ?? AvatarPlaceholderSrc}
                    alt=""
                  />
                </div>
                <div className={classes.to}>
                  <TestimonialIcon className={classes.testimonialIcon} />
                  <TestimonialIcon className={classes.testimonialIcon} />
                  <span className={classes.to}>
                    <span>- to </span>
                    <NavLink to="/" className={classes.tutor}>
                      Nguyen Vinh
                    </NavLink>
                  </span>
                </div>
              </div>
              <p className={classes.testimonial}>{discussion.comment}</p>
              <div className={classes.from}>
                <span>-</span> from{" "}
                <span className={classes.student}>Alex Nguyen</span>
              </div>
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
      <ArrowBack className={clsx("swiper-button-prev", classes.btnPrev)} />
      <ArrowForward className={clsx("swiper-button-next", classes.btnNext)} />
    </div>
  );
});

export default Testimonials;
