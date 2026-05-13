import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div style={{ fontSize: 72, fontWeight: 900, color: 'var(--primary)', marginBottom: 8 }}>404</div>
      <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Page Not Found</div>
      <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>The page you are looking for does not exist.</div>
      <Link to="/" style={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none', fontSize: 14 }}>← Back to Home</Link>
    </div>
  )
}
