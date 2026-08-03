/**
 * A dictionary mapping sound identifiers to their respective pre-loaded Audio objects.
 * This acts as the sound manager for the application.
 *
 * @type {Object<string, HTMLAudioElement>}
 */
const soundEffects = {
  correct: new Audio('../sounds/correct-sound.mp3'),
  wrong: new Audio('../sounds/wrong-sound.mp3'),
  victory: new Audio('../sounds/victory-sound.mp3'),
  countDown: new Audio('../sounds/countDown-sound.mp3'),
};

/**
 * Plays a pre-loaded sound effect by its identifier.
 * Automatically resets the playback time to allow rapid successive plays.
 *
 * @param {string} sound - The key identifier of the sound (e.g., 'correct', 'wrong').
 * @returns {void}
 */
export function playSound(sound) {
  const audio = soundEffects[sound];

  if (audio) {
    // Reset the audio to the beginning for immediate replay
    audio.currentTime = 0;

    audio.play().catch((error) => {
      console.error(`Failed to play ${sound} for error: ${error}`);
    });
  } else {
    console.warn(`Sound ${sound} not found`);
  }
}
