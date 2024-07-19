import { Fragment, type ReactElement } from "react";

import styles from "../Help.module.scss";
import type { ResourceCategories } from "../../../files/onlineResources";

interface ResourcesProps {
  resources: ResourceCategories[];
  title: string;
}

export const Resources = ({
  resources,
  title,
}: ResourcesProps): ReactElement => (
  <div className="PageWrapper">
    <div className={styles.HelpSection} id="resources">
      <h1 className={styles.H1}>{title}</h1>
      {resources.map(({ heading, resources }) => (
        <>
          <h2 className={styles.H2}>{heading}</h2>
          {resources?.map(
            (
              { name, creator, description, journal, journalDetails, url },
              index,
            ) => (
              <Fragment key={index}>
                <div className={styles.NameAndCreator}>
                  <a
                    className={styles.ResourceLink}
                    target="_blank"
                    href={url}
                    rel="noreferrer"
                  >
                    {name}
                  </a>
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
