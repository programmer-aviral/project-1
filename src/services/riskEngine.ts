import type { RiskFactor, Severity } from '../types'

const THRESHOLDS = {
  CRITICAL: 80,
  HIGH: 60,
  MEDIUM: 30,
  LOW: 0,
}

export function calculateRisk(factors: RiskFactor[]): number {
  const raw = factors.reduce((sum, f) => sum + f.score, 0)
  return Math.min(100, Math.max(0, raw))
}

export function getSeverity(score: number): Severity {
  if (score >= THRESHOLDS.CRITICAL) return 'CRITICAL'
  if (score >= THRESHOLDS.HIGH) return 'HIGH'
  if (score >= THRESHOLDS.MEDIUM) return 'MEDIUM'
  return 'LOW'
}

export function severityColor(severity: Severity): string {
  switch (severity) {
    case 'CRITICAL': return '#ef4444'
    case 'HIGH': return '#f97316'
    case 'MEDIUM': return '#f59e0b'
    case 'LOW': return '#22c55e'
  }
}

export function severityBg(severity: Severity): string {
  switch (severity) {
    case 'CRITICAL': return 'rgba(239,68,68,0.12)'
    case 'HIGH': return 'rgba(249,115,22,0.12)'
    case 'MEDIUM': return 'rgba(245,158,11,0.12)'
    case 'LOW': return 'rgba(34,197,94,0.12)'
  }
}

export const RISK_FACTORS_PPE = [
  { label: 'Missing Helmet', score: 30 },
  { label: 'Missing Safety Vest', score: 20 },
  { label: 'Restricted Zone Entry', score: 40 },
  { label: 'Unsafe Posture', score: 20 },
  { label: 'Poor Visibility', score: 10 },
  { label: 'No Safety Harness', score: 35 },
]
