<template>
  <v-container xs12>
    <!-- Type Filter 
    "tafsir",
    "translation",
    "quran",
    "transliteration",
    "versebyverse"-->
    <!-- <v-checkbox v-model="translationFilter" :label="`Translation: ${translationFilter.toString()}`"></v-checkbox> -->
    <!-- emit change -->
    <!-- ...{{filteredList}}... -->
    <flag :iso="selectedEdition.language"/>
    <v-select
      solo
      flat
      v-model="selectedEdition"
      @change="onSelection"
      class="medText"
      :items="list"
      item-text="name"
      :hint="`${selectedEdition.englishName}(${selectedEdition.language})`"
      item-value="identifier"
      label="Translations"
      return-object
    ></v-select>
    <!-- :v-if="edition.format==='text'"> -->
    <!-- <div v-for="(edition,index) in list" :key="edition.identifier">
      <div class="editionInfo">
        <flag :iso="edition.language"/>
        <span class="editionName">{{edition.name}}</span> -
        <span class="editionEnglishName">{{edition.englishName}}</span>
        format:
        <span class="editionFormat">{{edition.format}}</span> /
        lang:
        <span class="editionLanguage">{{edition.language}}</span>
        type:
        <span class="editionType">{{edition.type}}</span>
      </div>
    </div>-->
  </v-container>
</template>
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
  

<script>
export default {
  props: ["list", "selected"],
  data: () => ({
    //surahList needs another component/view
    // editionList: null,
    selectedEdition: {},
    filteredList: []
    // translationFilter: false
  }),
  components: {},
  created: function() {
    this.selectedEdition = this.selected;
    // this.selectedEdition = this.list[0];
    // console.log("prefilter list", this.list);
    // console.log("filtermODE:", this.filterMode);
    // let mode = this.filterMode;
    this.filteredList = this.list.filter(function(x) {
      return x.type === "translation";
    });
    // console.log("postfilter list", this.filteredList);
    // filteredList = list;
    // console.log("created1");
  },
  methods: {
    // filterByType(val) {},
    onSelection() {
      this.$emit("edition-selected", this.selectedEdition);
    }
  },
  computed: {
    filterList() {
      console.log("wtf", this.list);
      this.filteredList = this.list.filter(y => {
        return y.filter === this.filter;
      });
      return this.filteredList;
    }
  }
};
</script>
