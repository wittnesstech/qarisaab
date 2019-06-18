<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <v-flex xs3>
    <!-- <v-chip small> -->
    <!-- <v-icon>refresh</v-icon> -->
    <span>
      <v-chip small :draggable="fieldVal" @dragenter="dragger">{{type}}</v-chip>
      {{fieldVal}}
    </span>
    <!-- </v-chip> -->
  </v-flex>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["fieldVal", "type"],
  computed: {},
  methods: {
    dragger(item) {
      console.log("dragger..", item);
    }
  }
};
</script>
<style scoped>
</style>
