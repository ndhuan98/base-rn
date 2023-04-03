import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const CalendarIcon = (props: SvgProps) => (
  <Svg width={12} height={14} fill="none" {...props}>
    <Path
      d="M4 6.333H2.667v1.334H4V6.333Zm2.667 0H5.333v1.334h1.334V6.333Zm2.666 0H8v1.334h1.333V6.333Zm1.334-4.666H10V.333H8.667v1.334H3.333V.333H2v1.334h-.667c-.74 0-1.326.6-1.326 1.333L0 12.333c0 .734.593 1.334 1.333 1.334h9.334c.733 0 1.333-.6 1.333-1.334V3c0-.733-.6-1.333-1.333-1.333Zm0 9.666a1 1 0 0 1-1 1H2.333a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h7.334a1 1 0 0 1 1 1v5.333Z"
      fill="#333"
    />
  </Svg>
);

export default CalendarIcon;
