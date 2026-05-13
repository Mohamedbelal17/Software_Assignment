import { useQuery } from '@tanstack/react-query'
import { getDeadStock } from '../services/api'
import DataTable  from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import Spinner    from '../components/Spinner'
import ErrorBox   from '../components/ErrorBox'
import StatCard   from '../components/StatCard'

const fmt = n => Number(n || 0).toLocaleString('ar-EG')
const normalize = d => Array.isArray(d) ? d : d?.items ?? d?.data ?? []

export default function DeadStock() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dead-stock'],
    queryFn: getDeadStock,
  })
  const rows = normalize(data)

  const columns = [
    { key: 'ItemName',       label: 'Item Name' },
    { key: 'TotalPurchased', label: 'Total Purchased', render: v => v.toFixed(2) + ' EGP' },
  ]

  return (
    <div>
      <PageHeader title="DeadStock Items" subtitle="Items that did not sell and accumulated in the warehouse" />

      {isLoading && <Spinner text="Loading..." />}
      {error     && <ErrorBox message={error.message} />}

      {!isLoading && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
            <StatCard icon="📦" label="DeadStock Items Count"  value={rows.length}       color="#f59e0b" />
            </div>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>DeadStock Items</div>
            <DataTable columns={columns} data={rows} emptyText="No dead stock items found." />
          </div>
        </>
      )}
    </div>
  )
}
