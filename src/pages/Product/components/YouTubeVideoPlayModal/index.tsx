import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
// https://github.com/cookpete/react-player/blob/master/examples/react/src/App.js

import './index.less';

type Props = {
  youTubeId: string;
  isYoutubeVideoOpen?: boolean;
  youTubeCallbackStatus: any;
  [key: string]: any;
};

export default (props: Props) => {
  const [url, setUrl] = useState<string>('');
  const [playing, setPlaying] = useState(false);
  const [pip, setPip] = useState(false);
  const [controls] = useState(false);
  const [light] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted] = useState(false);
  // const [played, setPlayed] = useState(0);
  // const [loaded, setLoaded] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop] = useState(false);
  const handleOk = () => {
    setUrl(url);
    setPlaying(false);
    props.youTubeCallbackStatus();
  };
  const handleCancel = () => {
    setUrl(url);
    setPlaying(false);
    props.youTubeCallbackStatus();
  };
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleStop = () => {
    setUrl(url);
    setPlaying(false);
  };
  const handleVolumeChange = (e: any) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleOnPlaybackRateChange = (speed: string) => {
    setPlaybackRate(parseFloat(speed));
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handleEnablePIP = () => {
    setPip(true);
  };

  const handleDisablePIP = () => {
    setPip(false);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleEnded = () => {
    setPlaying(loop);
  };

  useEffect(() => {
    if (props.youTubeId && props.isYoutubeVideoOpen) {
      setUrl(`https://www.youtube.com/watch?v=${props.youTubeId}`);
      setPlaying(true);
      setPip(false);
    } else {
      setUrl('');
      setPlaying(false);
    }
  }, [props]);
  return (
    <Modal
      width={690}
      className="youtube-video-box"
      title="Youtube video"
      open={props.isYoutubeVideoOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <ReactPlayer
        className="react-player"
        width="100%"
        height="100%"
        url={url}
        pip={pip}
        playing={playing}
        controls={controls}
        light={light}
        loop={loop}
        playbackRate={playbackRate}
        volume={volume}
        muted={muted}
        onReady={() => console.log('onReady')}
        onStart={() => console.log('onStart')}
        onPlay={handlePlay}
        onEnablePIP={handleEnablePIP}
        onDisablePIP={handleDisablePIP}
        onPause={handlePause}
        onBuffer={() => console.log('onBuffer')}
        onPlaybackRateChange={handleOnPlaybackRateChange}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={(e) => console.log('onError', e)}
        onPlaybackQualityChange={(e: any) => console.log('onPlaybackQualityChange', e)}
      />
      <div className="controls">
        <Button size="small" onClick={handleStop}>
          Stop
        </Button>
        <Button size="small" onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'}
        </Button>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </Modal>
  );
};
