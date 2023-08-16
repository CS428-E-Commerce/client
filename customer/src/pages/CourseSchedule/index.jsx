import {
  Box,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormControl } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Button from "components/Button";
import { setLoading } from "redux/reducers/Status/actionTypes";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";

import classes from "./styles.module.scss";

const CourseSchedule = memo(() => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [courses, setCourses] = useState([]);
  const [coachId, setCoachId] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(setLoading(true));
        const response = await ApiService.GET("/api/user");
        const coachId = response?.data?.coachInfo?.id;
        setCoachId(coachId);
        const coursesResponse = await ApiService.GET("/api/courses", {
          coachId,
        });
        setCourses(coursesResponse?.data);
      } catch (error) {
        console.error(error);
        ToastService.error("Sorry, an error occurred");
      } finally {
        dispatch(setLoading(false));
      }
    };

    init();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    try {
      data.startTime = new Date(data.startTime).toISOString();
      data.endTime = new Date(data.endTime).toISOString();
    } catch (error) {
      console.error(error);
    }

    ApiService.POST("/api/courses/schedule", { coachId, ...data }) // TODO: How to insert coachId ????
      .then(() => {
        ToastService.success("Create course successfully");
      })
      .catch(() => {
        ToastService.error("Sorry, an error occured");
      });
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Create a schedule
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                Course
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Course</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Course"
                  name="courseId"
                  value={data?.courseId ?? "N/A"}
                  onChange={handleChange}
                >
                  {courses.map(course => (
                    <MenuItem key={course.courseId} value={course.courseId}>
                      {course.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                Start Time
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="startTime"
                name="startTime"
                size="small"
                type="datetime-local"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                End Time
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="endTime"
                name="endTime"
                size="small"
                type="datetime-local"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>

            <Grid item marginLeft="auto" sm={10}>
              <Button width="100%" onClick={handleSubmit}>
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
});

export default CourseSchedule;
