
<template>
  <v-container xs12>
    <v-flex>
      <div>testing. . .</div>
    </v-flex>
    <xl class="bordered" @file-read="catchFile"/>
    <v-layout row v-for="file in files" :key="file.name">
      <dataTable :data="file"/>
    </v-layout>
  </v-container>
</template>

<script>
import xl from "./xl";
import dataTable from "./dataTable";
export default {
  data: () => ({ files: [] }),
  components: { xl, dataTable },
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
  border-width: 3px;
  border-style: inset;
}
.bordered-red {
  border-color: crimson;
}
.bordered-green {
  border-color: green;
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

