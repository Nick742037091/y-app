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

const EllipsisY: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M513 232m0-56a56 56 0 1 0 1e-8 112 56 56 0 1 0-1e-8-112Z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M513 512m0-56.00000001a56 56 0 1 0 0 112.00000002 56 56 0 1 0 0-112.00000002Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M513 792m1e-8-56a56 56 0 1 0-1e-8 112 56 56 0 1 0 1e-8-112Z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </svg>
  );
};

EllipsisY.defaultProps = {
  size: 18,
};

export default EllipsisY;
