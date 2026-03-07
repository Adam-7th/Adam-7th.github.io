export type CaseStudyDetail = {
  subtitle: string;
  clientProblem: string[];
  businessContext: string;
  automationGoal: string;
  workflowOverview: string;
  architectureSummary: string;
  architectureFlow: string[];
  stepByStepWorkflow: string[];
  n8nWorkflowBreakdown: Array<{
    node: string;
    purpose: string;
  }>;
  diagramSuggestion: string;
  diagramImage: string;
  implementationChallenges: Array<{
    challenge: string;
    solution: string;
  }>;
  lessonsLearned: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const CASE_STUDY_FILTER_TAGS = [
  "Lead & Sales",
  "CRM",
  "Telegram",
  "Support",
  "AI",
  "Human-in-the-loop",
  "Website",
  "Conversion",
  "Operations",
] as const;

export const CASE_STUDY_DETAILS: Record<string, CaseStudyDetail> = {
  "lead-routing-upgrade": {
    subtitle: "Reduced response time from hours to under 2 minutes using automated lead routing.",
    clientProblem: [
      "Leads were coming from website forms, chat, and paid campaigns without a single intake process.",
      "Sales coordinators manually copied lead data into CRM and posted updates in team chat.",
      "Lead response delay was causing conversion loss, especially during evenings and weekends.",
      "Data quality was inconsistent because required fields were often missing or duplicated.",
    ],
    businessContext:
      "A growth-focused service business was scaling ad spend and needed a reliable handoff process between marketing and sales teams across multiple lead channels.",
    automationGoal:
      "Build an automated lead intake and routing system that validates data, updates CRM, prioritizes urgent leads, and notifies the right salesperson instantly.",
    workflowOverview:
      "The workflow uses n8n as the orchestration layer between lead sources, validation logic, HubSpot, and Telegram. It runs in near real-time and includes fallback paths for incomplete records.",
    architectureSummary:
      "Event-driven webhook intake with deterministic validation, CRM upsert, lead-priority logic, and multi-channel team alerts.",
    architectureFlow: [
      "Lead Source",
      "Webhook Trigger",
      "Validation + Dedupe",
      "CRM Upsert",
      "Telegram Alert",
      "Follow-Up Scheduler",
    ],
    stepByStepWorkflow: [
      "Lead enters from website form or chat widget.",
      "Payload is sent to n8n webhook endpoint.",
      "Validation node checks required fields and contact format.",
      "Deduplication node compares against existing CRM contacts.",
      "Lead score is calculated from source, intent, and company fields.",
      "HubSpot contact and deal records are created or updated.",
      "Telegram alert is sent to the correct sales channel.",
      "Auto-response email confirms lead receipt.",
      "If no owner action is detected, follow-up reminder is scheduled.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Webhook Trigger", purpose: "Receives lead payload from form and chat endpoints." },
      { node: "IF Validation Node", purpose: "Routes invalid payloads to error handling and logging." },
      { node: "Function Node", purpose: "Normalizes fields and computes lead score." },
      { node: "HubSpot Node", purpose: "Creates or updates contact and deal entities." },
      { node: "Telegram Node", purpose: "Posts high-context lead alerts to sales channel." },
      { node: "Email Node", purpose: "Sends instant lead confirmation with expected response SLA." },
      { node: "Wait/Delay Node", purpose: "Schedules follow-up reminders for unassigned leads." },
    ],
    diagramSuggestion:
      "Recommended diagram: Lead Source -> Webhook -> Validation -> Deduplication -> HubSpot -> Telegram Alert -> Email Confirmation -> Follow-Up Check.",
    diagramImage: "/images/case-workflows/lead-routing-automation.svg",
    implementationChallenges: [
      {
        challenge: "Duplicate contact creation from parallel lead channels.",
        solution: "Introduced deterministic dedupe key strategy using normalized email and phone hash before upsert.",
      },
      {
        challenge: "Inconsistent payload formats between form providers.",
        solution: "Added a mapping function layer to canonicalize fields before validation.",
      },
      {
        challenge: "Alert fatigue for low-priority inquiries.",
        solution: "Applied lead scoring rules and conditional routing to channel-specific Telegram threads.",
      },
    ],
    lessonsLearned: [
      "Speed alone is not enough; validation quality directly affects downstream conversion.",
      "A single source of truth in CRM prevents sales-team confusion and duplicate outreach.",
      "Routing rules should be transparent and auditable for team trust.",
    ],
    faq: [
      {
        question: "How long did this implementation take?",
        answer: "The first production version was delivered in 8 business days including testing and rollout.",
      },
      {
        question: "Can this handle high lead volume?",
        answer: "Yes. Queue-based retries and idempotent CRM upserts support high-volume bursts safely.",
      },
      {
        question: "Can we route by region or service line?",
        answer: "Yes. Routing logic can split by geography, service type, campaign source, or team capacity.",
      },
      {
        question: "How is lead data secured?",
        answer: "Transport is encrypted, credentials are stored as secrets, and error logs avoid sensitive fields.",
      },
    ],
  },
  "support-approval-system": {
    subtitle: "Cut support draft time by 60% while preserving human approval for every outbound reply.",
    clientProblem: [
      "The support team was manually drafting repetitive responses to common requests.",
      "Quality varied between agents, and escalation logic was inconsistent.",
      "As ticket volume grew, first-response targets were regularly missed.",
    ],
    businessContext:
      "A digital services company needed faster support throughput without risking brand tone, accuracy, or compliance in outbound communication.",
    automationGoal:
      "Use AI to draft responses instantly, then route drafts to human approvers before messages are sent to customers.",
    workflowOverview:
      "Incoming support messages trigger an n8n workflow that builds contextual AI drafts, adds risk checks, routes for approval in Slack, and only sends after explicit confirmation.",
    architectureSummary:
      "AI-assisted drafting with a strict human-in-the-loop gate, escalation routing, and full activity logging.",
    architectureFlow: [
      "Support Inbox",
      "Intent + Context Parser",
      "OpenAI Draft",
      "Human Approval Gate",
      "Final Reply",
      "Audit Log",
    ],
    stepByStepWorkflow: [
      "New support email enters shared inbox.",
      "n8n parses customer metadata, history, and issue category.",
      "Risk classifier checks whether the ticket can be auto-drafted.",
      "OpenAI generates a reply draft with policy constraints.",
      "Draft is posted to Slack with Approve/Edit/Reject actions.",
      "Agent approves or edits response content.",
      "Approved response is sent through Gmail.",
      "Ticket status and transcript are logged for QA review.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Gmail Trigger Node", purpose: "Detects inbound support thread events." },
      { node: "Function + Set Nodes", purpose: "Builds prompt context and metadata package." },
      { node: "OpenAI Node", purpose: "Generates draft response with guardrails." },
      { node: "IF Node", purpose: "Routes high-risk categories to manual-only queue." },
      { node: "Slack Node", purpose: "Requests approval with action buttons." },
      { node: "Gmail Send Node", purpose: "Sends only approved message versions." },
      { node: "Data Store Node", purpose: "Stores final output and approval trace." },
    ],
    diagramSuggestion:
      "Recommended diagram: Inbox Trigger -> Context Builder -> OpenAI Draft -> Risk Check -> Human Approval -> Send Reply -> Audit Log.",
    diagramImage: "/images/case-workflows/ai-support-drafting.svg",
    implementationChallenges: [
      {
        challenge: "Prompt outputs sometimes exceeded brand voice constraints.",
        solution: "Added response templates and tone guardrails before final approval stage.",
      },
      {
        challenge: "Some tickets required legal/compliance review.",
        solution: "Introduced policy-based branch routing that bypasses AI send path for sensitive categories.",
      },
      {
        challenge: "Agents needed visibility into context used by AI.",
        solution: "Displayed source context and confidence markers in approval message payload.",
      },
    ],
    lessonsLearned: [
      "Human-in-the-loop should be designed as a first-class product feature, not an afterthought.",
      "Clear escalation categories improve both safety and speed.",
      "Quality assurance improves when draft and approval data are retained in one log.",
    ],
    faq: [
      {
        question: "Does AI send messages automatically?",
        answer: "No. This workflow requires human approval before any customer-facing response is sent.",
      },
      {
        question: "Can this work with chat channels too?",
        answer: "Yes. The same logic can be extended to WhatsApp, Telegram, or in-app chat.",
      },
      {
        question: "How long did rollout take?",
        answer: "Initial rollout was completed in about 2 weeks including training and QA.",
      },
      {
        question: "How are incorrect drafts handled?",
        answer: "Agents can reject drafts and route examples into prompt improvement cycles.",
      },
    ],
  },
  "website-crm-sync": {
    subtitle: "Connected website lead capture directly to CRM and operations alerts in real time.",
    clientProblem: [
      "Website inquiries were not reliably entering CRM, causing missed opportunities.",
      "Operations team had no immediate visibility when high-value leads arrived.",
      "Manual transfer introduced errors and delayed first contact.",
    ],
    businessContext:
      "An agency relied heavily on inbound website traffic and needed deterministic form-to-CRM synchronization for lead handling SLAs.",
    automationGoal:
      "Create a seamless website-to-CRM pipeline with validation, owner assignment, and internal alerts.",
    workflowOverview:
      "Website forms send data to webhooks, n8n validates and enriches records, updates HubSpot, and triggers Telegram plus dashboard updates for operations.",
    architectureSummary:
      "Synchronous intake layer with asynchronous team alerting and operational visibility.",
    architectureFlow: ["Website Form", "Webhook Intake", "Validation + Enrichment", "HubSpot Sync", "Ops Alert", "Reporting Sheet"],
    stepByStepWorkflow: [
      "Visitor submits website form.",
      "Webhook endpoint receives payload.",
      "Validation checks required fields and source tracking parameters.",
      "HubSpot contact and deal are created or updated.",
      "Lead owner is auto-assigned by routing rules.",
      "Telegram alert is sent to operations channel.",
      "Google Sheets dashboard updates KPI counters.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Webhook Node", purpose: "Collects form submissions with UTM metadata." },
      { node: "IF Validation Node", purpose: "Rejects malformed submissions and logs errors." },
      { node: "HubSpot Node", purpose: "Maintains contact and deal consistency." },
      { node: "Telegram Node", purpose: "Notifies team about new qualified leads." },
      { node: "Google Sheets Node", purpose: "Updates operations reporting view." },
      { node: "Error Trigger Node", purpose: "Handles retries and failure notifications." },
    ],
    diagramSuggestion:
      "Recommended diagram: Website Form -> Webhook -> Validation -> HubSpot Sync -> Telegram Notification -> KPI Dashboard Update.",
    diagramImage: "/images/case-workflows/website-crm-sync.svg",
    implementationChallenges: [
      {
        challenge: "Field mapping mismatch between form schema and CRM fields.",
        solution: "Introduced centralized field-map object with strict typing and fallback defaults.",
      },
      {
        challenge: "Spam submissions polluted lead data.",
        solution: "Added score threshold checks and anti-spam filtering before CRM write operations.",
      },
      {
        challenge: "Webhook retry collisions caused duplicate alerts.",
        solution: "Implemented idempotency keys and dedupe checks prior to alert dispatch.",
      },
    ],
    lessonsLearned: [
      "Website conversion gains depend on post-submit operational speed.",
      "Adding source attribution early improves campaign optimization decisions.",
      "Reliable error handling is essential for trust in automation.",
    ],
    faq: [
      {
        question: "Can this support multiple forms and landing pages?",
        answer: "Yes. Additional entry points can map into the same canonical intake workflow.",
      },
      {
        question: "Can we include reCAPTCHA or anti-spam checks?",
        answer: "Yes. Spam filters can run before CRM sync and owner assignment.",
      },
      {
        question: "What CRM systems are supported?",
        answer: "HubSpot, Salesforce, Pipedrive, and custom API-connected systems are supported.",
      },
      {
        question: "Can this be localized for multilingual sites?",
        answer: "Yes. Field mapping and messaging can be configured per language.",
      },
    ],
  },
  "crm-sync-control-center": {
    subtitle: "Eliminated CRM data drift by synchronizing contacts and deal stages across systems.",
    clientProblem: [
      "Sales and success teams used different systems, leading to conflicting contact records.",
      "Deal status updates were out of sync and reporting was unreliable.",
      "Manual reconciliation consumed hours each week.",
    ],
    businessContext:
      "A B2B company with growing account volume needed trusted CRM data for forecasting and customer lifecycle operations.",
    automationGoal:
      "Build a bidirectional sync layer that keeps core contact and pipeline data consistent across CRM and operations tools.",
    workflowOverview:
      "n8n handles change events from CRM and operations apps, reconciles field conflicts with precedence rules, and syncs normalized records.",
    architectureSummary:
      "Event and scheduled reconciliation architecture with conflict resolution and audit trail.",
    architectureFlow: ["CRM Event", "Normalization", "Conflict Rules", "System Sync", "Audit Log", "Exception Queue"],
    stepByStepWorkflow: [
      "Change event arrives from primary CRM.",
      "Workflow normalizes payload and validates key identifiers.",
      "Conflict policy decides source-of-truth priority by field.",
      "Secondary systems are updated with mapped values.",
      "Audit record is created for every change transaction.",
      "Conflicts are queued for manual review if validation fails.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Webhook + Polling Nodes", purpose: "Captures both event and scheduled sync triggers." },
      { node: "Merge Node", purpose: "Combines existing and incoming records for comparison." },
      { node: "Function Node", purpose: "Applies field precedence and conflict logic." },
      { node: "CRM/API Nodes", purpose: "Writes resolved values to connected systems." },
      { node: "Data Store Node", purpose: "Stores sync transaction history." },
      { node: "Slack/Telegram Node", purpose: "Alerts team about unresolved conflicts." },
    ],
    diagramSuggestion:
      "Recommended diagram: CRM Event + Scheduled Sync -> Normalization -> Conflict Resolution -> Multi-System Update -> Audit Log -> Exception Queue.",
    diagramImage: "/images/case-workflows/crm-sync-control-center.svg",
    implementationChallenges: [
      {
        challenge: "Competing updates from multiple sources at similar timestamps.",
        solution: "Implemented deterministic precedence rules and timestamp-based tie breakers.",
      },
      {
        challenge: "Legacy fields had inconsistent naming standards.",
        solution: "Created canonical schema map and migration utility for field alignment.",
      },
      {
        challenge: "Partial API failures created drift risk.",
        solution: "Added transaction logging, retries, and exception queues with manual replay.",
      },
    ],
    lessonsLearned: [
      "Data governance rules should be decided before writing sync logic.",
      "Audit trails are critical for trust when multiple systems update the same records.",
      "Exception handling must be visible to operations teams in real time.",
    ],
    faq: [
      {
        question: "Is this near real-time or batch sync?",
        answer: "Both. Critical fields can sync in real time and full reconciliation can run on schedule.",
      },
      {
        question: "Can this support custom objects?",
        answer: "Yes. Custom entity mappings can be added with transformation logic.",
      },
      {
        question: "How do you prevent sync loops?",
        answer: "Loop prevention is handled with source markers and idempotency checks.",
      },
      {
        question: "Can we monitor sync health?",
        answer: "Yes. Dashboard metrics and alert thresholds are included.",
      },
    ],
  },
  "telegram-real-time-notifications": {
    subtitle: "Enabled real-time Telegram notifications for lead, payment, and SLA events.",
    clientProblem: [
      "Critical events were buried in email inboxes and response SLAs were missed.",
      "Operations had no consistent escalation flow for urgent events.",
      "Different teams monitored different tools without a shared notification layer.",
    ],
    businessContext:
      "A distributed team needed immediate, role-specific alerts for customer and operations events without adding operational overhead.",
    automationGoal:
      "Create a centralized Telegram alerting framework with event severity routing and contextual payload formatting.",
    workflowOverview:
      "n8n ingests events from CRM, payment, and support systems, classifies severity, and posts structured alerts to Telegram channels with escalation branches.",
    architectureSummary:
      "Unified event bus -> severity classifier -> Telegram channel router -> escalation workflow.",
    architectureFlow: ["System Event", "Classifier", "Template Builder", "Telegram Channel", "Escalation", "Resolution Log"],
    stepByStepWorkflow: [
      "Operational event is emitted by source system.",
      "n8n receives event webhook and enriches metadata.",
      "Classifier assigns severity and team ownership.",
      "Message formatter builds actionable Telegram payload.",
      "Alert is routed to primary team channel.",
      "Unacknowledged alerts escalate to management channel.",
      "Resolution status is written back to tracking table.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Webhook Node", purpose: "Captures incoming events from multiple systems." },
      { node: "Switch Node", purpose: "Routes events by type and severity." },
      { node: "Function Node", purpose: "Formats consistent alert templates." },
      { node: "Telegram Node", purpose: "Sends messages to mapped channels." },
      { node: "Wait Node", purpose: "Delays escalation check for acknowledgment window." },
      { node: "IF Node", purpose: "Triggers escalation when no acknowledgment exists." },
    ],
    diagramSuggestion:
      "Recommended diagram: Event Source -> Classifier -> Message Builder -> Telegram Channel -> Escalation Delay -> Manager Alert -> Resolution Log.",
    diagramImage: "/images/case-workflows/telegram-lead-notifications.svg",
    implementationChallenges: [
      {
        challenge: "Too many low-priority alerts created noise.",
        solution: "Introduced severity scoring and throttling rules before channel dispatch.",
      },
      {
        challenge: "Different teams needed different payload formats.",
        solution: "Implemented reusable message templates per event type and team role.",
      },
      {
        challenge: "Escalation status lacked visibility.",
        solution: "Added acknowledgment tracking and resolution logging table.",
      },
    ],
    lessonsLearned: [
      "Alert quality matters more than alert volume.",
      "Structured context in alerts reduces follow-up back-and-forth.",
      "Escalation windows should be tuned to real team response behavior.",
    ],
    faq: [
      {
        question: "Can alerts be routed by region or shift?",
        answer: "Yes. Routing can include region, time window, ownership, and severity.",
      },
      {
        question: "Can Telegram alerts include action buttons?",
        answer: "Yes. Interactive actions can trigger follow-up automation paths.",
      },
      {
        question: "Can this integrate with Slack too?",
        answer: "Yes. Telegram and Slack can run in parallel from the same event flow.",
      },
      {
        question: "How fast are alerts delivered?",
        answer: "Most alerts are delivered in seconds after event ingestion.",
      },
    ],
  },
  "ai-decision-engine": {
    subtitle: "Automated intelligent routing decisions with explainable AI confidence scoring.",
    clientProblem: [
      "Manual triage could not keep up with mixed-intent inbound requests.",
      "Team assignment quality varied by operator experience.",
      "High-value opportunities were sometimes handled too late.",
    ],
    businessContext:
      "A high-growth operations team needed consistent prioritization and routing of inbound events while maintaining explainability for decisions.",
    automationGoal:
      "Deploy an AI-assisted decision engine that classifies intent, predicts priority, and routes workflows with confidence thresholds.",
    workflowOverview:
      "n8n orchestrates data enrichment and OpenAI classification, then routes actions through confidence bands with manual fallback for low-confidence outcomes.",
    architectureSummary:
      "Classifier + confidence threshold logic with deterministic fallback branches.",
    architectureFlow: ["Inbound Event", "Context Enrichment", "AI Classification", "Confidence Gate", "Auto Route", "Manual Queue"],
    stepByStepWorkflow: [
      "Inbound request enters automation intake.",
      "Enrichment fetches account and behavioral context.",
      "OpenAI model classifies request type and urgency.",
      "Confidence gate checks score against threshold policy.",
      "High-confidence requests auto-route to correct workflow.",
      "Low-confidence requests are sent to manual triage queue.",
      "All decisions are logged with input and output metadata.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Webhook Node", purpose: "Receives inbound request payload." },
      { node: "HTTP Request Node", purpose: "Pulls account context from CRM APIs." },
      { node: "OpenAI Node", purpose: "Generates classification and recommended action." },
      { node: "IF Node", purpose: "Evaluates confidence threshold policy." },
      { node: "Execute Workflow Node", purpose: "Routes to downstream workflow branch." },
      { node: "Data Store Node", purpose: "Stores decision trace for auditing." },
    ],
    diagramSuggestion:
      "Recommended diagram: Intake -> Context Fetch -> AI Classifier -> Confidence Check -> Auto Route / Manual Review -> Decision Log.",
    diagramImage: "/images/case-workflows/ai-classification-system.svg",
    implementationChallenges: [
      {
        challenge: "Low-confidence predictions on rare request types.",
        solution: "Added manual routing branch and periodic prompt retraining from reviewed samples.",
      },
      {
        challenge: "Stakeholders needed explainability for AI outcomes.",
        solution: "Stored reason codes and confidence levels in decision logs.",
      },
      {
        challenge: "Latency increased with deep enrichment calls.",
        solution: "Cached non-volatile context and parallelized external API requests.",
      },
    ],
    lessonsLearned: [
      "Confidence gating is essential for safe production AI automation.",
      "Decision logs create alignment between technical and business teams.",
      "AI routing works best when paired with clear fallback operations.",
    ],
    faq: [
      {
        question: "Can threshold settings be customized?",
        answer: "Yes. Thresholds are configurable by workflow type and business risk profile.",
      },
      {
        question: "How often should the model be reviewed?",
        answer: "Monthly reviews are recommended for drift detection and prompt optimization.",
      },
      {
        question: "Can we override AI decisions manually?",
        answer: "Yes. Manual override controls are part of the operating model.",
      },
      {
        question: "Is AI decision data auditable?",
        answer: "Yes. Inputs, confidence, outputs, and final route are fully logged.",
      },
    ],
  },
  "human-loop-approval-gate": {
    subtitle: "Introduced approval checkpoints for sensitive AI-generated operations actions.",
    clientProblem: [
      "Automation was fast but some actions required human judgment before execution.",
      "Teams lacked a controlled way to approve or reject high-risk changes.",
      "Compliance required traceable approval records.",
    ],
    businessContext:
      "A regulated services team needed to retain AI speed benefits while enforcing approvals for policy-sensitive operations.",
    automationGoal:
      "Implement a human approval gate for high-risk actions with clear review context, SLA tracking, and auditable outcomes.",
    workflowOverview:
      "AI drafts recommendations, but n8n routes risky actions into structured approval queues where reviewers can approve, request edits, or reject.",
    architectureSummary:
      "Risk scoring layer with human checkpoints and compliance-grade logging.",
    architectureFlow: ["AI Draft", "Risk Scoring", "Approval Queue", "Approve/Reject", "Execute Action", "Audit Trail"],
    stepByStepWorkflow: [
      "AI suggests an action based on incoming event context.",
      "Risk engine scores action against policy rules.",
      "Low-risk actions continue automatically.",
      "High-risk actions enter approval queue.",
      "Reviewer receives context packet with recommendation details.",
      "Reviewer approves, edits, or rejects action.",
      "Approved actions execute and logs are stored.",
    ],
    n8nWorkflowBreakdown: [
      { node: "OpenAI Node", purpose: "Creates suggested response or action." },
      { node: "Function Node", purpose: "Applies risk and policy scoring." },
      { node: "IF Node", purpose: "Routes by risk level." },
      { node: "Slack/Telegram Node", purpose: "Requests reviewer decision." },
      { node: "Wait Node", purpose: "Holds execution until review event arrives." },
      { node: "Execution Node", purpose: "Runs approved downstream action." },
      { node: "Data Store Node", purpose: "Stores reviewer identity and decision history." },
    ],
    diagramSuggestion:
      "Recommended diagram: AI Draft -> Risk Score -> Approval Queue -> Reviewer Decision -> Execute / Reject -> Audit Log.",
    diagramImage: "/images/case-workflows/human-in-the-loop-ai.svg",
    implementationChallenges: [
      {
        challenge: "Reviewers needed full context to make fast decisions.",
        solution: "Designed compact approval payload with key facts, risk score, and source links.",
      },
      {
        challenge: "Approval bottlenecks delayed urgent workflows.",
        solution: "Added SLA timers and escalation to backup approvers.",
      },
      {
        challenge: "Compliance required non-repudiation of decisions.",
        solution: "Stored immutable approval logs with user IDs and timestamps.",
      },
    ],
    lessonsLearned: [
      "Human-in-the-loop should be optimized for reviewer speed, not just safety.",
      "Escalation paths prevent approval gates from becoming blockers.",
      "Auditability is a design requirement from day one in regulated contexts.",
    ],
    faq: [
      {
        question: "Can we require two approvers for specific actions?",
        answer: "Yes. Multi-level approvals can be configured by action class.",
      },
      {
        question: "What happens if no one approves in time?",
        answer: "Escalation policies can notify backup reviewers or pause execution safely.",
      },
      {
        question: "Can this integrate with existing ticketing systems?",
        answer: "Yes. Approval gates can sync with Jira, Zendesk, and internal systems.",
      },
      {
        question: "Is rejection feedback captured for improvement?",
        answer: "Yes. Rejection reasons feed into iterative AI prompt and policy tuning.",
      },
    ],
  },
  "conversion-follow-up-optimization": {
    subtitle: "Improved lead-to-call conversion with behavior-based follow-up automation.",
    clientProblem: [
      "Leads were captured but many never reached booked-call stage.",
      "Follow-up cadence was inconsistent and manual reminders were often skipped.",
      "No segmentation logic existed for high-intent versus low-intent leads.",
    ],
    businessContext:
      "A growth team needed to maximize ROI from paid traffic by improving post-capture conversion velocity.",
    automationGoal:
      "Automate personalized follow-up journeys based on lead behavior and engagement signals.",
    workflowOverview:
      "n8n orchestrates multi-step follow-up (email + WhatsApp + reminders) and dynamically updates cadence based on opens, clicks, and reply events.",
    architectureSummary:
      "Behavior-driven conversion workflow with branching cadence logic and appointment tracking.",
    architectureFlow: ["Lead Capture", "Segment", "Message Sequence", "Behavior Check", "Next Action", "Booking Sync"],
    stepByStepWorkflow: [
      "New lead enters CRM from website or campaign source.",
      "Segmentation logic assigns lead to intent bucket.",
      "Personalized follow-up message is sent.",
      "Engagement events are tracked (open, click, reply).",
      "Workflow branches to next cadence or direct booking prompt.",
      "Appointment booking is synced back to CRM pipeline stage.",
      "Non-responsive leads move to nurture sequence.",
    ],
    n8nWorkflowBreakdown: [
      { node: "CRM Trigger Node", purpose: "Starts flow on new qualified lead." },
      { node: "Function Node", purpose: "Assigns segment and message variant." },
      { node: "Email/WhatsApp Nodes", purpose: "Delivers scheduled follow-up content." },
      { node: "Wait Node", purpose: "Creates delay windows between follow-up steps." },
      { node: "IF Node", purpose: "Branches by engagement behavior." },
      { node: "Calendly/API Node", purpose: "Detects booking and updates status." },
    ],
    diagramSuggestion:
      "Recommended diagram: Lead Capture -> Segment -> Follow-Up Sequence -> Engagement Check -> Branch to Booking / Nurture -> CRM Stage Update.",
    diagramImage: "/images/case-workflows/conversion-optimization.svg",
    implementationChallenges: [
      {
        challenge: "Message fatigue risk from over-automation.",
        solution: "Added frequency caps and behavior-driven pauses.",
      },
      {
        challenge: "Attribution uncertainty across channels.",
        solution: "Implemented consistent UTM propagation through all follow-up events.",
      },
      {
        challenge: "Lead-quality variance reduced conversion clarity.",
        solution: "Added pre-segmentation scoring before sequence enrollment.",
      },
    ],
    lessonsLearned: [
      "Follow-up automation should adapt to engagement, not run on fixed intervals only.",
      "Fast first follow-up is critical, but sequence quality drives final conversion.",
      "Tight CRM stage mapping is required for reliable funnel reporting.",
    ],
    faq: [
      {
        question: "Can follow-up sequences be personalized?",
        answer: "Yes. Content and cadence can change by segment, source, or service interest.",
      },
      {
        question: "Can this integrate with WhatsApp and email together?",
        answer: "Yes. Multi-channel follow-up orchestration is supported.",
      },
      {
        question: "How do you avoid over-messaging?",
        answer: "Frequency caps and engagement-based stop rules are built into the flow.",
      },
      {
        question: "Can booked calls update dashboards automatically?",
        answer: "Yes. Booking events can trigger CRM stage updates and KPI dashboards.",
      },
    ],
  },
  "operations-reporting-dashboard": {
    subtitle: "Automated KPI reporting reduced manual ops reporting workload by over 70%.",
    clientProblem: [
      "Operations reports were compiled manually from multiple tools every week.",
      "Leadership lacked real-time visibility into SLA and throughput metrics.",
      "Data quality issues delayed decision-making.",
    ],
    businessContext:
      "An operations-heavy business needed centralized visibility across support, sales, and fulfillment workflows with minimal manual reporting effort.",
    automationGoal:
      "Build an automated reporting pipeline that consolidates data, computes KPIs, and distributes dashboards and alert summaries.",
    workflowOverview:
      "n8n collects data from CRM, ticketing, and spreadsheets; transforms data; updates dashboard tables; and sends executive summaries automatically.",
    architectureSummary:
      "Scheduled ETL + event alerts architecture for operational intelligence.",
    architectureFlow: ["Data Sources", "ETL Pipeline", "KPI Engine", "Dashboard Update", "Executive Digest", "Anomaly Alert"],
    stepByStepWorkflow: [
      "Scheduler triggers daily and weekly reporting jobs.",
      "Data connectors pull records from source systems.",
      "Transformation logic standardizes timestamps and ownership fields.",
      "KPI engine computes conversion, SLA, and throughput metrics.",
      "Dashboard tables are updated in reporting layer.",
      "Executive digest is sent to leadership channel.",
      "Anomaly alerts trigger if thresholds are exceeded.",
    ],
    n8nWorkflowBreakdown: [
      { node: "Cron Node", purpose: "Runs scheduled reporting jobs." },
      { node: "HTTP/CRM Nodes", purpose: "Fetches records from connected systems." },
      { node: "Function Node", purpose: "Transforms and aggregates KPI data." },
      { node: "Google Sheets/DB Node", purpose: "Writes outputs to reporting store." },
      { node: "Telegram/Slack Node", purpose: "Sends digest and alert summaries." },
      { node: "IF Node", purpose: "Triggers anomaly notifications based on thresholds." },
    ],
    diagramSuggestion:
      "Recommended diagram: Source Systems -> ETL Transform -> KPI Engine -> Dashboard -> Digest Notification -> Threshold Alerts.",
    diagramImage: "/images/case-workflows/operations-automation.svg",
    implementationChallenges: [
      {
        challenge: "Different systems used inconsistent timestamp formats.",
        solution: "Applied timezone normalization and unified timestamp schema.",
      },
      {
        challenge: "Historical data had missing ownership fields.",
        solution: "Added fallback mapping rules and data quality flags.",
      },
      {
        challenge: "Large data pulls increased execution time.",
        solution: "Introduced incremental sync windows and pagination.",
      },
    ],
    lessonsLearned: [
      "Reliable reporting starts with standardized source schemas.",
      "Automated summaries should be paired with anomaly alerting for actionability.",
      "Incremental ETL dramatically improves workflow performance.",
    ],
    faq: [
      {
        question: "Can this run in real time instead of scheduled mode?",
        answer: "Yes. Critical KPI alerts can be event-driven while full reports remain scheduled.",
      },
      {
        question: "Can we export reports automatically?",
        answer: "Yes. Reports can be exported to email, Slack, Telegram, or cloud storage.",
      },
      {
        question: "Can this connect to BI tools?",
        answer: "Yes. Output tables can feed BI tools like Looker Studio or Power BI.",
      },
      {
        question: "How long did implementation take?",
        answer: "Initial reporting automation was launched in 10 business days.",
      },
    ],
  },
};
