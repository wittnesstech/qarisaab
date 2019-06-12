<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <div class="bordered" @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <!-- <div class="row">
      <div class="col-xs-12">
        <form class="form-inline">
          <div class="form-group">
            <label for="file">Spreadsheet</label>
            <input
              type="file"
              multiple
              class="form-control"
              id="file"
              :accept="SheetJSFT"
              @change="_change"
            >
          </div>
        </form>
      </div>
    </div>-->
    <!-- <div class="row"> -->
    <!-- <div class="col-xs-12"> -->
    <!-- :disabled="data.length ? false : true" -->
    <!-- <button class="btn btn-success" @click="_export">Export</button> -->
    <!-- </div> -->
    <!-- </div> -->
    <div class="row">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>
              <v-card>
                <!-- data:{{file.data}} -->
                <!-- cols:{{file.cols}} -->
                <v-card-text>
                  <v-layout column class="bordered bordered-red">
                    <v-layout
                      class="table table-striped bordered bordered-green"
                      row
                      align-space-between
                      justify-space-between
                      fill-height
                    >
                      <v-flex xs1 class="bordered bordered-green">xxx</v-flex>
                    </v-layout>
                    <v-layout
                      xs2
                      class="table table-striped bordered-green bordered"
                      row
                      align-space-between
                      justify-space-between
                      fill-height
                    >
                      <div class="bordered bordered-red">xxx</div>
                    </v-layout>
                  </v-layout>
                </v-card-text>
              </v-card>
            </div>
          </template>
          <v-card>
            <!-- data:{{file.data}} -->
            <!-- cols:{{file.cols}} -->
            <v-card-text>
              <v-layout column class="bordered bordered-red">
                <v-layout
                  class="table table-striped bordered bordered-green"
                  row
                  align-space-between
                  justify-space-between
                  fill-height
                >
                  <v-flex xs1 class="bordered bordered-green">xxx</v-flex>
                </v-layout>
                <v-layout
                  xs2
                  class="table table-striped bordered-green bordered"
                  row
                  align-space-between
                  justify-space-between
                  fill-height
                >
                  <div class="bordered bordered-red">xxx</div>
                </v-layout>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- <div>
        <v-btn class="info" @click.prevent="process(file)">Load</v-btn>
      </div>-->
    </div>
  </div>
</template>

<script>
// import XLSX from "xlsx";
// import { fileURLToPath } from "url";

export default {
  data() {
    return {
      // name: "xl",
      files: []
    };
  },
  props: ["profileData"],
  computed: {},
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