import type { School } from "@/lib/types";

/**
 * Cambodian higher-education institutions.
 *
 * Tuition is USD per academic year for a Khmer-national undergraduate on the
 * standard (non-international) track. Ranges are wide on purpose: most schools
 * price per credit and per faculty, so engineering and medicine sit at the top
 * of a school's range while social sciences sit at the bottom.
 *
 * These are indicative figures for guidance. Confirm with the school.
 */
export const schools: School[] = [
  {
    slug: "rupp",
    shortName: "RUPP",
    name: {
      km: "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ",
      en: "Royal University of Phnom Penh",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1960,
    website: "https://www.rupp.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យចំណាស់ និងធំជាងគេរបស់កម្ពុជា មានមុខវិជ្ជាទូលំទូលាយពីវិទ្យាសាស្ត្រ ដល់មនុស្សសាស្ត្រ។",
      en: "Cambodia's oldest and largest university, with the broadest spread of faculties from natural sciences to humanities.",
    },
    tuitionPerYear: { min: 450, max: 900 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋតាមលទ្ធផលប្រឡងចូល", en: "State scholarships awarded on entrance-exam results" },
      { km: "អាហារូបករណ៍សម្រាប់សិស្សក្រីក្រ និងសិស្សមកពីជនបទ", en: "Need-based places for low-income and rural students" },
    ],
    majorSlugs: [
      "computer-science",
      "information-technology",
      "data-science-ai",
      "economics",
      "international-relations",
      "media-communication",
      "english-literature",
      "environmental-science",
      "psychology",
      "tourism-hospitality",
    ],
    admissionNotes: {
      km: "ត្រូវមានសញ្ញាបត្របាក់ឌុប។ មុខវិជ្ជាដែលមានតម្រូវការខ្ពស់ត្រូវប្រឡងចូល ជាធម្មតាខែកញ្ញា–តុលា។",
      en: "Bac II certificate required. Competitive faculties run an entrance exam, usually in September–October.",
    },
  },
  {
    slug: "itc",
    shortName: "ITC",
    name: {
      km: "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា",
      en: "Institute of Technology of Cambodia",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1964,
    website: "https://itc.edu.kh",
    summary: {
      km: "សាលាវិស្វកម្មឈានមុខគេរបស់កម្ពុជា ល្បីខាងគុណភាព និងការប្រឡងចូលដ៏តឹងរ៉ឹង។",
      en: "Cambodia's flagship engineering school, known for rigorous entry and strong industry placement.",
    },
    tuitionPerYear: { min: 500, max: 1100 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋពេញលេញសម្រាប់និស្សិតពូកែក្នុងការប្រឡងចូល", en: "Full state scholarships for top entrance-exam scorers" },
      { km: "អាហារូបករណ៍ដៃគូបារាំង និង AUF", en: "French and AUF partner scholarships" },
    ],
    majorSlugs: [
      "civil-engineering",
      "electrical-engineering",
      "mechanical-engineering",
      "computer-science",
      "information-technology",
      "data-science-ai",
      "food-science",
      "environmental-science",
      "architecture",
      "industrial-engineering",
    ],
    admissionNotes: {
      km: "ប្រឡងចូលប្រកួតប្រជែងខ្លាំង ផ្តោតលើគណិតវិទ្យា និងរូបវិទ្យា។ ត្រៀមឲ្យបានល្អតាំងពីថ្នាក់ទី១២។",
      en: "Highly competitive entrance exam weighted toward maths and physics. Prepare from grade 12.",
    },
  },
  {
    slug: "cadt",
    shortName: "CADT",
    name: {
      km: "អាកាដឺមីបច្ចេកវិទ្យាឌីជីថលកម្ពុជា",
      en: "Cambodia Academy of Digital Technology",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 2019,
    website: "https://cadt.edu.kh",
    summary: {
      km: "គ្រឹះស្ថានឯកទេសខាងបច្ចេកវិទ្យាឌីជីថល បង្កើតឡើងដោយរដ្ឋាភិបាល ដើម្បីបណ្តុះធនធានមនុស្សផ្នែកឌីជីថល។",
      en: "A government-founded institute specialising purely in digital technology, built to close Cambodia's tech skills gap.",
    },
    tuitionPerYear: { min: 600, max: 1200 },
    scholarships: [
      { km: "អាហារូបករណ៍ ១០០% និង ៥០% តាមលទ្ធផលប្រឡងចូល", en: "100% and 50% scholarships based on entrance-exam results" },
      { km: "អាហារូបករណ៍ឧបត្ថម្ភដោយក្រុមហ៊ុនបច្ចេកវិទ្យា", en: "Industry-sponsored places from technology companies" },
    ],
    majorSlugs: [
      "computer-science",
      "data-science-ai",
      "information-technology",
      "cybersecurity",
      "telecommunications",
    ],
    admissionNotes: {
      km: "ប្រឡងចូលផ្តោតលើគណិតវិទ្យា និងតក្កវិជ្ជា។ មានវគ្គត្រៀមមុនចូលរៀនសម្រាប់និស្សិតជាប់។",
      en: "Entrance exam focused on maths and logic; admitted students take a foundation term before the main programme.",
    },
  },
  {
    slug: "num",
    shortName: "NUM",
    name: {
      km: "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង",
      en: "National University of Management",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1983,
    website: "https://num.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យរដ្ឋឈានមុខគេផ្នែកគ្រប់គ្រង ធុរកិច្ច និងហិរញ្ញវត្ថុ។",
      en: "The leading public university for management, business and finance, with deep links to Cambodian banks and firms.",
    },
    tuitionPerYear: { min: 450, max: 850 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋតាមលទ្ធផលបាក់ឌុប", en: "State scholarships based on Bac II grades" },
      { km: "អាហារូបករណ៍ធនាគារ និងក្រុមហ៊ុនធានារ៉ាប់រង", en: "Bank and insurance-sector sponsored places" },
    ],
    majorSlugs: [
      "accounting",
      "finance-banking",
      "business-administration",
      "marketing",
      "economics",
      "logistics-supply-chain",
      "information-technology",
      "tourism-hospitality",
    ],
    admissionNotes: {
      km: "ទទួលសិស្សបាក់ឌុបគ្រប់និទ្ទេស។ អាហារូបករណ៍ត្រូវប្រឡងជ្រើសរើស។",
      en: "Open to all Bac II holders; scholarship places require a selection exam.",
    },
  },
  {
    slug: "rule",
    shortName: "RULE",
    name: {
      km: "សាកលវិទ្យាល័យភូមិន្ទនីតិសាស្ត្រ និងវិទ្យាសាស្ត្រសេដ្ឋកិច្ច",
      en: "Royal University of Law and Economics",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1949,
    website: "https://rule.edu.kh",
    summary: {
      km: "គ្រឹះស្ថានឈានមុខគេផ្នែកច្បាប់ និងសេដ្ឋកិច្ច ជាកន្លែងបណ្តុះមេធាវី និងចៅក្រមភាគច្រើនរបស់ប្រទេស។",
      en: "The country's principal law and economics school; most Cambodian lawyers and judges trained here.",
    },
    tuitionPerYear: { min: 400, max: 800 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋ", en: "State scholarship places" },
      { km: "កម្មវិធីសហប្រតិបត្តិការបារាំង និងជប៉ុន", en: "French and Japanese cooperation programmes" },
    ],
    majorSlugs: ["law", "economics", "business-administration", "international-relations", "accounting"],
    admissionNotes: {
      km: "មានកម្មវិធីខ្មែរ បារាំង និងអង់គ្លេស។ កម្មវិធីភាសាបរទេសត្រូវប្រឡងភាសា។",
      en: "Khmer, French and English tracks. Foreign-language tracks require a language entrance test.",
    },
  },
  {
    slug: "uhs",
    shortName: "UHS",
    name: {
      km: "សាកលវិទ្យាល័យវិទ្យាសាស្ត្រសុខាភិបាល",
      en: "University of Health Sciences",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1946,
    website: "https://uhs.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យរដ្ឋតែមួយគត់ដែលបណ្តុះបណ្តាលវេជ្ជបណ្ឌិត ឱសថការី និងទន្តបណ្ឌិត។",
      en: "The national public university for medicine, pharmacy, dentistry and nursing.",
    },
    tuitionPerYear: { min: 700, max: 1800 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋសម្រាប់និស្សិតវេជ្ជសាស្ត្រពូកែ", en: "State scholarships for top medical entrants" },
      { km: "អាហារូបករណ៍ក្រសួងសុខាភិបាល ជាប់កាតព្វកិច្ចបម្រើការនៅមន្ទីរពេទ្យរដ្ឋ", en: "Ministry of Health places tied to public-hospital service" },
    ],
    majorSlugs: ["medicine", "nursing", "pharmacy", "public-health", "midwifery"],
    admissionNotes: {
      km: "ប្រឡងចូលពិបាកបំផុតមួយក្នុងប្រទេស ផ្តោតលើជីវវិទ្យា និងគីមីវិទ្យា។ វេជ្ជសាស្ត្រចំណាយពេល ៨ ឆ្នាំ។",
      en: "One of the toughest entrance exams in the country, weighted to biology and chemistry. The MD track runs eight years.",
    },
  },
  {
    slug: "rua",
    shortName: "RUA",
    name: {
      km: "សាកលវិទ្យាល័យភូមិន្ទកសិកម្ម",
      en: "Royal University of Agriculture",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1964,
    website: "https://rua.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកទេសខាងកសិកម្ម វារីវប្បកម្ម និងធនធានធម្មជាតិ។",
      en: "The national university for agriculture, aquaculture, forestry and natural-resource management.",
    },
    tuitionPerYear: { min: 350, max: 700 },
    scholarships: [
      { km: "អាហារូបករណ៍សម្រាប់សិស្សមកពីខេត្ត", en: "Priority scholarship places for students from rural provinces" },
      { km: "អាហារូបករណ៍គម្រោងអភិវឌ្ឍន៍អន្តរជាតិ", en: "International development-project scholarships" },
    ],
    majorSlugs: ["agriculture", "food-science", "environmental-science", "veterinary", "agribusiness"],
    admissionNotes: {
      km: "ថ្លៃសិក្សាទាបជាងគេក្នុងចំណោមសាកលវិទ្យាល័យរដ្ឋ។ មានកន្លែងស្នាក់នៅសម្រាប់និស្សិតខេត្ត។",
      en: "Among the cheapest public options, with campus housing for students from the provinces.",
    },
  },
  {
    slug: "npic",
    shortName: "NPIC",
    name: {
      km: "វិទ្យាស្ថានជាតិពហុបច្ចេកទេសកម្ពុជា",
      en: "National Polytechnic Institute of Cambodia",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1999,
    website: "https://npic.edu.kh",
    summary: {
      km: "ផ្តោតលើវិស្វកម្មអនុវត្ត និងបច្ចេកទេសជាក់ស្តែង ជាមួយកិច្ចសហប្រតិបត្តិការកូរ៉េ។",
      en: "Applied engineering and hands-on technical training, built with Korean cooperation.",
    },
    tuitionPerYear: { min: 300, max: 700 },
    scholarships: [
      { km: "អាហារូបករណ៍បណ្តុះបណ្តាលបច្ចេកទេសរបស់រដ្ឋ", en: "Government technical-training scholarships" },
      { km: "អាហារូបករណ៍ដៃគូកូរ៉េ (KOICA)", en: "Korean partner (KOICA) scholarships" },
    ],
    majorSlugs: [
      "mechanical-engineering",
      "electrical-engineering",
      "civil-engineering",
      "information-technology",
      "industrial-engineering",
    ],
    admissionNotes: {
      km: "ល្អសម្រាប់អ្នកចង់រៀនជំនាញអនុវត្តជាក់ស្តែង និងចូលទីផ្សារការងារលឿន។",
      en: "A good route if you want practical, workshop-heavy training and a fast path into work.",
    },
  },
  {
    slug: "paragon",
    shortName: "Paragon.U",
    name: {
      km: "សាកលវិទ្យាល័យអន្តរជាតិផារ៉ាហ្គន",
      en: "Paragon International University",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2010,
    website: "https://paragoniu.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនបង្រៀនជាភាសាអង់គ្លេសទាំងស្រុង ផ្តោតលើវិទ្យាសាស្ត្រកុំព្យូទ័រ វិស្វកម្ម និងធុរកិច្ច។",
      en: "Fully English-medium private university focused on computer science, engineering and business.",
    },
    tuitionPerYear: { min: 2600, max: 4500 },
    scholarships: [
      { km: "អាហារូបករណ៍ ២៥–១០០% តាមលទ្ធផលសិក្សា", en: "Merit scholarships from 25% to 100% of tuition" },
      { km: "អាហារូបករណ៍សម្រាប់និស្សិតស្រី់ក្នុងវិស័យ STEM", en: "Dedicated scholarships for women in STEM" },
    ],
    majorSlugs: [
      "computer-science",
      "data-science-ai",
      "civil-engineering",
      "electrical-engineering",
      "business-administration",
      "finance-banking",
      "international-relations",
      "architecture",
    ],
    admissionNotes: {
      km: "ត្រូវការភាសាអង់គ្លេសល្អ។ មានវគ្គត្រៀមភាសាអង់គ្លេសសម្រាប់និស្សិតដែលមិនទាន់ដល់កម្រិត។",
      en: "Requires solid English; a foundation English year is available for students who aren't there yet.",
    },
  },
  {
    slug: "aupp",
    shortName: "AUPP",
    name: {
      km: "សាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ",
      en: "American University of Phnom Penh",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2013,
    website: "https://aupp.edu.kh",
    summary: {
      km: "កម្មវិធីសិក្សាបែបអាមេរិកាំង មានលទ្ធភាពទទួលសញ្ញាបត្រពីរពីសាកលវិទ្យាល័យអាមេរិក។",
      en: "US-style curriculum with dual-degree routes to partner universities in the United States.",
    },
    tuitionPerYear: { min: 4500, max: 8000 },
    scholarships: [
      { km: "អាហារូបករណ៍តាមលទ្ធផលសិក្សា រហូតដល់ ១០០%", en: "Merit scholarships up to full tuition" },
      { km: "អាហារូបករណ៍អ្នកដឹកនាំសហគមន៍", en: "Community-leadership scholarships" },
    ],
    majorSlugs: [
      "business-administration",
      "computer-science",
      "information-technology",
      "media-communication",
      "architecture",
      "international-relations",
      "tourism-hospitality",
    ],
    admissionNotes: {
      km: "ថ្លៃសិក្សាខ្ពស់ ប៉ុន្តែអាហារូបករណ៍ច្រើន។ ត្រូវការភាសាអង់គ្លេសកម្រិតខ្ពស់។",
      en: "The most expensive tier, but scholarships are common. Strong English is required.",
    },
  },
  {
    slug: "camed",
    shortName: "CamEd",
    name: {
      km: "សាលាពាណិជ្ជសាស្ត្រ CamEd",
      en: "CamEd Business School",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2005,
    website: "https://cam-ed.com",
    summary: {
      km: "ឯកទេសខាងគណនេយ្យ និងហិរញ្ញវត្ថុ រៀបចំនិស្សិតសម្រាប់វិញ្ញាបនបត្រ ACCA និង CAT។",
      en: "Specialist accounting and finance school; students sit international ACCA and CAT exams alongside the degree.",
    },
    tuitionPerYear: { min: 1400, max: 2600 },
    scholarships: [
      { km: "អាហារូបករណ៍តាមលទ្ធផលបាក់ឌុប និទ្ទេស A និង B", en: "Merit scholarships for Bac II grade A and B holders" },
      { km: "អាហារូបករណ៍ឧបត្ថម្ភដោយក្រុមហ៊ុនសវនកម្ម", en: "Sponsored places from audit firms" },
    ],
    majorSlugs: ["accounting", "finance-banking", "business-administration", "economics"],
    admissionNotes: {
      km: "កម្មវិធីតម្រង់ទិសវិញ្ញាបនបត្រអន្តរជាតិ។ និស្សិតជាច្រើនមានការងារមុនបញ្ចប់ការសិក្សា។",
      en: "Professional-qualification oriented; many students are hired by audit firms before graduating.",
    },
  },
  {
    slug: "puc",
    shortName: "PUC",
    name: {
      km: "សាកលវិទ្យាល័យបញ្ញាសាស្ត្រកម្ពុជា",
      en: "Paññāsāstra University of Cambodia",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 1997,
    website: "https://puc.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនធំមួយ បង្រៀនជាភាសាអង់គ្លេស មានសាខានៅតាមខេត្ត។",
      en: "A large English-medium private university with branch campuses in several provinces.",
    },
    tuitionPerYear: { min: 900, max: 1900 },
    scholarships: [
      { km: "អាហារូបករណ៍តាមលទ្ធផលបាក់ឌុប", en: "Bac II merit scholarships" },
      { km: "បញ្ចុះតម្លៃសម្រាប់បងប្អូនបង្កើតរៀនរួមគ្នា", en: "Sibling discounts" },
    ],
    majorSlugs: [
      "business-administration",
      "law",
      "international-relations",
      "english-literature",
      "media-communication",
      "information-technology",
      "psychology",
      "tourism-hospitality",
    ],
    admissionNotes: {
      km: "ទទួលសិស្សបានទូលំទូលាយ មានថ្នាក់ពេលល្ងាច និងចុងសប្តាហ៍សម្រាប់អ្នកធ្វើការ។",
      en: "Broad admissions, with evening and weekend classes for students who are already working.",
    },
  },
  {
    slug: "uc",
    shortName: "UC",
    name: {
      km: "សាកលវិទ្យាល័យកម្ពុជា",
      en: "The University of Cambodia",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2003,
    website: "https://uc.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនផ្តោតលើធុរកិច្ច ទំនាក់ទំនងអន្តរជាតិ និងច្បាប់។",
      en: "Private university strong in business, international relations and law, with an active student-leadership culture.",
    },
    tuitionPerYear: { min: 900, max: 1800 },
    scholarships: [
      { km: "អាហារូបករណ៍ធនធានមនុស្សពេញលេញ", en: "Full 'human resource' scholarships awarded annually" },
      { km: "អាហារូបករណ៍តាមលទ្ធផលសិក្សា", en: "Academic merit scholarships" },
    ],
    majorSlugs: [
      "business-administration",
      "international-relations",
      "law",
      "economics",
      "information-technology",
      "media-communication",
    ],
    admissionNotes: {
      km: "មានកម្មវិធីអាហារូបករណ៍ពេញលេញប្រចាំឆ្នាំដែលប្រកួតប្រជែងខ្លាំង។",
      en: "Runs a competitive annual full-scholarship programme worth applying for early.",
    },
  },
  {
    slug: "puthisastra",
    shortName: "UP",
    name: {
      km: "សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ",
      en: "University of Puthisastra",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2007,
    website: "https://puthisastra.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនឈានមុខគេផ្នែកសុខាភិបាល ជាពិសេសទន្តសាស្ត្រ និងគិលានុបដ្ឋាក។",
      en: "The leading private health-sciences university, particularly for dentistry and nursing.",
    },
    tuitionPerYear: { min: 1500, max: 3500 },
    scholarships: [
      { km: "អាហារូបករណ៍ផ្នែកគិលានុបដ្ឋាក និងឆ្មប", en: "Nursing and midwifery scholarship places" },
      { km: "អាហារូបករណ៍ដៃគូអូស្ត្រាលី", en: "Australian partner scholarships" },
    ],
    majorSlugs: ["nursing", "pharmacy", "public-health", "midwifery", "information-technology"],
    admissionNotes: {
      km: "កម្មវិធីសុខាភិបាលបង្រៀនជាភាសាអង់គ្លេស ហើយមានការអនុវត្តនៅមន្ទីរពេទ្យតាំងពីឆ្នាំដំបូង។",
      en: "Health programmes are English-medium with hospital placements from the first year.",
    },
  },
  {
    slug: "norton",
    shortName: "Norton",
    name: {
      km: "សាកលវិទ្យាល័យណតធើន",
      en: "Norton University",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 1996,
    website: "https://norton-u.com",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនចំណាស់មួយ មានវិស្វកម្ម បច្ចេកវិទ្យា និងធុរកិច្ច ក្នុងតម្លៃសមរម្យ។",
      en: "A long-established private university offering engineering, IT and business at mid-range prices.",
    },
    tuitionPerYear: { min: 700, max: 1400 },
    scholarships: [
      { km: "អាហារូបករណ៍តាមលទ្ធផលបាក់ឌុប", en: "Bac II merit scholarships" },
      { km: "បញ្ចុះតម្លៃថ្នាក់ពេលល្ងាច", en: "Discounted evening-programme rates" },
    ],
    majorSlugs: [
      "information-technology",
      "computer-science",
      "civil-engineering",
      "electrical-engineering",
      "business-administration",
      "accounting",
      "architecture",
    ],
    admissionNotes: {
      km: "ជម្រើសសមរម្យសម្រាប់និស្សិតដែលចង់រៀនផង ធ្វើការផង។",
      en: "A practical option for students who need to work while studying.",
    },
  },
  {
    slug: "bbu",
    shortName: "BBU",
    name: {
      km: "សាកលវិទ្យាល័យបៀលប្រាយ",
      en: "Build Bright University",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2003,
    website: "https://bbu.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យឯកជនមានសាខាច្រើននៅតាមខេត្ត ថ្លៃសិក្សាសមរម្យ។",
      en: "Private university with campuses across several provinces and affordable fees.",
    },
    tuitionPerYear: { min: 600, max: 1200 },
    scholarships: [
      { km: "អាហារូបករណ៍ដល់សិស្សនៅតាមខេត្ត", en: "Provincial-campus scholarship places" },
      { km: "អាហារូបករណ៍តាមលទ្ធផលសិក្សា", en: "Academic merit scholarships" },
    ],
    majorSlugs: [
      "business-administration",
      "accounting",
      "information-technology",
      "law",
      "tourism-hospitality",
      "english-literature",
    ],
    admissionNotes: {
      km: "សាខាតាមខេត្តអាចជាជម្រើសល្អ បើមិនចង់ផ្លាស់ទីមករស់នៅភ្នំពេញ។",
      en: "The provincial campuses are worth considering if you don't want to relocate to Phnom Penh.",
    },
  },
  {
    slug: "setec",
    shortName: "SETEC",
    name: {
      km: "វិទ្យាស្ថានសេតេក",
      en: "SETEC Institute",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2004,
    website: "https://setecu.edu.kh",
    summary: {
      km: "វិទ្យាស្ថានទំហំតូច ផ្តោតលើបច្ចេកវិទ្យាព័ត៌មាន និងធុរកិច្ច ជាមួយថ្នាក់តូច។",
      en: "A smaller institute focused on IT and business, with small class sizes.",
    },
    tuitionPerYear: { min: 800, max: 1500 },
    scholarships: [
      { km: "អាហារូបករណ៍ផ្នែកបច្ចេកវិទ្យាព័ត៌មាន", en: "IT-track scholarships" },
    ],
    majorSlugs: ["information-technology", "computer-science", "business-administration", "accounting"],
    admissionNotes: {
      km: "ថ្នាក់តូច ងាយទទួលបានការណែនាំពីគ្រូដោយផ្ទាល់។",
      en: "Small cohorts mean much more direct contact with lecturers.",
    },
  },
  {
    slug: "rufa",
    shortName: "RUFA",
    name: {
      km: "សាកលវិទ្យាល័យភូមិន្ទវិចិត្រសិល្បៈ",
      en: "Royal University of Fine Arts",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1965,
    website: "https://rufa.edu.kh",
    summary: {
      km: "គ្រឹះស្ថានជាតិខាងសិល្បៈ ស្ថាបត្យកម្ម បុរាណវិទ្យា និងសិល្បៈសម្តែង។",
      en: "The national school for fine arts, architecture, archaeology and performing arts.",
    },
    tuitionPerYear: { min: 350, max: 800 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋសម្រាប់សិល្បៈបុរាណខ្មែរ", en: "State scholarships for traditional Khmer arts" },
    ],
    majorSlugs: ["architecture", "graphic-design", "media-communication"],
    admissionNotes: {
      km: "ត្រូវប្រឡងជំនាញសិល្បៈ ឬបង្ហាញស្នាដៃ។ ជម្រើសល្អសម្រាប់អ្នកមានទេពកោសល្យខាងសិល្បៈ។",
      en: "Requires a practical or portfolio audition alongside the academic entry.",
    },
  },
  {
    slug: "limkokwing",
    shortName: "LUCT",
    name: {
      km: "សាកលវិទ្យាល័យលីមកុកវីង",
      en: "Limkokwing University of Creative Technology",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "private",
    founded: 2011,
    website: "https://limkokwing.edu.kh",
    summary: {
      km: "ផ្តោតលើការរចនា ឌីជីថល និងឧស្សាហកម្មច្នៃប្រឌិត បង្រៀនជាភាសាអង់គ្លេស។",
      en: "Design, digital media and creative industries, taught in English on a Malaysian franchise model.",
    },
    tuitionPerYear: { min: 1800, max: 3200 },
    scholarships: [
      { km: "អាហារូបករណ៍ផ្នែកច្នៃប្រឌិត តាមស្នាដៃ", en: "Portfolio-based creative scholarships" },
    ],
    majorSlugs: ["graphic-design", "media-communication", "marketing", "architecture", "information-technology"],
    admissionNotes: {
      km: "ត្រូវបង្ហាញស្នាដៃរចនាសម្រាប់ជំនាញច្នៃប្រឌិត។",
      en: "Creative programmes ask for a portfolio at application.",
    },
  },
  {
    slug: "ubb",
    shortName: "UBB",
    name: {
      km: "សាកលវិទ្យាល័យបាត់ដំបង",
      en: "University of Battambang",
    },
    province: { km: "បាត់ដំបង", en: "Battambang" },
    type: "public",
    founded: 2007,
    website: "https://ubb.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យរដ្ឋធំជាងគេនៅភូមិភាគពាយ័ព្យ បម្រើនិស្សិតពីបាត់ដំបង បន្ទាយមានជ័យ និងប៉ៃលិន។",
      en: "The main public university in the north-west, serving Battambang, Banteay Meanchey and Pailin.",
    },
    tuitionPerYear: { min: 300, max: 650 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋសម្រាប់និស្សិតក្នុងតំបន់", en: "State scholarships prioritising students from the region" },
    ],
    majorSlugs: [
      "agriculture",
      "business-administration",
      "information-technology",
      "english-literature",
      "tourism-hospitality",
      "environmental-science",
    ],
    admissionNotes: {
      km: "ជម្រើសសន្សំសំចៃ បើគ្រួសារនៅភូមិភាគពាយ័ព្យ — មិនចាំបាច់ចំណាយថ្លៃជួលផ្ទះនៅភ្នំពេញ។",
      en: "A much cheaper total cost if your family is in the north-west — no Phnom Penh rent.",
    },
  },
  {
    slug: "svay-rieng",
    shortName: "SRU",
    name: {
      km: "សាកលវិទ្យាល័យស្វាយរៀង",
      en: "Svay Rieng University",
    },
    province: { km: "ស្វាយរៀង", en: "Svay Rieng" },
    type: "public",
    founded: 2007,
    website: "https://sru.edu.kh",
    summary: {
      km: "សាកលវិទ្យាល័យរដ្ឋនៅភូមិភាគអាគ្នេយ៍ មានកសិកម្ម ធុរកិច្ច និងបច្ចេកវិទ្យា។",
      en: "Public university in the south-east, covering agriculture, business and IT.",
    },
    tuitionPerYear: { min: 280, max: 600 },
    scholarships: [
      { km: "អាហារូបករណ៍រដ្ឋសម្រាប់និស្សិតក្នុងខេត្ត", en: "Provincial state-scholarship places" },
    ],
    majorSlugs: ["agriculture", "business-administration", "information-technology", "english-literature", "accounting"],
    admissionNotes: {
      km: "ជិតតំបន់សេដ្ឋកិច្ចពិសេសបាវិត ដែលមានឱកាសកម្មសិក្សាក្នុងរោងចក្រ។",
      en: "Close to the Bavet special economic zone, which opens factory and logistics internships.",
    },
  },
  {
    slug: "prek-leap",
    shortName: "PNIA",
    name: {
      km: "វិទ្យាស្ថានជាតិកសិកម្មព្រែកលៀប",
      en: "Prek Leap National Institute of Agriculture",
    },
    province: { km: "ភ្នំពេញ", en: "Phnom Penh" },
    type: "public",
    founded: 1954,
    website: "https://pnia.edu.kh",
    summary: {
      km: "គ្រឹះស្ថានចំណាស់ខាងកសិកម្មអនុវត្ត ជាមួយកសិដ្ឋានពិសោធន៍ផ្ទាល់។",
      en: "Long-established applied-agriculture institute with its own working farm.",
    },
    tuitionPerYear: { min: 300, max: 650 },
    scholarships: [
      { km: "អាហារូបករណ៍កសិកម្មរបស់រដ្ឋ", en: "Government agriculture scholarships" },
    ],
    majorSlugs: ["agriculture", "food-science", "agribusiness", "veterinary"],
    admissionNotes: {
      km: "ផ្តោតលើការអនុវត្តជាក់ស្តែងច្រើនជាងទ្រឹស្តី។",
      en: "Heavily practical rather than theoretical — you spend real time on the farm.",
    },
  },
];

export const schoolBySlug = new Map(schools.map((s) => [s.slug, s]));

export function getSchool(slug: string): School | undefined {
  return schoolBySlug.get(slug);
}
