<template>
  <v-container xs12>
    {{computedFunc}}
    <!-- {{surahList}} -->
    <!-- <br> -->
    <!-- {{fatiha}} -->
    <!-- v-for="(item, i) in 5" :key="i" -->
    <div>
      Settings
      <flag iso="pk"/>
      <Edition :list="translationList" @edition-selected="translationReceived"></Edition>
      <SurahSelect :list="surahList" @surah-selected="changeSelectedSurah"></SurahSelect>
    </div>

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
    <div>
      <Surah :inputSurah="selectedSurah" :translationText="translationText"></Surah>
    </div>
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
    surahList: staticData.surahList,
    editionList: staticData.editionList,
    translationList: staticData.translations,
    translationEdition: { identifier: "en.sahih" },
    fatiha: staticData.fatiha,
    languages: staticData.languages,
    selectedSurah: {},
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
  created: function() {
    console.log("Helper loaded:", Helper);
    console.log("staticData loaded:", staticData);
    // console.log("surahList :", this.surahList);
    // console.log("editions list:", this.editionList);
    // console.log("created1");
    // await this.getFatiha();
    // this.selectedSurah = fatiha;
    // this.surahList = staticData.surahList;
    // this.editionList = staticData.editionList;
    // this.filterEditions();
    // this.fatiha = staticData.fatiha;
    // await this.getTranslation();
    // console.log("created");
    // console.log(" fatiha : ", this.fatiha);
    // console.log(" surahList : ", this.surahList);
    // console.log(" translation : ", this.translationText);
    // console.log(" selected : ", this.selectedSxurah);
    // this.selectedSurah = this.surahList.data[0];
  },
  computed: {
    computedFunc() {
      console.log("computating");
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
      console.log("translation selected");
    },
    changeSelectedSurah(s) {
      this.selectedSurah = s;
      this.loadNewSurah();
    },
    filterByType() {},
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
      });
      console.log("testing pt");
      this.$axios({
        method: "get",
        url:
          "http://api.alquran.cloud/v1/surah/" +
          this.selectedSurah.number +
          "/" +
          this.translationEdition.identifier,
        responseType: "json"
      }).then(response => {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        // console.log("translationData:", response.data);
        this.translationText = response.data.data;
      });
    },
    getTranslation() {
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
        console.log("translationData:", response.data);
        this.translationText = response.data.data;
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
  font-size: 2em;
}

.smallText {
  font-size: 1em;
}
</style>

