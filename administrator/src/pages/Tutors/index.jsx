import { Button, Pagination } from "@mui/material";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Loading from "components/Loading";
import ApiService from "services/api_service";
import { formatNumber } from "services/common_service";
import { ToastService } from "services/toast_service";
import classes from "./styles.module.scss";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setLoading } from "redux/reducers/Status/actionTypes";

const TutorPages = memo(() => {
  const dispatch = useDispatch();

  const email = useRef()
  const password = useRef()

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getData()
  }, []);

  const getData = () => {
    ApiService.GET(`/api/coach`, {
      offset: page - 1,
      limit: 12,
      name: "",
    })
      .then(response => {
        setData(response?.data);
        setTotal(response?.meta?.total);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateAccount = () => {
    const account = {
      email: email?.current?.value,
      password: password?.current?.value,
      role: "COACH",
    };

    dispatch(setLoading(true));
    ApiService.POST("/api/auth/signup", account)
      .then(() => {
        getData()
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <div className={classes.title}>
          <p>All tutors</p>
          <Button variant="contained" onClick={handleClickOpen}>Create tutor</Button>
        </div>

        {data ? <TableContainer component={Paper} sx={{ margin: "28px 0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Total classes</TableCell>
                <TableCell>Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  onClick={() => { console.log(1) }}
                  className={classes.row}
                  key={`tutor-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>
                    {12 * (page - 1) + index + 1}
                  </TableCell>
                  <TableCell>{row?.coachInfo?.email ?? "N/A"}</TableCell>
                  <TableCell>{row?.coachInfo?.username ?? "N/A"}</TableCell>
                  <TableCell>{row?.coachInfo?.description ?? "N/A"}</TableCell>
                  <TableCell>{row?.totalCourse ? (
                    <span>{formatNumber(row?.totalCourse)} classes</span>
                  ) : "N/A"}</TableCell>
                  <TableCell>{row?.totalRate ?? "N/A"}</TableCell>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create tutor</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter email and password to create a new tutor account.
          </DialogContentText>
          <form>
            <TextField
              inputRef={email}
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              autoComplete="on"
            />
            <TextField
              inputRef={password}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              autoComplete="off"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateAccount}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default TutorPages;
