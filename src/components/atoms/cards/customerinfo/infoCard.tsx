'use client';

import React, { CSSProperties } from 'react';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import { AppColorToken, FontType } from '@/src/types/context.types';

export type DataRow = { title: string; description: string };
export type CardData = DataRow[][];

type InfoCardProps = {
  width?: string;
  title: string;
  borderColor?: string;
  cardData: CardData;
};

const InfoCard = (props: InfoCardProps) => {
  const token = useTokens();
  const font = useFont();

  const { width = '350px', borderColor = token.border.secondary } = props;

  const infoCardCss: CSSProperties = {
    width: width,
    border: `0.5px solid ${borderColor}`,
    padding: '24px 32px',
    display: 'flex',
    borderRadius: '8px',
    flexDirection: 'column',
    gap: '32px',
  };

  return (
    <div style={infoCardCss}>
      <InfoCardHeader font={font} color={token} title={props.title} />
      <InfoCardContent cardData={props.cardData} />
    </div>
  );
};

type InfoCardHeaderProp = {
  font: FontType;
  color: AppColorToken;
  title: string;
};

const InfoCardHeader = (props: InfoCardHeaderProp) => {
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
        <InfoCardHeaderIcon
          width="62px"
          borderRadius="20px"
          iconColor={props.color.border.secondary}
        />
      </div>
    </div>
  );
};

type InfoCardHeaderIconProp = {
  iconColor?: string;
  borderColor?: string;
  width?: string;
  borderRadius?: string;
};

const InfoCardHeaderIcon = (props: InfoCardHeaderIconProp) => {
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

const InfoCardContent = (props: { cardData: CardData }) => {
  const font = useFont();
  const token = useTokens();

  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
      }}
    >
      {props.cardData?.map((row, index) => {
        return (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-start',
              flex: '1 0 0',
            }}
          >
            {row?.map((record, index) => (
              <InfoCardContentItem
                key={index}
                title={record.title}
                description={record.description}
                font={font}
                color={token}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

type InfoCardContentItemProp = {
  title: string;
  description: String;
  font: FontType;
  color: AppColorToken;
};

const InfoCardContentItem = (props: InfoCardContentItemProp) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          ...props.font.typography.caption.regular,
          color: props.color.text.description_02,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          ...props.font.typography.body.regular,
          color: props.color.text.secondary,
        }}
      >
        {props.description}
      </div>
    </div>
  );
};

export default InfoCard;
