<script>
import GameLink from "@/components/game_link"

export default {
    components: {
        GameLink
    },
    data() {
        return {
            games: [
                {id: 1, title: 'History Stack', desc: 'Rerum consequatur dolorem aliquid aut voluptate nam necessitatibus. Autem voluptatum ducimus quos quis commodi quae labore. Laboriosam sed accusantium ducimus sapiente veniam dignissimos magnam ratione.', img_src: 'https://orig06.deviantart.net/4521/f/2013/050/0/c/level_background_for_a_mobile_game__by_bvigec-d5vi8b0.jpg', game_src: 'tower_pvp'}
            ]
        }
    }
}
</script>

<template>
    <v-layout class="games-layout-section" fluid fill-height column align-center>
        <game-link v-for="game in games" :item="game" :key="game.id" />
    </v-layout>
</template>

<style lang="scss" scoped>
.games-layout-section {
    border-top: 1px solid #c5c1c1;
    width: 100%;
    padding-left: 10%;
    padding-right: 10%;
    padding-top: 3%;
    margin-top: 5%;
}
</style>


