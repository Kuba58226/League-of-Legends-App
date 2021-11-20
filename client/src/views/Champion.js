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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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
  const [suggestedItems,setSuggestedItems] = useState([]);
  const [easiestMatchups,setEasiestMatchups] = useState([]);
  const [hardestMatchups,setHardestMatchups] = useState([]);
  const [winRate,setWinRate] = useState(0);
  const [games,setGames] = useState(0);
  const [playRate,setPlayRate] = useState(0);

  useEffect(async()=>{
    await fetch(`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/data/en_US/championFull.json`,{method: "GET", headers: {
      Accept: 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      setChampionData(data);
    })
  },[])

  useEffect(()=>{
    if (championData && championData.data && championData.data[params.champion]) {
      fetch(`${Website.serverName}api/suggested-items?championId=${championData.data[params.champion].key}`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          if (data.success == true) {
            setSuggestedItems(data.suggestedItems)
          }
      })
    }
  },[championData])

  useEffect(()=>{
    if (championData && championData.data && championData.data[params.champion]) {
      fetch(`${Website.serverName}api/matchups?championId=${championData.data[params.champion].key}`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          if (data.success == true) {
            setEasiestMatchups(data['easiestMatchups'])
            setHardestMatchups(data['hardestMatchups'])
          }
      })
    }
  },[championData])

  useEffect(()=>{
    if (championData && championData.data && championData.data[params.champion]) {
      fetch(`${Website.serverName}api/champion?championId=${championData.data[params.champion].key}`,{method: "GET", headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',},
      })
      .then(response => response.json())
      .then(data => {
          if (data.success == true) {
            setWinRate(data.champion[0].winRate)
            setGames(data.champion[0].games)
            setPlayRate(data.champion[0].playRate)
          }
      })
    }
  },[championData])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              League of Legends App
            </Typography>
          </Toolbar>
        </AppBar>
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
          <Divider />
          <List>
              <div>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Live Game" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <BarChartIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tier List" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Champions" />
                </ListItem>
            </div>
          </List>
          <Divider />
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
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {championData && championData.data ? <div><img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.data[params.champion].image.full}`} width='128px' height='128px'/>
                    <Typography variant="h5" component="h2">
                        {championData.data[params.champion].name}
                    </Typography>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/spell/${championData.data[params.champion].spells[0].id}.png`} width='64px' height='64px'/>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/spell/${championData.data[params.champion].spells[1].id}.png`} width='64px' height='64px'/>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/spell/${championData.data[params.champion].spells[2].id}.png`} width='64px' height='64px'/>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/spell/${championData.data[params.champion].spells[3].id}.png`} width='64px' height='64px'/>
                    </Grid></div>
                    : "Loading"}
                  </Grid>
                </Paper>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">WinRate</TableCell>
                            <TableCell align="center">Popularity</TableCell>
                            <TableCell align="center">Games</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">{Math.round(winRate * 10) / 10}%</TableCell>
                                <TableCell align="center">{Math.round(playRate * 10) / 10}%</TableCell>
                                <TableCell align="center">{games}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography>Easiest Matchups</Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    {Object.entries(easiestMatchups).map((easiestMatchup, index) => (
                      <Box>
                        <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[easiestMatchup[0]]}.png`} width='64px' height='64px'/>
                          <a>Winrate: {Math.round(easiestMatchup[1] * 10) / 10}%</a>
                        </Grid>
                      </Box>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography>Hardest Matchups</Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    {Object.entries(hardestMatchups).map((hardestMatchup, index) => (
                      <Box>
                        <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        >
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[hardestMatchup[0]]}.png`} width='64px' height='64px'/>
                          <a>Winrate: {Math.round(hardestMatchup[1] * 10) / 10}%</a>
                        </Grid>
                      </Box>
                    ))}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography>Suggested Items</Typography>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                  {suggestedItems.map((suggestedItem, index) => (
                    <Box>
                      <Grid
                      container
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${suggestedItem[0]['item']}.png`} width='64px' height='64px'/>
                      <a>Winrate: {Math.round(suggestedItem[0]['winRate'] * 10) / 10}%</a>
                      <a>Playrate: {Math.round(suggestedItem[0]['playRate'] * 10) / 10}%</a>
                    </Grid>
                    </Box>
                  ))}
                  </Grid>
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

export default function Champion() {
  return <DashboardContent />;
}