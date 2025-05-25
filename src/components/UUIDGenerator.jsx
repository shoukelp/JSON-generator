import React from "react";

const UUIDGenerator = ({ uuid, onGenerate }) => {
  return (
    <>
      <button className="uuid-button" onClick={onGenerate}>
        Generate New UUID
      </button>
    </>
  );
};

export default UUIDGenerator;