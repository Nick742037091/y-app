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

const Pause: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M350 148h-56c-8.8 0-16 6.5-16 14.6v698.9c0 8 7.2 14.6 16 14.6h56c8.8 0 16-6.5 16-14.6V162.6c0-8.1-7.2-14.6-16-14.6zM730 148h-56c-8.8 0-16 6.5-16 14.6v698.9c0 8 7.2 14.6 16 14.6h56c8.8 0 16-6.5 16-14.6V162.6c0-8.1-7.2-14.6-16-14.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Pause.defaultProps = {
  size: 18,
};

export default Pause;
