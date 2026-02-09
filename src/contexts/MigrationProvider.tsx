import type { PropsWithChildren, ReactElement } from 'react';
import { useState } from 'react';

import { MigrationContext } from './MigrationContext';

export const MigrationProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [isMigrating, setIsMigrating] = useState(false);

  return (
    <MigrationContext.Provider value={{ isMigrating, setIsMigrating }}>
      {children}
    </MigrationContext.Provider>
  );
};
