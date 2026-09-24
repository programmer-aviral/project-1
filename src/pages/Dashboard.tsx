import { useNavigate } from 'react-router-dom'
import {
  Users, Camera, AlertTriangle, MapPin, FileWarning, ShieldCheck,
  TrendingUp, ArrowRight, ChevronRight
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { mockAlerts, mockTrends, mockZones } from '../data/mockData'
import { severityColor, severityBg } from '../services/riskEngine'
import type { Severity } from '../types'

const KPI_CARDS = [
  { label: 'Active Workers', value: '42', icon: Users, color: '#3b82f6', sub: '+3 since morning' },
  { label: 'Active Cameras', value: '8 / 8', icon: Camera, color: '#22c55e', sub: 'All online' },
  { label: 'Open Alerts', value: '03', icon: AlertTriangle, color: '#f59e0b', sub: '1 critical' },
  { label: 'High-Risk Zones', value: '02', icon: MapPin, color: '#ef4444', sub: 'Zone 03, Zone 04' },
  { label: "Today's Incidents", value: '07', icon: FileWarning, color: '#f97316', sub: '+2 since 9AM' },
  { label: 'Safety Score', value: '92 / 100', icon: ShieldCheck, color: '#22d3ee', sub: '↑ 4 pts this week' },
]

const ZONE_COLORS: Record<string, string> = {
  RESTRICTED: '#ef4444',
  HIGH: '#f97316',
  CAUTION: '#f59e0b',
  SAFE: '#22c55e',
}

export default function Dashboard() {
  const nav = useNavigate()

  return (
    <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>
              Good morning, Site Supervisor
            </h1>
            <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>
              Real-time construction safety intelligence
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#22c55e', fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} className="pulse" />
            System Online — Thu, 24 Sep 2026
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 14, marginBottom: 24 }}>
        {KPI_CARDS.map(card => (
          <div key={card.label} style={{
            background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12,
            padding: '16px', display: 'flex', flexDirection: 'column', gap: 10,
            transition: 'border-color 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{card.label}</span>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: card.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={14} color={card.color} />
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: 11, color: '#475569' }}>{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Main row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        {/* Site map */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Live Site Overview</h2>
            <button onClick={() => nav('/monitoring')} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
              Live Feed <ArrowRight size={12} />
            </button>
          </div>
          {/* Zone map */}
          <div style={{ position: 'relative', background: '#060a12', borderRadius: 10, height: 320, overflow: 'hidden', border: '1px solid #1a2540' }}>
            {/* Grid lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <g key={i}>
                  <line x1={`${i * 10}%`} y1="0" x2={`${i * 10}%`} y2="100%" stroke="#3b82f6" strokeWidth="1" />
                  <line x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#3b82f6" strokeWidth="1" />
                </g>
              ))}
            </svg>

            {mockZones.map(z => (
              <div key={z.id} style={{
                position: 'absolute',
                left: `${z.x}%`, top: `${z.y}%`,
                width: `${z.width}%`, height: `${z.height}%`,
                border: `1px solid ${ZONE_COLORS[z.risk]}`,
                background: ZONE_COLORS[z.risk] + '18',
                borderRadius: 6,
                display: 'flex', flexDirection: 'column',
                padding: '6px 8px',
                cursor: 'pointer',
              }} onClick={() => nav('/zones')}>
                <div style={{ fontSize: 10, fontWeight: 700, color: ZONE_COLORS[z.risk], letterSpacing: '0.06em' }}>{z.name}</div>
                <div style={{ fontSize: 9, color: '#64748b', marginTop: 'auto' }}>
                  👷 {z.workers} · 📷 {z.cameras}
                </div>
                {z.risk === 'RESTRICTED' && (
                  <div style={{ fontSize: 8, color: '#ef4444', fontWeight: 700, letterSpacing: '0.08em' }}>RESTRICTED</div>
                )}
              </div>
            ))}

            {/* Worker dots */}
            {[
              { x: 18, y: 15, status: 'safe' }, { x: 25, y: 22, status: 'safe' }, { x: 12, y: 30, status: 'safe' },
              { x: 60, y: 12, status: 'warn' }, { x: 72, y: 20, status: 'safe' }, { x: 65, y: 28, status: 'safe' },
              { x: 20, y: 60, status: 'critical' }, { x: 28, y: 70, status: 'safe' },
              { x: 62, y: 58, status: 'safe' }, { x: 75, y: 65, status: 'safe' }, { x: 68, y: 75, status: 'warn' },
            ].map((w, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${w.x}%`, top: `${w.y}%`,
                width: 8, height: 8, borderRadius: '50%',
                background: w.status === 'critical' ? '#ef4444' : w.status === 'warn' ? '#f59e0b' : '#22c55e',
                transform: 'translate(-50%,-50%)',
                boxShadow: w.status === 'critical' ? '0 0 6px #ef4444' : 'none',
              }} />
            ))}

            {/* Camera icons */}
            {[{ x: 8, y: 8 }, { x: 42, y: 8 }, { x: 52, y: 8 }, { x: 90, y: 8 },
              { x: 8, y: 48 }, { x: 42, y: 48 }, { x: 52, y: 48 }, { x: 90, y: 48 }].map((c, i) => (
              <div key={i} style={{
                position: 'absolute', left: `${c.x}%`, top: `${c.y}%`,
                fontSize: 10, transform: 'translate(-50%,-50%)', opacity: 0.7
              }}>📷</div>
            ))}

            {/* Legend */}
            <div style={{ position: 'absolute', bottom: 10, right: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[['#22c55e', 'Safe'], ['#f59e0b', 'Warning'], ['#ef4444', 'Critical']].map(([c, l]) => (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, color: '#64748b' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'block' }} />
                  {l}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Alerts */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Live Alerts</h2>
            <span style={{ fontSize: 11, color: '#64748b' }}>{mockAlerts.length} active</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            {mockAlerts.map(a => (
              <div key={a.id}
                onClick={() => nav('/incidents')}
                style={{
                  background: '#060a12', border: `1px solid ${severityColor(a.severity)}33`,
                  borderLeft: `3px solid ${severityColor(a.severity)}`,
                  borderRadius: 8, padding: '10px 12px', cursor: 'pointer',
                  transition: 'border-color 0.15s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                    color: severityColor(a.severity), background: severityBg(a.severity),
                    padding: '2px 6px', borderRadius: 4
                  }}>{a.severity}</span>
                  <span style={{ fontSize: 10, color: '#475569' }}>{a.timestamp}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#cbd5e1', lineHeight: 1.4 }}>{a.message}</p>
                <p style={{ margin: '4px 0 0', fontSize: 10, color: '#475569' }}>{a.zone} · Worker {a.workerId}</p>
              </div>
            ))}
          </div>
          <button onClick={() => nav('/incidents')} style={{
            marginTop: 14, width: '100%', padding: '8px', borderRadius: 8,
            background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
            color: '#3b82f6', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
          }}>
            View All Incidents <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Trends chart */}
      <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Safety Trends</h2>
            <p style={{ margin: '3px 0 0', fontSize: 11, color: '#64748b' }}>7-day incident and violation tracking</p>
          </div>
          <button onClick={() => nav('/analytics')} style={{
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#3b82f6',
            background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600
          }}>
            View Full Analytics <ChevronRight size={14} />
          </button>
        </div>
        <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
          {[
            { color: '#ef4444', label: 'Incidents' },
            { color: '#f59e0b', label: 'Violations' },
            { color: '#22d3ee', label: 'Safety Score' },
          ].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
              <span style={{ width: 24, height: 2, background: l.color, display: 'block', borderRadius: 1 }} />
              {l.label}
            </div>
          ))}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={mockTrends} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
            <defs>
              {[['incidents', '#ef4444'], ['violations', '#f59e0b'], ['safetyScore', '#22d3ee']].map(([k, c]) => (
                <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={c} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a2540" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#94a3b8' }}
            />
            <Area type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} fill="url(#grad-incidents)" dot={false} />
            <Area type="monotone" dataKey="violations" stroke="#f59e0b" strokeWidth={2} fill="url(#grad-violations)" dot={false} />
            <Area type="monotone" dataKey="safetyScore" stroke="#22d3ee" strokeWidth={2} fill="url(#grad-safetyScore)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
