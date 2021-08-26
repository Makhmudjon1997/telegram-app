<template>
  <div class="navbar">
    <p style="padding-right: 10px">icon</p>
    <el-input
      placeholder="Search"
      prefix-icon="el-icon-search"
      v-model="input2"
      class="form-control-search"
    >
    </el-input>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
    .navbar{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
      

        .el-input__inner{
            border: none;
            background: rgb(240, 238, 238);
            border-radius: 100px !important;
            width: 100%;
        }
    }
</style>
