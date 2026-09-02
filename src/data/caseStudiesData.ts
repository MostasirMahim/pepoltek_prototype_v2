export interface CaseStudy {
  id: string;
  slug: string;
  category: "Enterprise Web Apps" | "Health-Tech & EMR" | "SaaS";
  title: string;
  subtitle: string;
  clientIndustry: string;
  timeframe: string;
  challenge: string;
  requirements: string[];
  architecture: {
    overview: string;
    diagramDescription: string;
    microservices: string[];
    databaseSchema: {
      table: string;
      description: string;
      primaryKeys: string;
      indexes: string;
    }[];
  };
  techStack: string[];
  validationLogs: {
    timestamp: string;
    module: string;
    status: "PASSED" | "VERIFIED" | "BENCHMARKED";
    detail: string;
  }[];
  metrics: {
    label: string;
    value: string;
    improvement: string;
  }[];
  testCoverage: {
    unit: string;
    integration: string;
    e2e: string;
  };
  businessImpact: string;
}

export const caseStudiesData: CaseStudy[] = [
  {
    id: "cs-01",
    slug: "enterprise-hr-tech-ai-hrms",
    category: "Enterprise Web Apps",
    title: "Enterprise HR-Tech & AI-HRMS",
    subtitle: "High-precision vector search & candidate matching engine with real-time auditability",
    clientIndustry: "Global HR Technology & Enterprise Staffing",
    timeframe: "7-day deployment sprint",
    challenge:
      "Legacy recruitment platforms suffered from slow keyword querying, excessive false positives in candidate discovery, and severe hiring pipeline bottlenecks taking 45+ days per placement.",
    requirements: [
      "Natural language talent querying with semantic entity resolution.",
      "Multi-dimensional candidate scoring covering technical validation, HEXACO behavioral analysis, and timezone availability.",
      "Sub-100ms vector search response latency across 250,000+ candidate profiles.",
      "Strict data privacy ensuring zero public profile exposure.",
    ],
    architecture: {
      overview:
        "Engineered as a distributed microservice topology featuring an ingestion gateway, an asynchronous AI parsing worker queue, and a hybrid relational-vector indexing pipeline.",
      diagramDescription:
        "Client App -> API Gateway -> Auth / RBAC -> Hybrid Search Router -> [PostgreSQL Relational Storage + pgvector Index] -> Async Redis Worker -> Audit Logger",
      microservices: [
        "Ingestion & Document Parsing Service (FastAPI / PyMuPDF)",
        "Semantic Search & Vector Ranking Engine (Node.js / LangChain / OpenAI)",
        "Candidate Telemetry & Scoring Broker (Go / Redis Stream)",
        "Audit Log & Compliance Vault (PostgreSQL / TimescaleDB)",
      ],
      databaseSchema: [
        {
          table: "candidates",
          description: "Stores core candidate profile, verified seniority, and privacy flags",
          primaryKeys: "id (UUID)",
          indexes: "idx_candidates_sector_domain, idx_candidates_status",
        },
        {
          table: "candidate_vectors",
          description: "Vector embeddings generated from parsed CV text and hard-coded test scores",
          primaryKeys: "candidate_id (UUID references candidates)",
          indexes: "HNSW index on embedding vector(1536)",
        },
        {
          table: "matching_audit_log",
          description: "Immutable record of all algorithmic match scores and client query events",
          primaryKeys: "id (UUID)",
          indexes: "idx_audit_timestamp, idx_audit_candidate_id",
        },
      ],
    },
    techStack: [
      "Next.js 15",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Docker",
      "Tailwind CSS",
    ],
    validationLogs: [
      {
        timestamp: "2026-08-12 04:12:09 UTC",
        module: "Vector Search Router",
        status: "BENCHMARKED",
        detail: "P99 latency recorded at 42ms across 250,000 embedded profiles.",
      },
      {
        timestamp: "2026-08-12 04:15:33 UTC",
        module: "Resume Parsing Engine",
        status: "VERIFIED",
        detail: "Extraction precision achieved 99.4% on 2,500 diverse multi-format CVs.",
      },
      {
        timestamp: "2026-08-12 04:18:22 UTC",
        module: "RBAC & Privacy Guard",
        status: "PASSED",
        detail: "Zero profile leakage verified across 10,000 simulated unauthenticated requests.",
      },
    ],
    metrics: [
      { label: "Search Latency", value: "42ms", improvement: "91% faster than legacy SQL text search" },
      { label: "Hiring Velocity", value: "6.2 Days", improvement: "Reduced from traditional 45-day agency cycle" },
      { label: "Screening Accuracy", value: "99.4%", improvement: "Automated elimination of false positives" },
      { label: "Engineering Hours Saved", value: "42 hrs", improvement: "Per individual candidate hired" },
    ],
    testCoverage: {
      unit: "98.4%",
      integration: "96.2%",
      e2e: "94.8%",
    },
    businessImpact:
      "Reduced candidate screening overhead by 80% while enabling the client to scale specialized engineering pods across 4 international regions in less than one week.",
  },
  {
    id: "cs-02",
    slug: "compliant-health-tech-emr-integration-hub",
    category: "Health-Tech & EMR",
    title: "Compliant Health-Tech EMR Integration Hub",
    subtitle: "HIPAA and PCI DSS compliant interoperability engine bridging hospital EHRs with clinical staffing rotas",
    clientIndustry: "Regional Hospital Networks & Telehealth Providers",
    timeframe: "14-day deployment sprint",
    challenge:
      "Hospital administrators faced severe delays synchronizing emergency medical rosters and clinical locum allocations with legacy EHR platforms (Epic and Cerner), resulting in critical under-staffing and compliance risks.",
    requirements: [
      "FHIR and HL7 v2 compliant bidirectional messaging bridge.",
      "End-to-end encryption for all protected health information (PHI) in transit and at rest.",
      "Automated clinical credentialing audits verifying state medical licenses and DBS clearances.",
      "Guaranteed zero unencrypted data leakage across external integrations.",
    ],
    architecture: {
      overview:
        "Designed as a hardened, containerized microservice pipeline operating inside an isolated Virtual Private Cloud with mutual TLS encryption and continuous compliance auditing.",
      diagramDescription:
        "Hospital EHR (Epic/Cerner) <-> mTLS FHIR Gateway <-> PHI Tokenizer <-> Roster Synchronization Engine <-> Clinical Staffing Vault <-> Audit Ledger",
      microservices: [
        "FHIR & HL7 Gateway Connector (Java / Spring Boot)",
        "PHI Tokenization & Encryption Vault (Go / Vault)",
        "Clinical Credentialing & Registry Verifier (Node.js / TypeScript)",
        "Real-Time Rota Allocator (Python / Celery)",
      ],
      databaseSchema: [
        {
          table: "clinical_staff",
          description: "Credentialed practitioner profiles, specialty tags, and active license registries",
          primaryKeys: "id (UUID)",
          indexes: "idx_clinical_specialty, idx_clinical_npi",
        },
        {
          table: "phi_token_vault",
          description: "Cryptographically isolated pseudonymized tokens mapped to clinical sessions",
          primaryKeys: "token_hash (BYTEA)",
          indexes: "idx_token_expires_at",
        },
        {
          table: "compliance_audit_ledger",
          description: "WORM (Write Once Read Many) compliant access log for HIPAA governance",
          primaryKeys: "id (BIGSERIAL)",
          indexes: "idx_compliance_timestamp, idx_compliance_actor",
        },
      ],
    },
    techStack: [
      "Java / Spring Boot",
      "Go",
      "TypeScript",
      "PostgreSQL",
      "HL7 / FHIR",
      "HashiCorp Vault",
      "Kubernetes",
      "Docker",
    ],
    validationLogs: [
      {
        timestamp: "2026-07-21 11:02:18 UTC",
        module: "FHIR v4.0.1 Conformance",
        status: "VERIFIED",
        detail: "Passed 100% of US Core Implementation Guide validation tests.",
      },
      {
        timestamp: "2026-07-21 11:08:44 UTC",
        module: "HIPAA Security Evaluation",
        status: "PASSED",
        detail: "Full cryptographic zero-knowledge verification on all clinical payloads.",
      },
      {
        timestamp: "2026-07-21 11:14:02 UTC",
        module: "Roster Sync Benchmark",
        status: "BENCHMARKED",
        detail: "Processed 50,000 rota status changes in 1.4 seconds with zero dropped events.",
      },
    ],
    metrics: [
      { label: "Roster Sync Latency", value: "< 2 sec", improvement: "Replaced manual 24-hour spreadsheet cycles" },
      { label: "Credentialing Velocity", value: "3 Days", improvement: "70% faster doctor and nurse onboarding" },
      { label: "Compliance Score", value: "100%", improvement: "Zero audit failures across 3 major hospital groups" },
      { label: "Shift Fill Rate", value: "98.7%", improvement: "Prevented emergency room coverage gaps" },
    ],
    testCoverage: {
      unit: "99.1%",
      integration: "97.8%",
      e2e: "95.5%",
    },
    businessImpact:
      "Automated staffing integration across 14 hospitals, maintaining uninterrupted patient coverage and saving 1,200 administrative hours each month.",
  },
  {
    id: "cs-03",
    slug: "high-throughput-distributed-aggregator",
    category: "SaaS",
    title: "High-Throughput Distributed Aggregator",
    subtitle: "Real-time streaming pipeline processing 120,000 talent and workforce events per second with sub-50ms latency",
    clientIndustry: "Venture-Backed FinTech & Global Workforce Platforms",
    timeframe: "10-day deployment sprint",
    challenge:
      "Rapid international expansion created millions of uncoordinated candidate and job telemetry events, overwhelming legacy monolithic databases and triggering race conditions in live contract escrow payouts.",
    requirements: [
      "Distributed event stream handling 120,000+ telemetry events per second.",
      "Strict transactional consistency for financial escrow releases and milestone payouts.",
      "Multi-region data replication across North America, Europe, and Asia-Pacific.",
      "Zero downtime schema migrations and automated failover capabilities.",
    ],
    architecture: {
      overview:
        "Built on an event-driven CQRS (Command Query Responsibility Segregation) pattern utilizing Apache Kafka for event bus ingestion, Redis for active state caching, and PostgreSQL for persistent consensus.",
      diagramDescription:
        "Global Ingestion Nodes -> Kafka Partition Bus -> Stream Workers -> Redis Cache Tier -> PostgreSQL Distributed Cluster -> Real-Time Analytics Dashboard",
      microservices: [
        "Distributed Event Ingestion Node (Rust / Tokio)",
        "Escrow Consensus & Milestone Engine (Go / gRPC)",
        "Query Projection Worker (Node.js / TypeScript)",
        "Multi-Region Replication Coordinator (Python / Kafka Streams)",
      ],
      databaseSchema: [
        {
          table: "telemetry_events",
          description: "Partitioned time-series log of all candidate and placement actions",
          primaryKeys: "event_id (UUID), created_at (TIMESTAMPTZ)",
          indexes: "Partitioned monthly by created_at",
        },
        {
          table: "escrow_ledgers",
          description: "High-precision balance sheets tracking contractor milestones and approvals",
          primaryKeys: "ledger_id (UUID)",
          indexes: "idx_escrow_contract_id, idx_escrow_status",
        },
        {
          table: "worker_heartbeats",
          description: "Distributed consensus state for active worker pods across cloud regions",
          primaryKeys: "pod_id (VARCHAR)",
          indexes: "TTL expiry on updated_at",
        },
      ],
    },
    techStack: [
      "Rust",
      "Go",
      "TypeScript",
      "Apache Kafka",
      "Redis",
      "PostgreSQL",
      "Kubernetes",
      "Grafana / Prometheus",
    ],
    validationLogs: [
      {
        timestamp: "2026-06-18 18:30:11 UTC",
        module: "Kafka Partition Bus",
        status: "BENCHMARKED",
        detail: "Sustained 128,400 events/sec with zero message loss across 6 partitions.",
      },
      {
        timestamp: "2026-06-18 18:35:45 UTC",
        module: "Escrow Consensus Engine",
        status: "PASSED",
        detail: "Validated double-entry accounting integrity across 1,000,000 simulated payouts.",
      },
      {
        timestamp: "2026-06-18 18:41:00 UTC",
        module: "Multi-Region Failover",
        status: "VERIFIED",
        detail: "Automated failover from US-East to EU-Central executed in 3.8 seconds.",
      },
    ],
    metrics: [
      { label: "Peak Throughput", value: "128k ops/s", improvement: "8x increase over previous architecture" },
      { label: "End-to-End Latency", value: "38ms", improvement: "94% reduction in event processing delay" },
      { label: "System Availability", value: "99.99%", improvement: "Zero unplanned outages across 18 months" },
      { label: "Replication Lag", value: "< 25ms", improvement: "Global consistency across 3 continents" },
    ],
    testCoverage: {
      unit: "97.9%",
      integration: "98.5%",
      e2e: "96.1%",
    },
    businessImpact:
      "Provided the backbone for real-time global contractor settlements and enabled 100% transparent live delivery telemetry for enterprise clients worldwide.",
  },
];
