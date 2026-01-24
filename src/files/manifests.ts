//  Other potential MSS:
// Boethius: https://cudl.lib.cam.ac.uk/view/MS-ADD-01880-00008/1

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

export type ManifestSet = {
  [key in ManifestSets]: Manifests;
};

export enum ManifestSets {
  CORE = 'lessons',
  UoEDiv = 'UoEDiv'
}

export type Manifests = {
  [key: string]: Manifest;
};

const manifests: ManifestSet = {
  [ManifestSets.CORE]: {
    1: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 773,
      instruction:
        'This lesson is about the right column. The title is above the green rectangle. Treat indented lines as part of the preceding line when entering them in the forms.',
      lines: [
        {
          text: 'ιωβ',
          isTitle: true
        },
        {
          text: 'ανθρωποσ τισ ην εν χωρα τη αυσιτιδι ω ονομα ιωβ',
          newConcept: 'Ekthesis',
          caption: 'The ekthesis was made possible by the erasure of the first letter on this line.'
        },
        {
          text: 'και ην ο ανθρωποσ εκεινοσ αληθινοσ αμεμπτοσ δικαιοσ θεοσεβησ'
        },
        {
          text: 'απεχομενοσ απο παντοσ πονηρου πραγματοσ'
        },
        {
          text: 'εγενοντο δε αυτω υιοι επτα και θυγατερεσ τρεισ'
        },
        {
          text: 'και ην τα κτηνη αυτου προβατα επτακισχιλια'
        },
        {
          text: 'καμηλοι τρισχιλιαι'
        },
        {
          text: 'ζευγη βοων πεντακοσια'
        },
        {
          text: 'ονοι θηλειαι νομαδεσ πεντακοσιαι'
        },
        {
          text: 'και υπηρεσια πολλη σφοδρα'
        },
        {
          text: 'και εργα μεγαλα ην αυτω επι τησ γησ'
        },
        {
          text: 'και ην ο ανθρωποσ εκεινοσ ευγενησ των αφ ηλιου ανατολων',
          newConcept: 'Final nu'
        },
        {
          text: 'συμπορευομενοι δε οι υιοι αυτου προσ αλληλουσ'
        },
        {
          text: 'εποιουσαν ποτον καθ εκαστην ημεραν'
        },
        {
          text: 'συμπαραλαμβανοντεσ αμα και τασ τρεισ αδελφασ αυτων'
        },
        {
          text: 'εσθιειν και πινειν μετ αυτων'
        },
        {
          text: 'και ωσ αν συνετελεσθησαν αι ημεραι του ποτου'
        },
        {
          text: 'απεστελλεν ιωβ και εκαθαριζεν αυτουσ ανισταμενοσ το πρωι',
          newConcept: 'Diaeresis'
        },
        {
          text: 'και προσεφερεν περι αυτων θυσιαν κατα τον αριθμον αυτων'
        },
        {
          text: 'και μοσχον ενα περι αμαρτιασ περι των ψυχων αυτων'
        },
        {
          text: 'ελεγεν γαρ ιωβ μηποτε οι υιοι μου εν τη διανοια αυτων κακα ενενοησαν προσ θν',
          newConcept: 'Nomina sacra',
          caption:
            'Write out all nomina sacra and abbreviations as they appear in the manuscript. As a general guide, if the text has an overline, then transcribe it as is.'
        },
        {
          text: 'ουτωσ ουν εποιει ιωβ πασασ τασ ημερασ'
        },
        {
          text: 'και ωσ εγενετο η ημερα αυτη'
        },
        {
          text: 'και ιδου ηλθον οι αγγελοι του θυ παραστηναι ενωπιον του κυ'
        },
        {
          text: 'και ο διαβολοσ ηλθεν μετ αυτων',
          caption: 'Include the faded nu in your transcription.'
        }
      ]
    },
    2: {
      manifestId: 'https://viewer.cbl.ie/viewer/api/v1/records/BP_X_f_77/manifest',
      canvasIndex: 1,
      specialIndexHandlingStart: 'pages/',
      instruction:
        'A papyrus manuscript by a trained scribe in a slightly irregular majuscule script. This lesson ends when the papyrus becomes damaged. Ignore the page number (πνγ) at the top of the leaf. No new concepts here, just new letter forms different from the uniform block capitals of the prior manuscript.',
      lines: [
        {
          text: 'και ιδου οφθαλμοι ωσει οφθαλ'
        },
        {
          text: 'μοι ανθρωπινοι εν τω κε'
        },
        {
          text: 'ρατι τουτω και στομα λαλουν'
        },
        {
          text: 'μεγαλα και εποιει πολε'
        },
        {
          text: 'μον προσ τουσ αγιουσ εθε'
        },
        {
          text: 'ωρουν εωσ οτου θρονοι'
        },
        {
          text: 'ετεθησαν και παλαιοσ η'
        },
        {
          text: 'μερων εκαθητο εχων'
        },
        {
          text: 'περιβολην ωσει χειονα'
        },
        {
          text: 'και το τριχωμα τησ κεφα'
        },
        {
          text: 'λησ αυτου ωσει εριον λευ'
        },
        {
          text: 'κον καθαρον ο θρονοσ'
        },
        {
          text: 'ωσει φλοξ πυροσ βαδι'
        },
        {
          text: 'ζουσα και εξεπορευε'
        },
        {
          text: 'το κατα προσωπον αυτου'
        },
        {
          text: 'ποταμοσ πυροσ χειλεαι'
        },
        {
          text: 'χειλειαδεσ εθεραπευον'
        },
        {
          text: 'αυτον και μυριαι μυρια'
        }
      ]
    },
    3: {
      manifestId: 'https://cudl.lib.cam.ac.uk/iiif/MS-ADD-06594',
      canvasIndex: 161,
      instruction:
        'No new concepts again in this lesson, just more examples of those learned in the previous lessons but in a different style of majuscule script.',
      lines: [
        {
          text: 'ευαγγελιον κατα μαρκον',
          isTitle: true
        },
        {
          text: 'αρχη του ευαγγελιου ιυ χυ υυ του θυ',
          caption:
            'The red αρ with superscript χ is shorthand for αρχη and marks the start of a section. Exclude it from your transcription.'
        },
        {
          text: 'ωσ γεγραπται εν τοισ προφηταισ'
        },
        {
          text: 'ιδου εγω αποστελλω τον αγγε'
        },
        {
          text: 'λον μου προ προσωπου σου οσ'
        },
        {
          text: 'κατασκευασει την οδον σου εμπρο'
        },
        {
          text: 'σθεν σου φωνη βοωντοσ εν τη ερημω',
          caption:
            "You'll notice a superscript ω at the end of the line. This is part of the final word."
        },
        {
          text: 'ετοιμασατε την οδον κυ ευθειασ ποι'
        },
        {
          text: 'ειτε τασ τριβουσ αυτου εγενετο ιω'
        }
      ]
    },
    4: {
      manifestId: 'https://www.e-codices.unifr.ch/metadata/iiif/csg-0048/manifest.json',
      canvasIndex: 78,
      specialIndexHandlingStart: '_',
      specialIndexHandlingEnd: '.json',
      canvasIndexToPageNumberAdj: -2,
      instruction:
        "Welcome to an intralinear Greek-Latin diglot. Don't worry, you only need to transcribe the Greek. You should feel comfortable transitioning to the semi-majuscule letter forms, so this will mostly be an exercise in attention to detail and ignoring extraneous material. Skip the initial κατα.",
      lines: [
        {
          text: 'και το δανιον αφηκεν αυτω εξελθων δε ο δουλοσ εκεινοσ'
        },
        {
          text: 'ευρεν ενα των συνδουλων αυτου οσ ωφειλεν αυτω εκατον'
        },
        {
          text: 'δηναρια και κρατησασ αυτον επνιγεν λεγων αποδοσ μοι'
        },
        {
          text: 'ει τι οφειλεισ πεσων ουν ο συνδουλοσ αυτου εισ τουσ'
        },
        {
          text: 'ποδασ αυτου παρεκαλει αυτον λεγων μακροθυμησον'
        },
        {
          text: 'επε μοι και αποδωσω σοι ο δε ουκ ηθελεν αλλ απελ'
        },
        {
          text: 'θων εβαλεν αυτον εισ φυλακην εωσ ου αποδω το οφειλο'
        },
        {
          text: 'μενον ιδοντεσ δε οι συνδουλοι αυτου τα γενομενα'
        },
        {
          text: 'ελυπηθησαν σφοδρα και ελθοντεσ διεσαφησαν τω κω'
        },
        {
          text: 'εαυτων παντα γενομενα τοτε προσκαλεσαμενοσ αυτον'
        },
        {
          text: 'ο κυριοσ αυτου λεγει αυτω δουλε πονηρε πασαν την'
        },
        {
          text: 'οφειλην εκεινη αφηκα σοι επει παρεκαλεσασ με ουκ εδει και σε'
        },
        {
          text: 'ελεησαι τον συνδουλον σου ωσ και ετω σε ηλεησα και'
        },
        {
          text: 'οργισθεισ ο κυριοσ αυτου παρεδωκεν αυτον τοισ βασανισταισ'
        },
        {
          text: 'εωσ ου αποδω παν το οφειλομενον αυτω ουτωσ και ο πηρ',
          caption:
            'Be careful with one of the vowels on this line. Consult other examples on the page.'
        },
        {
          text: 'μου ο επουρανιοσ ποιησει υμιν εαν μη αφητε εκατοσ'
        },
        {
          text: 'τω αδελφω αυτου απο των καρδιων υμων τα παραπτωμα'
        },
        {
          text: 'τα αυτων και εγενετο οτε ετελεσεν ο ισ τουσ λογουσ του'
        },
        {
          text: 'τουσ μετηρεν απο τησ γαλιλαιασ και ηλθεν εισ τα ορια'
        },
        {
          text: 'τησ ιουδαιασ περαν του ιορδανου και ηκολουθησαν αυ'
        },
        {
          text: 'τω οχλοι πολλοι και εθεραπευσεν αυτουσ εκει περι'
        },
        {
          text: 'των επερωτησαντων ει εξεστιν απολυσαι την'
        }
      ]
    },
    5: {
      manifestId: 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00058840/manifest',
      canvasIndex: 51,
      instruction:
        "This lesson features a relatively easy to read decorative semi-uncial text but introduces ligatures, abbreviations, and numbers, so be sure to consult the 'Online resources' under the Help tab for resources to help interpret these. This is a page of kephalaia (ancient chapter divisions) where each line contains a Greek number and then a short title for that section. Many lines begin with an abbreviation for περι (the stacked πε).",
      lines: [
        {
          text: 'α περι των μαγων',
          newConcept: 'Numbers',
          caption:
            'Like nomina sacra and abbreviations, transcribe numbers as they appear in the manuscript.'
        },
        {
          text: 'β περι των αναιρεθεντων παιδιων'
        },
        {
          text: 'γ πρωτοσ ιωαννησ εκηρυξεν βασιλειαν ουνω',
          caption: 'The end of this line features a nomen sacrum plus final nu.'
        },
        {
          text: 'δ περι διδασκαλιασ του σρσ',
          newConcept: 'Ligature',
          caption:
            'Note the ligature here contains parts of two words. Unlike nomina sacra, abbreviations, and numbers, ligatures should always be transcribed for what they represent. This one is more obviously two letters, but in later lessons you may see single strokes representing three or more letters.'
        },
        {
          text: 'ε περι των μακαρισμων'
        },
        {
          text: 'ϛ περι του λεπρου',
          newConcept: 'Stigma',
          caption: 'As a number, transcribe as the single letter.'
        },
        {
          text: 'ζ περι του εκατονταρχου'
        },
        {
          text: 'η περι τησ πενθερασ πετρου'
        },
        {
          text: 'θ περι των ιαθεντων απο ποικιλων νοσων'
        },
        {
          text: 'ι περι του μη επιτρεπομενου ακολουθειν'
        },
        {
          text: 'ια περι τησ επιτημησεωσ των υδατων'
        },
        {
          text: 'ιβ περι των δαιμονιζωμενων'
        },
        {
          text: 'ιγ περι του παραλυτικου'
        },
        {
          text: 'ιδ περι ματθαιου'
        },
        {
          text: 'ιε περι τησ θυγατροσ του αρχησυναγωγου',
          newConcept: 'Abbreviation',
          caption: 'This abbreviation results in a variant reading.'
        },
        {
          text: 'ιϛ περι τησ αιμορροουσησ'
        },
        {
          text: 'ιζ περι των δυο τυφλων',
          caption: 'Be careful with the letter after δυ; it appears to be damaged.'
        },
        {
          text: 'ιη περι κωφου δαιμονιζομενου'
        },
        {
          text: 'ιθ περι τησ των αποστολων διαταγησ',
          caption: 'The large abbreviation/ligature is for αποστολων'
        },
        {
          text: 'κ περι των αποσταλεντων παρα ιωαννου'
        }
      ]
    },
    6: {
      manifestId: 'https://viewer.cbl.ie/viewer/api/v2/records/MP_2_86/manifest',
      canvasIndex: 2,
      specialIndexHandlingStart: 'pages/',
      instruction:
        'This manuscript features more irregular letter forms than you have seen so far. Be particularly careful with letters that might easily be confused for others.',
      lines: [
        {
          text: 'κουσατε μου και ζησεται ε'
        },
        {
          text: 'ν αγαθοισ η ψυχη υμων και'
        },
        {
          text: 'διαθησομαι υμιν διαθη'
        },
        {
          text: 'κην αιωνιον τα οσια δαυιδ',
          caption:
            "There's a correction on this line after the tau. It looks as if the scribe skipped a letter, starting writing the next word for two letters, then made the correction. Transcribe these two letters as α ο."
        },
        {
          text: 'τα πιστα ιδου μαρτυριαν εν ε',
          caption:
            'After the last alpha on this line, damage to the papyrus has caused a gap in the next letter (in other words, after the last alpha there are only four letters).'
        },
        {
          text: 'θνεσιν αυτον δεδωκα αρχον',
          caption:
            "Another correction here by a later scribe; don't include it in your transcription."
        },
        {
          text: 'τα και προστασσοντα εθνεσιν'
        },
        {
          text: 'εθνη α ουκ ηδεισαν σε επικα'
        },
        {
          text: 'λεσονται σε λαοι οι ουκ επισ'
        },
        {
          text: 'ταντα σε επι σε καταφευξον'
        },
        {
          text: 'ται εινεκεν του θυ σου του'
        },
        {
          text: 'αγιου ισραηλ οτι εδοξασεν',
          caption:
            'The hole on this line affected one whole letter and part of another. Notice the overline indicating this began a nomen sacrum; the following four letters should allow you to figure out the missing letters. Include them in your transcription.',
          newConcept: 'Reconstruction'
        },
        {
          text: 'σε ζητησατε τον θν και εν'
        }
      ]
    },
    7: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Ott.gr.326/manifest.json',
      instruction:
        'An introduction to minuscule featuring dyed parchment and silver letters. The script is fairly clear, upright, and regular and the ligatures are all very common. Consult the resources for minuscules and ligatures on the Online resources help page. Ignore the title in gold at the top of the leaf.',
      canvasIndex: 42,
      lines: [
        {
          text: 'προ εξ ημερων του πασ'
        },
        {
          text: 'χα ηλθεν ο ισ εισ βη',
          caption:
            'Be very careful with the second to last letter. In some scripts, β, μ, ν, and υ are only differentiated by how the "tails" to the lower left and right side of the letters are formed and connect (or not!) to the surrounding letters.'
        },
        {
          text: 'θανιαν οπου ην λα'
        },
        {
          text: 'ζαροσ ο τεθνηκωσ'
        },
        {
          text: 'ον ηγειρεν εκ νεκρων'
        },
        {
          text: 'εποιησαν ουν αυτω'
        },
        {
          text: 'δειπνον εκει και η μαρ'
        },
        {
          text: 'θα διηκονει ο δε λαζα'
        },
        {
          text: 'ροσ εισ ην των ανακει'
        },
        {
          text: 'μενων συν αυτω η ουν'
        },
        {
          text: 'μαρια λαβουσα λι'
        }
      ]
    },
    8: {
      // Edition of Epiphanius: http://khazarzar.skeptik.net/books/panariog.htm
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.503/manifest.json',
      canvasIndex: 56,
      instruction:
        'A slightly more angular form of minuscule featuring evermore ligatures. Transcribe the left column.',
      lines: [
        {
          text: 'δικαιου μονον υψωθησεται'
        },
        {
          text: 'οπερ εστιν πιστισ αληθειασ'
        },
        {
          text: 'διο και τουτον συντριψαντεσ'
        },
        {
          text: 'τη τησ αληθειασ διδασκα'
        },
        {
          text: 'λια επι τασ μετεπειτα διελ'
        },
        {
          text: 'θωμεν θν βοηθον επικαλου'
        },
        {
          text: 'μενοι ω δοξα τιμη και'
        },
        {
          text: 'κρατοσ εισ τουσ αιωνασ'
        },
        {
          text: 'των αιωνων αμην'
        },
        {
          text: 'κατα βασιλειδου'
        },
        {
          text: 'κατα νικολαιτων'
        },
        {
          text: 'πεμπτη η και κε',
          caption:
            'It appears this line originally started "πεντοτε." Try to work out what it has been corrected to. Hint: The first τ and what remains of the next letter now form one letter.'
        },
        {
          text: 'νικολαοσ γεγονεν εισ απο'
        },
        {
          text: 'των επτα διακονων των'
        },
        {
          text: 'εκλελεγμενων υπο των'
        },
        {
          text: 'αποστολων αμα στεφανω'
        },
        {
          text: 'τω αγιω και πρωτομαρτυρι'
        },
        {
          text: 'και προχορω και παρμενα'
        },
        {
          text: 'και τοισ αλλοισ'
        },
        {
          text: 'ουτοσ απο των αντιοχεων'
        },
        {
          text: 'ορμωμενοσ προσηλυτοσ'
        },
        {
          text: 'γινεται μετεπειτα δε κατα'
        },
        {
          text: 'δεξαμενοσ τον περι χυ'
        }
      ]
    },
    9: {
      // helpful edition https://books.google.com/books?id=2c5hAAAAcAAJ&pg=PP118&lpg=PP118&dq=ephrem+syrus+%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82+%CE%BB%CE%BF%CE%B3%CE%BF%CF%82+%CE%B1&source=bl&ots=LeXDEgtDAt&sig=ACfU3U1qoHsw12pFlyLR5Tae8UnNklc6kg&hl=en&sa=X&ved=2ahUKEwif16uHiNH0AhX-Ap0JHUBGA_QQ6AF6BAgYEAM#v=onepage&q=ephrem%20syrus%20%CE%BA%CE%B1%CF%84%CE%B1%CE%BD%CE%B9%CE%BA%CF%84%CE%B9%CE%BA%CE%BF%CF%82%20%CE%BB%CE%BF%CE%B3%CE%BF%CF%82%20%CE%B1&f=false
      manifestId: 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00050975/manifest',
      canvasIndex: 157,
      lines: [
        {
          text: 'λογοσ αυτων κατανυκτικοσ λογοσ α',
          isTitle: true
        },
        {
          text: 'εν μια ουν των ημερων'
        },
        {
          text: 'ορθρου μι αναστασ επορευομην'
        },
        {
          text: 'εγω συν τοισ δυο αδελφοισ εξωθεν'
        },
        {
          text: 'τοισ πολεωσ εδεσων ευλογημενησ'
        },
        {
          text: 'και ειρα τοισ οφθαλμοισ μου εισ τον'
        },
        {
          text: 'ουνον ωσ εσοπρον καθορων λαμπον'
        },
        {
          text: 'τα συν τοισ αστρισ μετα δοξησ επι γησ και'
        },
        {
          text: 'θαυμασασ ελεγον αν αρα ταυτα ουτοσ λα'
        },
        {
          text: 'μποσιν μετα δοξησ δικαιοι και αγιοι ποι'
        },
        {
          text: 'ησαντεσ το θελημα του θυ του αγιου εν'
        },
        {
          text: 'τη ωρα εκεινη οταν ελθη ο κσ ποσω'
        },
        {
          text: 'μαιλον λαμψουσιν φωτι ανεκλαλητω'
        },
        {
          text: 'τησ δοξησ του σρσ παραχριμα δε μνη'
        },
        {
          text: 'σθησ τησ φοβερασ εκεινησ ελευσεωσ'
        }
      ]
    },
    10: {
      manifestId: 'https://viewer.cbl.ie/viewer/api/v1/records/W_143_5_1/manifest/',
      canvasIndex: 2,
      lines: [
        {
          text: 'γεγονεν εν αυτω ζωη ην και η',
          caption: 'The flourish above the line contains two letters.'
        },
        {
          text: 'ζωη ην το φωσ των ανων και'
        },
        {
          text: 'το φωσ εν τη σκοτια φαινει και η'
        },
        {
          text: 'σκοτια αυτο ου κατελαβεν εγενετο'
        },
        {
          text: 'ανοσ απεσταλμενοσ παρα θυ ο'
        },
        {
          text: 'νομα αυτω ιωαννησ ουτοσ ηλθεν'
        },
        {
          text: 'εισ μαρτυριαν ινα μαρτυριση περι'
        },
        {
          text: 'του φωτοσ ινα παντεσ πιστευ'
        },
        {
          text: 'σωσι δι αυτου ουκ ην εκεινοσ το φωσ'
        },
        {
          text: 'αλλ ινα μαρτυριση περι του φωτοσ'
        },
        {
          text: 'ην το φωσ το αληθινον ο φωτι'
        },
        {
          text: 'ζει παντα ανον ερχομενον εισ τον κοσ'
        },
        {
          text: 'μον εν τω κοσμω ην και ο κοσμοσ',
          caption: 'A new form of the και compendium appears here and several more times below.'
        },
        {
          text: 'δι αυτου εγενετο και ο κοσμοσ αυτον'
        },
        {
          text: 'ουκ εγνω εισ τα ιδια ηλθε και'
        },
        {
          text: 'οι ιδιοι αυτον ου παρελαβον ο'
        },
        {
          text: 'σοι δε ελαβον αυτον εδωκεν'
        },
        {
          text: 'αυτοισ εξουσιαν τεκνα θεου γενεσ'
        },
        {
          text: 'θαι τοισ πιστευουσιν εισ το ονομα αυτου'
        },
        {
          text: 'οι ουκ εξ αιματων ουδε εκ θε'
        },
        {
          text: 'ληματοσ σαρκοσ ουδε εκ θεληματοσ',
          caption: 'There are four letters being abbreviated after the last μ.'
        },
        {
          text: 'ανδροσ αλλ εκ θεου εγεννηθησαν'
        },
        {
          text: 'και ο λογοσ σαρξ εγενετο και εσκη'
        },
        {
          text: 'νωσεν εν ημιν και εθεασαμεθα την'
        },
        {
          text: 'δοξαν αυτου δοξαν ωσ μονογε'
        },
        {
          text: 'νουσ παρα πρσ πληρησ χαριτοσ'
        },
        {
          text: 'και αληθειασ ιωαννησ μαρτυρει'
        },
        {
          text: 'περι αυτου κεκεκραγε λεγων'
        },
        {
          text: 'ουτοσ ην ον ειπον ο οπισω μου'
        }
      ]
    },
    11: {
      // Lines 153-179 of Aristophanes, The Clouds. Diglot: https://scaife.perseus.org/reader/urn:cts:greekLit:tlg0019.tlg003.perseus-eng2:0-1200?right=perseus-grc2
      manifestId: 'https://api.digitale-sammlungen.de/iiif/presentation/v2/bsb00069327/manifest',
      canvasIndex: 65,
      instruction:
        'Ignore the text in red. These indicate changes in character in the play; see if you can figure out the abbreviations.',
      lines: [
        {
          text: 'ω ζευ βασιλευ τησ λεπτοτητοσ των φρενων'
        },
        {
          text: 'τι δητ αν ετερον ει πυθοιο σωκρατουσ',
          caption: 'There is a correction by the original scribe on this line.'
        },
        {
          text: 'φροντισμα ποιον αντιβολω κατειπε μοι'
        },
        {
          text: 'ανηρετ αυτον χαιρεφων ο σφηττιοσ οποτερα'
        },
        {
          text: 'την γνωμην εχει τασ εμπιδασ κατα το στομ αδειν η',
          caption:
            'The 17th character in this line may be hard to identify; it appears twice in slightly more regular ligature appearance on line 1. You will see it again on the following lines.'
        },
        {
          text: 'κατα τουρροπυγιον τι δητ εκεινοσ ειπε περι τησ εμπιδοσ'
        },
        {
          text: 'εφασκεν ειναι τουντερον τησ εμπιδοσ'
        },
        {
          text: 'στενον δια λεπτου δ οντοσ αυτου την πνοην'
        },
        {
          text: 'βια βαδιζειν ευθυ τουρροπυγιου'
        },
        {
          text: 'επειτα κοιλον προσ στενω προσκειμενον'
        },
        {
          text: 'τον πρωκτον ηχειν υπο τησ βιασ του πνευματοσ'
        },
        {
          text: 'σαλπιγξ ο πρωκτοσ εστιν αρα των εμπιδων'
        },
        {
          text: 'ω τρισμακαριοι του διεντερευματοσ'
        },
        {
          text: 'η ραδιωσ φευγων αν αποφυγοι δικην'
        },
        {
          text: 'οστισ διοιδε τουντερον τησ εμπιδοσ'
        },
        {
          text: 'πρωην δε γε γνωμην μεγαλην αφηρεθη'
        },
        {
          text: 'υπ ασκαλαβωτου τινα τροπον κατειπε μοι'
        },
        {
          text: 'ζητουντοσ αυτου τησ σεληνησ τασ οδουσ'
        },
        {
          text: 'και τασ περιφορασ ειτ ανω κεχηνοτοσ'
        },
        {
          text: 'απο τησ οροφησ νυκτωρ γαλεωτησ κατεχεσεν'
        },
        {
          text: 'ησθην γαλεωτη καταχεσαντι σωκρατουσ'
        },
        {
          text: 'εχθεσ δε γ ημιν δειπνον ουκ ην εσπερασ'
        },
        {
          text: 'ειεν τι ουν προσ ταλφιτ επαλαμησατο'
        },
        {
          text: 'κατα τησ τραπεζησ καταπασασ λεπτην τεφραν'
        },
        {
          text: 'καμψασ οβελισκον ειτα διαβητην λαβων'
        },
        {
          text: 'εκ τησ παλαιστρασ θοιματιον υφειλετο'
        }
      ]
    },
    12: {
      // Transcription (which has errors): https://spotlight.vatlib.it/greek-paleography/catalog/71fcddac-57f2-4a02-a97a-35469f00ba9b
      // Commentary on the script: https://spotlight.vatlib.it/greek-paleography/feature/2-introduction-to-minuscule-bookhands)
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.2200/manifest.json',
      canvasIndex: 277,
      instruction:
        'The minuscule scripts you have worked through so far have been of the "Studite" variety. However, in the early development of minuscule script there were other contenders. The manuscript in this exercise features one of them: the "Hagiopolitan" script.',
      lines: [
        {
          text: 'λαττουσα και τουτοισ ακολουθει καθαπερ νο'
        },
        {
          text: 'μοισ τισιν αρραγεσι και αλισκεσθαι μη δυ'
        },
        {
          text: 'ναμενοισ πορρω φευγουσα την ευτυχε'
        },
        {
          text: 'οσ μανιαν και το βλασφημον νεστοριου'
        },
        {
          text: 'στομα μακραν εαυτησ απωθουμενη και'
        },
        {
          text: 'κατηγορουσα τησ τουτου θρασυτητοσ'
        },
        {
          text: 'ωσπερ οι σοφοι εκεινοι και τησ πιστεωσ συ'
        },
        {
          text: 'νηγοροι οτι δε ουτωσ εχει και τουτον οι πρσ'
        },
        {
          text: 'εκεινοι μετα τησ αληθειασ προειλαντο'
        },
        {
          text: 'τον αγωνα κοινον χαριζομενοι κερδοσ'
        },
        {
          text: 'εξ αυτησ τησ υποθεσεωσ εξεστι μαθειν και σα'
        },
        {
          text: 'φη την μαρτυριαν λαμβανειν παντα'
        },
        {
          text: 'γαρ τα αυτων συναγαγοντεσ και παραλληλα'
        },
        {
          text: 'θεντεσ εκεινοισ προστεθηκαμεν τοισ'
        },
        {
          text: 'βουλομενοισ ορθωσ εξεταζειν και την αλη'
        },
        {
          text: 'θειαν διαγινωσκειν τοισ λεγομενοισ'
        },
        {
          text: 'τοινυν προσεχοντεσ ραδιαν ληψεσθε'
        },
        {
          text: 'την αποδειξιν ωσ ουδε κατα μικρον εκ'
        },
        {
          text: 'βεβηκε τησ ορθησ των αγιων πρων δο'
        },
        {
          text: 'ξησ η εν χαλκηδονι γενομενη αγια συνοδοσ'
        },
        {
          text: 'εκθεσισ περι πιστεωσ τησ αγιασ συνοδου'
        },
        {
          text: 'τησ εν χαλκηδονι συναθροισθεισησ',
          caption:
            'The full form of the abbreviation on this line appears on the last line of minuscule script above.'
        },
        {
          text: 'των χλ αγιων πρων'
        },
        {
          text: 'επομενοι τοινυν τοισ αγιοισ πρασιν ενα και'
        },
        {
          text: 'τον αυτον ομολογειν υν τον κν ημων ιν χν συμ'
        },
        {
          text: 'φωνωσ απαντεσ εκδιδασκομεν'
        },
        {
          text: 'κυριλλου εκ τησ προσ σουκενσον επιστολησ',
          caption: 'The abbreviation here is "κυριλλου"'
        },
        {
          text: 'εδιδαχθημεν παρα τε τησ θειασ γραφησ'
        },
        {
          text: 'και των αγιων πρων ενα υν και χν ομολογειν'
        },
        {
          text: 'τησ συνοδου'
        }
      ]
    }
  },
  [ManifestSets.UoEDiv]: {
    1: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1243,
      instruction: 'This lesson is about the left column.',
      lines: [
        {
          text: 'λυμων και ιουδαιασ και',
          caption:
            'The line ends with a decorative kappa; this is a "και compendium." Write it out in full.',
          newConcept: 'Abbreviation'
        },
        {
          text: 'περαν του ιορδανου'
        },
        {
          text: 'ιδων δε τουσ οχλουσ',
          caption:
            'Chapter 5 begins on this line with the kephalaia number, ΚΓ, followed by the outdented iota. Do not include the ΚΓ in your transcription.',
          newConcept: 'Numbers'
        },
        {
          text: 'ανεβη εισ το οροσ και'
        },
        {
          text: 'καθισαντοσ αυτου'
        },
        {
          text: 'προσηλθαν οι μαθηται',
          caption:
            'There is an intralinear letter on this line; it is by a later corrector and suggests a variant reading. Do not include it.'
        },
        {
          text: 'αυτου και ανοιξασ το'
        },
        {
          text: 'στομα αυτου εδιδα'
        },
        {
          text: 'σκεν αυτουσ λεγων'
        },
        {
          text: 'μακαριοι οι πτωχοι τω'
        },
        {
          text: 'πνευματι οτι αυτων',
          newConcept: 'Final nu'
        },
        {
          text: 'εστιν η βασιλεια των'
        },
        {
          text: 'ουρανων'
        },
        {
          text: 'μακαριοι οι πενθουντεσ'
        },
        {
          text: 'οτι αυτοι παρακληθη'
        },
        {
          text: 'σονται'
        },
        {
          text: 'μακαριοι οι πραεισ οτι'
        },
        {
          text: 'αυτοι κληρονομησου'
        },
        {
          text: 'σι την γην'
        },
        {
          text: 'μακαριοι οι πεινωντεσ'
        },
        {
          text: 'και διψωντεσ την δι'
        },
        {
          text: 'καιοσυνην οτι αυτοι'
        },
        {
          text: 'χορτασθησονται'
        },
        {
          text: 'μακαριοι οι ελεημονεσ'
        },
        {
          text: 'οτι αυτοι ελεηθησον'
        },
        {
          text: 'ται'
        },
        {
          text: 'μακαριοι οι καθαροι τη'
        },
        {
          text: 'καρδια οτι αυτοι τον'
        },
        {
          text: 'θν οψονται',
          newConcept: 'Nomina sacra',
          caption: 'Leave the nomen sacrum abbreviated in your transcription.'
        },
        {
          text: 'μακαριοι οι ειρηνοποιοι'
        },
        {
          text: 'οτι αυτοι υιοι θυ κλη'
        },
        {
          text: 'θησονται'
        },
        {
          text: 'μακαριοι οι δεδιωγμενοι'
        },
        {
          text: 'ενεκα δικαιοσυνησ ο'
        },
        {
          text: 'τι αυτων εστιν η βασι'
        },
        {
          text: 'λεια των ουρανων'
        },
        {
          text: 'μακαριοι εστε οταν ονει'
        },
        {
          text: 'δισωσιν υμασ και διω'
        },
        {
          text: 'ξωσιν και ειπωσιν παν',
          caption:
            'A later corrector partially erased the two final nus on this line; leave them in your transcription.'
        },
        {
          text: 'πονηρον καθ υμων'
        },
        {
          text: 'ψευδομενοι ενεκα ε'
        },
        {
          text: 'μου χαιρετε και αγαλ'
        }
      ]
    },
    2: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1243,
      instruction: 'This lesson is about the middle column.',
      lines: [
        {
          text: 'λιασθε οτι ο μισθοσ υ'
        },
        {
          text: 'μων πολυσ εν τοισ ου'
        },
        {
          text: 'ρανοισ ουτωσ γαρ εδι'
        },
        {
          text: 'ωξαν τουσ προφητασ'
        },
        {
          text: 'τουσ προ υμων υμεισ'
        },
        {
          text: 'εστε το αλασ τησ γησ'
        },
        {
          text: 'αν δε το αλασ μωραν'
        },
        {
          text: 'θη εν τινι αλισθησεται'
        },
        {
          text: 'εισ ουδεν ισχυει ετι'
        },
        {
          text: 'ει μη βληθεν εξω κατα'
        },
        {
          text: 'πατεισθαι υπο των αν'
        },
        {
          text: 'θρωπων'
        },
        {
          text: 'υμεισ εστε το φωσ του'
        },
        {
          text: 'κοσμου ου δυναται πο'
        },
        {
          text: 'λισ κρυβηναι επανω ο'
        },
        {
          text: 'ρουσ κειμενη ουδε και'
        },
        {
          text: 'ουσιν λυχνον και τιθε'
        },
        {
          text: 'ασιν αυτον υπο τον μο'
        },
        {
          text: 'διον αλλ επι την λυχνι'
        },
        {
          text: 'αν και λαμπει πασι τοισ'
        },
        {
          text: 'εν τη οικια ουτωσ λαμ'
        },
        {
          text: 'ψατω το φωσ υμων'
        },
        {
          text: 'εμπροσθεν των ανθρω'
        },
        {
          text: 'πων οπωσ ιδωσιν υμων'
        },
        {
          text: 'τα καλα και δοξασωσιν δοξασωσι δοξασωσιν'
        },
        {
          text: 'τον πατερα υμων τον'
        },
        {
          text: 'εν τοισ ουρανοισ'
        },
        {
          text: 'μη νομισητε οτι ηλθον'
        },
        {
          text: 'καταλυσαι τον νομον'
        },
        {
          text: 'η τουσ προφητασ ου'
        },
        {
          text: 'κ ηλθον καταλυσαι αλ'
        },
        {
          text: 'λα πληρωσαι αμην γαρ'
        },
        {
          text: 'λεγω υμιν εωσ αν παρελ'
        },
        {
          text: 'θη ο ουρανοσ και η γη ι'
        },
        {
          text: 'ωτα εν η μια κερεα ου μη'
        },
        {
          text: 'παρελθη απο του νομου'
        },
        {
          text: 'εωσ παντα γενηται'
        },
        {
          text: 'οσ εαν ουν λυση μιαν'
        },
        {
          text: 'των εντολων τουτων'
        },
        {
          text: 'των ελαχιστων και δι'
        },
        {
          text: 'δαξη ουτωσ τουσ αν'
        },
        {
          text: 'θρωπουσ ελαχιστοσ'
        }
      ]
    },
    3: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1243,
      instruction: 'This lesson is about the right column.',
      lines: [
        {
          text: 'κληθησεται εν τη βασι'
        },
        {
          text: 'λεια των ουρανων οσ'
        },
        {
          text: 'δ αν ποιηση και διδαξη'
        },
        {
          text: 'ουτοσ μεγασ κληθησε'
        },
        {
          text: 'ται εν τη βασιλεια των'
        },
        {
          text: 'ουρανων λεγω γαρ υ'
        },
        {
          text: 'μιν οτι εαν μη περισευ'
        },
        {
          text: 'ση υμων η δικαιοσυνη'
        },
        {
          text: 'πλειον των γραμματε'
        },
        {
          text: 'ων και φαρεισαιων ου'
        },
        {
          text: 'η εισελθητε εισ την'
        },
        {
          text: 'βασιλειαν των ουρανων'
        },
        {
          text: 'ηκουσατε οτι ερρεθη'
        },
        {
          text: 'τοισ αρχαιοισ ου φο'
        },
        {
          text: 'νευσεισ οσ δ αν φονευ'
        },
        {
          text: 'ση ενοχοσ εσται τη κρι'
        },
        {
          text: 'σει εγω δε λεγω υμιν'
        },
        {
          text: 'οτι πασ ο οργιζομενοσ'
        },
        {
          text: 'τω αδελφω αυτου ενο'
        },
        {
          text: 'χοσ εσται τη κρισει οσ'
        },
        {
          text: 'δ αν ειπη τω αδελφω'
        },
        {
          text: 'αυτου ρακα ενοχοσ ε'
        },
        {
          text: 'σται τω συνεδριω οσ'
        },
        {
          text: 'δ αν ειπη μωρε ενοχοσ'
        },
        {
          text: 'εσται εισ την γεενναν'
        },
        {
          text: 'του πυροσ εαν ουν προσ'
        },
        {
          text: 'φερησ το δωρον σου ε'
        },
        {
          text: 'πι το θυσιαστηριον κα'
        },
        {
          text: 'κει μνησθησ οτι ο αδελ'
        },
        {
          text: 'φοσ σου εχει τι κατα'
        },
        {
          text: 'σου αφεσ εκει το δωρον'
        },
        {
          text: 'σου εμπροσθεν του'
        },
        {
          text: 'θυσιαστηριου και υπα'
        },
        {
          text: 'γε πρωτον διαλλαγη'
        },
        {
          text: 'θι τω αδελφω σου και'
        },
        {
          text: 'οτε ελθων προσφε'
        },
        {
          text: 'ρε το δωρον σου ισθι'
        },
        {
          text: 'ευνοων τω αντιδικω'
        },
        {
          text: 'σου ταχυ εωσ οτου ει'
        },
        {
          text: 'μετ αυτου εν τη οδω'
        },
        {
          text: 'μηποτε σε παραδω ο'
        },
        {
          text: 'αντιδικοσ τω κριτη'
        }
      ]
    },
    4: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1244,
      instruction: 'This lesson is about the left column.',
      lines: [
        {
          text: 'και ο κριτησ τω υπηρε'
        },
        {
          text: 'τη και εισ φυλακην βλη'
        },
        {
          text: 'θηση αμην λεγω σοι'
        },
        {
          text: 'ου μη εξελθησ εκειθεν'
        },
        {
          text: 'εωσ αν αποδωσ τον ε'
        },
        {
          text: 'σχατον κοδραντην'
        },
        {
          text: 'ηκουσατε οτι ερρεθη'
        },
        {
          text: 'ου μοιχευσεισ εγω δε'
        },
        {
          text: 'λεγω υμιν οτι πασ ο βλε'
        },
        {
          text: 'πων γυναικα προσ το'
        },
        {
          text: 'επιθυμησαι αυτην η'
        },
        {
          text: 'δη εμοιχευσεν αυτην'
        },
        {
          text: 'εν τη καρδια εαυτου'
        },
        {
          text: 'ει δε ο οφθαλμοσ σου'
        },
        {
          text: 'ο δεξιοσ σκανδαλιζει'
        },
        {
          text: 'σε εξελε αυτον και βα'
        },
        {
          text: 'λε απο σου συμφερει'
        },
        {
          text: 'αρ σοι ινα αποληται'
        },
        {
          text: 'εν των μελων σου και'
        },
        {
          text: 'μη ολον το σωμα σου'
        },
        {
          text: 'βληθη εισ γεενναν και'
        },
        {
          text: 'ει η δεξια σου χειρ σκαν'
        },
        {
          text: 'δαλιζει σε εκκοψον αυ'
        },
        {
          text: 'την και βαλε απο σου'
        },
        {
          text: 'συμφερει γαρ σοι ινα'
        },
        {
          text: 'αποληται εν των με'
        },
        {
          text: 'λων σου και μη ολον το'
        },
        {
          text: 'σωμα σου εισ γεενναν'
        },
        {
          text: 'απελθη ερρεθη δε οσ'
        },
        {
          text: 'αν απολυση την γυναι'
        },
        {
          text: 'κα αυτου δοτω αυτη'
        },
        {
          text: 'αποστασιον εγω δε λε'
        },
        {
          text: 'γω υμιν οτι πασ ο απο'
        },
        {
          text: 'λυων την γυναικα αυ'
        },
        {
          text: 'του παρεκτοσ λογου'
        },
        {
          text: 'πορνειασ ποιει αυτην'
        },
        {
          text: 'μοιχευθηναι και ο απο'
        },
        {
          text: 'λελυμενην γαμησασ'
        },
        {
          text: 'μοιχαται'
        },
        {
          text: 'παλιν ηκουσαται οτι ερ'
        },
        {
          text: 'ρεθη τοισ αρχαιοισ ου'
        },
        {
          text: 'κ επιορκησεισ αποδω'
        }
      ]
    },
    5: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1244,
      instruction: 'This lesson is about the middle column.',
      lines: [
        {
          text: 'σεισ δε τω κω τουσ ορ'
        },
        {
          text: 'κουσ σου εγω δε λεγω υ'
        },
        {
          text: 'μιν μη ομοσαι ολωσ μη'
        },
        {
          text: 'τε εν τω ουρανω οτι θρο'
        },
        {
          text: 'νοσ εστιν του θυ μητε'
        },
        {
          text: 'εν τη γη οτι υποποδιον'
        },
        {
          text: 'εστιν των ποδων αυτου'
        },
        {
          text: 'μητε εισ ιεροσολυμα'
        },
        {
          text: 'οτι πολισ εστιν του με'
        },
        {
          text: 'γαλου βασιλεωσ μητε'
        },
        {
          text: 'εν τη κεφαλη σου ομο'
        },
        {
          text: 'σησ οτι ου δυνασαι μιαν'
        },
        {
          text: 'τριχα λευκην ποιησαι'
        },
        {
          text: 'η μελαιναν εσται δε ο'
        },
        {
          text: 'λογοσ υμων ναι ναι ου'
        },
        {
          text: 'ου το δε περισον του'
        },
        {
          text: 'των εκ του πονηρου ε'
        },
        {
          text: 'στιν'
        },
        {
          text: 'ηκουσατε οτι ερρεθη ο'
        },
        {
          text: 'φθαλμον αντι οφθαλ'
        },
        {
          text: 'μου και οδοντα αντι'
        },
        {
          text: 'οδοντοσ εγω δε λεγω'
        },
        {
          text: 'υμιν μη αντιστηναι τω'
        },
        {
          text: 'πονηρω αλλ οστισ σε'
        },
        {
          text: 'ραπιζει εισ την δεξιαν'
        },
        {
          text: 'σιαγονα σου στρεψον'
        },
        {
          text: 'αυτω και την αλλην και'
        },
        {
          text: 'τω θελοντι σοι κριθη'
        },
        {
          text: 'ναι και τον χιτωνα σου'
        },
        {
          text: 'λαβειν αφεσ αυτω και'
        },
        {
          text: 'το ιματιον και οστισ σε'
        },
        {
          text: 'αγγαρευσει μειλιον εν'
        },
        {
          text: 'υπαγε μετ αυτου δυο'
        },
        {
          text: 'τω αιτουντι σε δοσ και'
        },
        {
          text: 'τον θελοντα απο σου'
        },
        {
          text: 'δανισασθαι μη αποστρα'
        },
        {
          text: 'φησ'
        },
        {
          text: 'ηκουσατε οτι ερρεθη αγα'
        },
        {
          text: 'πησεισ τον πλησιον σου'
        },
        {
          text: 'και μεισησεισ τον εχθρον'
        },
        {
          text: 'σου εγω δε λεγω υμιν'
        },
        {
          text: 'αγαπατε τουσ εχθρουσ'
        }
      ]
    },
    6: {
      manifestId: 'https://digi.vatlib.it/iiif/MSS_Vat.gr.1209/manifest.json',
      canvasIndex: 1244,
      instruction: 'This lesson is about the right column.',
      lines: [
        {
          text: 'υμων και προσευχε'
        },
        {
          text: 'σθε υπερ των διωκον'
        },
        {
          text: 'των υμασ οπωσ γενη'
        },
        {
          text: 'σθε υιοι του πατροσ υ'
        },
        {
          text: 'μων του εν ουρανοισ'
        },
        {
          text: 'οτι τον ηλιον αυτου'
        },
        {
          text: 'ανατελλει επι πονη'
        },
        {
          text: 'ρουσ και αγαθουσ και'
        },
        {
          text: 'βρεχει επι δικαιουσ και'
        },
        {
          text: 'αδικουσ εαν γαρ αγαπη'
        },
        {
          text: 'σητε τουσ αγαπωντασ'
        },
        {
          text: 'υμασ τινα μισθον εχε'
        },
        {
          text: 'τε ουχι και οι τελωναι'
        },
        {
          text: 'το αυτο ποιουσι και εαν'
        },
        {
          text: 'ασπασησθε τουσ αδελ'
        },
        {
          text: 'φουσ υμων μονον τι'
        },
        {
          text: 'περισον ποιειτε ου'
        },
        {
          text: 'χι και οι εθνικοι το αυ'
        },
        {
          text: 'το ποιουσιν εσεσθε ουν'
        },
        {
          text: 'υμεισ τελειοι ωσ ο πα'
        },
        {
          text: 'τηρ υμων ο ουρανιοσ'
        },
        {
          text: 'τελειοσ εστιν'
        },
        {
          text: 'προσεχετε την δικαι'
        },
        {
          text: 'οσυνην υμων μη ποι'
        },
        {
          text: 'ειν εμπροσθεν των αν'
        },
        {
          text: 'θρωπων προσ το θεα'
        },
        {
          text: 'θηναι αυτοισ ει δε μη'
        },
        {
          text: 'γε μισθον ουκ εχετε'
        },
        {
          text: 'παρα τω πατρι υμων'
        },
        {
          text: 'τω εν τοισ ουρανοισ'
        },
        {
          text: 'οταν ουν ποιησ ελεη'
        },
        {
          text: 'μοσυνην μη σαλπισησ'
        },
        {
          text: 'εμπροσθεν σου ωσπερ'
        },
        {
          text: 'οι υποκριται ποιουσιν'
        },
        {
          text: 'εν ταισ συναγωγαισ και'
        },
        {
          text: 'εν ταισ ρυμαισ οπωσ'
        },
        {
          text: 'δοξασθωσιν υπο των'
        },
        {
          text: 'ανθρωπων αμην λεγω'
        },
        {
          text: 'υμιν απεχουσιν τον μι'
        },
        {
          text: 'σθον αυτων σου δε ποι'
        },
        {
          text: 'ουντοσ ελεημοσυνην'
        },
        {
          text: 'μη γνωτω η αριστερα'
        }
      ]
    }
  }
};

export default manifests;
