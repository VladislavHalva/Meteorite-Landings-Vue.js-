<template>
  <div class="mapView">
    <h1 class="pageTitle pageBlock blockContent">Meteorite landings locations</h1>
    <div class="pageBlock">
      <div class="blockContent">
        <p>
          To view the meteorites fallen in area marked with the rectangle click
          it.
        </p>

        <!-- Google maps map view API -->
        <GmapMap id="map" :center="center" :zoom="3" map-type-id="terrain" style="height: 500px">
          <!-- polygons defining the regions -->
          <GmapPolygon
            :key="m.id"
            v-for="m in markers"
            :paths="m.polygon"
            :draggable="false"
            :editable="false"
            :clickable="true"
            :options="polygonOptions"
            @click="markerClicked(m)"
          ></GmapPolygon>
        </GmapMap>

        <!-- Table of meteorites -->
        <div class="blockContent" v-if="showTableView">
          <a name="landingsTable" />
          <div class="scrollableTableWrapper" id="mapObjectsTable">
            <table class="scrollableTable" v-if="this.objectsToShow.length">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>
                    <span>Name</span>
                  </th>
                  <th>
                    <span>Year</span>
                  </th>
                  <th>
                    <span>Mass (g)</span>
                  </th>
                  <th>
                    <span>Recclass</span>
                  </th>
                  <th>Geolocation</th>
                  <th
                    class="closeTableButton clickable"
                    v-on:click="showTableView = false"
                  >Close table</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="object in objectsToShow"
                  :key="object.id"
                  v-on:click="gotoDetail(object)"
                  class="clickable clkDetail"
                >
                  <td>{{ object.id }}</td>
                  <td>{{ object.name }}</td>
                  <td v-if="object.year">{{ object.year.substr(0, 4) }}</td>
                  <td v-else></td>
                  <td>{{ object.mass }}</td>
                  <td>{{ object.recclass }}</td>
                  <td>{{ "(" + object.reclat + "°, " + object.reclong + "°)" }}</td>
                </tr>
              </tbody>
            </table>
            <div v-else>
              <p>No meteorites fell in this area</p>
              <button
                class="closeTableButton clickable"
                v-on:click="showTableView = false"
              >Hide message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as clustering from "../assets/js/objectsClustering.js";

export default {
  name: "MapView",
  data() {
    return {
      center: { lat: 20.0, lng: 10.0 },
      showTableView: false,
      maxZoom: 7,
      objectsToShow: [], //objects within the selected area
      polygonOptions: {
        strokeColor: "#eee",
        strokeWidth: 0.7,
        strokeOpacity: 0.5,
        fillColor: "000",
        fillOpacity: 0.2
      }
    };
  },
  computed: {
    markers() {
      // async load of meteorites clusters from API
      // objects only promise !
      return clustering.getClustersAPI();
    },
    paths() {
      // path to draw the area polygons
      let points = [];
      for (let i = 0; i < this.markers.length; i++) {
        points.push(this.markers[i].polygon);
      }
      return points;
    }
  },
  methods: {
    markerClicked(object) {
      this.showTableView = true;
      //resolve promise
      object.objects.then(data => {
        this.objectsToShow = data;
      });
      //scroll to table
      window.location.href = "#landingsTable";
    },
    gotoDetail(object) {
      //route to detail page on object click
      this.$router.push({
        name: "Detail",
        params: { id: object.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.closeTableButton {
  background-color: #ba0404;
  color: white;
}
</style>
