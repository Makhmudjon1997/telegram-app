<template>
  <div class="phone">
    <p class="subheading">{{ phone }} / {{ phone_code_hash }} / {{ code }}</p>
    <el-input
      ref="codeInputRef"
      :size="24"
      placeholder="Code"
      v-model="code"
      v-mask="'#####'"
      class="form-control"
      masked="true"
    >
    </el-input>
  </div>
</template>

<script>
import { ref, watchEffect, computed } from "vue";
import { useStore } from "vuex";
import mtp from "@/utils/mtproto3";
export default {
  setup() {
    const store = useStore();

    const phone = computed(() => store.state.phone);
    const phone_code_hash = computed(() => store.state.phone_hash);
    const code = ref("");
    const codeInputRef = ref(null);

    watchEffect(() => {
      if (code.value.length === 5) {
        console.log("code.value", code.value);
        codeInputRef.value.blur();
        trySignIn();
      }
    });

    function signIn({ code, phone, phone_code_hash }) {
      return mtp.call('auth.signIn', {
        phone_code: code,
        phone_number: phone,
        phone_code_hash: phone_code_hash
      });
    }

    // function resend({  phone }) {
    //   return mtp.call("auth.resendCode", {
    //     phone_number: phone,
    //     "phone_code_hash": "cababf8f6f7e8afee0",
    //     settings: {
    //         _: "codeSettings"
    //       }
    //   });
    // }

    function trySignIn() {
      console.log("sign", code.value.trim());

      signIn({
        phone: phone.value.trim(),
        phone_code_hash: phone_code_hash.value,
        code: code.value.trim()
      })
        .then(result => {
          console.log("Result:", result);
        })
        .catch(err => {
          console.error("Error:", err);
        });

        //  resend({
        //   phone: phone.value.trim(),
        //   phone_code_hash: phone_code_hash,
        //   code: code.value.trim()
        // })
        // .then(result => {
        //   console.log("Result:", result);
        // })
        // .catch(err => {
        //   console.error("Error:", err);
        // });


      // mtp
      //   .call(
      //     "auth.signIn",
      //     {
      //       phone_number: phone.value.trim(),
      //       phone_code_hash: phone_code_hash,
      //       phone_code: code.value.trim()
      //     },
      //     { ignoreErrors: true }
      //   )
      //   .then(result => {
      //     console.log("Result:", result);
      //   })
      //   .catch(err => {
      //     console.error("Error:", err);
      //   });
    }

    return {
      code,
      codeInputRef,
      phone,
      phone_code_hash
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.phone {
  max-width: 24em;
  margin: 0 auto;
  padding: 110px 0;
  text-align: center;
  font-family: "Roboto", serif;
}

.telegram-logo {
  width: 160px;
}

.heading {
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 500;
}
.subheading {
  color: grey; //$color-text-secondary;
}

.select,
.form-control {
  width: 95%;
  border-radius: 20px !important;
  margin: 10px 0;
  color: red;
  font-family: "Roboto", -apple-system, apple color emoji, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
    sans-serif;
}

.el-input__inner {
  border-radius: 10px;
  padding: 25px;
}

.el-input__suffix {
  top: 5px;
}

.checkbox {
  display: flex;
  align-countrys: center;
  justify-content: center;
  margin-top: 1.5em;

  p {
    padding-left: 20px;
  }
}

.btn {
  @include btn__login;
}

.next {
  background-color: $primary-color;
  color: white;
  text-transform: uppercase;
  margin: 1.5em 0;
}

.next:hover {
  background-color: $primary-color;
  color: white;
}

.country-option {
  // width: 250px;
  display: grid;
  grid-template-columns: 15% auto 10%;
}

.country-name {
  font-weight: bold;
  font-family: "Roboto", -apple-system, apple color emoji, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
    sans-serif;
}

.country-code {
  font-family: "Roboto", -apple-system, apple color emoji, BlinkMacSystemFont,
    "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
    sans-serif;
}

.country-flag {
  align-self: center;
}
</style>
