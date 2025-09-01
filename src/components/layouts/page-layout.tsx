import React from "react";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-2 pb-4 md:pb-6 px-4 md:px-8">
      {children}
    </div>
  );
};

export default PageLayout;
