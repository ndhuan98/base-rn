import * as React from 'react';
import Svg, { SvgProps, Path, G, Defs, ClipPath } from 'react-native-svg';

const EyeIconOff = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        d="M8 4.648a3.031 3.031 0 0 1 3.03 3.03c0 .31-.06.607-.145.886l1.854 1.854a7.152 7.152 0 0 0 1.928-2.745 7.171 7.171 0 0 0-8.873-4.194l1.315 1.315c.285-.085.582-.146.891-.146ZM2.37 2.624a.604.604 0 0 0 0 .855l1.194 1.194a7.207 7.207 0 0 0-2.23 3.006A7.168 7.168 0 0 0 8 12.224c.921 0 1.8-.182 2.612-.497l1.649 1.649a.604.604 0 1 0 .854-.855L3.23 2.624a.61.61 0 0 0-.86 0ZM8 10.71a3.031 3.031 0 0 1-3.03-3.03c0-.467.109-.91.297-1.297l.951.951c-.018.11-.036.225-.036.346 0 1.006.812 1.818 1.818 1.818.121 0 .23-.018.345-.042l.952.951c-.394.194-.83.303-1.297.303Zm1.8-3.23a1.8 1.8 0 0 0-1.6-1.6l1.6 1.6Z"
        fill="#333"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default EyeIconOff;
