import { Fragment, type ReactElement } from "react";
import { NavLink } from "react-bootstrap";

import type { ResourceCategories } from "../../assets/files/onlineResources";

import styles from "./Help.module.scss";

interface ResourcesProps {
  resource: ResourceCategories[];
  title: string;
}

export const Resources = ({
  resource,
  title,
}: ResourcesProps): ReactElement => (
  <div className="PageWrapper">
    <div className={styles.HelpSection} id="resources">
      <h1 className={styles.H1}>{title}</h1>
      {resource.map(({ heading, resources }) => (
        <>
          <h2 className={styles.H2}>{heading}</h2>
          {resources?.map(
            (
              { name, creator, description, journal, journalDetails, url },
              index,
            ) => (
              <Fragment key={index}>
                <div className={styles.NameAndCreator}>
                  <NavLink
                    className={styles.ResourceLink}
                    target="_blank"
                    href={url}
                  >
                    {name}
                  </NavLink>
                  {creator && (
                    <span className={styles.Span}>{`by ${creator}`}</span>
                  )}
                </div>
                {(description || journal) && (
                  <div className={styles.HelpText}>
                    {journal && (
                      <>
                        <i>{`${journal}`}</i>
                        {`${journalDetails}`}
                        <br />
                      </>
                    )}
                    {description && <>{description}</>}
                  </div>
                )}
              </Fragment>
            ),
          )}
        </>
      ))}
    </div>
  </div>
);
