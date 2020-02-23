import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

import './App.css';
import { MusicUpload } from './components/MusicUpload';
import VocalsExtract from './components/VocalsExtract';
import MusicVisuaizer from './components/MusicVisualizer';
import MusicPlayer from './components/MusicPlayer';
import MusicSlider from './components/MusicSlider';
import Main from './pages/Main';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [ files, setFiles ] = useState([])
  const [message, setMessage] = useState('No file chosen');
  const [snackbarVariant, setSnackbarVariant] = useState('warning');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [selectedMusicIndex, setSelectedMusicIndex] = React.useState();
  const [selectedMusicDuration, setSelectedMusicDuration] = React.useState(0);

  const handleSnackbarClick = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleMusicListItemClick = (event, index) => {
    console.log(files[index], index)
    setSelectedMusicIndex(index);
  };

  useEffect(async () => {
    const response = await axios.get(`http://localhost:5001/files`)
    console.log(response.data)
    setFiles(response.data);
  }, []);

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
      {/* <Grid item xs={12} md={12}>
        <MusicUpload className={classes.inner} setMessage={setMessage}
          setSnackbarVariant={setSnackbarVariant}
          handleSnackbarClick={handleSnackbarClick}
          selectedMusic={files[selectedMusicIndex]}
        />
  </Grid> */}
      <Grid item xs={12} md={6} component={Paper}>
          <Typography variant="h6" className={classes.title}>
            Uploaded Files: 
          </Typography>
          {<div>
            <List dense={true}>
              {files && files.map((file,index) =>
                <ListItem
                  button
                  key={index}
                  selected={selectedMusicIndex === index}
                  onClick={event => handleMusicListItemClick(event, index)}
                >
                  <ListItemIcon>
                    <MusicNoteIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file}
                    secondary={'Secondary text'}
                  />
                </ListItem>
              )}
            </List>
            </div>}
      </Grid>
      <Grid item xs={12} md={6} component={Paper}>
        <VocalsExtract className={classes.inner} setMessage={setMessage}
          setSnackbarVariant={setSnackbarVariant}
          handleSnackbarClick={handleSnackbarClick}
          selectedMusic={files[selectedMusicIndex]}/>
      </Grid>
      <Grid item xs={12} md={6} component={Paper}>
        <MusicVisuaizer/>
      </Grid>
      <Grid item xs={12} md={6}>
        <MusicPlayer setSelectedMusicDuration={setSelectedMusicDuration}/>
      </Grid>    
      <Grid item xs={12} md={6}>
        <MusicSlider selectedMusicDuration={selectedMusicDuration}/>
      </Grid>    
    </Grid>
    
    
    {
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}
          anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
          }}>
          <Alert onClose={handleSnackbarClose} severity={snackbarVariant}>
              {message}
          </Alert>
      </Snackbar>
    }
  </div>
  )
}

export default App;
