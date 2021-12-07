import { computed, ref } from "vue";
import { useStore } from "vuex";
import { Howl } from "howler";

let audioContextUnlocked = false;

const sounds = new Map<string, Howl>();
["click", "hi-hat", "kick", "sticks"].forEach((sound) => {
  const howl = new Howl({ src: [`sounds/${sound}.mp3`] });
  howl.once("unlock", () => (audioContextUnlocked = true));
  sounds.set(sound, howl);
});

export default function usePlayer() {
  let timeouts: NodeJS.Timeout[] = [];
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
      sound.stop();
      sound.play();
    }
  }

  async function unlockAudioContext() {
    return new Promise<void>((resolve, reject) => {
      const sound = sounds.get(state.settings.sound);
      if (!sound) {
        reject();
        return;
      }

      sound.once("unlock", () => {
        // I found that the AudioContext often skips the first sound even when it is unlocked
        // so I play it silently to "wake it up"
        sound.volume(0);
        sound.play();
        sound.once("end", () => resolve());
      });
    });
  }

  async function play() {
    isPlaying.value = true;

    if (!audioContextUnlocked) {
      await unlockAudioContext();
    }
    loop();
  }

  function stop() {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    isPlaying.value = false;
    commit("resetBeat");
  }

  return {
    isPlaying,
    play,
    stop
  };
}
