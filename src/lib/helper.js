import axios from "axios";

export default {
  Helper: {
    testEx: () => {
      console.log("test func");
    },
    treasure: "island",
    async populateEditionList() {
      const response = await axios({
        method: "get",
        url: "https://api.alquran.cloud/v1/edition",
        responseType: "json"
      });
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      // console.log("surahList:", response.data);
      // this.editionList =
      return response.data.data;
    },
    async populateSurahList() {
      const response = await axios({
        method: "get",
        url: "https://api.alquran.cloud/v1/surah",
        responseType: "json"
      });
      // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
      // console.log("surahList:", response.data);
      // this.surahList =
      return response.data.data;
    }
  }
};
