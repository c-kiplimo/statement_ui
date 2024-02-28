type TabContentProps = {
  tabsItems: { content: React.ReactNode }[];
  selectedTab: number;
  textColor: string;
  borderColor?: string;
  border?: string;
  backgroundColor: string;
  fontWeight: number;
  marginTop?: string;
  padding?: string;
};

const TabContent: React.FC<TabContentProps> = ({
  tabsItems,
  textColor,
  borderColor,
  border,
  backgroundColor,
  fontWeight,
  selectedTab,
  padding,
  marginTop,
}) => {
  return (
    <div>
      {tabsItems.map((item, index) => (
        <div
          key={index}
          className={`${selectedTab === index ? "" : "hidden"}`}
          style={{
            marginTop: marginTop,
            padding: padding,
            // border: `1px solid ${borderColor}`,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default TabContent;
