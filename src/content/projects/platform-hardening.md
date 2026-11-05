---
title: "Operating and hardening a Snowflake / dbt / Dagster platform on GKE"
tags: ["Snowflake", "dbt", "Dagster", "GKE", "Security", "Observability"]
order: 1
---

For a two-repo data platform (**~1,600 dbt models, ~27K tests, ~290 Dagster
assets**), led the Dagster, dbt-core, and Python major upgrades, **closing 8 CVEs**
and removing an SQL-injection path from a custom Snowflake IO manager. Fixed
recurring out-of-memory failures by reusing the dbt partial-parse artifact across
Dagster runs; built source freshness checks and model-health signals for a
client-facing status view, and automated the hand-off from the weekly pipeline run
to the client's QA suite with failure alerts.
