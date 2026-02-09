import { createContext } from 'react';

export interface MigrationContextType {
  isMigrating: boolean;
  setIsMigrating: (value: boolean) => void;
}

export const MigrationContext = createContext<MigrationContextType | undefined>(undefined);
