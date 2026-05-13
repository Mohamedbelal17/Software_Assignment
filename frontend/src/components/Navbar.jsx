import { useLocation } from 'react-router-dom'
import useStore from '../store/useStore'

const TITLES = {
  '/':                   'Home',
  '/reports/top-sales':  'Top Sales',
  '/reports/dead-stock': 'Dead Stock',
  '/reports/profit':     'Profit',
  '/search':             'Search',
}

export default function Navbar() {
  const toggle = useStore(s => s.toggleSidebar)
  const open   = useStore(s => s.sidebarOpen)
  const { pathname } = useLocation()
  const title = TITLES[pathname] || 'Dashboard'

  return (
    <header style={{
      height: 60, background: '#fff', borderBottom: '1px solid var(--border)',
      padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 1px 3px rgba(0,0,0,.04)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={toggle}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 8px', borderRadius: 8, fontSize: 20, color: 'var(--muted)',
            display: 'flex', alignItems: 'center',
          }}
          title={open ? 'Hide Menu' : 'Show Menu'}
        >☰</button>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.2 }}>{title}</div>
        </div>
      </div>
    
    </header>
  )
}
