import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import './App.css';
import { MusicUpload } from './components/MusicUpload';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  inner: {
    margin: theme.spacing(2),
  },
}));

function App(){
  const classes = useStyles();

  return(
  <div className="App">
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Lyricist
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
    <br/>
    <MusicUpload className={classes.inner}/>
  </div>
  )
}

export default App;
