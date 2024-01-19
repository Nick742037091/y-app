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

const Location: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M813.11328125 316.09179687c-16.5234375-38.14453125-40.16601563-72.33398438-70.22460938-101.68945312-30.05859375-29.35546875-64.95117188-52.29492188-103.88671874-68.37890625C598.74804688 129.32421875 556.03320313 120.88671875 512 120.88671875c-44.03320313 0-86.74804688 8.4375-127.00195313 25.04882813-38.93554688 16.08398438-73.828125 39.11132813-103.88671874 68.37890624-30.05859375 29.35546875-53.70117188 63.6328125-70.22460938 101.68945313-17.13867188 39.55078125-25.83984375 81.5625-25.83984375 124.8046875 0 62.05078125 14.85351563 123.83789063 44.03320313 183.42773438 23.46679688 47.90039063 56.25 94.5703125 97.55859375 138.95507812 70.57617188 75.76171875 144.58007813 122.08007813 165.5859375 134.47265625 6.06445313 3.60351563 12.91992188 5.36132813 19.6875 5.36132813 6.85546875 0 13.62304688-1.7578125 19.6875-5.36132813 21.00585938-12.39257813 95.00976563-58.7109375 165.5859375-134.47265625 41.30859375-44.296875 74.09179688-91.0546875 97.55859375-138.95507813C824.09960938 564.734375 838.953125 503.03515625 838.953125 440.89648437c0-43.2421875-8.70117188-85.25390625-25.83984375-124.80468749zM512 835.61328125c-57.91992188-36.82617188-263.671875-182.63671875-263.671875-394.71679688 0-68.46679688 27.33398438-132.80273438 76.9921875-181.31835937C375.15429687 210.97460937 441.42382812 184.16796875 512 184.16796875s136.84570313 26.80664063 186.6796875 75.49804688C748.33789063 308.09375 775.671875 372.4296875 775.671875 440.89648437c0 212.08007813-205.75195313 357.890625-263.671875 394.71679688z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M512 293.15234375c-85.4296875 0-154.6875 69.2578125-154.6875 154.6875s69.2578125 154.6875 154.6875 154.6875 154.6875-69.2578125 154.6875-154.6875-69.2578125-154.6875-154.6875-154.6875z m69.609375 224.296875C562.9765625 535.99414063 538.27929688 546.27734375 512 546.27734375c-26.27929688 0-50.9765625-10.28320313-69.609375-28.828125C423.84570312 498.81640625 413.5625 474.11914062 413.5625 447.83984375c0-26.27929688 10.28320313-50.9765625 28.828125-69.609375C461.0234375 359.59765625 485.72070312 349.40234375 512 349.40234375c26.27929688 0 50.9765625 10.1953125 69.609375 28.828125C600.2421875 396.86328125 610.4375 421.56054687 610.4375 447.83984375c0 26.27929688-10.1953125 50.9765625-28.828125 69.609375z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </svg>
  );
};

Location.defaultProps = {
  size: 18,
};

export default Location;
