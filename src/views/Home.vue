
<template>
  <v-container xs12>
    <v-flex>
      <div>testing. . .</div>
    </v-flex>
    <xl class="bordered"/>
  </v-container>
</template>

<script>
import xl from "./xl";
export default {
  data: () => ({ files: {} }),
  components: { xl },
  created: function() {},
  methods: {
    uploaded(e) {
      console.log("upload func e:", e);
      console.log("upload files:", e.target.files);
      this.files = e.target.files;
      const reader = new FileReader();
      reader.onload = e => console.log(e.target.result);
      reader.readAsText(this.files[0]);
    }
  }
};
</script>

<style scoped>
.bordered {
  border-color: chartreuse;
  border-width: 3px;
  border-style: inset;
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

