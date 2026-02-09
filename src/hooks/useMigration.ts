import { useContext } from 'react';
import { MigrationContext, type MigrationContextType } from '@contexts/MigrationContext';

export const useMigration = (): MigrationContextType => {
  const context = useContext(MigrationContext);
  if (context === undefined) {
    throw new Error('useMigration must be used within a MigrationProvider');
  }
  return context;
};
