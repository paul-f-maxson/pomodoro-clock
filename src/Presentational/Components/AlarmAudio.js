import React, {
  Component,
  useContext,
  useMemo,
  createRef,
  useEffect,
} from 'react';

import { ClockMachineServiceContext } from '../../';

import { useServiceForContext } from '../../UseMachine';

// const updateAudioPlayingStatus = async (audio, shouldBePlaying) => {
//   if (audio !== null) {
//     if (audio.paused) {
//       if (shouldBePlaying) return await audio.play();
//     } else if (!shouldBePlaying) return audio.pause();
//   }
// };
//
// const updateAudioVolume = (audio, volume) => {
//   if (audio !== null) {
//     audio.volume = volume;
//   }
// };
//
// const Audio = ({ src, volume, shouldBePlaying }) => {
//   const ref = createRef();
//   console.log(ref);
//   useEffect(
//     () => {
//       updateAudioPlayingStatus(ref.current, shouldBePlaying);
//     },
//     [ref.current, shouldBePlaying]
//   );
//
//   useEffect(() => updateAudioVolume(ref.current, volume), [
//     ref.current,
//     volume,
//   ]);
//
//   return (
//     <audio src={src} ref={ref}>
//       Your browser does not support the
//       <code>audio</code> element.
//     </audio>
//   );
// };

function getAudioRef() {
  return this.audioRef;
}

class Audio extends Component {
  // TODO: Add volume control functionality
  constructor(props) {
    super(props);
    this.setAudioRef = this.setAudioRef.bind(this);
    getAudioRef = getAudioRef.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldBePlaying !== this.props.shouldBePlaying;
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props;
    console.debug({ desc: 'start of cdu', prevProps, newProps });
    if (this.props.shouldBePlaying)
      this.audioRef
        .play()
        .then(result =>
          console.debug({
            desc: 'play succeeded',
            result,
            audioRef: getAudioRef(),
          })
        )
        .catch(err => console.debug({ desc: 'play failed', err }));
    else this.audioRef.pause();
    const { audioRef } = this;
    console.debug({ desc: 'end of cdu', audioRef });
  }

  setAudioRef(audioRef) {
    this.audioRef = audioRef;
    console.debug({
      desc: 'setAudioRef',
      play: audioRef.play,
      pause: audioRef.pause,
      paused: audioRef.paused,
    });
  }

  render() {
    return (
      <audio src={this.props.src} ref={this.setAudioRef} preload="auto" loop>
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }
}

// Clamp volume btw 0 and 1
const sanitizeVolume = volume => Math.min(Math.max(volume, 0), 1);

export default function({ src, volume = 1 }) {
  const validVolume = useMemo(() => sanitizeVolume(volume), [volume]);

  const { service, initialContext } = useContext(ClockMachineServiceContext);

  const context = useServiceForContext(service, initialContext);

  // Should play tone if machine is in 'EndofBreak' or 'EndofWork'
  const shouldBePlaying = context.ringing;

  return (
    <Audio src={src} volume={validVolume} shouldBePlaying={shouldBePlaying} />
  );
}
