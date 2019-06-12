<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <div class="bordered" @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <div class="row">
      <div class="col-xs-12">
        <form class="form-inline">
          <div class="form-group">
            <!-- <label for="file">Spreadsheet</label> -->
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
    </div>
    <!-- <div class="row"> -->
    <!-- <div class="col-xs-12"> -->
    <!-- :disabled="data.length ? false : true" -->
    <!-- <button class="btn btn-success" @click="_export">Export</button> -->
    <!-- </div> -->
    <!-- </div> -->
    <div class="row" v-for="(file,index) in files" :key="file.name">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>{{file.name}}</div>
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
                  <v-flex
                    xs1
                    class="bordered bordered-green"
                    v-for="col in file.cols"
                    :key="col.name"
                  >{{col}}</v-flex>
                </v-layout>
                <v-layout
                  xs2
                  class="table table-striped bordered-green bordered"
                  row
                  align-space-between
                  justify-space-between
                  fill-height
                  v-for="(rowVector, key) in file.data"
                  :key="key"
                >
                  <div
                    class="bordered bordered-red"
                    v-for="(value, propertyName) in rowVector"
                    :key="propertyName"
                  >{{value}}</div>
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
import XLSX from "xlsx";
import { fileURLToPath } from "url";
const getCols = data => {
  let cols = [];
  return data.reduce((col, thisRow) => {
    // console.log("type of col", typeof col);
    // console.log("val of col", col);
    let rowKeys = Object.keys(thisRow);
    // console.log("rowkeys", rowKeys);
    let finalKeys = [];
    for (let key of rowKeys) {
      // console.log("key:", key);
      // console.log("r[key]:", thisRow[key]);
      // console.log("index result", col.indexOf(key));
      if (col.indexOf(key) === -1) {
        // ? typeof thisRow === Object
        finalKeys.push(key);
        // console.log("inside  object if");
      }
      // console.log("outside object if");
    }
    col.push(...finalKeys);
    return col;
  }, cols);
};
const make_cols = refstr =>
  Array(XLSX.utils.decode_range(refstr).e.c + 1)
    .fill(0)
    .map((x, i) => ({ name: XLSX.utils.encode_col(x), key: i }));
const _SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
  .map(function(x) {
    return "." + x;
  })
  .join(",");
export default {
  data() {
    return {
      name: "xl",
      files: [],
      SheetJSFT: _SheetJSFT
    };
  },
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
    },
    // _export(evt) {
    //   /* convert state to workbook */
    //   const ws = XLSX.utils.aoa_to_sheet(this.data);
    //   const wb = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    //   /* generate file and send to client */
    //   XLSX.writeFile(wb, "sheetjs.xlsx");
    // },
    _file(file) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      reader.onload = e => {
        let temp = {};
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 0 });
        /* Update state */
        // this.data = data;
        temp.data = data;
        // this.cols = make_cols(ws["!ref"]);
        temp.cols = getCols(data);
        // console.log("gen cols", temp.cols);
        temp.name = file.name;
        this.files.push(temp);
        this.$emit("file-read", temp);
      };
      reader.readAsBinaryString(file);
    }
  }
};
</script>