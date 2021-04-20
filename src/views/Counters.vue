<template>
  <div>
    <div class="counter-container">
      <div class="counter-table">
        <div class="counter-table-header">
          <div>counter111</div>
          <div>processing222</div>
          <div>processed333</div>
        </div>
        <Counter
          v-for="(counter, index) in counters"
          :key="index"
          :counterData="counter"
          class="counter-table-item"
        />
      </div>
      <div class="toolbar">
        <div>Waitings: {{ waitingList.length }}</div>
        <div class="btn-group">
          <div>Counters +/-</div>
          <div>Counters +/- 444</div>
          <div @click="reduceCounter" :class="['minus-btn', { 'is-enable': isCounterReduceable }]">-</div>
          <div @click="addCounter" :class="['plus-btn', { 'is-enable': isCounterAddable }]">+</div>
        </div>
        <div @click="drawer" class="action-btn">NEXT: {{ nextDrawNum }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Counter from "../components/Counter.vue";

const minProcessTime = 500;
const maxProcessTime = 1500;

export default {
  components: {
    Counter,
  },
  data: () => ({
    waitingList: [],
    nextDrawNum: 1,
    counters: [],
  }),
  computed: {
    idleCounterNum() {
      return this.counters.filter(element => element.status === 1).length;
    },
    activeCounterNum() {
      return this.counters.filter(element => element.status > 0).length;
    },
    isCounterAddable() {
      return this.activeCounterNum < this.counters.length;
    },
    isCounterReduceable() {
      return (this.activeCounterNum > 1) && this.idleCounterNum > 0;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.waitingList = [];
      this.nextDrawNum = 1;
      this.counters = [
        {
          id: 0,
          name: 'Amy',
          status: this.$counterStatusDict.idle,
          processing: 0,
          processed: [],
        }, {
          id: 1,
          name: 'Bob',
          status: this.$counterStatusDict.idle,
          processing: 0,
          processed: [],
        }, {
          id: 2,
          name: 'Cory',
          status: this.$counterStatusDict.offline,
          processing: 0,
          processed: [],
        }, {
          id: 3,
          name: 'Dora',
          status: this.$counterStatusDict.offline,
          processing: 0,
          processed: [],
        },
      ];
    },
    drawer() {
      if (this.idleCounterNum > 0) {
        const firstIdleIndex = this.counters.findIndex(element => element.status === this.$counterStatusDict.idle);
        this.arrangeCounter(firstIdleIndex, this.nextDrawNum);
      } else {
        this.waitingList.push(this.nextDrawNum);
      }
      this.nextDrawNum += 1;
    },
    arrangeCounter(index, next) {
      const targetCounter = this.counters[index];
      targetCounter.status = this.$counterStatusDict.processing;
      targetCounter.processing = next;

      const workingTime = Math.random() * (maxProcessTime - minProcessTime) + minProcessTime;
      setTimeout(() => {
        this.finishWorking(index);
      }, workingTime);
    },
    finishWorking(index) {
      const targetCounter = this.counters[index];
      let { processing, processed } = targetCounter;
      processed.push(processing);
      if (this.waitingList.length > 0) {
        this.arrangeCounter(index, this.waitingList[0]);
        this.waitingList.shift();
      } else {
        targetCounter.status = this.$counterStatusDict.idle;
        targetCounter.processing = 0;
      }
    },
    addCounter() {
      const firstOfflineIndex = this.counters.findIndex(element => element.status === this.$counterStatusDict.offline);
      if (this.activeCounterNum < this.counters.length && firstOfflineIndex > -1) {
        this.counters[firstOfflineIndex].status = this.$counterStatusDict.idle;
        if (this.waitingList.length > 0) {
          this.arrangeCounter(firstOfflineIndex, this.waitingList[0]);
          this.waitingList.shift();
        }
      }
    },
    reduceCounter() {
      const firstIdleIndex = this.counters.findIndex(element => element.status === this.$counterStatusDict.idle);
      if (this.activeCounterNum > 1 && firstIdleIndex > -1) {
        this.counters[firstIdleIndex].status = this.$counterStatusDict.offline;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.counter-container {
  position: relative;
  text-align: left;
  width: 90vw;
  max-width: 900px;
  margin: auto;

  .counter-table ::v-deep {
    .counter-table-header,
    .counter-table-item {
      width: 100%;
      min-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 0;
      border-bottom: 1px solid #efefef;

      div {
        &:first-child {
          width: 20%;
        }

        &:nth-child(2) {
          width: 30%;
        }

        &:nth-child(3) {
          width: 50%;
          word-wrap: break-word;
        }
      }
    }

    .counter-table-header {
      font-weight: bold;

      @media screen and (max-width: 320px) {
        font-size: 12px;
      }
    }
  }

  .toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
    padding: 0 10px;

    @media screen and (max-width: 768px) {
      font-size: 12px;
      flex-direction: column;
      align-items: flex-start;
    }

    .btn-group {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .minus-btn,
      .plus-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 18px;
        margin-left: 10px;
        color: #fff;
        cursor: not-allowed;

        &:hover {
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
        }
      }

      .minus-btn {
        background: #e0b9b2bb;

        &.is-enable {
          cursor: pointer;
          background: #ED553B;
        }
      }

      .plus-btn {
        background: #8eaaa7a8;

        &.is-enable {
          cursor: pointer;
          background: #3CAEA3;
        }
      }
    }

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 36px;
      border-radius: 10px;
      background: #173F5F;
      color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      }

      @media screen and (max-width: 768px) {
        margin: 30px auto 0;
        width: 100%;
        max-width: 360px;
      }
    }
  }
}
</style>
