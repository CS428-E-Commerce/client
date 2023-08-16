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

const levels = ["Beginner", "Intermediate", "Advance"];

const CreateCourse = memo(() => {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [coachId, setCoachId] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        dispatch(setLoading(true));
        const response = await ApiService.GET("/api/user");
        const coachId = response?.data?.coachInfo?.id;
        setCoachId(coachId);
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
    data.cost = data.cost *= 100;
    ApiService.POST("/api/courses", { coachId, ...data }) // TODO: How to insert coachId ????
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
            Create a course
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
                size="small"
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

export default CreateCourse;
