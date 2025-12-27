type Resources = {
  name: string;
  creator: string;
  description: string;
  url: string;
  journal?: string;
  journalDetails?: string;
};

export type ResourceCategories = {
  heading: string;
  resources: Resources[];
};

const onlineResources: ResourceCategories[] = [
  {
    heading: 'Overviews',
    resources: [
      {
        name: 'Greek Paleography: From Antiquity to the Renaissance',
        creator: 'Timothy Janz',
        description:
          'A helpful guide through the history of Greek scripts with sections dedicated to majuscules, minuscules, nomina sacra, ligatures, abbreviations, etc.',
        url: 'https://spotlight.vatlib.it/greek-paleography/feature/1-majuscule-bookhands'
      }
    ]
  },
  {
    heading: 'Ligatures and Abbreviations',
    resources: [
      {
        name: 'CRBMI Minuscule Ligature/Abbreviation Tool',
        creator: 'Center for Research of Biblical Manuscripts',
        description:
          'A searchable database for finding ligatures and abbreviations. Simply type the possible letters into the filter and the tool will display images for all sequential combinations of letters in the input string.',
        url: 'https://airtable.com/appgrNuo12M56MZkN/shrjBIO9cbWMIZGF0/tbl3GfXLCvhcXcIbN'
      },
      {
        name: 'The Ligatures of Early Printed Greek',
        creator: 'William H. Ingram',
        journal: 'Greek, Roman, and Byzantine Studies',
        journalDetails: ' 7.4 (1966), 371-389.',
        description:
          "ABSTRACT: Aldus' decision (1490) to base his Greek font on the contemporary and more cursive hands rather than old manuscripts carried the day and set the pattern for early modern printing of Greek; the resulting ligatures are catalogued.",
        url: 'https://grbs.library.duke.edu/index.php/grbs/article/view/11391'
      },
      {
        name: 'Quick-Reference Greek Ligature Guide',
        creator: 'David R. Palmer',
        description:
          'Includes an alphabetical table of ligatures, articles on nomina sacra and numerals, plates on the evolution of Greek letter forms, and images with transcriptions.',
        url: 'https://bibletranslation.ws/down/ligatures.pdf'
      },
      {
        name: 'An Index of Greek Ligatures and Contractions',
        creator: 'William Wallace',
        journal: 'The Journal of Hellenic Studies',
        journalDetails: ' 43.2 (1923), 183-193.',
        description:
          'A helpful short article with scores of ligatures (Requires a free JSTOR account; is also available elsewhere online).',
        url: 'https://www.jstor.org/stable/625810'
      },
      {
        name: 'Greek ligatures',
        creator: 'Wikipedia',
        description: 'Includes a quick table overview of Greek ligatures forms.',
        url: 'https://en.wikipedia.org/wiki/Greek_ligatures'
      }
    ]
  },
  {
    heading: 'Greek Scripts',
    resources: [
      {
        name: 'Collaborative Database of Dateable Greek Bookhands (CDDGB)',
        creator: 'Grant Edwards',
        description:
          'A database of objectively datable manuscripts useful for tracing the development of Greek handwriting and comparatively dating other manuscripts.',
        url: 'https://airtable.com/appAIIx0kRIuaKBxI/shrZEkjkKomzgWh5Y/tblS0ve69dAzdMrus/viwSd70ZTRJuzxvM1?blocks=hide'
      },
      {
        name: 'An Introduction to Greek and Latin Palaeography',
        creator: 'Edward Maunde Thompson',
        description:
          'In addition to useful discussions around tools and materials, Thompson traces the development of Greek and Latin alphabets across a wide range of centuries. Of particular usefulness are the tables of letters on pages 144–7',
        url: 'https://archive.org/details/greeklatin00thomuoft'
      },
      {
        name: 'Greek minuscule',
        creator: 'Wikipedia',
        description: 'Includes a quick table overview of Greek cursive and minuscule forms.',
        url: 'https://en.wikipedia.org/wiki/Greek_minuscule'
      }
    ]
  },
  {
    heading: 'Images with transcriptions',
    resources: [
      {
        name: 'New Testament Virtual Manuscript Room (NT.VMR)',
        creator: 'The Institut für Neutestamentliche Textforschung (INTF)',
        description:
          'A collaborative research environment where New Testament textual scholars come to use and share resources and to contribute to the ongoing efforts for cataloging, imaging, indexing, and transcribing all known New Testament manuscript resources worldwide.',
        url: 'https://ntvmr.uni-muenster.de/manuscript-workspace'
      },
      {
        name: 'Codex Sinaiticus',
        creator: 'The Codex Sinaiticus Project',
        description:
          'The Codex Sinaiticus Project is an international collaboration to reunite the entire manuscript in digital form and make it accessible to a global audience for the first time.',
        url: 'https://codexsinaiticus.org/en/manuscript.aspx'
      },
      {
        name: 'Papyrus 46',
        creator: 'Jacob W. Peterson',
        description:
          "A site bringing together the latest high-resolution images of P46 from the Chester Beatty Library and the University of Michigan, as well as Kenyon's editio princeps, and placing them alongside Peterson and Kenyon's transcriptions.",
        url: 'https://papyrus46.com'
      }
    ]
  }
];

export default onlineResources;
