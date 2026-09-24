import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, ClipboardList, FileText, AlertOctagon, MapPin, Clock, Camera } from 'lucide-react'
import { mockIncidents } from '../data/mockData'
import { severityColor, severityBg, calculateRisk } from '../services/riskEngine'

export default function IncidentDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const inc = mockIncidents.find(i => i.id === id) ?? mockIncidents[0]
  const totalRisk = calculateRisk(inc.riskFactors)

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      {/* Back */}
      <button onClick={() => nav('/incidents')} style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20,
        background: 'none', border: 'none', color: '#64748b', fontSize: 12, cursor: 'pointer'
      }}>
        <ArrowLeft size={14} /> Back to Incidents
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, fontFamily: 'JetBrains Mono, monospace' }}>
              {inc.incidentId}
            </h1>
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              color: severityColor(inc.severity), background: severityBg(inc.severity),
              padding: '4px 10px', borderRadius: 5
            }}>{inc.severity}</span>
          </div>
          <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#64748b' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><MapPin size={12} /> {inc.zone}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Clock size={12} /> {inc.date} · {inc.time}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Camera size={12} /> {inc.camera}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => nav(`/reports/${inc.id}`)} style={{
            padding: '8px 16px', borderRadius: 8, background: 'rgba(59,130,246,0.1)',
            border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6
          }}>
            <FileText size={13} /> Generate Report
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* What happened */}
          <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>What happened?</h2>
            <p style={{ margin: 0, fontSize: 14, color: '#cbd5e1', lineHeight: 1.6 }}>
              A worker entered a restricted construction zone without the required helmet.
              Worker #{inc.workerId} was detected by {inc.camera} at {inc.time} in {inc.zone},
              which is classified as a restricted area requiring full PPE compliance.
            </p>
          </div>

          {/* Evidence frame */}
          <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Evidence Capture</h2>
            <div style={{
              background: '#060a12', borderRadius: 8, overflow: 'hidden',
              position: 'relative', aspectRatio: '16/9',
              border: '1px solid rgba(239,68,68,0.3)'
            }}>
              {/* Simulated capture */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(59,130,246,0.02) 30px, rgba(59,130,246,0.02) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(59,130,246,0.02) 30px, rgba(59,130,246,0.02) 31px)'
              }} />
              <div style={{
                position: 'absolute', left: '45%', top: '20%', width: '15%', height: '55%',
                border: '2px solid #ef4444', borderRadius: 2
              }}>
                <div style={{ position: 'absolute', top: -20, left: 0, background: '#ef4444', fontSize: 8, color: '#fff', fontWeight: 700, padding: '2px 5px', whiteSpace: 'nowrap' }}>
                  WORKER {inc.workerId} — 98%
                </div>
                <div style={{ position: 'absolute', top: 4, right: -70, background: 'rgba(239,68,68,0.9)', fontSize: 8, color: '#fff', padding: '2px 5px', borderRadius: 2, whiteSpace: 'nowrap' }}>
                  ⚠ NO HELMET
                </div>
              </div>
              <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.7)', borderRadius: 4, padding: '3px 7px', fontSize: 9, color: '#e2e8f0' }}>
                {inc.camera} · {inc.time}
              </div>
              <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: 4, padding: '3px 7px', fontSize: 9, color: '#f87171', fontWeight: 700 }}>
                EVIDENCE CAPTURED
              </div>
            </div>
          </div>

          {/* AI Recommendation */}
          <div style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.2)', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(34,211,238,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 14 }}>🤖</span>
              </div>
              <h2 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#22d3ee' }}>AI Recommendation</h2>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.6 }}>{inc.aiRecommendation}</p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              flex: 1, padding: '10px', borderRadius: 8, background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.25)', color: '#4ade80', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              <CheckCircle size={14} /> Acknowledge
            </button>
            <button style={{
              flex: 1, padding: '10px', borderRadius: 8, background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              <ClipboardList size={14} /> Assign Action
            </button>
            <button onClick={() => nav(`/reports/${inc.id}`)} style={{
              flex: 1, padding: '10px', borderRadius: 8, background: 'rgba(59,130,246,0.1)',
              border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              <FileText size={14} /> Generate Report
            </button>
          </div>
        </div>

        {/* Right — Risk Analysis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
            <h2 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>Risk Analysis</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {inc.riskFactors.map(f => (
                <div key={f.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{f.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b' }}>+{f.score}</span>
                  </div>
                  <div style={{ background: '#1a2540', borderRadius: 3, height: 4 }}>
                    <div style={{ width: `${(f.score / 50) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: 3 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div style={{ borderTop: '1px solid #1a2540', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: '#64748b' }}>Total Risk Score</span>
                <span style={{ fontSize: 28, fontWeight: 800, color: severityColor(inc.severity), letterSpacing: '-0.03em' }}>
                  {totalRisk}<span style={{ fontSize: 14, color: '#475569' }}>/100</span>
                </span>
              </div>
              <div style={{ background: '#1a2540', borderRadius: 6, height: 10, overflow: 'hidden' }}>
                <div style={{
                  width: `${totalRisk}%`, height: '100%',
                  background: `linear-gradient(90deg, #f59e0b 0%, ${severityColor(inc.severity)} 100%)`,
                  borderRadius: 6
                }} />
              </div>
              <div style={{ marginTop: 10, textAlign: 'center' }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                  color: severityColor(inc.severity), background: severityBg(inc.severity),
                  padding: '4px 12px', borderRadius: 5, display: 'inline-block'
                }}>{inc.severity}</span>
              </div>
            </div>
          </div>

          {/* Incident metadata */}
          <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Incident Details</h2>
            {[
              ['ID', inc.incidentId],
              ['Worker', inc.workerId],
              ['Camera', inc.camera],
              ['Zone', inc.zone],
              ['Detection', inc.detection],
              ['Date', inc.date],
              ['Time', inc.time],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #111827' }}>
                <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>{k}</span>
                <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: k === 'ID' || k === 'Camera' ? 'JetBrains Mono, monospace' : undefined }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
