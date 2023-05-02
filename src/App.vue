<template>
    <v-app id="app">
      <v-container fluid class="ma-0 pa-0 d-flex flex-row">
        <div style="width: 100%">
          <v-container
            fluid
            class="ma-0 pa-0 d-flex flex-row"
            style="height: 100%; width: 100%"
          >
            <Navbar v-if="!$route.meta.hideNavbar" style="min-height: 100vh"/>
            <div
              v-if="!$route.meta.hideNavbar"
              style="width: 100%"
              class="mx-auto"
            >
              <router-view
                fluid
                style="min-height: 89vh"
                :key='$route.fullPath'
              />
              <Footer v-if="!$route.meta.hideFooter"/>
            </div>
  
            <div v-else style="width: 100%" class="mx-auto">
              <router-view :key='$route.fullPath' />
              <Footer v-if="!$route.meta.hideFooter"/>  
            </div>
  
            
          </v-container>
        </div>
      </v-container>
    </v-app>
  </template>
  
  <script>
    import vuetify from "@/plugins/vuetify";
    import Footer from "./components/Footer";
    import Navbar from "./components/Navbar"
  
    export default {
      name: "app",
      vuetify,
  
      components: {
      Footer,
      Navbar
  },
  
      data() {
        return {
        };
      },
  
      computed: {},
  
  
  
      methods: {
        route(route) {
          this.$router.push({ name: route }).catch((error) => {
            console.log(error);
          });
        },
      },
    };
  </script>
  
  <style>
  #app {
    background: url("./assets/bg5.jpg") no-repeat fixed center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  </style>
  