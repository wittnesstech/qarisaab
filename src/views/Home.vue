
<template>
  <v-container xs12 class="ma-0">
    <!-- <PersonBrowser/> -->
    <v-flex>
      <div>testing. . .</div>
    </v-flex>
    <xl class="bordered" @file-read="catchFile"/>
    <v-layout column v-for="file in files" :key="file.name">
      <v-layout column v-for="entry in file.data" :key="entry.Ser">
        <v-flex xs12>
          <!-- <Person :profileData="entry"/> -->
        </v-flex>
      </v-layout>
      <PersonBrowser :data="file.data"/>
    </v-layout>
  </v-container>
</template>

<script>
import xl from "./xl";
import dataTable from "./dataTable";
import Person from "../components/Person";
import PersonBrowser from "./PersonBrowser";
export default {
  data: () => ({ files: [] }),
  components: { xl, dataTable, PersonBrowser, Person },
  created: function() {},
  methods: {
    catchFile(f) {
      console.log("file:", f);
      this.files.push(f);
      // console.log("caught file", f);
    }
  }
};
</script>

<style >
.bordered {
  border-color: ivory;
  border-width: 2px;
  border-style: groove;
}
.bordered-red {
  border-color: crimson;
  border-style: ridge;
  border-width: 3px;
}
.bordered-green {
  border-color: green;
  /* border-style: dotted; */
}
.cell {
  height: 3%;
}
/* @import url("https://fonts.googleapis.com/css?family=Amiri|Katibeh|Lalezar|Lateef|Mada");
.arabicText {
  font-family: "Lateef", cursive;
  direction: rtl;
}
.translation {
  direction: ltr !important;
}
.slate {
  direction: rtl;
}

.infoPanel {
  font-family: 'Lateef', cursive;
  direction: ltr;
}

.info_name {
  direction: rtl;
}

.bigText {
  font-size: 4rem;
}

.medText {
  font-size: 2em;
}

.smallText {
  font-size: 1em;
} */
</style>

