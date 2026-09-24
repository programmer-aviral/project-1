import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Dashboard from './pages/Dashboard'
import LiveMonitoring from './pages/LiveMonitoring'
import Incidents from './pages/Incidents'
import IncidentDetail from './pages/IncidentDetail'
import Report from './pages/Report'
import ReportsList from './pages/ReportsList'
import Analytics from './pages/Analytics'
import Zones from './pages/Zones'
import Settings from './pages/Settings'
import { useDemo } from './hooks/useDemo'

export default function App() {
  const demo = useDemo()

  return (
    <Layout
      toasts={demo.toasts}
      onRemoveToast={demo.removeToast}
      demoRunning={demo.running}
      onStartDemo={demo.startDemo}
      onStopDemo={demo.stopDemo}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/monitoring" element={<LiveMonitoring />} />
        <Route path="/incidents" element={<Incidents />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
        <Route path="/reports" element={<ReportsList />} />
        <Route path="/reports/:id" element={<Report />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>

      {demo.running && (
        <div style={{
          position: 'fixed', top: 52, left: 220, right: 0, zIndex: 50,
          background: 'rgba(34,211,238,0.08)', borderBottom: '1px solid rgba(34,211,238,0.2)',
          padding: '6px 24px', display: 'flex', alignItems: 'center', gap: 14
        }}>
          <span style={{ fontSize: 11, color: '#22d3ee', fontWeight: 700, letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
            ▶ DEMO MODE RUNNING
          </span>
          <div style={{ flex: 1, background: '#1a2540', borderRadius: 3, height: 4 }}>
            <div style={{
              width: `${((demo.step + 1) / demo.totalSteps) * 100}%`,
              height: '100%', background: '#22d3ee', borderRadius: 3, transition: 'width 0.5s ease'
            }} />
          </div>
          <span style={{ fontSize: 10, color: '#475569', whiteSpace: 'nowrap' }}>
            Step {demo.step + 1} / {demo.totalSteps}
          </span>
        </div>
      )}
    </Layout>
  )
}
