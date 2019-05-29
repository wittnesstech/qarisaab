<template>
  <v-container xs12>
    <!-- edition :{ 
{
      "identifier": "ar. id="scroll-target"
      style="max-height: 200px"
      class="scroll-y"muyassar",
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
    <!-- {{allLanguages}}: -->
    <!-- {{sortedList}} -->
    <v-layout row align-center justify-space-between fill-height>
      <v-flex xs8>
        <vue-custom-scrollbar
          class="scroll-area-languages"
          :settings="settings"
          @ps-scroll-y="scrollHanle"
        >
          <v-layout column class="pr-3">
            <v-flex
              v-for="lang in sortedList"
              :key="lang"
              :class="{purple:allowedLangs.find(x=>x===lang)}"
              @click="langClicked(lang)"
            >
              <v-layout align-center row justify-space-between>
                <span>
                  <flag :iso="lang"/>
                </span>
                <span>{{languageName(lang)}}</span>
                <span>{{lang}}</span>
              </v-layout>
            </v-flex>
          </v-layout>
        </vue-custom-scrollbar>
        <!-- <v-select
          xs12
          class="ma-0 pa-0"
          v-model="allowedLangs"
          :items="allLanguages"
          label="Languages"
          multiple
        ></v-select>-->
      </v-flex>
      <v-flex>
        <v-layout align-space-between column>
          <v-checkbox class="pa-0 ma-0" color="green" v-model="showTafsir" label="Tafsirs"></v-checkbox>
          <v-checkbox
            class="pa-0 ma-0"
            color="purple"
            v-model="showTranslation"
            label="Translations"
          ></v-checkbox>
          <v-checkbox
            class="pa-0 ma-0"
            color="blue"
            v-model="showTransliteration"
            label="Transliterations"
          ></v-checkbox>
          <!-- <v-switch
        v-model="showVerseByVerse"
        :label="`Verse By Verse: ${showVerseByVerse.toString()}`"
        color="red"
          ></v-switch>-->
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- </div> -->
    <v-layout column>
      <vue-custom-scrollbar
        class="scroll-area-editions"
        :settings="settings"
        @ps-scroll-y="scrollHanle"
      >
        <div v-for="edition in filteredList" :key="edition.identifier">
          <v-card @click="$emit('selected',edition)">
            <!-- <v-card-title></v-card-title> -->
            <v-card-text>
              <v-layout align-center row justify-space-between>
                <span>
                  <flag :iso="edition.language"/>
                </span>
                <span>{{edition.name}}</span>
                <span>{{edition.englishName}}</span>
                <span
                  :class="{
                  purple:edition.type==='translation',
                  green:edition.type==='tafsir',
                  blue:edition.type==='transliteration'
                }"
                >{{edition.type}}</span>
              </v-layout>
            </v-card-text>
          </v-card>
        </div>
      </vue-custom-scrollbar>
    </v-layout>
  </v-container>
</template>

<script>
import staticData from "../staticData";
import languageName from "language-name";
import vueCustomScrollbar from "vue-custom-scrollbar";
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
    allowedLangs: ["en", "ur"],
    languageName: languageName,
    settings: {
      maxScrollbarLength: 60
    }
    // }
    //surahList needs another component/view
    // editionList: null,
    //selectedEdition: {}
  }),
  components: { vueCustomScrollbar },
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
    sortedList() {
      return this.allLanguages.sort((x, y) => {
        // console.log('trigger')
        return this.isSelected(y) - this.isSelected(x);
      });
    },
    // dictionery() {},

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
        return (
          typesToFilter.find(typeInFilter => typeInFilter === element.type) &&
          this.allowedLangs.find(
            langAllowed => langAllowed === element.language
          )
        );
        // filterList.forEach(y => {
        // return x[y.on] === y.val;
        // });
      });
      // return filtered;
    }
  },
  methods: {
    isSelected(lang) {
      if (this.allowedLangs.find(x => x === lang)) {
        // console.log("selected true");
        return true;
      } else {
        // console.log("selected false");
        return false;
      }
    },
    addLang(lang) {
      if (this.isSelected(lang)) {
      } else {
        this.allowedLangs.push(lang);
      }
    },
    removeLang(lang) {
      if (this.isSelected(lang)) {
        this.allowedLangs = this.allowedLangs.filter(x => x !== lang);
      }
    },
    langClicked(lang) {
      if (this.isSelected(lang)) {
        this.removeLang(lang);
        // console.log("found lang ", lang);
      } else {
        this.addLang(lang);
        // console.log("could NOT find lang ", lang);
      }
    },
    scrollHanle(evt) {
      // console.log(evt);
    }
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
<style >
.scroll-area-languages {
  position: relative;
  margin: 0;
  /* width: 400px; */
  height: 150px;
}
.scroll-area-editions {
  position: relative;
  margin: 0;
  /* width: 400px; */
  height: 250px;
}
</style>