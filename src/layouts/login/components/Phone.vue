<template>
  <div class="phone">
    <img
      src="@/assets/images/telegram-logo.svg"
      alt="telegram-logo"
      class="telegram-logo"
    />
    <h2 class="heading">Telegram</h2>
    <p class="subheading">
      Please confirm your country code and enter your phone number.
    </p>
    <form action="">
      <el-select
        v-model="country"
        filterable
        placeholder="Country"
        class="select"
        :loading="gettingCountriesState"
        @change="countrySelected"
      >
        <el-option
          v-for="(country_, index) in countries"
          :key="index"
          :label="country_.default_name"
          :value="index"
        >
          <div class="country-option">
            <!-- <span :data-country-id="country_.iso2"></span> -->
            <span class="country-flag">
              {{ getCountryEmoji([country_.iso2]) }}
            </span>
            <span class="country-name">{{ country_.default_name }} </span>
            <span class="country-code">
              +{{ country_.country_codes[0].country_code }}</span
            >
          </div>
        </el-option>
      </el-select>
      <el-input
        size="large"
        placeholder="Your phone number"
        v-model="phone"
        class="form-control"
        v-mask="country_code_mask"
        masked="true"
      >
        <template v-if="!!country || country === 0" #prepend>{{
          country_code
        }}</template>
      </el-input>
    </form>
    <el-checkbox class="checkbox" v-model="keepMeSignedIn"
      >Keep me signed in</el-checkbox
    >
    <button @click="sendVerifyPhoneCode()" v-show="showNext" class="btn next">
      Next <i :class="nextLoading ? 'el-icon-loading' : ''"></i>
    </button>
    <button @click="$emit('changeLoginView', 2)" class="btn">
      Link to Qr code page
    </button>
  </div>
</template>


<script>
import { onMounted, ref, computed } from "vue";
import { useStore } from 'vuex'
import countriesEmoji from "@/utils/countries";
import mtp from "@/utils/mtproto3";
export default {
  setup(_, {emit}) {
    const countries = ref([]);
    const nextLoading = ref(false);
    const value = ref("");
    const current_country = ref(null);
    const country = ref(null);
    const phone = ref("");
    const keepMeSignedIn = ref(false);
    const gettingCountriesState = ref(false);

    const store = useStore()

    function sendVerifyPhoneCode() {
      nextLoading.value = true;
      mtp
        .call("auth.sendCode", {
          phone_number: country_code.value.replace(' ', '') + '' + phone.value.replace(' ', ''),
          settings: {
            _: "codeSettings"
          }
        })
        .then(result => {
          nextLoading.value = false;
          let splittedPhone = phone.value.split(' ')
          let lastPart = []
          for(let i = 1; i < splittedPhone.length; i++) {
            lastPart.push(splittedPhone[i])
          }
          let phone_num = splittedPhone[0] + ' ' + lastPart.join('')
          store.commit('SET_PHONE', country_code.value + ' ' + phone_num)
          store.commit('SET_PHONE_HASH', result.phone_code_hash)
          emit('changeLoginView', 3)
          console.log("verify result", result);

        })
        .catch(error => {
          nextLoading.value = false;
          console.error(error);
        });
    }

    const country_code = computed(() => {
      if (current_country.value) {
        return "+" + current_country.value.country_codes[0].country_code;
      } else return "";
    });

    const country_code_mask = computed(() => {
      if (current_country.value) {
        // console.log('country', current_country.value.country_codes[0].patterns[0])
        return current_country.value.country_codes[0].patterns[0];
      } else return "";
    });

    const showNext = computed(() => {
      // show if current phone number is the same as mask pattern of country_code
      if (
        phone.value.length === country_code_mask.value.length &&
        country_code_mask.value.length !== 0
      ) {
        return true;
      } else {
        return false;
      }
    });

    function getCountryEmoji(c) {
      if (countriesEmoji[c[0]]) return countriesEmoji[c[0]].emoji;
      return "";
    }

    function getCountriesList() {
      gettingCountriesState.value = true;
      mtp
        .call("help.getCountriesList")
        .then(result => {
          countries.value = result.countries;
          gettingCountriesState.value = false;
          // console.log('countries:', result.countries)
        })
        .catch(err => {
          console.log("Error", err);
          gettingCountriesState.value = false;
        });
    }

    function countrySelected(index) {
      phone.value = "";
      current_country.value = countries.value[index];
    }

    onMounted(() => {
      getCountriesList();
    });

    return {
      countries,
      country,
      phone,
      keepMeSignedIn,
      countrySelected,
      gettingCountriesState,
      getCountryEmoji,
      current_country,
      country_code,
      country_code_mask,
      value,
      showNext,
      sendVerifyPhoneCode,
      nextLoading
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
