/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import Check from './Check';
import ArrowUp from './ArrowUp';
import Nullicesilhouetteicons64Px0001S0023Youku from './Nullicesilhouetteicons64Px0001S0023Youku';
import ArrowDown from './ArrowDown';
import PostShare from './PostShare';
import PostView from './PostView';
import PostComment from './PostComment';
import PostLike from './PostLike';
import HomeSetting from './HomeSetting';
export { default as Check } from './Check';
export { default as ArrowUp } from './ArrowUp';
export { default as Nullicesilhouetteicons64Px0001S0023Youku } from './Nullicesilhouetteicons64Px0001S0023Youku';
export { default as ArrowDown } from './ArrowDown';
export { default as PostShare } from './PostShare';
export { default as PostView } from './PostView';
export { default as PostComment } from './PostComment';
export { default as PostLike } from './PostLike';
export { default as HomeSetting } from './HomeSetting';

export type IconNames = 'check' | 'arrow-up' | 'nullicesilhouetteicons64px0001s0023youku' | 'arrow-down' | 'post-share' | 'post-view' | 'post-comment' | 'post-like' | 'home-setting';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'check':
      return <Check {...rest} />;
    case 'arrow-up':
      return <ArrowUp {...rest} />;
    case 'nullicesilhouetteicons64px0001s0023youku':
      return <Nullicesilhouetteicons64Px0001S0023Youku {...rest} />;
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
