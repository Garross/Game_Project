<script>
// @ is an alias to /src
import GamesView from "@/components/games_view"
import layout from "@/router/layouts/landing"

export default {
  name: 'home',
  components: {
    'games-view': GamesView,
    'main-layout': layout
  }
}
</script>

<template>
  <main-layout>
    <v-container class="view-container" fill-height fluid align-center>
      <div class="header-container section">
        <div class="header-logo">
          <p class="logo-text">AwesomeHistoryGames</p>
          <p class="logo-slogan">Awesome Slogan Here...</p>
        </div>
        <div class="header-navbar">
          <v-btn color="info">Create An Account</v-btn>
        </div>
      </div>
      <games-view />
    </v-container>
  </main-layout>
</template>

<style lang="scss" scoped>
.view-container {
  // border: 1px solid;  
  flex-direction: column;
  padding: 0;
  padding-left: 5%;
  padding-right: 5%;
}

.section {
  // border: 1px solid;
  width: 100%;
}

.header-logo {
  // border: 1px solid;
  // height: 75%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo-text {
  font-size: 50px;
}

.header-navbar {
  // border: 1px solid;
  // height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2%;
}

.games-view-container {
  border: 1px solid;
  padding-left: 20%;
  padding-right: 20%;

}
</style>


