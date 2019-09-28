<script>
export default {

}
</script>


<template>
  <v-app>
    <div id="app">
      <transition name="layout-main" enter-active-class="animated fadeIn" leave-active-class="animated fa   deOut fast" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </div>
    <v-footer class="footer-container" dark height="auto" v-if="this.$route.path !== '/games/TowerPvP'">
      <v-card class="flex" flat tile>
        <!-- <v-card-title class="blue">
          <strong class="subheading">Get connected with us on social networks!</strong>

          <v-spacer></v-spacer>

          <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-title> -->

        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — <strong>AwesomeHistoryGames</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
@import '~animate.css/animate.min.css';

* {
  box-sizing: border-box;
  outline: none;
  font-family: 'Open Sans', sans-serif;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  min-height: 100%;
  width: 100%;
}
</style>
