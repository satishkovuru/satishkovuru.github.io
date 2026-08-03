// Edit this file to keep your résumé content in sync with the Resume page.
export const education = [
  {
    school: 'Northern Illinois University',
    location: 'DeKalb, IL',
    degree: 'MS, Management Information Systems — GPA 3.53',
    period: 'Aug 2015 – Dec 2016',
    details: [],
  },
  {
    school: 'Anna University',
    location: 'Chennai, India',
    degree: 'BE, Civil Engineering — GPA 3.50',
    period: 'Aug 2009 – May 2013',
    details: [],
  },
];

export const achievements = [
  { value: '10+', label: 'Years of Experience' },
  { value: '5', label: 'Companies Led QA For' },
  { value: '1,500+', label: 'Automated Test Scripts Built' },
  { value: '60%', label: 'Manual Testing Effort Reduced' },
  { value: '0', label: 'Critical Post-Production Defects' },
];

export const experience = [
  {
    company: 'LPL Financial',
    role: 'Lead Software Developer in Test',
    period: 'Jan 2024 – Present',
    location: 'Austin, TX',
    summary:
      'Leading QA automation strategy for advisor trading & wealth-management platforms — driving the Selenium→Playwright migration and AI-augmented testing workflows.',
    bullets: [
      'Define and execute test strategy and test plans for advisor trading and wealth-management applications — functional, regression, API, security, and release-gate testing.',
      'Achieve zero critical post-production defects on owned releases through rigorous release-gate and regression testing.',
      'Designed and maintain a Selenium + TestNG + Java framework, achieving a 60% reduction in manual execution effort and a 40% increase in regression coverage.',
      'Drive migration from Selenium/Java to Playwright (TypeScript) across 500+ automated tests for faster, more stable end-to-end automation.',
      'Automate GraphQL and REST APIs using Postman and Rest Assured — covering queries, schema validation, authentication, and routing.',
      'Lead QA for legacy-to-modern migration from monolithic REST to GraphQL, including side-by-side data validation and cutover.',
      'Built AI-augmented QA workflows using MCP and Cursor AI, achieving 30% faster test case design, locator discovery, and triage.',
      'Perform Appium (UiAutomator2) mobile automation for advisor Android applications.',
      'Manage test traceability in QTest and Zephyr; validate data with SQL across legacy and modern data sources.',
      'Provision AWS test environments (EC2, S3, VPC) via CloudFormation; strengthen DevOps practices through Octopus and GitHub Actions CI/CD pipelines across the SDLC.',
      'Mentor a team of 4 QA engineers on Playwright, GraphQL API testing, Selenium/TestNG, and AI-assisted testing.',
    ],
  },
  {
    company: 'TransUnion',
    role: 'Sr. Software Developer in Test',
    period: 'Mar 2020 – Dec 2023',
    location: 'Chicago, IL',
    summary:
      'Built a hybrid UI/API/mobile automation framework and led the Robot Framework → Playwright migration across credit and Salesforce platforms.',
    bullets: [
      'Designed a hybrid automation framework for Web UI, mobile, REST, and SOAP APIs using Serenity BDD, SpecFlow, Rest Assured, and RestSharp, increasing automation coverage by 30%.',
      'Led migration from Robot Framework to Playwright across 300+ test cases, reducing maintenance effort 30% and improving execution stability.',
      'Automated API validation with SOAP UI, Ready API, Postman, and Rest Assured; developed ETL tests with Ab Initio Express IT, expanding data validation coverage 20% and defect detection 30%.',
      'Enhanced Salesforce QA by automating lead creation, opportunity management, quote generation, Lightning and Classic workflows, triggers, process builder, and credit bureau integrations.',
      'Automated Salesforce UI using an in-house framework and PORV tool for Shadow DOM locators; built end-to-end Sales Cloud regression coverage for dashboards and credit product launches.',
      'Used CA DevTest for service virtualization, SQL for database validation, and Bash scripts for data comparison; mentored a team of 3 QA engineers through workshops and best practices.',
    ],
  },
  {
    company: 'Motorola Solutions Inc.',
    role: 'SDET / CPQ Developer',
    period: 'Nov 2017 – Feb 2020',
    location: 'Schaumburg, IL',
    summary:
      'Built data-driven Selenium frameworks and owned CPQ/Salesforce/OCC test automation across ecommerce and radio-device platforms.',
    bullets: [
      'Developed a Java Selenium WebDriver data-driven framework with Apache POI, improving coverage and reducing turnaround time 30%.',
      'Performed SOAP and REST API testing and Appium mobile testing on Android and radio devices.',
      'Automated functional, regression, integration, and performance testing for Salesforce Lightning and Classic, Oracle Cloud CPQ, Oracle Commerce Cloud, and ecommerce storefront flows.',
      'Created and maintained BML code, CPQ product configurations, pricing waterfalls, tiered pricing, constraints, document generation, and Oracle R12 Configurator and COF setups.',
      'Designed API and integration tests for Salesforce and OCC web services covering payloads, authentication, and error handling.',
      'Conducted load and performance testing for OCC and Salesforce APIs; supported ERP migration, RPA initiatives, Six Sigma QA processes, and cross-functional release activities.',
    ],
  },
  {
    company: 'Capgemini Financial Services',
    role: 'Associate Consultant',
    period: 'Mar 2017 – Nov 2017',
    location: 'Chicago, IL',
    summary:
      'Built and scaled 1,500+ automated test scripts across UI, API, and performance testing for financial services clients.',
    bullets: [
      'Developed and executed 1,500+ automated test scripts using Java, Selenium WebDriver, and TestNG, increasing test coverage 35% and enabling early defect detection across regression suites.',
      'Automated UI, API, and performance testing using Rest Assured, SOAP UI, Postman, and JMeter, integrated into CI/CD pipelines.',
      'Implemented Cucumber BDD across regression suites, reducing release cycle time 20–25%.',
    ],
  },
  {
    company: 'Accenture',
    role: 'Software Engineering Analyst',
    period: 'Oct 2013 – Jul 2015',
    location: 'India',
    summary:
      'Automated 650+ UI/API test cases and built CI pipelines executing 200+ automated test runs per sprint.',
    bullets: [
      'Automated 650+ UI and API test cases using Selenium WebDriver, Rest Assured, Java, JUnit, and TestNG, reducing manual testing effort 35% across sprint-based regression cycles.',
      'Built TestNG and Jenkins CI pipelines automating 200+ test executions per sprint; validated backend data using SQL, stored procedures, and optimized queries for REST API test scenarios.',
      'Designed a Java/Spring MVC test automation tool with structured logging (Log4j), reducing manual QA effort 70%; tracked defects in JIRA and HP Quality Center.',
    ],
  },
];

export const skills = [
  { category: 'UI Automation', items: ['Selenium', 'Playwright', 'SpecFlow', 'Appium'] },
  { category: 'Languages', items: ['Java', 'Python', 'C#', 'TypeScript', 'SQL', 'Shell'] },
  {
    category: 'API Testing',
    items: ['Postman', 'Newman', 'Rest Assured', 'GraphQL', 'SOAP UI', 'Ready API', 'CA Lisa/DevTest'],
  },
  { category: 'Frameworks', items: ['TestNG', 'JUnit', 'NUnit', 'Cucumber', 'BDD/TDD', 'Robot Framework'] },
  { category: 'CI/CD & Version Control', items: ['Jenkins', 'GitHub Actions', 'Octopus', 'Git', 'GitHub'] },
  { category: 'Cloud & Platforms', items: ['AWS (EC2, S3, CloudFormation)', 'Oracle Cloud CPQ', 'Salesforce'] },
  {
    category: 'Non-Functional Testing',
    items: ['Performance testing', 'Load testing (JMeter)', 'Security/release-gate testing', 'Integration testing'],
  },
  {
    category: 'AI / GenAI',
    items: ['GitHub Copilot', 'Cursor AI', 'MCP', 'Agentic AI', 'LLM-assisted test generation', 'Claude Code'],
  },
  { category: 'Databases', items: ['SQL', 'Oracle', 'PostgreSQL', 'RDS', 'Aurora'] },
  { category: 'Mobile', items: ['Appium (UiAutomator2)', 'Sauce Labs', 'LambdaTest'] },
  {
    category: 'Tools',
    items: ['JIRA', 'Confluence', 'QTest', 'Zephyr', 'Report Portal', 'Splunk', 'Kibana', 'Grafana', 'Dynatrace'],
  },
];

export const certifications = [];
