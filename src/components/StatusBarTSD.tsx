import React from 'react';
import {StatusBar} from 'react-native';
import {appColors} from '../utils/theme';

type StatusBarProps = {
  backgroundColor?: keyof typeof appColors
}

// component only used to android platform
const StatusBarTSD:React.FC<StatusBarProps> = React.memo(({backgroundColor}) => {
  return (
    <StatusBar
      backgroundColor={
        backgroundColor ? backgroundColor : appColors.blue
      }
      barStyle={backgroundColor ? 'dark-content' : 'light-content'}
    />
  );
})

export default StatusBarTSD
