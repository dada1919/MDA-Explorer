import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useGraphStore = defineStore('graph', {
  state: ()=>{
    const graph_disease = ref(-1)
    const graph_mirna = ref(-1)
    return {graph_disease, graph_mirna}
  },
  persist : true
})