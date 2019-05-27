<template>
  <v-container xs12>
    <!-- edition :{ 
{
      "identifier": "ar.muyassar",
      "language": "ar",
      "name": "تفسير المیسر",
      "englishName": "King Fahad Quran Complex",
      "format": "text",
      "type": "tafsir"
    }

    }-->
    <!-- Type Filter 
    "tafsir",
    "translation",
    "quran",
    "transliteration",
    "versebyverse"-->
    <!--  -->
    <!-- <div v-for="type in editionTypes" :key="type"> -->
    {{allLanguages}}:
    <v-select v-model="allowedLangs" :items="allLanguages" label="Language Select" multiple></v-select>
    <v-layout align-center justify-center>
      <v-switch v-model="showTranslation" label="Translations" color="red"></v-switch>
      <v-switch v-model="showTafsir" label="Tafsirs" color="green"></v-switch>
      <!-- <v-switch
        v-model="showVerseByVerse"
        :label="`Verse By Verse: ${showVerseByVerse.toString()}`"
        color="red"
      ></v-switch>-->
      <v-switch v-model="showTransliteration" label="Transliterations" color="blue"></v-switch>
    </v-layout>
    <!-- </div> -->
    <div v-for="edition in filteredList" :key="edition.identifier">
      <v-card @click="$emit('selected',edition)">
        <v-card-text>{{edition}}</v-card-text>
        {{edition.type}}
      </v-card>
    </div>
  </v-container>
</template>

<script>
import staticData from "../staticData";
export default {
  props: ["list", "selected"],
  data: () => ({
    // ??Edition Filters
    // filtere
    // editionFilters: {
    // allowedTypes: [],
    showTranslation: true,
    showTafsir: false,
    showTransliteration: false,
    showVerseByVerse: false,
    allLanguages: staticData.languages,
    allowedLangs: ["en"]
    // }
    //surahList needs another component/view
    // editionList: null,
    //selectedEdition: {}
  }),
  components: {},
  created: function() {
    // console.log(staticData);
    // this.selectedEdition = this.selected;
    // this.list = this.list.filter(x => x.format != "audio");
  },
  mounted: function() {
    // this.selectedSurah = this.list[0];
    // console.log("created1");
  },
  computed: {
    filterOnTypes() {
      let filterOnType = [];
      this.showTranslation ? filterOnType.push("translation") : null;
      this.showTafsir ? filterOnType.push("tafsir") : null;
      this.showTransliteration ? filterOnType.push("transliteration") : null;
      this.showVerseByVerse ? filterOnType.push("versebyverse") : null;
      return filterOnType;
    },
    filteredList() {
      let filtered = this.list;
      let typesToFilter = this.filterOnTypes;
      // this.showTranslation
      //   ? filterList.push({ on: "type", val: "translation" })
      //   : null;
      return filtered.filter(element => {
        return typesToFilter.find(
          typeInFilter => typeInFilter === element.type
        );
        // filterList.forEach(y => {
        // return x[y.on] === y.val;
        // });
      });
      // return filtered;
    }
  },
  methods: {
    // filterByType() {
    //   filterBy = {
    //     PARTY: ["REPUBLICAN", "DEMOCRAT"],
    //     BALLOT_STATUS: ["PERM", "POLL"]
    //   };
    //   result = data.filter(o =>
    //     Object.keys(filterBy).every(k => filterBy[k].some(f => o[k] === f))
    //   );
    //   console.log(result);
    // }
    // onSelection() {
    //   this.$emit("selected", this.selectedEdition);
    // }
  }
};
</script>