import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const EyeIcon = (props: SvgProps) => (
  <Svg width={14} height={10} fill="none" {...props}>
    <Path
      d="M7 .454A7.168 7.168 0 0 0 .333 5 7.168 7.168 0 0 0 7 9.545 7.168 7.168 0 0 0 13.667 5 7.168 7.168 0 0 0 7 .454ZM7 8.03a3.031 3.031 0 0 1 0-6.06 3.031 3.031 0 0 1 0 6.06ZM7 3.18A1.816 1.816 0 0 0 5.182 5c0 1.006.812 1.818 1.818 1.818A1.816 1.816 0 0 0 8.818 5 1.816 1.816 0 0 0 7 3.18Z"
      fill="#333"
    />
  </Svg>
);

export default EyeIcon;
