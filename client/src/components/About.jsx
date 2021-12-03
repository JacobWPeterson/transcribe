import React from 'react';

import { PageWrapper, StyledHeading } from '../styles.js';

const About = () => (
  <PageWrapper flexDirection="column">
    <StyledHeading>About Heirographa</StyledHeading>
    <div>Some sentences about why Heirographa exists</div>
    <div>Future Plans</div>
    <StyledHeading>About Me</StyledHeading>
    {/* eslint-disable-next-line max-len */}
    <div>I am a software engineer in San Francisco, California. Prior to software engineering, I earned a PhD in textual criticism from the University of Edinburgh and spent several years developing and overseeing projects to digitize ancient manuscripts in the US, Europe, and Asia with the Center for the Study of New Testament Manuscripts (CSNTM).</div>
  </PageWrapper>
);

export default About;
