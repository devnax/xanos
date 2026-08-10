export enum TABLE_NAMES {
  USERS = "users",
  USER_PROFILES = "user_profiles",
  USER_METAS = "user_metas",
  USER_DOCUMENTS = "user_documents",
  USER_SESSIONS = "user_sessions",
  USER_PASSWORD_RESETS = "user_password_resets",

  UNIVERSITIES = "universities",
  UNIVERSITY_GALLERIES = "university_galleries",
  UNIVERSITY_CAMPUSES = "university_campuses",
  UNIVERSITY_FEATURES = "university_features",
  UNIVERSITY_REVIEWS = "university_reviews",
  UNIVERSITY_SCHOLARSHIPS = "university_scholarships",
  UNIVERSITY_PROGRAM_LEVELS = "university_program_levels",

  PROGRAMS = "university_programs",
  LANGUAGE_REQUIREMENTS = "university_language_requirements",
  PROGRAM_INTAKES = "university_program_intakes",

  APPLICATIONS = "applications",
  APPLICATION_NOTES = "application_notes",
}

export enum USER_ROLES {
  ADMIN = "admin",
  AGENT_MANAGER = "agent_manager",
  AGENT_HANDLER = "agent_handler",
  APPLICATION_MANAGER = "application_manager",
  APPLICATION_HANDLER = "application_handler",
  CONTENT_PUBLISHER = "content_publisher",
  ACCOUNT_MANAGER = "account_manager",

  AGENT = "agent",
  AGENT_COUNSELOR = "agent_counselor",
  AGENT_STUDENT = "agent_student",
  AGENT_APPLICATION_MANAGER = "agent_application_manager",
  AGENT_ACCOUNT_MANAGER = "agent_account_manager",
}

export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
}

export enum USER_GENDERS {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say",
}

export enum USER_DOCUMENTS {
  // Academic
  ACADEMIC_TRANSCRIPT = "Academic Transcript",
  ACADEMIC_CERTIFICATE = "Academic Certificate / Mark Sheet",
  GRADUATION_CERTIFICATE = "Graduation Certificate",
  PROVISIONAL_CERTIFICATE = "Provisional Certificate",
  ACADEMIC_TRANSLATION = "Academic Document Translation",
  COURSE_SYLLABUS = "Course Syllabus",

  // Identity
  PASSPORT = "Passport",
  NATIONAL_ID = "National ID Card",
  BIRTH_CERTIFICATE = "Birth Certificate",
  PASSPORT_PHOTO = "Passport Size Photograph",

  // Language Proficiency
  LANGUAGE_TEST_SCORE = "English Language Test Score Report",
  MEDIUM_OF_INSTRUCTION = "Medium of Instruction Certificate",

  // Application Support
  STATEMENT_OF_PURPOSE = "Statement of Purpose (SOP)",
  PERSONAL_STATEMENT = "Personal Statement",
  LETTER_OF_RECOMMENDATION = "Letter of Recommendation",
  CV_RESUME = "CV / Resume",
  PORTFOLIO = "Portfolio",
  RESEARCH_PROPOSAL = "Research Proposal",

  // Work Experience
  EXPERIENCE_CERTIFICATE = "Work Experience Certificate",
  EMPLOYMENT_REFERENCE = "Employment Reference Letter",
  INTERNSHIP_CERTIFICATE = "Internship Certificate",

  // Financial
  BANK_STATEMENT = "Bank Statement",
  FINANCIAL_SOLVENCY = "Financial Solvency Certificate",
  SPONSOR_LETTER = "Sponsor Letter / Affidavit of Support",
  PROOF_OF_INCOME = "Proof of Income",
  SCHOLARSHIP_OFFER = "Scholarship Offer Letter",

  // Medical & Legal
  MEDICAL_CERTIFICATE = "Medical Fitness Certificate",
  VACCINATION_RECORD = "Vaccination Record",
  POLICE_CLEARANCE = "Police Clearance Certificate",

  // Visa / Enrollment
  OFFER_LETTER = "Offer Letter",
  CONDITIONAL_OFFER = "Conditional Offer Letter",
  CAS_LETTER = "CAS Letter",
  I20 = "I-20 Form",
  COE = "Confirmation of Enrollment (CoE)",

  // Other
  GAP_EXPLANATION = "Gap Explanation Letter",
  NAME_CHANGE_AFFIDAVIT = "Name Change Affidavit",
  MARRIAGE_CERTIFICATE = "Marriage Certificate",
  GUARDIAN_CONSENT = "Guardian Consent Letter",
  OTHER = "Other Document",
}

// UNIVERSITY CONSTANTS
export enum UNIVERSITY_STATUS {
  ACTIVE = "active",
  DEACTIVE = "deactive",
  TRASH = "trash",
}

export enum UNIVERSITY_TYPES {
  PUBLIC = "public",
  PRIVATE = "private",
  COMMUNITY = "community",
}

export enum UNIVERSITY_SCHOLARSHIP_AMOUNT_TYPES {
  FIXED = "fixed",
  PERCENTAGE = "percentage",
}

export enum UNIVERSITY_APPLICATION_COMMISSION_TYPES {
  FIXED = "fixed",
  PERCENTAGE = "percentage",
}

export enum UNIVERSITY_SCHOLARSHIP_SPORTS_NAMES {
  SOCCER = "soccer",
  BASKETBALL = "basketball",
  TENNIS = "tennis",
  SWIMMING = "swimming",
  ATHLETICS = "athletics",
  VOLLEYBALL = "volleyball",
  BASEBALL = "baseball",
  GOLF = "golf",
  RUGBY = "rugby",
  CRICKET = "cricket",
}

export enum UNIVERSITY_PROGRAM_LEVELS {
  FOUNDATION = "Foundation",
  UNDERGRADUATE_DIPLOMA = "Undergraduate Diploma",
  BACHELORS = "Bachelor's Degree",
  GRADUATE_DIPLOMA = "Graduate Diploma",
  MASTERS = "Master's Degree",
  DOCTORATE = "Doctorate (PhD)",
  POSTGRADUATE_CERTIFICATE = "Postgraduate Certificate",
  POSTGRADUATE_DIPLOMA = "Postgraduate Diploma",
}

export enum UNIVERSITY_SCHOLARSHIP_SPORTS_LEVELS {
  SCHOOL = "school",
  COLLEGE = "college",
  STATE = "state",
  NATIONAL = "national",
  INTERNATIONAL = "international",
}

export enum UNIVERSITY_SCHOLARSHIP_LANGUAGE_TEST_NAMES {
  IELTS = "IELTS",
  TOEFL = "TOEFL",
  PTE = "PTE",
  DUOLINGO = "Duolingo",
}

// PROGRAM CONSTANTS

export enum PROGRAM_STATUS {
  ACTIVE = "active",
  DEACTIVE = "deactive",
  TRASH = "trash",
}

export enum UNIVERSITY_PROGRAM_TUITION_FEE_TYPES {
  PER_YEAR = "per-year",
  PER_SEMESTER = "per-semester",
  FULL_PROGRAM = "full-program",
}

export enum UNIVERSITY_PROGRAM_MIN_EDUCATION_LEVELS {
  GRADE_10 = "Grade 10 / SSC / O-Levels",
  GRADE_12 = "Grade 12 / HSC / A-Levels",
  HIGH_SCHOOL = "High School Diploma",
  ASSOCIATE = "Associate Degree",
  BACHELORS = "Bachelor's Degree",
  MASTERS = "Master's Degree",
}

export enum UNIVERSITY_PROGRAM_FIELDS {
  SCIENCE_TECH = "Science & Technology",
  HEALTH_MEDICINE = "Health & Medicine",
  BUSINESS_MANAGEMENT = "Business & Management",
  ARTS_HUMANITIES_SOCIAL = "Arts, Humanities & Social Sciences",
  CREATIVE_DESIGN = "Creative & Design",
  EDUCATION_TEACHING = "Education & Teaching",
  VOCATIONAL = "Vocational / Applied Programs",
  EMERGING_FIELDS = "Emerging / Interdisciplinary Fields",
}

export enum UNIVERSITY_PROGRAM_FIELDS_LIST {
  // Science & Technology
  SCIENCE_TECH_CS_IT = "Computer Science / IT / Software Engineering",
  SCIENCE_TECH_INFORMATION_SYSTEMS = "Information Systems",
  SCIENCE_TECH_AI_DS_ML = "Artificial Intelligence / Data Science / Machine Learning",
  SCIENCE_TECH_ENGINEERING = "Engineering (Mechanical, Electrical, Civil, Chemical, etc.)",
  SCIENCE_TECH_PHYSICS_CHEM_BIO = "Physics / Chemistry / Biology",
  SCIENCE_TECH_ENVIRONMENTAL_SCIENCE = "Environmental Science",
  SCIENCE_TECH_BIOTECH_GENETICS = "Biotechnology / Genetics",
  SCIENCE_TECH_MATH_STATS = "Mathematics / Statistics",

  // Health
  HEALTH_MEDICINE_MEDICINE = "Medicine / Surgery",
  HEALTH_MEDICINE_NURSING = "Nursing",
  HEALTH_MEDICINE_PHARMACY = "Pharmacy / Pharmaceutical Sciences",
  HEALTH_MEDICINE_DENTISTRY = "Dentistry",
  HEALTH_MEDICINE_PHYSIOTHERAPY = "Physiotherapy / Occupational Therapy",
  HEALTH_MEDICINE_PUBLIC_HEALTH = "Public Health / Epidemiology",
  HEALTH_MEDICINE_NUTRITION = "Nutrition / Dietetics",
  HEALTH_MEDICINE_BIOMEDICAL_SCIENCE = "Biomedical Science",

  // Business
  BUSINESS_MANAGEMENT_BBA_MBA = "Business Administration (BBA / MBA)",
  BUSINESS_MANAGEMENT_ACCOUNTING_FINANCE_ECON = "Accounting / Finance / Economics",
  BUSINESS_MANAGEMENT_MARKETING_ADVERTISING = "Marketing / Advertising / PR",
  BUSINESS_MANAGEMENT_HRM = "Human Resource Management",
  BUSINESS_MANAGEMENT_ENTREPRENEURSHIP = "Entrepreneurship",
  BUSINESS_MANAGEMENT_INTERNATIONAL_BUSINESS = "International Business",
  BUSINESS_MANAGEMENT_SUPPLY_CHAIN = "Supply Chain / Logistics",

  // Arts & Humanities
  ARTS_HUMANITIES_SOCIAL_LITERATURE_LANGUAGES = "Literature / English / Languages",
  ARTS_HUMANITIES_SOCIAL_HISTORY_ARCHAEOLOGY = "History / Archaeology",
  ARTS_HUMANITIES_SOCIAL_PHILOSOPHY_RELIGION = "Philosophy / Religion / Ethics",
  ARTS_HUMANITIES_SOCIAL_SOCIOLOGY = "Sociology / Anthropology",
  ARTS_HUMANITIES_SOCIAL_PSYCHOLOGY = "Psychology",
  ARTS_HUMANITIES_SOCIAL_POLITICAL_SCIENCE = "Political Science / International Relations",
  ARTS_HUMANITIES_SOCIAL_MEDIA_COMMUNICATION = "Media / Communication / Journalism",
  ARTS_HUMANITIES_SOCIAL_LAW = "Law / Legal Studies",

  // Creative
  CREATIVE_DESIGN_FINE_ARTS = "Fine Arts / Visual Arts",
  CREATIVE_DESIGN_GRAPHIC_UI_UX = "Graphic Design / UI-UX Design",
  CREATIVE_DESIGN_FASHION_TEXTILE = "Fashion / Textile Design",
  CREATIVE_DESIGN_FILM_PHOTO_ANIMATION = "Film / Photography / Animation",
  CREATIVE_DESIGN_ARCHITECTURE = "Architecture / Interior Design / Urban Planning",

  // Education
  EDUCATION_TEACHING_EARLY_CHILDHOOD = "Early Childhood Education",
  EDUCATION_TEACHING_PRIMARY_SECONDARY_EDU = "Primary / Secondary Education",
  EDUCATION_TEACHING_SPECIAL_EDU = "Special Education",
  EDUCATION_TEACHING_EDUCATIONAL_LEADERSHIP = "Educational Leadership / Administration",
  EDUCATION_TEACHING_TESOL = "TESOL / Language Teaching",

  // Vocational
  VOCATIONAL_HOSPITALITY_TOURISM = "Hospitality & Tourism",
  VOCATIONAL_CULINARY_HOTEL = "Culinary Arts / Hotel Management",
  VOCATIONAL_SPORTS_SCIENCE = "Sports Science / Physical Education",
  VOCATIONAL_EVENT_MANAGEMENT = "Event Management",
  VOCATIONAL_AVIATION = "Aviation / Pilot Training",

  // Emerging
  EMERGING_FIELDS_CYBERSECURITY = "Cybersecurity / Ethical Hacking",
  EMERGING_FIELDS_RENEWABLE_ENERGY = "Renewable Energy / Sustainability",
  EMERGING_FIELDS_ROBOTICS_MECHATRONICS = "Robotics / Mechatronics",
  EMERGING_FIELDS_AI_SOCIETY = "Artificial Intelligence & Society",
  EMERGING_FIELDS_COGNITIVE_NEURO = "Cognitive Science / Neuroscience",
}

export enum UNIVERSITY_PROGRAM_LANGUAGE_TEST_NAMES {
  IELTS = "IELTS",
  TOEFL = "TOEFL",
  PTE = "PTE",
  DUOLINGO = "Duolingo",
  GRE = "GRE",
  GMAT = "GMAT",
}

export enum UNIVERSITY_PROGRAM_LANGUAGE_TEST_SUBJECTS {
  LISTENING = "Listening",
  READING = "Reading",
  WRITING = "Writing",
  SPEAKING = "Speaking",
  OVERAL = "Overal",
}

export enum UNIVERSITY_PROGRAM_INTAKE_PERIODS {
  JANUARY = "January",
  FEBRUARY = "February",
  MARCH = "March",
  APRIL = "April",
  MAY = "May",
  JUNE = "June",
  JULY = "July",
  AUGUST = "August",
  SEPTEMBER = "September",
  OCTOBER = "October",
  NOVEMBER = "November",
  DECEMBER = "December",
}

// APPLICATION CONSTANTS

export enum APPLICATION_STATUS {
  // Initial
  PENDING = "Pending",
  SUBMITTED = "Submitted",

  // Review
  UNDER_REVIEW = "Under Review",
  ADDITIONAL_DOCUMENTS_REQUIRED = "Additional Documents Required",
  INTERVIEW_REQUIRED = "Interview Required",

  // Decision
  CONDITIONAL_OFFER = "Conditional Offer",
  UNCONDITIONAL_OFFER = "Unconditional Offer",
  WAITLISTED = "Waitlisted",
  REJECTED = "Rejected",

  // Post-Acceptance
  OFFER_ACCEPTED = "Offer Accepted",
  OFFER_DECLINED = "Offer Declined",

  // Enrollment & Visa
  DEPOSIT_PAID = "Deposit Paid",
  ENROLLED = "Enrolled",
  VISA_APPLIED = "Visa Applied",
  VISA_APPROVED = "Visa Approved",
  VISA_REJECTED = "Visa Rejected",

  // End states
  WITHDRAWN = "Withdrawn",
  EXPIRED = "Expired",
}

export enum APPLICATION_STATES {
  ACTIVE = "active",
  ARCHIVED = "archived",
  CLOSED = "closed",
  COMPLETED = "completed",
}

export enum APPLICATION_COMMISSION_STATUS {
  PENDING = "pending",
  APPROVED = "approved",
  PAID = "paid",
}
