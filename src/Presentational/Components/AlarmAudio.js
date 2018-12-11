// React required for <></>
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  useContext,
  useMemo,
  createRef,
  useEffect,
} from 'react';

import { ClockMachineServiceContext } from '../../';

import { useServiceForState } from '../../UseMachine';

const updateAudioPlayingStatus = async (
  audio,
  shouldBePlaying
) => {
  if (audio !== null) {
    if (audio.paused) {
      if (shouldBePlaying) return await audio.play();
    } else if (!shouldBePlaying) return audio.pause();
  }
};

const updateAudioVolume = (audio, volume) => {
  if (audio !== null) {
    audio.volume = volume;
  }
};

const Audio = ({ src, volume, shouldBePlaying }) => {
  const ref = createRef();
  console.log(ref);
  useEffect(
    () => {
      updateAudioPlayingStatus(
        ref.current,
        shouldBePlaying
      );
    },
    [ref.current, shouldBePlaying]
  );

  useEffect(() => updateAudioVolume(ref.current, volume), [
    ref.current,
    volume,
  ]);

  return (
    <audio src={src} ref={ref}>
      Your browser does not support the
      <code>audio</code> element.
    </audio>
  );
};

// Clamp volume btw 0 and 1
const sanitizeVolume = volume =>
  Math.min(Math.max(volume, 0), 1);

export default function({ src, volume = 1 }) {
  const validVolume = useMemo(
    () => sanitizeVolume(volume),
    [volume]
  );

  const { service, initialState } = useContext(
    ClockMachineServiceContext
  );

  const state = useServiceForState(service, initialState);

  // Should play tone if machine is in 'EndofBreak' or 'EndofWork'
  const shouldBePlaying = !![
    'EndofBreak',
    'EndofWork',
  ].filter(elem => state.matches(elem));

  return (
    <Audio
      src={src}
      volume={validVolume}
      shouldBePlaying={shouldBePlaying}
    />
  );
}
