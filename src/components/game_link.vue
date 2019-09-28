<script>
export default {
    props: {
        item: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            str_overflow: false,
            trunc: '',
            selected: false,
            dialog: false
        }
    },
    methods: {
        highlight() {
            this.selected = ! this.selected
        },
        open_game() {
            this.$router.push({name: this.item.game_src})
        }
    },
    created() {
        this.trunc = (this.item.desc.length > 90) ? this.item.desc.substring(0, 91) + '...' : this.item.desc
        if(this.item.desc.length > 90) {
            this.str_overflow = true
        }
    }
}
</script>

<template>
    <div class="game-container elevation-2" :class="{ 'elevation-3': this.selected }" @mouseover="highlight()" @mouseout="highlight()" @click="open_game()">
        <div class="game-img">
            <v-img :src="item.img_src" aspect-ratio="3" @click="open_game()"></v-img>
        </div>
        <div class="game-desc">
            <p class="body-2">{{ item.title }}</p>
            <p class="caption">{{ this.trunc }}</p>

            <v-dialog v-if="this.str_overflow" v-model="this.dialog" width="500">
                <template v-slot:activator="{ on }">
                    <p class="caption overflow-link" v-on="on"> Read More</p>
                </template>

                <v-card>
                    <v-img :src="item.img_src" aspect-ratio="1.77"></v-img>
                    <v-card-title class="title lighten-2" primary-title>Privacy Policy</v-card-title>

                    <v-card-text>{{ item.desc }}</v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" flat @click="dialog = false; open_game()">Play Now!</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.game-container {
    width: 50%;
    border-radius: 10px;
}

.game-desc {
    text-align: center;
    margin-top: 10px;
    p {
        margin: 0;
        padding-left: 10px;
        padding-right: 10px;
    }
}

.overflow-link {
    color: rgb(0, 0, 255);
}

.overflow-link:hover {
    cursor: pointer;
}

.game-img {
    cursor: pointer;
}
</style>
