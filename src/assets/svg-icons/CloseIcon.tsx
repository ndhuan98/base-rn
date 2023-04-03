import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CloseIcon = (props: SvgProps) => (
  <Svg width={14} height={14} fill="#000" {...props}>
    <Path
      d="M13.3.71a.996.996 0 0 0-1.41 0L7 5.59 2.11.7A.996.996 0 1 0 .7 2.11L5.59 7 .7 11.89a.996.996 0 1 0 1.41 1.41L7 8.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L8.41 7l4.89-4.89c.38-.38.38-1.02 0-1.4Z"
      fill={props.color || '#333'}
    />
  </Svg>
);

export default CloseIcon;
