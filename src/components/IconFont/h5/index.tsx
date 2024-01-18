/* tslint:disable */
/* eslint-disable */

import React, { SVGAttributes, FunctionComponent } from 'react';
import Video from './Video';
import Picture from './Picture';
import Audio from './Audio';
import AddPost from './AddPost';
import GroupAdd from './GroupAdd';
import Search from './Search';
import Theme from './Theme';
import Pause from './Pause';
import Play from './Play';
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
import Heart from './Heart';
import HeartFill from './HeartFill';
import HomeSetting from './HomeSetting';
export { default as Video } from './Video';
export { default as Picture } from './Picture';
export { default as Audio } from './Audio';
export { default as AddPost } from './AddPost';
export { default as GroupAdd } from './GroupAdd';
export { default as Search } from './Search';
export { default as Theme } from './Theme';
export { default as Pause } from './Pause';
export { default as Play } from './Play';
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
export { default as Heart } from './Heart';
export { default as HeartFill } from './HeartFill';
export { default as HomeSetting } from './HomeSetting';

export type IconNames = 'video' | 'picture' | 'audio' | 'add-post' | 'group-add' | 'search' | 'theme' | 'pause' | 'play' | 'user' | 'team' | 'list' | 'bookmark' | 'plus' | 'check' | 'arrow-up' | 'icon' | 'arrow-down' | 'post-share' | 'post-view' | 'post-comment' | 'heart' | 'heart-fill' | 'home-setting';

interface Props extends Omit<SVGAttributes<SVGElement>, 'color'> {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

const IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'video':
      return <Video {...rest} />;
    case 'picture':
      return <Picture {...rest} />;
    case 'audio':
      return <Audio {...rest} />;
    case 'add-post':
      return <AddPost {...rest} />;
    case 'group-add':
      return <GroupAdd {...rest} />;
    case 'search':
      return <Search {...rest} />;
    case 'theme':
      return <Theme {...rest} />;
    case 'pause':
      return <Pause {...rest} />;
    case 'play':
      return <Play {...rest} />;
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
    case 'heart':
      return <Heart {...rest} />;
    case 'heart-fill':
      return <HeartFill {...rest} />;
    case 'home-setting':
      return <HomeSetting {...rest} />;

  }

  return null;
};

export default IconFont;
