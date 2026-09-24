import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Download, ChevronRight } from 'lucide-react'
import { mockIncidents } from '../data/mockData'
import { severityColor, severityBg } from '../services/riskEngine'
import type { Severity, IncidentStatus } from '../types'

const STATUS_COLOR: Record<IncidentStatus, string> = {
  OPEN: '#ef4444',
  ACKNOWLEDGED: '#f59e0b',
  RESOLVED: '#22c55e',
}

export default function Incidents() {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [filterSeverity, setFilterSeverity] = useState<Severity | 'ALL'>('ALL')
  const [filterStatus, setFilterStatus] = useState<IncidentStatus | 'ALL'>('ALL')

  const filtered = mockIncidents.filter(inc => {
    const matchSearch = inc.incidentId.toLowerCase().includes(search.toLowerCase()) ||
      inc.detection.toLowerCase().includes(search.toLowerCase()) ||
      inc.zone.toLowerCase().includes(search.toLowerCase())
    const matchSev = filterSeverity === 'ALL' || inc.severity === filterSeverity
    const matchStatus = filterStatus === 'ALL' || inc.status === filterStatus
    return matchSearch && matchSev && matchStatus
  })

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Incident History</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>Complete log of all detected safety events</p>
      </div>

      {/* Filters */}
      <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '16px 20px', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 220px' }}>
            <Search size={13} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search incidents..."
              style={{
                width: '100%', padding: '7px 10px 7px 30px', background: '#060a12',
                border: '1px solid #1a2540', borderRadius: 7, color: '#e2e8f0', fontSize: 12,
                outline: 'none',
              }}
            />
          </div>

          {/* Severity filter */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(s => (
              <button key={s} onClick={() => setFilterSeverity(s)} style={{
                padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: filterSeverity === s ? `1px solid ${s === 'ALL' ? '#3b82f6' : severityColor(s as Severity)}` : '1px solid #1a2540',
                background: filterSeverity === s ? (s === 'ALL' ? 'rgba(59,130,246,0.12)' : severityBg(s as Severity)) : '#060a12',
                color: filterSeverity === s ? (s === 'ALL' ? '#3b82f6' : severityColor(s as Severity)) : '#64748b',
              }}>
                {s}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div style={{ display: 'flex', gap: 6 }}>
            {(['ALL', 'OPEN', 'ACKNOWLEDGED', 'RESOLVED'] as const).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)} style={{
                padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                border: filterStatus === s ? `1px solid ${s === 'ALL' ? '#3b82f6' : STATUS_COLOR[s as IncidentStatus]}` : '1px solid #1a2540',
                background: filterStatus === s ? (s === 'ALL' ? 'rgba(59,130,246,0.12)' : STATUS_COLOR[s as IncidentStatus] + '18') : '#060a12',
                color: filterStatus === s ? (s === 'ALL' ? '#3b82f6' : STATUS_COLOR[s as IncidentStatus]) : '#64748b',
              }}>
                {s}
              </button>
            ))}
          </div>

          <button style={{
            marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
            borderRadius: 7, background: '#060a12', border: '1px solid #1a2540',
            color: '#64748b', fontSize: 12, cursor: 'pointer'
          }}>
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1a2540' }}>
              {['Incident ID', 'Date & Time', 'Zone', 'Detection', 'Risk Score', 'Severity', 'Status', 'Action'].map(h => (
                <th key={h} style={{
                  padding: '12px 16px', textAlign: 'left',
                  fontSize: 10, fontWeight: 700, color: '#475569',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((inc, i) => (
              <tr key={inc.id}
                onClick={() => nav(`/incidents/${inc.id}`)}
                style={{
                  borderBottom: i < filtered.length - 1 ? '1px solid #111827' : 'none',
                  cursor: 'pointer', transition: 'background 0.1s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0f1829')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 16px' }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#3b82f6', fontWeight: 600 }}>{inc.incidentId}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ fontSize: 12, color: '#e2e8f0' }}>{inc.date}</div>
                  <div style={{ fontSize: 10, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>{inc.time}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#94a3b8' }}>{inc.zone}</td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#cbd5e1' }}>{inc.detection}</td>
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ background: '#1a2540', borderRadius: 3, height: 4, width: 60, overflow: 'hidden' }}>
                      <div style={{ width: `${inc.riskScore}%`, height: '100%', background: severityColor(inc.severity) }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: severityColor(inc.severity) }}>{inc.riskScore}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: '0.08em',
                    color: severityColor(inc.severity), background: severityBg(inc.severity),
                    padding: '3px 7px', borderRadius: 4
                  }}>{inc.severity}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <span style={{
                    fontSize: 10, fontWeight: 600,
                    color: STATUS_COLOR[inc.status],
                    background: STATUS_COLOR[inc.status] + '18',
                    padding: '3px 8px', borderRadius: 4
                  }}>{inc.status}</span>
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <ChevronRight size={14} color="#475569" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#475569', fontSize: 13 }}>
            No incidents match your filters.
          </div>
        )}
      </div>
    </div>
  )
}
