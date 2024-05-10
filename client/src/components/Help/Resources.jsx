import React from 'react';
import resources from '../../libraries/resources.js';
import {
  HelpSection, HelpText, ResourceNameAndCreator, StyledH1, StyledH2, StyledNavLink, StyledSpan, PageWrapper,
} from '../../styles.js';

const Resources = () => (
  <PageWrapper flexDirection="column">
    <HelpSection id="resources">
      <StyledH1 textAlign="center">Online resources</StyledH1>
      <StyledH2 color="#333" textAlign="left">Overviews</StyledH2>
      {resources.introductions.map(({ name, creator, description, journal, journalDetails, url }, index) => (
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
      <StyledH2 color="#333" textAlign="left">Reading aids</StyledH2>
      {resources.helps.map(({ name, creator, description, journal, journalDetails, url }, index) => (
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
      <StyledH2 color="#333" textAlign="left">Images with transcriptions</StyledH2>
      {resources.images.map(({ name, creator, description, journal, journalDetails, url }, index) => (
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
      <StyledH2 color="#333" textAlign="left">Palaeography</StyledH2>
      {resources.palaeography.map(({ name, creator, description, journal, journalDetails, url }, index) => (
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
    </HelpSection>
  </PageWrapper>
)

export default Resources;