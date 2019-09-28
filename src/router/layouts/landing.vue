<script>
export default {
    data() {
        return {
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        }
    },
    methods: {
        select(e) {
            e.target.classList.add('elevation-1')
        },
        deselect(e) {
            e.target.classList.remove('elevation-1')
        }
    }
}
</script>

<template>
    <v-container class="layout-container" fill-height fluid align-center>
        <div class="navbar-container">
            <div class="navbar-item my-3" @mouseover="select($event)" @mouseout="deselect($event)">Games</div>
            <div class="navbar-item middle my-3" @mouseover="select($event)" @mouseout="deselect($event)">About</div>
            <div class="navbar-item my-3" @mouseover="select($event)" @mouseout="deselect($event)">Contact</div>
        </div>
        <slot />
    </v-container>
</template>

<style lang="scss" scoped>
.layout-container {
    flex-direction: column;
    padding: 0;
    width: 100%;
}

.navbar-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center
}

.footer-container {
    width: 100%;
}

.navbar-item {
    padding: 10px;
    width: 100%;
    text-align: center;
    transition: .5s;
}

.middle {
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
}
</style>
