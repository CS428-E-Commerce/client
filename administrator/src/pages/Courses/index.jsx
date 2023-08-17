import { Button, Pagination } from "@mui/material";
import { memo, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from "components/Loading";
import ApiService from "services/api_service";
import { ToastService } from "services/toast_service";
import classes from "./styles.module.scss";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setLoading } from "redux/reducers/Status/actionTypes";

const CoursesPage = memo(() => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [status, setStatus] = useState(``);

  useEffect(() => {
    getData();
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getData = () => {
    ApiService.GET(`/api/courses`, {
      code: null,
      coachId: null,
      userId: null,
      status: null,
      level: null,
      offset: page - 1,
      limit: 12,
    })
      .then(response => {
        setData(response?.data);
        setTotal(response?.total);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  };

  const handleChange = (event) => {
    setStatus(event?.target?.value);
  };

  const handleOpen = (e, data) => {
    e?.stopPropagation();
    setCourseId(data?.courseId);
    setStatus(data?.status)
  };

  const handleClose = () => {
    setCourseId(null);
  };

  const handleEdit = () => {
    dispatch(setLoading(true));
    ApiService.POST("/api/verify", {
      courseId,
      verificationCode: status,
    })
      .then(() => {
        getData();
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        handleClose();
        dispatch(setLoading(false));
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <p className={classes.title}>All courses</p>

        {data ? <TableContainer component={Paper} sx={{ margin: "28px 0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Start time</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tutor</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Slot(s)</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Cost</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  onClick={() => { dispatch(push(`/course/${row?.courseId}?coachId=${row?.coachId}`)) }}
                  className={classes.row}
                  key={`tutor-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {12 * (page - 1) + index + 1}
                  </TableCell>
                  <TableCell>{row?.level ? capitalizeFirstLetter(row?.level) : "N/A"}</TableCell>
                  <TableCell>{row?.title ?? "N/A"}</TableCell>
                  <TableCell>{row?.description ?? "N/A"}</TableCell>
                  <TableCell>{row?.startTime ? dayjs(row?.startTime)?.format("DD/MM/YYYY") : "N/A"}</TableCell>
                  <TableCell>{row?.coachname ?? "N/A"}</TableCell>
                  <TableCell>{row?.maxSlot ?? "N/A"}</TableCell>
                  <TableCell>{row?.cost ?? "N/A"}</TableCell>
                  <TableCell sx={{ color: row?.status === "AWAIT" ? "orange" : row?.status === "ACTIVE" ? "green" : row?.status === "DECLINED" ? "red" : "inherit" }}>{row?.status ? capitalizeFirstLetter(row?.status) : "N/A"}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={(e) => { handleOpen(e, row) }}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> : <Loading />}

        <Pagination
          count={Math.ceil((total ?? 0) / 12)}
          page={page}
          onChange={(_, value) => {
            setPage(value);
          }}
          className={classes.pagination}
        />
      </div>

      <Dialog open={!!courseId} onClose={handleClose}>
        <DialogTitle>Course status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can update the status of the course here.
          </DialogContentText>
          <Box sx={{ minWidth: 120, marginTop: "24px" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value={"AWAIT"}>Await</MenuItem>
                <MenuItem value={"ACTIVE"}>Active</MenuItem>
                <MenuItem value={"DECLINED"}>Declined</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default CoursesPage;
