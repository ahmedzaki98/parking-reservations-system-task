import { create } from "zustand";

interface GatesStore {
  page: number;
  pageSize: number;
  totalPages: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setTotalPages: (totalPages: number) => void;
}
export const useGatesStore = create<GatesStore>((set) => ({
  page: 1,
  pageSize: 10,
  totalPages: 10,
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setTotalPages: (totalPages) => set({ totalPages }),
}));
