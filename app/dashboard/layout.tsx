import React, { PropsWithChildren } from "react";
import Aside from "./Aside";


const layout = ({ children }: PropsWithChildren) => {
  return (

    <Aside>{children}</Aside>

  );
};

export default layout;
