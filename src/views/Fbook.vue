
<template>
  <div>
    hhh
    <v-facebook-login
      @login="loginFunc"
      @connect="connectFunc"
      @sdk-init="sDKInit"
      app-id="280208842912184"
    ></v-facebook-login>
  </div>
</template>

<script>
// import Example from "../components/Example"
import VFacebookLogin from "vue-facebook-login-component";
export default {
  name: "Fbook",
  data: () => ({}),
  components: { VFacebookLogin },
  methods: {
    connectFunc() {
      console.log("connect initiated");
    },
    loginFunc() {
      console.log("connect initiated");
    },
    sDKInit(x) {
      console.log("i got this : ", x);
    }
  }
};
</script>
