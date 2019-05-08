<template>
  <v-container xs12>
    <!-- <flag :iso="selectedEdition.language"/> -->
    <v-select
      @change="onSelection"
      class="arabicText medText"
      v-model="selectedSurah"
      :items="list"
      item-text="name"
      item-value="number"
      label="Surahs"
      :hint="`${selectedSurah.name} - ${selectedSurah.englishName}`"
      persistent-hint
      return-object
      single-line
    ></v-select>
  </v-container>
</template>

<script>
export default {
  props: ["list"],
  data: () => ({
    //surahList needs another component/view
    // editionList: null,
    selectedSurah: {}
  }),
  components: {},
  created: async function() {
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
