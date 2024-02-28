import { FontProperties } from '@/src/types/context.types';

import React from 'react';

type profileLinkProps = {
  title: string;
  onClick: () => void;
  color?: string;
  fontProperties: FontProperties;
  hasBorder?: boolean;
  borderColor?: string;
};

const ProfileLink = (props: profileLinkProps) => {
  const { color = '#28273B', hasBorder = false, borderColor = 'grey' } = props;

  return (
    <p
      className="profile-links"
      style={{
        color: color,
        display: 'flex',
        flexWrap: 'nowrap',
        ...props.fontProperties,
        cursor: 'pointer',
        borderLeft: hasBorder ? `1px solid ${borderColor}` : '',
        padding: hasBorder ? '0px 8px' : '0px',
      }}
      onClick={props.onClick}
    >
      {props.title}
    </p>
  );
};

export default ProfileLink;
