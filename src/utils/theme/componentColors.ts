/**
 * App Theme - Colors
 */
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
    // textContent:'#3F3D4B',
    headingPrimary: brand.brand.primary,
    headingSecondary: brand.brand.primary,
    textTitle: '#68737f',
    textContent: 'rgba(52, 64, 82, 1)',
    textSubContent: 'rgba(52, 64, 82, 0.5)',
    regular: '#394554',
    placeHolder: 'rgba(0,0,0,0.3)',
    colorCount:"#313131"
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
  