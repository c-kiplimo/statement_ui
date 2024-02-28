import React from 'react';
import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AppColorToken, FontType } from '@/src/types/context.types';

type DocumentCardItemProp = {
  image?: React.ReactNode;
  title: string;
  background?: string;
};

const DocumentCardItem: React.FC<DocumentCardItemProp> = ({
  image,
  title,
  ...props
}) => {
  const colorToken = useTokens();
  const font = useFont();
  const { background = colorToken.background.primary } = props;

  function documentClicked(event: any) {
    console.log('clicked');
  }

  return (
    <div
      className="card_document"
      style={{
        display: 'flex',
        padding: '16px',
        gap: '16px',
        alignSelf: 'stretch',
        width: '100%',
        backgroundColor: background,
        cursor: 'pointer',
      }}
      onClick={documentClicked}
    >
      <div>{image}</div>
      <div>{title}</div>
    </div>
  );
};

type DocsCardHeaderIconProp = {
  iconColor?: string;
  borderColor?: string;
  width?: string;
  borderRadius?: string;
};

const DocsCardHeaderIcon = (props: DocsCardHeaderIconProp) => {
  const handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log('clicked');
  };

  const {
    width = '42px',
    borderRadius = '5px',
    iconColor = '#E9E9EA',
    borderColor = '#E9E9EA',
  } = props;

  return (
    <div>
      <Button
        style={{
          color: iconColor,
          border: `0.5px solid ${borderColor}`,
          width: width,
          borderRadius: borderRadius,
        }}
        icon={<EditOutlined />}
        onClick={(e) => handleSubmit(e)}
      />
    </div>
  );
};
type docsCardHeaderProp = {
  font: FontType;
  color: AppColorToken;
  title: string;
  displaycardIcon?: boolean;
};

const DocsCardHeader = (props: docsCardHeaderProp) => {
  const { displaycardIcon = false } = props;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          ...props.font.typography.h6?.regular,
          color: props.color.text.secondary,
        }}
      >
        {props.title}
      </div>

      <div>
        {displaycardIcon && (
          <DocsCardHeaderIcon
            width="62px"
            borderRadius="20px"
            iconColor={props.color.border.secondary}
          />
        )}
      </div>
    </div>
  );
};

export { DocumentCardItem, DocsCardHeader };
