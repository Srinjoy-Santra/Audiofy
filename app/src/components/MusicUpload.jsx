import React, { Fragment, useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import SnackBar from './SnackBar';
import { MySnackbarContentWrapper } from './SnackBar';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { Grid, Paper } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    progress: {
        width: '100%',
        '& > * + *': {
          marginTop: theme.spacing(2),
        },
    },
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: theme.spacing(2),
    },
    skeleton: {
        margin: 'auto',
        borderRadius: 50,
    }
  }));

export const MusicUpload = () => {
    
    const classes = useStyles();
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('Select File')
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);   
    const [message, setMessage] = useState('No file chosen');
    const [snackbarVariant, setSnackbarVariant] = useState('warning');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleSnackbarClick = () => {
      setOpenSnackbar(true);
    };
  
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpenSnackbar(false);
    };

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)

        try{
            
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multiport/form-data'
                },
                onUploadProgress: progressEvent => {
                    if(file)
                    setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                
                    setTimeout(() => setUploadPercentage(0), 10000);
                }

            })

            const { fileName, filePath } = res.data
            setUploadedFile({fileName, filePath})
            setMessage('File uploaded successfully!')
            setSnackbarVariant('success')
            handleSnackbarClick()
        }
        catch(err){
            if(err.response)
                if(err.response.status === 500)
                    setMessage('Problem with server');
                else setMessage(err.response.data.msg);
            else setMessage('Unexpected Benhavior')
            handleSnackbarClick('error')       
        }
    }

    return (
        <Fragment >
           
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} component={Paper} className={classes.paper}>
                    <form onSubmit={onSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <input type="file" id="customFile" onChange={onChange}/>
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="customFile">{fileName}</label> 
                            </Grid>
                            <Grid item xs={12}>
                                <input type="submit" value="Upload"/>
                            </Grid>
                        </Grid>
                    </form>
                </Grid> 
                <Grid item xs={12} sm={5} component={Paper} className={classes.paper}>
                    <LinearProgress variant="determinate" value={uploadPercentage} />
                    <p>{uploadPercentage}%</p>
                    <Fragment>
                    {
                    uploadedFile.filePath ?
                    (
                        <audio controls >
                            <source src={uploadedFile.filePath} type="audio/mpeg"/>
                        </audio>
                    )
                    :
                    (
                        <Skeleton variant="rect" className={classes.skeleton} width={300} height={50}/>
                    )
                    }
                    </Fragment>   
                </Grid>
            </Grid>            
            {console.log(uploadedFile.filePath, decodeURIComponent(uploadedFile.filePath))}

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
        </Fragment>
    )
}
