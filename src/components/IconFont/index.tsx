/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';

export type IconNames = 'logout' | 'location-fill' | 'ellipsis-y' | 'close' | 'location' | 'schedule' | 'calendar' | 'order-list' | 'gif' | 'arrow-right' | 'arrow-left' | 'video' | 'picture' | 'audio' | 'add-post' | 'group-add' | 'search' | 'theme' | 'pause' | 'play' | 'user' | 'team' | 'list' | 'bookmark' | 'plus' | 'check' | 'arrow-up' | 'icon' | 'arrow-down' | 'post-share' | 'post-view' | 'post-comment' | 'heart' | 'heart-fill' | 'home-setting';

export interface IconProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
  style?: React.CSSProperties;
}

const IconFont: FunctionComponent<IconProps> = () => {
  return null;
};

export default IconFont;
