

import type { ReactElement } from 'react';
import {
  AboutPageLower,
  AboutPageMiddle,
  AboutPageUpper,
  AboutPageLowerSection,
  Partner,
  Partners,
  PartnerText,
  StyledLine,
  StyledP,
} from '../../styles';

import styles from './About.module.scss'

export const About = (): ReactElement => (
  <div className="PageWrapper">
    <AboutPageUpper>
      <h1 className={styles.H1}>Why Xeirographa</h1>
      <StyledP fontSize={20} width="90%">Xeirographa—from the Greek χειρόγραφα, meaning &quot;manuscripts&quot;—was created to bridge the skill gap between being able to read a print or critical edition and struggling to read original source material, whether for research purposes or personal interest. One of the major barriers to reading from manuscripts is that for most classical works the majority of surviving manuscripts are relatively late and these are often the most difficult manuscripts to read. The script in them is replete with cursive letters and ligatures that can bewilder newcomers. Accordingly, Xeirographa eases the learner into manuscripts by starting with relatively easy-to-read majuscule scripts. Then new and more complex concepts are slowly introduced over a series of lessons that accumulate into an ability to work with more difficult minuscule texts.</StyledP>
      <br />
      <StyledP fontSize={20} fontStyle="italic" textAlign="center" width="90%">Please use the contact form to send questions or suggestions for improvement. Also consider <a className="Link" href="https://www.venmo.com/jacobwpeterson" target="_blank">buying me a coffee</a> (or two).</StyledP>
    </AboutPageUpper>
    <AboutPageMiddle>
      <h2 className={styles.H2}>Special Thanks</h2>
      <StyledLine>
        This project would not be possible without the cooperative spirit of the following projects and organizations.
      </StyledLine>
      <Partners>
        <Partner>
          <img src="src/assets/mirador.png" alt="mirador logo" />
          <PartnerText color="#3c444d" fontFamily="'Yanone Kaffeesatz', sans-serif" fontSize={48} letterSpacing=".05em">
            mirador
          </PartnerText>
        </Partner>
        <Partner>
          <img src="src/assets/library.svg" height="60" alt="library logo" />
          <PartnerText color="#3e5276" fontSize={18} fontStyle="italic" padding="20px 0 0 0">
            Holding Institutions
          </PartnerText>
          <PartnerText color="#3e5276" fontSize={12} padding="2px 0">
            Biblioteca Apostolica Vaticana
            <br />
            Cambridge University Library
          </PartnerText>
        </Partner>
        <Partner>
          <img src="src/assets/iiif.png" height="60" alt="iiif logo" />
          <PartnerText color="#006eb0" fontFamily="Playfair Display" fontSize={18}>
            International Image Interoperability Framework
          </PartnerText>
        </Partner>
      </Partners>
    </AboutPageMiddle>
    <AboutPageLower>
      <img style={{ borderRadius: '50%' }} height="325" width="325" src="src/assets/me.jpg" alt="creator" />
      <AboutPageLowerSection>
        <h2 className={styles.H2}>About Me</h2>
        <StyledP fontSize={18} width="50vw">I&apos;m a sponsored<sup>*</sup> trail ultrarunner living in Scotland. I earned a PhD in textual criticism from the University of Edinburgh and spent several years developing and overseeing projects to digitise ancient manuscripts in the US, Europe, and Asia with the Center for the Study of New Testament Manuscripts (CSNTM). I primarily publish on topics within papyrology, paratexts, and New Testament textual criticism.</StyledP>
        <small className={styles.Small}><sup>*</sup>by my career in software engineering</small>
      </AboutPageLowerSection>
    </AboutPageLower>
  </div>
);
