<template>
  <v-container fluid>
    <!-- <v-layout row> -->
    <!-- <v-flex> -->
    <!-- {{computedFunc}}
    {{alteredSurah}} = {{alteredTranslation}}-->
    <!-- {{surahList}} -->
    <!-- <br> -->
    <!-- {{fatiha}} -->
    <!-- v-for="(item, i) in 5" :key="i" -->
    <v-layout align-center justify-space-around row>
      <!-- <flag iso="pk"/> -->
      <v-expansion-panel popout xs6>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Translations</div>
          </template>
          <v-card>
            <v-card-text>
              <Edition :list="translationList" @edition-selected="translationReceived"></Edition>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel popout xs6>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Surah</div>
          </template>
          <v-card>
            <v-card-text>
              <SurahSelect :list="surahList" @surah-selected="changeSelectedSurah"></SurahSelect>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-layout>

    <!-- <v-select
      @change="loadNewSurah()"
      class="arabicText medText"
      v-model="selectedSurah"
      :items="surahList"
      item-text="name"
      item-value="number"
      label="Surahs"
      persistent-hint
      return-object
      single-line
    ></v-select>-->
    <div v-if="isLoading">is loading</div>
    <div v-if="!isLoading">
      <Surah :inputSurah="selectedSurah" :translationText="translationText"></Surah>
    </div>
    <!-- </v-flex> -->
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import Surah from "../views/Surah";
import Edition from "../views/Edition";
import SurahSelect from "../views/SurahSelect";
import Helper from "../helper";
import staticData from "../staticData";
export default {
  data: () => ({
    //surahList needs another component/view
    isLoading: false,
    surahList: staticData.surahList,
    editionList: staticData.editionList,
    translationList: staticData.translations,
    translationEdition: { identifier: "en.sahih" },
    alteredSurah: true,
    alteredTranslation: true,
    fatiha: staticData.fatiha,
    languages: staticData.languages,
    selectedSurah: { number: 1 },
    translationText: {},
    fontOptions: [
      { name: "Amiri", style: "serif" },
      { name: "Lalezar", style: "cursive" },
      { name: "Mada", style: "sans-serif" },
      { name: "Katibeh", style: "cursive" },
      { name: "Lateef", style: "cursive" }
    ]
  }),
  components: {
    Surah,
    Edition,
    SurahSelect
  },
  mounted: function() {
    // console.log("ssssss", this.selectedSurah.number);
    this.repaint();
  },
  created: function() {
    console.log("filtering...");
    this.translationEdition = this.editionList.filter(function(x) {
      return x.identifier === "en.sahih";
    });
    // console.log("filtering... : ", temp);
    // console.log("staticData loaded:", staticData);
  },
  computed: {
    computedFunc() {
      // console.log("computating");
      //TODO check filter computed  output here
      return 0;
    }
  },
  methods: {
    filterEditions() {},
    translationReceived(e) {
      // console.log(Object.keys(e), e);
      //TODO Handle the edition / translation change
      this.translationEdition = e;
      // this.alteredTranslation = true;
      this.repaint();
      // console.log("translation selected : ", this.translationEdition);
    },
    changeSelectedSurah(s) {
      this.selectedSurah = s;
      // this.alteredSurah = true;
      this.repaint();
      // console.log("surah selected : ", this.selectedSurah);
    },
    filterByType() {},
    async repaint() {
      // console.log(
      // "repaint called :",
      // this.alteredSurah,
      // this.alteredTranslation
      // );
      this.isLoading = true;
      // console.log("phase 1");
      // if (this.alteredSurah) {
      await this.loadNewSurah();
      // this.alteredSurah = false;
      // }
      // console.log("phase 2");
      // if (this.alteredTranslation) {
      await this.loadNewTranslation();
      // this.alteredTranslation = false;
      // }

      // console.log("phase 3");

      // console.log("helper here...", Helper);
      this.isLoading = false;
    },
    loadNewSurah() {
      // console.log(this.$axios);
      // GET request for remote image
      this.$axios({
        method: "get",
        url: "http://api.alquran.cloud/v1/surah/" + this.selectedSurah.number,
        responseType: "json"
      }).then(response => {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        // console.log("surah:", response.data);
        this.selectedSurah = response.data.data;
        // console.log("Surah loaded : ", this.selectedSurah);
      });
    },
    loadNewTranslation() {
      return this.$axios({
        method: "get",
        url:
          "http://api.alquran.cloud/v1/surah/" +
          this.selectedSurah.number +
          "/" +
          this.translationEdition.identifier,
        // http://api.alquran.cloud/v1/edition?format=text&language=ur
        responseType: "json"
      }).then(response => {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        this.translationText = response.data.data;
        // console.log("translation loaded:", this.translationText);
      });
    }
  }
};
</script>

<style >
@import url("https://fonts.googleapis.com/css?family=Amiri|Katibeh|Lalezar|Lateef|Mada");
.arabicText {
  font-family: "Lateef", cursive;
  direction: rtl;
}
.translation {
  /* direction: ltr !important; */
}
.slate {
  /* direction: rtl; */
}

.infoPanel {
  /* font-family: 'Lateef', cursive; */
  /* direction: ltr; */
}

.info_name {
  /* direction: rtl; */
}

.bigText {
  font-size: 4rem;
}

.medText {
  font-size: 2rem;
}

.smallText {
  font-size: 1em;
}
</style>

