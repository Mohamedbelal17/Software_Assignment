export default function ErrorBox({ message }) {
  return (
    <div style={{
      background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 10,
      padding: '14px 18px', color: '#b91c1c', fontSize: 14,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span>⚠️</span>
      <span>{message || 'Error loading data'}</span>
    </div>
  )
}
