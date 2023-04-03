import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

const SearchIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      d="M16.199 14.608h-.834l-.296-.285a6.856 6.856 0 0 0 1.563-5.635c-.497-2.933-2.946-5.276-5.903-5.635a6.866 6.866 0 0 0-7.675 7.672c.359 2.954 2.703 5.403 5.638 5.899a6.866 6.866 0 0 0 5.638-1.562l.285.295v.834l4.487 4.485c.433.432 1.14.432 1.573 0a1.114 1.114 0 0 0 0-1.573L16.2 14.608Zm-6.335 0A4.744 4.744 0 0 1 5.112 9.86 4.744 4.744 0 0 1 9.864 5.11a4.744 4.744 0 0 1 4.751 4.749 4.744 4.744 0 0 1-4.751 4.748Z"
      fill="#333"
    />
  </Svg>
);

export default SearchIcon;
