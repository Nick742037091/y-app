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

const Picture: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M384.34133333 819.4048l259.10613334-259.14026667 175.99146666 175.99146667 0.03413334 82.944-435.16586667 0.2048zM204.8 204.8l614.4-0.27306667 0.2048 435.16586667-151.82506667-151.82506667a34.0992 34.0992 0 0 0-48.26453333 0L287.744 819.43893333H204.8V204.8z m614.67306667-68.26666667H204.4928a68.06186667 68.06186667 0 0 0-67.92533333 67.9936v614.94613334C136.53333333 856.9856 166.98026667 887.46666667 204.45866667 887.46666667h614.98026666A68.06186667 68.06186667 0 0 0 887.46666667 819.47306667V204.52693333A68.096 68.096 0 0 0 819.47306667 136.53333333z"
        fill={getIconColor(color, 0, '#3E3A39')}
      />
      <path
        d="M409.6 375.46666667a33.792 33.792 0 0 1 34.13333333 34.13333333 33.792 33.792 0 0 1-34.13333333 34.13333333 33.792 33.792 0 0 1-34.13333333-34.13333333c0-19.1488 14.98453333-34.13333333 34.13333333-34.13333333m0 136.53333333c56.45653333 0 102.4-45.94346667 102.4-102.4s-45.94346667-102.4-102.4-102.4-102.4 45.94346667-102.4 102.4 45.94346667 102.4 102.4 102.4"
        fill={getIconColor(color, 1, '#3E3A39')}
      />
    </svg>
  );
};

Picture.defaultProps = {
  size: 18,
};

export default Picture;
