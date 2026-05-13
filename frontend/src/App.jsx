import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout    from './components/Layout'
import Dashboard from './pages/Dashboard'
import TopSales  from './pages/TopSales'
import DeadStock from './pages/DeadStock'
import Profit    from './pages/Profit'
import Search    from './pages/Search'
import NotFound  from './pages/NotFound'
import Upload    from './pages/Upload'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index              element={<Dashboard />} />
            <Route path="reports/top-sales"  element={<TopSales />}  />
            <Route path="reports/dead-stock" element={<DeadStock />} />
            <Route path="reports/profit"     element={<Profit />}    />
            <Route path="search"             element={<Search />}    />
            <Route path="upload"             element={<Upload />}    />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
