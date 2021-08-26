<template>
  <div class="textarea-box">
    <el-input
      type="textarea"
      autosize
      placeholder="Message"
      v-model="textarea1"
      prefix-icon="el-icon-search"
      suffix-icon="el-icon-search"
    >
    </el-input>
    <button class="btn">press</button>
  </div>
</template>

<script>

import {ref} from 'vue';

export default {
  setup() {
    const textarea1 = ref('');

    return {
        textarea1
    };
  },
};
</script>

<style lang="scss">
.textarea-box{
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-textarea__inner{
    width: 50%;
    margin: 0 auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    resize: none;
}
.btn{
    background: white;
    border-radius: 50%;
    color: black;
    border: none;
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
