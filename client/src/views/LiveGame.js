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
  const [liveGame,setLiveGame] = useState([]);
  const [summonerChampion, setSummonerChampion] = useState(null);
  const [summonerOpponent, setSummonerOpponent] = useState(null);
  const [summonerOpponents, setSummonerOpponents] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);

  const handleChange = (event) => {
    setSummonerOpponent(event.target.value);
  };

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
    fetch(`${Website.serverName}api/live-game?gameName=${params.summonerName}&region=EUNE`,{method: "GET", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success == true) {
            console.log(data);
            setLiveGame(data.liveGame.participants);
            setSummonerChampion(data.summonerChampion);
            setSummonerOpponents(data.summonerOpponents);
        }
    })
  },[])

  useEffect(()=>{
    fetch(`${Website.serverName}api/suggested-items-champions?championId=${summonerChampion}&championId1=${summonerOpponent}`,{method: "GET", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success == true) {
            setSuggestedItems(data.suggestedItems)
            console.log(data.suggestedItems)
        }
    })
  },[summonerOpponent])

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
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Champion
                            </TableCell>
                            <TableCell align="center">
                                SummonerName
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveGame.slice(0,5).map((game, index) => (
                            <TableRow>
                                <TableCell align="center">
                                  <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[game.championId]}.png`} width='64px' height='64px'/>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{game.summonerName}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
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
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                Champion
                            </TableCell>
                            <TableCell align="center">
                                SummonerName
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {liveGame.slice(5,10).map((game, index) => (
                            <TableRow>
                                <TableCell align="center">
                                  <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[game.championId]}.png`} width='64px' height='64px'/>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography>{game.summonerName}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Opponent</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        value={summonerOpponent}
                        label="Opponent"
                        onChange={handleChange}
                    >
                        {summonerOpponents.slice(0,5).map((summonerOpponent, index) => (
                            <MenuItem value={summonerOpponent}>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                >
                                    <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[summonerOpponent]}.png`} width='32px' height='32px'/>
                                    <Typography>
                                        {championData.data[championData.keys[summonerOpponent]].name}
                                    </Typography>
                                </Grid>
                            </MenuItem>
                        ))}
                    </Select>
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
                                <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${suggestedItem.item}.png`} width='64px' height='64px'/>
                                <a>Winrate: {Math.round(suggestedItem.winRate * 10) / 10}%</a>
                            </Grid>
                        </Box>
                    ))}
                    </Grid>
                </FormControl>
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

export default function LiveGame() {
  return <DashboardContent />;
}