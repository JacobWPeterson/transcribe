//  Other potential MSS:
// Aristophanes minuscules https://www.digitale-sammlungen.de/en/view/bsb00069327?page=,1

// Difficult 16th c minuscule: https://digi.vatlib.it/view/MSS_Barb.gr.22

export type Line = {
  text: string;
  caption?: string;
  newConcept?: string;
  isTitle?: boolean;
};

export type Manifest = {
  manifestId: string;
  canvasIndex: number;
  canvasIndexToPageNumberAdj?: number;
  specialIndexHandlingStart?: string;
  specialIndexHandlingEnd?: string;
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
        text: "ανθρωποσ τισ ην εν χωρα τη αυσιτιδι ω ονομα ιωβ",
        newConcept: "Ekthesis",
        caption:
          "The new concept (click the NC icon) was made possible by the erasure of the first letter on this line.",
      },
      {
        text: "και ην ο ανθρωποσ εκεινοσ αληθινοσ αμεμπτοσ δικαιοσ θεοσεβησ",
      },
      {
        text: "απεχομενοσ απο παντοσ πονηρου πραγματοσ",
      },
      {
        text: "εγενοντο δε αυτω υιοι επτα και θυγατερεσ τρεισ",
      },
      {
        text: "και ην τα κτηνη αυτου προβατα επτακισχιλια",
      },
      {
        text: "καμηλοι τρισχιλιαι",
      },
      {
        text: "ζευγη βοων πεντακοσια",
      },
      {
        text: "ονοι θηλειαι νομαδεσ πεντακοσιαι",
      },
      {
        text: "και υπηρεσια πολλη σφοδρα",
      },
      {
        text: "και εργα μεγαλα ην αυτω επι τησ γησ",
      },
      {
        text: "και ην ο ανθρωποσ εκεινοσ ευγενησ των αφ ηλιου ανατολων",
        newConcept: "Final nu",
      },
      {
        text: "συμπορευομενοι δε οι υιοι αυτου προσ αλληλουσ",
      },
      {
        text: "εποιουσαν ποτον καθ εκαστην ημεραν",
      },
      {
        text: "συμπαραλαμβανοντεσ αμα και τασ τρεισ αδελφασ αυτων",
      },
      {
        text: "εσθιειν και πινειν μετ αυτων",
      },
      {
        text: "και ωσ αν συνετελεσθησαν αι ημεραι του ποτου",
      },
      {
        text: "απεστελλεν ιωβ και εκαθαριζεν αυτουσ ανισταμενοσ το πρωι",
        newConcept: "Diaeresis",
      },
      {
        text: "και προσεφερεν περι αυτων θυσιαν κατα τον αριθμον αυτων",
      },
      {
        text: "και μοσχον ενα περι αμαρτιασ περι των ψυχων αυτων",
      },
      {
        text: "ελεγεν γαρ ιωβ μηποτε οι υιοι μου εν τη διανοια αυτων κακα ενενοησαν προσ θν",
        newConcept: "Nomina sacra",
      },
      {
        text: "ουτωσ ουν εποιει ιωβ πασασ τασ ημερασ",
      },
      {
        text: "και ωσ εγενετο η ημερα αυτη",
      },
      {
        text: "και ιδου ηλθον οι αγγελοι του θυ παραστηναι ενωπιον του κυ",
      },
      {
        text: "και ο διαβολοσ ηλθεν μετ αυτων",
        caption: "Include the faded nu in your transcription.",
      },
    ],
  },
  2: {
    manifestId:
      "https://viewer.cbl.ie/viewer/api/v1/records/BP_X_f_77/manifest",
    canvasIndex: 1,
    specialIndexHandlingStart: "pages/",
    instruction:
      "A papyrus manuscript by a trained scribe in a slightly irregular majuscule script. This lesson ends when the papyrus becomes damaged. Ignore the page number (πνγ) at the top of the leaf. No new concepts here, just new letter forms different the uniform block capitals of the prior manuscript.",
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
    ],
  },
  3: {
    manifestId: "https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594",
    canvasIndex: 161,
    instruction:
      "No new concepts again in this lesson, just more examples of those learned in the previous lessons but in a different style of majuscule script.",
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
  4: {
    manifestId:
      "https://www.e-codices.unifr.ch/metadata/iiif/csg-0048/manifest.json",
    canvasIndex: 78,
    specialIndexHandlingStart: "_",
    specialIndexHandlingEnd: ".json",
    canvasIndexToPageNumberAdj: -2,
    instruction:
      "Welcome to an intralinear Greek-Latin diglot. Don't worry, you only need to transcribe the Greek. You should feel comfortable transitioning to the semi-majuscule letter forms, so this will mostly be an exercise in attention to detail and ignoring extraneous material. Skip the initial κατα.",
    lines: [
      {
        text: "και το δανιον αφηκεν αυτο εξελθων δε ο δουλοσ εκεινοσ",
      },
      {
        text: "ευρεν ινα των συνδουλων αυτου οσ ωφειλεν αυτω εκατον",
      },
      {
        text: "δηναρια και κρατησασ αυτον επνιγεν λεγων αποδοσ μοι",
      },
      {
        text: "ει τι οφειλεισ πεσων ουν ο συνδουλοσ αυτου εισ τουσ",
      },
      {
        text: "πασασ αυτου παρεκαλει αυτον λεγων μακροθυμησον",
      },
      {
        text: "επε μοι και αποδωσω σοι ο δε ουκ ηθελεν αλλ απελ",
      },
      {
        text: "θων εβαλεν αυτον εισ φυλακην εωσ ου αποδω το οφειλο",
      },
      {
        text: "μενον ιδοντεσ δε οι συνδουλοι αυτου τα γενομενα",
      },
      {
        text: "ελυπηθησαν σφοδρα και ελθοντεσ διεσαφησαν τω κω",
      },
      {
        text: "εαυτων παντα γενομενα τοτε προσκαλεσαμενοσ αυτον",
      },
      {
        text: "ο κυριοσ αυτου λεγει αυτω δουλε πονηρε πασαν την",
      },
      {
        text: "οφειλην εκεινη αφηκα σοι επει παρεκαλεσασ με ουκ εδει και σε",
      },
      {
        text: "ελεησαι τον συνδουλον σου ωσ και ετω σε ηλεησα και",
      },
      {
        text: "οργισθεισ ο κυριοσ αυτου παρεδωκεν αυτον τοισ βασανισταισ",
      },
      {
        text: "εωσ ου αποδω παν το οφειλομενον αυτω ουτωσ και ο πηρ",
        caption:
          "Be careful with one of the vowels on this line. Consult other examples on the page.",
      },
      {
        text: "μου ο επουρανιοσ ποιησει υμιν εαν μη αφητε εκατοσ",
      },
      {
        text: "τω αδελφω αυτου απο των καρδιων υμων τα παραπτωμα",
      },
      {
        text: "τα αυτων και εγενετο οτε ετελεσεν ο ισ τουσ λογουσ του",
      },
      {
        text: "τουσ μετηρεν απο τησ γαλιλαιασ και ηλθεν εισ τα ορια",
      },
      {
        text: "τησ ιουδαιασ περαν του ιορδανου και ηκολουθησαν αυ",
      },
      {
        text: "τω οχλοι πολλοι και εθεραπευσεν αυτουσ εκει περι",
      },
      {
        text: "των επερωτησαντων ει εξεστιν απολυσαι την",
      },
    ],
  },
  5: {
    manifestId:
      "https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00058840/manifest",
    canvasIndex: 51,
    instruction:
      "This lesson features relatively easy to read minuscule text but introduces ligatures, abbreviations, and numbers, so be sure to consult the 'Online Resources' under the Help tab for resources to help intrepret these. This is a page of kephalaia (ancient chapter divisions) where each line contains a Greek number and then a short title for that section. Many lines begin with an abbreviation for περι (the stacked πε).",
    lines: [
      {
        text: "α περι των μαγων",
        newConcept: "Numbers",
      },
      {
        text: "β περι των αναιρεθεντων παιδιων",
      },
      {
        text: "γ πρωτοσ ιωαννησ εκηρυξεν βασιλειαν ουνω",
        caption: "The end of this line features a nomen sacrum plus final nu.",
      },
      {
        text: "δ περι διδασκαλιασ του σρσ",
        newConcept: "Ligature",
        caption: "Note the ligature here contains parts of two words.",
      },
      {
        text: "ε περι των μακαρισμων",
      },
      {
        text: "ϛ περι του λεπρου",
        newConcept: "Stigma",
      },
      {
        text: "ζ περι του εκατονταρχου",
      },
      {
        text: "η περι τησ πενθερασ πετρου",
      },
      {
        text: "θ περι των ιαθεντων απο ποικιλων νοσων",
      },
      {
        text: "ι περι του μη επιτρεπομενου ακολουθειν",
      },
      {
        text: "ια περι τησ επιτημησεωσ των υδατων",
      },
      {
        text: "ιβ περι των δαιμονιζωμενων",
      },
      {
        text: "ιγ περι του παραλυτικου",
      },
      {
        text: "ιδ περι ματθαιου",
      },
      {
        text: "ιε περι τησ θυγατροσ του αρχησυναγωγου",
        newConcept: "Abbreviation",
        caption: "This abbreviation results in a variant reading.",
      },
      {
        text: "ιϛ περι τησ αιμορροουσησ",
      },
      {
        text: "ιζ περι των δυο τυφλων",
        caption:
          "Be careful with the letter after δυ; it appears to be damaged.",
      },
      {
        text: "ιη περι κωφου δαιμονιζομενου",
      },
      {
        text: "ιθ περι τησ των αποστολων διαταγησ",
        caption: "The large abbreviation/ligature is for αποστολων",
      },
      {
        text: "κ περι των αποσταλεντων παρα ιωαννου",
      },
    ],
  },
  6: {
    manifestId: "https://viewer.cbl.ie/viewer/api/v2/records/MP_2_86/manifest",
    canvasIndex: 2,
    specialIndexHandlingStart: "pages/",
    instruction:
      "This manuscript features more irregular letter forms than you have seen so far. Be particularly careful with letters that might easily be confused for others.",
    lines: [
      {
        text: "κουσατε μου και ζησεται ε",
      },
      {
        text: "ν αγαθοισ η ψυχη υμων και",
      },
      {
        text: "διαθησομαι υμιν διαθη",
      },
      {
        text: "κην αιωνιον τα οσια δαυιδ",
        caption:
          "There's a correction on this line after the tau. It looks as if the scribe skipped a letter, starting writing the next word for two letters, then made the correction. Transcribe these two letters as α ο.",
      },
      {
        text: "τα πιστα ιδου μαρτυριαν εν ε",
      },
      {
        text: "θνεσιν αυτον δεδωκα αρχον",
        caption:
          "Another correction here by a later scribe; don't include it in your transcription.",
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
        caption:
          "The hole on this line affected one whole letter and part of another. Notice the overline indicating this began a nomen sacrum; the following four letters should allow you to figure out the missing letters. Include them in your transcription.",
        newConcept: "Reconstruction",
      },
      {
        text: "σε ζητησατε τον θν και εν",
      },
    ],
  },
  7: {
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
      },
      {
        text: "εγω συν τοισ δυο αδελφοισ εξωθεν",
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
  8: {
    // Transcription (which has errors): https://spotlight.vatlib.it/greek-paleography/catalog/71fcddac-57f2-4a02-a97a-35469f00ba9b
    // Commentary on the script: https://spotlight.vatlib.it/greek-paleography/feature/2-introduction-to-minuscule-bookhands)
    manifestId: "https://digi.vatlib.it/iiif/MSS_Vat.gr.2200/manifest.json",
    canvasIndex: 277,
    instruction:
      'The minuscule scripts you have worked through so far have been of the "Studite" variety. However, in the early development of minuscule script there were other contenders. The manuscript in this exercise features one of them: the "Hagiopolitan" script.',
    lines: [
      {
        text: "λαττουσα και τουτοισ ακολουθει καθαπερ νο",
      },
      {
        text: "μοισ τισιν αρραγεσι και αλισκεσθαι μη δυ",
      },
      {
        text: "ναμενοισ πορρω φευγουσα την ευτυχε",
      },
      {
        text: "οσ μανιαν και το βλασφημον νεστοριου",
      },
      {
        text: "στομα μακραν εαυτησ απωθουμενη και",
      },
      {
        text: "κατηγορουσα τησ τουτου θρασυτητοσ",
      },
      {
        text: "ωσπερ οι σοφοι εκεινοι και τησ πιστεωσ συ",
      },
      {
        text: "νηγοροι οτι δε ουτωσ εχει και τουτον οι πρσ",
      },
      {
        text: "εκεινοι μετα τησ αληθειασ προειλαντο",
      },
      {
        text: "τον αγωνα κοινον χαριζομενοι κερδοσ",
      },
      {
        text: "εξ αυτησ τησ υποθεσεωσ εξεστι μαθειν και σα",
      },
      {
        text: "φη την μαρτυριαν λαμβανειν παντα",
      },
      {
        text: "γαρ τα αυτων συναγαγοντεσ και παραλληλα",
      },
      {
        text: "θεντεσ εκεινοισ προστεθηκαμεν τοισ",
      },
      {
        text: "βουλομενοισ ορθωσ εξεταζειν και την αλη",
      },
      {
        text: "θειαν διαγινωσκειν τοισ λεγομενοισ",
      },
      {
        text: "τοινυν προσεχοντεσ ραδιαν ληψεσθε",
      },
      {
        text: "την αποδειξιν ωσ ουδε κατα μικρον εκ",
      },
      {
        text: "βεβηκε τησ ορθησ των αγιων πρων δο",
      },
      {
        text: "ξησ η εν χαλκηδονι γενομενη αγια συνοδοσ",
      },
      {
        text: "εκθεσισ περι πιστεωσ τησ αγιασ συνοδου",
      },
      {
        text: "τησ εν χαλκηδονι συναθροισθεισησ",
        caption:
          "The full form of the abbreviation on this line appears on the last line of minuscule script above.",
      },
      {
        text: "των χλ αγιων πρων",
      },
      {
        text: "επομενοι τοινυν τοισ αγιοισ πρασιν ενα και",
      },
      {
        text: "τον αυτον ομολογειν υν τον κν ημων ιν χν συμ",
      },
      {
        text: "φωνωσ απαντεσ εκδιδασκομεν",
      },
      {
        text: "κυριλλου εκ τησ προσ σουκενσον επιστολησ",
        caption: 'The abbreviation here is "κυριλλου"',
      },
      {
        text: "εδιδαχθημεν παρα τε τησ θειασ γραφησ",
      },
      {
        text: "και των αγιων πρων ενα υν και χν ομολογειν",
      },
      {
        text: "τησ συνοδου",
      },
    ],
  },
};

export default manifests;
