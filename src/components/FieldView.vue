<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <v-layout>
    <!-- <v-chip small> -->
    <!-- <v-icon>refresh</v-icon> -->
    <span>{{type}}:{{fieldVal}}</span>
    <!-- </v-chip> -->
  </v-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["fieldVal", "type"],
  computed: {},
  methods: {}
};
</script>
<style scoped>
</style>
