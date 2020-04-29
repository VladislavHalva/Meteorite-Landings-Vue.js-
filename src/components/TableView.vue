<template>
  <div class="tableView pageBlock">
    <div class="blockContent">
      <div class="scrollableTableWrapper" id="allObjectsTable">
        <table class="scrollableTable">
          <thead>
            <tr>
              <th>ID</th>
              <th class="clickable clkHeader" v-on:click="sortByName">
                <span>Name</span>
                <span v-if="!nameAsc">&#8681;</span>
                <span v-else>&#8679;</span>
              </th>
              <th class="clickable clkHeader" v-on:click="sortByYear">
                <span>Year</span>
                <span v-if="yearAsc">&#8681;</span>
                <span v-else>&#8679;</span>
              </th>
              <th class="clickable clkHeader" v-on:click="sortByMass">
                <span>Mass (g)</span>
                <span v-if="massAsc">&#8681;</span>
                <span v-else>&#8679;</span>
              </th>
              <th class="clickable clkHeader" v-on:click="sortByClass">
                <span>Recclass</span>
                <span v-if="classAsc">&#8681;</span>
                <span v-else>&#8679;</span>
              </th>
              <th>Geolocation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="object in objects"
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
              <td class="clickable clkDetail"></td>
            </tr>
            <observer v-on:intersect="intersected" class="observer" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Observer from "./Observer.vue";

import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "TableView",
  components: { Observer },
  data() {
    return {
      orderBy: "name",
      ordering: "asc",
      orderingChange: false,
      nameAsc: true,
      yearAsc: true,
      massAsc: true,
      classAsc: true,
      objects: [],
      pageOffset: 0
    };
  },
  methods: {
    async intersected() {
      //paging the objects from API --> reduce load time
      //reset when sort method changed
      if (this.orderingChange) {
        this.pageOffset = 0;
      }
      try {
        await axios
          .get(
            this.$store.state.APIBaseUrl +
              "?$$app_token=" +
              this.$store.state.AppToken +
              "&$limit=100" +
              "&$offset=" +
              this.pageOffset++ * 100 +
              "&$order=" +
              this.orderBy +
              " " +
              this.ordering
          )
          .then(response => {
            if (this.orderingChange) {
              this.objects = response.data;
              this.orderingChange = false;
            } else {
              this.objects = [...this.objects, ...response.data];
            }
          });
      } catch (error) {
        console.log(error.response);
      }
    },
    sortByName() {
      this.orderingChange = true;
      this.orderBy = "name";
      if (this.nameAsc) {
        this.ordering = "desc";
        this.nameAsc = false;
      } else {
        this.ordering = "asc";
        this.nameAsc = true;
      }
      this.intersected();
    },
    sortByYear() {
      this.orderingChange = true;
      this.orderBy = "year";
      if (this.yearAsc) {
        this.ordering = "desc";
        this.yearAsc = false;
      } else {
        this.ordering = "asc";
        this.yearAsc = true;
      }
      this.intersected();
    },
    sortByMass() {
      this.orderingChange = true;
      this.orderBy = "mass";
      if (this.massAsc) {
        this.ordering = "desc";
        this.massAsc = false;
      } else {
        this.ordering = "asc";
        this.massAsc = true;
      }
      this.intersected();
    },
    sortByClass() {
      this.orderingChange = true;
      this.orderBy = "recclass";
      if (this.classAsc) {
        this.ordering = "desc";
        this.classAsc = false;
      } else {
        this.ordering = "asc";
        this.classAsc = true;
      }
      this.intersected();
    },
    gotoDetail(object) {
      this.$router.push({
        name: "Detail",
        params: { id: object.id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.observer {
  height: 1px;
}
</style>
