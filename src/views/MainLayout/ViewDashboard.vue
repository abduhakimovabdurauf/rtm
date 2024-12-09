<template>
  <div class="w-full flex flex-wrap break-words p-4 overflow-y-auto">
    <p>
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
    </p>
    <p>
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
    </p>
    <p>
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
    </p>
    <p>
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
      awdwijbfqbbwebwerugbuewguewhghuewvghewgegwegegwegweg
    </p>
  </div>
</template>

<script>
  import {onMounted} from "vue";

  export default {
    setup(){
      onMounted(()=> {
        console.log('userData: ', JSON.parse(localStorage.getItem("user")));
      })
    }
  }
</script>

<style scoped>
.w-full {
  max-width: 100%;
  overflow: hidden;
}

p {
  word-break: break-word;
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
