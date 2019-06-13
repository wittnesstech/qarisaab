<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <div class="bordered" @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <!-- {{filteredProfileData}} -->
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <v-layout
            class="table table-striped bordered"
            row
            align-space-between
            justify-space-between
            fill-height
          >
            <v-flex xs2 class="bordered bordered-green">
              <img src="/assets/Ranks/ranks.png" class="profilePic">
            </v-flex>
            <v-layout column justify-end class="bordered bordered-green">
              <v-flex xs12>
                <p>
                  <v-chip small color="green "># {{profileData['Svc No']}}</v-chip>
                  <v-icon>home</v-icon>
                  {{profileData.Rank}}
                  <span class="trade">({{profileData.Trade}})</span>
                  <strong>{{profileData.Name}}</strong>
                  of
                  {{profileData.Coy}}
                  Coy
                </p>
              </v-flex>
              <v-layout wrap class="bordered bordered-red">
                  Unknown Data:
                <v-flex
                  v-for="(val,keyName) in filteredProfileData"
                  :key="keyName"
                  class="bordered bordered-green"
                >
                  <FieldView class="bordered" :fieldVal="val" :type="keyName"/>
                </v-flex>
              </v-layout>
            </v-layout>
          </v-layout>
        </template>
        <v-flex xs12 class="bordered bordered-green">{{profileData}}</v-flex>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
// import XLSX from "xlsx";
// import { fileURLToPath } from "url";
import FieldView from "./FieldView";
export default {
  data() {
    return {
      // name: "xl",
      files: []
      // rankSheet: "../assets/Ranks/ranks.png"
    };
  },
  components: { FieldView },
  props: ["profileData"],
  computed: {
    filteredProfileData() {
      let pData = Object.assign({}, this.profileData);
      let filtered = [];
      for (let profile in pData) {
        if (
          profile === "Rank" ||
          profile === "Name" ||
          profile === "Coy" ||
          profile === "Ser" ||
          profile === "Trade" ||
          profile === "Svc No"
        ) {
          // let temp = { profile: pData[profile] };

          // filtered.push(temp);
          delete pData[profile];
        }
        // console.log(profile, pData[profile]);
      }
      return pData;
    }
  },
  methods: {
    // process(f) {
    //   console.log("processing", f.name);
    //   console.log("obj recd", f);
    // },
    _suppress(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    },
    _drop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      const files = evt.dataTransfer.files;
      if (files && files[0]) this._file(files[0]);
    },
    _change(evt) {
      const files = evt.target.files;
      // console.log("files changed . . .", files);
      //   files.map((x, index) => this._file(x));
      for (let i = 0; i < files.length; i++) {
        if (files && files[i]) this._file(files[i]);
      }
    }
    // _export(evt) {
    //   /* convert state to workbook */
    //   const ws = XLSX.utils.aoa_to_sheet(this.data);
    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    //   /* generate file and send to client */
    //   XLSX.writeFile(wb, "sheetjs.xlsx");
    // },
  }
};
</script>
<style scoped>
.profilePic {
  width: 125px;
  height: 140px;
}
.trade {
  border: 1.5px;
  border-style: dashed;
  border-color: lawngreen;
}
</style>
