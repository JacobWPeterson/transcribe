
import {
  HomeTextContainer,
  HomeFeatureWrapper,
  SectionHalf,
  HomeLowerWrapper,
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
        <StyledImage borderColor="#c9ac5f" maxWidth={500} src="src/assets/Aristophanes-Critical-Edition.png" alt="Greek printed edition text" />
        <HomeTextContainer>
          <StyledLine alignSelf="flex-start" color="#3e5276" fontSize="40px">
            Guided lessons
          </StyledLine>
          <StyledLine alignSelf="flex-start" paddingLeft={36}>
            for learning to read
          </StyledLine>
          <StyledLine alignSelf="flex-end" color="#c9ac5f" fontSize="40px">
            Greek manuscripts
          </StyledLine>
        </HomeTextContainer>
        <StyledImage borderColor="#3e5276" maxWidth={450} src="src/assets/Aristophanes-Barocci-127.jpg" alt="Greek manuscript text" />
      </HomeUpperWrapper>
      <HomeFeatureWrapper>
        <StyledP fontStyle="italic" textAlign="center" width="70%">
          Xeirographa currently offers several different features for learners to ease the transition from reading printed Greek texts to manuscripts of any period.
        </StyledP>
        <SectionHalf background="#3e5276" color="#fff">
          <StyledH2 color="#c9ac5f" textAlign="center">Features</StyledH2>
          <UnorderedList>
            <ListItem color="#fff"><span>manuscripts get progressively more difficult to read</span></ListItem>
            <ListItem color="#fff"><span>answers checked line-by-line</span></ListItem>
            <ListItem color="#fff"><span>helpful information when new concepts are encountered</span></ListItem>
            <ListItem color="#fff"><span>tips and clues to help resolve incorrect answers</span></ListItem>
            <ListItem color="#fff"><span>a glossary of relevant terms</span></ListItem>
            <ListItem color="#fff"><span>a modern viewer featuring hi-res color images</span></ListItem>
            <ListItem color="#fff">
              <span>codicological and bibliographic info about each manuscript</span>
            </ListItem>
            <ListItem color="#fff"><span>suggestions for further study</span></ListItem>
            <ListItem color="#fff"><span>links to other relevant online and print resources</span></ListItem>
          </UnorderedList>
        </SectionHalf>
      </HomeFeatureWrapper>
      <HomeLowerWrapper>
        Go from reading printed texts to manuscripts of any period in a few lessons
        <StyledButton onClick={handleGetStarted} height={50} fontSize={24} padding="5px 12px" type="button">Get started</StyledButton>
      </HomeLowerWrapper>
    </PageWrapper>
  );
};

export default Home;
