// Everything on the site comes from here. Facts are taken from the GitHub READMEs.
const gh = "https://github.com/Joshit-innit";

export const links = {
  email: "tammanajoshit2006@gmail.com",
  github: gh,
  linkedin: "https://www.linkedin.com/in/tammana-joshit-97516b344",
  leetcode: "https://leetcode.com/u/Tammana-Joshit/"
};

export const work = [
  {
    title: "NutriNation",
    kind: "E-commerce · Microservices",
    year: "2026",
    summary: "An online store for dry fruits. I built the storefront and admin dashboard in Next.js, and the backend as Spring Boot microservices.",
    points: [
      "Designed four microservices (API gateway, product, customer, order), deployed with Docker on Render",
      "Used Eureka service discovery, OpenFeign and Resilience4j circuit breakers for fault tolerance",
      "Built an admin dashboard for inventory, orders, coupons and sales analytics"
    ],
    stack: ["Next.js", "TypeScript", "Spring Boot", "Spring Cloud", "PostgreSQL", "Docker"],
    live: "https://nutrination.netlify.app",
    code: `${gh}/DryNutsWebsite`,
    image: "/work/nutrination.jpg"
  },
  {
    title: "FindMyMovie",
    kind: "Full-stack · AI search",
    year: "2026",
    summary: "I got tired of looking up a movie and finding it wasn't on any service I had. This app shows where a film is available to stream, rent or buy.",
    points: [
      "Built a REST API with Node.js and Express, deployed with Docker on Render",
      "Integrated the TMDB and Watchmode APIs, plus a Gemini-powered assistant (OpenAI as fallback) for search and recommendations",
      "Added a TiDB (MySQL) cache to cut repeat calls to paid APIs"
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "MySQL", "Docker"],
    live: "https://findmymoviex.netlify.app",
    code: `${gh}/FindMyMovie`,
    image: "/work/findmymovie.jpg"
  },
  {
    title: "YouTube Comment Analysis",
    kind: "Machine Learning · NLP",
    year: "2026",
    summary: "A Streamlit dashboard that reads a YouTube video's comments and breaks them down by sentiment, toxicity, spam and topic.",
    points: [
      "Trained a toxicity classifier with TF-IDF and logistic regression",
      "Built an NLP pipeline for text cleaning, clustering and spam detection",
      "Pulls live comments through the YouTube Data API v3"
    ],
    stack: ["Python", "scikit-learn", "NLP", "Streamlit", "Plotly"],
    live: "https://commentsentimentanalysis.streamlit.app/",
    code: `${gh}/YoutubeCommentAnalysis`,
    stats: [
      ["550K+", "comments in the training data"],
      ["~94%", "model accuracy"],
      ["1K+", "comments analyzed per video"]
    ]
  },
  {
    title: "MutualifyX",
    kind: "Fintech · Full-stack",
    year: "2025–26",
    summary: "A mutual fund platform with separate dashboards for investors, financial advisors and admins.",
    points: [
      "Implemented role-based access for three types of users",
      "Built portfolio analytics for diversification, risk exposure and asset allocation",
      "Containerized the application with Docker"
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Docker"],
    live: "https://mutualifyx.netlify.app/",
    image: "/work/mutualifyx.jpg"
  },
  {
    title: "Student Performance",
    kind: "Machine Learning · Java",
    year: "2026",
    summary: "A dashboard that helps teachers see what affects exam scores, and predicts a student's score from their profile.",
    points: [
      "Connected a Spring Boot REST API to a scikit-learn model through a Python service",
      "Built exploratory data analysis (EDA) views for score distributions and correlations"
    ],
    stack: ["React", "Spring Boot", "Python", "scikit-learn"],
    code: `${gh}/StudentPerformanceDashBoardMachineLearning`,
    flow: ["React", "POST /api/predict", "Spring Boot", "predict.py", "model.pkl"]
  },
  {
    title: "PrimeTrade Analysis",
    kind: "Data Analysis",
    year: "2026",
    summary: "I looked at how market sentiment, measured by the Fear & Greed Index, changes the way people trade crypto.",
    points: [
      "Cleaned and merged two datasets with pandas",
      "Extreme Greed days had the highest average profit, and Fear days had the most trades",
      "Sentiment changed how people traded more than whether they made money"
    ],
    stack: ["Python", "pandas", "Seaborn", "Jupyter"],
    code: `${gh}/PrimeTradeAnalysis`,
    stats: [
      ["211,218", "trade records cleaned and analyzed"],
      ["124,355", "losing trades, against 86,863 profitable ones"],
      ["2 years", "of trading data, 2023 to 2025"]
    ]
  }
];

export const archive = [
  ["2026", "YouTube Comment Analysis", "Sentiment, toxicity and spam for any video's comments. Classifier trained on 550K+ comments, ~94% accuracy", "Python", "https://commentsentimentanalysis.streamlit.app/", "data"],
  ["2026", "Student Performance", "Predicts exam scores: a Spring Boot API calling a scikit-learn model through a Python service", "Java · Python", "StudentPerformanceDashBoardMachineLearning", "backend"],
  ["2026", "PrimeTrade Analysis", "How the Fear & Greed Index changes the way people trade crypto, across 211,218 trades", "Python", "PrimeTradeAnalysis", "data"],
  ["2026", "SOA Microservices", "Spring Boot microservices with an API gateway and Eureka service discovery", "Java", "soa-microservices-deploy", "backend"],
  ["2026", "Retail Management", "REST API for products, customers and orders with Spring Boot and MySQL", "Java", "Retail-management-System", "backend"],
  ["2026", "Community Center", "Full-stack app with Docker and a CI/CD pipeline on GitHub Actions", "Java · JS", "community-center-management", "web"],
  ["2026", "AI Dresser", "Virtual try-on prototype using the Gemini API", "TypeScript", "Ai-dresser", "web"],
  ["2026", "IPL 2024 Analysis", "Exploratory data analysis of the 2024 IPL season with pandas", "Python", "IPL2024_Match_Analysis", "data"],
  ["2026", "Warehouse Management", "Inventory management system in Java and JDBC", "Java", "WareHouse_Management", "backend"],
  ["2025", "BharatVihari", "MERN stack site about Indian festivals and traditions", "JavaScript", "BharatVihari", "web"],
  ["ongoing", "DSAJourney", "150+ LeetCode solutions in Java", "Java", "DSAJourney", "backend"]
].map(([year, name, note, lang, repo, cat]) => ({ year, name, note, lang, cat, href: repo.startsWith("http") ? repo : `${gh}/${repo}` }));

export const toolbox = [
  ["Languages", "Java, Python, JavaScript, TypeScript, SQL"],
  ["Backend", "Spring Boot, Spring Cloud, Node.js, Express, REST APIs, Microservices"],
  ["Data & ML", "pandas, NumPy, scikit-learn, NLP, Streamlit"],
  ["Databases", "PostgreSQL, MySQL, MongoDB"],
  ["DevOps & Cloud", "Docker, Git, GitHub Actions (CI/CD), AWS"]
];

export const certificates = [
  ["AWS Certified Cloud Practitioner", "Amazon Web Services", "/documents/certificates/aws-cloud-practitioner.pdf"],
  ["Introduction to Machine Learning", "NPTEL · IIT Madras", "/documents/certificates/introduction-to-machine-learning.pdf"],
  ["Fundamental Algorithms: Design and Analysis", "NPTEL · IIT Kharagpur", "/documents/certificates/data-analytics-certificate.pdf"]
];
