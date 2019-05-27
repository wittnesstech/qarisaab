<template>
  <v-container v-if="inputSurah!==null" xs12>
    <div class="slate" v-for="(ayah,index) in inputSurah.ayahs" :key="ayah.number">
      <div class="arabicText medText midAlign">
        <!-- <v-icon>chevron_right</v-icon>
        {{ayah.number}}
        <v-icon>chevron_left</v-icon>-->
        {{ayah.text}}
      </div>
      <div v-if="translationText===null" class="translation">
        <!-- condition 1 -->
        <!-- TT:{{translationText}} -->
      </div>
      <div v-else-if="translationText===undefined" class="translation">
        <!-- condition 2 -->
        <!-- TT:{{translationText}} -->
      </div>
      <div v-else>
        {{translationText.ayahs[index].text}}
        <!-- <span class="translationIdentifier ">
          <v-chip>{{translationText.edition.englishName}}</v-chip>
        </span>-->
      </div>
    </div>
    <!-- <router-view/> -->
    <div class="infoPanel">
      <span class="number">{{inputSurah.number}}</span>
      <span class="name arabicText smallText">{{inputSurah.name}}</span>
      <span class="englishName">{{inputSurah.englishName}}</span>
      <span class="revelationType">{{inputSurah.revelationType}}</span>
      <span class="numberOfAyahs">Ayahs : {{inputSurah.numberOfAyahs}}</span>
    </div>
    <!-- <div class="infoPanel" v-for="(item, key, index) in surah" :key="index">
            <span v-if="key!='ayahs'&& typeof(item)!='object'" :class="'info_'+key">{{key}}:{{item}}</span>
    </div>-->
  </v-container>
</template>

<script>
// import Example from "../components/Example"
export default {
  props: ["inputSurah", "translationText"],
  data: () => ({
    //surahList needs another component/view
    // inputSurah: null // TODO Goes to @input
    // translationText: null,
    // fontOptions: [
    //   { name: "Amiri", style: "serif" },
    //   { name: "Lalezar", style: "cursive" },
    //   { name: "Mada", style: "sans-serif" },
    //   { name: "Katibeh", style: "cursive" },
    //   { name: "Lateef", style: "cursive" }
    // ]
  }),
  components: {
    // Example
  },
  created: function() {},
  methods: {}
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
</style>

