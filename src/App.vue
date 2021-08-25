<template>
 <div id="main-app">
    <router-view/>
 </div>
</template>

<style lang="scss">
  *, *::before, *::after {
    padding: 0;
    box-sizing: border-box;
    margin: 0;
  }

  #main-app {
    max-width: 1400px;
    margin: 0 auto;
  }
</style>
