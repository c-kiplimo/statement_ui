type RoundImageIconProps = {
  imageUrl?: string;
  backgroundColor: string;
  textColor: string;
  icon?: React.ReactNode;
  iconSize: number;
  containerSize: number;
  altText?: string;
};

const RoundImageIcon: React.FC<RoundImageIconProps> = ({
  imageUrl,
  backgroundColor,
  textColor,
  iconSize,
  icon,
  containerSize,
  altText,
}) => {
  const containerStyle: React.CSSProperties = {
    width: containerSize,
    height: containerSize,
    borderRadius: "50%",
    padding: "16px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor,
  };

  const imageStyle: React.CSSProperties = {
    width: iconSize,
    height: iconSize,
    objectFit: "cover",
  };

  const textStyle: React.CSSProperties = {
    color: textColor,
    fontSize: "14px",
    marginTop: "8px",
  };

  return (
    <div style={containerStyle}>
      {imageUrl && (
        <img src={imageUrl} alt={altText || "Icon"} style={imageStyle} />
      )}
      {icon && (
        <span role="img" aria-label="Icon" style={imageStyle}>
          {icon}
        </span>
      )}
      {altText && <div style={textStyle}>{altText}</div>}
    </div>
  );
};

export default RoundImageIcon;
