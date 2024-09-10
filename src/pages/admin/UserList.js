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
} from "@mui/material";

import { sentenceCase } from "change-case";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import AuthService from "../../services/AuthService";

import axios from "../../services/axios";
import UserListHead from "./UserListHead";
import MyThemeProvider from '../../services/MyTheme';

const TABLE_HEAD = [
  { id: "id", label: "Id", alignRight: false, firstColumn: true },
  { id: "name", label: "Name", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "phone", label: "Phone", alignRight: true },
  { id: "role", label: "Role", alignRight: true },
  { id: "password", label: "Password", alignRight: true },
];

export default function UsersList() {
  console.log("hello user list, we are in")
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

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
    const school=JSON.parse(localStorage.getItem("school"));
    
    const code = AuthService.getCurrentUser()?.code;
    const schoolCode = Number(code);
    console.log("code in user list"+schoolCode)
  useEffect(() => {
    
    axios
      .get(`/users?schoolCode=${schoolCode}`)
      .then((response) => {

        setData(response.data)
      
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          navigate("/login");
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

  return (
    <>
      <Helmet>
        <title> User List | e-users </title>
      </Helmet>
      <Container sx={{ minWidth: "100%" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        ></Stack>
        <MyThemeProvider>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {data &&
                    data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const { id, username, email, phone, role, password } =
                          row;
                        const selectedRecord = selected.indexOf(id) !== -1;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedRecord}
                          >
                            <TableCell align="left" sx={{ paddingLeft: 5 }}>
                              {id}
                            </TableCell>
                            <TableCell align="left">
                              {sentenceCase(username)}
                            </TableCell>
                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="right">{phone}</TableCell>
                            <TableCell align="left">{role}</TableCell>
                            <TableCell align="left">{password}</TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data?.length > 0 ? data.length : 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        </MyThemeProvider>
      </Container>
    </>
  );
}
