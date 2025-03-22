<template>
  <span :class="{
      'px-3 py-1 text-xs font-medium rounded-full shadow-sm': true,
      'bg-green-200 text-green-800': status === 'active',
      'bg-yellow-200 text-yellow-800': status === 'pending',
      'bg-blue-200 text-blue-800': status === 'unread',
      'bg-teal-200 text-teal-800': status === 'busy',
      'bg-lime-200 text-lime-800': status === 'read',
      'bg-red-200 text-red-800': status === 'inactive',
      'bg-rose-200 text-rose-800': status === 'no_answer',
      'bg-indigo-200 text-indigo-800': status === 'completed',
      'bg-purple-200 text-purple-800': status === 'dropped',
      'bg-pink-200 text-pink-800': status === 'expelled',
      'bg-gray-200 text-gray-800': status === 'failed',
      'bg-emerald-200 text-emerald-800': status === 'answered',
      'bg-orange-200 text-orange-800': status === 'call_back',
    }"
  >
    {{ translateStatus(status) }}
  </span>
</template>

<script>
import { getStatus } from '@/utils/stutus.js';
export default {
  props:{
    status: String,
  },
  setup(props) {
    const status = props.status
    const translateStatus = (argument) => {
      return getStatus(argument)
    }

    return {
      translateStatus,
      status,
    }
  }
}
</script>