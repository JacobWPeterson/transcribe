import type { PropsWithChildren, ReactElement } from "react";
import classNames from "classnames";

import styles from "./Badge.module.scss";

export enum BadgeTypes {
  SUCCESS = "Success",
  ERROR = "Error",
  HELP = "Help",
  NC = "NC",
}

interface BadgeProps {
  type?: BadgeTypes;
  small?: boolean;
}

export const Badge = ({
  type = BadgeTypes.HELP,
  small,
  children,
}: PropsWithChildren<BadgeProps>): ReactElement => {
  return (
    <div
      tabIndex={0}
      role="button"
      className={classNames(styles.Container, {
        [styles.Success]: type === BadgeTypes.SUCCESS,
        [styles.Error]: type === BadgeTypes.ERROR,
        [styles.NC]: type === BadgeTypes.NC,
        [styles.Small]: small,
      })}
    >
      {children}
    </div>
  );
};
