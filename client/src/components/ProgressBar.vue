<template>
    <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
    </div>
</template>
  
<script>
export default {
    props: {
        currentValue: {
            type: Number,
            required: true,
        },
        targetValue: {
            type: Number,
            required: true,
        },
    },
    computed: {
        progressPercentage()
        {
            return (this.currentValue / this.targetValue) * 100;
        },
    },
};
</script>
  
  
<style>
.progress-bar {
    width: 90%;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 20px;
    overflow: hidden;
}

.progress {
    height: 100%;
    background-color: #428bca;
    border-radius: inherit;
}
</style>
  