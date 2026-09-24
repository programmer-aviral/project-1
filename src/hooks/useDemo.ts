import { useState, useCallback, useRef } from 'react'
import type { ToastMessage } from '../types'

const DEMO_STEPS = [
  { delay: 1000, title: '📷 Camera Active', body: 'CAM-03A streaming Zone 03 — AI detection running', type: 'info' as const },
  { delay: 3000, title: '👷 Worker Detected', body: 'Worker #17 detected entering Zone 03 — tracking initiated', type: 'info' as const },
  { delay: 5500, title: '⚠ PPE Violation', body: 'MISSING HELMET detected — Worker #17 — Confidence 97%', type: 'warning' as const },
  { delay: 8000, title: '🚫 Restricted Zone', body: 'Worker #17 crossed Zone 03 boundary — unauthorized entry', type: 'warning' as const },
  { delay: 10000, title: '🔴 Risk Score: 90', body: 'Risk factors: Helmet +30, Restricted Zone +40, Posture +20', type: 'critical' as const },
  { delay: 12500, title: '🚨 CRITICAL ALERT', body: 'Worker #17 in restricted Zone 03 without required PPE', type: 'critical' as const },
  { delay: 15000, title: '📋 Incident Created', body: 'Incident SG-2026-0043 created — status: OPEN', type: 'warning' as const },
  { delay: 17500, title: '🤖 AI Report Generated', body: 'Report SG-2026-0043 ready — actions recommended', type: 'success' as const },
]

export function useDemo() {
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(-1)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const startDemo = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRunning(true)
    setStep(0)
    setToasts([])

    DEMO_STEPS.forEach((s, i) => {
      const t = setTimeout(() => {
        setStep(i)
        const id = `toast-${Date.now()}-${i}`
        setToasts(prev => [...prev.slice(-3), { id, type: s.type, title: s.title, body: s.body }])
        setTimeout(() => removeToast(id), 5000)
        if (i === DEMO_STEPS.length - 1) setRunning(false)
      }, s.delay)
      timers.current.push(t)
    })
  }, [removeToast])

  const stopDemo = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setRunning(false)
    setStep(-1)
    setToasts([])
  }, [])

  return { running, step, toasts, startDemo, stopDemo, removeToast, totalSteps: DEMO_STEPS.length }
}
