<template>
    <div class="container my-4">
        <a href="#" @click.prevent="handleClickCard">
            <div class="card background-section position-relative border-0">
                <div class="overlay"></div>
                <div class="card-body fixed-height background-image" :style="imageStyle">
                </div>
                <div class="text-bottom-left">
                    <p class="mb-0 text-sm text-muted">Level: {{ areaData.level_restriction }}</p>
                    <p class="mb-0 text-sm text-muted">Adventure Time: {{ areaData.base_time }}</p>
                    <h3>{{ areaData.name }}</h3>
                    <!-- <p class="mt-1 mb-0 text-lg text-muted text-dark">{{ routeName }}</p> -->
                </div>
            </div>
        </a>
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'pinia';
import { rootStore } from '../stores/root';
export default {
    name: 'AdventureCard',
    props: ['dataUri', 'areaData'],
    computed: {
        imageStyle()
        {
            return {
                backgroundImage: `url('${this.dataUri}')`
            };
        }
    },
    methods: {
        ...mapActions(rootStore, ['goOnAdventure']),
        handleClickCard()
        {
            this.goOnAdventure(this.areaData.id)
        }
    }
};
</script>
  
<style scoped>
.background-section {
    position: relative;
    border-radius: 20px;
    color: white;
    text-align: center;
    height: 300px;
}

.background-image {
    height: 100%;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 20px;
}

.text-bottom-left {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 20px;
    color: white;
    text-align: left;
}

.text-sm {
    font-size: 14px;
    /* Adjust as needed */
}

.text-lg {
    font-size: 24px;
    /* Adjust as needed */
}
</style>
  