import React, { PropsWithChildren } from "react";
import Aside from "./Aside";
import QueryProvider from "./QueryProvider";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <QueryProvider>
      <Aside>{children}</Aside>
    </QueryProvider>
  );
};

export default layout;
