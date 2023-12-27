/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import ArrowDown from './ArrowDown';
import PostShare from './PostShare';
import PostView from './PostView';
import PostComment from './PostComment';
import PostLike from './PostLike';
import HomeSetting from './HomeSetting';
export { default as ArrowDown } from './ArrowDown';
export { default as PostShare } from './PostShare';
export { default as PostView } from './PostView';
export { default as PostComment } from './PostComment';
export { default as PostLike } from './PostLike';
export { default as HomeSetting } from './HomeSetting';

export type IconNames = 'arrow-down' | 'post-share' | 'post-view' | 'post-comment' | 'post-like' | 'home-setting';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'arrow-down':
      return <ArrowDown {...rest} />;
    case 'post-share':
      return <PostShare {...rest} />;
    case 'post-view':
      return <PostView {...rest} />;
    case 'post-comment':
      return <PostComment {...rest} />;
    case 'post-like':
      return <PostLike {...rest} />;
    case 'home-setting':
      return <HomeSetting {...rest} />;

  }

  return null;
};

export default IconFont;
