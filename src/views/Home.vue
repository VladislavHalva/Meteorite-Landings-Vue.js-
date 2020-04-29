<template>
  <div class="home">
    <h1 class="pageTitle pageBlock blockContent">Home</h1>
    <div class="pageBlock infoPanel">
      <div class="blockContent">
        <p>
          This page visualizes a comprehensive dataset from
          <a
            href="https://meteoritical.org/"
            class="clickable"
            target="_blank"
          >The Meteoritical Society</a>
          containing information on all of the known meteorite landings. The
          dataset is provided by NASA. It consists of 45 716 meteorites and
          includes information like name, place, location etc.
        </p>

        <p>
          Source dataset:
          <a
            href="https://data.nasa.gov/d/gh4g-9sfh"
            class="clickable"
            target="_blank"
          >Meteorite Landings</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss" scoped>
.infoPanel {
  padding: 30px;
}
</style>
