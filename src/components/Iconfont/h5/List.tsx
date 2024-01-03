/* tslint:disable */
/* eslint-disable */

import React, { CSSProperties, SVGAttributes, FunctionComponent } from 'react';
import { getIconColor } from './helper';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  size?: number;
  color?: string | string[];
}

const DEFAULT_STYLE: CSSProperties = {
  display: 'block',
};

const List: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 476H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM912 760H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M160 228m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M160 512m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <path
        d="M160 796m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </svg>
  );
};

List.defaultProps = {
  size: 18,
};

export default List;
