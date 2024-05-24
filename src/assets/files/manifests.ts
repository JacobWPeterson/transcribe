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
      "This lesson is about the right column. The title is above the green rectangle. Treat indented lines as part of the preceding line when entering them in the forms.",
    lines: [
      {
        text: "ιωβ",
        isTitle: true,
      },
      {
        text: "ανθρωποσ τισ ην εν χωρα τη αυσιτιδι ω ονοµα ιωβ",
        newConcept: "Ekthesis",
        caption:
          "The new concept (click the NC icon) was made possible by the erasure of the first letter on this line.",
      },
      {
        text: "και ην ο ανθρωποσ εκεινοσ αληθινοσ αµεµπτοσ δικαιοσ θεοσεβησ",
      },
      {
        text: "απεχοµενοσ απο παντοσ πονηρου πραγµατοσ",
      },
      {
        text: "εγενοντο δε αυτω υιοι επτα και θυγατερεσ τρεισ",
      },
      {
        text: "και ην τα κτηνη αυτου προβατα επτακισχιλια",
      },
      {
        text: "καµηλοι τρισχιλιαι",
      },
      {
        text: "ζευγη βοων πεντακοσια",
      },
      {
        text: "ονοι θηλειαι νοµαδεσ πεντακοσιαι",
      },
      {
        text: "και υπηρεσια πολλη σφοδρα",
      },
      {
        text: "και εργα µεγαλα ην αυτω επι τησ γησ",
      },
      {
        text: "και ην ο ανθρωποσ εκεινοσ ευγενησ των αφ ηλιου ανατολων",
        newConcept: "Final nu",
      },
      {
        text: "συµπορευοµενοι δε οι υιοι αυτου προσ αλληλουσ",
      },
      {
        text: "εποιουσαν ποτον καθ εκαστην ηµεραν",
      },
      {
        text: "συµπαραλαµβανοντεσ αµα και τασ τρεισ αδελφασ αυτων",
      },
      {
        text: "εσθιειν και πινειν µετ αυτων",
      },
      {
        text: "και ωσ αν συνετελεσθησαν αι ηµεραι του ποτου",
      },
      {
        text: "απεστελλεν ιωβ και εκαθαριζεν αυτουσ ανισταµενοσ το πρωι",
      },
      {
        text: "και προσεφερεν περι αυτων θυσιαν κατα τον αριθµον αυτων",
      },
      {
        text: "και µοσχον ενα περι αµαρτιασ περι των ψυχων αυτων",
      },
      {
        text: "ελεγεν γαρ ιωβ µηποτε οι υιοι µου εν τη διανοια αυτων κακα ενενοησαν προσ θν",
        newConcept: "Nomina sacra",
      },
      {
        text: "ουτωσ ουν εποιει ιωβ πασασ τασ ηµερασ",
      },
      {
        text: "και ωσ εγενετο η ηµερα αυτη",
      },
      {
        text: "και ιδου ηλθον οι αγγελοι του θυ παραστηναι ενωπιον του κυ",
      },
      {
        text: "και ο διαβολοσ ηλθεν µετ αυτων",
        caption: "Include the faded nu in your transcription.",
      },
    ],
  },
  2: {
    manifestId: "https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594",
    canvasIndex: 161,
    instruction:
      "No new concepts in this lesson, just more examples of those learned in the previous lesson but in a different style of majuscule script.",
    lines: [
      {
        text: "ευαγγελιον κατα μαρκον",
        isTitle: true,
      },
      {
        text: "αρχη του ευαγγελιου ιυ χυ υυ του θυ",
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
    manifestId: 'https://viewer.cbl.ie/viewer/api/v1/records/BP_X_f_77/manifest/',
    canvasIndex: 1,
    instruction: "A papyrus manuscript by a trained scribe in a slightly irregular majuscule script. This lesson ends when the papyrus becomes damaged. Ignore the page number (πνγ) at the top of the leaf.",
    lines: [
      {
        text: "και ιδου οφθαλμοι ωσει οφθαλ",
      },
      {
        text: "μοι ανθρωπινοι εν τω κε",
      },
      {
        text: "ρατι τουτω και στομα λαλουν",
      },
      {
        text: "μεγαλα και εποιει πολε",
      },
      {
        text: "μον προσ τουσ αγιουσ εθε",
      },
      {
        text: "ωρουν εωσ οτου θρονοι",
      },
      {
        text: "ετεθησαν και παλαιοσ η",
      },
      {
        text: "μερων εκαθητο εχων",
      },
      {
        text: "περιβολην ωσει χειονα",
      },
      {
        text: "και το τριχωμα τησ κεφα",
      },
      {
        text: "λησ αυτου ωσει εριον λευ",
      },
      {
        text: "κον καθαρον ο θρονοσ",
      },
      {
        text: "ωσει φλοξ πυροσ βαδι",
      },
      {
        text: "ζουσα και εξεπορευε",
      },
      {
        text: "το κατα προσωπον αυτου",
      },
      {
        text: "ποταμοσ πυροσ χειλεαι",
      },
      {
        text: "χειλειαδεσ εθεραπευον",
      },
      {
        text: "αυτον και μυριαι μυρια",
      },
    ]
  },
  4: {
    manifestId:
      "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00058840/manifest",
    canvasIndex: 53,
    instruction:
      "This lesson features relatively easy to read minuscule text but focuses on a page of kephalaia (ancient chapter divisions). Each line contains a Greek number, then an abbreviation for περι, and then a short title for that section. Treat lines that do not begin with a number as part of the preceding line.",
    lines: [
      {
        text: "λυσαι την γυναικα αυτου",
      },
      {
        text: "μα περι του επερωτησαντοσ πλουσιου τον ιν",
        newConcept: "Numbers",
      },
      {
        text: "μβ περι των μισθουμενων εργατων",
      },
      {
        text: "μγ περι των υιων ζεβεδαιου",
      },
      {
        text: "μδ περι των δυο τυφλων",
      },
      {
        text: "με περι τησ ονου και του πωλου",
      },
      {
        text: "μϛ περι των τυφλων και των χωλων",
        newConcept: "Stigma",
      },
      {
        text: "μζ περι τησ ξηρανθησησ συκησ",
      },
      {
        text: "μη περι των επερωτησαντων τον κν αρχιερεων και πρεσβυτερων",
      },
      {
        text: "μθ περι των δυο υιων παραβολη",
      },
      {
        text: "ν περι του αμπελωνοσ παραβολη",
        caption: "This line contains a tricky abbreviation.",
      },
      {
        text: "να περι των καλουμενων εισ τον γαμον",
      },
      {
        text: "νβ περι των επερωτησαντων δια τον κηνσον",
      },
      {
        text: "νγ περι των σαδδουκαιων",
      },
      {
        text: "νδ περι του νομικου",
      },
      {
        text: "νε περι τησ του κυ επερωτησεωσ προσ τεισ φαρισαιουσ",
        caption:
          "This line contains an error or confuses abbreviations that makes it too difficult. Near the end of the line is προ followed by a στ ligature with two squiggles above it. This represents προς τεις even though it grammatically should have been προς τους.",
      },
      {
        text: "νϛ περι του ταλανισμου των γραμματαιων και φαρισαιων",
        caption:
          "The final vertical stroke and long squiggly line at the end of the first line are an abbreviation.",
      },
      {
        text: "νζ περι τησ συντελειασ",
      },
    ],
  },
  5: {
    // helpful edition https://books.google.com/books?id=2c5hAAAAcAAJ&pg=PP118&lpg=PP118&dq=ephrem+syrus+%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82+%CE%BB%CE%BF%CE%B3%CE%BF%CF%82+%CE%B1&source=bl&ots=LeXDEgtDAt&sig=ACfU3U1qoHsw12pFlyLR5Tae8UnNklc6kg&hl=en&sa=X&ved=2ahUKEwif16uHiNH0AhX-Ap0JHUBGA_QQ6AF6BAgYEAM#v=onepage&q=ephrem%20syrus%20%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82%20%CE%BB%CE%BF%CE%B3%CE%BF%CF%82%20%CE%B1&f=false
    manifestId:
      "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00050975/manifest",
    canvasIndex: 157,
    lines: [
      {
        text: "λογοσ αυτων κατανυκτικοσ λογοσ α",
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
        text: "εγω συν τοισ δυο αδελφοισ εξωθεν",
        newConcept: "Abbreviation",
      },
      {
        text: "τοισ πολεωσ εδεσων ευλογημενησ",
      },
      {
        text: "και ειρα τοισ οφθαλμοισ μου εισ τον",
      },
      {
        text: "ουνον ωσ εσοπρον καθορων λαμπον",
      },
      {
        text: "τα συν τοισ αστρισ μετα δοξησ επι γησ και",
      },
      {
        text: "θαυμασασ ελεγον αν αρα ταυτα ουτοσ λα",
      },
      {
        text: "μποσιν μετα δοξησ δικαιοι και αγιοι ποι",
      },
      {
        text: "ησαντεσ το θελημα του θυ του αγιου εν",
      },
      {
        text: "τη ωρα εκεινη οταν ελθη ο κσ ποσω",
      },
      {
        text: "μαιλον λαμψουσιν φωτι ανεκλαλητω",
      },
      {
        text: "τησ δοξησ του σρσ παραχριμα δε μνη",
      },
      {
        text: "σθησ τησ φοβερασ εκεινησ ελευσεωσ",
      },
    ],
  },
  6: {
      manifestId: 'https://viewer.cbl.ie/viewer/api/v1/records/MP_2_86/manifest/',
      canvasIndex: 2,
      lines: [
        {
          text: "κουσατε μου και ζησεται ε",
        },
        {
          text: "ν αγαθοισ η ψυχη υμων και",
        },
        {
          text: "διαθησομαι υμιν διαθη",
          newConcept: 'Diaeresis'
        },
        {
          text: "κην αιωνιον τα οσια δαυιδ",
          caption: "There's a correction on this line after the tau. It looks as if the scribe skipped a letter, starting writing the next word for two letters, then made the correction. Transcribe these two letters as α ο."
        },
        {
          text: "τα πιστα ιδου μαρτυριαν εν ε",
        },
        {
          text: "θνεσιν αυτον δεδωκα αρχον",
          caption: "Another correction here by a later scribe; don't include it in your transcription."
        },
        {
          text: "τα και προστασσοντα εθνεσιν",
        },
        {
          text: "εθνη α ουκ ηδεισαν σε επικα",
        },
        {
          text: "λεσονται σε λαοι οι ουκ επισ",
        },
        {
          text: "ταντα σε επι σε καταφευξον",
        },
        {
          text: "ται εινεκεν του θυ σου του",
        },
        {
          text: "αγιου ισραηλ οτι εδοξασεν",
          caption: "The hole on this line completely affected one letter and part of another. Notice the overline indicating this began a nomen sacrum. The following four letters should allow you to work out the missing letters.",
          newConcept: "Reconstruction",
        },
        {
          text: "σε ζητησατε τον θν και εν",
        }
      ]
  },
};

export default manifests;
