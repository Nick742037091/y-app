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

const GroupAdd: FunctionComponent<Props> = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M632.054839 568.316926c45.051698 0 89.130688 7.474486 130.803508 21.911507a34.863871 34.863871 0 0 1 21.809117 44.693332 35.836578 35.836578 0 0 1-45.563648 21.399556 326.215246 326.215246 0 0 0-106.997782-17.918288c-177.493449 0-321.300516 141.144921-321.300516 315.310687 0 10.648583 0.511951 21.194776 1.535853 31.689774a35.222236 35.222236 0 0 1-31.945749 38.345138 35.529407 35.529407 0 0 1-39.061869-31.433798 382.376283 382.376283 0 0 1-1.945415-38.601114c0-212.818076 175.804011-385.396795 392.666501-385.396794z m212.254929 70.086107a36.194943 36.194943 0 0 1 35.836578 35.529406v115.649756l108.226464-0.255976a36.194943 36.194943 0 0 1 35.119846 30.665872l0.409561 5.221901a34.5567 34.5567 0 0 1-35.222236 34.812675l-108.533635 0.255976v121.332413c0.307171 19.556532-15.307338 35.324626-34.812675 35.222236a36.194943 36.194943 0 0 1-35.836578-35.529407l-0.051195-120.871657-128.499728 0.358366a36.194943 36.194943 0 0 1-35.068651-30.614676l-0.409561-5.273097a34.5567 34.5567 0 0 1 35.171041-34.812675l128.806899-0.358366v-116.161706a34.5567 34.5567 0 0 1 34.86387-35.171041zM392.717695 420.823811a35.324626 35.324626 0 0 1 35.682993 35.017456 35.324626 35.324626 0 0 1-35.682993 35.068651c-177.493449 0-321.300516 141.144921-321.300515 315.310688 0 10.597388 0.511951 21.194776 1.535853 31.638578a35.222236 35.222236 0 0 1-31.945749 38.396334 35.529407 35.529407 0 0 1-39.06187-31.433798A382.376283 382.376283 0 0 1 0 806.220606C0 593.351335 175.804011 420.823811 392.6665 420.823811z m252.801458-268.979112c111.758927 0 202.323078 88.925908 202.323078 198.53464 0 109.659927-90.615346 198.53464-202.323078 198.53464S443.24727 460.039266 443.24727 350.379339c0-109.608732 90.564151-198.53464 202.271883-198.53464z m0 70.086107c-72.287497 0-130.905898 57.49211-130.905899 128.499728 0 70.905229 58.618402 128.397338 130.905899 128.397338s130.905898-57.49211 130.905898-128.448533-58.618402-128.448533-130.905898-128.448533zM410.840765 0c63.737913 0 122.612291 29.181213 160.650258 77.816569 11.979656 15.358533 9.01034 37.372431-6.655365 49.147306a36.143748 36.143748 0 0 1-50.017623-6.501779 131.469045 131.469045 0 0 0-103.97727-50.375989c-72.287497 0-130.905898 57.49211-130.905899 128.448533 0 62.048474 45.154088 114.933024 106.537026 126.247143 19.351752 3.583658 32.15053 21.860312 28.515677 40.904894a35.682992 35.682992 0 0 1-41.724016 27.95253c-94.966931-17.508728-164.745867-99.216125-164.745866-195.104567C208.517687 88.874712 299.133033 0 410.840765 0z"
        fill={getIconColor(color, 0, '#2c2c2c')}
      />
    </svg>
  );
};

GroupAdd.defaultProps = {
  size: 18,
};

export default GroupAdd;
