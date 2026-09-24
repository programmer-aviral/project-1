Build a complete working application called **SiteGuard AI** based on the attached Figma design.

The application must NOT be a static mockup.

Build a functional MVP with a clean architecture that can later integrate with real computer-vision models.

## OBJECTIVE

Create a construction-site safety monitoring platform that demonstrates:

**Video Input → AI Detection → Context → Risk Score → Alert → Dashboard → Incident Report**

The system should be designed so the computer-vision module can later be replaced or connected to a real YOLO model.

---

# TECH STACK

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Recharts
* Lucide React

## Backend

* Python
* FastAPI
* WebSockets

## AI / Computer Vision

* YOLO
* OpenCV
* MediaPipe where appropriate

## Database

Start with SQLite for the MVP.

Structure the application so PostgreSQL can be added later.

## AI REPORTING

Create an abstraction layer for Gemini/OpenAI.

Do not hard-code an API key.

Use environment variables.

---

# PROJECT STRUCTURE

Create:

```text
siteguard-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── data/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── database/
│   │   ├── vision/
│   │   ├── risk/
│   │   └── reports/
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

# FRONTEND PAGES

Implement:

### `/`

Dashboard

### `/monitoring`

Live AI Monitoring

### `/incidents`

Incident History

### `/incidents/:id`

Incident Detail

### `/reports/:id`

AI Incident Report

### `/analytics`

Risk Analytics

### `/zones`

Zone Management

### `/settings`

Settings

---

# DASHBOARD

Implement:

### KPI cards

* Active Workers
* Active Cameras
* Open Alerts
* High-Risk Zones
* Today's Incidents
* Safety Score

### Live Alerts

Show severity:

* Critical
* High
* Medium
* Low

### Safety chart

Show incidents over time.

### Site overview

Show workers, cameras and zones.

---

# LIVE MONITORING

Create:

* Video player
* Detection overlay
* Bounding boxes
* Confidence scores
* Zone boundaries
* Detection event list
* Current risk score
* Alert panel

Example:

```text
CRITICAL SAFETY EVENT

Worker #17
Zone 03
Missing Helmet

Risk Score: 90

[Acknowledge]
[View Incident]
[Notify Supervisor]
```

---

# RISK ENGINE

Implement the risk engine as a separate backend service.

Example:

```text
Missing Helmet       +30
Restricted Zone      +40
Unsafe Posture       +20
Poor Visibility      +10
```

Calculate:

```text
risk_score = sum(active_risk_factors)
```

Clamp between:

```text
0–100
```

Severity:

```text
80–100 = CRITICAL
60–79  = HIGH
30–59  = MEDIUM
0–29   = LOW
```

Make these values configurable.

---

# COMPUTER VISION

Create a vision service that accepts:

* uploaded video
* webcam stream where supported
* image

The service should provide a clear interface for YOLO inference.

If the real trained PPE model is not yet available, use a development/mock inference layer.

IMPORTANT:

Clearly separate:

**DEVELOPMENT MOCK DETECTION**

from

**REAL YOLO DETECTION**

Do not pretend mock results are real AI results.

---

# DANGER ZONES

Allow zones to be represented as polygons/rectangles.

Store:

* Zone ID
* Name
* Risk level
* Coordinates
* Allowed status

When a detected worker enters a restricted zone:

Create an event.

---

# INCIDENT SYSTEM

When a critical event occurs, create an incident containing:

* Incident ID
* Timestamp
* Camera
* Zone
* Detection type
* Risk factors
* Risk score
* Severity
* Evidence image/path
* Status

Statuses:

* Open
* Acknowledged
* Resolved

---

# AI INCIDENT REPORT

Create a report-generation service.

Input:

```text
Incident information
+
Risk factors
+
Detection events
```

Output:

```text
Incident Summary
Detected Conditions
Risk Assessment
Recommended Actions
Evidence
```

If Gemini/OpenAI is not configured:

provide a deterministic fallback report generator.

Do not break the application because an API key is missing.

---

# REAL-TIME COMMUNICATION

Use WebSockets for:

* Detection events
* Risk changes
* New incidents
* Alert notifications

The dashboard should update without requiring a manual page refresh.

---

# DATABASE

Create tables/models for:

### Users

### Cameras

### Workers

### Zones

### DetectionEvents

### Incidents

### Reports

### RiskFactors

Add seed data for development.

---

# UI REQUIREMENTS

Match the Figma design closely.

Use:

* Dark professional interface
* Responsive layout
* Clear typography
* Safety severity indicators
* Charts
* Tables
* Cards
* Side navigation
* Top navigation
* Toast notifications
* Loading states
* Empty states
* Error states

Do not create a generic Bootstrap-looking dashboard.

---

# DEMO MODE

Create a clearly labelled:

## Demo Mode

This allows the team to demonstrate the complete workflow before the real YOLO model is connected.

Demo workflow:

```text
Start Demo
↓
Worker detected
↓
Missing Helmet
↓
Worker enters Zone 03
↓
Risk Score = 90
↓
CRITICAL ALERT
↓
Incident Created
↓
AI Report Generated
```

The demo should visibly show the complete system workflow.

Label demo-generated data appropriately.

---

# SECURITY

Never put API keys in frontend code.

Use:

`.env`

and provide:

`.env.example`

Never commit secrets.

---

# README

Create a professional README containing:

## SiteGuard AI

### Problem

### Solution

### Features

### Architecture

### Tech Stack

### Setup Instructions

### Environment Variables

### Running Frontend

### Running Backend

### Demo Mode

### Real YOLO Integration

### Project Structure

### Team Contributions

### Future Scope

---

# TESTING

Include basic tests for:

* Risk calculation
* Severity calculation
* Incident creation
* API health check

---

# IMPORTANT DEVELOPMENT RULES

Do NOT:

* fake model accuracy
* claim real YOLO inference if using mock data
* hard-code API keys
* create fake GitHub links
* claim features that don't work
* hide errors

The application must run locally.

Provide exact commands:

```bash
npm install
npm run dev
```

and:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Adjust commands if the implementation requires different ones.

---

# FINAL DELIVERABLE

The final result must contain:

1. Working React frontend
2. Working FastAPI backend
3. Risk engine
4. Database
5. WebSocket events
6. Demo mode
7. Incident system
8. Report generation
9. Professional UI matching Figma
10. README
11. `.env.example`
12. GitHub-ready project structure

Most importantly:

**Build the minimum genuinely working product first.**

Do not create dozens of unfinished features.

The demo must successfully demonstrate:

**Detection → Risk → Alert → Incident → Report.**
