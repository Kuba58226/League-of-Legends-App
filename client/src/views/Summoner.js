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

  const [summonerName,setSummonerName] = useState('');
  const [profileImage,setProfileImage] = useState('');
  const [level,setLevel] = useState('');
  const [soloImage,setSoloImage] = useState('');
  const [flexImage,setFlexImage] = useState('');
  const [accountDetails,setAccountDetails] = useState([]);

  useEffect(()=>{
    fetch(`${Website.serverName}api/player-data?gameName=${params.summonerName}`,{method: "GET", headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',},
    })
    .then(response => response.json())
    .then(data => {
        if (data.success == true) {
            console.log(data);
            setSummonerName(data.account.gameName);
            setProfileImage(`https://ddragon.leagueoflegends.com/cdn/11.22.1/img/profileicon/${data.accountDetails[0].profileIconId}.png`);
            setLevel(`Level: ${data.accountDetails[0].summonerLevel}`);
            setSoloImage(`/images/ranked-emblems/Emblem_${data.accountDetails[0].solo_tier.toLowerCase().charAt(0).toUpperCase() + data.accountDetails[0].solo_tier.toLowerCase().slice(1)}.png`);
            setFlexImage(`/images/ranked-emblems/Emblem_${data.accountDetails[0].flex_tier.toLowerCase().charAt(0).toUpperCase() + data.accountDetails[0].flex_tier.toLowerCase().slice(1)}.png`);
            setAccountDetails(data.accountDetails[0]);
        }
    })
  },[])

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
              {/* Chart */}
              <Grid item xs={12} md={8} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                    <Typography variant="h5" component="h2">
                        {summonerName}
                    </Typography>
                    <img src={profileImage} width='128px' height='128px'/>
                    <Typography variant="h5" component="h2">
                        {level}
                    </Typography>
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
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