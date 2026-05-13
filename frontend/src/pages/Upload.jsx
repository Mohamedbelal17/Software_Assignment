import { useState, useRef } from 'react'
import { uploadPurchase, uploadSales } from '../services/api'
import PageHeader from '../components/PageHeader'

export default function Upload() {
  const [file,    setFile]    = useState(null)
  const [type,    setType]    = useState('purchase') 
  const [status,  setStatus]  = useState('idle')     
  const [message, setMessage] = useState('')
  const inputRef = useRef()

  const handleFile = (f) => {
    if (!f) return
    setFile(f)
    setStatus('idle')
    setMessage('')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    handleFile(e.dataTransfer.files[0])
  }

  const handleSubmit = async () => {
    if (!file) return
    setStatus('loading')
    setMessage('')
    try {
      const fn  = type === 'purchase' ? uploadPurchase : uploadSales
      const res = await fn(file)
      setStatus('success')
      setMessage(res?.message || 'File uploaded successfully')
      setFile(null)
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Failed to upload file')
    }
  }

  return (
    <div>
      <PageHeader title="File Upload" subtitle="Choose file type and upload it to the server" />

      <div style={{ maxWidth: 440 }}>
        <div className="card">

    
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {[
              { value: 'purchase', label: '🛒 Purchases' },
              { value: 'sales',    label: '💰 Sales'  },
            ].map(opt => (
              <button
                key={opt.value}
                className={`btn ${type === opt.value ? 'btn-active' : 'btn-outline'}`}
                style={{ flex: 1 }}
                onClick={() => { setType(opt.value); setStatus('idle'); setMessage('') }}
              >
                {opt.label}
              </button>
            ))}
          </div>

        
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            style={{
              border: '2px dashed ' + (file ? 'var(--primary-light)' : 'var(--border)'),
              borderRadius: 10,
              padding: '32px 16px',
              textAlign: 'center',
              cursor: 'pointer',
              background: file ? '#eff6ff' : '#f8fafc',
              transition: 'all .2s',
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 38, marginBottom: 8 }}>{file ? '📄' : '📁'}</div>
            {file ? (
              <>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>{file.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{(file.size / 1024).toFixed(1)} KB</div>
              </>
            ) : (
              <>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)', marginBottom: 3 }}>Drag the file here or click to select</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Supports all file types</div>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            onChange={e => handleFile(e.target.files[0])}
          />

      
          {status === 'success' && (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#15803d', marginBottom: 14, display: 'flex', gap: 8 }}>
              <span>✅</span><span>{message}</span>
            </div>
          )}
          {status === 'error' && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#b91c1c', marginBottom: 14, display: 'flex', gap: 8 }}>
              <span>⚠️</span><span>{message}</span>
            </div>
          )}

          
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!file || status === 'loading'}
              style={{ flex: 1, opacity: (!file || status === 'loading') ? .5 : 1, cursor: (!file || status === 'loading') ? 'not-allowed' : 'pointer' }}
            >
              {status === 'loading' ? '⏳ Uploading...' : '⬆️ Upload File'}
            </button>
            {file && (
              <button
                className="btn btn-outline"
                onClick={() => { setFile(null); setStatus('idle'); setMessage('') }}
              >
                Cancel 
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}