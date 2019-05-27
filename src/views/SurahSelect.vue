<template>
  <v-container xs12>
    <!-- <flag :iso="selectedEdition.language"/> -->
    <v-select
      solo
      @change="onSelection"
      class="arabicText display-2 midAlign"
      v-model="selectedSurah"
      :items="list"
      item-text="name"
      item-value="number"
      label="Surahs"
      :hint="`${selectedSurah.name} - ${selectedSurah.englishName}`"
      return-object
    ></v-select>
  </v-container>
</template>

<script>
export default {
  props: ["list", "selected"],
  data: () => ({
    //surahList needs another component/view
    // editionList: null,
    selectedSurah: {}
  }),
  components: {},
  created: function() {
    this.selectedSurah = this.selected;
  },
  mounted: function() {
    // this.selectedSurah = this.list[0];
    // console.log("created1");
  },
  methods: {
    filterByType() {},
    onSelection() {
      this.$emit("surah-selected", this.selectedSurah);
    }
  }
};
</script>