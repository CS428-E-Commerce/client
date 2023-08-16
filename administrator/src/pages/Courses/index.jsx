import { Pagination } from "@mui/material";
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

const CoursesPage = memo(() => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
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
        setTotal(response?.meta?.total);
      })
      .catch(error => {
        console.log(error);
        ToastService.error("Sorry, an error occurred.");
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.main}>
        <p className={classes.title}>All courses</p>

        {data ? <TableContainer component={Paper} sx={{ margin: "28px 0" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Tutor</TableCell>
                <TableCell>Available slot</TableCell>
                <TableCell>Cost</TableCell>
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
                  <TableCell>{row?.title ?? "N/A"}</TableCell>
                  <TableCell>{row?.description ?? "N/A"}</TableCell>
                  <TableCell>{row?.coachname ?? "N/A"}</TableCell>
                  <TableCell>{row?.maxSlot ?? "N/A"}</TableCell>
                  <TableCell>{row?.cost ?? "N/A"}</TableCell>
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
    </div>
  );
});

export default CoursesPage;
