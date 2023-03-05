/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { create } from 'zustand';
import ItemsService from './service';

export interface Table {
  loading: boolean;
  items: Array<any>;
  filter: string;

  loadItems: (size?: number, page?: number) => Promise<void>;
  appendItems: (size?: number, page?: number) => Promise<void>;
  toggleItem: (id: number, checked: boolean) => void;
  setFilter: (filter: string) => void;
}

const initialState: Omit<Table, 'loadItems' | 'setFilter' | 'appendItems' | 'toggleItem'> = {
  loading: true,
  filter: '',
  items: []
};

const useTableItems = create<Table>((set: any, get: any) => ({
  ...initialState,

  loadItems: async (size?: number, page?: number) => {
    try {
      set({ loading: true });
      const filter = get().filter;
      const items = await ItemsService.getItems(filter, size, page);
      set({ items });
    } finally {
      set({ loading: false });
    }
  },

  appendItems: async (size?: number, page?: number) => {
    try {
      set({ loading: true });
      const filter = get().filter;
      const existingItems = get().items;
      const items = await ItemsService.getItems(filter, size, page);
      set({ items: [...existingItems, ...items] });
    } finally {
      set({ loading: false });
    }
  },

  toggleItem: (id: number, checked: boolean) => {
    const items = get().items;
    items
      .filter((item: any) => item.id === id)
      .forEach((item: any) => item.checked = !checked);
    set({ items });
  },

  setFilter: (filter: string) => {
    set({ filter });
  }

}));

export default useTableItems;
