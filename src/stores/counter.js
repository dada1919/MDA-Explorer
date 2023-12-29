import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', ()=>{
  const disease_index = ref(-1)
  const mirna_index = ref(-1)
  const fix = ref(false)
  const fix_disease = ref(-1)
  const fix_mirna = ref(-1)
  return {disease_index, mirna_index, fix, fix_disease, fix_mirna}
})
