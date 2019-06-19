<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <!-- <v-flex> -->
  <!-- <v-chip small> -->
  <!-- <v-icon>refresh</v-icon> -->
  <span
    class
    :class="noData?'bordered bordered-red':'bordered bordered-green'"
  >{{type}}:{{fieldVal}}</span>
  <!-- </v-chip> -->
  <!-- </v-flex> -->
</template>
<script>
export default {
  data() {
    return {
      noData: false
    };
  },
  props: ["fieldVal", "type"],
  computed: {},
  methods: {},
  created: function() {
    if (this.fieldVal === "No Data") {
      this.noData = true;
    }
  }
};
</script>
<style scoped>
.blank {
  color: grey;
}
</style>
