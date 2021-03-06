import React, { Component, useContext, useMemo, createRef } from 'react';

import { ClockMachineServiceContext } from '../../';

import { useServiceForContext } from '../../UseMachine';

// Clamp volume btw 0 and 1
const sanitizeVolume = volume => Math.min(Math.max(volume, 0), 1);

class Audio extends Component {
  // TODO: Add volume control functionality
  constructor(props) {
    super(props);
    this.audioRef = createRef();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldBePlaying !== this.props.shouldBePlaying;
  }

  componentDidUpdate(prevProps) {
    if (this.props.shouldBePlaying)
      this.audioRef.current.play().catch(err => {
        if (err.name === 'NotAllowedError' || err.name === 'NotSupportedError') {
          console.error('Alarm chime cannot be played');
          return null;
        } else throw err;
      });
    else this.audioRef.current.pause();
  }

  render() {
    return (
      <audio src={this.props.src} ref={this.audioRef} preload="auto" loop>
        Your browser does not support the <code>audio</code> element.
      </audio>
    );
  }
}

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
