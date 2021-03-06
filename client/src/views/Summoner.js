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
import {BrowserRouter as Router,useLocation,useParams,Navigate,useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';

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
  const navigate = useNavigate();
  const {Website} = require('../config/website.js');

  const [championData,setChampionData] = useState([]);
  const [summonerName,setSummonerName] = useState('');
  const [region,setRegion] = useState('EUNE');
  const [profileImage,setProfileImage] = useState('');
  const [level,setLevel] = useState('');
  const [soloImage,setSoloImage] = useState('');
  const [flexImage,setFlexImage] = useState('');
  const [accountDetails,setAccountDetails] = useState([]);
  const [playerDetails,setPlayerDetails] = useState([]);

  const toggleRefresh = () => {
    fetch(`${Website.serverName}api/refresh`,{method: "POST", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'},
    body: JSON.stringify({gameName: summonerName, region: region})})
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.success === true) {
        console.log('success')
        navigate(`/summoner/${summonerName}`)
      }
    })
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
    fetch(`${Website.serverName}api/player-data?gameName=${params.summonerName}`,{method: "GET", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success == true && data.account !== null) {
            console.log(data);
            setSummonerName(data.account.gameName);
            setProfileImage(`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/profileicon/${data.accountDetails[0].profileIconId}.png`);
            setLevel(`Level: ${data.accountDetails[0].summonerLevel}`);
            setSoloImage(`/images/ranked-emblems/Emblem_${data.accountDetails[0].solo_tier}.png`);
            setFlexImage(`/images/ranked-emblems/Emblem_${data.accountDetails[0].flex_tier}.png`);
            setAccountDetails(data.accountDetails[0]);
            setPlayerDetails(data.playerDetails);
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
              <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                    <Typography variant="h5" component="h2">
                        {summonerName}
                    </Typography>
                    <img src={profileImage} width='128px' height='128px'/>
                    <Typography variant="h5" component="h2">
                        {level}
                    </Typography>
                    <Button variant="contained" onClick={toggleRefresh}>Refresh</Button>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                  >
                    <img src={soloImage} width='128px' height='146px'/>
                    <div>
                      <Typography>{accountDetails.solo_tier} {accountDetails.solo_rank}</Typography>
                      <Typography>{accountDetails.solo_wins}W/{accountDetails.solo_losses}L</Typography>
                      <Typography>{accountDetails.solo_leaguePoints} LP {Math.round(100*accountDetails.solo_wins/(parseInt(accountDetails.solo_wins)+parseInt(accountDetails.solo_losses)))}% Winrate</Typography>
                    </div>
                    <img src={flexImage} width='128px' height='146px'/>
                    <div>
                      <Typography>{accountDetails.flex_tier} {accountDetails.flex_rank}</Typography>
                      <Typography>{accountDetails.flex_wins}W/{accountDetails.flex_losses}L</Typography>
                      <Typography>{accountDetails.flex_leaguePoints} LP {Math.round(100*accountDetails.flex_wins/(parseInt(accountDetails.flex_wins)+parseInt(accountDetails.flex_losses)))}% Winrate</Typography>
                    </div>
                  </Grid>
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  {playerDetails.map((playerDetail, index) => (
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow style={{backgroundColor: playerDetail.win ? 'lightblue' : 'lightpink' }}>
                            <TableCell align="center">
                              <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                              >
                                <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/champion/${championData.keys[playerDetail.championId]}.png`} width='64px' height='64px'/>
                                <Box>
                                  <Grid
                                  container
                                  direction="column"
                                  justifyContent="center"
                                  alignItems="center"
                                  >
                                    <img src={`/images/spells/${playerDetail.summoner1Id}.png`} width='32px' height='32px'/>
                                    <img src={`/images/spells/${playerDetail.summoner2Id}.png`} width='32px' height='32px'/>
                                  </Grid>
                                </Box>
                              </Grid>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>{championData.keys[playerDetail.championId]}</Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography>{playerDetail.kills}/{playerDetail.deaths}/{playerDetail.assists}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item0}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item1}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item2}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item3}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item4}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item5}.png`} width='32px' height='32px'/>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/${Website.lolVersion}/img/item/${playerDetail.item6}.png`} width='32px' height='32px'/>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  ))}
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

export default function Summoner() {
  return <DashboardContent />;
}