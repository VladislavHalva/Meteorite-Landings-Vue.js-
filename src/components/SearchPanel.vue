<template>
  <div class="searchPanel pageBlock">
    <div class="blockContent">
      <div class="dropdownSearch">
        <input
          placeholder="Search"
          class="dropdownSearchInput"
          @blur="close()"
          @focus="showOptions()"
          @keyup="enterMonitor"
          v-model="searchedValue"
        />
        <button v-on:click="search" :disabled="disabled" class="submitButton">
          Go to detail
        </button>

        <!-- Dropdown box showing possible meterorite names to be searched -->
        <div class="dropdownSearchOptions" v-show="shownOptions">
          <div
            class="dropdownSearchOption"
            v-for="object in filteredOptions"
            :key="object.id"
            @mousedown="selectOption(object)"
          >
            {{ object.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {},
      searchedValue: "",
      shownOptions: false,
      maxOptions: 10,
      disabled: true //allow submit only if valid value selected
    };
  },
  computed: {
    options() {
      return this.$store.getters.getObjects;
    },
    filteredOptions() {
      const filtered = [];
      const regex = new RegExp(this.searchedValue, "ig"); //user input for search
      for (const option of this.options) {
        if (this.searchedValue.length < 1 || option.name.match(regex)) {
          filtered.push(option);
        }
        if (filtered.length >= this.maxOptions) {
          //load only few first matches
          break;
        }
      }
      return filtered;
    }
  },
  methods: {
    close() {
      if (!this.selected.id) {
        this.selected = {};
        this.searchedValue = "";
      } else {
        this.searchedValue = this.selected.name;
      }
      this.shownOptions = false;
    },
    selectOption(option) {
      this.selected = option;
      this.shownOptions = false;
      this.searchedValue = this.selected.name;
      this.disabled = false;
    },
    showOptions() {
      this.searchedValue = "";
      this.shownOptions = true;
    },
    enterMonitor: function(event) {
      if (event.key === "Enter" && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    },
    search() {
      //valid value selected ==> go to detail page
      this.searchedValue = "";
      this.disabled = true;
      this.$router.push({ name: "Detail", params: { id: this.selected.id } });
      this.selected = {};
    }
  },
  watch: {
    searchedValue() {
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      } else {
        this.selected = this.filteredOptions[0];
      }
    }
  }
};
</script>

<style lang="scss">
@import "/../styles/searchPanelStyles";
</style>
