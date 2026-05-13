import { create } from 'zustand'

const useStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  topSalesN: 5,
  setTopSalesN: (n) => set({ topSalesN: n }),
}))

export default useStore
