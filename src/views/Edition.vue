<template>
  <v-container xs12>
    <!-- emit change -->
    <flag :iso="selectedEdition.language"/>
    <v-select
      v-model="selectedEdition"
      @change="onSelection"
      class="medText"
      :items="list"
      item-text="name"
      :hint="`${selectedEdition.language} - ${selectedEdition.format}`"
      item-value="identifier"
      label="Editions"
      persistent-hint
      return-object
      single-line
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
  props: ["list"],
  data: () => ({
    //surahList needs another component/view
    // editionList: null,
    selectedEdition: {}
  }),
  components: {},
  created: async function() {
    // console.log("created1");
  },
  methods: {
    filterByType() {},
    onSelection() {
      this.$emit("edition-selected", this.selectedEdition);
    }
  }
};
</script>
