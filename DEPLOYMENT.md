# Deployment Specification & Cloud Guide

## 1. Environment Variables Blueprint

Configure the following parameters in your Production Container / Cloud Environment:

- **PORT**: `8000` (FastAPI Server Port)
- **HOST**: `0.0.0.0` (Listen Address)
- **LOG_LEVEL**: `info` (Logging Verbosity)
- **NOTION_API_SECRET**: Notion Integration Token
- **NOTION_DATABASE_ID**: Target Database ID for Video Drafts
- **DISCORD_WEBHOOK_URL**: Discord Notification Channel Webhook
- **LINE_NOTIFY_TOKEN**: Line Group Alert Authorization Token
- **ELEVENLABS_TOKEN**: ElevenLabs Voice Synthesis Engine Credential
- **KLING_AI_TOKEN**: Kling AI Mascot Video Generation Engine Credential
- **STORAGE_BUCKET**: Production S3 Storage Bucket

---

## 2. One-Click Deployment Script (`deploy.sh`)

```bash
#!/usr/bin/env bash
set -e

echo "🚀 Starting Automated Cloud Deployment..."

# 1. Docker Build
docker-compose build --no-cache

# 2. Service Launch
docker-compose down || true
docker-compose up -d

# 3. Health Check
sleep 3
curl -s http://localhost:8000/health
```

---

## 3. Kubernetes Deployment Specification (`k8s-deployment.yaml`)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: saas-qc-pipeline
spec:
  replicas: 2
  selector:
    matchLabels:
      app: saas-qc-pipeline
  template:
    metadata:
      labels:
        app: saas-qc-pipeline
    spec:
      containers:
      - name: qc-pipeline
        image: saas-video-editor/qc-pipeline:v2.1.0
        ports:
        - containerPort: 8000
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
```
