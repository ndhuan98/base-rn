import React from 'react';
import {StatusBar} from 'react-native';
import {AppColors} from '../theme';

// component only used to android platform
const StatusBarTSD = props => {
  return (
    <StatusBar
      backgroundColor={
        props.backgroundColor ? props.backgroundColor : AppColors.blue
      }
      barStyle={props.backgroundColor ? 'dark-content' : 'light-content'}
    />
  );
};

export default React.memo(StatusBarTSD);
