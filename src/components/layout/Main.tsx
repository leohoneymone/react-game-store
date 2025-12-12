import React, { useEffect } from "react";

import { useStoreContext } from "../../utils/context";

const Main = ({children}) => {

   return <main>
        {children}
    </main>
}

export default Main;
