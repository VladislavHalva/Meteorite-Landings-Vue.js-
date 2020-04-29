<template>
  <div class="detail pageBlock" v-if="this.show">
    <MapViewDetail
      class="mapViewBlock"
      :object="object"
      :lat="parseFloat(object.reclat)"
      :lng="parseFloat(object.reclong)"
    ></MapViewDetail>

    <div class="objectInfo">
      <table>
        <tr>
          <td>
            <strong>Name:</strong>
          </td>
          <td>{{ object.name }}</td>
        </tr>
        <tr>
          <td>
            <strong>Nametype:</strong>
          </td>
          <td>{{ object.name }}</td>
        </tr>
        <tr>
          <td>
            <strong>Fall:</strong>
          </td>
          <td>{{ object.nametype }}</td>
        </tr>
        <tr>
          <td>
            <strong>Year:</strong>
          </td>
          <td>{{ object.year.substr(0, 4) }}</td>
        </tr>
        <tr>
          <td>
            <strong>Mass (g):</strong>
          </td>
          <td>{{ object.mass }}</td>
        </tr>
        <tr>
          <td>
            <strong>Recclass:</strong>
          </td>
          <td>{{ object.recclass }}</td>
        </tr>
        <tr>
          <td>
            <strong>Geolocation:</strong>
          </td>
          <td>{{ "(" + object.reclat + "°, " + object.reclong + "°)" }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="loading" v-else>Loading ...</div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

import MapViewDetail from "@/components/MapViewDetail.vue";

export default {
  name: "detail",
  props: ["id"],
  data() {
    return {
      show: false,
      object: []
    };
  },
  components: {
    MapViewDetail
  },
  async created() {
    //load all the informations about spec. object
    try {
      await axios
        .get(
          this.$store.state.APIBaseUrl +
            "?$$app_token=" +
            this.$store.state.AppToken +
            "&$where=id='" +
            this.id +
            "'"
        )
        .then(response => {
          this.object = response.data[0];
          this.show = true; //render
        });
    } catch (error) {
      console.log(error.response);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "/../styles/detailStyles";
</style>
