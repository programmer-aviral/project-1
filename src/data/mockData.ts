import type { Alert, Incident, Zone, Camera, DetectionEvent, TrendPoint } from '../types'

export const mockAlerts: Alert[] = [
  { id: 'a1', severity: 'CRITICAL', message: 'Worker without helmet in Zone 3', zone: 'Zone 03', timestamp: '2 min ago', workerId: 'W-17' },
  { id: 'a2', severity: 'HIGH', message: 'Restricted zone entry detected', zone: 'Zone 03', timestamp: '8 min ago', workerId: 'W-09' },
  { id: 'a3', severity: 'MEDIUM', message: 'Safety vest not detected', zone: 'Zone 01', timestamp: '14 min ago', workerId: 'W-23' },
  { id: 'a4', severity: 'LOW', message: 'Worker proximity alert', zone: 'Zone 02', timestamp: '22 min ago', workerId: 'W-05' },
  { id: 'a5', severity: 'HIGH', message: 'No safety harness near edge', zone: 'Zone 04', timestamp: '35 min ago', workerId: 'W-31' },
]

export const mockIncidents: Incident[] = [
  {
    id: '1', incidentId: 'SG-2026-0042',
    timestamp: '2026-09-24T10:42:00', date: '24 Sep 2026', time: '10:42 AM',
    zone: 'Zone 03', detection: 'Missing Helmet', riskScore: 100, severity: 'CRITICAL',
    status: 'OPEN', camera: 'CAM-03A', workerId: 'W-17',
    riskFactors: [
      { label: 'Missing Helmet', score: 30 },
      { label: 'Restricted Zone', score: 40 },
      { label: 'Unsafe Posture', score: 20 },
      { label: 'Poor Visibility', score: 10 },
    ],
    aiRecommendation: 'Immediately notify the site supervisor and verify PPE compliance before allowing continued work in the restricted zone.',
  },
  {
    id: '2', incidentId: 'SG-2026-0041',
    timestamp: '2026-09-24T10:21:00', date: '24 Sep 2026', time: '10:21 AM',
    zone: 'Zone 02', detection: 'Restricted Zone Entry', riskScore: 72, severity: 'HIGH',
    status: 'RESOLVED', camera: 'CAM-02B', workerId: 'W-09',
    riskFactors: [
      { label: 'Restricted Zone', score: 40 },
      { label: 'Unsafe Posture', score: 20 },
      { label: 'Poor Visibility', score: 12 },
    ],
    aiRecommendation: 'Review access control measures for Zone 02 and ensure all workers have required clearance.',
  },
  {
    id: '3', incidentId: 'SG-2026-0040',
    timestamp: '2026-09-24T09:55:00', date: '24 Sep 2026', time: '09:55 AM',
    zone: 'Zone 01', detection: 'Missing Safety Vest', riskScore: 48, severity: 'MEDIUM',
    status: 'RESOLVED', camera: 'CAM-01A', workerId: 'W-23',
    riskFactors: [
      { label: 'Missing Safety Vest', score: 20 },
      { label: 'Unsafe Posture', score: 18 },
      { label: 'Poor Visibility', score: 10 },
    ],
    aiRecommendation: 'Issue PPE violation notice and require worker to obtain safety vest before re-entering the zone.',
  },
  {
    id: '4', incidentId: 'SG-2026-0039',
    timestamp: '2026-09-24T09:12:00', date: '24 Sep 2026', time: '09:12 AM',
    zone: 'Zone 04', detection: 'No Safety Harness', riskScore: 85, severity: 'CRITICAL',
    status: 'ACKNOWLEDGED', camera: 'CAM-04A', workerId: 'W-31',
    riskFactors: [
      { label: 'No Safety Harness', score: 35 },
      { label: 'Restricted Zone', score: 40 },
      { label: 'Poor Visibility', score: 10 },
    ],
    aiRecommendation: 'Immediately halt elevated work. Worker must be equipped with approved harness and lanyard before returning to elevation.',
  },
  {
    id: '5', incidentId: 'SG-2026-0038',
    timestamp: '2026-09-24T08:44:00', date: '24 Sep 2026', time: '08:44 AM',
    zone: 'Zone 02', detection: 'Missing Helmet', riskScore: 62, severity: 'HIGH',
    status: 'RESOLVED', camera: 'CAM-02A', workerId: 'W-14',
    riskFactors: [
      { label: 'Missing Helmet', score: 30 },
      { label: 'Unsafe Posture', score: 22 },
      { label: 'Poor Visibility', score: 10 },
    ],
    aiRecommendation: 'Worker W-14 must obtain hard hat from site office. Log PPE violation in safety record.',
  },
  {
    id: '6', incidentId: 'SG-2026-0037',
    timestamp: '2026-09-24T08:21:00', date: '24 Sep 2026', time: '08:21 AM',
    zone: 'Zone 01', detection: 'Restricted Zone Entry', riskScore: 40, severity: 'MEDIUM',
    status: 'RESOLVED', camera: 'CAM-01B', workerId: 'W-07',
    riskFactors: [
      { label: 'Restricted Zone', score: 40 },
    ],
    aiRecommendation: 'Worker accessed zone without authorization. Review site induction records.',
  },
  {
    id: '7', incidentId: 'SG-2026-0036',
    timestamp: '2026-09-24T07:55:00', date: '24 Sep 2026', time: '07:55 AM',
    zone: 'Zone 03', detection: 'Missing Helmet', riskScore: 50, severity: 'MEDIUM',
    status: 'RESOLVED', camera: 'CAM-03B', workerId: 'W-02',
    riskFactors: [
      { label: 'Missing Helmet', score: 30 },
      { label: 'Unsafe Posture', score: 20 },
    ],
    aiRecommendation: 'Issue formal PPE warning. Third violation this week — escalate to site manager.',
  },
]

export const mockZones: Zone[] = [
  { id: 'z1', name: 'Zone 01', risk: 'SAFE', workers: 12, cameras: 2, incidentsToday: 1, x: 5, y: 5, width: 40, height: 35 },
  { id: 'z2', name: 'Zone 02', risk: 'CAUTION', workers: 10, cameras: 2, incidentsToday: 2, x: 50, y: 5, width: 45, height: 35 },
  { id: 'z3', name: 'Zone 03', risk: 'RESTRICTED', workers: 8, cameras: 2, incidentsToday: 4, x: 5, y: 45, width: 40, height: 45 },
  { id: 'z4', name: 'Zone 04', risk: 'HIGH', workers: 12, cameras: 2, incidentsToday: 0, x: 50, y: 45, width: 45, height: 45 },
]

export const mockCameras: Camera[] = [
  { id: 'cam1', name: 'CAM-01A', zone: 'Zone 01', status: 'RECORDING' },
  { id: 'cam2', name: 'CAM-01B', zone: 'Zone 01', status: 'ONLINE' },
  { id: 'cam3', name: 'CAM-02A', zone: 'Zone 02', status: 'RECORDING' },
  { id: 'cam4', name: 'CAM-02B', zone: 'Zone 02', status: 'ONLINE' },
  { id: 'cam5', name: 'CAM-03A', zone: 'Zone 03', status: 'RECORDING' },
  { id: 'cam6', name: 'CAM-03B', zone: 'Zone 03', status: 'ONLINE' },
  { id: 'cam7', name: 'CAM-04A', zone: 'Zone 04', status: 'RECORDING' },
  { id: 'cam8', name: 'CAM-04B', zone: 'Zone 04', status: 'ONLINE' },
]

export const mockDetectionEvents: DetectionEvent[] = [
  { id: 'de1', label: 'Missing Helmet', confidence: 0.97, timestamp: '10:42:03', zone: 'Zone 03', severity: 'CRITICAL', workerId: 'W-17' },
  { id: 'de2', label: 'Restricted Zone Entry', confidence: 0.99, timestamp: '10:42:01', zone: 'Zone 03', severity: 'CRITICAL', workerId: 'W-17' },
  { id: 'de3', label: 'Person Detected', confidence: 0.98, timestamp: '10:41:55', zone: 'Zone 03', severity: 'LOW', workerId: 'W-17' },
  { id: 'de4', label: 'Safety Vest Detected', confidence: 0.95, timestamp: '10:41:50', zone: 'Zone 02', severity: 'LOW', workerId: 'W-09' },
  { id: 'de5', label: 'Worker Proximity Alert', confidence: 0.88, timestamp: '10:41:32', zone: 'Zone 01', severity: 'MEDIUM', workerId: 'W-05' },
  { id: 'de6', label: 'Helmet Detected', confidence: 0.96, timestamp: '10:41:18', zone: 'Zone 01', severity: 'LOW', workerId: 'W-23' },
]

export const mockTrends: TrendPoint[] = [
  { day: 'Mon', incidents: 3, violations: 5, safetyScore: 88 },
  { day: 'Tue', incidents: 5, violations: 8, safetyScore: 84 },
  { day: 'Wed', incidents: 2, violations: 3, safetyScore: 91 },
  { day: 'Thu', incidents: 4, violations: 6, safetyScore: 87 },
  { day: 'Fri', incidents: 6, violations: 9, safetyScore: 82 },
  { day: 'Sat', incidents: 3, violations: 4, safetyScore: 89 },
  { day: 'Sun', incidents: 7, violations: 11, safetyScore: 92 },
]
