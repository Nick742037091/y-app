/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import PlayFill from './PlayFill';
import User from './User';
import Team from './Team';
import List from './List';
import Bookmark from './Bookmark';
import Plus from './Plus';
import Check from './Check';
import ArrowUp from './ArrowUp';
import Icon from './Icon';
import ArrowDown from './ArrowDown';
import PostShare from './PostShare';
import PostView from './PostView';
import PostComment from './PostComment';
import PostLike from './PostLike';
import HomeSetting from './HomeSetting';
export { default as PlayFill } from './PlayFill';
export { default as User } from './User';
export { default as Team } from './Team';
export { default as List } from './List';
export { default as Bookmark } from './Bookmark';
export { default as Plus } from './Plus';
export { default as Check } from './Check';
export { default as ArrowUp } from './ArrowUp';
export { default as Icon } from './Icon';
export { default as ArrowDown } from './ArrowDown';
export { default as PostShare } from './PostShare';
export { default as PostView } from './PostView';
export { default as PostComment } from './PostComment';
export { default as PostLike } from './PostLike';
export { default as HomeSetting } from './HomeSetting';

export type IconNames = 'play-fill' | 'user' | 'team' | 'list' | 'bookmark' | 'plus' | 'check' | 'arrow-up' | 'icon' | 'arrow-down' | 'post-share' | 'post-view' | 'post-comment' | 'post-like' | 'home-setting';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'play-fill':
      return <PlayFill {...rest} />;
    case 'user':
      return <User {...rest} />;
    case 'team':
      return <Team {...rest} />;
    case 'list':
      return <List {...rest} />;
    case 'bookmark':
      return <Bookmark {...rest} />;
    case 'plus':
      return <Plus {...rest} />;
    case 'check':
      return <Check {...rest} />;
    case 'arrow-up':
      return <ArrowUp {...rest} />;
    case 'icon':
      return <Icon {...rest} />;
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
