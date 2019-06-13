<!-- brought to you by : https://github.com/SheetJS/js-xlsx/blob/master/demos/vue/pages/index.vue -->
<template>
  <div>
    <!-- {{essentialCols}} -->
    <!-- <br> -->
    <!-- {{generateHeaders}} -->
    <v-layout>Person Browser here for : {{data.name}}</v-layout>
    <!-- <v-toolbar flat color="white">
      <v-toolbar-title>My CRUD</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>-->
    <v-data-table
      :headers="essentialCols"
      :items="data.data"
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
        <Person :profileData="props.item"/>
      </template>
      <template v-slot:no-data>
        oye hoyee
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { fileURLToPath } from "url";
import Person from "../components/Person";

export default {
  props: ["data"],
  components: { Person },
  data: () => ({
    expand: true,
    name: "dataTable",
    files: [],
    dialog: false,
    headers: [],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0
    }
  }),

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

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.desserts = [];
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
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
