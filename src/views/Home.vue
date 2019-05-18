<template>
  <v-container xs12>
    <!-- {{surahList}} -->
    <!-- <br> -->
    <!-- {{fatiha}} -->
    <div>
      <div class="text-xs-center mb-3">{{ panel }}</div>
      <v-expansion-panel v-model="panel" expand>
        <v-expansion-panel-content>
          <!-- v-for="(item, i) in 5" :key="i" -->
          <template v-slot:header>
            <div>Settings</div>
          </template>
          <v-card>
            <v-card-text>
              <flag iso="pk"/>
              <Edition :list @edition-selected="eventReceived"></Edition>
              <SurahSelect :list="surahList" @surah-selected="changeSelectedSurah"></SurahSelect>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
    surahList: [],
    selectedSurah: {},
    selectedEdition: {},
    editionData: {
      editionList: [],
      editionTypes: [
        "tafsir",
        "translation",
        "quran",
        "transliteration",
        "versebyverse"
      ],
      editionListsFiltered: {
        tafsirs: [],
        translations: [],
        qurans: [],
        transliterations: [],
        versebyverses: []
      }
    },
    surah: {},
    fatiha: {},
    translationText: {},
    filterTranslation: "translation",
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
    // console.log("created1");
    // await this.getFatiha();
    // this.selectedSurah = fatiha;
    this.surahList = staticData.surahList;
    this.editionList = staticData.editionList;
    this.filterEditions();
    console.log("editions filtered:", this.editionData);
    this.fatiha = staticData.fatiha;
    // this.selectedEdition = this.editionList[3];
    // await this.getTranslation();
    // console.log("created");
    // console.log(" fatiha : ", this.fatiha);
    // console.log(" surahList : ", this.surahList);
    // console.log(" translation : ", this.translationText);
    // console.log(" selected : ", this.selectedSxurah);
    // this.selectedSurah = this.surahList.data[0];
  },
  computed: {},
  methods: {
    filterEditions() {
      console.log("list to filter:", this.editionList);
      this.editionData.editionListsFiltered.tafsirs = this.editionList.filter(
        x => {
          return x.type === "tafsir";
        }
      );
      this.editionData.editionListsFiltered.translations = this.editionList.filter(
        x => {
          return x.type === "translation";
        }
      );
      this.editionData.editionListsFiltered.qurans = this.editionList.filter(
        x => {
          return x.type === "quran";
        }
      );
      this.editionData.editionListsFiltered.versebyverses = this.editionList.filter(
        x => {
          return x.type === "versebyverse";
        }
      );
      this.editionData.editionListsFiltered.transliterations = this.editionList.filter(
        x => {
          return x.type === "transliteration";
        }
      );
    },
    eventReceived(e) {
      console.log(Object.keys(e), e);
    },
    changeSelectedSurah(s) {
      this.selectedSurah = s;
      this.loadNewSurah();
    },
    filterByType() {},
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

