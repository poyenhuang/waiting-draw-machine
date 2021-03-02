<template>
  <div class="counter">
    <!-- name -->
    <div :class="{ 'is-offline': !isActived }">
      {{ counterData.name }}
    </div>
    <!-- processing -->
    <div v-if="counterData.status && counterData.processing">{{ counterData.processing }}</div>
    <div v-else-if="counterData.status" class="is-idle">idle</div>
    <div v-else class="is-offline">offline</div>
    <!-- processed -->
    <div :class="{ 'is-offline': !isActived }">{{ counterData.processed.join(', ') }}</div>
  </div>
</template>

<script>
export default {
  props: {
    counterData: {
      type: Object,
      default: () => ({
        name: '',
        status: 0,
        processing: 0,
        processed: [],
      }),
    },
  },
  computed: {
    isActived() {
      return this.counterData.status > 0; 
    },
  },
};
</script>

<style lang="scss" scoped>
.counter {
  display: flex;

  .is-idle {
    color: #aaa;
  }

  .is-offline {
    color: #ddd;
  }
}
</style>
