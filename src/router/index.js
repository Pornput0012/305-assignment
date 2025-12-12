import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlantDetailView from "@/views/PlantDetailView.vue";
import SymptomsDetail from "@/views/SymptomsDetail.vue";
import SymptomsView from "@/views/SymptomsView.vue";
import CreatePlantView from "@/views/CreatePlantView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/symptoms",
      name: "sym",
      component: SymptomsView,
    },
    {
      path: "/plants/create",
      name: "create-plant",
      component: CreatePlantView,
    },
    {
      path: "/:plantId",
      name: "plant-detail",
      component: PlantDetailView,
    },
    {
      path: "/symptoms/:symId",
      name: "sym-detail",
      component: SymptomsDetail,
    },
  ],
});

export default router;
