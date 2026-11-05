---
title: "Cloud migration: AWS → GCP"
tags: ["GCP", "AWS", "Dagster", "Snowflake", "dbt", "PySpark"]
order: 2
---

Migrated a serverless-first data platform from AWS to GCP, replicating the
architecture with Python, PySpark, Dagster, Snowflake, and dbt. On AWS, workloads ran
on ECS Fargate with S3 as the data lake; re-platformed to GCP managed services while
preserving data models, orchestration patterns, and SLAs. Validated end-to-end with
data-quality checks; **reduced cloud spend by 45%** and, after optimizations
identified during re-platforming, **improved pipeline execution times by 35%**.
