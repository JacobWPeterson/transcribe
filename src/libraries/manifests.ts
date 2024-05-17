//  Other potential MSS:
// Aristophanes minuscules https://www.digitale-sammlungen.de/en/view/bsb00069327?page=,1

export type Line = {
  text: string;
  caption?: string;
  newConcept?: string;
  isTitle?: boolean;
};

export type Manifest = {
  manifestId: string;
  canvasIndex: number;
  lines: Line[];
};

export type Manifests = {
  [key: string]: Manifest;
};

const manifests: Manifests = {
  1: {
    manifestId: "https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594",
    canvasIndex: 160,
    lines: [
      {
        text: "ευαγγελιον κατα μαρκον",
        isTitle: true,
      },
      {
        text: "αρχη του ευαγγελιου ιυ χυ υυ του θυ",
        newConcept: "Ekthesis",
        caption:
          "The red αρ with superscript χ is shorthand for αρχη and marks the start of a section. Exclude it from your transcription.",
      },
      {
        text: "ωσγεγραπταιεντοισπροφηταισ",
      },
      {
        text: "ιδουεγωαποστελλωτοναγγε",
      },
      {
        text: "λονμουπροπροσωπουσουοσ",
      },
      {
        text: "κατασκευασειτηνοδονσουεμπρο",
      },
      {
        text: "σθενσουφωνηβοωντοσεντηερημω",
        caption:
          "You'll notice a superscript ω at the end of the line. This is part of the final word.",
      },
      {
        text: "ετοιμασατετηνοδονκυευθειασποι",
      },
      {
        text: "ειτεταστριβουσαυτουεγενετοιω",
      },
    ],
  },
  2: {
    // helpful quasi transcription https://books.google.com/books?id=2c5hAAAAcAAJ&pg=PP118&lpg=PP118&dq=ephrem+syrus+%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82+%CE%BB%CE%BF%CE%B3%CE%BF%CF%82+%CE%B1&source=bl&ots=LeXDEgtDAt&sig=ACfU3U1qoHsw12pFlyLR5Tae8UnNklc6kg&hl=en&sa=X&ved=2ahUKEwif16uHiNH0AhX-Ap0JHUBGA_QQ6AF6BAgYEAM#v=onepage&q=ephrem%20syrus%20%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82%20%CE%BB%CE%BF%CE%B3%CE%BF%CF%82%20%CE%B1&f=false
    manifestId:
      "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00050975/manifest",
    canvasIndex: 156,
    lines: [
      {
        text: "λογοσαυτωνκατανυκτικοσλογοσα",
        newConcept: "Abbreviation",
      },
      {
        text: "ενμιαουντωνημερων",
      },
      {
        text: "ορθρουμιαναστασεπορευομην",
        newConcept: "Ligature",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
      {
        text: "",
      },
    ],
  },
  3: {
    manifestId: "https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json",
    canvasIndex: 1446,
    lines: [
      {
        text: "αρχητουευαγγελιουιυχυυυτουθυ",
        newConcept: "Ekthesis",
      },
      {
        text: "ωσγεγραπταιεντοισπροφηταισ",
      },
      {
        text: "αρχητουευαγγελιουιυχυυυτουθυ",
      },
      {
        text: "ωσγεγραπταιεντοισπροφηταισ",
      },
      {
        text: "αρχητουευαγγελιουιυχυυυτουθυ",
      },
      {
        text: "ωσγεγραπταιεντοισπροφηταισ",
      },
      {
        text: "αρχητουευαγγελιουιυχυυυτουθυ",
      },
      {
        text: "ωσγεγραπταιεντοισπροφηταισ",
      },
    ],
  },
};

export default manifests;
