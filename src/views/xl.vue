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
            data:{{file.data}}
            cols:{{file.cols}}
            <v-card-text>
              <div class="table-responsive">
                <table class="table table-striped">
                  <!-- <thead>
                    <tr>
                      <th v-for="c in file.cols" :key="c.key">{{c.name}}</th>
                    </tr>
                  </thead>-->
                  <tbody>
                    <tr v-for="(rowVector, key) in file.data" :key="key">
                      <!-- <td v-for="c in file.cols" :key="c.key">{{ r[c.key] }}</td> -->
                      <td v-for="(val,k) in rowVector" :key="k">{{val}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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

const make_cols = refstr =>
  Array(XLSX.utils.decode_range(refstr).e.c + 1)
    .fill(0)
    .map((x, i) => ({ name: XLSX.utils.encode_col(i), key: i }));
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
      files: [
        {
          name: "demo",
          data: ["SheetJS".split(""), "1234567".split("")],
          cols: [
            { name: "A", key: 0 },
            { name: "B", key: 1 },
            { name: "C", key: 2 },
            { name: "D", key: 3 },
            { name: "E", key: 4 },
            { name: "F", key: 5 },
            { name: "G", key: 6 }
          ]
        }
      ],
      SheetJSFT: _SheetJSFT
    };
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
      console.log("files changed . . .", files);
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
        temp.cols = make_cols(ws["!ref"]);
        temp.name = file.name;
        this.files.push(temp);
      };
      reader.readAsBinaryString(file);
    }
  }
};
</script>