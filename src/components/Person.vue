<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <div class="ma-0 pa-0" @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <!-- {{filteredProfileData}} -->
    <!-- {{infoGroups}} -->
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <v-layout class="table table-striped" row align-center justify-start>
            <!-- <v-layout class justify-space-between align-center> -->
            <img src="/assets/Ranks/ranks.png" class="profilePic">
            <v-flex class="bordered bordered-green ma-0 pa-0">
              <!-- <v-flex class="ma-0 pa-0"> -->
              <!-- <div id="personSummary" class="bordered"> -->
              <!-- <p> -->
              <v-chip small color="green "># {{profileData['Svc No']}}</v-chip>
              <v-icon>home</v-icon>
              {{profileData.Rank}}
              <span class="trade">({{profileData.Trade}})</span>
              <strong>{{profileData.Name}}</strong>
              <span>of</span>
              {{profileData.Coy}}
              Coy
              <!-- </p> -->
              <!-- </v-flex> -->
            </v-flex>
            <!-- </v-layout> -->
          </v-layout>
        </template>
        <v-flex xs12 class="bordered bordered-red ma-0 pa-0">
          <v-layout column justify-end class>
            <v-layout
              row
              class="ma-0 pa-0"
              align-center
              fill-height
              v-for="group in infoGroups"
              :key="group.title"
            >
              <!-- </div> -->
              <v-flex xs2 class="bordered bordered-green" align-center justify-end>
                <!-- <span class="ma-0 pa-0">Title:{{group.title}}</span> -->

                <v-checkbox
                  color="info"
                  :label="group.title"
                  class="ma-0 pa-0"
                  v-model="group.isVisible"
                ></v-checkbox>
              </v-flex>
              <!-- <v-layout row class="bordered" align-start> -->
              <!-- Val:{{group.isVisible}} -->
              <!-- <v-layout column> -->
              <v-flex xs10 class="ma-0 pa-0">
                <div id="backgroundInfo" class="ma-0 pa-0" :hidden="!group.isVisible">
                  <v-layout wrap class="ma-0 pa-0">
                    <v-flex class="ma-0 pa-0" v-for="field in group.members" :key="field">
                      <!-- <p
                      class="ma-0 pa-0"
                      >{{field}} : {{profileData[field]?profileData[field]:'No Data'}}</p>-->
                      <FieldView
                        class="ma-0 pa-0"
                        :fieldVal="profileData[field]?profileData[field]:'No Data'"
                        :type="field"
                      />
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
              <!-- </v-layout> -->
              <!-- </v-layout> -->
            </v-layout>
            <!-- <v-layout wrap align-center justify-space-around class="bordered bordered-red">
              Unknown Data:
              <div v-for="(val,keyName) in filteredProfileData" :key="keyName" class="bordered">
                <FieldView :fieldVal="val" :type="keyName"/>
              </div>
            </v-layout>-->
          </v-layout>
        </v-flex>
        <!-- <v-flex xs12 class="bordered bordered-green">{{profileData}}</v-flex> -->
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
      files: [],
      infoGroups: [
        {
          title: "Id",
          members: ["Rank", "Name", "Coy", "Trade", "Svc No", "Disposal"],
          isVisible: true
        },
        {
          title: "BackGround",
          members: [
            "Ser",
            "Father's Name",
            "CNIC",
            "DoB",
            "Sectt",
            "Caste",
            "Vill",
            "Cl"
          ],
          isVisible: true
        },
        {
          title: "Misc",
          members: [
            "Med Cat",
            "Red Ink Entries",
            "DoPresentRank",
            "DoPostingIn"
          ],
          isVisible: true
        },
        {
          title: "Qual",
          members: [
            "Civ",
            "AEC",
            "Eng",
            "MR",
            "PC1",
            "PC2",
            "PC3",
            "TC1",
            "TC2"
          ],
          isVisible: true
        },
        {
          title: "Courses",
          members: ["JNC", "BCC", "JLC", "ALC", "FOS"],
          isVisible: true
        },
        {
          title: "Security Cl",
          members: ["Found", "Auth", "DoAuth", "DoReInitiation"],
          isVisible: true
        }
      ]

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
  /* border-style: dashed; */
  /* border-color: lawngreen; */
}
</style>
