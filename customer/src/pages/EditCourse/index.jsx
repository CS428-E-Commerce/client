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
import { useParams } from "react-router-dom";
import { push } from "connected-react-router";

const levels = ["Beginner", "Intermediate", "Advance"];

const EditCourse = memo(() => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    level: "Beginner",
  });
  const [coachId, setCoachId] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(setLoading(true));
        const response = await ApiService.GET("/api/user");
        const coachId = response?.data?.coachInfo?.id;
        setCoachId(coachId);

        const courseDetailResponse = await ApiService.GET(
          `/api/courses/detail/${id}/${response?.data?.id}`,
        );
        if (courseDetailResponse?.course?.cost)
          courseDetailResponse.course.cost /= 100;
        setData(courseDetailResponse?.course ?? data);
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
    console.log(name, value);
    setData(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = () => {
    data.cost *= 100;

    console.log({ data });
    ApiService.POST("/api/courses", { coachId, ...data }) // TODO: How to insert coachId ????
      .then(() => {
        ToastService.success("Create course successfully");
      })
      .catch(() => {
        ToastService.error("Sorry, an error occured");
      });
  };

  const handleDelete = async () => {
    await ApiService.POST("/api/courses/delete", { id });
    dispatch(push("/dashboard/courses"));
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Edit course
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                Title
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="title"
                name="title"
                label="Title"
                size="small"
                autoComplete="off"
                variant="outlined"
                value={data.title || ""}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                Code
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="code"
                name="code"
                label="Code"
                value={data.code || ""}
                size="small"
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
                Banner
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="banner"
                name="banner"
                label="Banner"
                value={data.banner || ""}
                size="small"
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
                Description
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="outlined-multiline-static"
                name="description"
                label="Description"
                value={data.description || ""}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12} sm={2} alignItems="center" display="flex">
              <InputLabel
                sx={{
                  fontWeight: 700,
                }}
              >
                Level
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Level"
                  name="level"
                  value={data.level ?? "Beginner"}
                  onChange={handleChange}
                >
                  {levels.map(item => (
                    <MenuItem key={item} value={item}>
                      {item}
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
                Max Slot
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="maxSlot"
                name="maxSlot"
                label="Max Slot"
                value={data.maxSlot || ""}
                size="small"
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
                Cost
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="cost"
                name="cost"
                label="Cost"
                value={data.cost || ""}
                size="small"
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
                Zoom Link
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={10}>
              <TextField
                required
                fullWidth
                id="zoomLink"
                name="zoomLink"
                label="Zoom Link"
                value={data.zoomLink || ""}
                size="small"
                autoComplete="off"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Grid container marginLeft="auto" xs={10} columnSpacing="12px">
            <Grid item xs={6}>
              <Button outline width="100%" onClick={handleDelete}>
                Delete
              </Button>
            </Grid>
            <Grid item xs={6}>
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

export default EditCourse;
