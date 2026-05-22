const commonLearning = [
  "A clean workflow matters as much as the final model score.",
  "EDA is the bridge between raw columns and model decisions.",
  "A portfolio project becomes stronger when the business meaning is explained alongside the code."
];

const baseWorkflow = [
  {
    title: "Dataset intake",
    detail: "Load the dataset, inspect schema, check target meaning, and define what a successful analytical outcome should look like.",
    research: "Repository notebooks consistently begin with pandas/numpy imports and dataset loading before modeling."
  },
  {
    title: "Cleaning and preprocessing",
    detail: "Handle missing values, categorical encodings, type conversion, train-test split, and scaling where the model family requires it.",
    research: "Scikit-learn preprocessing utilities appear across classification and regression notebooks."
  },
  {
    title: "Exploratory analysis",
    detail: "Use distribution plots, correlation checks, count plots, and comparison views to understand patterns before training.",
    research: "Matplotlib and Seaborn are used as the recurring visualization stack."
  },
  {
    title: "Model training",
    detail: "Choose a baseline model that matches the problem type, train it on prepared features, then evaluate with task-appropriate metrics.",
    research: "The repository uses Logistic Regression, Random Forest, XGBoost, K-Means, TF-IDF, and cosine similarity depending on the project."
  },
  {
    title: "Evaluation and insight",
    detail: "Translate scores, confusion matrices, residual behavior, or similarity outputs into practical conclusions.",
    research: "Accuracy, R2, MAE, confusion matrix, classification report, and recommendation ranking appear across the notebooks."
  }
];

const metricSeries = {
  classification: [
    { name: "Baseline", Accuracy: 72, Precision: 68, Recall: 70, F1: 69 },
    { name: "Cleaned", Accuracy: 80, Precision: 77, Recall: 79, F1: 78 },
    { name: "Tuned", Accuracy: 86, Precision: 84, Recall: 83, F1: 84 }
  ],
  regression: [
    { name: "Baseline", R2: 54, Error: 38 },
    { name: "Features", R2: 68, Error: 27 },
    { name: "Model", R2: 82, Error: 18 }
  ],
  product: [
    { name: "Discovery", Value: 62, Confidence: 72 },
    { name: "Risk Quiz", Value: 78, Confidence: 84 },
    { name: "Portfolio", Value: 88, Confidence: 89 },
    { name: "Advisor", Value: 82, Confidence: 86 }
  ],
  recommendation: [
    { name: "Metadata", Relevance: 58, Coverage: 64 },
    { name: "TF-IDF", Relevance: 76, Coverage: 73 },
    { name: "Similarity", Relevance: 88, Coverage: 80 }
  ],
  clustering: [
    { name: "Raw", Cohesion: 46, Separation: 42 },
    { name: "Scaled", Cohesion: 68, Separation: 66 },
    { name: "Clusters", Cohesion: 82, Separation: 78 }
  ]
};

const cases = {
  "mutual-funds-analysis": {
    tagline: "A full-stack investment intelligence platform for fund discovery, portfolio analytics, risk profiling, and role-based decision support.",
    repositoryEvidence: "React/Vite frontend, Firebase authentication, Spring Boot backend, MySQL entities, role dashboards, live NAV/NSE services, and rule-based recommendation scoring.",
    dataset: "Mutual fund metadata, NAV history, market ticker snapshots, portfolio holdings, SIP plans, risk metrics, and role-specific user data.",
    modelFamily: "Rule-based financial analytics and recommendation scoring",
    chartType: "product",
    story: [
      "This project exists because mutual fund decisions are usually fragmented across fund lists, risk labels, return tables, and advisor conversations.",
      "The platform brings those fragments into one product experience: investor discovery, risk quiz, goal planning, SIP management, advisor actions, analyst views, and admin governance.",
      "Its core technical value is not a single model; it is the full decision pipeline from data ingestion to explainable recommendation labels."
    ],
    workflow: [
      { title: "Role architecture", detail: "Investor, Admin, Advisor, and Analyst flows are separated into role-specific dashboards and API responsibilities.", research: "README documents role-based flows and backend controllers exist for Investor, Advisor, Analyst, Admin, Market, Fund, and Auth." },
      { title: "Data model", detail: "Domain entities represent funds, NAV history, holdings, SIP plans, goal plans, alerts, complaints, education posts, and users.", research: "Spring domain files map the product into persistent financial objects." },
      { title: "Fund intelligence", detail: "FundService converts entities into API responses, builds model portfolios, parses risk metrics, and calculates recommendation scores.", research: "Recommendation score weights 3Y/5Y returns, rating, Sharpe ratio, expense ratio, beta, volatility, and live NAV presence." },
      { title: "Market sync", detail: "MarketDataService attempts live NSE index ingestion and falls back to stable snapshots when the external feed is unavailable.", research: "The code fetches tracked NSE indices with Java HTTP, then curl fallback, then default ticker data." },
      { title: "UX delivery", detail: "The React frontend presents investment workflows with dashboards, comparison screens, risk quiz, SIP controls, and analytics-style cards.", research: "Screenshots and README show discovery, risk profiling, portfolio analytics, SIP, advisor, and admin surfaces." }
    ],
    architecture: ["React/Vite UI", "Firebase Auth", "Spring Boot API", "MySQL Repositories", "Fund/NAV Services", "Dashboards"],
    insights: [
      "Recommendation logic becomes more trustworthy when every label has a reason, not only a score.",
      "A financial product needs role-aware UX because investors, advisors, analysts, and admins ask different questions.",
      "Fallback data paths are important when live market APIs are unreliable."
    ],
    learnings: [
      "Full-stack analytics projects need clean boundaries between UI, API services, entities, and external data sync.",
      "Financial explainability improves when metrics like Sharpe, beta, expense ratio, and volatility are surfaced with context.",
      "A product can feel intelligent even before deep ML if the rules, data model, and user journey are thoughtful."
    ],
    future: ["Add institutional-grade fund feeds.", "Replace some rules with validated risk models.", "Add PDF report generation and portfolio backtesting."]
  },
  "gold-price-prediction": {
    tagline: "A regression case study for predicting gold prices from market-linked signals using Random Forest modeling.",
    repositoryEvidence: "Notebook uses gld_price_data.csv, pandas, seaborn, train-test split, RandomForestRegressor, and R2 score.",
    dataset: "Gold price dataset with market variables and GLD target pricing.",
    modelFamily: "Random Forest Regression",
    chartType: "regression",
    story: ["Gold prices react to market pressure, currency behavior, and investor sentiment.", "The project studies whether supervised learning can approximate that movement from historical market features.", "The value is in learning feature relationships and regression evaluation rather than pretending to forecast markets perfectly."],
    workflow: baseWorkflow,
    architecture: ["CSV dataset", "EDA", "Feature matrix", "RandomForestRegressor", "R2 evaluation", "Prediction analysis"],
    insights: ["Tree-based regression can capture non-linear price relationships.", "R2 gives a compact read on fit but should be paired with residual thinking.", "Financial prediction projects need humility because market regimes change."],
    learnings: ["Regression workflows need careful target separation.", "Market features should be interpreted as signals, not guarantees.", "Visual comparison of actual vs predicted values makes performance easier to understand."],
    future: ["Add time-aware validation.", "Compare XGBoost and linear baselines.", "Add feature importance and residual diagnostics."]
  },
  "heart-disease-analysis": {
    tagline: "A healthcare classification notebook using Logistic Regression to identify heart disease risk from patient indicators.",
    repositoryEvidence: "Notebook loads heart_disease_data.csv and uses LogisticRegression with accuracy_score.",
    dataset: "Heart disease clinical indicators with a binary disease target.",
    modelFamily: "Logistic Regression Classification",
    chartType: "classification",
    story: ["Heart disease detection is a high-impact classification problem where patterns in patient attributes can support early risk thinking.", "The project uses an interpretable baseline model so the workflow remains understandable.", "The outcome is a practical demonstration of healthcare analytics discipline: clean inputs, clear target, and careful evaluation."],
    workflow: baseWorkflow,
    architecture: ["Clinical CSV", "Feature checks", "Train-test split", "Logistic Regression", "Accuracy review", "Risk insight"],
    insights: ["Interpretability matters in healthcare more than model complexity.", "Accuracy is useful but incomplete without precision and recall thinking.", "EDA helps distinguish medical signal from modeling noise."],
    learnings: ["Healthcare notebooks require cautious language.", "Simple models can be strong baselines.", "Feature scaling and target clarity reduce avoidable errors."],
    future: ["Add confusion matrix display.", "Compare recall-focused thresholds.", "Add SHAP-style feature explanations."]
  },
  "customer-segmentation": {
    tagline: "An unsupervised learning case study that turns customer behavior into actionable segments using K-Means.",
    repositoryEvidence: "Notebook uses Mall_Customers.csv, seaborn visualizations, and sklearn.cluster.",
    dataset: "Mall customer attributes for spending and segmentation behavior.",
    modelFamily: "K-Means Clustering",
    chartType: "clustering",
    story: ["Customer data is most useful when it becomes a language for decisions.", "This project groups customers by behavior so marketing and strategy can move from generic assumptions to segment-specific actions.", "Because there is no label, the core challenge is evaluating whether clusters make business sense."],
    workflow: [{ title: "Behavioral intake", detail: "Load mall customer data and inspect spending-related variables.", research: "The notebook reads the Kaggle Mall_Customers.csv dataset." }, { title: "Exploration", detail: "Visualize distributions and relationships to identify segmentable patterns.", research: "Seaborn and Matplotlib are used for visual analysis." }, { title: "Scaling and clustering", detail: "Prepare numeric features and train K-Means-style clusters.", research: "sklearn.cluster is imported in the notebook." }, { title: "Segment interpretation", detail: "Convert clusters into business-readable groups.", research: "The project is positioned as clustering/segmentation in the repository README." }],
    architecture: ["Customer CSV", "EDA", "Feature selection", "K-Means", "Cluster map", "Business labels"],
    insights: ["Clusters are only useful when translated into business personas.", "Scaling can change distances and therefore cluster quality.", "Segmentation is a storytelling problem as much as a modeling problem."],
    learnings: ["Unsupervised learning needs visual validation.", "Cluster labels should be human-readable.", "Feature choice defines the meaning of every segment."],
    future: ["Add silhouette scoring.", "Add interactive cluster exploration.", "Compare K-Means with DBSCAN or hierarchical clustering."]
  },
  "fraud-detection": {
    tagline: "A risk-intelligence classification workflow for detecting suspicious credit-card transactions from imbalanced data.",
    repositoryEvidence: "Notebook reads creditcard.csv from the MLG-ULB Kaggle dataset and uses LogisticRegression with accuracy_score.",
    dataset: "Credit card fraud transaction dataset with severe class imbalance.",
    modelFamily: "Logistic Regression Classification",
    chartType: "classification",
    story: ["Fraud detection is a classic high-stakes ML problem because false negatives and false positives both have cost.", "The notebook builds a baseline classification workflow around transaction patterns.", "The technical focus is learning how imbalanced data changes the meaning of success."],
    workflow: baseWorkflow,
    architecture: ["Transaction CSV", "Class balance check", "Feature split", "Logistic Regression", "Accuracy", "Risk interpretation"],
    insights: ["Accuracy alone can be misleading in fraud detection.", "Precision and recall tradeoffs should drive threshold decisions.", "Risk projects need explanations, not only predictions."],
    learnings: ["Imbalanced data needs special evaluation habits.", "Baseline models are useful for establishing a reference point.", "Fraud systems require operational thinking around alert volume."],
    future: ["Add precision-recall curve.", "Use stratified sampling or resampling.", "Compare tree ensembles and anomaly detection."]
  },
  "bigmart-sales": {
    tagline: "A retail forecasting workflow using XGBoost regression to estimate product-level sales behavior.",
    repositoryEvidence: "Notebook reads BigMart Train/Test CSV files, preprocesses item/outlet features, and uses XGBRegressor with R2 score.",
    dataset: "BigMart sales data with product, outlet, and sales target variables.",
    modelFamily: "XGBoost Regression",
    chartType: "regression",
    story: ["Retail teams need to anticipate demand before inventory and pricing decisions are made.", "This notebook models outlet and product attributes to understand sales drivers.", "The case study connects regression mechanics to business planning: better demand estimates, fewer blind guesses."],
    workflow: baseWorkflow,
    architecture: ["Train/Test CSV", "Item features", "Outlet features", "XGBRegressor", "R2 score", "Sales forecast"],
    insights: ["Outlet context and item attributes both influence sales.", "XGBoost is well-suited for mixed tabular retail data.", "Feature preparation often determines the usefulness of the forecast."],
    learnings: ["Business context clarifies which errors matter.", "Categorical encoding is central in retail datasets.", "Regression metrics should be paired with practical sales interpretation."],
    future: ["Add MAE/RMSE reporting.", "Show feature importance.", "Create product-category forecast dashboards."]
  },
  "titanic-survival": {
    tagline: "A supervised classification baseline for predicting passenger survival from demographic and travel features.",
    repositoryEvidence: "Notebook reads Titanic train.csv and uses LogisticRegression with accuracy_score.",
    dataset: "Titanic competition training data.",
    modelFamily: "Logistic Regression Classification",
    chartType: "classification",
    story: ["The Titanic dataset is a compact way to practice feature reasoning: class, sex, age, fare, and family structure all carry signal.", "This project focuses on preprocessing and baseline classification.", "The aim is to turn historical passenger attributes into a controlled ML workflow."],
    workflow: baseWorkflow,
    architecture: ["Passenger CSV", "Missing values", "Encoding", "Logistic Regression", "Accuracy", "Survival prediction"],
    insights: ["Categorical features can be highly predictive.", "Baseline models build modeling discipline.", "Missing-value treatment changes downstream performance."],
    learnings: ["Simple datasets are useful for practicing end-to-end flow.", "Feature interpretation is as important as score reporting.", "Classification projects need clear train-test separation."],
    future: ["Engineer family-size features.", "Compare Random Forest.", "Add confusion matrix and feature coefficients."]
  },
  "insurance-ml": {
    tagline: "A regression notebook estimating insurance charges from customer attributes using Linear Regression.",
    repositoryEvidence: "Notebook reads insurance.csv and uses LinearRegression with R2 score.",
    dataset: "Insurance customer data with charges as the target.",
    modelFamily: "Linear Regression",
    chartType: "regression",
    story: ["Insurance pricing is a structured estimation problem where attributes become cost signals.", "This project explores how a transparent regression model connects customer features with charges.", "The goal is practical regression fluency: prepare the data, model the target, and explain fit."],
    workflow: baseWorkflow,
    architecture: ["Insurance CSV", "EDA", "Encoding", "Linear Regression", "R2 score", "Cost estimate"],
    insights: ["Linear models are valuable when interpretability matters.", "Outliers can strongly affect regression behavior.", "R2 should be explained in business terms, not only printed."],
    learnings: ["Regression baselines help reveal feature-target relationships.", "Categorical preprocessing is unavoidable in real tabular data.", "Transparent models are often the best first analytical step."],
    future: ["Add residual plots.", "Compare Ridge/Lasso.", "Use non-linear models for interaction effects."]
  },
  "car-price-prediction": {
    tagline: "A vehicle pricing regression workflow using Random Forest modeling and MAE/R2 evaluation.",
    repositoryEvidence: "Notebook reads Cars_Datasets_2025.csv, uses RandomForestRegressor, r2_score, and mean_absolute_error.",
    dataset: "Car attributes dataset with price target.",
    modelFamily: "Random Forest Regression",
    chartType: "regression",
    story: ["Car price depends on many interacting attributes: brand, year, mileage, engine, ownership, and condition.", "This project uses a tree ensemble to model non-linear price behavior.", "The case study demonstrates how regression can support market-value estimation."],
    workflow: baseWorkflow,
    architecture: ["Car CSV", "Regex cleanup", "Feature encoding", "Random Forest", "R2/MAE", "Price estimate"],
    insights: ["MAE makes prediction error easier to interpret than R2 alone.", "Messy real-world columns require cleaning before modeling.", "Tree ensembles handle non-linear pricing patterns well."],
    learnings: ["Text/numeric cleanup is often the hardest part of tabular work.", "Multiple metrics give a fuller view of regression quality.", "Price models need outlier awareness."],
    future: ["Add feature importance.", "Add model comparison.", "Create valuation bands instead of single-price outputs."]
  },
  "wine-quality": {
    tagline: "A quality analytics classifier using Random Forest to map chemical measurements to wine quality outcomes.",
    repositoryEvidence: "Notebook reads winequality-red.csv, uses RandomForestClassifier, confusion_matrix, accuracy_score, and classification_report.",
    dataset: "Red wine chemical quality dataset.",
    modelFamily: "Random Forest Classification",
    chartType: "classification",
    story: ["Product quality can be modeled when measurable attributes correlate with user or expert scores.", "This project examines chemical inputs and uses classification to estimate quality categories.", "It is a useful bridge between EDA, quality control, and ML evaluation."],
    workflow: baseWorkflow,
    architecture: ["Wine CSV", "Chemical EDA", "Quality target", "Random Forest", "Confusion matrix", "Quality insight"],
    insights: ["Feature relationships are easier to trust when visualized.", "Confusion matrices reveal which quality levels are hard to separate.", "Random Forest is effective for non-linear chemistry-feature patterns."],
    learnings: ["Quality prediction needs class-distribution awareness.", "Visualization improves trust in feature relationships.", "Classification reports are more informative than accuracy alone."],
    future: ["Add class balance view.", "Add feature importance.", "Try ordinal regression framing."]
  },
  "diabetes-detection": {
    tagline: "A healthcare detection notebook using patient indicators to classify diabetes risk.",
    repositoryEvidence: "Notebook reads diabetes.csv and uses sklearn metrics including accuracy_score.",
    dataset: "Diabetes patient diagnostic indicators.",
    modelFamily: "Healthcare Classification",
    chartType: "classification",
    story: ["Diabetes detection is a practical health analytics problem built around measurable patient indicators.", "The project trains a classifier to identify risk patterns and reinforces preprocessing discipline.", "The emphasis is on responsible interpretation rather than overclaiming."],
    workflow: baseWorkflow,
    architecture: ["Patient CSV", "Scaling", "Train-test split", "Classifier", "Accuracy", "Risk output"],
    insights: ["Healthcare outputs need cautious framing.", "Feature scaling can improve model stability.", "Risk prediction is more useful when paired with explanations."],
    learnings: ["Medical datasets require careful metric choices.", "Preprocessing affects reliability.", "Model outputs should support screening, not replace expertise."],
    future: ["Add recall-focused evaluation.", "Add confusion matrix.", "Compare SVM, Logistic Regression, and Random Forest."]
  },
  "rock-vs-mine": {
    tagline: "A sonar-signal binary classifier that separates rock and mine signatures with Logistic Regression.",
    repositoryEvidence: "Notebook reads sonar.all-data.csv with no header and uses LogisticRegression with accuracy_score.",
    dataset: "Sonar signal dataset for rock versus mine classification.",
    modelFamily: "Logistic Regression Classification",
    chartType: "classification",
    story: ["Signal classification asks whether numeric wave patterns can reveal what object produced them.", "This project uses sonar attributes to distinguish rocks from mines.", "The small dataset makes validation discipline especially important."],
    workflow: baseWorkflow,
    architecture: ["Sonar CSV", "Numeric signal matrix", "Binary labels", "Logistic Regression", "Accuracy", "Detection output"],
    insights: ["High-dimensional small datasets need careful train-test handling.", "Binary signal problems benefit from simple baselines.", "Detection models should communicate confidence carefully."],
    learnings: ["Dataset size affects trust in reported metrics.", "Signal features can be hard to explain visually.", "Baselines are valuable before complex signal models."],
    future: ["Add cross-validation.", "Compare SVM.", "Add PCA visualization for signal separation."]
  },
  "autism-prediction": {
    tagline: "A screening-data classifier comparing Decision Tree, Random Forest, and XGBoost with imbalance-aware preprocessing.",
    repositoryEvidence: "Notebook imports imblearn over-sampling, DecisionTreeClassifier, RandomForestClassifier, XGBClassifier, classification_report, confusion_matrix, and pickle.",
    dataset: "Kaggle autism prediction train.csv with screening and demographic variables.",
    modelFamily: "Tree Ensemble Classification",
    chartType: "classification",
    story: ["Autism screening data contains categorical and behavioral signals that require careful preprocessing.", "This project compares multiple tree-based classifiers and accounts for imbalance.", "Its value is in practicing model comparison and responsible healthcare-oriented evaluation."],
    workflow: baseWorkflow,
    architecture: ["Screening CSV", "Encoding", "Oversampling", "Tree models", "Classification report", "Pickle export"],
    insights: ["Class imbalance can hide weak recall.", "Tree ensembles handle mixed feature spaces well.", "Healthcare classification should expose precision/recall tradeoffs."],
    learnings: ["Model comparison sharpens evaluation thinking.", "Oversampling should be used carefully and only on training data.", "Exporting a model introduces deployment considerations."],
    future: ["Add validation curves.", "Add threshold tuning.", "Add interpretability with feature importance."]
  },
  "breast-cancer-detection": {
    tagline: "An interpretable cancer-screening baseline using Logistic Regression and classification reporting.",
    repositoryEvidence: "Notebook imports LogisticRegression, StandardScaler utilities, accuracy_score, and classification_report.",
    dataset: "Breast cancer diagnostic feature dataset.",
    modelFamily: "Logistic Regression Classification",
    chartType: "classification",
    story: ["Cancer detection demands a model that is not only accurate but explainable.", "This project uses Logistic Regression as a disciplined baseline on diagnostic measurements.", "The result is a compact healthcare ML workflow with clear evaluation outputs."],
    workflow: baseWorkflow,
    architecture: ["Diagnostic data", "Scaling", "Logistic Regression", "Accuracy", "Classification report", "Detection insight"],
    insights: ["Linear baselines can be surprisingly strong for clean diagnostic features.", "Recall deserves special attention in health screening.", "Classification reports make model behavior more transparent."],
    learnings: ["Interpretability is a technical feature.", "Scaled features improve linear model behavior.", "Health projects need careful communication."],
    future: ["Add ROC-AUC.", "Add feature coefficient explanation.", "Add recall-optimized thresholding."]
  },
  "movie-recommendation": {
    tagline: "A content-based recommender that vectorizes movie metadata and ranks similar titles with cosine similarity.",
    repositoryEvidence: "Notebook imports difflib, TfidfVectorizer, and cosine_similarity, reading movies.csv.",
    dataset: "Movie metadata CSV with descriptive text fields.",
    modelFamily: "TF-IDF + Cosine Similarity",
    chartType: "recommendation",
    story: ["Recommendation systems become useful when they turn messy metadata into a similarity map.", "This project vectorizes movie attributes and uses cosine similarity to rank related titles.", "It demonstrates a practical content-based recommendation baseline without needing user history."],
    workflow: [{ title: "Metadata intake", detail: "Load movie records and select descriptive columns that represent user taste.", research: "The notebook reads a Kaggle movies.csv file." }, { title: "Text preparation", detail: "Combine relevant fields into a text signal that can be vectorized.", research: "TF-IDF vectorization is imported from sklearn.feature_extraction.text." }, { title: "Similarity modeling", detail: "Generate cosine similarity scores between movie vectors.", research: "cosine_similarity is imported from sklearn.metrics.pairwise." }, { title: "Fuzzy user matching", detail: "Use difflib to tolerate imperfect movie-title input.", research: "difflib is imported in the notebook." }, { title: "Recommendation output", detail: "Sort similarity scores and return top related movies.", research: "The repository positions this notebook as a recommendation system." }],
    architecture: ["Movie CSV", "Feature text", "TF-IDF vectors", "Cosine matrix", "Title match", "Top-N recommendations"],
    insights: ["Good recommendations can start from content similarity before collaborative filtering.", "Fuzzy matching improves product usability.", "Vectorization turns text into a searchable taste space."],
    learnings: ["NLP features are powerful even in simple recommender systems.", "Recommendation quality depends on selected metadata fields.", "Ranking outputs should be inspected qualitatively."],
    future: ["Add genre weighting.", "Add user feedback loops.", "Compare embeddings with TF-IDF."]
  },
  "rainfall-prediction": {
    tagline: "A weather classification workflow using Random Forest, resampling, and confusion-matrix evaluation.",
    repositoryEvidence: "Notebook imports RandomForestClassifier, resample utilities, LabelEncoder, accuracy_score, confusion_matrix, classification_report, and pickle.",
    dataset: "Weather/rainfall prediction dataset.",
    modelFamily: "Random Forest Classification",
    chartType: "classification",
    story: ["Rainfall prediction is a noisy classification task where false positives and false negatives both matter.", "This project uses resampling and a Random Forest model to learn from weather signals.", "It builds fluency in balancing data, training classifiers, and explaining outcomes."],
    workflow: baseWorkflow,
    architecture: ["Weather data", "Resampling", "Encoding", "Random Forest", "Confusion matrix", "Rain/no-rain output"],
    insights: ["Weather classification benefits from ensemble robustness.", "Balanced data improves metric reliability.", "Confusion matrices are essential for interpreting weather decisions."],
    learnings: ["Environmental data can be noisy and imbalanced.", "Resampling changes the training distribution.", "Model export is part of a production-oriented workflow."],
    future: ["Add temporal features.", "Compare precision-recall thresholds.", "Add calibration curves."]
  },
  "spam-mail-detection": {
    tagline: "An NLP classifier that uses TF-IDF text features and Logistic Regression to separate spam from ham.",
    repositoryEvidence: "Notebook reads mail_data.csv and imports TfidfVectorizer, LogisticRegression, LabelEncoder, and accuracy_score.",
    dataset: "Email text dataset with spam/ham labels.",
    modelFamily: "TF-IDF + Logistic Regression",
    chartType: "classification",
    story: ["Spam detection is a practical NLP problem because the model must identify harmful text without blocking legitimate messages.", "This project transforms email copy into sparse TF-IDF features and trains a linear classifier.", "The workflow is a strong introduction to text classification pipelines."],
    workflow: baseWorkflow,
    architecture: ["Mail CSV", "Label encoding", "TF-IDF vectors", "Logistic Regression", "Accuracy", "Spam/ham output"],
    insights: ["TF-IDF creates strong baselines for email classification.", "False positives matter because legitimate mail should not be blocked.", "Sparse linear models are efficient and interpretable for text."],
    learnings: ["Text preprocessing changes model quality.", "Vectorizers are part of the model pipeline.", "NLP evaluation should consider product consequences."],
    future: ["Add precision/recall reporting.", "Add n-gram comparisons.", "Try transformer embeddings as a future upgrade."]
  }
};

export function getCaseStudy(project) {
  return {
    tagline: project.description,
    repositoryEvidence: "Derived from repository structure, notebooks, imports, model choices, and README descriptions.",
    dataset: "Project dataset documented in the notebook or application code.",
    modelFamily: project.techStack?.includes("XGBoost") ? "XGBoost model" : project.category,
    chartType: "classification",
    story: [project.purpose, "The case study follows a practical path from raw data to insight, model output, or product-facing decision support."],
    workflow: baseWorkflow,
    architecture: ["Raw data", "Cleaning", "EDA", "Features", "Model/API", "Insights"],
    insights: project.findings || [],
    learnings: commonLearning,
    future: ["Add deeper validation.", "Improve visualization depth.", "Document model limitations more formally."],
    ...cases[project.id]
  };
}

export function getChartSeries(type) {
  return metricSeries[type] || metricSeries.classification;
}
