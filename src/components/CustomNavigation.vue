<template>
  <div class="customNavigation pageBlock">
    <div class="blockContent">
      <div class="navigation">
        <router-link to="/">
          <div class="homeNav navItem clickable">
            <img src="@/assets/home.svg" class="icon" />
            <p>Home</p>
          </div>
        </router-link>
        <router-link to="/objectsList">
          <div class="tableNav navItem clickable">
            <img src="@/assets/table.svg" class="icon" />
            <p>List</p>
          </div>
        </router-link>
        <router-link to="/mapView">
          <div class="mapNav navItem clickable">
            <img src="@/assets/map.svg" class="icon" />
            <p>Map</p>
          </div>
        </router-link>
        <router-link to="/stats">
          <div class="statsNav navItem clickable">
            <img src="@/assets/stats.svg" class="icon" />
            <p>Statistics</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "/../styles/customNavigationStyles";
</style>
