import { useNavigate } from 'react-router-dom'
import { FileText, Download, ExternalLink } from 'lucide-react'
import { mockIncidents } from '../data/mockData'
import { severityColor, severityBg } from '../services/riskEngine'

export default function ReportsList() {
  const nav = useNavigate()
  const generated = mockIncidents.slice(0, 4)

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Reports</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>AI-generated incident reports</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {generated.map(inc => (
          <div key={inc.id} style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileText size={16} color="#3b82f6" />
              </div>
              <span style={{ fontSize: 9, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.12)', padding: '3px 7px', borderRadius: 4, letterSpacing: '0.06em' }}>GENERATED</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>{inc.incidentId}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{inc.date} · {inc.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: severityColor(inc.severity), background: severityBg(inc.severity), padding: '3px 7px', borderRadius: 4 }}>{inc.severity}</span>
              <span style={{ fontSize: 11, color: '#64748b' }}>{inc.zone}</span>
            </div>
            <p style={{ margin: 0, fontSize: 11, color: '#94a3b8', lineHeight: 1.5 }}>{inc.detection} — Risk Score {inc.riskScore}/100</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => nav(`/reports/${inc.id}`)} style={{
                flex: 1, padding: '7px', borderRadius: 7, background: 'rgba(59,130,246,0.08)',
                border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6', fontSize: 11, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
              }}>
                <ExternalLink size={12} /> View
              </button>
              <button style={{
                padding: '7px 10px', borderRadius: 7, background: '#060a12',
                border: '1px solid #1a2540', color: '#64748b', fontSize: 11, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4
              }}>
                <Download size={12} /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
