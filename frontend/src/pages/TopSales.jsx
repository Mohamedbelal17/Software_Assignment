import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getTopSales } from '../services/api'
import DataTable   from '../components/DataTable'
import PageHeader  from '../components/PageHeader'
import Spinner     from '../components/Spinner'
import ErrorBox    from '../components/ErrorBox'
import StatCard    from '../components/StatCard'

const normalize = d => Array.isArray(d) ? d : d?.items ?? d?.data ?? []

export default function TopSales() {
  const [n, setN] = useState(5)
  const { data, isLoading, error } = useQuery({
    queryKey: ['top-sales', n],
    queryFn: () => getTopSales(n),
  })
  const rows = normalize(data)

  const columns = [
    { key: 'ItemName',        label: 'Item Name' },
    { key: 'TotalSalesValue', label: 'Total Sales Value',  render: v => v.toFixed(2) + ' EGP' },
    { key: 'TotalSalesQty',   label: 'Total Sales Quantity',   render: v => v.toFixed(2) + ' units' },
  ]

  const totalVal = rows.reduce((s, r) => s + Number(r.TotalSalesValue || 0), 0)
  const totalQty = rows.reduce((s, r) => s + Number(r.TotalSalesQty   || 0), 0)
  console.log('test' , { rows, totalVal, totalQty })

  return (
    <div>
      <PageHeader title="Top Sales" subtitle="Highest selling products by value and quantity" />

      {/* N selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 600 }}>Number of results:</span>
        {[5, 10].map(v => (
          <button key={v} className={`btn ${n === v ? 'btn-active' : 'btn-outline'}`} onClick={() => setN(v)}>{v}</button>
        ))}
      </div>

      {isLoading && <Spinner text="Loading sales data..." />}
      {error     && <ErrorBox message={error.message} />}

      {!isLoading && !error && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 20 }}>
            <StatCard icon="💵" label="Total Sales Value" value={(totalVal.toFixed(2)) + ' EGP'} color="#3b82f6" />
            <StatCard icon="🏆" label="Number of Items"          value={rows.length}              color="#f59e0b" />
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>Sales Chart</div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={rows} margin={{ top: 4, right: 8, left: 8, bottom: 55 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="ItemName" tick={{ fontSize: 11, fontFamily: 'Cairo' }} angle={-30} textAnchor="end" interval={0} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => v.toLocaleString()} width={70} />
                <Tooltip
                  formatter={(v) => [v.toFixed(2) + ' EGP', 'Total Sales']}
                  contentStyle={{ fontFamily: 'Cairo', borderRadius: 8, fontSize: 13 }}
                  labelStyle={{ direction: 'rtl' }}
                />
                <Bar dataKey="TotalSalesValue" name="Sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 14 }}>Sales Table</div>
            <DataTable columns={columns} data={rows} emptyText="No sales data available" />
          </div>
        </>
      )}
    </div>
  )
}
