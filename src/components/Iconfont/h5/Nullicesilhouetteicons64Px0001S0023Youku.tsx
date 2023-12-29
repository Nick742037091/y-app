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

const Nullicesilhouetteicons64Px0001S0023Youku: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M726.89257813 121.765625C657.01953125 96.71679687 637.90332031 143.51855469 623.40136719 178.45507812c0 0-121.94824219 295.3125-123.26660157 299.92675782-1.97753906 4.61425781-8.56933594 4.61425781-10.54687499 0-1.97753906-4.61425781-117.33398438-292.67578125-117.33398438-292.67578125-18.45703125-48.77929688-51.41601563-84.375-108.76464844-62.62207031-58.66699219 22.41210938-27.68554688 92.94433594-23.73046875 105.46875l183.91113282 419.23828125-74.48730469 160.18066406c-9.22851563 20.43457031-29.66308594 67.89550781 27.02636718 93.60351562 60.64453125 27.02636719 87.01171875-13.84277344 104.15039063-51.41601562l274.21875-620.94726563C753.91894531 227.89355469 799.40234375 147.47363281 726.89257813 121.765625z"
        fill={getIconColor(color, 0, '#1296db')}
      />
    </svg>
  );
};

Nullicesilhouetteicons64Px0001S0023Youku.defaultProps = {
  size: 18,
};

export default Nullicesilhouetteicons64Px0001S0023Youku;
