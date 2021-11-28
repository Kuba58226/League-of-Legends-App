import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import {BrowserRouter as Router,useLocation,useParams} from "react-router-dom";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {AppContext} from '../AppContext';
import TextField from '@mui/material/TextField';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ProfileSideBar from './../components/ProfileSideBar';
import Copyright from './../components/Copyright';
import AppBar from './../components/AppBar';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  let params = useParams();
  const {Website} = require('../config/website.js');
  const {isUserLogged,toggleLoggedState,jwtToken,toggleTokenState,userRole,toggleRoleState} = useContext(AppContext)

  const [friends,setFriends] = useState([]);
  const [friendName,setFriendName] = useState("")
  const [accountName,setAccountName] = useState("")

  const [summonerName,setSummonerName] = useState('');
  const [profileImage,setProfileImage] = useState('');
  const [level,setLevel] = useState('');

  function handleOnChangeFriendName(e){
    setFriendName(e.target.value)
  }

  function handleOnChangeAccountName(e){
    setAccountName(e.target.value)
  }

  useEffect(()=>{
    fetch(`${Website.serverName}api/get-user-account`,{method: "GET", headers: {
      'Authorization': 'Bearer '+jwtToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
      if (data.success == true) {
        console.log(data);
        setSummonerName(data.userAccount.account.gameName)
        setProfileImage(`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/profileicon/${data.userAccount.account.profileIconId}.png`)
        setLevel(`Level: ${data.userAccount.account.summonerLevel}`)
      }
    })
  },[])

  useEffect(()=>{
    fetch(`${Website.serverName}api/get-friends`,{method: "GET", headers: {
      'Authorization': 'Bearer '+jwtToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
      if (data.success == true) {
        console.log(data);
        setFriends(data.friends)
      }
    })
  },[])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <ProfileSideBar/>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                  <Typography variant="h5" component="h2">
                      {summonerName}
                    </Typography>
                    <img src={profileImage} width='128px' height='128px'/>
                    <Typography variant="h5" component="h2">
                      {level}
                    </Typography>
                    <TextField onChange={handleOnChangeAccountName}
                      margin="normal"
                      required
                      fullWidth
                      name="accountName"
                      label="Account Name"
                      type="accountName"
                      id="accountName"
                      autoComplete="current-account-name"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >Set account</Button>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 500,
                  }}
                >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                        <TableBody>
                            {friends.map((friend, index) => (
                                <TableRow>
                                    <TableCell align="center">
                                        <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/profileicon/${friend.account.profileIconId}.png`} width='50px' height='50px'/>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography>{friend.account.gameName}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                    <TextField onChange={handleOnChangeFriendName}
                      margin="normal"
                      required
                      fullWidth
                      name="friendName"
                      label="Friend Name"
                      type="friendName"
                      id="friendName"
                      autoComplete="current-friend-name"
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >Add Friend</Button>
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function ProfileFriends() {
  return <DashboardContent />;
}