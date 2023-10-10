<template>
    <div class="container my-4">
        <a href="#" @click.prevent="claimAdventure">
            <div class="card background-section position-relative border-0">
                <div class="overlay"></div>
                <div class="card-body fixed-height background-image" :style="imageStyle">
                </div>
                <div class="text-bottom-left">
                    <div v-if="adventureData.code !== 'NoAdventure'">
                        <p class="mb-0 text-sm" v-if="adventureData.timer === 0">Adventure Complete!</p>
                        <vue-countdown v-else :time="adventureData.timer * 1000" v-slot="{ days, hours, minutes, seconds }">
                            <p class="mb-0 text-sm" v-if="hours === 0">Time Remaining：{{ minutes }}:{{ seconds }}</p>
                            <p class="mb-0 text-sm" v-else-if="hours > 0">Time Remaining： {{ hours }}:{{ minutes }}:{{ seconds }}</p>
                        </vue-countdown>
                        <h3>{{ adventureData.location }}</h3>
                    </div>
                    <div v-else>
                        <h3>Not in adventure...</h3>
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'pinia';
import { rootStore } from '../stores/root';
export default {
    name: 'Banner',
    methods: {
        ...mapActions(rootStore, ['claimAdventure', 'fetchAdventureData'])
    },
    computed: {
        ...mapState(rootStore, ['adventureData']),
        imageStyle()
        {
            if (this.adventureData.code !== 'NoAdventure')
            {
                return {
                    backgroundImage: `url('${this.adventureData.dataUri}')`
                };
            }
            else
            {
                return {
                    backgroundImage: `url('')`
                }
            }
        },
    },
    created()
    {
        this.fetchAdventureData();
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
    /* Adjust opacity as needed */
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
  