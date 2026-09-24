import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Share2, ExternalLink, CheckCircle2 } from 'lucide-react'
import { mockIncidents } from '../data/mockData'
import { severityColor, severityBg, calculateRisk } from '../services/riskEngine'

export default function Report() {
  const { id } = useParams()
  const nav = useNavigate()
  const inc = mockIncidents.find(i => i.id === id) ?? mockIncidents[0]
  const totalRisk = calculateRisk(inc.riskFactors)

  const actions = [
    'Immediately stop all unsafe work in the affected zone.',
    'Verify full PPE compliance before allowing any worker to re-enter.',
    'Notify the site safety manager and record the incident in the safety log.',
    `Review Zone ${inc.zone.slice(-2)} access controls and safety signage.`,
    'Record corrective action taken and follow-up date.',
  ]

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      {/* Back */}
      <button onClick={() => nav(`/incidents/${inc.id}`)} style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20,
        background: 'none', border: 'none', color: '#64748b', fontSize: 12, cursor: 'pointer'
      }}>
        <ArrowLeft size={14} /> Back to Incident
      </button>

      {/* Report header card */}
      <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '20px 24px', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>AI Incident Report</h1>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#22c55e', background: 'rgba(34,197,94,0.12)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em' }}>GENERATED</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>
              Incident <span style={{ fontFamily: 'JetBrains Mono, monospace', color: '#3b82f6' }}>{inc.incidentId}</span>
              {' '}· Generated {inc.date} · {inc.time}
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 7, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#4ade80', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
              <Download size={13} /> PDF
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 7, background: '#060a12', border: '1px solid #1a2540', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>
              <Share2 size={13} /> Share
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '7px 12px', borderRadius: 7, background: '#060a12', border: '1px solid #1a2540', color: '#64748b', fontSize: 12, cursor: 'pointer' }}>
              <ExternalLink size={13} /> Export
            </button>
          </div>
        </div>
      </div>

      {/* AI disclaimer */}
      <div style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 8, padding: '8px 14px', marginBottom: 20, fontSize: 11, color: '#22d3ee', display: 'flex', gap: 8, alignItems: 'center' }}>
        🤖 <span><strong>AI-Generated Report</strong> — This report was generated using the SiteGuard AI deterministic report engine. Gemini/OpenAI not configured — using fallback generator.</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Section 1 — Summary */}
        <Section title="01 — Incident Summary">
          <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
            Worker detected inside restricted {inc.zone} without required helmet. The AI detection system
            identified a high-risk safety violation at <strong style={{ color: '#f1f5f9' }}>{inc.time}</strong> on <strong style={{ color: '#f1f5f9' }}>{inc.date}</strong>.
            Camera <code style={{ fontFamily: 'JetBrains Mono, monospace', color: '#22d3ee', fontSize: 11 }}>{inc.camera}</code> captured
            the event with a confidence of 97%. Worker <strong style={{ color: '#f1f5f9' }}>{inc.workerId}</strong> was operating in a designated
            restricted zone without appropriate personal protective equipment.
          </p>
        </Section>

        {/* Section 2 — Detected conditions */}
        <Section title="02 — Detected Conditions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {inc.riskFactors.map(f => (
              <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ef4444', flexShrink: 0, display: 'block' }} />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{f.label}</span>
                <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 700, marginLeft: 'auto' }}>+{f.score} pts</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 3 — Risk */}
        <Section title="03 — Risk Assessment">
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 800, color: severityColor(inc.severity), letterSpacing: '-0.04em', lineHeight: 1 }}>
                {totalRisk}
              </div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 4 }}>out of 100</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ background: '#1a2540', borderRadius: 8, height: 12, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{
                  width: `${totalRisk}%`, height: '100%',
                  background: `linear-gradient(90deg, #22c55e 0%, #f59e0b 50%, #ef4444 100%)`,
                  borderRadius: 8
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#475569' }}>
                <span>0 — LOW</span><span>30 — MED</span><span>60 — HIGH</span><span>80 — CRITICAL</span>
              </div>
            </div>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              color: severityColor(inc.severity), background: severityBg(inc.severity),
              padding: '6px 14px', borderRadius: 6
            }}>{inc.severity}</span>
          </div>
        </Section>

        {/* Section 4 — Recommended actions */}
        <Section title="04 — Recommended Actions">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {actions.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700, color: '#3b82f6', flexShrink: 0
                }}>{i + 1}</div>
                <p style={{ margin: 0, fontSize: 13, color: '#cbd5e1', lineHeight: 1.5 }}>{a}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Section 5 — Evidence */}
        <Section title="05 — Evidence">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {/* Frame */}
            <div style={{ background: '#060a12', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(239,68,68,0.3)', aspectRatio: '16/9', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(59,130,246,0.02) 20px, rgba(59,130,246,0.02) 21px)'
              }} />
              <div style={{ position: 'absolute', left: '40%', top: '15%', width: '18%', height: '55%', border: '2px solid #ef4444', borderRadius: 2 }}>
                <div style={{ position: 'absolute', top: -18, left: 0, background: '#ef4444', fontSize: 7, color: '#fff', fontWeight: 700, padding: '1px 4px', whiteSpace: 'nowrap' }}>NO HELMET</div>
              </div>
              <div style={{ position: 'absolute', bottom: 6, left: 6, fontSize: 8, color: '#64748b', fontFamily: 'JetBrains Mono, monospace' }}>EVIDENCE FRAME · {inc.camera}</div>
            </div>
            {/* Metadata */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Timestamp', `${inc.date} ${inc.time}`],
                ['Camera', inc.camera],
                ['Zone', inc.zone],
                ['Worker ID', inc.workerId],
                ['Detection Type', inc.detection],
                ['Confidence', '97%'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #111827', paddingBottom: 8 }}>
                  <span style={{ fontSize: 11, color: '#475569' }}>{k}</span>
                  <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: k === 'Camera' || k === 'Worker ID' ? 'JetBrains Mono, monospace' : undefined }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Sign-off */}
        <div style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)', borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <CheckCircle2 size={16} color="#4ade80" />
          <span style={{ fontSize: 12, color: '#4ade80', fontWeight: 600 }}>Report generated by SiteGuard AI — deterministic fallback engine — {inc.date}</span>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
      <h2 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{title}</h2>
      {children}
    </div>
  )
}
