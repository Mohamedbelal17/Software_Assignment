import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchItems } from '../services/api'
import PageHeader from '../components/PageHeader'
import Spinner    from '../components/Spinner'
import ErrorBox   from '../components/ErrorBox'

const normalize = d => Array.isArray(d) ? d : d?.items ?? d?.data ?? d?.results ?? []

export default function Search() {
  const [query,     setQuery]     = useState('')
  const [submitted, setSubmitted] = useState('')

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', submitted],
    queryFn:  () => searchItems(submitted),
    enabled:  submitted.length > 0,
  })
  const results = normalize(data)

  const doSearch = () => { if (query.trim()) setSubmitted(query.trim()) }

  return (
    <div>
      <PageHeader title="Search" subtitle="Search for items by name" />

      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            className="input"
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && doSearch()}
            placeholder="Search for items..."
          />
          <button
            className="btn btn-primary"
            onClick={doSearch}
            disabled={!query.trim()}
            style={{ whiteSpace: 'nowrap', opacity: query.trim() ? 1 : .5, cursor: query.trim() ? 'pointer' : 'not-allowed' }}
          >
            🔍 Search
          </button>
        </div>
      </div>

      {isLoading && <Spinner text="Searching..." />}
      {error     && <ErrorBox message={error.message} />}

      {!isLoading && !error && submitted && results.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>No results found</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Try a different keyword or check your spelling</div>
        </div>
      )}

      {!isLoading && !error && results.length > 0 && (
        <>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 12 }}>
            It was found <strong style={{ color: 'var(--text)' }}>{results.length}</strong> results  &nbsp;
            "<strong style={{ color: 'var(--primary)' }}>{submitted}</strong>"
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {results.map((item, i) => (
              <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#3b82f61a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>📦</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{item.ItemName}</div>
                  </div>
                 </div>             
              </div>
            ))}
          </div>
        </>
      )}

      {!submitted && !isLoading && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15 }}>Write the item name in the search box to get started</div>
        </div>
      )}
    </div>
  )
}
