<template>
  <v-container fluid>
    <div class="about">
      <v-card>
        <h2 class="headline mb-0">Mission Statement</h2>
        <!-- <v-img
          src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
          aspect-ratio="2.75"
        ></v-img>-->

        <v-card-title primary-title>
          <v-layout column justify-space-around>
          <p>Our mission is to teach quran through smart phones and computers. </p>
          <p>You will not need any kindof teacher once our platform is released in the next Ramzan.</p>
<p> Insha-Allah</p>
</v-layout>
          <!-- <div> {{ card_text }} </div> -->
        </v-card-title>

        <v-card-actions>
          <!-- <v-btn flat color="orange">Share</v-btn> -->
          <!-- <v-btn flat color="orange">Explore</v-btn> -->
          <v-layout row justify-space-around>
            <a href="https://www.facebook.com/WittnessTech/">Like Us on Facebook!</a>
            <!-- <v-icon></v-icon> -->
            <a href="https://github.com/wittnesstech/qarisaab">Github</a>
          </v-layout>
        </v-card-actions>
      </v-card>
    </div>
  </v-container>
</template>
<style scoped>
.about {
  text-align: center;
  margin-top: 10%;
}
</style>
