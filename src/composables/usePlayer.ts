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
    sound.rate(isFirstBeat.value ? 1.5 : 1); // increase the pitch
    sound.volume(isFirstBeat.value ? 1 : 0.8);
    sound.play();

    timeout = setTimeout(() => {
      commit("nextBeat");
      loop();
    }, (60 / state.bpm.value) * 1000);
  }

  function play() {
    loop();
    isPlaying.value = true;
  }

  function stop() {
    clearTimeout(timeout);
    isPlaying.value = false;
  }

  return {
    isPlaying,
    play,
    stop
  };
}
