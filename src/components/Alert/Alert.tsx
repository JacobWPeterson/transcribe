import type { PropsWithChildren, ReactElement } from 'react';

import styles from './Alert.module.scss';

export const Alert = ({ children }: PropsWithChildren): ReactElement => (
  <div className={styles.Container} role="alert">
    {children}
  </div>
);
