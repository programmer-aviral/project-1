import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'
import { mockTrends } from '../data/mockData'

const severityData = [
  { name: 'Critical', value: 3, color: '#ef4444' },
  { name: 'High', value: 5, color: '#f97316' },
  { name: 'Medium', value: 8, color: '#f59e0b' },
  { name: 'Low', value: 11, color: '#22c55e' },
]

const violationsData = [
  { name: 'Helmet', value: 12, color: '#ef4444' },
  { name: 'Vest', value: 8, color: '#f97316' },
  { name: 'Restricted Zone', value: 6, color: '#f59e0b' },
  { name: 'Unsafe Movement', value: 4, color: '#3b82f6' },
]

const zoneRiskData = [
  { zone: 'Zone 01', riskScore: 28, incidents: 1 },
  { zone: 'Zone 02', riskScore: 54, incidents: 2 },
  { zone: 'Zone 03', riskScore: 91, incidents: 4 },
  { zone: 'Zone 04', riskScore: 73, incidents: 0 },
]

const FILTERS = ['Last 7 Days', 'Last 30 Days', 'This Quarter']
const ZONE_FILTERS = ['All Zones', 'Zone 01', 'Zone 02', 'Zone 03', 'Zone 04']
const SEV_FILTERS = ['All', 'Critical', 'High', 'Medium', 'Low']

export default function Analytics() {
  const [timeFilter, setTimeFilter] = useState('Last 7 Days')
  const [zoneFilter, setZoneFilter] = useState('All Zones')

  const kpis = [
    { label: 'Total Incidents', value: '27', change: '+4', up: true },
    { label: 'PPE Violations', value: '18', change: '+2', up: true },
    { label: 'Restricted Zone Events', value: '6', change: '-1', up: false },
    { label: 'Average Risk Score', value: '64', change: '+8', up: true },
  ]

  return (
    <div style={{ padding: 24, maxWidth: 1400, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9', margin: 0, letterSpacing: '-0.02em' }}>Safety Analytics</h1>
        <p style={{ fontSize: 13, color: '#64748b', margin: '4px 0 0' }}>Risk intelligence and violation trends</p>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button key={f} onClick={() => setTimeFilter(f)} style={{
            padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: timeFilter === f ? '1px solid #3b82f6' : '1px solid #1a2540',
            background: timeFilter === f ? 'rgba(59,130,246,0.1)' : '#0d1320',
            color: timeFilter === f ? '#3b82f6' : '#64748b',
          }}>{f}</button>
        ))}
        <div style={{ width: 1, background: '#1a2540' }} />
        {ZONE_FILTERS.map(f => (
          <button key={f} onClick={() => setZoneFilter(f)} style={{
            padding: '6px 12px', borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            border: zoneFilter === f ? '1px solid #22d3ee' : '1px solid #1a2540',
            background: zoneFilter === f ? 'rgba(34,211,238,0.08)' : '#0d1320',
            color: zoneFilter === f ? '#22d3ee' : '#64748b',
          }}>{f}</button>
        ))}
      </div>

      {/* KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        {kpis.map(k => (
          <div key={k.label} style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '16px 18px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 11, color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.03em' }}>{k.value}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: k.up ? '#ef4444' : '#22c55e' }}>{k.change} this week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Incidents by severity (pie) */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '18px 16px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Incidents by Severity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={severityData} dataKey="value" cx="50%" cy="50%" outerRadius={75} innerRadius={42}>
                {severityData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 8, fontSize: 11 }} />
              <Legend iconType="circle" iconSize={8} formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 11 }}>{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Violations by type (bar) */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '18px 16px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Violations by Type</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={violationsData} margin={{ left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#1a2540" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {violationsData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk by zone (bar) */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '18px 16px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>Risk Score by Zone</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={zoneRiskData} margin={{ left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="2 4" stroke="#1a2540" vertical={false} />
              <XAxis dataKey="zone" tick={{ fill: '#475569', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 8, fontSize: 11 }} />
              <Bar dataKey="riskScore" radius={[4, 4, 0, 0]} fill="#3b82f6">
                {zoneRiskData.map((d, i) => (
                  <Cell key={i} fill={d.riskScore >= 80 ? '#ef4444' : d.riskScore >= 60 ? '#f97316' : d.riskScore >= 30 ? '#f59e0b' : '#22c55e'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend + AI insight row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        {/* 7-day trend */}
        <div style={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 12, padding: '18px 20px' }}>
          <h3 style={{ margin: '0 0 14px', fontSize: 13, fontWeight: 700, color: '#e2e8f0' }}>7-Day Incident Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockTrends} margin={{ left: -20 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="2 4" stroke="#1a2540" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#475569', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#0d1320', border: '1px solid #1a2540', borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={2} fill="url(#g1)" dot={{ fill: '#ef4444', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insight */}
        <div style={{ background: 'rgba(34,211,238,0.04)', border: '1px solid rgba(34,211,238,0.18)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(34,211,238,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🤖
            </div>
            <h3 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#22d3ee' }}>AI Safety Insight</h3>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
            Zone 03 generated the highest number of high-risk events this week.
            Review access controls and PPE compliance procedures for all workers assigned to this zone.
          </p>
          <div style={{ background: '#060a12', borderRadius: 8, padding: '12px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 10, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Risk Zone</p>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>Zone 03</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>4 incidents · Risk Score 91 · RESTRICTED</div>
          </div>
          <div style={{ background: '#060a12', borderRadius: 8, padding: '12px' }}>
            <p style={{ margin: '0 0 8px', fontSize: 10, color: '#475569', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Top Violation</p>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#f59e0b', marginBottom: 4 }}>Missing Helmet</div>
            <div style={{ fontSize: 12, color: '#64748b' }}>12 events this week — 40% of total</div>
          </div>
        </div>
      </div>
    </div>
  )
}
