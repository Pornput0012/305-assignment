import { defineStore } from "pinia";
import { ref } from "vue";

export const useSearchStore = defineStore("searchStore", () => {
  const search = ref("");
  const setSearch = (value) => {
    search.value = value;
  };
  const getSearch = (value) => {
    return search.value;
  };
  return {
    search,
    setSearch,
    getSearch,
  };
});
