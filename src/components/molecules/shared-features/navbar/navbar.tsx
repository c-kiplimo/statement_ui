import { MenuContext } from '@/src/app/(context)/MenuContext';
import Image from 'next/image';
import React, { CSSProperties, useContext } from 'react';
import { useTokens, useFont } from '@/src/app/(context)/ColorContext';
import { useRouter } from 'next/navigation';
import {
  notification,
  emailIcon,
  searchIcon,
} from '@/src/components/atoms/svg/navbar_svg';

const IconButton = ({ content }: any) => (
  <button className="text-xl">
    <svg
      width="20"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {content}
    </svg>
  </button>
);

type NavbarProps = {
  fullName?: string;
  textColor: string;
  imageSrc: string;
  height: string;
  bgColor: string;
  onUserProfileClick: () => void;
};

const Navbar = (props: NavbarProps) => {
  const token = useTokens();
  const font = useFont();
  const router = useRouter();
  const { Toggle, expanded }: any = useContext(MenuContext);

  const handleUserProfileClick = () => {
    if (props.onUserProfileClick) {
      props.onUserProfileClick();
    }
  };

  const navbarCss: CSSProperties = {
    background: props.bgColor || props.bgColor,
    padding: '8px 16px',
    color: props.textColor,
    height: props.height || 'auto',
    borderBottom: `1px solid ${token.border.primary}`,
  };

  return (
    <nav
      style={navbarCss}
      className="flex items-center justify-between text-primary p-2"
    >
      <div>
        <button
          onClick={Toggle}
          className="text-2xl mr-4 bg-neutral p-1 rounded-md"
        >
          &#9776;
        </button>
      </div>

      <div
        style={{
          display: 'flex',
          width: '272px',
          padding: '3px',
          alignItems: 'center',
          gap: '24px',
          flexShrink: 0,
        }}
      >
        <IconButton content={notification} />
        <IconButton content={emailIcon} />
        <IconButton content={searchIcon} />

        <div
          onClick={handleUserProfileClick}
          className="flex items-center space-x-2 cursor-pointer hover:bg-neutral p-2 rounded"
        >
          <Image
            src={props.imageSrc || '/email.svg'}
            alt="Avatar"
            width={75}
            height={80}
            className="h-8 w-8 border border-primary object-cover rounded-full"
          />

          <span
            style={{
              color: token.text.primary,
              ...font.typography.body.regular,
            }}
          >
            {props.fullName}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
