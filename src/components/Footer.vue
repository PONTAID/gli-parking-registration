<template>
    <v-footer
      class="d-flex align-center justify-center"
      style="background-color: transparent !important"
    >
      <div flat tile width="100%" class="text-center white--text">
        <v-divider class="mx-auto red" width="96%"></v-divider>
        <v-card-text class="mb-0 pb-0 white--text" style="letter-spacing: 1.2px">
          Copyright {{ new Date().getFullYear() }} - PT. Global Loyalty Indonesia
        </v-card-text>
        <v-card-text
          class="ma-0 pa-0 white--text"
          style="letter-spacing: 1.2px; font-size: 12px"
        >
          Version 0.1.0
        </v-card-text>
      </div>
    </v-footer>
  </template>
  
  <script>
  /* eslint-disable */
  export default {
    name: "Footer",
    components: {},
  };
  </script>
  
  <style scoped>
  
  </style>
  
  
  