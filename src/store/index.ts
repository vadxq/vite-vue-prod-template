import { defineStore } from 'pinia';

interface Item {
  id: number;
}

export type RootState = {
  items: Item[];
};

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      items: []
    }) as RootState,
  actions: {
    createNewItem(item: Item) {
      if (!item) return;
      this.items.push(item);
    },
    updateItem(id: number, payload: Item) {
      if (!id || !payload) return;
      const index = this.findIndexById(id);
      if (index !== -1) {
        this.items[index] = {
          id: 1
        };
      }
    },
    deleteItem(id: number) {
      const index = this.findIndexById(id);
      if (index === -1) return;
      this.items.splice(index, 1);
    },
    findIndexById(id: number) {
      return this.items.findIndex((item) => item.id === id);
    }
  }
});
