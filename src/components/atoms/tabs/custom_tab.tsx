'use client';
import { useState, useEffect, useRef, MutableRefObject, Fragment } from 'react';
import { useTokens } from '@/src/app/(context)/ColorContext';

const TabsComponent = ({ items }: any) => {
  const token = useTokens();
  const [selectedTab, setSelectedTab] = useState(0);

  const firstBtnRef: MutableRefObject<HTMLButtonElement | null> = useRef(null);

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '32px',
        }}
        className="provider-tab"
      >
        {items?.map((item: any, index: any) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={item.key}
            onClick={() => setSelectedTab(index)}
            style={{
              display: 'flex',
              padding: '8px 16px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              borderRadius: '4px',
              opacity: '0.8',
              background: token.background.secondary,
            }}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div
        className="search-criteria"
        style={{
          display: 'flex',
          padding: '32px 0',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'stretch',
          borderRadius: '4px',
          background: token.default.white,
        }}
      >
        {items.map((item: any, index: any) => (
          <div className={`${selectedTab === index ? '' : 'hidden'}`}>
            {item.content}
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default TabsComponent;
