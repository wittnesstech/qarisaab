
<template>
  <v-container xs12>
    <v-flex>
      <v-select
        @change="loadNewSurah()"
        class="arabicText medText"
        v-model="selectedSurah"
        :hint="`${selectedSurah.englishName} - ${selectedSurah.englishNameTranslation}`"
        :items="surahList"
        item-text="name"
        item-value="number"
        label="Surahs"
        persistent-hint
        return-object
        single-line
      ></v-select>
    </v-flex>
    <div class="slate" v-for="(ayah,index) in selectedSurah.ayahs" :key="ayah.number">
      <div class="arabicText medText">
        <!-- <v-icon>chevron_right</v-icon>
        {{ayah.number}}
        <v-icon>chevron_left</v-icon>-->
        {{ayah.text}}
      </div>
      <div v-if="translationText!==null" class="translation">
        <br>
        {{translationText.ayahs[index].text}}
      </div>
      <!-- <br> -->
    </div>
    <!-- <router-view/> -->
    <div v-if="selectedSurah!==null" class="infoPanel">
      <span class="number">{{selectedSurah.number}}</span>
      <span class="name arabicText smallText">{{selectedSurah.name}}</span>
      <span class="englishName">{{selectedSurah.englishName}}</span>
      <span class="revelationType">{{selectedSurah.revelationType}}</span>
      <span class="numberOfAyahs">Ayahs : {{selectedSurah.numberOfAyahs}}</span>
    </div>
    <!-- <div class="infoPanel" v-for="(item, key, index) in surah" :key="index">
            <span v-if="key!='ayahs'&& typeof(item)!='object'" :class="'info_'+key">{{key}}:{{item}}</span>
    </div>-->
  </v-container>
</template>

<script>
// import Example from "../components/Example"
export default {
  data: () => ({
    //surahList needs another component/view
    surahList: null,
    selectedSurah: null,
    surah: null,
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
    // Example
  },
  created: function() {
    this.$axios({
      method: "get",
      url:
        "http://api.alquran.cloud/v1/surah/" + Math.floor(Math.random() * 114),
      responseType: "json"
    }).then(response => {
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      // console.log("surah:", response.data);
      this.selectedSurah = response.data.data;
    });
    // console.log("created");
    this.populateSurahList();
    // this.selectedSurah = this.surahList.data[0];
  },
  methods: {
    populateSurahList() {
      this.$axios({
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
    }
  }
};
</script>

<style scoped>
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

