🛡️ SiteGuard AI

See the Risk Before the Incident.

AI-Powered Construction Safety Monitoring & Risk Intelligence

SiteGuard AI is a construction-site safety intelligence platform designed to help supervisors move from passive camera monitoring to structured, actionable safety information.

It combines computer vision, site/zone context, configurable risk scoring, incident management, and AI-assisted reporting into one safety dashboard.

🚀 Why SiteGuard AI?

Construction sites can contain multiple workers, cameras, restricted zones, and changing safety conditions. Manual inspection and passive camera feeds can make it difficult for supervisors to continuously identify and respond to safety events.

SiteGuard AI aims to bridge that gap:

Camera / Video
      ↓
Computer Vision
      ↓
Person + PPE Detection
      ↓
Zone + Context
      ↓
Risk Engine
      ↓
Alert
      ↓
Incident
      ↓
AI-Assisted Report

The core idea

Detection is only the beginning.

SiteGuard connects:

Detection → Context → Risk → Action

✨ Key Features

👷 PPE & Safety Detection

Designed to identify configured safety-related visual conditions such as missing helmets and safety-vest conditions.

🚧 Danger-Zone Monitoring

Configured site zones can be classified as safe, caution, high-risk, or restricted for contextual incident analysis.

🧠 Context-Aware Risk Intelligence

Instead of treating every detection independently, SiteGuard combines detected conditions with zone context and configurable rules to produce a structured risk score and severity level.

🚨 Incident Management

Detected events can be organized with:

Incident ID

Date & time

Zone

Detection type

Risk score

Severity

Status

📊 Safety Dashboard

A centralized interface provides visibility into:

Active workers

Active cameras

Open alerts

High-risk zones

Today's incidents

Overall safety indicators

📝 AI-Assisted Incident Reporting

Incident information can be converted into structured reports containing:

Incident summary

Detected conditions

Risk assessment

Recommended actions

🗺️ Zone Management

Site zones can be monitored and managed with worker, camera, and incident context.

⚙️ Configurable Alert Thresholds

Risk thresholds can be configured for categories such as:

Critical

High

Medium

Low

🖥️ Product Experience

The project includes a dashboard-oriented product interface covering:

Safety Command Center

Incident & Risk Management

Zone-Aware Safety Monitoring

Structured Incident Reporting

Reports Dashboard

Settings & Camera Management

Product workflow

MONITOR → DETECT → SCORE → ALERT → REPORT

The current interface contains prototype / implementation screens. AI and computer-vision capabilities should be evaluated according to the implementation available in the repository.

🧠 Technical Architecture

┌───────────────────────────────┐
│       CAMERA / VIDEO INPUT    │
│ Live Feed • Video • RTSP      │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│     COMPUTER VISION LAYER     │
│ YOLO • OpenCV • MediaPipe     │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│     DETECTION & TRACKING      │
│ Person • PPE • Safety • Zones │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│     CONTEXT + RISK ENGINE     │
│ Rules • Zones • Risk • Severity│
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│           BACKEND             │
│ Python • FastAPI • WebSockets │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│        PRODUCT LAYER          │
│ React • TypeScript • Tailwind │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│   DATABASE / INCIDENT STORE   │
│ SQLite • PostgreSQL-ready     │
└───────────────┬───────────────┘
                ↓
┌───────────────────────────────┐
│     AI-ASSISTED REPORTING     │
│ Gemini / OpenAI API           │
└───────────────────────────────┘

Design principle

Edge-first where practical

Core computer-vision processing can be designed to run locally where appropriate, reducing the need to upload every video frame to the cloud.

🛠️ Tech Stack

Layer

Technologies

AI / Computer Vision

YOLO, OpenCV, MediaPipe

Backend

Python, FastAPI, WebSockets

Frontend

React, TypeScript, Tailwind CSS

Database

SQLite, PostgreSQL-ready architecture

Generative AI

Gemini / OpenAI API

Repository

GitHub

📁 Project Structure

SiteGuard AI/
├── frontend/
├── backend/
├── ai-engine/
├── database/
└── README.md

Keep this structure synchronized with the actual repository as the project evolves.

📸 Screenshots

Safety Command Center

Add the real dashboard screenshot here.

[SCREENSHOT: Overview Dashboard]

Incident & Risk Management

Add the real incident-history screenshot here.

[SCREENSHOT: Incident History]

Zone Management

Add the real zone-management screenshot here.

[SCREENSHOT: Zone Management]

AI Incident Report

Add the real incident-report screenshot here.

[SCREENSHOT: AI Incident Report]

🔗 Project Links

GitHub Repository

https://github.com/programmer-aviral/project-1

Live Demo

Add a live deployment URL here when available.

👥 Team SiteGuard

Member

Responsibility

Aviral Gandhi

AI / Computer Vision + Full Stack

Ahmed

Backend + Risk Engine

Amir Molani

Frontend + Dashboard

Ashish Kumar

Database + Infrastructure

Anushka

Generative AI + Reporting

Team Profiles

Aviral Gandhi — LinkedIn

Ahmed — LinkedIn

Amir Molani — LinkedIn

Ashish Kumar — LinkedIn

Anushka — LinkedIn

🎯 Project Goals

SiteGuard AI is designed around four core goals:

Detect safety-related conditions.

Understand the context in which they occur.

Prioritize incidents using configurable risk logic.

Assist supervisors with structured incident information and reports.

🔮 Future Development

Potential development areas include:

More PPE classes and configurable safety rules

Improved person tracking across camera feeds

Additional zone and proximity rules

Real-time notification integrations

Advanced incident analytics

Edge deployment optimization

PostgreSQL production deployment

More AI-assisted reporting workflows

Historical safety trend analysis

⚠️ Project Status

SiteGuard AI is an evolving project / prototype.

Some product interfaces and architecture components may represent implementation screens, integrations in progress, or planned capabilities. The repository should be treated as the source of truth for what is currently implemented.

🏆 HackWave 3.0

HackWave 3.0 — Round 1 Submission

Organized by Echelon Dev Society, Chameli Devi Group of Institutions (CDGI), Indore

Team SiteGuard

See the Risk Before the Incident.

📄 License

Add the project's chosen open-source license here when finalized.
