import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ChevronIconDown = (props: SvgProps) => (
  <Svg width={8} height={5} fill="none" {...props}>
    <Path d="M1.41.196a.665.665 0 0 0-.94.94L4 4.667l3.53-3.53a.665.665 0 0 0-.94-.94L4 2.78 1.41.196Z" fill="#333" />
  </Svg>
);

export default ChevronIconDown;
