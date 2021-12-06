import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Howl } from "howler";

const sounds = new Map<string, Howl>();
["click", "hi-hat", "kick", "sticks"].forEach((sound) => {
  sounds.set(sound, new Howl({ src: [`sounds/${sound}.mp3`] }));
});

export default function usePlayer() {
  let timeouts: NodeJS.Timeout[];
  const { state, getters, commit } = useStore();

  const isPlaying = ref(false);
  const isFirstBeat = computed(() => state.beat.current === 1);
  const accentuateFirstBeat = computed(() => state.settings.accentuateFirstBeat);

  function loop() {
    commit("nextBeat");

    const timeBeforeNextBeat = (60 / state.bpm.value) * 1000;
    timeouts = [setTimeout(loop, timeBeforeNextBeat)];

    const accentuateBeat = accentuateFirstBeat.value && isFirstBeat.value;
    const pitch = accentuateBeat ? 1.4 : 1;
    const volumeMultiplier = accentuateBeat ? 1 : 0.8;

    playSound(pitch, volumeMultiplier);

    const intermediateBeats: number[] = getters.intermediateBeats;
    timeouts = timeouts.concat(
      intermediateBeats.map((fraction) =>
        setTimeout(() => playSound(0.9, 0.2), fraction * timeBeforeNextBeat)
      )
    );
  }

  function playSound(pitch: number, volumeMultipler: number) {
    const sound = sounds.get(state.settings.sound);
    const volume = state.settings.volume;

    if (sound) {
      sound.rate(pitch);
      sound.volume((volumeMultipler * volume) / 100);
      sound.play();
    }
  }

  function play() {
    loop();
    isPlaying.value = true;
  }

  function stop() {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    isPlaying.value = false;
    commit("resetBeat");
  }

  unlockAudioContext();

  return {
    isPlaying,
    play,
    stop
  };
}

/**
 * A dirty workaround for an issue with Chromium blocking audio before the first user interaction:
 *
 * for some reason, even if the audio is played after the click on a button, it takes a bit of time
 * to play the first sound. Which is noticeable and annoying in the case of a metronome application.
 *
 * It seems that playing a few sounds "wakes up" the AudioContext and enables to play the first sound
 * immediately after the click on the play button.
 *
 * You can comment the call to this function above to see the issue (on a Chromium browser)
 */
function unlockAudioContext() {
  const emptySound = new Howl({ src: ["sounds/empty.mp3"] });
  let i = 0;

  function silentLoop() {
    emptySound.mute();
    emptySound.play();
    if (i++ < 5) {
      setTimeout(silentLoop, 100);
    }
  }
  silentLoop();
}
