import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Howl } from "howler";

export default function usePlayer() {
  let timeout: NodeJS.Timeout;
  const sound = new Howl({ src: ["sounds/click.mp3"] });

  const { state, commit } = useStore();
  const isPlaying = ref(false);
  const isFirstBeat = computed(() => state.beat.current === 1);

  function loop() {
    commit("nextBeat");
    sound.rate(isFirstBeat.value ? 1.5 : 1); // increase the pitch
    sound.volume(((isFirstBeat.value ? 1 : 0.8) * state.settings.volume) / 100);
    sound.play();

    timeout = setTimeout(loop, (60 / state.bpm.value) * 1000);
  }

  function play() {
    loop();
    isPlaying.value = true;
  }

  function stop() {
    clearTimeout(timeout);
    isPlaying.value = false;
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
