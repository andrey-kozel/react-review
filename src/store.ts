/*
 * Copyright (C) 2022 Spanning Cloud Apps.  All rights reserved.
 */

import { create } from 'zustand';
import ItemsService from './service';

export interface Table {
  loading: boolean;
  items: Array<any>;
  userInfo: any;

  getUserInfo: () => Promise<void>;
  loadItems: (filter: string, size?: number, page?: number) => Promise<void>;
  appendItems: (filter: string, size?: number, page?: number) => Promise<void>;
  toggleItem: (id: number, checked: boolean) => void;
}

const initialState: Omit<Table, 'loadItems' | 'setFilter' | 'appendItems' | 'toggleItem' | 'getUserInfo'> = {
  userInfo: {},
  loading: true,
  items: []
};

const useTableItems = create<Table>((set: any, get: any) => ({
  ...initialState,

  getUserInfo: async () => {
    const userInfo: any = await ItemsService.getUserInfo();
    set({ userInfo });
  },

  loadItems: async (filter: string, size?: number, page?: number) => {
    try {
      set({ loading: true });
      const items = await ItemsService.getItems(filter, size, page);
      set({ items });
    } finally {
      set({ loading: false });
    }
  },

  appendItems: async (filter: string, size?: number, page?: number) => {
    try {
      set({ loading: true });
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
    set({ items: [...items] });
  }

}));

export default useTableItems;
