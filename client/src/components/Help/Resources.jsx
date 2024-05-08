import React from 'react';
import resources from '../../libraries/resources.js';
import {
  HelpSection, HelpText, StyledH1, StyledNavLink, PageWrapper,
} from '../../styles.js';

const Resources = () => (
    <PageWrapper flexDirection="column">
    <HelpSection id="resources">
      <StyledH1 textAlign="center">External resources</StyledH1>
      {resources.map(({name, creator, description, url}, index) => (
        <>
          <StyledNavLink target="_blank" href={url} color="#3e5276" fontSize={24}>{name}</StyledNavLink>
          {creator && <span>{`by ${creator}`}</span>}
          {description && <HelpText>{description}</HelpText>}
        </>
      ))}
    </HelpSection>
  </PageWrapper>
)

export default Resources;