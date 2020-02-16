import React, { useState, useRef, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import PauseIcon from "@material-ui/icons/Pause";
import LinearProgress from "@material-ui/core/LinearProgress";

let width = 360
const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    width: width,
  },
  progress: {
    width: width,
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const url = "http://9092.ultratv100.com:9090/music/Linkin%20Park/";
const playList = [
  { name: "One Step Closer", link: "%2302_One%20Step%20Closer.mp3" },
  { name: "Paper Cut", link: "%2301_Paper%20Cut.mp3" },
  { name: "Points of Authority", link: "%2304_Points%20Of%20Authority.mp3" },
  { name: "Crawling", link: "%2305_Crawling.mp3" },
  { name: "In The End", link: "%2308_In%20The%20End.mp3" }
];

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [completed, setCompleted] = useState(0);
  //Play, Pause, Stop
  const [audioControlState, setAudioControlState] = useState("PAUSE");
  const audioRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      let audioObj = audioRef.current;
      console.log(audioObj.currentTime / audioObj.duration);
      props.setSelectedMusicDuration(audioObj.duration)
      setCompleted((audioObj.currentTime / audioObj.duration) * 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <Card className={classes.card} key={setCurrentSongIndex}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {playList[currentSongIndex].name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Linkin Park
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton
              aria-label="previous"
              onClick={() => {
                audioRef.current.pause();
                setAudioControlState("PAUSE");
                setCurrentSongIndex((currentSongIndex - 1) % playList.length);
              }}
            >
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            {audioControlState === "PAUSE" && (
              <IconButton
                aria-label="play/pause"
                onClick={() => {
                  audioRef.current.play();
                  setAudioControlState("PLAY");
                }}
              >
                <PlayArrowIcon className={classes.playIcon} />
              </IconButton>
            )}
            {audioControlState === "PLAY" && (
              <IconButton
                aria-label="play/pause"
                onClick={() => {
                  audioRef.current.pause();
                  setAudioControlState("PAUSE");
                }}
              >
                <PauseIcon className={classes.playIcon} />
              </IconButton>
            )}

            <IconButton
              aria-label="next"
              onClick={() => {
                audioRef.current.pause();
                setAudioControlState("PAUSE");
                setCurrentSongIndex((currentSongIndex + 1) % playList.length);
              }}
            >
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image="https://source.unsplash.com/500x500/?rock,music"
          title="Linkin Park Miscellaneous Album"
        />
      </Card>
      <audio
        ref={audioRef}
        src={url + playList[currentSongIndex].link}
        style={{ display: "none" }}
      />
      {audioRef.current &&
        audioRef.current.addEventListener("ended", () => {
          setAudioControlState("PLAY");
          setCurrentSongIndex((currentSongIndex + 1) % playList.length);
        })}
      <LinearProgress
        variant="determinate"
        value={completed}
        color="secondary"
        className={classes.progress}
      />
    </div>
  );
}
