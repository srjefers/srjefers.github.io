---
title: "LLM agent for aircraft-repair knowledge"
tags: ["Vertex AI", "RAG", "GCP", "Airflow", "Postgres", "Medallion"]
order: 3
---

Built a retrieval-augmented agent on GCP to surface historical maintenance insights
from Oracle records. Dual-pipeline architecture: Python on Compute Engine (cron)
extracted from Oracle to Cloud Storage; Cloud Functions → Airflow DAG loaded curated
layers into Postgres following a **medallion architecture (bronze / silver / gold)**.
Embeddings served via Vertex AI. End users resolve maintenance issues **60% faster**.
