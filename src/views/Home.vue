<template>
  <v-container xs12>
    <v-select
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
    ></v-select>
    <div v-if="selectedSurah===null">
      Loading...
      <!-- fatiha:{{fatiha}} -->
      <Surah :inputSurah="fatiha"></Surah>
    </div>
    <div v-if="selectedSurah!==null">
      <Surah :inputSurah="selectedSurah" :translationText="translationText"></Surah>
    </div>
  </v-container>
</template>

<script>
import Surah from "../views/Surah";
export default {
  data: () => ({
    //surahList needs another component/view
    surahList: null,
    selectedSurah: null,
    surah: null,
    fatiha: null,
    translationText: null,
    fontOptions: [
      { name: "Amiri", style: "serif" },
      { name: "Lalezar", style: "cursive" },
      { name: "Mada", style: "sans-serif" },
      { name: "Katibeh", style: "cursive" },
      { name: "Lateef", style: "cursive" }
    ]
  }),
  components: {
    Surah
  },
  created: async function() {
    // console.log("created1");
    await this.getFatiha();
    await this.populateSurahList();
    this.selectedSurah = this.fatiha;
    await this.getTranslation();
    // console.log("created");
    // console.log(" fatiha : ", this.fatiha);
    // console.log(" surahList : ", this.surahList);
    // console.log(" translation : ", this.translationText);
    // console.log(" selected : ", this.selectedSurah);
    // this.selectedSurah = this.surahList.data[0];
  },
  methods: {
    getFatiha() {
      return this.$axios({
        method: "get",
        url: "http://api.alquran.cloud/v1/surah/" + 1,
        // Math.floor(Math.random() * 114),
        responseType: "json"
      }).then(response => {
        this.fatiha = response.data.data;
      });
      // console.log("surah:", response.data);
      // console.log("created");
    },
    populateSurahList() {
      return this.$axios({
        method: "get",
        url: "http://api.alquran.cloud/v1/surah",
        responseType: "json"
      }).then(response => {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        // console.log("surahList:", response.data);
        this.surahList = response.data.data;
      });
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
      });
      console.log("testing pt");
      this.$axios({
        method: "get",
        url:
          "http://api.alquran.cloud/v1/surah/" +
          this.selectedSurah.number +
          "/en.sahih",
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
          "/en.sahih",
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

