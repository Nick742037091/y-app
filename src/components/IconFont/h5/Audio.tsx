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

const Audio: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M512 658.286a201.143 201.143 0 0 0 201.143-201.143V256a201.143 201.143 0 0 0-402.286 0v201.143A201.143 201.143 0 0 0 512 658.286zM365.714 256a146.286 146.286 0 0 1 292.572 0v201.143a146.286 146.286 0 0 1-292.572 0z"
        fill={getIconColor(color, 0, '#52658F')}
      />
      <path
        d="M841.143 475.429a27.429 27.429 0 0 0-54.857 0 256 256 0 0 1-256 256h-36.572a256 256 0 0 1-256-256 27.429 27.429 0 0 0-54.857 0 310.857 310.857 0 0 0 301.714 310.857V932.57H365.714a27.429 27.429 0 0 0 0 54.858h292.572a27.429 27.429 0 0 0 0-54.858H539.429V786.286a310.857 310.857 0 0 0 301.714-310.857z"
        fill={getIconColor(color, 1, '#52658F')}
      />
    </svg>
  );
};

Audio.defaultProps = {
  size: 18,
};

export default Audio;
