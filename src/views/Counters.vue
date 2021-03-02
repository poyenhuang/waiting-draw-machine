<template>
  <div>
    <div class="counter-container">
      <div class="counter-table">
        <div class="counter-table-header">
          <div>counter</div>
          <div>processing</div>
          <div>processed</div>
        </div>
        <Counter
          v-for="(counter, index) in counters"
          :key="index"
          :counterData="counter"
          class="counter-table-item"
        />
      </div>
      <div class="toolbar">
        <div>waitings: {{ waitingList.length }}</div>
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
          status: this.$counterStatusDict.idle,
          processing: 0,
          processed: [],
        }, {
          id: 3,
          name: 'Dora',
          status: this.$counterStatusDict.idle,
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
    margin: 10px 0;
    padding: 0 10px;

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 36px;
      border-radius: 10px;
      background: cornflowerblue;
      color: #fff;
      cursor: pointer;
      &:hover {
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>
