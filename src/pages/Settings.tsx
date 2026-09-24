import { useState } from 'react'
import { Save, AlertTriangle } from 'lucide-react'

const cameras = [
  { id: 'CAM-01A', zone: 'Zone 01', status: 'RECORDING', resolution: '1080p', fps: 30 },
  { id: 'CAM-02A', zone: 'Zone 02', status: 'ONLINE', resolution: '1080p', fps: 25 },
  { id: 'CAM-03A', zone: 'Zone 03', status: 'RECORDING', resolution: '4K', fps: 30 },
  { id: 'CAM-04A', zone: 'Zone 04', status: 'ONLINE', resolution: '1080p', fps: 25 },
]

export default function Settings() {
  const [thresholds, setThresholds] = useState({ critical: 80, high: 60, medium: 30, low: 0 })
  const [notifyEmail, setNotifyEmail] = useState(true)
  const [notifySMS, setNotifySMS] = useState(false)
  const [notifySlack, setNotifySlack] = useState(true)
  const [aiProvider, setAiProvider] = useState('gemini')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ padding: 24, maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>System configuration and preferences</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Alert thresholds */}
        <Card title="Alert Thresholds">
          <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#fbbf24' }}>
            <AlertTriangle size={14} /> Risk thresholds are configurable. Changes affect how incidents are classified in real-time.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
            {[
              { label: 'Critical', key: 'critical' as const, color: '#ef4444', range: '80–100' },
              { label: 'High', key: 'high' as const, color: '#f97316', range: '60–79' },
              { label: 'Medium', key: 'medium' as const, color: '#f59e0b', range: '30–59' },
              { label: 'Low', key: 'low' as const, color: '#22c55e', range: '0–29' },
            ].map(t => (
              <div key={t.key} style={{ background: '#060a12', borderRadius: 8, padding: '12px', borderTop: `2px solid ${t.color}` }}>
                <p style={{ margin: '0 0 8px', fontSize: 10, fontWeight: 700, color: t.color, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t.label}</p>
                <input
                  type="number"
                  value={thresholds[t.key]}
                  onChange={e => setThresholds(prev => ({ ...prev, [t.key]: parseInt(e.target.value) || 0 }))}
                  style={{ width: '100%', background: '#0d1320', border: '1px solid #1a2540', borderRadius: 6, padding: '6px 8px', color: '#f1f5f9', fontSize: 16, fontWeight: 700, outline: 'none', fontFamily: 'JetBrains Mono, monospace' }}
                />
                <p style={{ margin: '6px 0 0', fontSize: 10, color: '#475569' }}>Range: {t.range}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Camera management */}
        <Card title="Camera Management">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cameras.map(cam => (
              <div key={cam.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px', background: '#060a12', borderRadius: 8, gap: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: cam.status === 'RECORDING' ? '#ef4444' : '#22c55e', flexShrink: 0 }} className={cam.status === 'RECORDING' ? 'pulse' : ''} />
                <span style={{ fontSize: 12, fontWeight: 700, color: '#e2e8f0', fontFamily: 'JetBrains Mono, monospace', width: 80 }}>{cam.id}</span>
                <span style={{ fontSize: 11, color: '#64748b', flex: 1 }}>{cam.zone}</span>
                <span style={{ fontSize: 10, color: '#64748b' }}>{cam.resolution} · {cam.fps}fps</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: cam.status === 'RECORDING' ? '#f87171' : '#4ade80', background: cam.status === 'RECORDING' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em' }}>{cam.status}</span>
                <button style={{ padding: '5px 10px', borderRadius: 6, background: '#1a2540', border: 'none', color: '#64748b', fontSize: 11, cursor: 'pointer' }}>Configure</button>
              </div>
            ))}
          </div>
        </Card>

        {/* Notifications */}
        <Card title="Notification Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Email Notifications', sub: 'Send alerts to supervisor@siteguard.ai', val: notifyEmail, set: setNotifyEmail },
              { label: 'SMS Notifications', sub: 'Send critical alerts to +1 (555) 0198', val: notifySMS, set: setNotifySMS },
              { label: 'Slack Integration', sub: 'Post alerts to #safety-alerts channel', val: notifySlack, set: setNotifySlack },
            ].map(n => (
              <div key={n.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#060a12', borderRadius: 8 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>{n.label}</div>
                  <div style={{ fontSize: 11, color: '#475569', marginTop: 2 }}>{n.sub}</div>
                </div>
                <button
                  onClick={() => n.set(!n.val)}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                    background: n.val ? '#3b82f6' : '#1a2540',
                    position: 'relative', transition: 'background 0.2s', flexShrink: 0
                  }}
                >
                  <span style={{
                    position: 'absolute', top: 3, left: n.val ? 22 : 4, width: 18, height: 18,
                    borderRadius: '50%', background: '#fff', transition: 'left 0.2s', display: 'block'
                  }} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* AI configuration */}
        <Card title="AI Configuration">
          <div style={{ background: 'rgba(34,211,238,0.05)', border: '1px solid rgba(34,211,238,0.15)', borderRadius: 8, padding: '10px 14px', marginBottom: 14, fontSize: 11, color: '#22d3ee' }}>
            🔐 API keys are read from environment variables only. Never store keys in frontend code. Set <code style={{ fontFamily: 'JetBrains Mono, monospace', background: '#060a12', padding: '1px 5px', borderRadius: 3 }}>VITE_AI_PROVIDER</code> and <code style={{ fontFamily: 'JetBrains Mono, monospace', background: '#060a12', padding: '1px 5px', borderRadius: 3 }}>AI_API_KEY</code> in your <code style={{ fontFamily: 'JetBrains Mono, monospace', background: '#060a12', padding: '1px 5px', borderRadius: 3 }}>.env</code>.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 11, color: '#64748b', fontWeight: 600 }}>AI Provider</label>
              <select value={aiProvider} onChange={e => setAiProvider(e.target.value)} style={{ width: '100%', padding: '8px 10px', background: '#060a12', border: '1px solid #1a2540', borderRadius: 7, color: '#e2e8f0', fontSize: 12, outline: 'none' }}>
                <option value="gemini">Google Gemini</option>
                <option value="openai">OpenAI GPT-4</option>
                <option value="fallback">Deterministic Fallback</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 11, color: '#64748b', fontWeight: 600 }}>Vision Model</label>
              <select style={{ width: '100%', padding: '8px 10px', background: '#060a12', border: '1px solid #1a2540', borderRadius: 7, color: '#e2e8f0', fontSize: 12, outline: 'none' }}>
                <option>Mock Detection (Development)</option>
                <option>YOLOv8-PPE (Production)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleSave} style={{
            display: 'flex', alignItems: 'center', gap: 7, padding: '10px 24px', borderRadius: 9,
            background: saved ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)',
            border: `1px solid ${saved ? 'rgba(34,197,94,0.4)' : 'rgba(59,130,246,0.4)'}`,
            color: saved ? '#4ade80' : '#3b82f6', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s'
          }}>
            <Save size={14} /> {saved ? '✓ Saved' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: 20 }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 700, color: '#e2e8f0' }}>{title}</h2>
      {children}
    </div>
  )
}
