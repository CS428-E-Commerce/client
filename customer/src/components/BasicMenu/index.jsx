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
import { memo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const UserMenu = memo(({ title, userId }) => {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);
  const anchorRef = useRef(null);

  const toggleOpenMenu = () => setOpenMenu(prev => !prev);
  const handleCloseMenu = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  const navigateProfile = () => {
    dispatch(push(`/profile/${userId}`));
  };
  const logout = () => {
    localStorage.clear();
    dispatch(push(`/`));
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
                <MenuList
                  autoFocusItem={openMenu}
                  id="user-menu"
                  aria-labelledby="avatar"
                >
                  <MenuItem onClick={navigateProfile}>Profile</MenuItem>
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
