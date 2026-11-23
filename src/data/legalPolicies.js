import { COMPANY_INFO } from './companyData';

export const LEGAL_POLICIES = {
  privacy: {
    id: "privacy",
    title: "Privacy Policy",
    subtitle: "Compliance with Indian DPDP Act 2023, IT Act 2000 & Global Data Standards",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Introduction & Overview",
        text: `Welcome to GROCAVE (Trade Name: GROCAVE, Legal Entity: RAMBAHADUR MAHATO, GSTIN: ${COMPANY_INFO.gstin}). We value your trust and are fully committed to protecting your personal data and business confidentiality. This Privacy Policy describes how GROCAVE ("we", "our", or "us") collects, stores, uses, processes, and protects your information when you visit our website, engage with our software development services, or use any of our proprietary problem-solving digital platforms.`
      },
      {
        heading: "2. Statutory Compliance (DPDP Act 2023 & IT Act)",
        text: `This Privacy Policy is compiled in compliance with the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 of India, as well as internationally recognized data protection principles.`
      },
      {
        heading: "3. Information We Collect",
        subsections: [
          {
            title: "A. Information You Voluntarily Provide:",
            detail: `When you submit an inquiry, request technical consultation, or enter into a service agreement, we may collect: full name, corporate name, email address (${COMPANY_INFO.contact.email}), telephone/WhatsApp contact number (${COMPANY_INFO.contact.phoneFormatted}), billing address, GST registration number, project specifications, and architectural requirements.`
          },
          {
            title: "B. Automatically Collected Technical Data:",
            detail: `When accessing our web portals, our servers automatically log technical metadata including IP addresses, browser engine, operating system, referring URLs, device identifiers, and session timestamps to prevent security threats and optimize responsiveness.`
          },
          {
            title: "C. Software Project & Repository Data:",
            detail: `In the course of providing custom software engineering, we may handle client database schemas, API keys, test datasets, and system credentials strictly under non-disclosure confidentiality agreements (NDAs).`
          }
        ]
      },
      {
        heading: "4. Purpose & Lawful Grounds for Processing",
        text: `We process your data only for genuine, lawful business purposes, including:
        • Delivering bespoke software engineering, architecture, and cloud deployment services.
        • Providing 24/7 technical support, ticketing, and SLA fulfillment.
        • Invoicing, GST tax accounting, and statutory regulatory compliance.
        • Preventing security intrusions, DDoS attacks, and unauthorized access.
        • Communicating project milestone reports and critical security notices.`
      },
      {
        heading: "5. Data Confidentiality & Non-Sale Commitment",
        text: `We maintain a strict NO-SELL policy: GROCAVE does NOT sell, rent, monetize, or lease your personal information or client business data to any third-party advertisers or data brokers under any circumstances.`
      },
      {
        heading: "6. Data Security & Storage Architecture",
        text: `We enforce industry-standard administrative, technical, and physical safeguards:
        • 256-bit TLS (Transport Layer Security) encryption for all data in transit.
        • AES-256 encryption for data at rest on enterprise cloud storage.
        • Role-Based Access Control (RBAC) restricting server access exclusively to authorized engineering personnel.
        • Routine vulnerability evaluations and automated audit logging.`
      },
      {
        heading: "7. Your Rights Under Data Protection Laws",
        text: `Under the Indian DPDP Act 2023 and applicable privacy frameworks, you hold the right to:
        • Access & Summary: Request a copy of the personal data we maintain about you.
        • Correction & Erasure: Request rectification of inaccurate records or erasure of personal information once contract obligations are concluded.
        • Consent Revocation: Withdraw consent at any time for non-essential communications.
        • Grievance Redressal: Lodge a grievance with our designated Grievance Officer.`
      },
      {
        heading: "8. Data Retention Schedule",
        text: `We retain client contact and contract records only as long as necessary to satisfy the purpose for which it was gathered, fulfill contractual warranty periods, or comply with mandatory Indian tax and GST audit requirements (typically up to 7 years for financial transactions).`
      }
    ]
  },

  terms: {
    id: "terms",
    title: "Terms and Conditions",
    subtitle: "Master Software Services & Platform Terms of Engagement",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Agreement to Terms",
        text: `These Terms and Conditions constitute a legally binding agreement between you (whether individually or on behalf of an entity, "Client") and GROCAVE (Proprietorship firm represented by RAMBAHADUR MAHATO, GSTIN: ${COMPANY_INFO.gstin}, with principal office at ${COMPANY_INFO.registeredAddress.full}). By accessing our site, commissioning custom software development, or utilizing our SaaS applications, you acknowledge that you have read, understood, and agreed to be bound by these Terms.`
      },
      {
        heading: "2. Scope of Services",
        text: `GROCAVE specializes in custom business software engineering, SaaS platform development, process automation, cloud DevOps, API integration, and digital modernization. Every custom software project is governed by an associated Statement of Work (SOW) or Project Agreement detailing deliverables, timelines, milestone criteria, and commercial terms.`
      },
      {
        heading: "3. Intellectual Property Rights",
        subsections: [
          {
            title: "Custom Deliverables:",
            detail: `Upon receipt of 100% full and final payment for custom-developed software as specified in the agreed SOW, all bespoke source code, UI designs, and database structures created explicitly for the Client shall be assigned to the Client, unless mutually specified otherwise in writing.`
          },
          {
            title: "Grocave Pre-Existing IP & Frameworks:",
            detail: `GROCAVE retains full ownership of its pre-existing libraries, modular architectural boilerplates, proprietary algorithms (including CoreFlow™, OmniPulse™, CloudShield™), and internal development tools used during engineering. Clients receive a perpetual, non-exclusive, royalty-free license to use such embedded components as incorporated into the final deliverable.`
          }
        ]
      },
      {
        heading: "4. Client Obligations & Cooperation",
        text: `Timely completion of software milestones requires proactive client participation. The Client agrees to:
        • Provide necessary system requirements, business logic clarifications, and feedback within the agreed review windows (standard: 5 business days).
        • Supply test data, credentials, and third-party API keys required for development.
        • Designate a single point of contact (SPOC) for technical approvals.`
      },
      {
        heading: "5. Invoicing, Payments & Taxes",
        text: `• Invoicing: Software contracts are billed on a milestone, sprint, or retainer basis as described in the applicable invoice.
        • GST: All quoted prices are subject to Goods and Services Tax (GST @ 18%) as per Government of India statutory requirements under GSTIN ${COMPANY_INFO.gstin}.
        • Payment Timelines: Invoices are payable within 7 calendar days of issuance unless otherwise agreed in writing. Delinquent payments may incur a pause on deployment and repository access until settled.`
      },
      {
        heading: "6. Warranty & Bug-Fix Period",
        text: `We stand firmly behind our code. Custom software releases include a standard 30 to 90-day complimentary bug-fix warranty (as specified in your SOW) covering defects that deviate from the agreed specifications. Post-warranty maintenance is provided under our ongoing Annual Maintenance Contracts (AMC) or SLA packages.`
      },
      {
        heading: "7. Limitation of Liability",
        text: `To the maximum extent permitted under applicable law, in no event shall GROCAVE or its proprietor RAMBAHADUR MAHATO be liable for any indirect, incidental, consequential, special, or punitive damages (including loss of profits, data corruption, business disruption) arising out of the use or inability to use the software. GROCAVE's maximum aggregate liability shall be capped at the total amount actually paid by the Client to GROCAVE under the specific work order within the three (3) months preceding the claim.`
      },
      {
        heading: "8. Governing Law & Dispute Resolution",
        text: `These Terms and any dispute arising from them shall be governed by and construed in accordance with the laws of the Republic of India. In the event of any conflict, the parties agree to seek amicable resolution through good-faith negotiation. If unresolved within 30 days, the dispute shall be subject to the exclusive jurisdiction of the competent civil courts situated in Darbhanga, Bihar, India.`
      }
    ]
  },

  refund: {
    id: "refund",
    title: "Refund & Cancellation Policy",
    subtitle: "Transparent, Fair & Milestone-Aligned Commercial Terms",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Overview & Policy Intent",
        text: `At GROCAVE, our commitment is to engineer high-grade, problem-solving software that delivers tangible business outcomes. Because software engineering involves significant allocation of senior engineering hours, server staging infrastructure, and intellectual labor from day one, refunds are governed by transparent, milestone-based criteria.`
      },
      {
        heading: "2. Custom Software Development Projects",
        subsections: [
          {
            title: "Discovery & Architecture Phase (Initial Deposit):",
            detail: `The initial discovery and architecture deposit covers requirements gathering, UX wireframing, and technical schema design. If a Client requests cancellation before any engineering begins and within 3 calendar days of project sign-off, a refund may be granted less an administrative setup fee of 15%. Once architecture documentation or wireframes have been delivered, this phase fee is non-refundable.`
          },
          {
            title: "Milestone-Based Development:",
            detail: `Payments linked to completed milestones (e.g., Sprint 1 Frontend, Sprint 2 Database, Sprint 3 API) that have been reviewed, tested, and signed off in UAT (User Acceptance Testing) are strictly non-refundable. If a project is cancelled mid-milestone, the Client is only responsible for billable hours accrued up to the written date of termination.`
          }
        ]
      },
      {
        heading: "3. SaaS Subscriptions & Recurring Licenses",
        text: `For proprietary Grocave cloud products or SaaS platforms:
        • Monthly Subscriptions: You may cancel your monthly recurring subscription at any time via your account settings or by emailing ${COMPANY_INFO.contact.email}. Cancellation takes effect at the end of the current billing cycle, with no mid-month partial prorated refunds.
        • Annual Commitments: If cancelled within the first 14 calendar days of an annual renewal, a full refund less one month's standard fee will be disbursed. Beyond 14 days, annual subscriptions are non-refundable.`
      },
      {
        heading: "4. Non-Refundable Items & Services",
        text: `The following expenditures are non-refundable under all circumstances:
        • Third-party licenses, cloud hosting fees (AWS, Google Cloud, DigitalOcean), domain purchases, or SSL certificates procured on Client behalf.
        • Specialized third-party API credits (e.g., WhatsApp Cloud API, SMS gateways, OpenAI tokens, payment gateway verification fees).
        • Dedicated consulting hours already expended by our technical team.`
      },
      {
        heading: "5. Refund Request & Processing Procedure",
        text: `To request a formal refund or project cancellation review:
        1. Submit an official written notification to ${COMPANY_INFO.contact.email} citing your Project Invoice Number, GSTIN, and grounds for cancellation.
        2. Our management and technical lead will review the progress logs and respond within 3 business days.
        3. Approved refunds will be processed via original payment channel (Bank Transfer / UPI / Card) within 7 to 10 business days.`
      }
    ]
  },

  delivery: {
    id: "delivery",
    title: "Shipping & Digital Delivery Policy",
    subtitle: "Electronic Fulfillment, Source Code Handover & Deployment SLAs",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Nature of Delivery (100% Digital Fulfillment)",
        text: `GROCAVE is a pure software and technology development company. We do NOT manufacture, stock, ship, or deliver physical goods. All deliverables, software applications, SaaS products, source codes, and documentation are delivered 100% electronically via secure digital channels.`
      },
      {
        heading: "2. Delivery Methods & Handover Protocols",
        subsections: [
          {
            title: "Source Code Repositories:",
            detail: `Delivered through private GitHub, GitLab, or Bitbucket repositories, transferred directly to the Client's enterprise organization upon final milestone clearance.`
          },
          {
            title: "Cloud & Production Deployments:",
            detail: `Deployed directly to Client-designated cloud infrastructure (AWS, Vercel, GCP, DigitalOcean, VPS) accompanied by continuous integration (CI/CD) pipelines.`
          },
          {
            title: "Software Documentation & Binaries:",
            detail: `Delivered via encrypted cloud storage links, including architectural diagrams, API Swagger documentation, environment variables guides, and administrative manuals.`
          }
        ]
      },
      {
        heading: "3. Standard Timelines & Delivery Schedules",
        text: `Delivery timelines depend strictly upon project scope agreed in the Statement of Work:
        • Rapid Prototypes & MVPs: 2 to 4 weeks.
        • Full Enterprise Custom Software / ERP: 6 to 16 weeks across scheduled sprints.
        • Digital SaaS Provisioning: Instantaneous or within 24 hours of account verification.
        • Bug-fix & Patch Releases: Within 24-48 hours during active warranty periods.`
      },
      {
        heading: "4. Confirmation of Delivery & Acceptance Testing",
        text: `Upon completion of digital delivery, the Client is provided an agreed User Acceptance Testing (UAT) window (standard: 7 to 14 calendar days) to verify that all functional criteria have been satisfied. If no written objections or bugs are recorded within this period, the deliverable is deemed formally accepted.`
      },
      {
        heading: "5. Delivery Delay Exceptions",
        text: `GROCAVE is not liable for delivery delays arising from:
        • Delay by Client in supplying required business assets, credentials, or API clearances.
        • Outages or latency caused by third-party cloud hosts, domain registries, or payment gateway providers.
        • Force Majeure events, statutory network disruptions, or acts of state.`
      }
    ]
  },

  grievance: {
    id: "grievance",
    title: "Contact Us & Grievance Redressal",
    subtitle: "Statutory Transparency Under Indian IT & E-Commerce Regulations",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Regulatory Disclosure & Corporate Identity",
        text: `In compliance with the Information Technology Act, 2000, Consumer Protection (E-Commerce) Rules, 2020, and GST regulations, the verified statutory details of the business are provided below:`
      },
      {
        heading: "2. Registered Enterprise Credentials",
        subsections: [
          {
            title: "Trade Name:",
            detail: COMPANY_INFO.tradeName
          },
          {
            title: "Legal Entity Name:",
            detail: COMPANY_INFO.legalName
          },
          {
            title: "Constitution of Business:",
            detail: COMPANY_INFO.constitution
          },
          {
            title: "GSTIN (Goods and Services Tax Identification Number):",
            detail: COMPANY_INFO.gstin
          },
          {
            title: "Date of Business Registration:",
            detail: COMPANY_INFO.registrationDate
          },
          {
            title: "Principal Place of Business:",
            detail: COMPANY_INFO.registeredAddress.full
          }
        ]
      },
      {
        heading: "3. Designated Grievance Officer",
        text: `If you have any queries, concerns, technical disputes, or privacy grievances regarding our services, you may reach out directly to our appointed Grievance Officer:
        • Name of Grievance Officer: ${COMPANY_INFO.compliance.grievanceOfficer}
        • Designation: Proprietor & Principal Technology Director
        • Direct Telephone / WhatsApp: ${COMPANY_INFO.contact.phoneFormatted} (Call: ${COMPANY_INFO.contact.phone})
        • Official Email: ${COMPANY_INFO.compliance.grievanceEmail}
        • Postal Communication: ${COMPANY_INFO.registeredAddress.full}`
      },
      {
        heading: "4. Grievance Redressal Escalation Matrix",
        text: `• Acknowledgement: Every formal written grievance received at ${COMPANY_INFO.compliance.grievanceEmail} will be acknowledged within 24 to 48 hours with a unique grievance tracking number.
        • Investigation: Our engineering and legal team will investigate the issue and communicate findings within 7 business days.
        • Final Resolution: We endeavor to fully resolve all grievances within a maximum period of 30 calendar days from the date of receipt.`
      }
    ]
  },

  disclaimer: {
    id: "disclaimer",
    title: "Disclaimer & Intellectual Property",
    subtitle: "Trademarks, Legal Disclaimers & Usage Limitations",
    lastUpdated: "November 2024",
    content: [
      {
        heading: "1. Brand & Trademark Notice",
        text: `The GROCAVE mark, logo, the stylized "G" swoosh insignia, the phrase "BUILD • GROW • THRIVE", and all related product identifiers (including CoreFlow™, OmniPulse™, CloudShield™) are the exclusive intellectual property of RAMBAHADUR MAHATO (Trade Name: GROCAVE). Any unauthorized reproduction, imitation, or commercial use without prior written consent is strictly prohibited.`
      },
      {
        heading: "2. Technical Advice Disclaimer",
        text: `The technical articles, architectural guides, and software specifications published on this website are provided for informational and marketing purposes. While we endeavor to keep all information current and accurate, GROCAVE makes no warranties of any kind regarding the completeness, accuracy, or suitability of the information for any specific custom deployment outside a formal bilateral contract.`
      },
      {
        heading: "3. Third-Party Trademarks",
        text: `All third-party trademarks, logos, and brand names mentioned on this website (such as AWS, React, Python, Docker, Razorpay, Stripe, WhatsApp) are the property of their respective owners. Their mention here is purely for descriptive purposes to indicate technical compatibility and integration capabilities.`
      }
    ]
  }
};
