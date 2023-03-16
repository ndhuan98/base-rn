/**
 * App Theme - Colors
 */
const app = {
  background: '#FCFBFF',
  cardBackground: '#FFFFFF',
  listItemBackground: '#FFFFFF',
  imageBackground: '#d6d6d6',
  imageIconBackGround: '#A0ABBE',
  white: 'rgba(255,255,255,1)',
  black: 'rgba(0,0,0,1)',
  transparent: 'rgba(0,0,0,0)',
  green: '#42AD3A',
  pink: '#FF5656',
  orange: '#FF8B3E',
  blue: '#1E3E97',
  darkblue: '#001968',
  cerulean: '#009BD5',
  red: '#FF203B',
  lightgray: '#efefef',
  gray: '#8B8B8B',
  darkgray: '#333',
  siver: '#D7D8DD',
  purple: '#DA439F',
  blueBackground: '#4D5EAB',
  blueFacebook: '#366AA7',
  blueTwitter: '#55ACEE',
  redGoogle: '#D12122',
  divider: '#d3dfe4',
  iconGray: 'rgba(180,180,180,1)',
  lineGray: 'rgba(237,237,237,1)',
  statusbar: '#2b3545',
  sectionText: '#788793',
  addMoreButton: 'rgba(0, 0, 0, 0.2)',
  successToast: '#2BB96B',
  warnToast: '#F7923E',
  errorToast: '#D95D6C',
  defaultIcon: '#A3A6AD',
  backgroundDialog:'rgba(0, 0, 0, 0.8)',
  disable:'#EFEFEF',
  backgroundGary:'#E7E7E9',
  colorGray:'#FAFAFA',
  colorSiver:'#7E7E7E'
};

const brand = {
  brand: {
    primary: '#FFF',
    secondary: '#17233D',
  },
};

const text = {
  textNavbar: '#fff',
  textPrimary: '#66656D',
  textSecondary: '#909090',
  textMinor: '#CCCCCC',
  textRed: '#F42F47',
  textBlue: '#00aedd',
  textGray: '#646C70',
  textContent:'#3F3D4B',
  headingPrimary: brand.brand.primary,
  headingSecondary: brand.brand.primary,
  textTitle: '#68737f',
  textContent: 'rgba(52, 64, 82, 1)',
  textSubContent: 'rgba(52, 64, 82, 0.5)',
  regular: '#394554',
  placeHolder: 'rgba(0,0,0,0.3)',
};

const borders = {
  border: '#C7C6CD',
};

const ticked = {
  ticked: '#39CE13',
};

const tabbar = {
  tabbar: {
    background: {active: '#f9f9f9', inactive: '#f9f9f9'},
  },
};

const navbar = {
  navbar: {
    background: '#343f51',
  },
};

const searchbar = {
  searchbar: {
    background: '#343f51',
    textInput: '#9FADB4',
    backgroundText: '#434F61',
  },
};

// ThaiSon
const inputText = {
  backgroundInput: '#FCFCFC',
  inputText: '#284356',
  hindText: '#8C8C8C',
  backgroundUser: '#F6FEFB',
  backgroundItem: '#EFF2F3',
};

const statusCustomer = {
  customError: '#ed5565',
  customSuccess: '#217246',
  customPending: '#000',
  customWillSend: '#8C8C8C',
};

const dialog = {
  dialogBody: 'rgba(238, 241, 242, 1)',
  dialogDivider: 'rgba(205, 217, 223, 1)',
};

export default {
  ...app,
  ...brand,
  ...text,
  ...borders,
  ...tabbar,
  ...navbar,
  ...dialog,
  ...searchbar,
  ...ticked,
  ...inputText,
  ...statusCustomer,
};
