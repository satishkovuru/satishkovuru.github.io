// Edit this file to showcase your own projects.
const REPO = 'https://github.com/satishkovuru/satishkovuru.github.io/tree/master/projects';
const LIVE = 'https://satishkovuru.github.io/projects';

export const projects = [
  {
    title: 'Portfolio Website',
    description:
      'This site — a React + Vite portfolio built to present my background, skills, and résumé, deployed automatically to GitHub Pages.',
    tags: ['React', 'Vite', 'GitHub Actions'],
    link: 'https://github.com/SatishKovuru/satishkovuru.github.io',
    linkLabel: 'View Source',
  },
  {
    title: 'PipelineSentinel — CI/CD Anomaly Detection',
    meta: 'Independent project — in progress',
    description:
      'A lightweight anomaly-detection layer for CI/CD pipelines: pulls run metadata from the GitHub Actions API, scores runs with an IsolationForest over duration, failure rate, and retries, and surfaces flagged runs with the reason in a Streamlit dashboard — built to cut manual pipeline triage time.',
    tags: ['Anomaly Detection', 'scikit-learn', 'Isolation Forest', 'Streamlit', 'CI/CD'],
    link: `${REPO}/pipeline-sentinel`,
    linkLabel: 'View Source',
  },
  {
    title: 'SuperKart — Sales Forecasting & Model Deployment',
    meta: 'Great Learning — Model Deployment · Jul 2026',
    description:
      "Built a predictive model to forecast quarterly outlet sales revenue for a multi-city retail supermarket chain, then deployed it as a live prediction service via Flask and Streamlit to support inventory and regional sales decisions.",
    tags: ['EDA', 'Model Building', 'Hyperparameter Tuning', 'Docker', 'Flask', 'Streamlit', 'HuggingFace'],
    demoLink: `${LIVE}/superkart.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/superkart`,
    linkLabel: 'View Source',
  },
  {
    title: 'HelmNet — Safety Helmet Detection',
    meta: 'Great Learning — Introduction to Computer Vision · Jun 2026',
    description:
      'Built an automated image analysis system to detect whether workers are wearing safety helmets, using CNNs with transfer learning and data augmentation to improve safety compliance monitoring.',
    tags: ['EDA', 'CNN', 'Transfer Learning', 'Fine Tuning', 'Data Augmentation'],
    demoLink: `${LIVE}/helmnet.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/helmnet`,
    linkLabel: 'View Source',
  },
  {
    title: 'Medical Assistant — RAG-Based Healthcare Q&A',
    meta: 'Great Learning — NLP with Generative AI · May 2026',
    description:
      'Developed a RAG-based AI solution over medical manuals to reduce information overload and support clinical decision-making, with a functional prototype demonstrating diagnostic-support feasibility.',
    tags: ['RAG', 'LLM', 'Prompt Engineering', 'Data Preprocessing'],
    demoLink: `${LIVE}/medical-assistant-rag.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/medical-assistant-rag`,
    linkLabel: 'View Source',
  },
  {
    title: 'ReneWind — Wind Turbine Failure Prediction',
    meta: 'Great Learning — Introduction to Neural Networks · Apr 2026',
    description:
      "Built and tuned neural network classification models on sensor data to predict wind turbine generator failures ahead of breakdown, enabling proactive maintenance and reduced downtime costs.",
    tags: ['EDA', 'Classification', 'Neural Networks', 'Activation Functions'],
    demoLink: `${LIVE}/renewind.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/renewind`,
    linkLabel: 'View Source',
  },
  {
    title: 'EasyVisa — Visa Approval Prediction',
    meta: 'Great Learning — Advanced Machine Learning · Mar 2026',
    description:
      'Analyzed visa applicant data and built ensemble models (bagging, boosting, stacking) to predict visa approval outcomes, surfacing the key factors driving certification decisions with business recommendations.',
    tags: ['Bagging', 'Boosting', 'Stacking', 'Hyperparameter Tuning', 'Business Insights'],
    demoLink: `${LIVE}/easyvisa.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/easyvisa`,
    linkLabel: 'View Source',
  },
  {
    title: 'Personal Loan Campaign — Customer Targeting Model',
    meta: 'Great Learning — Machine Learning · Feb 2026',
    description:
      "Built a decision-tree model to identify bank customers most likely to purchase a personal loan, helping target marketing spend and improve campaign conversion rates.",
    tags: ['EDA', 'Decision Tree', 'Model Evaluation', 'Business Recommendations'],
    demoLink: `${LIVE}/personal-loan-campaign.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/personal-loan-campaign`,
    linkLabel: 'View Source',
  },
  {
    title: 'FoodHub — Food Delivery Demand Analysis',
    meta: 'Great Learning — Python Foundations · Jan 2026',
    description:
      'Performed exploratory data analysis for a food aggregator to surface demand patterns across restaurants and cuisines, delivering actionable recommendations to improve customer experience.',
    tags: ['Python', 'NumPy', 'Pandas', 'Seaborn', 'EDA'],
    demoLink: `${LIVE}/foodhub.html`,
    demoLabel: 'View Notebook',
    link: `${REPO}/foodhub`,
    linkLabel: 'View Source',
  },
];
