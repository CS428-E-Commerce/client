import ArticleIcon from "@mui/icons-material/Article";
import AssessmentIcon from "@mui/icons-material/Assessment";
import StarBorder from "@mui/icons-material/StarBorder";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { push } from "connected-react-router";
import { memo, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const DashboardLayout = memo(props => {
  const { children } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const auth = localStorage.getItem("token");
    if (!auth) history.replace("/login", { prevLocation: history.location });
  }, []);

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {/* 
        {["Courses"].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Courses" />
          </ListItemButton>
        </ListItem>

        <Collapse in={true} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              onClick={() => dispatch(push("/dashboard/courses"))}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Create a course" />
            </ListItemButton>

            <ListItemButton
              onClick={() => dispatch(push("/dashboard/schedules"))}
              sx={{ pl: 4 }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Create course schedule" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {/* {["Booking"].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="View Booking" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={true} variant="permanent">
        {list()}
      </Drawer>
      <div className="pl-[250px]">{children}</div>
    </div>
  );
});

export default DashboardLayout;
