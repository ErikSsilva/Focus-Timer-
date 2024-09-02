import state from "./state.js";
import * as timer from './timer.js'
import * as el from './elements.js'
import * as sounds from './sounds.js'

export function toggleRunning() {
  state.isRunning = document.documentElement.classList.toggle("running");
  timer.countdown()
  sounds.buttonPressAudio.play()
}

export function reset(){
    state.isRunning = false
    document.documentElement.classList.remove('running')
    timer.updateDisplay()
    sounds.buttonPressAudio.play()
}

export function plusMinutes(){
 const minutes = (Number(el.minutes.textContent) + 5)
 
 timer.updateDisplay(minutes)
 if(minutes > 60){
    timer.updateDisplay(60)
 }
 sounds.buttonPressAudio.play()
}

export function minusMinutes(){
    const minutes = (Number(el.minutes.textContent) - 5)
    
    timer.updateDisplay(minutes)
    if(minutes < 5){
       timer.updateDisplay(5)
    }
    sounds.buttonPressAudio.play()
}


const SOUND_CLASSES = {
  forest: "forestSound",
  rain: "rainSound",
  coffeShop: "coffeshopSound",
  campfire: "campfireSound",
};

const ACTIVE_CLASS = "secondary";

function getLastSoundButton(soundButton) {
  let lastSoundButton = soundButton;

  if (lastSoundButton) {
    return lastSoundButton;
  }

  lastSoundButton = document.querySelector(`.${ACTIVE_CLASS}`);

  if (!lastSoundButton) {
    return;
  }

  return lastSoundButton;
}

function stopLastSound(soundButton) {
  if (state.isMute) {
    return;
  }

  const lastSoundButton = getLastSoundButton(soundButton);

  if (!lastSoundButton) {
    return;
  }
  
  lastSoundButton.classList.remove(ACTIVE_CLASS);

  const { id } = lastSoundButton;
  const isValid = id in SOUND_CLASSES;

  if (!isValid) {
    return;
  }

  const soundClass = SOUND_CLASSES[id];
  document.documentElement.classList.remove(soundClass);
  sounds[id].pause()
  state.isMute = true;
}

function toggleSound(soundId) {
  const soundButton = document.getElementById(soundId);
  const isActive = soundButton.classList.contains(ACTIVE_CLASS);

  if (isActive) {
    sounds[soundId].pause()
    stopLastSound(soundButton);
    return;
  }
  
  stopLastSound();

  const soundClass = SOUND_CLASSES[soundId];

  document.documentElement.classList.add(soundClass);
  soundButton.classList.add(ACTIVE_CLASS);
  sounds[soundId].play()
  state.isMute = false;
}

export function forestSound() {
  toggleSound("forest");
  
}

export function rainSound() {
  toggleSound("rain");
 
}

export function coffeshopSound() {
  toggleSound("coffeShop");
  
}

export function campfireSound() {
  toggleSound("campfire");
  
}
