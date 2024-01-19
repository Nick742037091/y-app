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

const Video: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M453.1625 585.9125h-81.61875a76.44375 76.44375 0 0 1-76.359375-76.359375v-112.528125a76.44375 76.44375 0 0 1 76.359375-76.359375h112.528125a76.44375 76.44375 0 0 1 76.359375 76.359375v80.803125a28.125 28.125 0 0 1-56.25 0v-80.803125a20.109375 20.109375 0 0 0-20.109375-20.109375h-112.528125a20.1375 20.1375 0 0 0-20.109375 20.109375v112.528125c0 11.08125 9.028125 20.109375 20.109375 20.109375h81.61875a28.125 28.125 0 0 1 0 56.25z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M567.9125 557.7875a33.3 33.3 0 1 1-66.6 0 33.3 33.3 0 1 1 66.6 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M534.640625 592.83125c-19.321875 0-35.04375-15.721875-35.04375-35.04375s15.721875-35.04375 35.04375-35.04375 35.04375 15.721875 35.04375 35.04375c0 19.321875-15.721875 35.04375-35.04375 35.04375z m0-66.571875c-17.38125 0-31.528125 14.146875-31.528125 31.528125s14.146875 31.528125 31.528125 31.528125 31.528125-14.146875 31.528125-31.528125-14.146875-31.528125-31.528125-31.528125z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <path
        d="M708.2 752.3H154.3625a89.803125 89.803125 0 0 1-89.71875-89.690625V257.1875a89.83125 89.83125 0 0 1 89.71875-89.71875h404.1a28.125 28.125 0 0 1 0 56.25H154.3625c-18.45 0-33.46875 15.01875-33.46875 33.46875v405.421875a33.46875 33.46875 0 0 0 33.46875 33.440625h553.8375c18.45 0 33.46875-15.01875 33.46875-33.440625v-122.878125a28.153125 28.153125 0 0 1 40.865625-25.0875l120.375 61.0875-1.434375-277.48125a28.125 28.125 0 0 1 27.984375-28.265625h0.140625a28.125 28.125 0 0 1 28.125 27.984375l1.6875 323.55a28.06875 28.06875 0 0 1-40.865625 25.228125l-120.628125-61.2v77.0625a89.803125 89.803125 0 0 1-89.71875 89.690625z"
        fill={getIconColor(color, 3, '#333333')}
      />
      <path
        d="M769.765625 409.653125a28.153125 28.153125 0 0 1-28.125-28.125V257.1875c0-18.45-15.01875-33.46875-33.46875-33.46875a28.125 28.125 0 0 1 0-56.25 89.83125 89.83125 0 0 1 89.71875 89.71875v77.934375l118.659375-61.93125a28.096875 28.096875 0 1 1 26.015625 49.865625l-159.778125 83.41875a28.0125 28.0125 0 0 1-13.021875 3.178125zM269.140625 856.53125a28.125 28.125 0 0 1-21.20625-46.603125l85.05-97.734375a28.153125 28.153125 0 0 1 42.440625 36.928125L290.375 846.85625a28.125 28.125 0 0 1-21.234375 9.646875zM611.1125 856.53125a28.125 28.125 0 0 1-21.234375-9.646875l-88.03125-101.1375a28.125 28.125 0 1 1 42.440625-36.928125l88.03125 101.1375a28.125 28.125 0 0 1-21.20625 46.603125z"
        fill={getIconColor(color, 4, '#333333')}
      />
    </svg>
  );
};

Video.defaultProps = {
  size: 18,
};

export default Video;