## Azure Pipeline Mapping

| Pipeline Step       | What I Did                                                | Azure Equivalent              |
|---------------------|-----------------------------------------------------------|-------------------------------|
| Data Ingestion      | Scraped data from websites, PDFs, APIs                    | Azure Data Factory            |
| Processing          | Applied NLP, regex, and logic to extract mission info     | Azure Databricks (PySpark NLP)|
| Storage             | Saved data to Supabase (PostgreSQL)                       | Azure SQL Database            |
| Modeling/Analysis   | Used TF-IDF and Cosine Similarity for classification      | DBT (semantic data modeling)  |
| Visualization       | Displayed via React dashboard                             | Power BI / Azure App Service  |
| Automation          | Scripts with logic to handle NULLs and updates            | Logic Apps or Azure Pipelines |
| Versioning          | Managed on GitHub                                         | Azure DevOps Git              |
