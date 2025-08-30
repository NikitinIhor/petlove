declare module "redux-persist/integration/react" {
  import type { ComponentType, ReactNode } from "react";
  import type { Persistor } from "redux-persist";

  interface PersistGateProps {
    persistor: Persistor;
    loading?: ReactNode;
    children?: ReactNode;
  }

  export class PersistGate extends ComponentType<PersistGateProps> {}
}
