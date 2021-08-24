<template>
  <div class="phone">
    <img src="@/assets/images/telegram-logo.svg" alt="telegram-logo" class="telegram-logo"/>
    <h2 class="heading">Telegram</h2>
    <p class="subheading">
      Please confirm your country code and enter your phone number.
      <!-- {{countries}} -->
      {{country}}
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
              <p>{{getCountryEmoji([country_.iso2])}}</p>
            </span>
            <span class="country-name">{{country_.default_name}} </span>
            <span class="country-code"> +{{country_.country_codes[0].country_code}}</span>
          </div>
        </el-option>
     </el-select>
       <el-input size="large" placeholder="Your phone number" v-model="phone" class="form-control"></el-input>
    </form>
      <el-checkbox class="checkbox" v-model="keepMeSignedIn">Keep me signed in</el-checkbox>
    <button @click="$emit('changeLoginView', 2)" class="btn">Link to Qr code page</button>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue'
import countriesEmoji from '@/utils/countries'
import mtp from '@/utils/mtproto'
export default {
  setup () {
    const countries = ref([])
    const country = ref(null)
    const phone = ref('')
    const keepMeSignedIn = ref(false)
    const gettingCountriesState = ref(false)

    function getCountryEmoji(c) {
      if(countriesEmoji[c[0]]) return countriesEmoji[c[0]].emoji
      return ''
    }

    function getCountriesList() {
        gettingCountriesState.value = true
        mtp.call('help.getCountriesList').then(result => {
            countries.value = result.countries
            gettingCountriesState.value = false
            // console.log('countries:', result.countries)
        }).catch(err => {
          console.log('Error', err)
          gettingCountriesState.value = false
        })
    }

    function countrySelected(index) {
      console.log('countrySelected:', countries.value[index])
    }
    
    onMounted(() => {
      getCountriesList()
    })

    return {
      countries,
      country,
      phone,
      keepMeSignedIn,
      countrySelected,
      gettingCountriesState,
      getCountryEmoji
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");


.phone {
  max-width: 24em;
  margin: 0 auto;
  padding: 110px 0;
  text-align: center;
  font-family: "Roboto", serif;
}

.telegram-logo{
  width: 160px;
}

.heading {
  font-size: 32px;
  margin-bottom: 20px;
  font-weight: 500;
}
.subheading {
  color: grey //$color-text-secondary;
}

.select, .form-control {
  width: 95%;
  border-radius: 20px !important;
  margin: 10px 0;
  color: red;
}


.el-input__inner{
  border-radius: 10px;
  padding: 25px;

  // &:hover{
  //   border-color: #409eff;
  // }
}

.el-input__suffix{
  top: 5px
}

.checkbox {
  display: flex;
  align-countrys: center;
  justify-content: center;
  padding-bottom: 30px;

  p {
    padding-left: 20px;
  }
}

.btn {
    @include btn__login;
}

.country-option {
  // width: 250px;
  display: grid;
  grid-template-columns: 15% auto 15%;
}

.country-flag {
  align-self: center;
}
</style>
