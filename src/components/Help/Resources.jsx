
import {
  HelpSection, HelpText, ResourceNameAndCreator, StyledH1, StyledH2, StyledNavLink, StyledSpan, PageWrapper,
} from '../../styles.js';

const Resources = ({ resource, title }) => (
  <PageWrapper flexDirection="column">
    <HelpSection id="resources">
      <StyledH1 textAlign="center">{title}</StyledH1>
      {
        resource.map(({ heading, resources }) => (
          <>
            <StyledH2 color="#333" textAlign="left">{heading}</StyledH2>
            {resources?.map(({ name, creator, description, journal, journalDetails, url }, index) => (
              <>
                <ResourceNameAndCreator>
                  <StyledNavLink target="_blank" href={url} color="#3e5276" fontSize={24}>{name}</StyledNavLink>
                  {creator && <StyledSpan fontSize={14}>{`by ${creator}`}</StyledSpan>}
                </ResourceNameAndCreator>
                {(description || journal) && (
                  <HelpText>
                    {journal && (<><i>{`${journal}`}</i>{`${journalDetails}`}<br /></>)}
                    {description && <>{description}</>}
                  </HelpText>
                )}
              </>
            ))}
          </>
        ))
      }
    </HelpSection>
  </PageWrapper>
);

export default Resources;