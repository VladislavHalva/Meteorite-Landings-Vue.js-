import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //holds the API basic information
    //and the basic information about all objects for search and statistics
    //when all the data are loaded -> data loaded property set to true
    APIBaseUrl: "https://data.nasa.gov/resource/gh4g-9sfh.json",
    AppToken: "HPAC32pmEmvpcMVl7ERlkV1xr",
    objects: [],
    dataLoaded: false,
  },
  getters: {
    getObjects: (state) => {
      return state.objects;
    },
    getObjectById: (state) => (id) => {
      if (state.objects) {
        return state.objects.filter((obj) => {
          return obj.id == id;
        });
      } else {
        return false;
      }
    },
    loaded: (state) => {
      return state.dataLoaded;
    },
    getMassHist: (state) => {
      //returns the objects counts aggregated by mass
      var weights = state.objects.map((a) => a.mass);
      var bins = [0, 0, 0, 0, 0, 0, 0, 0];
      for (let i = 0; i < weights.length; i++) {
        if (weights[i] < 10) {
          bins[0] += 1;
          continue;
        }
        if (weights[i] < 100) {
          bins[1] += 1;
          continue;
        }
        if (weights[i] < 1000) {
          bins[2] += 1;
          continue;
        }
        if (weights[i] < 10000) {
          bins[3] += 1;
          continue;
        }
        if (weights[i] < 100000) {
          bins[4] += 1;
          continue;
        }
        if (weights[i] < 1000000) {
          bins[5] += 1;
          continue;
        }
        if (weights[i] < 10000000) {
          bins[6] += 1;
          continue;
        }
        if (weights[i] < 100000000) {
          bins[7] += 1;
          continue;
        }
      }
      return bins;
    },
    getYearHist: (state) => {
      //returns the objects counts aggregated by year of fall / discovery
      var years = state.objects.map((a) => parseInt(a.year, 10));
      years.sort();
      var uniqueYears = [];
      var bins = [];
      var actYear = 0;
      uniqueYears.push(actYear);
      bins.push(0);
      for (let i = 0; i < years.length; i++) {
        if (actYear == years[i]) {
          bins[bins.length - 1] += 1;
        } else {
          uniqueYears.push(years[i]);
          actYear = years[i];
          bins.push(1);
        }
      }

      return {
        years: uniqueYears,
        bins: bins,
      };
    },
  },
  mutations: {
    //store data loaded from API, correct undefined values
    storeObjects: (state, objects) => {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].year == undefined) {
          objects[i].year = "0000";
        } else {
          objects[i].year = objects[i].year.substr(0, 4);
        }
        if (objects[i].mass == undefined) {
          objects[i].mass = "0";
        }
      }
      state.objects = Object.freeze(objects);
      state.dataLoaded = true;
    },
  },
});
