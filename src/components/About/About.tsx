

import type { ReactElement } from 'react';
import classNames from 'classnames';

import styles from './About.module.scss'

export const About = (): ReactElement => (
  <div className="PageWrapper">
    <div className={classNames(styles.Container, styles.Upper)}>
      <h1 className={styles.H1}>Why Xeirographa</h1>
      <div className={styles.Text}>Xeirographa—from the Greek χειρόγραφα, meaning &quot;manuscripts&quot;—was created to bridge the skill gap between being able to read a print or critical edition and struggling to read original source material, whether for research purposes or personal interest. One of the major barriers to reading from manuscripts is that for most classical works the majority of surviving manuscripts are relatively late and these are often the most difficult manuscripts to read. The script in them is replete with cursive letters and ligatures that can bewilder newcomers. Accordingly, Xeirographa eases the learner into manuscripts by starting with relatively easy-to-read majuscule scripts. Then new and more complex concepts are slowly introduced over a series of lessons that accumulate into an ability to work with more difficult minuscule texts.</div>
      <br />
      <div className={classNames(styles.Text, styles.Italic)} >Please use the contact form to send questions or suggestions for improvement. Also consider <a className="Link" href="https://www.venmo.com/jacobwpeterson" target="_blank" rel="noreferrer">buying me a coffee</a> (or two).</div>
    </div>
    <div className={styles.Container}>
      <h2 className={styles.H2}>Special Thanks</h2>
      <div className={classNames(styles.Text, styles.Smaller)}>
        This project would not be possible without the cooperative spirit of the following projects and organizations.
      </div>
      <div className={styles.Partners}>
        <div className={styles.Partner}>
          <img src="src/assets/mirador.png" alt="mirador logo" />
          <div className={classNames(styles.PartnerText, styles.MiradorFont)}>
            mirador
          </div>
        </div>
        <div className={styles.Partner}>
          <img src="src/assets/library.svg" height="60" alt="library logo" />
          <div className={classNames(styles.PartnerText, styles.HoldingInstitutions)}>
            Holding Institutions
          </div>
          <div className={classNames(styles.PartnerText, styles.HoldingInstitute)}>
            Biblioteca Apostolica Vaticana
            <br />
            Cambridge University Library
          </div>
        </div>
        <div className={styles.Partner}>
          <img src="src/assets/iiif.png" height="60" alt="iiif logo" />
          <div className={classNames(styles.PartnerText, styles.IIIFFont)}  >
            International Image Interoperability Framework
          </div>
        </div>
      </div>
    </div>
    <div className={classNames(styles.Container, styles.Lower)}>
      <img style={{ borderRadius: '50%' }} height="280" width="280" src="src/assets/me.jpg" alt="creator" />
      <div className={styles.Section}>
        <h2 className={styles.H2}>About Me</h2>
        <div className={styles.Text}>I&apos;m a sponsored<sup>*</sup> trail ultrarunner living in Scotland. I earned a PhD in textual criticism from the University of Edinburgh and spent several years developing and overseeing projects to digitise ancient manuscripts in the US, Europe, and Asia with the Center for the Study of New Testament Manuscripts (CSNTM). I primarily publish on topics within papyrology, paratexts, and New Testament textual criticism.</div>
        <small className={styles.Small}><sup>*</sup>by my career in software engineering</small>
      </div>
    </div>
  </div>
);
