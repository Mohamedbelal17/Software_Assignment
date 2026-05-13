export default function PageHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{subtitle}</p>}
    </div>
  )
}
