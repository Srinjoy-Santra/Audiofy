import React, { useEffect, useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//import { peaks } from './peaks.js';
import WaveSurfer from 'wavesurfer.js';
import { Typography } from '@material-ui/core';

function App(props){

    const [waveSurfer, setWaveSurfer] = useState();
    const [mute, setMute] = useState(false)

    useEffect(() => {
        const aud = document.querySelector(`#${props.id}`);

        let localWaveSurfer = WaveSurfer.create({
            barWidth: 1,
            barHeight: 1,
            cursorWidth: 1,
            container: '#waveform'+props.id,
            backend: 'MediaElementWebAudio',
            height: 80,
            progressColor: '#2D5BFF',
            responsive: true,
            waveColor: '#EFEFEF',
            cursorColor: 'transparent',
        });

        localWaveSurfer.load(aud);
        setWaveSurfer(localWaveSurfer)
    }, [])

    useEffect(() => {
        if(waveSurfer)
        waveSurfer.playPause();
    }, [props.play])
    
    const handleMute= () => {
        console.log(props.id, mute, '->', !mute)
        console.log('b',waveSurfer.getVolume())
        if(waveSurfer)
            waveSurfer.setVolume(mute?1:0);
        console.log('a',waveSurfer.getVolume())
        setMute(!mute)
    }

    return (
    <Grid container>
        <Grid item xs={4}>
            <Typography>
                {props.id.charAt(0).toUpperCase()+props.id.slice(1)}
            </Typography>
            <Button 
                variant="outlined"
                onClick={handleMute}
            >
                {mute?'Unmute':'Mute'}
            </Button>
        </Grid>
        <Grid item xs={8}>
            <div
                style={{ border: '1px solid grey', /* width: 150, height: 80 */ }}
                id={"waveform"+props.id}
            />
            <audio
                id={props.id}
                src={props.src}
            />
        </Grid>
    </Grid>
    );
}

export default App;