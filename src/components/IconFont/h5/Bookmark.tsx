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

const Bookmark: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M214.558118 60.235294v931.177412l282.262588-196.969412L783.058824 990.810353V60.235294H214.558118zM722.823529 876.483765l-226.243764-155.286589-221.726118 154.684236V120.470588H722.823529v756.013177z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Bookmark.defaultProps = {
  size: 18,
};

export default Bookmark;
