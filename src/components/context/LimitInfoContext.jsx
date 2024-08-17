import React, { Children, createContext, useContext, useState } from "react";

const LimitInfoContext = createContext();
export const useLimitInfo = () => useContext(LimitInfoContext);

export default function LimitInfoProvider({ children }) {
    const [limitInfo, setLimitInfo] = useState({
    usedCompanyCount: 0,
    companyLimit: 0,
    });

  return (
    <LimitInfoContext.Provider value={{ limitInfo, setLimitInfo }}>
      {children}
    </LimitInfoContext.Provider>
  );
}
