import React from 'react';
import {
  HomeTextContainer,
  HomeFeatureWrapper,
  SectionHalf,
  HomeMiddleWrapper,
  HomeUpperWrapper,
  PageWrapper,
  StyledButton,
  StyledH2,
  StyledImage,
  StyledLine,
  StyledP,
  UnorderedList,
  ListItem,
} from '../styles.js';

const Home = () => {
  const handleGetStarted = () => {
    window.location.href = 'lessons';
  };

  return (
    <PageWrapper flexDirection="column">
      <HomeUpperWrapper>
        <StyledImage borderColor="#c9ac5f" maxWidth={500} src="./images/Aristophanes-Critical-Edition.png" alt="Greek printed edition text" />
        <HomeTextContainer>
          <StyledLine alignSelf="flex-start" color="#3e5276" fontSize="40px">
            Guided lessons
          </StyledLine>
          <StyledLine alignSelf="flex-start" paddingLeft={25}>
            for learning to read from
          </StyledLine>
          <StyledLine alignSelf="flex-end" color="#c9ac5f" fontSize="40px">
            Greek manuscripts
          </StyledLine>
        </HomeTextContainer>
        <StyledImage borderColor="#3e5276" maxWidth={450} src="./images/Aristophanes-Barocci-127.jpg" alt="Greek manuscript text" />
      </HomeUpperWrapper>
      <HomeMiddleWrapper>
        Go from printed texts to manuscripts of any period in a few lessons
        <StyledButton onClick={handleGetStarted} height={50} fontSize={24} padding="5px 12px" type="button">Get Started</StyledButton>
      </HomeMiddleWrapper>
      <HomeFeatureWrapper>
        <StyledP fontStyle="italic" textAlign="center" width="22%" margin="auto 0">
          Xeirographa currently offers several different features for learners to ease the transition from reading printed Greek texts to manuscripts of any period. Although in development, there are numerous planned features for instructors, such as creating custom lessons and tracking student progress.
        </StyledP>
        <SectionHalf background="#3e5276" color="#fff">
          <StyledH2 color="#c9ac5f" textAlign="center">Features</StyledH2>
          <UnorderedList>
            <ListItem color="#fff"><span>increasingly difficult-to-read manuscripts</span></ListItem>
            <ListItem color="#fff"><span>answers checked line-by-line</span></ListItem>
            <ListItem color="#fff"><span>helpful information when you meet new concepts</span></ListItem>
            <ListItem color="#fff"><span>tips and clues to help you resolve incorrect answers</span></ListItem>
            <ListItem color="#fff"><span>a glossary of relevant terms</span></ListItem>
            <ListItem color="#fff"><span>a modern viewer featuring hi-res color images</span></ListItem>
            <ListItem color="#fff">
              <span>codicological and bibliographic info about each manuscript</span>
            </ListItem>
            <ListItem color="#fff"><span>suggestions for further study</span></ListItem>
            <ListItem color="#fff"><span>links to other relevant online resources</span></ListItem>
          </UnorderedList>
        </SectionHalf>
      </HomeFeatureWrapper>
    </PageWrapper>
  );
};

export default Home;
