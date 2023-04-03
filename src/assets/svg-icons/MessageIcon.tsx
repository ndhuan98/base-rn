import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import { appColors } from 'src/utils/theme';

const MessageIcon = (props: SvgProps) => (
  <Svg width={19} height={20} fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.572 16.19h7.617a2.32 2.32 0 0 0 2.313-2.312V2.313A2.32 2.32 0 0 0 16.189 0H2.31A2.31 2.31 0 0 0 .01 2.313L0 13.877a2.312 2.312 0 0 0 2.312 2.314c.638 0 1.156.517 1.156 1.155v2.075c0 .515.622.773.987.409l3.3-3.3c.217-.218.51-.34.817-.34ZM2.322 2.314H16.19v11.565H2.313l.01-11.565Z"
      fill={props.color || appColors.gray2}
    />
    <Path
      d="M5.782 6.939h6.94c.635 0 1.156.52 1.156 1.156a1.16 1.16 0 0 1-1.157 1.157H5.782a1.16 1.16 0 0 1-1.156-1.157c0-.636.52-1.156 1.156-1.156Zm2.313 5.782H5.782a1.16 1.16 0 0 1-1.156-1.156c0-.636.52-1.157 1.156-1.157h2.313c.636 0 1.157.52 1.157 1.157a1.16 1.16 0 0 1-1.157 1.156Zm4.626-6.939H5.782a1.16 1.16 0 0 1-1.156-1.156c0-.636.52-1.157 1.156-1.157h6.94c.635 0 1.156.52 1.156 1.157a1.16 1.16 0 0 1-1.157 1.156Z"
      fill={props.color || appColors.gray2}
    />
  </Svg>
);

export default MessageIcon;
