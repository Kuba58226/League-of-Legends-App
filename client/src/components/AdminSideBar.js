import React, {useContext, useEffect, useImperativeHandle, useState} from 'react'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import {BrowserRouter as Router,useLocation,useParams,Link} from "react-router-dom";

export default function SideBar() {
    return (
        <Box>
            <Divider />
                <List>
                    <div>
                        <Link to='/admin-users' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                        <ListItem button>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Users" />
                        </ListItem>
                        </Link>
                    </div>
                </List>
          <Divider />
        </Box>
    )
}