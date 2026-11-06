// All personal content lives here. Edit this file, not main.js.
// Leave a field empty ("" or []) and its section/button disappears.
const SITE = {
  identity: {
    fullName: "Nikhil Gokarakonda",
    firstName: "Nikhil",
    lastName: "Gokarakonda",
    initials: "NG",
    profession: "Full-Stack Software Engineer",
    company: "Lucidity",
    location: "Bengaluru, India",
    availability: "", // e.g. "Open to collaborations" — empty hides it
    intro:
      "I build product end-to-end at Lucidity, an autonomous cloud storage optimization platform — React.js on the front, Spring Boot on the back. Into machine learning and competitive programming on the side.",
    about: [
      "I'm a Full-Stack Software Engineer at <b>Lucidity</b>, working on the <b>StoreFront dashboard</b> end-to-end — <b>React.js</b> on the front and <b>Spring Boot</b> on the back.",
      "A Computer Science graduate from <b>NIT Patna</b> (CGPA 8.36), I like owning features from UI to data layer, and I'm into <b>machine learning</b> and <b>competitive programming</b>.",
      "Recently I built a homegrown <b>AI-powered PR review tool</b> with a pluggable LLM switch for Claude and Gemini — bridging clean engineering with practical AI.",
    ],
    portrait: "assets/portrait.webp",
    resume: "",
    highlights: ["React.js", "Spring Boot", "Java", "TypeScript", "Python", "Elasticsearch"],
  },

  // Verified numbers only.
  metrics: [
    { value: "30%", label: "more accurate cost-savings" },
    { value: "~25%", label: "faster key page loads" },
    { value: "8.36", label: "CGPA, NIT Patna" },
  ],

  contact: {
    email: "nikhil652004@gmail.com",
    linkedin: "https://www.linkedin.com/in/nikhil-sri-sai-teja-gokarakonda-0bb614250",
    github: "https://github.com/Nikhil-652004",
    instagram: "https://www.instagram.com/nikhil_6.5.24",
  },

  projects: [
    {
      id: "ai-pr-review",
      title: "AI PR Review Tool",
      category: "AI / Tooling",
      year: "2025",
      summary: "Homegrown pull-request reviewer with a pluggable LLM switch for Claude and Gemini.",
      description:
        "Built at Lucidity: an AI-powered PR review tool that plugs into the team's workflow, with a switchable model backend so reviews can run on Claude or Gemini.",
      role: "Engineer",
      tools: ["LLMs", "Claude", "Gemini"],
      coverImage: "",
      liveUrl: "",
      sourceUrl: "",
      featured: true,
    },
    {
      id: "qicso",
      title: "QICSO Research",
      category: "Research",
      year: "",
      summary: "Quantum-inspired Cuckoo Search improving UAV-assisted user allocation by 13%.",
      description:
        "Research on a quantum-inspired variant of Cuckoo Search optimization applied to UAV-assisted user allocation, improving allocation by 13%. Paper pending publication.",
      role: "Researcher",
      tools: [],
      coverImage: "",
      liveUrl: "",
      sourceUrl: "",
      featured: true,
    },
    {
      id: "tomato-cnn",
      title: "Tomato CNN",
      category: "Machine Learning",
      year: "",
      summary: "CNN classifying tomato leaf diseases across 9 categories.",
      description:
        "A convolutional neural network that classifies tomato leaf diseases across 9 categories, reaching 93.3% train and 88.1% test accuracy.",
      role: "Solo project",
      tools: ["Python", "CNNs"],
      coverImage: "assets/projects/tomato.webp",
      liveUrl: "",
      sourceUrl: "https://github.com/Nikhil-652004/Tomato_crop_virus_detection",
      featured: false,
    },
    {
      id: "fraud-detection",
      title: "Fraud Detection",
      category: "Machine Learning",
      year: "",
      summary: "Detecting fraudulent online payments with ML classification models.",
      description: "Machine-learning classification models that flag fraudulent online payment transactions. Built with Python.",
      role: "Solo project",
      tools: ["Python"],
      coverImage: "assets/projects/fraud.webp",
      liveUrl: "",
      sourceUrl: "https://github.com/Nikhil-652004/Online_Payment_Fraud_Detection",
      featured: false,
    },
    {
      id: "weather",
      title: "Weather App",
      category: "Web App",
      year: "",
      summary: "Live weather with location search and hourly & 7-day forecasts.",
      description: "A weather web app with location search, live conditions, and hourly plus 7-day forecasts. Built with JavaScript.",
      role: "Solo project",
      tools: ["JavaScript"],
      coverImage: "assets/projects/weather.webp",
      liveUrl: "https://weathernode.netlify.app/",
      sourceUrl: "",
      featured: false,
    },
  ],

  experience: [
    {
      title: "Software Development Engineer",
      org: "Lucidity",
      dates: "Jul 2025 — Present",
      place: "Bengaluru, India",
      points: [
        "Promoted to full-time SDE.",
        "Improved cost-savings accuracy by 30% (Spring Boot).",
        "Introduced Trino as a unified query layer.",
        "Built the Savings Drilldown feature (FE + BE) with Grafana panels.",
        "Integrated Elasticsearch search into the UI.",
        "Built an AI-powered PR review tool.",
        "Champions Award, Q4 2025.",
      ],
    },
    {
      title: "SDE Intern",
      org: "Lucidity",
      dates: "Jan 2025 — Jun 2025",
      place: "Bengaluru, India",
      points: [
        "Owned the front-end of the Agent Install flow and StoreFront platform in React.js.",
        "Cut key page load time by ~25% via code-splitting and lazy loading.",
        "Shipped the end-to-end Agent Install onboarding with design and backend teams.",
      ],
    },
    {
      title: "B.Tech, Computer Science & Engineering",
      org: "NIT Patna",
      dates: "2021 — 2025",
      place: "Patna, India",
      points: [
        "Graduated with a CGPA of 8.36.",
        "Built ML and full-stack projects and published quantum-inspired optimization research.",
        "Stayed active in competitive programming.",
      ],
    },
  ],

  skills: [
    { group: "Languages", items: ["Java", "JavaScript", "TypeScript", "Python", "C++", "SQL"] },
    { group: "Frontend", items: ["React.js", "HTML", "CSS", "Electron.js"] },
    { group: "Backend & Data", items: ["Spring Boot", "REST APIs", "Trino", "Grafana", "Elasticsearch", "MySQL"] },
    { group: "Machine Learning", items: ["TensorFlow", "scikit-learn", "pandas", "CNNs"] },
    { group: "Tools", items: ["Git", "GitHub", "Bitbucket", "IntelliJ", "Postman", "VS Code"] },
    { group: "Coursework", items: ["Operating Systems", "DBMS", "Computer Networks", "OOP"] },
  ],

  spokenLanguages: ["Telugu", "English", "Hindi"],
};
