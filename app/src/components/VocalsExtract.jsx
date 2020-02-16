import React, { Fragment, useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    progress: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        margin: theme.spacing(1),
        padding: theme.spacing(1),
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

export default (props) => {

    const classes = useStyles();
    const [file, setFile] = useState(null)
    const [fileName, setFileName] = useState('Select File')
    console.log(props.selectedMusic)
    const [uploadedFile, setUploadedFile] = useState({});
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const audioRef = useRef(null)
    const [audioSrc, setAudioSrc] = useState(-1)

    useEffect(() => {
        console.log('Reloading')
    }, [audioSrc])

    /*useEffect(() => {
        props.selectedMusic &&
            setUploadedFile({
                fileName: props.selectedMusic,
                filePath: '/uploads/' + props.selectedMusic
            })
            
    }, [props.selectedMusic])*/

    const onChange = (e) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)
        console.log(e.target.files[0])
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', file)

        try {

            const res = await axios.post('http://127.0.0.1:5000/success', formData, {
                headers: {
                    'Content-Type': 'multiport/form-data'
                },
                onUploadProgress: progressEvent => {
                    if (file)
                        setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)))
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            })

            //var blob = new Blob([res.value], { type: 'audio/mpeg' });
            //var url = window.URL.createObjectURL(blob)
            //console.log(audioRef,url)
            
            
            //window.audio.src = url;
            console.log('json ',res.data)
            const { fileName, filePath, id } = res.data
            setUploadedFile({fileName, filePath})
            setAudioSrc(id)
            props.setMessage('File uploaded successfully!')
            props.setSnackbarVariant('success')
        }
        catch (err) {
            if (err.response)
                if (err.response.status === 500)
                    props.setMessage('Problem with server');
                else props.setMessage(err.response.data.msg);
            else props.setMessage('Unexpected Behavior')
            props.setSnackbarVariant('error')

        }
        props.handleSnackbarClick()
    }

    return (
        <Fragment >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5} component={Paper} className={classes.paper}>
                    <form onSubmit={onSubmit}>
                        <Grid container>
                            <Grid item xs={12}>
                                <LinearProgress variant="determinate" value={uploadPercentage}
                                    color='secondary' />
                                <p>{uploadPercentage}%</p>
                            </Grid>
                            <Grid item xs={12}>
                                <input type="file" id="customFile" onChange={onChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <label htmlFor="customFile">{fileName}</label>
                            </Grid>
                            <Grid item xs={12}>
                                <input type="submit" value="Upload" />
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12} sm={5} component={Paper} className={classes.paper}>
                    <Fragment>
                        {
                            audioSrc > -1 ?
                                (
                                    <div key={audioSrc}>
                                        <audio controls ref={audioRef}>
                                            <source src={'http://127.0.0.1:5000/track/'+audioSrc} type="audio/mpeg" />
                                        </audio>
                                        {console.log('>',audioRef, audioSrc)}
                                        {/* <img src={audioSrc} alt='mf'/> */}
                                    </div>
                                )
                                :
                                (
                                    <Skeleton variant="rect" className={classes.skeleton} width={300} height={50} />
                                )
                        }
                    </Fragment>
                </Grid>
            </Grid>
            {console.log(':', uploadedFile, uploadedFile.filePath)}
        </Fragment>
    )
}
