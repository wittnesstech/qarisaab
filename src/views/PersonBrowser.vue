<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <v-layout class>
    <v-flex xs12>
      <!-- {{data}}
      {{dataStash}}-->
      <!-- <div class="bordered pa-0 ma-0"> -->
      <!-- {{essentialCols}}xxx -->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
          <v-container grid-list-md class="pa-0 ma-0">
            <v-layout row>
              <v-text-field hint="lllllll" v-model="editedItem['Svc No']" label="Svc No"></v-text-field>
              <v-text-field hint="lllllll" v-model="editedItem.Rank" label="Rank"></v-text-field>
              <v-text-field hint="lllllll" v-model="editedItem.Trade" label="Trade"></v-text-field>
              <v-text-field hint="lllllll" v-model="editedItem.Name" label="Name"></v-text-field>
              <!-- <v-flex xs6 sm6 md3>
                </v-flex>
                <v-flex xs6 sm6 md3>
              </v-flex>-->
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
      <!-- {{generateHeaders}} -->
      <!-- </div> -->
      <!-- <div v-if="data!==undefined"> -->
      <!-- <v-layout>Person Browser here for : {{data.name}}</v-layout> -->
      <v-data-table
        :headers="essentialCols"
        :items="dataStash"
        item-key="Ser"
        class="elevation-1"
        :expand="expand"
      >
        <template v-slot:items="props">
          <tr @click="props.expanded = !props.expanded" :key="props.index">
            <td
              v-for="head in essentialCols"
              :key="head.value"
              :class="head.class"
            >{{ props.item[head.value]}}</td>
          </tr>
        </template>
        <template v-slot:expand="props">
          <Person class="bordered bordered-green" :profileData="props.item"/>
        </template>
        <template class="red" v-slot:no-data>
          <v-flex class="bordered bordered-red">No Data !</v-flex>
          <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
        </template>
      </v-data-table>
      <!-- </div> -->
    </v-flex>
  </v-layout>
</template>

<script>
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import Person from "../components/Person";
import PouchDB from "pouchdb";

export default {
  props: ["data"],
  components: { Person },
  data: () => ({
    expand: true,
    name: "dataTable",
    files: [],
    dialog: false,
    headers: [],
    dataStash: [],
    editedItem: {
      "Svc No": undefined,
      Name: undefined,
      Rank: undefined,
      Trade: undefined
    },
    defaultItem: {
      "Svc No": undefined,
      Name: undefined,
      Rank: undefined,
      Trade: undefined
    }
  }),
  created() {
    if (this.data !== undefined) {
      this.dataStash = this.data;
      console.log("data passed and assigned", this.dataStash);
    } else console.log("data ?", this.data);
    // Object.defineProperty(Vue.prototype, "$pouchDb", { value: PouchDB });
    // const resCache = new PouchDB("resCache");//response cache for http requests... ugh

    // let db = new PouchDB("test");
    // console.log(db);
    // db.post("hiiiii");
    // console.log(db.get(x => console.log("xxx", x)));
    this.initialize();
  },

  computed: {
    essentialCols() {
      return [
        //TODO image/photo in DB...?
        // {
        //   text: "Photo",
        //   // value: "Svc No",
        //   class: "text-xs-left"
        // },
        {
          text: "Service No",
          value: "Svc No",
          class: "text-xs-left"
        },
        {
          text: "Rank",
          value: "Rank",
          class: "text-xs-center"
        },
        {
          text: "Trade",
          value: "Trade",
          class: "text-xs-left"
        },
        {
          text: "Name",
          value: "Name",
          class: "text-xs-left"
        }
      ];
    },
    generateHeaders() {
      let essentials = this.essentialCols.map(c => c.value);
      console.log("essentials:", essentials);
      let headers = this.data.cols
        .filter(x => {
          console.log("filter : ", x, "->", essentials.indexOf(x) !== -1);
          return essentials.indexOf(x) === -1;
        })
        .map(x => {
          return {
            text: x,
            // align: "left",
            // sortable: false,
            value: x
          };
        });
      return [...this.essentialCols, ...headers];
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    initialize() {
      // this.dataStash = [];
    },

    editItem(item) {
      this.editedIndex = this.dataStash.indexOf(item);
      this.editedItem = Object.assign({}, item);
      // this.dialog = true;
    },

    deleteItem(item) {
      const index = this.dataStash.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.dataStash.splice(index, 1);
    },

    close() {
      // this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 700);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataStash[this.editedIndex], this.editedItem);
      } else {
        this.dataStash.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script><style scoped>
.profilePic {
  width: 125px;
  height: 140px;
}
</style>
