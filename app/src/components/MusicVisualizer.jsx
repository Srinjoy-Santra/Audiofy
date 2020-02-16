import React from 'react';

//import { peaks } from './peaks.js';
import WaveSurfer from 'wavesurfer.js';

// .ebee
class App extends React.Component {
  componentDidMount() {
    const aud = document.querySelector('#song');

    this.wavesurfer = WaveSurfer.create({
      barWidth: 3,
      barHeight: 1,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'MediaElement',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent',
    });

    this.wavesurfer.load(aud);
    //console.log(peaks.length);
  }

  playIt = () => {
    this.wavesurfer.playPause();
  };

  // 472, 780, +

  render() {
    return (
      <div>
        <button onClick={this.playIt}>Play</button>
        <div
          style={{ border: '1px solid grey', /* width: 150, height: 80 */ }}
          id="waveform"
        />
        <audio
          id="song"
          src="./uploads/vocal.mp3"
        />
      </div>
    );
  }
}

export default App;
