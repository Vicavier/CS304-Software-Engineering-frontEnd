<template>
  <div class="main-content-nav">
    <div id="sell" class="main-content-nav-item" :class="{selected:selectDiv==='sell'}"  @click="loadBuy()">出</div>
    <div id="buy" class="main-content-nav-item"  :class="{selected:selectDiv==='buy'}" @click="loadSell()">收</div>
  </div>
</template>

<script>
import {ref} from "vue"

export default {
  setup() {
    let selectDiv = ref('sell')
    function loadSell(){
      selectDiv.value = 'sell'
    }

    function loadBuy(){
      selectDiv.value = 'buy'
    }
    return {
      selectDiv,
      loadBuy,
      loadSell,
    }
  }
}
</script>
<style>
.selected {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.main-content-nav-item {
  height: 100%;
  float: left;
  width: 50%;
  font-size: 16px;
  font-weight: bolder;
  line-height: 65px;
  text-align: center;
}
.main-content-nav-item:hover {
  color: #8D99DE;
  cursor: pointer;
  font-size: 20px;
}
</style>