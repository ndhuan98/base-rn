import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SuccessCircleIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM9.29 16.29 5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0Z"
      fill="#2EBCB1"
    />
  </Svg>
);

export default SuccessCircleIcon;
