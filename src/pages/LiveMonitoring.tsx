import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Pause, Camera, Maximize, Download, AlertOctagon, CheckCircle, Eye, BellRing } from 'lucide-react'
import { mockDetectionEvents, mockCameras } from '../data/mockData'
import { severityColor, severityBg } from '../services/riskEngine'

export default function LiveMonitoring() {
  const nav = useNavigate()
  const [paused, setPaused] = useState(false)
  const [selectedCam, setSelectedCam] = useState('CAM-03A')
  const [alertAcknowledged, setAlertAcknowledged] = useState(false)

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Live Monitoring</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>AI-powered real-time safety detection</p>
      </div>

      {/* Demo banner */}
      <div style={{
        background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.2)',
        borderRadius: 8, padding: '8px 14px', marginBottom: 16,
        display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#22d3ee'
      }}>
        <Eye size={13} />
        <strong>DEVELOPMENT MOCK DETECTION</strong> — Real YOLO inference not connected. Showing simulated detection overlay.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Video panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Main feed */}
          <div style={{
            background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, overflow: 'hidden',
            position: 'relative'
          }}>
            {/* Fake video frame */}
            <div style={{
              position: 'relative', background: '#060a12', overflow: 'hidden',
              aspectRatio: '16/9'
            }}>
              {/* Construction site bg */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(59,130,246,0.03) 40px, rgba(59,130,246,0.03) 41px),
                  repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(59,130,246,0.03) 40px, rgba(59,130,246,0.03) 41px)
                `,
              }} />

              {/* Ground surface */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', background: 'linear-gradient(0deg, #0a1020 0%, transparent 100%)' }} />

              {/* Scaffolding lines */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }}>
                <line x1="10%" y1="20%" x2="10%" y2="85%" stroke="#94a3b8" strokeWidth="2" />
                <line x1="30%" y1="20%" x2="30%" y2="85%" stroke="#94a3b8" strokeWidth="2" />
                <line x1="10%" y1="35%" x2="30%" y2="35%" stroke="#94a3b8" strokeWidth="1" />
                <line x1="10%" y1="55%" x2="30%" y2="55%" stroke="#94a3b8" strokeWidth="1" />
                <line x1="10%" y1="70%" x2="30%" y2="70%" stroke="#94a3b8" strokeWidth="1" />
              </svg>

              {/* Restricted zone overlay */}
              <div style={{
                position: 'absolute', left: '50%', top: '20%', width: '38%', height: '60%',
                border: '2px dashed rgba(239,68,68,0.7)',
                background: 'rgba(239,68,68,0.06)', borderRadius: 4,
              }}>
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: '#ef4444', color: '#fff', fontSize: 8, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 3, letterSpacing: '0.08em', whiteSpace: 'nowrap'
                }}>ZONE 03 — HIGH RISK</div>
              </div>

              {/* Worker bounding box (critical - in restricted zone) */}
              <div style={{
                position: 'absolute', left: '56%', top: '30%', width: '12%', height: '42%',
                border: '2px solid #ef4444', borderRadius: 2,
              }}>
                <div style={{
                  position: 'absolute', top: -20, left: 0,
                  background: '#ef4444', fontSize: 8, color: '#fff', fontWeight: 700,
                  padding: '1px 5px', whiteSpace: 'nowrap'
                }}>PERSON #17 — 98%</div>
                {/* Helmet missing indicator */}
                <div style={{
                  position: 'absolute', top: 2, right: -60,
                  background: 'rgba(239,68,68,0.9)', fontSize: 8, color: '#fff',
                  padding: '1px 4px', borderRadius: 2, whiteSpace: 'nowrap'
                }}>NO HELMET ⚠</div>
              </div>

              {/* Safe worker bounding box */}
              <div style={{
                position: 'absolute', left: '20%', top: '35%', width: '10%', height: '38%',
                border: '2px solid #22c55e', borderRadius: 2,
              }}>
                <div style={{
                  position: 'absolute', top: -20, left: 0,
                  background: '#22c55e', fontSize: 8, color: '#000', fontWeight: 700,
                  padding: '1px 5px', whiteSpace: 'nowrap'
                }}>PERSON — 96%</div>
                <div style={{
                  position: 'absolute', bottom: -18, left: 0,
                  fontSize: 8, color: '#22c55e', whiteSpace: 'nowrap'
                }}>HELMET 96% ✓</div>
              </div>

              {/* Camera info overlay */}
              <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 8 }}>
                <div style={{ background: 'rgba(0,0,0,0.75)', borderRadius: 4, padding: '4px 8px', fontSize: 10, color: '#e2e8f0' }}>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>●</span> REC {selectedCam}
                </div>
                <div style={{ background: 'rgba(0,0,0,0.75)', borderRadius: 4, padding: '4px 8px', fontSize: 10, color: '#64748b' }}>
                  10:42:07
                </div>
              </div>

              {/* AI overlay badge */}
              <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.3)', borderRadius: 4, padding: '4px 8px', fontSize: 10, color: '#22d3ee', fontWeight: 600 }}>
                AI ACTIVE · 24 FPS
              </div>

              {!paused ? null : (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>⏸ PAUSED</div>
                </div>
              )}
            </div>

            {/* Controls bar */}
            <div style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #1a2540' }}>
              <button onClick={() => setPaused(!paused)} style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6,
                background: '#1a2540', border: 'none', cursor: 'pointer', color: '#e2e8f0', fontSize: 12, fontWeight: 600
              }}>
                {paused ? <Play size={13} /> : <Pause size={13} />}
                {paused ? 'Resume' : 'Pause'}
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, background: '#1a2540', border: 'none', cursor: 'pointer', color: '#e2e8f0', fontSize: 12 }}>
                <Download size={13} /> Snapshot
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 6, background: '#1a2540', border: 'none', cursor: 'pointer', color: '#e2e8f0', fontSize: 12 }}>
                <Maximize size={13} /> Fullscreen
              </button>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
                <span className="pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                RECORDING
              </div>
            </div>
          </div>

          {/* Camera selector */}
          <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 10, padding: '14px 16px' }}>
            <p style={{ margin: '0 0 10px', fontSize: 11, color: '#64748b', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Camera Select</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['CAM-01A', 'CAM-02A', 'CAM-03A', 'CAM-03B', 'CAM-04A'].map(cam => (
                <button key={cam} onClick={() => setSelectedCam(cam)} style={{
                  padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer',
                  border: selectedCam === cam ? '1px solid #3b82f6' : '1px solid #1a2540',
                  background: selectedCam === cam ? 'rgba(59,130,246,0.15)' : '#060a12',
                  color: selectedCam === cam ? '#3b82f6' : '#64748b',
                  display: 'flex', alignItems: 'center', gap: 5
                }}>
                  <Camera size={11} /> {cam}
                </button>
              ))}
            </div>
          </div>

          {/* Critical alert panel */}
          {!alertAcknowledged && (
            <div style={{
              background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.35)',
              borderRadius: 12, padding: '16px 20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <AlertOctagon size={18} color="#ef4444" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: '0.04em' }}>CRITICAL SAFETY EVENT</span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: 14, color: '#f1f5f9', fontWeight: 600 }}>
                Worker #17 detected inside restricted Zone 03 without required helmet.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 11, color: '#64748b' }}>Risk Score:</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#ef4444' }}>90 / 100</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => setAlertAcknowledged(true)} style={{
                  padding: '7px 14px', borderRadius: 7, background: 'rgba(239,68,68,0.15)',
                  border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5
                }}>
                  <CheckCircle size={13} /> Acknowledge
                </button>
                <button onClick={() => nav('/incidents/1')} style={{
                  padding: '7px 14px', borderRadius: 7, background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.25)', color: '#3b82f6', fontSize: 12, fontWeight: 600, cursor: 'pointer'
                }}>
                  View Incident
                </button>
                <button style={{
                  padding: '7px 14px', borderRadius: 7, background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5
                }}>
                  <BellRing size={13} /> Notify Supervisor
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar — detection events */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '16px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#e2e8f0', letterSpacing: '-0.01em' }}>
            Detection Events
          </h2>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto' }}>
            {mockDetectionEvents.map(ev => (
              <div key={ev.id} style={{
                background: '#060a12', borderRadius: 8, padding: '10px 12px',
                borderLeft: `3px solid ${severityColor(ev.severity)}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: severityColor(ev.severity),
                    background: severityBg(ev.severity), padding: '2px 5px', borderRadius: 3, letterSpacing: '0.06em'
                  }}>{ev.severity}</span>
                  <span style={{ fontSize: 9, color: '#475569', fontFamily: 'JetBrains Mono, monospace' }}>{ev.timestamp}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, color: '#cbd5e1', fontWeight: 600 }}>{ev.label}</p>
                <div style={{ marginTop: 3, fontSize: 10, color: '#475569' }}>
                  {ev.zone} · {ev.confidence * 100 | 0}% conf
                  {ev.workerId && <span> · {ev.workerId}</span>}
                </div>
              </div>
            ))}
          </div>
          {/* Risk score meter */}
          <div style={{ marginTop: 16, background: '#060a12', borderRadius: 8, padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 600 }}>Current Risk Score</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#ef4444' }}>90</span>
            </div>
            <div style={{ background: '#1a2540', borderRadius: 4, height: 6, overflow: 'hidden' }}>
              <div style={{ width: '90%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: 4 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9, color: '#475569' }}>
              <span>0</span><span>LOW</span><span>MED</span><span>HIGH</span><span>CRITICAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
