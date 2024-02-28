import React from 'react';
import Link from 'next/link';

const CustomLink = ({ href, text, className }: any) => {
  return (
    <Link href={href}>
      <span className={className}>{text}</span>
    </Link>
  );
};

export default CustomLink;
