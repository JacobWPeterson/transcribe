//  Other potential MSS:
// Aristophanes minuscules https://www.digitale-sammlungen.de/en/view/bsb00069327?page=,1

const manifests = {
  1: {
    manifestId: 'https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594',
    // manifestId: '',
    canvasIndex: 160,
    title: {
      text: 'ευαγγελιον κατα μαρκον',
      key: 'title',
    },
    lines: [
      {
        text: 'αρχη του ευαγγελιου ιυ χυ υυ του θυ',
        key: 1,
        newConcepts: ['Ekthesis'],
        caption: 'The red αρ with superscript χ is shorthand for αρχη and marks the start of a section. Exclude it from your transcription.',
      },
      {
        text: 'ωσγεγραπταιεντοισπροφηταισ',
        key: 2,
      },
      {
        text: 'ιδουεγωαποστελλωτοναγγε',
        key: 3,
      },
      {
        text: 'λονμουπροπροσωπουσουοσ',
        key: 4,
      },
      {
        text: 'κατασκευασειτηνοδονσουεμπρο',
        key: 5,
      },
      {
        text: 'σθενσουφωνηβοωντοσεντηερημω',
        key: 6,
        caption: 'You\'ll notice a superscript ω at the end of the line. This is part of the final word.',
      },
      {
        text: 'ετοιμασατετηνοδονκυευθειασποι',
        key: 7,
      },
      {
        text: 'ειτεταστριβουσαυτουεγενετοιω',
        key: 8,
      },
    ],
  },
  2: {
    // helpful quasi transcription https://books.google.com/books?id=2c5hAAAAcAAJ&pg=PP118&lpg=PP118&dq=ephrem+syrus+%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82+%CE%BB%CE%BF%CE%B3%CE%BF%CF%82+%CE%B1&source=bl&ots=LeXDEgtDAt&sig=ACfU3U1qoHsw12pFlyLR5Tae8UnNklc6kg&hl=en&sa=X&ved=2ahUKEwif16uHiNH0AhX-Ap0JHUBGA_QQ6AF6BAgYEAM#v=onepage&q=ephrem%20syrus%20%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82%20%CE%BB%CE%BF%CE%B3%CE%BF%CF%82%20%CE%B1&f=false
    manifestId: 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00050975/manifest',
    canvasIndex: 156,
    title: {
      text: 'λογοσαυτωνκατανυκτικοσλογοσα',
      key: 'title',
      newConcepts: ['Abbreviations'],
    },
    lines: [
      {
        text: 'ενμιαουντωνημερων',
        key: 1,
      },
      {
        text: 'ορθρουμιαναστασεπορευομην',
        key: 2,
        newConcepts: ['Ligatures'],
      },
      {
        text: '',
        key: 3,
      },
      {
        text: '',
        key: 4,
      },
      {
        text: '',
        key: 5,
      },
      {
        text: '',
        key: 6,
      },
      {
        text: '',
        key: 7,
      },
      {
        text: '',
        key: 8,
      },
      {
        text: '',
        key: 9,
      },
      {
        text: '',
        key: 10,
      },
      {
        text: '',
        key: 11,
      },
      {
        text: '',
        key: 12,
      },
      {
        text: '',
        key: 13,
      },
      {
        text: '',
        key: 14,
      },
    ],
  },
  3: {
    manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
    canvasIndex: 1446,
    lines: [
      {
        text: 'αρχητουευαγγελιουιυχυυυτουθυ',
        key: 1,
        newConcepts: ['Ekthesis'],
      },
      {
        text: 'ωσγεγραπταιεντοισπροφηταισ',
        key: 2,
      },
      {
        text: 'αρχητουευαγγελιουιυχυυυτουθυ',
        key: 3,
      },
      {
        text: 'ωσγεγραπταιεντοισπροφηταισ',
        key: 4,
      },
      {
        text: 'αρχητουευαγγελιουιυχυυυτουθυ',
        key: 5,
      },
      {
        text: 'ωσγεγραπταιεντοισπροφηταισ',
        key: 6,
      },
      {
        text: 'αρχητουευαγγελιουιυχυυυτουθυ',
        key: 7,
      },
      {
        text: 'ωσγεγραπταιεντοισπροφηταισ',
        key: 8,
      },
    ],
  },
};

export default manifests;
