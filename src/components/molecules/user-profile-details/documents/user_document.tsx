import { useTokens, useFont } from "@/src/app/(context)/ColorContext";
import {
  DocumentCardItem,
  DocsCardHeader,
} from "@/src/components/atoms/cards/document/document";
import {
  nationalId,
  DriversLicenseId,
  passportId,
} from "@/src/components/atoms/svg/document_svg";

const UserDocuments = () => {
  const token = useTokens();
  const font = useFont();
  return (
    <div
      style={{
        display: "flex",
        padding: "24px 32px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "32px",
        flex: "1 0 0",
        borderRadius: "8px",
        border: `1px solid ${token.background.secondary}`,
        background: token.default.white,
      }}
    >
      <div style={{ width: "100%" }}>
        <DocsCardHeader
          displaycardIcon={false}
          font={font}
          color={token}
          title="Documents"
        />
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <DocumentCardItem image={nationalId} title={"Government Id "} />
        <DocumentCardItem image={DriversLicenseId} title={"Driver’s License"} />
        <DocumentCardItem image={passportId} title={"Passport "} />,
      </div>
    </div>
  );
};
export default UserDocuments;
