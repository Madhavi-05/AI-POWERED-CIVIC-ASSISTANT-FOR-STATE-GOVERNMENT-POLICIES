
import { Scheme, Language, Occupation, Category } from './types';

export const SCHEMES: Scheme[] = [
  {
    id: 's1',
    name: 'Rythu Bandhu (Investment Support Scheme)',
    department: 'Agriculture Department, Telangana',
    goNumber: 'GO MS No. 12 (Agri)',
    description: 'A flagship investment support program providing financial assistance to land-owning farmers for two crops a year.',
    eligibilityCriteria: [
      'Must be a land-owning farmer in Telangana',
      'Valid Pattadar Passbook holders',
      'Small and marginal farmers'
    ],
    benefits: [
      '₹5,000 per acre per season (Kharif & Rabi)',
      'Total ₹10,000 per acre per year direct benefit transfer'
    ],
    applicationSteps: [
      'Submit details to local Agriculture Extension Officer (AEO)',
      'Provide Pattadar Passbook and Aadhaar link',
      'Ensure Bank Account is seeded with Aadhaar',
      'Funds are credited directly via DBT'
    ],
    officialLink: 'https://rythubandhu.telangana.gov.in/',
    categoryTags: ['Agriculture', 'Financial Support', 'Telangana']
  },
  {
    id: 's2',
    name: 'Kalyana Lakshmi / Shaadi Mubarak',
    department: 'Backward Classes Welfare / Minority Welfare, Telangana',
    goNumber: 'GO MS No. 15',
    description: 'One-time financial assistance provided to brides from poor families at the time of their marriage.',
    eligibilityCriteria: [
      'Bride must be a resident of Telangana',
      'Bride must be at least 18 years old',
      'Combined annual income of parents not exceeding ₹2 Lakhs',
      'Applicable for SC, ST, BC, and Minority communities'
    ],
    benefits: [
      'One-time financial grant of ₹1,01,116'
    ],
    applicationSteps: [
      'Apply online through the Telangana epass portal',
      'Upload Bride and Groom Aadhaar cards',
      'Upload Marriage invitation card and Birth certificate',
      'Upload Income and Caste certificates',
      'Upload Bank passbook of the Bride\'s mother'
    ],
    officialLink: 'https://telanganaepass.cgg.gov.in/',
    categoryTags: ['Social Welfare', 'Marriage Assistance', 'Telangana']
  },
  {
    id: 's3',
    name: 'Dalit Bandhu',
    department: 'Scheduled Castes Development Department, Telangana',
    goNumber: 'GO MS No. 22',
    description: 'A revolutionary entrepreneurship scheme empowering Dalit families to start businesses of their choice.',
    eligibilityCriteria: [
      'Must belong to the Scheduled Caste (SC) community',
      'Native resident of Telangana',
      'One unit per family eligible'
    ],
    benefits: [
      '₹10 Lakhs grant per family (100% subsidy)',
      'No bank linkage or repayment required',
      'Freedom to choose any business unit'
    ],
    applicationSteps: [
      'Selection by the District Collector/Monitoring committee',
      'Identification of suitable business unit',
      'Verification of SC status and residency',
      'Sanction and release of funds for business assets'
    ],
    officialLink: 'https://dalitbandhu.telangana.gov.in/',
    categoryTags: ['SC Welfare', 'Entrepreneurship', 'Telangana']
  },
  {
    id: 's4',
    name: 'Aarogyasri Health Scheme (Telangana)',
    department: 'Health, Medical & Family Welfare, Telangana',
    goNumber: 'GO MS No. 105',
    description: 'Provides cashless treatment to poor families for catastrophic illnesses in empaneled hospitals.',
    eligibilityCriteria: [
      'Holders of Food Security Card (White Ration Card)',
      'Resident of Telangana',
      'Annual income criteria as per government norms'
    ],
    benefits: [
      'Cashless treatment in Government and Private empaneled hospitals',
      'Coverage for major surgeries and therapies',
      'Post-operative follow-up coverage'
    ],
    applicationSteps: [
      'Visit the Aarogyasri kiosk at any empaneled hospital',
      'Present White Ration Card or health card',
      'Biometric authentication',
      'Pre-authorization by Aarogya Mithra'
    ],
    officialLink: 'https://aarogyasri.telangana.gov.in/',
    categoryTags: ['Health', 'Insurance', 'Telangana']
  },
  {
    id: 's5',
    name: 'TS ePass - Post Matric Scholarship (RTF & MTF)',
    department: 'Backward Classes Welfare / Social Welfare, Telangana',
    goNumber: 'GO MS No. 33',
    description: 'Reimbursement of Tuition Fee (RTF) and Maintenance Fee (MTF) for students pursuing higher education.',
    eligibilityCriteria: [
      'Must be a native of Telangana',
      'Students from SC/ST/BC/EBC/Minority/Disabled communities',
      'Income limit: Below ₹2 Lakhs (Rural) / ₹2.5 Lakhs (Urban) for SC/ST; Below ₹1 Lakh for BC/EBC',
      '75% attendance in the current academic year'
    ],
    benefits: [
      'Full Tuition Fee reimbursement as per GO',
      'Monthly maintenance fee based on course type (Day scholar/Hosteller)'
    ],
    applicationSteps: [
      'Register on Telangana ePass portal (https://telanganaepass.cgg.gov.in)',
      'Select Post Matric Scholarship (Fresh/Renewal)',
      'Upload Aadhaar, Income certificate, Caste certificate, and Bonafide certificate',
      'Submit printout to College principal for verification'
    ],
    officialLink: 'https://telanganaepass.cgg.gov.in/',
    categoryTags: ['Education', 'Scholarship', 'Students', 'Telangana']
  },
  {
    id: 's6',
    name: 'Mission Bhagiratha',
    department: 'Panchayat Raj & Rural Development, Telangana',
    goNumber: 'GO MS No. 1',
    description: 'A safe drinking water project aiming to provide treated water to every household in the state through a pipeline network.',
    eligibilityCriteria: [
      'All households in Telangana state',
      'Rural and Urban habitations included'
    ],
    benefits: [
      '100 liters per capita per day (LPCD) in rural areas',
      '150 LPCD in municipalities/corporations',
      'Safe, treated, and filtered drinking water at doorstep'
    ],
    applicationSteps: [
      'Automatic coverage for all habitations',
      'Contact local Gram Panchayat for connection issues',
      'No separate application required for existing houses'
    ],
    officialLink: 'https://missionbhagiratha.telangana.gov.in/',
    categoryTags: ['Water', 'Infrastructure', 'Public Health', 'Telangana']
  },
  {
    id: 's7',
    name: 'T-Hub / T-Works (Innovation Ecosystem)',
    department: 'IT, Electronics & Communications, Telangana',
    goNumber: 'IT Policy 2021',
    description: 'Support for startups and innovators through world-class infrastructure, mentoring, and funding opportunities.',
    eligibilityCriteria: [
      'Startups registered in Telangana',
      'Innovators and makers with a prototype',
      'Students with innovative ideas'
    ],
    benefits: [
      'Access to India\'s largest innovation campus',
      'Mentorship from industry experts',
      'Prototyping facilities at T-Works',
      'Networking with global investors'
    ],
    applicationSteps: [
      'Register on T-Hub portal (https://t-hub.co)',
      'Submit startup pitch or innovation details',
      'Attend screening and selection process'
    ],
    officialLink: 'https://t-hub.co/',
    categoryTags: ['Startups', 'Innovation', 'Technology', 'Telangana']
  }
];

export const DISTRICTS = [
  'Adilabad', 'Bhadradri Kothagudem', 'Hanumakonda', 'Hyderabad', 'Jagtial', 'Jangaon', 
  'Jayashankar Bhupalpally', 'Jogulamba Gadwal', 'Kamareddy', 'Karimnagar', 'Khammam', 
  'Kumuram Bheem Asifabad', 'Mahabubabad', 'Mahabubnagar', 'Mancherial', 'Medak', 
  'Medchal-Malkajgiri', 'Mulugu', 'Nagarkurnool', 'Nalgonda', 'Narayanpet', 'Nirmal', 
  'Nizamabad', 'Peddapalli', 'Rajanna Sircilla', 'Rangareddy', 'Sangareddy', 'Siddipet', 
  'Suryapet', 'Vikarabad', 'Wanaparthy', 'Warangal', 'Yadadri Bhuvanagiri'
];

export const UI_STRINGS = {
  [Language.ENGLISH]: {
    welcome: 'Welcome back',
    dashboard: 'Dashboard',
    askAi: 'Ask Assistant',
    notifications: 'Notifications',
    history: 'History',
    profile: 'Profile',
    eligibility: 'Check Eligibility',
    schemesFound: 'Recommended Schemes',
    searchPlaceholder: 'Ask about any Telangana scheme or policy...',
    references: 'Official References',
    applyNow: 'Official Application Link'
  },
  [Language.TELUGU]: {
    welcome: 'తిరిగి స్వాగతం',
    dashboard: 'డ్యాష్‌బోర్డ్',
    askAi: 'అసిస్టెంట్‌ని అడగండి',
    notifications: 'నోటిఫికేషన్లు',
    history: 'చరిత్ర',
    profile: 'ప్రొఫైల్',
    eligibility: 'అర్హతను తనిఖీ చేయండి',
    schemesFound: 'సిఫార్సు చేయబడిన పథకాలు',
    searchPlaceholder: 'ఏదైనా తెలంగాణ పథకం లేదా విధానం గురించి అడగండి...',
    references: 'అధికారిక ఆధారాలు',
    applyNow: 'అధికారిక దరఖాస్తు లింక్'
  }
};
