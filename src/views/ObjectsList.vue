<template>
  <div class="objectsList">
    <h1 class="pageTitle pageBlock blockContent">Meteorite landings list</h1>
    <SearchPanel v-if="this.$store.getters.loaded"></SearchPanel>
    <div class="loading" v-else>Loading ...</div>
    <TableView></TableView>
  </div>
</template>

<script>
import SearchPanel from "@/components/SearchPanel.vue";
import TableView from "@/components/TableView.vue";

export default {
  name: "ObjectsList",
  components: {
    TableView,
    SearchPanel
  }
};
</script>
