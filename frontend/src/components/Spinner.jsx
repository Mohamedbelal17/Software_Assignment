export default function Spinner({ text = 'Loading...' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', gap: 14 }}>
      <div className="spinner" />
      <span style={{ fontSize: 13, color: 'var(--muted)' }}>{text}</span>
    </div>
  )
}
