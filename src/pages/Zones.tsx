import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Settings2, Users, Camera, AlertTriangle } from 'lucide-react'
import { mockZones } from '../data/mockData'

const ZONE_RISK_COLOR: Record<string, string> = {
  RESTRICTED: '#ef4444',
  HIGH: '#f97316',
  CAUTION: '#f59e0b',
  SAFE: '#22c55e',
}

const ZONE_RISK_BG: Record<string, string> = {
  RESTRICTED: 'rgba(239,68,68,0.08)',
  HIGH: 'rgba(249,115,22,0.08)',
  CAUTION: 'rgba(245,158,11,0.08)',
  SAFE: 'rgba(34,197,94,0.08)',
}

export default function Zones() {
  const nav = useNavigate()
  const [selected, setSelected] = useState<string | null>(null)
  const selectedZone = mockZones.find(z => z.id === selected)

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Zone Management</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>Site zone configuration and risk monitoring</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        {/* Map */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
          <h2 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Site Map</h2>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
            {Object.entries(ZONE_RISK_COLOR).map(([k, c]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: '#64748b' }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: c + '40', border: `1px solid ${c}`, display: 'block' }} />
                {k}
              </div>
            ))}
          </div>

          <div style={{
            position: 'relative', background: '#060a12', borderRadius: 10,
            height: 460, overflow: 'hidden', border: '1px solid #1a2540'
          }}>
            {/* Grid */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={i}>
                  <line x1={`${i * 8.33}%`} y1="0" x2={`${i * 8.33}%`} y2="100%" stroke="#3b82f6" strokeWidth="1" />
                  <line x1="0" y1={`${i * 8.33}%`} x2="100%" y2={`${i * 8.33}%`} stroke="#3b82f6" strokeWidth="1" />
                </g>
              ))}
            </svg>

            {mockZones.map(z => {
              const color = ZONE_RISK_COLOR[z.risk]
              const isSelected = selected === z.id
              return (
                <div key={z.id}
                  onClick={() => setSelected(isSelected ? null : z.id)}
                  style={{
                    position: 'absolute',
                    left: `${z.x}%`, top: `${z.y}%`,
                    width: `${z.width}%`, height: `${z.height}%`,
                    border: `${isSelected ? 2 : 1}px solid ${color}`,
                    background: isSelected ? color + '28' : color + '12',
                    borderRadius: 8, cursor: 'pointer',
                    padding: '10px 12px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    transition: 'all 0.15s',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color, letterSpacing: '0.03em' }}>{z.name}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color, letterSpacing: '0.1em', marginTop: 2 }}>{z.risk}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, fontSize: 10, color: '#64748b' }}>
                    <span>👷 {z.workers}</span>
                    <span>📷 {z.cameras}</span>
                    {z.incidentsToday > 0 && <span style={{ color: '#f87171' }}>⚠ {z.incidentsToday}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Zone cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mockZones.map(z => {
            const color = ZONE_RISK_COLOR[z.risk]
            const isSelected = selected === z.id
            return (
              <div key={z.id}
                onClick={() => setSelected(isSelected ? null : z.id)}
                style={{
                  background: isSelected ? ZONE_RISK_BG[z.risk] : '#0d1320',
                  border: `1px solid ${isSelected ? color + '50' : '#1a2540'}`,
                  borderLeft: `3px solid ${color}`,
                  borderRadius: 10, padding: '14px 16px', cursor: 'pointer', transition: 'all 0.15s'
                }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{z.name}</h3>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color, background: color + '20', padding: '3px 7px', borderRadius: 4 }}>{z.risk}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
                  {[
                    [Users, z.workers, 'Workers'],
                    [Camera, z.cameras, 'Cameras'],
                    [AlertTriangle, z.incidentsToday, 'Today'],
                  ].map(([Icon, val, label], i) => (
                    <div key={i} style={{ background: '#060a12', borderRadius: 6, padding: '8px', textAlign: 'center' }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: label === 'Today' && (val as number) > 0 ? '#f87171' : '#f1f5f9' }}>{val as number}</div>
                      <div style={{ fontSize: 9, color: '#475569', marginTop: 2 }}>{label as string}</div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={e => { e.stopPropagation(); nav('/settings') }}
                  style={{
                    marginTop: 12, width: '100%', padding: '7px', borderRadius: 7,
                    background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                    color: '#3b82f6', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
                  }}>
                  <Settings2 size={12} /> Manage Zone
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
