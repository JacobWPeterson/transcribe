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
  instruction?: string;
  lines: Line[];
};

export type Manifests = {
  [key: string]: Manifest;
};

const manifests: Manifests = {
  1: {
    manifestId: "https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json",
    canvasIndex: 773,
    instruction:
      "This lesson is about the right column. Treat indented lines as part of the preceding line when entering them in the forms.",
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
  2: {
    manifestId: "https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594",
    canvasIndex: 161,
    lines: [
      {
        text: "ευαγγελιον κατα μαρκον",
        isTitle: true,
      },
      {
        text: "αρχη του ευαγγελιου ιυ χυ υυ του θυ",
        newConcept: "Nomina sacra",
        caption:
          "The red αρ with superscript χ is shorthand for αρχη and marks the start of a section. Exclude it from your transcription.",
      },
      {
        text: "ωσ γεγραπται εν τοισ προφηταισ",
      },
      {
        text: "ιδου εγω αποστελλω τον αγγε",
      },
      {
        text: "λον μου προ προσωπου σου οσ",
      },
      {
        text: "κατασκευασει την οδον σου εμπρο",
      },
      {
        text: "σθεν σου φωνη βοωντοσ εν τη ερημω",
        caption:
          "You'll notice a superscript ω at the end of the line. This is part of the final word.",
      },
      {
        text: "ετοιμασατε την οδον κυ ευθειασ ποι",
      },
      {
        text: "ειτε τασ τριβουσ αυτου εγενετο ιω",
      },
    ],
  },
  3: {
    // helpful quasi transcription https://books.google.com/books?id=2c5hAAAAcAAJ&pg=PP118&lpg=PP118&dq=ephrem+syrus+%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82+%CE%BB%CE%BF%CE%B3%CE%BF%CF%82+%CE%B1&source=bl&ots=LeXDEgtDAt&sig=ACfU3U1qoHsw12pFlyLR5Tae8UnNklc6kg&hl=en&sa=X&ved=2ahUKEwif16uHiNH0AhX-Ap0JHUBGA_QQ6AF6BAgYEAM#v=onepage&q=ephrem%20syrus%20%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82%20%CE%BB%CE%BF%CE%B3%CE%BF%CF%82%20%CE%B1&f=false
    manifestId:
      "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00050975/manifest",
    canvasIndex: 157,
    lines: [
      {
        text: "λογοσ αυτων κατανυκτικοσ λογοσ α",
        newConcept: "Abbreviation",
        isTitle: true,
      },
      {
        text: "εν μια ουν των ημερων",
      },
      {
        text: "ορθρου μι αναστασ επορευομην",
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
};

export default manifests;
