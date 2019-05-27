<template>
  <v-container class="ma-0 pa-0">
    <div v-if="isLoading">
      <!-- <v-progress-linear :indeterminate="true"></v-progress-linear> -->
    </div>
    <!-- {{getTranslationList}} -->
    <!-- <v-layout row> -->
    <!-- <v-flex> -->
    <!-- {{computedFunc}}
    {{alteredSurah}} = {{alteredTranslation}}-->
    <!-- {{surahList}} -->
    <!-- <br> -->
    <!-- {{fatiha}} -->
    <!-- v-for="(item, i) in 5" :key="i" -->
    <!-- <v-layout align-center justify-space-around row> -->
    <!-- <flag iso="pk"/> -->
    <!-- <div class="text-xs-center"> -->
    <v-layout align-center column>
      <SurahSelect
        :list="surahList"
        :selected="selectedSurah"
        @surah-selected="changeSelectedSurah"
      ></SurahSelect>
      <Edition
        :list="translationList"
        :selected="selectedTranslation"
        @edition-selected="translationReceived"
      ></Edition>
    </v-layout>
    <!-- <v-layout align-left> -->
    <v-layout align-center row>
      <v-btn icon dark @click="expand = !expand">
        <v-icon>settings</v-icon>
      </v-btn>
      <!-- <v-flex shrink> -->
      <v-expand-x-transition>
        <div v-show="expand">
          expanded info
          <v-select solo></v-select>
        </div>
      </v-expand-x-transition>
      <!-- </v-flex> -->
    </v-layout>
    <!-- </div> -->

    <!-- <v-expansion-panel popout xs6>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Translations</div>
          </template>
          <v-card>
            <v-card-text></v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel popout xs6>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>Surah</div>
          </template>
          <v-card>
            <v-card-text></v-card-text>
          </v-card>
        </v-expansion-panel-content>
    </v-expansion-panel>-->

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
    <div v-if="isLoading">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </div>
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
import Helper from "../lib/helper";
import staticData from "../staticData";
export default {
  data: () => ({
    //surahList needs another component/view
    isLoading: false,
    surahList: staticData.surahList,
    selectedSurah: staticData.fatiha,
    editionList: staticData.editionList,
    translationList: staticData.translations,
    selectedTranslation: staticData.defaultTranslation,
    alteredSurah: true,
    alteredTranslation: true,
    fatiha: staticData.fatiha,
    languages: staticData.languages,
    translationText: {},
    expand: false,
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
    // console.log("filtering...");
    // this.translationEdition = this.editionList.filter(function(x) {
    //   return x.identifier === "en.sahih";
    // });
    // console.log("filtering... : ", temp);
    // console.log("staticData loaded:", staticData);
    this.repaint();
  },
  computed: {
    computedFunc() {
      // console.log("computating");
      //TODO check filter computed  output here
      return 0;
    },
    getTranslationList() {
      return this.editionList.filter(function(x) {
        return x.type === "translation";
      });
    }
  },
  methods: {
    filterEditions() {},
    translationReceived(e) {
      // console.log(Object.keys(e), e);
      //TODO Handle the edition / translation change
      this.selectedTranslation = e;
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
    async loadNewSurah() {
      // console.log(this.$axios);
      // GET request for remote image
      const queryUrl =
        "http://api.alquran.cloud/v1/surah/" + this.selectedSurah.number;
      // console.log("query  ", queryUrl);
      const cachedData = await this.cacheLoader(queryUrl);
      // console.log("cached data :", cachedData);
      if (cachedData !== undefined && cachedData !== null && cachedData) {
        // console.log("is true");
        this.selectedSurah = cachedData.data;
      } else {
        // console.log("is false");
        const queryResponce = await this.queryLoader(queryUrl);
        this.selectedSurah = queryResponce;
        this.saveCache(queryUrl, queryResponce);
      }
    },
    async loadNewTranslation() {
      const queryUrl =
        "http://api.alquran.cloud/v1/surah/" +
        this.selectedSurah.number +
        "/" +
        this.selectedTranslation.identifier;
      // console.log("query  ", queryUrl);
      const cachedData = await this.cacheLoader(queryUrl);
      // console.log("cached data :", cachedData);
      if (cachedData !== undefined && cachedData !== null && cachedData) {
        // console.log("is true");
        this.translationText = cachedData.data;
      } else {
        // console.log("is false");
        const queryResponce = await this.queryLoader(queryUrl);
        this.translationText = queryResponce;
        this.saveCache(queryUrl, queryResponce);
      }
    },
    async cacheLoader(x) {
      const cached = await this.$resCache.get(x).catch(err => {
        // console.log("cache data error :", err);
      });
      return cached === undefined ? false : cached;
    },
    async queryLoader(x) {
      const response = await this.$axios({
        method: "get",
        url: x,
        // http://api.alquran.cloud/v1/edition?format=text&language=ur
        responseType: "json"
      }).catch(err => {
        // console.log("query loading error :", err);
      });
      const data = await response.data.data;
      // console.log("query loader response:", data);
      return response === undefined ? false : data;
    },
    saveCache(q, r) {
      this.$resCache.put({
        _id: q,
        data: r
      });
      // console.log("putted", q, r);
    }
  }
};
</script>

<style >
@import url("https://fonts.googleapis.com/css?family=Amiri|Katibeh|Lalezar|Lateef|Mada");
.arabicText {
  font-family: "Lateef", cursive !important;
  direction: rtl;
}
.translation {
  /* direction: ltr !important; */
}
.slate {
  /* direction: rtl; */
}
.midAlign {
  text-align: center;
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

