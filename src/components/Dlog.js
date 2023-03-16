const Dlog = (key, value) => {
    if (__DEV__) {
      console.log(`${key}`, value);
    }
    return;
  };
  
  export default Dlog;
  