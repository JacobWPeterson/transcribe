type Gloss = {
  short: string;
  long?: string;
};

export type Glosses = {
  [key: string]: Gloss;
};

const glosses: Glosses = {
  Abbreviation: {
    short:
      "Abbreviations were used for word endings and common or repeated words and some names.",
    long: 'Abbreviations were used for word endings common or repeated words and some names. Abbreviation could be done by writing only the first letter or first few letters of a word, or by omitting word endings. One example is "και compendium" (ϗ) where a kappa with a trailing flourish stands for και. When the shortening is done by omitting the middle letters it is called a contraction (see below).',
  },
  Compendium: {
    short: "(pl. compendia) Another word for abbreviation.",
  },
  Contraction: {
    short:
      "A type of abbreviation where the word is shortened by omitting the middle letters.",
  },
  Cursive: {
    short:
      "A style of writing that allows the scribe to only infrequently lift the pen from the page.",
  },
  Diaeresis: {
    short:
      "A diacritic appearing over ι and υ indicating two vowels are pronounced separately.",
  },
  Ekthesis: {
    short:
      "A large, decorative letter at the beginning of a line that is often in the margin.",
  },
  "Final nu": {
    short:
      "When a nu occurs at the end of the line, it is often represented as a supralinear horizontal line.",
  },
  Ligature: {
    short:
      "Where two or more letters are combined together to form a new glyph.",
    long: "Where two or more letters are combined together to form a new glyph, such as ȣ for ου. They become increasingly common in later minuscule manuscripts.",
  },
  Majuscule: {
    short:
      "A writing style characterised by unconnected block letters of a consistent height.",
    long: 'The style of writing used in most Greek literary manuscripts (e.g., the Bible, histories, biographies, etc.) until the ninth century, when it was largely replaced by minuscule. It continued to be used for ornamental capitals, headings, and in liturgical manuscripts from the tenth to twelfth centuries with some examples from the fourteeth century. The letters are unconnected and of the same height (this characteristic is called "bilinearity"). It is not a technically correct definition, but you might associate majuscule script with the use of capital letter forms.',
  },
  Miniscule: {
    short:
      "A more fluid writing style characterised by rounded, connected letters and, often, ligatures.",
    long: "The style of writing that replaced majuscule as the predominant form of writing beginning in the ninth century. It likely developed from existing scripts that were used in documentary texts (e.g., receipts, letters, and tax records) and enabled more compact and quicker writing. It is more fluid in its nature and is characterised by rounded, often connected letters in a cursive-like style, and the use of ligatures. Whereas majuscule is bilinear, minuscule is monolinear with the script either being set so that the bottom of each letter sits on an imaginary line or the tops of the letters hang from the line.",
  },
  Monogram: {
    short:
      "A pictographic symbol in which a number of letters are arranged together without consideration for order.",
    long: 'A pictographic symbol in which a number of letters are arranged together without consideration for order. Examples include the chi-rho symbol (☧) where a rho is imposed over a chi to stand for "Christ" and the staurogram (⳨), a christogram comprised of tau and rho.',
  },
  "Nomina sacra": {
    short:
      "Names of sacred persons reduced by contraction and marked by a line over the letters",
    long: 'Latin for "sacred names", where names of sacred persons were reduced by contraction and marked by a line over the letters. In biblical manuscripts these typically take two or three letter forms and are most often used for κυριος (κ\u{0305}ς\u{0305}), ιησους (ι\u{0305}ς\u{0305}), χριστος (χ\u{0305}ς\u{0305}), υιος (υ\u{0305}ς\u{0305}), θεος (θ\u{0305}ς\u{0305}), and πνευμα (μ\u{0305}ν\u{0305}α\u{0305}).',
  },
  Numbers: {
    short:
      "The Greek numbering system used the alphabet where each letter represented a numeric value. Numbers were often written with an overline to distinguish them from a letter.",
    long: "The Greek numbering system used the alphabet where each letter represented a numeric value. Numbers were often written with an overline to distinguish them from a letter. For instance, α-θ were 1–9 (with Greek letter stigma (Ϛ) as 6), then ι began the 10s, ρ began the 100s, and so forth. So ι\u{0305}η\u{0305} was 18.",
  },
  Reconstruction: {
    short:
      "When part of a manuscript, often on papyrus, has been damaged and the missing text is supplied by the editor.",
    long: "When part of a manuscript, often on papyrus, has been damaged and the missing text is supplied by the editor based on a combination of the expected text and available spacing. Reconstructions are enclosed in brackets in formal transcriptions.",
  },
  Stigma: {
    short:
      "A Greek ligature (ϛ) for στ not to be confused with final sigma (ς)",
    long: 'A Greek ligature (ϛ) for στ not to be confused with final sigma (ς). In the Middle Ages, the ligature was conflated with the long-disused digamma (Ϝ, written cursively as ϛ) and therefore came to be used as 6 in the Greek numeral system (see "Numbers" above).',
  },
  Uncial: {
    short: "An alternative term for majuscule script.",
  },
};

export default glosses;
