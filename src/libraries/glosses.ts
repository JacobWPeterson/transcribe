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
      "Abbreviations were used for common or repeated words and some names.",
    long: 'Abbreviations were used for common or repeated words and some names. Abbreviation could be done by writing only the first letter or first few letters of a word, or by omitting word endings. One example is "και compendium" (ϗ) where a kappa with a trailing flourish stands for και. When the shortening is done by omitting the middle letters it is called a contraction (see below).',
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
  Ekthesis: {
    short:
      "A large, decorative letter at the beginning of a line that is often in the margin.",
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
  "Nomina Sacra": {
    short:
      "Names of sacred persons reduced by contraction and marked by a line over the letters",
    long: 'Latin for "sacred names", where names of sacred persons were reduced by contraction and marked by a line over the letters. In biblical manuscripts these typically take two or three letter forms and are most often used for κυριος (κ\u{0305}ς\u{0305}), ιησους (ι\u{0305}ς\u{0305}), χριστος (χ\u{0305}ς\u{0305}), υιος (υ\u{0305}ς\u{0305}), θεος (θ\u{0305}ς\u{0305}), and πνευμα (μ\u{0305}ν\u{0305}α\u{0305}).',
  },
  Uncial: {
    short: "An alternative term for majuscule script.",
  },
};

export default glosses;
