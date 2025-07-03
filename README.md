#  Automating CubeSat Mission Data Extraction and Analysis Using NLP

This project automates the extraction, structuring, and analysis of fragmented CubeSat mission data from web sources and documents using Natural Language Processing (NLP) techniques. The output is stored in a structured database and visualized through a web dashboard, simulating an end-to-end data engineering pipeline.

---

##  Objectives

- Extract unstructured CubeSat mission information (e.g., name, type, orbit, frequency band, technology)
- Preprocess, clean, and standardize this data using Python and NLP
- Store structured results in a relational PostgreSQL database (Supabase)
- Visualize mission insights and support future AI-based analysis
- Simulate Azure data engineering pipeline components

---

##  Technologies Used

| Tool / Technology      | Purpose                               |
|------------------------|----------------------------------------|
| **Python**             | Core data extraction and NLP           |
| **Google Colab**       | Notebook platform for data processing  |
| **BeautifulSoup**      | Web scraping from online databases     |
| **Regex**              | Pattern-based rule extraction          |
| **TF-IDF + Cosine Sim.** | Text matching and comparison        |
| **Supabase (PostgreSQL)** | Structured data storage            |
| **React.js**           | Frontend dashboard (external)          |
| **GitHub**             | Version control and project tracking   |

---

## Project Overview

This pipeline mimics how a real-world Azure stack might work:

[Data Sources (Web + PDFs)]
↓
[NLP & Processing (Python, Colab)]
↓
[Storage (Supabase/PostgreSQL)]
↓
[Modeling + Cleanup (TF-IDF, Regex)]
↓
[Dashboard (React Frontend)]

---


---

## ✅ Features

- [x] Web scraping from CubeSat registries (e.g., SatNOGS, Celestrak)
- [x] Rule-based extraction of attributes (name, orbit, size, etc.)
- [x] NLP matching to identify duplicates and fill missing data
- [x] Clean structured output to PostgreSQL
- [x] Frontend filtering and visualization (e.g., by orbit, size, country)

---

## 🔁 Azure Pipeline Mapping

| Pipeline Step       | What I Did                                                | Azure Equivalent              |
|---------------------|-----------------------------------------------------------|-------------------------------|
| Data Ingestion      | Scraped websites using BeautifulSoup                      | Azure Data Factory            |
| Processing          | Cleaned data using Python + NLP                           | Azure Databricks (PySpark NLP)|
| Storage             | Stored in Supabase (PostgreSQL)                           | Azure SQL Database            |
| Modeling/Analysis   | Used TF-IDF and Cosine Similarity for entity matching     | DBT (data modeling layer)     |
| Automation          | Simulated with Python scripts                             | Azure Logic Apps / Pipelines  |
| Version Control     | Managed on GitHub                                         | Azure DevOps Git              |

---

## Sample Insights Visualized

- Number of CubeSats per orbit type
- Frequency bands by satellite generation
- Technology use trends across regions
Demo: https://youtu.be/gB7xy9wIvwQ?si=AZ_n7o7OOM6DlnPS
---
