import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Video, AlertTriangle, BarChart2,
  FileText, Map, Settings, Shield, Wifi, Bell, ChevronRight,
  Activity
} from 'lucide-react'
import type { ReactNode } from 'react'
import type { ToastMessage } from '../types'
import { severityColor } from '../services/riskEngine'

const NAV = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, exact: true },
  { to: '/monitoring', label: 'Live Monitoring', icon: Video },
  { to: '/incidents', label: 'Incidents', icon: AlertTriangle },
  { to: '/analytics', label: 'Risk Analytics', icon: BarChart2 },
  { to: '/reports', label: 'Reports', icon: FileText },
  { to: '/zones', label: 'Zones', icon: Map },
  { to: '/settings', label: 'Settings', icon: Settings },
]

interface Props {
  children: ReactNode
  toasts: ToastMessage[]
  onRemoveToast: (id: string) => void
  demoRunning?: boolean
  onStartDemo?: () => void
  onStopDemo?: () => void
}

export default function Layout({ children, toasts, onRemoveToast, demoRunning, onStartDemo, onStopDemo }: Props) {
  const loc = useLocation()

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#080c14', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, flexShrink: 0, background: '#0a0f1c',
        borderRight: '1px solid #1a2540',
        display: 'flex', flexDirection: 'column',
        position: 'relative', zIndex: 10
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1a2540' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'linear-gradient(135deg, #1d4ed8 0%, #0ea5e9 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <Shield size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.02em' }}>SiteGuard</div>
              <div style={{ fontSize: 10, color: '#22d3ee', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI</div>
            </div>
          </div>
          {/* System status */}
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'block' }} className="pulse" />
            <span style={{ fontSize: 10, color: '#22c55e', fontWeight: 600, letterSpacing: '0.06em' }}>SYSTEM ONLINE</span>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2, overflowY: 'auto' }}>
          {NAV.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? loc.pathname === '/' : loc.pathname.startsWith(to)
            return (
              <NavLink
                key={to}
                to={to}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
                  fontSize: 13, fontWeight: active ? 600 : 400,
                  color: active ? '#e2e8f0' : '#64748b',
                  background: active ? '#0f1f3d' : 'transparent',
                  borderLeft: active ? '2px solid #3b82f6' : '2px solid transparent',
                  transition: 'all 0.15s',
                }}
              >
                <Icon size={16} style={{ flexShrink: 0 }} />
                {label}
              </NavLink>
            )
          })}
        </nav>

        {/* Demo mode button */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid #1a2540' }}>
          <button
            onClick={demoRunning ? onStopDemo : onStartDemo}
            style={{
              width: '100%', padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.04em',
              background: demoRunning ? 'rgba(239,68,68,0.15)' : 'rgba(34,211,238,0.1)',
              color: demoRunning ? '#f87171' : '#22d3ee',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              transition: 'all 0.2s',
            }}
          >
            <Activity size={13} />
            {demoRunning ? 'STOP DEMO' : 'RUN DEMO'}
          </button>
        </div>

        {/* User */}
        <div style={{ padding: '10px 12px', borderTop: '1px solid #1a2540' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d4ed8, #7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0
            }}>SS</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Site Supervisor</div>
              <div style={{ fontSize: 10, color: '#64748b' }}>admin@siteguard.ai</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar */}
        <header style={{
          height: 52, flexShrink: 0,
          background: '#0a0f1c', borderBottom: '1px solid #1a2540',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#475569' }}>
            <span>SiteGuard AI</span>
            <ChevronRight size={12} />
            <span style={{ color: '#94a3b8' }}>{NAV.find(n => n.exact ? loc.pathname === '/' : loc.pathname.startsWith(n.to))?.label ?? 'Page'}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#22c55e', fontWeight: 600 }}>
              <Wifi size={13} />
              ALL CAMERAS ONLINE
            </div>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', position: 'relative', padding: 4 }}>
              <Bell size={17} />
              <span style={{
                position: 'absolute', top: 0, right: 0, width: 8, height: 8,
                borderRadius: '50%', background: '#ef4444', border: '1px solid #0a0f1c'
              }} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: 'auto', background: '#080c14' }}>
          {children}
        </main>
      </div>

      {/* Toast stack */}
      <div style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 1000,
        display: 'flex', flexDirection: 'column', gap: 8, width: 340
      }}>
        {toasts.map(t => (
          <div key={t.id}
            onClick={() => onRemoveToast(t.id)}
            style={{
              background: '#0d1320', border: `1px solid ${toastBorderColor(t.type)}`,
              borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 3,
              boxShadow: `0 4px 20px ${toastShadow(t.type)}`,
              animation: 'slideIn 0.2s ease',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: toastTextColor(t.type) }}>{t.title}</div>
            <div style={{ fontSize: 11, color: '#94a3b8', lineHeight: 1.4 }}>{t.body}</div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}

function toastBorderColor(type: ToastMessage['type']) {
  switch (type) {
    case 'critical': return 'rgba(239,68,68,0.4)'
    case 'warning': return 'rgba(245,158,11,0.4)'
    case 'success': return 'rgba(34,197,94,0.4)'
    case 'info': return 'rgba(34,211,238,0.4)'
  }
}

function toastTextColor(type: ToastMessage['type']) {
  switch (type) {
    case 'critical': return '#f87171'
    case 'warning': return '#fbbf24'
    case 'success': return '#4ade80'
    case 'info': return '#22d3ee'
  }
}

function toastShadow(type: ToastMessage['type']) {
  switch (type) {
    case 'critical': return 'rgba(239,68,68,0.15)'
    case 'warning': return 'rgba(245,158,11,0.1)'
    default: return 'rgba(0,0,0,0.3)'
  }
}
