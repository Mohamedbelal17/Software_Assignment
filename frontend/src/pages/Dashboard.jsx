import { Link } from 'react-router-dom'
import StatCard   from '../components/StatCard'
import PageHeader from '../components/PageHeader'

const cards = [
  { to: '/reports/top-sales',  icon: '📈', label: 'Top Sales',   desc: 'Highest selling products by value',   color: '#3b82f6' },
  { to: '/reports/dead-stock', icon: '📦', label: 'Dead Stock', desc: 'Unsold inventory items',            color: '#f59e0b' },
  { to: '/reports/profit',     icon: '💰', label: 'Profit',         desc: 'Summary of revenues, expenses, and net profit', color: '#10b981' },
  { to: '/search',             icon: '🔍', label: 'Search',           desc: 'Search for products by name',                   color: '#8b5cf6' },
]

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Welcome to the Dashboard" subtitle="Choose a report or use the search" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 32 }}>
        <StatCard icon="📊" label="Total Reports"  value="3"    color="#3b82f6" sub="Available Reports" />
        <StatCard icon="🔍" label="Search"             value="Available" color="#8b5cf6" sub="Comprehensive Product Search" />
      </div>

      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14, color: 'var(--text)' }}>Quick Navigation</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 14 }}>
        {cards.map(c => (
          <Link key={c.to} to={c.to} style={{ textDecoration: 'none' }}>
            <div
              className="card"
              style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer', borderTop: `3px solid ${c.color}`, transition: 'box-shadow .2s, transform .15s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.1)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = '' }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 10, background: c.color + '1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>{c.desc}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
