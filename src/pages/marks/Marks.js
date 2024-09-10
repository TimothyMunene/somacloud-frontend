import {
  Card,
  Container,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { capitalCase } from "change-case";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import AuthService from "../../services/AuthService";
import HttpService from "../../services/HttpService";
import MarkListHead from "./MarkListHead";
import MyThemeProvider from "../../services/MyTheme";

import axios from "../../services/axios";

const TABLE_HEAD = [
  { id: "admission", label: "AdmNo", alignRight: false, firstColumn: true },
  { id: "mark", label: "Mark", alignRight: false },
  { id: "names", label: "Name", alignRight: false },
  { id: "update", label: "Update", alignLeft: false },
  { id: "delete", label: "Delete", alignLeft: false },
];

export default function Marks({ dat }) {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  console.log(dat)

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  useEffect(() => {
    const school=JSON.parse(localStorage.getItem("school"));
    const code = Number(school?.schoolCode);
    axios
      .get(
        `/marks/class/subject?schoolCode=${code}&examId=${Number(
          dat.examId
        )}&termId=${Number(dat.termId)}&classId=${Number(
          dat.classId
        )}&year=${Number(dat.year)}&subjectCode=${Number(dat.subjectCode)}`
      )
      .then((response) =>
        setData(response.data)
      
    )
      .then((response) => console.log(response))
      .catch((error) => {
        if (error?.response?.status === 401) {
          //navigate("/login");
        } else if (error.response?.data?.errors) {
          error.response?.data?.errors.map((e) =>
            enqueueSnackbar(e.message, { variant: "error" })
          );
        } else if (error.response?.data?.message) {
          enqueueSnackbar(error.response?.data?.message, { variant: "error" });
        } else {
          enqueueSnackbar(error.message, { variant: "error" });
        }
      });
  }, []);
    //test data object
    console.log("Test data object==============================================")
    console.log(data)
  return (
    <>
      <MyThemeProvider>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <MarkListHead headLabel={TABLE_HEAD} />

                <TableBody>
                  {data &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { mark_id, mark, admission, name } = row;
                        const selectedRecord = selected.indexOf(mark_id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={mark_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedRecord}
                          >
                            <TableCell align="left">{admission}</TableCell>
                            <TableCell align="left">{mark}</TableCell>

                            <TableCell align="left">
                              {capitalCase(name)}
                            </TableCell>
                            <TableCell align="right" width="20">
                              <IconButton
                                size="large"
                                color="inherit"
                                onClick={handleOpenMenu}
                              >
                                <Iconify icon={"eva:more-vertical-fill"} />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[15, 30, 60]}
            component="div"
            count={data?.length > 0 ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </MyThemeProvider>
    </>
  );
}
