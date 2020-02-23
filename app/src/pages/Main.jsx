import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";

import ExpViz from '../components/ExpViz';

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
  
  const [play, setPlay]= useState(false);
  const handlePlay = () => {
    setPlay(!play);
  }

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
    <Grid container>
        <Grid item xs={12} md={2} component={Paper}>
          <IconButton color="secondary" aria-label="play pause" onClick={handlePlay}>
            {(play)?<PauseIcon/>:<PlayArrowIcon/>}
          </IconButton>
        </Grid>
      <Grid item container xs={12} md={10} component={Paper}>
        <ExpViz id='vocals' type='unmute' src='./uploads/vocals.wav' play={play}/>
      </Grid>
      <Grid item container xs={12} md={10} component={Paper}>
        <ExpViz id='bass' type='unmute' src='./uploads/bass.wav' mute={false} play={play}/>
      </Grid>
      <Grid item container xs={12} md={10} component={Paper}>
        <ExpViz id='drums' type='unmute' src='./uploads/drums.wav'mute={false} play={play}/>
      </Grid>
      <Grid item container xs={12} md={10} component={Paper}>
        <ExpViz id='other' type='unmute' src='./uploads/other.wav' mute={false} play={play}/>
      </Grid>  
    </Grid>
  </div>
  )
}

export default App;
