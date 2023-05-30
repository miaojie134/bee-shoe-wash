import { createStore } from "pinia";
import { userStore } from "./user";
import { serviceStore } from "./service";
import { orderStore } from "./order";

export const useStore = () => {
  return createStore({
    id: "root",
    getters: {
      user: () => userStore.state.user,
      services: () => serviceStore.state.services,
      orders: () => orderStore.state.orders,
      favorites: () => userStore.state.favorites,
      shares: () => userStore.state.shares,
      orderById: (id: string) =>
        orderStore.state.orders.find((order) => order.id === id),
      serviceById: (id: string) =>
        serviceStore.state.services.find((service) => service.id === id),
    },
  });
};
