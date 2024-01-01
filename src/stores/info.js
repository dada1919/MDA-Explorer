import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useInfoStore = defineStore('info', {
  state: ()=>{
    const type = ref('')
    const id = ref('')
    return {type, id}
  },
  persist : true
})