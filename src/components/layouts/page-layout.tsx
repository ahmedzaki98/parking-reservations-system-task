import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:px-8 flex w-full flex-col items-start justify-center md:mt-0">
      {children}
    </div>
  );
};

export default PageLayout;
