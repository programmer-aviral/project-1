export type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
export type IncidentStatus = 'OPEN' | 'ACKNOWLEDGED' | 'RESOLVED'
export type ZoneRisk = 'RESTRICTED' | 'HIGH' | 'CAUTION' | 'SAFE'

export interface Alert {
  id: string
  severity: Severity
  message: string
  zone: string
  timestamp: string
  workerId?: string
}

export interface Incident {
  id: string
  incidentId: string
  timestamp: string
  date: string
  time: string
  zone: string
  detection: string
  riskScore: number
  severity: Severity
  status: IncidentStatus
  camera: string
  workerId: string
  riskFactors: RiskFactor[]
  aiRecommendation: string
  evidenceUrl?: string
}

export interface RiskFactor {
  label: string
  score: number
}

export interface Zone {
  id: string
  name: string
  risk: ZoneRisk
  workers: number
  cameras: number
  incidentsToday: number
  x: number
  y: number
  width: number
  height: number
}

export interface Camera {
  id: string
  name: string
  zone: string
  status: 'ONLINE' | 'OFFLINE' | 'RECORDING'
  feed?: string
}

export interface DetectionEvent {
  id: string
  label: string
  confidence: number
  timestamp: string
  zone: string
  severity: Severity
  workerId?: string
}

export interface TrendPoint {
  day: string
  incidents: number
  violations: number
  safetyScore: number
}

export interface ToastMessage {
  id: string
  type: 'critical' | 'warning' | 'info' | 'success'
  title: string
  body: string
}
