import { Button, Input, InputLabel, Pagination } from "@mui/material";
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
import { push } from "connected-react-router";
import CryptoJS from "crypto-js";

const TutorPages = memo(() => {
  const dispatch = useDispatch();

  const email = useRef();
  const password = useRef();
  const avatar = useRef();
  const username = useRef();
  const description = useRef();
  const address = useRef();
  const phone = useRef();
  const yearExperience = useRef();
  const skills = useRef();
  const certificates = useRef();

  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    isOpen: false,
    data: null
  });

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

  const handleOpenEdit = (e, data) => {
    e?.stopPropagation();
    setEdit({ isOpen: true, data });
  };

  const handleClose = () => {
    setOpen(false);
    setEdit({ isOpen: false, data: null })
  };

  const handleCreateAccount = () => {
    const account = {
      email: email?.current?.value,
      password: CryptoJS.AES.encrypt(password?.current?.value, `VinglishVjpPro`).toString(),
      role: "COACH",
    };

    dispatch(setLoading(true));
    ApiService.POST("/api/auth/signup", account)
      .then(() => {
        getData();
        ToastService.success("Successfully created.");
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        handleClose();
        dispatch(setLoading(false));
      });
  }

  const handleEditProfile = () => {
    dispatch(setLoading(true));
    ApiService.PUT(`/api/coach/${edit?.data?.id}`, {
      avatar: avatar?.current ?? undefined,
      username: username?.current?.value ?? "N/A",
      description: description?.current?.value ?? "",
      address: address?.current?.value ?? "",
      phone: phone?.current?.value ?? "",
      yearExperience: +yearExperience?.current?.value ?? 0,
      skills: skills?.current?.value ? skills?.current?.value?.split(`,`)?.map(i => i?.trim()) : [],
      certificates: certificates?.current?.value ? certificates?.current?.value?.split(`,`)?.map(i => i?.trim()) : [],
    })
      .then(() => {
        getData();
        ToastService.success("Successfully updated.");
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      })
      .finally(() => {
        handleClose();
        dispatch(setLoading(false));
      });
  }

  const encodeImageToBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const encodedImage = "data:" + file.type + ";base64," + event.target.result.split(",")[1];
      callback(encodedImage);
  };
    reader.readAsDataURL(file);
  };

  const onChangeImage = (event) => {
    const selectedFile = event.target.files[0];
    encodeImageToBase64(selectedFile, (encodedImageString) => {
      avatar.current = encodedImageString;
    });
  };

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
                <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Description</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Total classes</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Year(s) of experience</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  onClick={() => { dispatch(push(`/tutor/${row?.id}`)) }}
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
                  <TableCell>{row?.yearExperience ?? 0}</TableCell>
                  <TableCell>
                    <Button variant="outlined" onClick={(e) => { handleOpenEdit(e, row) }}>Edit</Button>
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
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              autoComplete="on"
            />
            <TextField
              inputRef={password}
              margin="dense"
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

      <Dialog open={edit?.isOpen} onClose={handleClose}>
        <DialogTitle>Edit tutor profile</DialogTitle>
        <DialogContent sx={{ width: 550 }}>
          {/* <DialogContentText>
            Please enter new information.
          </DialogContentText> */}
          <form>
            <InputLabel style={{ fontSize: 12, marginBottom: 6 }}>Avatar</InputLabel>
            <input type="file" accept="image/*" onChange={onChangeImage} />
            <TextField
              inputRef={username}
              defaultValue={edit?.data?.coachInfo?.username ?? "N/A"}
              fullWidth
              margin="dense"
              variant="standard"
              label="Name"
              autoComplete="off"
            />
            <TextField
              inputRef={description}
              defaultValue={edit?.data?.coachInfo?.description}
              fullWidth
              margin="dense"
              variant="standard"
              label="Description"
              autoComplete="off"
            />
            <TextField
              inputRef={address}
              defaultValue={edit?.data?.coachInfo?.address}
              fullWidth
              margin="dense"
              variant="standard"
              label="Address"
              autoComplete="off"
            />
            <TextField
              inputRef={phone}
              defaultValue={edit?.data?.coachInfo?.phone}
              fullWidth
              margin="dense"
              variant="standard"
              label="Phone number"
              autoComplete="off"
            />
            <TextField
              inputRef={yearExperience}
              defaultValue={edit?.data?.yearExperience ?? 0}
              fullWidth
              margin="dense"
              variant="standard"
              label="Year(s) of experience"
              autoComplete="off"
            />
            <TextField
              inputRef={skills}
              defaultValue={edit?.data?.skills?.map(i => i?.skill)?.join(`, `)}
              fullWidth
              margin="dense"
              variant="standard"
              label="Skill(s)"
              autoComplete="off"
            />
            <TextField
              inputRef={certificates}
              defaultValue={edit?.data?.certificates?.map(i => i?.certificate)?.join(`, `)}
              fullWidth
              margin="dense"
              variant="standard"
              label="Certificate(s)"
              autoComplete="off"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditProfile}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
});

export default TutorPages;
