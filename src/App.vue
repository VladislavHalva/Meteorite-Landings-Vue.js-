<template>
  <div id="app">
    <header>
      <div id="pageTitle">
        <router-link to="/">
          <img src="@/assets/meteorite.svg" alt="meteoriteIcon" />
          <h1>Meteorite Landings</h1>
        </router-link>
      </div>
      <div id="nav">
        <router-link class="clickable" to="/">Home</router-link>|
        <router-link class="clickable" to="/objectsList">Meteorites List</router-link>|
        <router-link class="clickable" to="/mapView">Map View</router-link>|
        <router-link class="clickable" to="/stats">Statistics</router-link>|
      </div>
    </header>
    <CustomNavigation></CustomNavigation>
    <router-view />
  </div>
</template>

<script>
import Vue from "vue";
import store from "./store/";
import CustomNavigation from "./components/CustomNavigation.vue";

Vue.config.performance = true;

export default {
  components: { CustomNavigation },
  async created() {
    // async load names, mass and year of all object for
    // statistics and search component, save to store
    try {
      let response = await fetch(
        store.state.APIBaseUrl +
          "?$$app_token=" +
          store.state.AppToken +
          "&$limit=50000" +
          "&$select=id,name,mass,year"
      );
      let data = await response.json();
      store.commit("storeObjects", data);
    } catch (error) {
      console.log(error);
      alert(
        "Sorry, but an internal error occured. Unable to load the meteorites data."
      );
    }
  }
};
</script>

<style lang="scss">
@import "/styles/topBarStyles";
</style>
