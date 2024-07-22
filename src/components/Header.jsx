import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from "react-router-dom";
import { Tab, Tabs, Typography } from '@mui/material';

const linksArr = ["blogs", "auth"];
const loggedinlinks = ["blogs", "addblog", "profile"];

const Header = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn)
  const [value, setvalue] = useState();

  return (
    <>
      <AppBar className='mb-3' sx={{ bgcolor: "#00B890", position: 'sticky' }}>
        <Toolbar>
          <Typography variant='h6'><Link style={{ textDecoration: 'none', color: 'white' }} to={'/blogs'} className='ps-3'>Blog</Link></Typography>
          <Tabs value={value} onChange={(e, val) => setvalue(val)} sx={{ ml: "auto", textDecoration: "none" }} TabIndicatorProps={{ style: { backgroundColor: 'white' } }}>
            {isLoggedIn ?
              loggedinlinks.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? "" : link}`}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "7px",
                      textDecorationColor:'white',
                      color:'white'
                      
                    },
                    color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                },
                 
                  }}
                  key={link}
                  label={link} />
              ))
              :
              linksArr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`${link === "home" ? "" : link}`}
                  sx={{
                    textDecoration: "none",
                    ":hover": {
                      textDecoration: "underline",
                      textUnderlineOffset: "7px",
                      textDecorationColor:'white',
                      color:'white'
                      
                    },
                    color: 'white',
                '&.Mui-selected': {
                  color: 'white',
                },
                 
                  }}
                  key={link}
                  label={link} />
              ))
            }
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
