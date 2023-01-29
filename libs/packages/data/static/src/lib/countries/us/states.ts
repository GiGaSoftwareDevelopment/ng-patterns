// All state abbreviations, full names, and object mappings with type safety
export const usStateAbbrs = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ];
export const usStateFullNames = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming' ];
export type USStateAbbr = typeof usStateAbbrs[number];
export type USStateFullName = typeof usStateFullNames[number];

export interface USStateLabelValue {
  label: USStateFullName;
  value: USStateAbbr;
}

export const usStatesLabelValues: USStateLabelValue[] = [ {
  label: 'Alabama',
  value: 'AL'
}, { label: 'Alaska', value: 'AK' }, { label: 'Arizona', value: 'AZ' }, {
  label: 'Arkansas',
  value: 'AR'
}, { label: 'California', value: 'CA' }, {
  label: 'Colorado',
  value: 'CO'
}, { label: 'Connecticut', value: 'CT' }, { label: 'Delaware', value: 'DE' }, {
  label: 'Florida',
  value: 'FL'
}, { label: 'Georgia', value: 'GA' }, { label: 'Hawaii', value: 'HI' }, {
  label: 'Idaho',
  value: 'ID'
}, { label: 'Illinois', value: 'IL' }, { label: 'Indiana', value: 'IN' }, {
  label: 'Iowa',
  value: 'IA'
}, { label: 'Kansas', value: 'KS' }, { label: 'Kentucky', value: 'KY' }, {
  label: 'Louisiana',
  value: 'LA'
}, { label: 'Maine', value: 'ME' }, { label: 'Maryland', value: 'MD' }, {
  label: 'Massachusetts',
  value: 'MA'
}, { label: 'Michigan', value: 'MI' }, { label: 'Minnesota', value: 'MN' }, {
  label: 'Mississippi',
  value: 'MS'
}, { label: 'Missouri', value: 'MO' }, { label: 'Montana', value: 'MT' }, {
  label: 'Nebraska',
  value: 'NE'
}, { label: 'Nevada', value: 'NV' }, {
  label: 'New Hampshire',
  value: 'NH'
}, { label: 'New Jersey', value: 'NJ' }, { label: 'New Mexico', value: 'NM' }, {
  label: 'New York',
  value: 'NY'
}, { label: 'North Carolina', value: 'NC' }, {
  label: 'North Dakota',
  value: 'ND'
}, { label: 'Ohio', value: 'OH' }, { label: 'Oklahoma', value: 'OK' }, {
  label: 'Oregon',
  value: 'OR'
}, { label: 'Pennsylvania', value: 'PA' }, {
  label: 'Rhode Island',
  value: 'RI'
}, { label: 'South Carolina', value: 'SC' }, {
  label: 'South Dakota',
  value: 'SD'
}, { label: 'Tennessee', value: 'TN' }, { label: 'Texas', value: 'TX' }, {
  label: 'Utah',
  value: 'UT'
}, { label: 'Vermont', value: 'VT' }, { label: 'Virginia', value: 'VA' }, {
  label: 'Washington',
  value: 'WA'
}, { label: 'West Virginia', value: 'WV' }, {
  label: 'Wisconsin',
  value: 'WI'
}, { label: 'Wyoming', value: 'WY' } ];

export interface USStatesAbbrMapping {
  [key: USStateAbbr]: USStateFullName;
}

export const usStatesAbbrMapping: USStatesAbbrMapping = {
  'AL': 'Alabama',
  'AK': 'Alaska',
  'AZ': 'Arizona',
  'AR': 'Arkansas',
  'CA': 'California',
  'CO': 'Colorado',
  'CT': 'Connecticut',
  'DE': 'Delaware',
  'FL': 'Florida',
  'GA': 'Georgia',
  'HI': 'Hawaii',
  'ID': 'Idaho',
  'IL': 'Illinois',
  'IN': 'Indiana',
  'IA': 'Iowa',
  'KS': 'Kansas',
  'KY': 'Kentucky',
  'LA': 'Louisiana',
  'ME': 'Maine',
  'MD': 'Maryland',
  'MA': 'Massachusetts',
  'MI': 'Michigan',
  'MN': 'Minnesota',
  'MS': 'Mississippi',
  'MO': 'Missouri',
  'MT': 'Montana',
  'NE': 'Nebraska',
  'NV': 'Nevada',
  'NH': 'New Hampshire',
  'NJ': 'New Jersey',
  'NM': 'New Mexico',
  'NY': 'New York',
  'NC': 'North Carolina',
  'ND': 'North Dakota',
  'OH': 'Ohio',
  'OK': 'Oklahoma',
  'OR': 'Oregon',
  'PA': 'Pennsylvania',
  'RI': 'Rhode Island',
  'SC': 'South Carolina',
  'SD': 'South Dakota',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'UT': 'Utah',
  'VT': 'Vermont',
  'VA': 'Virginia',
  'WA': 'Washington',
  'WV': 'West Virginia',
  'WI': 'Wisconsin',
  'WY': 'Wyoming'
};

enum US_STATES {
  AK = 'Alaska',
  AL = 'Alabama',
  AR = 'Arkansas',
  AS = 'American Samoa',
  AZ = 'Arizona',
  CA = 'California',
  CO = 'Colorado',
  CT = 'Connecticut',
  DC = 'District of Columbia',
  DE = 'Delaware',
  FL = 'Florida',
  FM = 'Federated States Of Micronesia',
  GA = 'Georgia',
  GU = 'Guam',
  HI = 'Hawaii',
  IA = 'Iowa',
  ID = 'Idaho',
  IL = 'Illinois',
  IN = 'Indiana',
  KS = 'Kansas',
  KY = 'Kentucky',
  LA = 'Louisiana',
  MA = 'Massachusetts',
  MD = 'Maryland',
  ME = 'Maine',
  MH = 'Marshall Islands',
  MI = 'Michigan',
  MN = 'Minnesota',
  MO = 'Missouri',
  MP = 'Northern Mariana Islands',
  MS = 'Mississippi',
  MT = 'Montana',
  NC = 'North Carolina',
  ND = 'North Dakota',
  NE = 'Nebraska',
  NH = 'New Hampshire',
  NJ = 'New Jersey',
  NM = 'New Mexico',
  NV = 'Nevada',
  NY = 'New York',
  OH = 'Ohio',
  OK = 'Oklahoma',
  OR = 'Oregon',
  PA = 'Pennsylvania',
  PR = 'Puerto Rico',
  PW = 'Palau',
  RI = 'Rhode Island',
  SC = 'South Carolina',
  SD = 'South Dakota',
  TN = 'Tennessee',
  TX = 'Texas',
  UT = 'Utah',
  VA = 'Virginia',
  VI = 'Virgin Islands',
  VT = 'Vermont',
  WA = 'Washington',
  WI = 'Wisconsin',
  WV = 'West Virginia',
  WY = 'Wyoming',
}

type StateAbbreviation =
  | 'AL'
  | 'AK'
  | 'AS'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'DC'
  | 'FM'
  | 'FL'
  | 'GA'
  | 'GU'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MH'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'MP'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PW'
  | 'PA'
  | 'PR'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VI'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY'

type StateFullNames =
  'Alabama'
  | 'Alaska'
  | 'Arizona'
  | 'Arkansas'
  | 'California'
  | 'Colorado'
  | 'Connecticut'
  |
  'Delaware'
  | 'Florida'
  | 'Georgia'
  | 'Hawaii'
  | 'Idaho'
  | 'Illinois'
  | 'Indiana'
  | 'Iowa'
  | 'Kansas'
  | 'Kentucky'
  |
  'Louisiana'
  | 'Maine'
  | 'Maryland'
  | 'Massachusetts'
  | 'Michigan'
  | 'Minnesota'
  | 'Mississippi'
  | 'Missouri'
  |
  'Montana'
  | 'Nebraska'
  | 'Nevada'
  | 'New Hampshire'
  | 'New Jersey'
  | 'New Mexico'
  | 'New York'
  | 'North Carolina'
  |
  'North Dakota'
  | 'Ohio'
  | 'Oklahoma'
  | 'Oregon'
  | 'Pennsylvania'
  | 'Rhode Island'
  | 'South Carolina'
  | 'South Dakota'
  |
  'Tennessee'
  | 'Texas'
  | 'Utah'
  | 'Vermont'
  | 'Virginia'
  | 'Washington'
  | 'West Virginia'
  | 'Wisconsin'
  | 'Wyoming';
