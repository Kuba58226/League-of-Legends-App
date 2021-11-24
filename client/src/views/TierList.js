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
import ButtonGroup from '@mui/material/ButtonGroup';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import SideBar from './../components/SideBar';
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

  const [championData,setChampionData] = useState([]);
  const [tierList,setTierList] = useState([]);

  useEffect(()=>{
    fetch(`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/data/en_US/championFull.json`,{method: "GET", headers: {
      Accept: 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      setChampionData(data);
    })
  },[])

  useEffect(()=>{
    if (params.lane==='ALL' && params.role==='ALL') {
      fetch(`${Website.serverName}api/tier-list?gameType=${params.gameType}&gameMode=${params.gameMode}`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          if (data.success == true) {
            setTierList(data.tierList);
          }
      })
    }
    else {
      fetch(`${Website.serverName}api/tier-list?gameType=${params.gameType}&gameMode=${params.gameMode}&lane=${params.lane}&role=${params.role}`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          if (data.success == true) {
            setTierList(data.tierList);
          }
      })
    }
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
          <SideBar/>
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
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 80,
                  }}
                >
                  <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button variant="outlined">All</Button>
                    <Button variant="outlined"><img src={`/images/position-emblems/Position_Top.png`} width='32px' height='32px'/></Button>
                    <Button variant="outlined"><img src={`/images/position-emblems/Position_Jungle.png`} width='32px' height='32px'/></Button>
                    <Button variant="outlined"><img src={`/images/position-emblems/Position_Mid.png`} width='32px' height='32px'/></Button>
                    <Button variant="outlined"><img src={`/images/position-emblems/Position_Bot.png`} width='32px' height='32px'/></Button>
                    <Button variant="outlined"><img src={`/images/position-emblems/Position_Support.png`} width='32px' height='32px'/></Button>
                  </ButtonGroup>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                            </TableCell>
                            <TableCell align="center">
                              Champion
                            </TableCell>
                            <TableCell align="center">
                              Winrate
                            </TableCell>
                            <TableCell align="center">
                              Playrate
                            </TableCell>
                            <TableCell align="center">
                              Games
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tierList.map((tier, index) => (
                            <TableRow>
                                <TableCell align="center">
                                  <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[tier.championId]}.png`} width='64px' height='64px'/>
                                </TableCell>
                                <TableCell align="center">
                                  <Typography>{championData.data[championData.keys[tier.championId]].name}</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{Math.round(tier.winRate)}%</Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{Math.round(tier.playRate)}%</Typography>
                                </TableCell>
                                <TableCell align="center">
                                <Typography>{Math.round(tier.games)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
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

export default function TierList() {
  return <DashboardContent />;
}