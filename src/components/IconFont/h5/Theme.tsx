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

const Theme: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M929.7 232.9L810.3 101.6c-20.4-22.4-47.9-34.8-77.3-34.8s-56.9 12.4-77.3 34.8l-47.8 52.5c-7.7 8.5-14.2 18.2-19.1 28.8H436.4c-5-10.6-11.4-20.4-19.1-28.8l-47.8-52.5c-20.4-22.4-47.9-34.8-77.3-34.8s-56.9 12.4-77.3 34.8L95.4 232.9c-40.6 44.6-40.6 117.2 0 161.8l47.8 52.5c19.1 20.9 44.4 33 71 34.6v362c0 63.8 48.4 115.8 108 115.8H703c59.5 0 108-51.9 108-115.8v-362c26.5-1.6 51.9-13.6 71-34.6l47.8-52.5c40.5-44.6 40.5-117.2-0.1-161.8z m-41.3 124.3l-47.8 52.5c-13.2 14.5-31.6 19.9-49.4 14.5-8.5-2.6-17.6-1-24.8 4.3-7.1 5.2-11.3 13.6-11.3 22.4v392.9c0 33.1-23.4 60.1-52.2 60.1H322.2c-28.8 0-52.2-27-52.2-60.1v-393c0-8.8-4.2-17.1-11.3-22.4-4.9-3.6-10.7-5.5-16.6-5.5-2.7 0-5.5 0.4-8.2 1.2-17.8 5.4-36.2 0-49.4-14.5l-47.8-52.5c-21.5-23.6-21.5-63.4 0-86.9L256.2 139c9.7-10.7 22.5-16.5 36-16.5s26.2 5.9 35.9 16.5l47.8 52.5c6.5 7.1 11.3 16.2 13.9 26.2 3.2 12.3 14.3 20.9 27 20.9h191.4c12.7 0 23.9-8.6 27-20.9 2.6-10 7.4-19.1 13.9-26.2l47.8-52.5c9.7-10.7 22.5-16.5 36-16.5s26.2 5.9 35.9 16.5l119.5 131.2c21.5 23.6 21.5 63.5 0.1 87z"
        fill={getIconColor(color, 0, '#4D4D4D')}
      />
    </svg>
  );
};

Theme.defaultProps = {
  size: 18,
};

export default Theme;
