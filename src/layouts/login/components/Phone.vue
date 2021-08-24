<template>
  <div class="phone">
    <img src="@/assets/images/telegram-logo.svg" alt="telegram-logo" class="telegram-logo"/>
    <h2 class="heading">Telegram</h2>
    <p class="subheading">
      Please confirm your country code and enter your phone number.
    </p>
    <form action="">
      <el-select
        v-model="value"
        filterable
        placeholder="Country"
        class="select"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
       <el-input size="large" placeholder="Your phone number" v-model="input" class="form-control"></el-input>
    </form>
      <div class="checkbox">
      <input type="checkbox" name="" id="" />
      <p>Keep me signed in</p>
    </div>
    <button @click="$emit('changeLoginView', 2)" class="btn">Link to Qr code page</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [
        {
          value: "Option1",
          label: "Option1",
        },
        {
          value: "Option2",
          label: "Option2",
        },
        {
          value: "Option3",
          label: "Option3",
        },
        {
          value: "Option4",
          label: "Option4",
        },
        {
          value: "Option5",
          label: "Option5",
        },
      ],
      value: "",
      input: ''
    };
  },
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

  &:hover{
    border-color: #409eff;
  }

  &:focus{
    color: red;
  }
}

.el-input__suffix{
  top: 5px
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;

  input {
    width: 30px;
    height: 18px;
    margin-left: -150px;
    opacity: 0.6;
  }

  p {
    padding-left: 20px;
  }
}

.btn {
    // @include btn__login;
}
</style>
