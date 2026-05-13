import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getProfit } from '../services/api'
import DataTable  from '../components/DataTable'
import PageHeader from '../components/PageHeader'
import Spinner    from '../components/Spinner'
import ErrorBox   from '../components/ErrorBox'
import StatCard   from '../components/StatCard'

const fmt = n => Number(n || 0).toLocaleString('ar-EG')
const normalize = d => Array.isArray(d) ? d : d?.items ?? d?.data ?? []

export default function Profit() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['profit'],
    queryFn: getProfit,
  })
  const rows = normalize(data)

  const totalProfit = rows.reduce((s, r) => s + Number(r.Profit || 0), 0)


  const columns = [
    { key: 'ItemName', label: 'Item Name' },
    { key: 'Profit',   label: 'Profit', render: v => {
      const val = Number(v || 0)
      return (
        <span style={{ fontWeight: 700, color: val >= 0 ? 'var(--success)' : 'var(--danger)' }}>
          {val.toFixed(2)} EGP
        </span>
      )
    }},
  ]

  return (
    <div>
      <PageHeader title="Profit Report" subtitle="Profit for each item" />

      {isLoading && <Spinner text="Loading profit data..." />}
      {error     && <ErrorBox message={error.message} />}

      {!isLoading && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
            <StatCard icon="💰" label="Total Net Profit" value={totalProfit.toFixed(2) + ' EGP'} color="#10b981" />
            <StatCard icon="📦" label="Number of Items"      value={rows.length}               color="#3b82f6" />
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>Profit Chart (Top 4)</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={rows.slice(0, 4)} margin={{ top: 4, right: 8, left: 8, bottom: 55 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ItemName" tick={{ fontSize: 11, fontFamily: 'Cairo' }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v.toLocaleString()} width={80} />
                <Tooltip
                  formatter={v => [Number(v).toFixed(2) + ' EGP', 'Profit']}
                  contentStyle={{ fontFamily: 'Cairo', borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Bar
                  dataKey="Profit"
                  name="Profit"
                  radius={[4, 4, 0, 0]}
                  fill="#10b981"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>Profit Table</div>
            <DataTable columns={columns} data={rows.slice(0, 10)} emptyText="No profit data available" />
          </div>
        </>
      )}
    </div>
  )
}