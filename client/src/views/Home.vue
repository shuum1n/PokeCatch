<template>
    <Navbar></Navbar>
    <div class="container pt-3">
        <div class="row align-items-start">
            <div class="col-1"></div>
            <div class="col-10">
                <Banner></Banner>
            </div>
            <div class="col-1"></div>
            <div class="col-1"></div>
            <div class="col-3 my-5" style="">
                <div class="text-center">
                    <div class="justify-content-center">
                        <img v-if="profile_picture" :src="profile_picture"
                            style="border-width: 10px; border-color: white; max-width: 200px;">
                        <br />
                        <p class="text-center" style="font-size: 20px;">{{ username }}</p>
                    </div>
                </div>
                <div class="px-4">
                    Level: {{ playerLevel }} ({{ playerCurrentXp }}/{{ xpToLevelUp }})
                    <ProgressBar class="my-2" :currentValue="playerCurrentXp" :targetValue="xpToLevelUp"></ProgressBar>
                    <div class="mb-3 my-3">
                        Pokedollars: {{ pokedollars }}
                    </div>
                </div>
            </div>
            <div class="col-7 scrollable-column" style="">
                <BackgroundComponent v-for="area in areaDatas" :dataUri="area.dataUri" :areaData="area.areaData">
                </BackgroundComponent>
            </div>
            <div class="col-1"></div>
        </div>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ProgressBar from '../components/ProgressBar.vue'
import BackgroundComponent from '../components/BackgroundComponent.vue'
import Banner from '../components/Banner.vue'
import { mapActions, mapState } from 'pinia';
import { rootStore } from '../stores/root';

export default {
    components: {
        Navbar,
        ProgressBar,
        BackgroundComponent,
        Banner
    },
    computed: {
        ...mapState(rootStore, ['username', 'profile_picture', 'pokedollars', 'playerLevel', 'playerCurrentXp', 'xpToLevelUp', 'areaDatas'])
    },
    methods: {
        ...mapActions(rootStore, ['getPlayerData', 'fetchAreaDatas'])
    },
    created()
    {
        this.getPlayerData();
        this.fetchAreaDatas();
    }
}
</script>

<style scoped>
body {
    overflow: hidden;
}

.scrollable-column {
    max-height: calc(100vh - 70px);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.scrollable-column::-webkit-scrollbar {
    width: 0;
}
</style>