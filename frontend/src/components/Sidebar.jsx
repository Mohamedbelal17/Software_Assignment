import { NavLink } from 'react-router-dom'
import useStore from '../store/useStore'

const links = [
  { to: '/',                    icon: '🏠', label: 'Home',        end: true },
  { to: '/reports/top-sales',   icon: '📈', label: 'Top Sales'          },
  { to: '/reports/dead-stock',  icon: '📦', label: 'Dead Stock'         },
  { to: '/reports/profit',      icon: '💰', label: 'Profit'                },
  { to: '/search',              icon: '🔍', label: 'Search'                  },
  {to: '/upload',              icon: '⬆️', label: 'Upload File'           },
]

const activeStyle = {
  color: '#fff', fontWeight: 700,
  background: 'rgba(255,255,255,.18)',
  borderRight: '3px solid rgba(255,255,255,.85)',
}
const baseStyle = {
  display: 'flex', alignItems: 'center', gap: 10,
  padding: '9px 14px', borderRadius: 8, textDecoration: 'none',
  fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,.65)',
  borderRight: '3px solid transparent', transition: 'all .15s',
}

export default function Sidebar() {
  const open = useStore(s => s.sidebarOpen)
  return (
    <aside className={`sidebar${open ? '' : ' sidebar--closed'}`} >
      <div style={{ padding: '22px 16px 10px', borderBottom: '1px solid rgba(255,255,255,.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>📊</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>Dashboard</div>
            <div style={{ color: 'rgba(255,255,255,.4)', fontSize: 10 }}>Sales Management System</div>
          </div>
        </div>
      </div>

  
      <nav style={{ padding: '12px 10px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', fontWeight: 700, letterSpacing: '.1em', padding: '0 6px 8px' }}>
          Main Menus
        </div>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            style={({ isActive }) => ({ ...baseStyle, ...(isActive ? activeStyle : {}) })}
          >
            <span style={{ fontSize: 15 }}>{l.icon}</span>
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>

    
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,.08)', fontSize: 11, color: 'rgba(255,255,255,.25)', textAlign: 'center' }}>
        v1.0.0
      </div>
    </aside>
  )
}
