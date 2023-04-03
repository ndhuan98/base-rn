import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const ChevronIconLeft = (props: SvgProps) => (
  <Svg {...props} width={7} height={12} fill="none">
    <Path
      d="M6.706 2.115A.998.998 0 0 0 5.295.705L0 6l5.295 5.295a.998.998 0 0 0 1.411-1.41L2.83 6l3.876-3.885Z"
      fill={props.color || '#333'}
    />
  </Svg>
);

export default ChevronIconLeft;
