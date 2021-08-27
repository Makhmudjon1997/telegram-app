<template>
 <div id="main-app">
    <router-view/>
 </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400&display=swap");

  *, *::before, *::after {
    padding: 0;
    box-sizing: border-box;
    margin: 0;
  }

  #main-app {
    max-width: 1400px;
    margin: 0 auto;
    font-family: "Open Sans", sans-serif;
  }
</style>
