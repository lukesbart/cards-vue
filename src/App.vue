<script setup>
import { onMounted, ref } from 'vue'
import Cards from './components/Cards.vue'
import VueCookies from 'vue-cookies'

let lightMode;

if (VueCookies.get('lightTheme') === 'dark') {
  lightMode = 'dark'
} else {
  lightMode = 'light'
}

let darkModeOn = ref(false);

const setLightOnLoad = () => {
  if (lightMode === 'dark') {
    document.body.classList.add('bg-dark', 'text-light')
    darkModeOn.value = true;
  }
}

const switchLightMode = () => {
  lightMode = lightMode === 'light' ? 'dark' : 'light'
  if (lightMode === 'dark') {
    document.body.classList.add('bg-dark', 'text-light')
    VueCookies.set('lightTheme', 'dark', '14d')
  } else {
    document.body.classList.remove('bg-dark', 'text-light')
    VueCookies.remove('lightTheme')
  }
}

onMounted(() => {
  setLightOnLoad()
})
</script>

<template>
  <div class="form-check form-switch">
    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" @click="switchLightMode()" v-model="darkModeOn">
    <label class="form-check-label" for="flexSwitchCheckDefault">Dark Mode</label>
  </div>
  <div class="px-4 py-5 my-5">
    <div class="text-center">
      <h1>Cards Workout</h1>
      <p class="lead">This program is based off of Jeff Nippard's Card Workout</p>
    </div>
  </div>
  <Cards/>
</template>

