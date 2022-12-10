import { useState } from "react";
import ReactModal from "react-modal";
import Button from "./Button";

interface Props {
  onClose: () => void;
}

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "36px",
    padding: "24px",
    border: "none",
    borderRadius: "16px",
    maxWidth: '800px',
    width: '90%',
    zIndex: 500,
  },
  overlay: {
    background: "rgba(33, 33, 33, 0.5)",
    zIndex: 500,
  },
};
const UserManual = ({ onClose }: Props) => {
  const [page, setPage] = useState(1);
  const renderContent = () => {
    switch (page) {
      case 1:
        return renderPage1();
      case 2:
        return renderPage2();
      default:
        return <></>;
    }
  };
  const renderPage1 = () => {
    return (
      <>
        <img src="images/manual-01.png" width="100%" />
        <div>{page} of 2</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            text="Skip"
            onClick={() => {
              onClose();
            }}
            outlined={true}
          />
          <Button
            text="Next"
            onClick={() => {
              setPage(2);
            }}
            outlined={false}
          />
        </div>
      </>
    );
  };

  const renderPage2 = () => {
    return (
      <>
        <img src="images/manual-02.png" width="100%" />
        <div>{page} of 2</div>
        <div style={{ display: "flex", gap: "16px" }}>
          <Button
            text="Previous"
            onClick={() => {
              setPage(1);
            }}
            outlined={true}
          />
          <Button
            text="Got it"
            onClick={() => {
              onClose();
            }}
            outlined={false}
          />
        </div>
      </>
    );
  };
  return (
    <ReactModal isOpen={true} onRequestClose={onClose} style={modalStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
        }}
      >
        {renderContent()}
      </div>
    </ReactModal>
  );
};

export default UserManual;
