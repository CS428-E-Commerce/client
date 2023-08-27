import {
  Avatar,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { push } from "connected-react-router";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

const UserMenu = memo(({ title }) => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);
  const [info, setInfo] = useState(null);
  const isCoach = info?.coachInfo;

  useEffect(() => {
    ApiService.GET("/api/user")
      .then(response => {
        setInfo(response?.data);
      })
      .catch(error => {
        console.error(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, []);

  const toggleOpenMenu = () => {
    setOpenMenu(prev => !prev);
  };

  const handleCloseMenu = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  const navigateDashboard = () => {
    dispatch(push("/dashboard/courses"));
  };

  const navigateProfile = () => {
    dispatch(push("/my-profile"));
  };

  const navigateChangePassword = () => {
    dispatch(push("/change-password"));
  };

  const navigateMyCourses = () => {
    dispatch(push("/change-password"));
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <Avatar
        ref={anchorRef}
        id="avatar"
        aria-controls={open ? "user-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={toggleOpenMenu}
        sx={{
          bgcolor: "#5746af",
          color: "#ffffff",
          marginLeft: "12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        {title.substring(0, 1).toUpperCase()}
      </Avatar>

      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role="menu"
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList id="user-menu" aria-labelledby="avatar">
                  {isCoach && (
                    <MenuItem onClick={navigateDashboard}>Dashboard</MenuItem>
                  )}
                  <MenuItem onClick={navigateProfile}>Profile</MenuItem>
                  <MenuItem onClick={navigateMyCourses}>My Courses</MenuItem>
                  <MenuItem onClick={navigateChangePassword}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
});

export default UserMenu;
