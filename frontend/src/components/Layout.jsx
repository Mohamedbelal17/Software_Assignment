import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import useStore from '../store/useStore'

export default function Layout() {
  const open = useStore(s => s.sidebarOpen)
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginRight: open ? 240 : 0, transition: 'margin-right .3s ease', minWidth: 0 }}>
        <Navbar />
        <main style={{ padding: '24px 20px', maxWidth: 1100, margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
