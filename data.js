/**
 * Bible Sequence — content dataset
 * -----------------------------------------------------------------------
 * This is the ONLY file that contains Bible content. The game engine
 * (engine.js) and the UI (app.js) never hard-code a story or event —
 * everything is read from here.
 *
 * Each story has exactly 4 chronological events, a category
 * (OLD_TESTAMENT / NEW_TESTAMENT), a subcategory, a difficulty rating
 * (1 = easy, 2 = moderate, 3 = difficult), and a short description that
 * is revealed to the player only after they lock in their answer.
 *
 * References are shown to the player only after they lock in an answer —
 * showing them beforehand would give away the correct order.
 *
 * Content notes:
 *   - Only sequences where Scripture's order is reasonably clear are used.
 *   - Event text and descriptions are original summaries, not quoted text.
 *   - No invented events and no invented references.
 *
 * To add more stories later: add another object to STORIES with the same
 * shape (exactly 4 events). Nothing else needs to change — the engine and
 * UI are entirely data-driven.
 */

const STORIES = [
  {
    "key": "creation",
    "name": "Creation",
    "category": "OLD_TESTAMENT",
    "subcategory": "Creation",
    "difficulty": 1,
    "description": "In the beginning, God speaks the universe into existence over six days, then rests on the seventh. It establishes God as Creator and sets the pattern for the Sabbath rest that runs throughout Scripture.",
    "events": [
      {
        "id": "creation-1",
        "text": "Light is separated from darkness",
        "reference": "Genesis 1:3-5",
        "sequence": 1
      },
      {
        "id": "creation-2",
        "text": "Sky, land, and vegetation are formed",
        "reference": "Genesis 1:6-13",
        "sequence": 2
      },
      {
        "id": "creation-3",
        "text": "Sun, moon, stars, sea creatures, and land animals are made",
        "reference": "Genesis 1:14-25",
        "sequence": 3
      },
      {
        "id": "creation-4",
        "text": "Humanity is created and God rests on the seventh day",
        "reference": "Genesis 1:26-2:3",
        "sequence": 4
      }
    ]
  },
  {
    "key": "fall_of_man",
    "name": "The Fall of Man",
    "category": "OLD_TESTAMENT",
    "subcategory": "Creation",
    "difficulty": 1,
    "description": "Adam and Eve, given one restriction in a perfect garden, are tempted into the one act God forbade. Their disobedience brings shame, blame, and separation from Eden, setting up humanity's need for redemption.",
    "events": [
      {
        "id": "fall_of_man-1",
        "text": "The serpent tempts Eve to eat the forbidden fruit",
        "reference": "Genesis 3:1-5",
        "sequence": 1
      },
      {
        "id": "fall_of_man-2",
        "text": "Adam and Eve eat the fruit and realize they are naked",
        "reference": "Genesis 3:6-7",
        "sequence": 2
      },
      {
        "id": "fall_of_man-3",
        "text": "God confronts them and pronounces judgment",
        "reference": "Genesis 3:8-19",
        "sequence": 3
      },
      {
        "id": "fall_of_man-4",
        "text": "Adam and Eve are expelled from the garden",
        "reference": "Genesis 3:22-24",
        "sequence": 4
      }
    ]
  },
  {
    "key": "cain_and_abel",
    "name": "Cain and Abel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Genesis",
    "difficulty": 2,
    "description": "The first brothers bring offerings to God with very different results, and jealousy curdles into the Bible's first murder. It's a sobering early picture of sin's power and God's justice tempered with mercy.",
    "events": [
      {
        "id": "cain_and_abel-1",
        "text": "Cain and Abel bring offerings to the Lord",
        "reference": "Genesis 4:3-4",
        "sequence": 1
      },
      {
        "id": "cain_and_abel-2",
        "text": "God accepts Abel's offering but not Cain's",
        "reference": "Genesis 4:4-5",
        "sequence": 2
      },
      {
        "id": "cain_and_abel-3",
        "text": "Cain kills Abel in a field",
        "reference": "Genesis 4:8",
        "sequence": 3
      },
      {
        "id": "cain_and_abel-4",
        "text": "God confronts Cain and marks him for protection",
        "reference": "Genesis 4:9-15",
        "sequence": 4
      }
    ]
  },
  {
    "key": "noah",
    "name": "Noah and the Flood",
    "category": "OLD_TESTAMENT",
    "subcategory": "Genesis",
    "difficulty": 1,
    "description": "As human wickedness fills the earth, God chooses one righteous family to survive a great flood that resets creation. Noah's obedience, and the rainbow that follows, mark God's covenant never to destroy the earth by flood again.",
    "events": [
      {
        "id": "noah-1",
        "text": "God tells Noah to build an ark",
        "reference": "Genesis 6:13-14",
        "sequence": 1
      },
      {
        "id": "noah-2",
        "text": "The flood covers the earth",
        "reference": "Genesis 7:17-20",
        "sequence": 2
      },
      {
        "id": "noah-3",
        "text": "Noah sends a dove and the ark comes to rest",
        "reference": "Genesis 8:8-12",
        "sequence": 3
      },
      {
        "id": "noah-4",
        "text": "God sets a rainbow as a covenant sign",
        "reference": "Genesis 9:12-13",
        "sequence": 4
      }
    ]
  },
  {
    "key": "tower_of_babel",
    "name": "The Tower of Babel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Genesis",
    "difficulty": 2,
    "description": "United by one language, humanity builds a city and tower to make a name for themselves. God confuses their speech and scatters them, a turning point that explains the world's many nations and languages.",
    "events": [
      {
        "id": "tower_of_babel-1",
        "text": "Humanity settles in Shinar and builds a city",
        "reference": "Genesis 11:1-2",
        "sequence": 1
      },
      {
        "id": "tower_of_babel-2",
        "text": "They begin building a tower to reach the heavens",
        "reference": "Genesis 11:3-4",
        "sequence": 2
      },
      {
        "id": "tower_of_babel-3",
        "text": "God confuses their language",
        "reference": "Genesis 11:5-7",
        "sequence": 3
      },
      {
        "id": "tower_of_babel-4",
        "text": "The people are scattered across the earth",
        "reference": "Genesis 11:8-9",
        "sequence": 4
      }
    ]
  },
  {
    "key": "abraham",
    "name": "Abraham's Call",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 1,
    "description": "God calls Abram away from his homeland with a promise: he will become the father of a great nation and a blessing to all peoples. His story becomes the foundation of faith referenced throughout the rest of the Bible.",
    "events": [
      {
        "id": "abraham-1",
        "text": "God calls Abram to leave his homeland",
        "reference": "Genesis 12:1-4",
        "sequence": 1
      },
      {
        "id": "abraham-2",
        "text": "God promises Abram countless descendants",
        "reference": "Genesis 15:5",
        "sequence": 2
      },
      {
        "id": "abraham-3",
        "text": "Abram is renamed Abraham in God's covenant",
        "reference": "Genesis 17:5",
        "sequence": 3
      },
      {
        "id": "abraham-4",
        "text": "Abraham is tested and told to sacrifice Isaac",
        "reference": "Genesis 22:1-2",
        "sequence": 4
      }
    ]
  },
  {
    "key": "sarah",
    "name": "Sarah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 2,
    "description": "Barren for decades, Sarah laughs at God's promise of a son in her old age — then lives to hold him. Her story is about the tension between human doubt and God's ability to keep an impossible promise.",
    "events": [
      {
        "id": "sarah-1",
        "text": "Sarah, barren, gives Hagar to Abraham",
        "reference": "Genesis 16:1-3",
        "sequence": 1
      },
      {
        "id": "sarah-2",
        "text": "Sarah overhears and laughs at God's promise of a son",
        "reference": "Genesis 18:10-12",
        "sequence": 2
      },
      {
        "id": "sarah-3",
        "text": "Sarah gives birth to Isaac in her old age",
        "reference": "Genesis 21:1-3",
        "sequence": 3
      },
      {
        "id": "sarah-4",
        "text": "Sarah has Hagar and Ishmael sent away",
        "reference": "Genesis 21:9-14",
        "sequence": 4
      }
    ]
  },
  {
    "key": "hagar",
    "name": "Hagar",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 3,
    "description": "Mistreated and cast out twice, Hagar is met by God in the wilderness both times. Her story shows God's care for the overlooked and the outsider, even within a family story centered on someone else's promise.",
    "events": [
      {
        "id": "hagar-1",
        "text": "Hagar flees from Sarah's mistreatment",
        "reference": "Genesis 16:6-8",
        "sequence": 1
      },
      {
        "id": "hagar-2",
        "text": "An angel tells Hagar to return and promises Ishmael descendants",
        "reference": "Genesis 16:9-11",
        "sequence": 2
      },
      {
        "id": "hagar-3",
        "text": "Hagar and Ishmael are sent into the wilderness",
        "reference": "Genesis 21:14",
        "sequence": 3
      },
      {
        "id": "hagar-4",
        "text": "God provides water and preserves them",
        "reference": "Genesis 21:17-19",
        "sequence": 4
      }
    ]
  },
  {
    "key": "lot",
    "name": "Lot",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 2,
    "description": "Abraham's nephew chooses the fertile plain near Sodom, gets pulled into its downfall, and has to be rescued twice — once from war, once from fire. His story is a warning about the cost of choosing by sight alone.",
    "events": [
      {
        "id": "lot-1",
        "text": "Lot chooses the fertile plain near Sodom",
        "reference": "Genesis 13:10-11",
        "sequence": 1
      },
      {
        "id": "lot-2",
        "text": "Lot is captured in a war and rescued by Abraham",
        "reference": "Genesis 14:11-16",
        "sequence": 2
      },
      {
        "id": "lot-3",
        "text": "Angels warn Lot to flee before Sodom's destruction",
        "reference": "Genesis 19:15-17",
        "sequence": 3
      },
      {
        "id": "lot-4",
        "text": "Lot escapes as Sodom is destroyed",
        "reference": "Genesis 19:23-26",
        "sequence": 4
      }
    ]
  },
  {
    "key": "sodom_and_gomorrah",
    "name": "Sodom and Gomorrah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 2,
    "description": "The outcry against two notorious cities reaches God, and two angels arrive to investigate in person. What they find confirms the cities' judgment, and only Lot's family escapes the destruction that follows.",
    "events": [
      {
        "id": "sodom_and_gomorrah-1",
        "text": "The outcry against Sodom reaches God",
        "reference": "Genesis 18:20-21",
        "sequence": 1
      },
      {
        "id": "sodom_and_gomorrah-2",
        "text": "Two angels visit Lot in Sodom",
        "reference": "Genesis 19:1",
        "sequence": 2
      },
      {
        "id": "sodom_and_gomorrah-3",
        "text": "The men of the city surround Lot's house",
        "reference": "Genesis 19:4-5",
        "sequence": 3
      },
      {
        "id": "sodom_and_gomorrah-4",
        "text": "God destroys Sodom and Gomorrah with fire and sulfur",
        "reference": "Genesis 19:24-25",
        "sequence": 4
      }
    ]
  },
  {
    "key": "isaac",
    "name": "Isaac",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 2,
    "description": "The quiet, steady link between Abraham and Jacob, Isaac's story centers on the search for a wife within God's covenant family and the birth of twin sons whose rivalry will shape the next generation.",
    "events": [
      {
        "id": "isaac-1",
        "text": "A servant is sent to find Isaac a wife",
        "reference": "Genesis 24:2-4",
        "sequence": 1
      },
      {
        "id": "isaac-2",
        "text": "Isaac marries Rebekah",
        "reference": "Genesis 24:63-67",
        "sequence": 2
      },
      {
        "id": "isaac-3",
        "text": "Rebekah gives birth to twins, Esau and Jacob",
        "reference": "Genesis 25:24-26",
        "sequence": 3
      },
      {
        "id": "isaac-4",
        "text": "Isaac blesses Jacob instead of Esau",
        "reference": "Genesis 27:22-29",
        "sequence": 4
      }
    ]
  },
  {
    "key": "rebekah",
    "name": "Rebekah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 3,
    "description": "Chosen at a well for her generosity, Rebekah becomes Isaac's wife and, decades later, the one who engineers her favorite son's future. Her story is about how far a mother will go for the child she believes is chosen.",
    "events": [
      {
        "id": "rebekah-1",
        "text": "Rebekah offers water to Abraham's servant at the well",
        "reference": "Genesis 24:15-20",
        "sequence": 1
      },
      {
        "id": "rebekah-2",
        "text": "Rebekah agrees to leave and marry Isaac",
        "reference": "Genesis 24:57-58",
        "sequence": 2
      },
      {
        "id": "rebekah-3",
        "text": "Rebekah gives birth to Esau and Jacob after years of barrenness",
        "reference": "Genesis 25:21-26",
        "sequence": 3
      },
      {
        "id": "rebekah-4",
        "text": "Rebekah helps Jacob deceive Isaac for the blessing",
        "reference": "Genesis 27:5-17",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jacob",
    "name": "Jacob",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 2,
    "description": "Cunning and ambitious, Jacob schemes his way into his brother's birthright and blessing, then spends twenty years learning what it's like to be deceived himself. A nighttime wrestling match with God transforms him into Israel.",
    "events": [
      {
        "id": "jacob-1",
        "text": "Jacob buys Esau's birthright for a bowl of stew",
        "reference": "Genesis 25:29-34",
        "sequence": 1
      },
      {
        "id": "jacob-2",
        "text": "Jacob dreams of a stairway to heaven at Bethel",
        "reference": "Genesis 28:10-15",
        "sequence": 2
      },
      {
        "id": "jacob-3",
        "text": "Jacob wrestles with God and is renamed Israel",
        "reference": "Genesis 32:24-28",
        "sequence": 3
      },
      {
        "id": "jacob-4",
        "text": "Jacob reconciles with Esau",
        "reference": "Genesis 33:1-4",
        "sequence": 4
      }
    ]
  },
  {
    "key": "esau",
    "name": "Esau",
    "category": "OLD_TESTAMENT",
    "subcategory": "Patriarchs",
    "difficulty": 3,
    "description": "A skilled hunter who trades his future for a single meal, Esau spends years vowing revenge on the brother who cheated him. His story ends, unexpectedly, in reconciliation rather than the violence everyone feared.",
    "events": [
      {
        "id": "esau-1",
        "text": "Esau sells his birthright for a bowl of stew",
        "reference": "Genesis 25:29-34",
        "sequence": 1
      },
      {
        "id": "esau-2",
        "text": "Esau discovers Jacob has stolen his father's blessing",
        "reference": "Genesis 27:34-36",
        "sequence": 2
      },
      {
        "id": "esau-3",
        "text": "Esau vows to kill Jacob",
        "reference": "Genesis 27:41",
        "sequence": 3
      },
      {
        "id": "esau-4",
        "text": "Esau reconciles with Jacob after years apart",
        "reference": "Genesis 33:4",
        "sequence": 4
      }
    ]
  },
  {
    "key": "joseph",
    "name": "Joseph",
    "category": "OLD_TESTAMENT",
    "subcategory": "Genesis",
    "difficulty": 1,
    "description": "Sold into slavery by his own jealous brothers, Joseph rises from an Egyptian prison to become second-in-command of the nation through his God-given ability to interpret dreams. His story is one of the Bible's clearest pictures of forgiveness.",
    "events": [
      {
        "id": "joseph-1",
        "text": "Joseph's brothers sell him into slavery",
        "reference": "Genesis 37:23-28",
        "sequence": 1
      },
      {
        "id": "joseph-2",
        "text": "Joseph is imprisoned after a false accusation",
        "reference": "Genesis 39:19-20",
        "sequence": 2
      },
      {
        "id": "joseph-3",
        "text": "Joseph interprets Pharaoh's dreams and is made ruler",
        "reference": "Genesis 41:14-41",
        "sequence": 3
      },
      {
        "id": "joseph-4",
        "text": "Joseph reveals his identity to his brothers",
        "reference": "Genesis 45:1-4",
        "sequence": 4
      }
    ]
  },
  {
    "key": "moses",
    "name": "Moses' Early Life",
    "category": "OLD_TESTAMENT",
    "subcategory": "Moses",
    "difficulty": 1,
    "description": "Rescued as an infant from Pharaoh's death decree, raised in the Egyptian palace, and later exiled after killing a man, Moses seems an unlikely choice to lead anyone — until God reroutes his life entirely.",
    "events": [
      {
        "id": "moses-1",
        "text": "Baby Moses is placed in a basket on the Nile",
        "reference": "Exodus 2:3-4",
        "sequence": 1
      },
      {
        "id": "moses-2",
        "text": "Moses flees Egypt after killing an Egyptian",
        "reference": "Exodus 2:11-15",
        "sequence": 2
      },
      {
        "id": "moses-3",
        "text": "God speaks to Moses from the burning bush",
        "reference": "Exodus 3:1-4",
        "sequence": 3
      },
      {
        "id": "moses-4",
        "text": "Moses returns to Egypt to confront Pharaoh",
        "reference": "Exodus 5:1",
        "sequence": 4
      }
    ]
  },
  {
    "key": "burning_bush",
    "name": "The Burning Bush",
    "category": "OLD_TESTAMENT",
    "subcategory": "Moses",
    "difficulty": 2,
    "description": "Tending sheep in the wilderness, Moses is stopped by a fire that doesn't burn out — and a voice that knows his name. It's the moment his ordinary life ends and his calling as Israel's deliverer begins.",
    "events": [
      {
        "id": "burning_bush-1",
        "text": "Moses tends Jethro's flock near Horeb",
        "reference": "Exodus 3:1",
        "sequence": 1
      },
      {
        "id": "burning_bush-2",
        "text": "Moses sees a bush burning but not consumed",
        "reference": "Exodus 3:2-3",
        "sequence": 2
      },
      {
        "id": "burning_bush-3",
        "text": "God calls Moses by name and reveals His identity",
        "reference": "Exodus 3:4-6",
        "sequence": 3
      },
      {
        "id": "burning_bush-4",
        "text": "God commissions Moses to deliver Israel",
        "reference": "Exodus 3:9-10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "ten_plagues",
    "name": "The Ten Plagues",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 1,
    "description": "God's confrontation with Pharaoh escalates through ten devastating plagues, each one showing Pharaoh's gods to be powerless. Pharaoh's heart hardens again and again, until the final plague finally breaks his resistance.",
    "events": [
      {
        "id": "ten_plagues-1",
        "text": "Moses warns Pharaoh and the plagues begin",
        "reference": "Exodus 7:14-25",
        "sequence": 1
      },
      {
        "id": "ten_plagues-2",
        "text": "Pharaoh repeatedly hardens his heart despite the plagues",
        "reference": "Exodus 8:15",
        "sequence": 2
      },
      {
        "id": "ten_plagues-3",
        "text": "The plague of darkness covers Egypt",
        "reference": "Exodus 10:21-23",
        "sequence": 3
      },
      {
        "id": "ten_plagues-4",
        "text": "The final plague strikes Egypt's firstborn",
        "reference": "Exodus 12:29-30",
        "sequence": 4
      }
    ]
  },
  {
    "key": "passover",
    "name": "The First Passover",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 1,
    "description": "On the night of Israel's final plague, God gives specific instructions for a meal and a mark of blood that will make the difference between death and deliverance. It becomes the defining Jewish festival ever since.",
    "events": [
      {
        "id": "passover-1",
        "text": "God institutes the Passover meal and instructions",
        "reference": "Exodus 12:1-13",
        "sequence": 1
      },
      {
        "id": "passover-2",
        "text": "Israelites mark their doorposts with lamb's blood",
        "reference": "Exodus 12:7",
        "sequence": 2
      },
      {
        "id": "passover-3",
        "text": "The death angel passes over the marked homes",
        "reference": "Exodus 12:12-13",
        "sequence": 3
      },
      {
        "id": "passover-4",
        "text": "Pharaoh finally releases Israel",
        "reference": "Exodus 12:31-32",
        "sequence": 4
      }
    ]
  },
  {
    "key": "red_sea",
    "name": "Crossing the Red Sea",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 1,
    "description": "Freed from Egypt but trapped between the sea and Pharaoh's pursuing army, Israel watches God open an impossible escape route. It becomes the Old Testament's defining act of deliverance.",
    "events": [
      {
        "id": "red_sea-1",
        "text": "Pharaoh pursues the fleeing Israelites",
        "reference": "Exodus 14:5-9",
        "sequence": 1
      },
      {
        "id": "red_sea-2",
        "text": "Israel is trapped between Pharaoh's army and the sea",
        "reference": "Exodus 14:10-12",
        "sequence": 2
      },
      {
        "id": "red_sea-3",
        "text": "God parts the Red Sea for Israel to cross",
        "reference": "Exodus 14:21-22",
        "sequence": 3
      },
      {
        "id": "red_sea-4",
        "text": "The sea closes over the pursuing Egyptian army",
        "reference": "Exodus 14:26-28",
        "sequence": 4
      }
    ]
  },
  {
    "key": "ten_commandments",
    "name": "The Ten Commandments",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 1,
    "description": "At Mount Sinai, God gives Israel more than laws — a covenant identity as His people. The Ten Commandments become the moral backbone referenced throughout the rest of Scripture.",
    "events": [
      {
        "id": "ten_commandments-1",
        "text": "Israel arrives at Mount Sinai",
        "reference": "Exodus 19:1-2",
        "sequence": 1
      },
      {
        "id": "ten_commandments-2",
        "text": "God calls Moses up the mountain",
        "reference": "Exodus 19:20",
        "sequence": 2
      },
      {
        "id": "ten_commandments-3",
        "text": "God gives Moses the Ten Commandments",
        "reference": "Exodus 20:1-17",
        "sequence": 3
      },
      {
        "id": "ten_commandments-4",
        "text": "Moses brings the commandments down to the people",
        "reference": "Exodus 31:18",
        "sequence": 4
      }
    ]
  },
  {
    "key": "golden_calf",
    "name": "The Golden Calf",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 2,
    "description": "While Moses is still on the mountain receiving God's law, the people below grow impatient and build an idol to worship instead. It's a stark picture of how quickly a rescued people can forget their rescuer.",
    "events": [
      {
        "id": "golden_calf-1",
        "text": "The people grow impatient waiting for Moses",
        "reference": "Exodus 32:1",
        "sequence": 1
      },
      {
        "id": "golden_calf-2",
        "text": "Aaron makes a golden calf for the people to worship",
        "reference": "Exodus 32:2-4",
        "sequence": 2
      },
      {
        "id": "golden_calf-3",
        "text": "Moses returns and breaks the stone tablets in anger",
        "reference": "Exodus 32:19",
        "sequence": 3
      },
      {
        "id": "golden_calf-4",
        "text": "Moses intercedes for the people before God",
        "reference": "Exodus 32:11-14",
        "sequence": 4
      }
    ]
  },
  {
    "key": "wilderness",
    "name": "The Wilderness Years",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 2,
    "description": "God provides for Israel's needs in the wilderness, but fear at the border of the promised land costs an entire generation their chance to enter it. Forty years of wandering follow a single failure of trust.",
    "events": [
      {
        "id": "wilderness-1",
        "text": "Israel complains about food and God sends manna",
        "reference": "Exodus 16:2-15",
        "sequence": 1
      },
      {
        "id": "wilderness-2",
        "text": "Spies scout the promised land and most bring a fearful report",
        "reference": "Numbers 13:27-33",
        "sequence": 2
      },
      {
        "id": "wilderness-3",
        "text": "Israel refuses to enter the land and is condemned to wander",
        "reference": "Numbers 14:1-34",
        "sequence": 3
      },
      {
        "id": "wilderness-4",
        "text": "A new generation nears Canaan forty years later",
        "reference": "Numbers 14:33-34",
        "sequence": 4
      }
    ]
  },
  {
    "key": "joshua",
    "name": "Joshua Leads Israel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Conquest",
    "difficulty": 2,
    "description": "After forty years of wandering, Moses' successor Joshua leads Israel into the promised land. His story is about a new generation finally taking hold of what God had promised their ancestors.",
    "events": [
      {
        "id": "joshua-1",
        "text": "Joshua succeeds Moses as Israel's leader",
        "reference": "Joshua 1:1-2",
        "sequence": 1
      },
      {
        "id": "joshua-2",
        "text": "Joshua sends spies into Jericho",
        "reference": "Joshua 2:1",
        "sequence": 2
      },
      {
        "id": "joshua-3",
        "text": "Israel crosses the Jordan River",
        "reference": "Joshua 3:14-17",
        "sequence": 3
      },
      {
        "id": "joshua-4",
        "text": "Joshua leads the conquest of the land",
        "reference": "Joshua 11:23",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jericho",
    "name": "The Fall of Jericho",
    "category": "OLD_TESTAMENT",
    "subcategory": "Conquest",
    "difficulty": 1,
    "description": "Israel's first battle in the promised land is won without a sword — just seven days of marching, a trumpet blast, and a shout. It sets the tone for a conquest defined by faith rather than force.",
    "events": [
      {
        "id": "jericho-1",
        "text": "Joshua sends spies who are hidden by Rahab",
        "reference": "Joshua 2:1-6",
        "sequence": 1
      },
      {
        "id": "jericho-2",
        "text": "Israel marches around Jericho's walls for seven days",
        "reference": "Joshua 6:3-4",
        "sequence": 2
      },
      {
        "id": "jericho-3",
        "text": "Priests blow trumpets and the people shout",
        "reference": "Joshua 6:16-20",
        "sequence": 3
      },
      {
        "id": "jericho-4",
        "text": "Jericho's walls collapse",
        "reference": "Joshua 6:20",
        "sequence": 4
      }
    ]
  },
  {
    "key": "rahab",
    "name": "Rahab",
    "category": "OLD_TESTAMENT",
    "subcategory": "Conquest",
    "difficulty": 2,
    "description": "A Canaanite woman in a doomed city risks everything to protect two Israelite spies, trading her safety for theirs. Her faith and courage earn her family's rescue when Jericho falls.",
    "events": [
      {
        "id": "rahab-1",
        "text": "Rahab hides the Israelite spies in Jericho",
        "reference": "Joshua 2:4-6",
        "sequence": 1
      },
      {
        "id": "rahab-2",
        "text": "Rahab asks the spies to spare her family",
        "reference": "Joshua 2:12-13",
        "sequence": 2
      },
      {
        "id": "rahab-3",
        "text": "Rahab helps the spies escape through a window",
        "reference": "Joshua 2:15",
        "sequence": 3
      },
      {
        "id": "rahab-4",
        "text": "Rahab and her family are spared when Jericho falls",
        "reference": "Joshua 6:22-23",
        "sequence": 4
      }
    ]
  },
  {
    "key": "gideon",
    "name": "Gideon",
    "category": "OLD_TESTAMENT",
    "subcategory": "Judges",
    "difficulty": 2,
    "description": "A fearful farmer hiding from raiders is called by God to lead Israel's army — and asks for proof, twice. God then shrinks his army to just 300 men, making the coming victory unmistakably His own.",
    "events": [
      {
        "id": "gideon-1",
        "text": "An angel calls Gideon to deliver Israel from Midian",
        "reference": "Judges 6:11-14",
        "sequence": 1
      },
      {
        "id": "gideon-2",
        "text": "Gideon tests God with a fleece of wool",
        "reference": "Judges 6:36-40",
        "sequence": 2
      },
      {
        "id": "gideon-3",
        "text": "God reduces Gideon's army to 300 men",
        "reference": "Judges 7:2-7",
        "sequence": 3
      },
      {
        "id": "gideon-4",
        "text": "Gideon defeats the Midianites with trumpets and torches",
        "reference": "Judges 7:19-22",
        "sequence": 4
      }
    ]
  },
  {
    "key": "samson",
    "name": "Samson",
    "category": "OLD_TESTAMENT",
    "subcategory": "Judges",
    "difficulty": 1,
    "description": "Set apart before birth as a deliverer for Israel, Samson is given extraordinary strength — and an extraordinary weakness for the wrong company. His story ends in a final act that costs him his life but defeats his enemies.",
    "events": [
      {
        "id": "samson-1",
        "text": "An angel announces Samson's birth to his parents",
        "reference": "Judges 13:3-5",
        "sequence": 1
      },
      {
        "id": "samson-2",
        "text": "Samson falls in love with Delilah",
        "reference": "Judges 16:4",
        "sequence": 2
      },
      {
        "id": "samson-3",
        "text": "Delilah discovers the secret of his strength",
        "reference": "Judges 16:17-19",
        "sequence": 3
      },
      {
        "id": "samson-4",
        "text": "Samson destroys the Philistine temple in his final act",
        "reference": "Judges 16:29-30",
        "sequence": 4
      }
    ]
  },
  {
    "key": "ruth",
    "name": "Ruth",
    "category": "OLD_TESTAMENT",
    "subcategory": "Judges",
    "difficulty": 2,
    "description": "A story of loyalty set during a famine, Ruth follows a Moabite widow who chooses to stay with her Israelite mother-in-law rather than return to her own people. Her devotion leads her into the family line of David.",
    "events": [
      {
        "id": "ruth-1",
        "text": "Ruth pledges loyalty to Naomi and returns to Bethlehem",
        "reference": "Ruth 1:16-18",
        "sequence": 1
      },
      {
        "id": "ruth-2",
        "text": "Ruth gleans grain in the fields of Boaz",
        "reference": "Ruth 2:2-3",
        "sequence": 2
      },
      {
        "id": "ruth-3",
        "text": "Boaz agrees to redeem and marry Ruth",
        "reference": "Ruth 4:9-10",
        "sequence": 3
      },
      {
        "id": "ruth-4",
        "text": "Ruth and Boaz have a son, Obed",
        "reference": "Ruth 4:13-17",
        "sequence": 4
      }
    ]
  },
  {
    "key": "samuel",
    "name": "Samuel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Samuel",
    "difficulty": 2,
    "description": "Dedicated to God's service before he could remember it, Samuel grows up hearing God's voice in the night and becomes Israel's last judge and first great prophet, anointing both of Israel's first two kings.",
    "events": [
      {
        "id": "samuel-1",
        "text": "Hannah prays for a son and dedicates Samuel to the Lord",
        "reference": "1 Samuel 1:10-11, 27-28",
        "sequence": 1
      },
      {
        "id": "samuel-2",
        "text": "Young Samuel hears God's voice in the night",
        "reference": "1 Samuel 3:4-10",
        "sequence": 2
      },
      {
        "id": "samuel-3",
        "text": "Samuel anoints Saul as Israel's first king",
        "reference": "1 Samuel 10:1",
        "sequence": 3
      },
      {
        "id": "samuel-4",
        "text": "Samuel later anoints David as king",
        "reference": "1 Samuel 16:12-13",
        "sequence": 4
      }
    ]
  },
  {
    "key": "saul",
    "name": "King Saul",
    "category": "OLD_TESTAMENT",
    "subcategory": "Samuel",
    "difficulty": 2,
    "description": "Israel's first king starts strong but repeatedly disobeys God's specific instructions, and his rule unravels from there. Saul's story is a warning about the cost of partial obedience and jealousy toward a rival's success.",
    "events": [
      {
        "id": "saul-1",
        "text": "Saul is anointed as Israel's first king",
        "reference": "1 Samuel 10:1",
        "sequence": 1
      },
      {
        "id": "saul-2",
        "text": "Saul offers an unlawful sacrifice and loses God's favor",
        "reference": "1 Samuel 13:9-14",
        "sequence": 2
      },
      {
        "id": "saul-3",
        "text": "Saul disobeys God's command regarding the Amalekites",
        "reference": "1 Samuel 15:9-11",
        "sequence": 3
      },
      {
        "id": "saul-4",
        "text": "Saul is rejected as king and Samuel anoints David",
        "reference": "1 Samuel 15:26; 16:13",
        "sequence": 4
      }
    ]
  },
  {
    "key": "david_and_goliath",
    "name": "David and Goliath",
    "category": "OLD_TESTAMENT",
    "subcategory": "David",
    "difficulty": 1,
    "description": "David arrives at the battlefield while Israel's army is being challenged by a Philistine giant. Refusing Saul's armor, David confronts Goliath with a sling and five stones, trusting God rather than his own strength.",
    "events": [
      {
        "id": "david_and_goliath-1",
        "text": "Goliath challenges the army of Israel",
        "reference": "1 Samuel 17:8-10",
        "sequence": 1
      },
      {
        "id": "david_and_goliath-2",
        "text": "David arrives at the battlefield",
        "reference": "1 Samuel 17:20-23",
        "sequence": 2
      },
      {
        "id": "david_and_goliath-3",
        "text": "David chooses to fight Goliath",
        "reference": "1 Samuel 17:32-37",
        "sequence": 3
      },
      {
        "id": "david_and_goliath-4",
        "text": "David defeats Goliath",
        "reference": "1 Samuel 17:48-51",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jonathan",
    "name": "Jonathan",
    "category": "OLD_TESTAMENT",
    "subcategory": "David",
    "difficulty": 3,
    "description": "The king's son and the future king become the Bible's clearest picture of loyal friendship, even as Jonathan's own father hunts David down. Jonathan repeatedly chooses David's safety over his own claim to the throne.",
    "events": [
      {
        "id": "jonathan-1",
        "text": "Jonathan makes a covenant of friendship with David",
        "reference": "1 Samuel 18:1-3",
        "sequence": 1
      },
      {
        "id": "jonathan-2",
        "text": "Jonathan warns David of Saul's plan to kill him",
        "reference": "1 Samuel 20:35-42",
        "sequence": 2
      },
      {
        "id": "jonathan-3",
        "text": "Jonathan helps David escape Saul's court",
        "reference": "1 Samuel 19:1-2",
        "sequence": 3
      },
      {
        "id": "jonathan-4",
        "text": "Jonathan dies alongside Saul in battle",
        "reference": "1 Samuel 31:2",
        "sequence": 4
      }
    ]
  },
  {
    "key": "david_becomes_king",
    "name": "David Becomes King",
    "category": "OLD_TESTAMENT",
    "subcategory": "David",
    "difficulty": 2,
    "description": "From shepherd boy to giant-slayer to fugitive to king, David's rise is one of the Bible's great underdog stories, spanning years on the run before he ever wears a crown.",
    "events": [
      {
        "id": "david_becomes_king-1",
        "text": "David is anointed by Samuel as a young shepherd",
        "reference": "1 Samuel 16:12-13",
        "sequence": 1
      },
      {
        "id": "david_becomes_king-2",
        "text": "David flees from Saul for years as a fugitive",
        "reference": "1 Samuel 19:9-10",
        "sequence": 2
      },
      {
        "id": "david_becomes_king-3",
        "text": "Saul dies in battle against the Philistines",
        "reference": "1 Samuel 31:4-6",
        "sequence": 3
      },
      {
        "id": "david_becomes_king-4",
        "text": "David is crowned king over all Israel",
        "reference": "2 Samuel 5:3-4",
        "sequence": 4
      }
    ]
  },
  {
    "key": "david_and_bathsheba",
    "name": "David and Bathsheba",
    "category": "OLD_TESTAMENT",
    "subcategory": "David",
    "difficulty": 2,
    "description": "At the height of his power, David abuses it — taking another man's wife and arranging that man's death to cover it up. A prophet's confrontation finally breaks through David's denial.",
    "events": [
      {
        "id": "david_and_bathsheba-1",
        "text": "David sees Bathsheba and sends for her",
        "reference": "2 Samuel 11:2-4",
        "sequence": 1
      },
      {
        "id": "david_and_bathsheba-2",
        "text": "David arranges for her husband Uriah's death in battle",
        "reference": "2 Samuel 11:14-17",
        "sequence": 2
      },
      {
        "id": "david_and_bathsheba-3",
        "text": "The prophet Nathan confronts David with a parable",
        "reference": "2 Samuel 12:1-7",
        "sequence": 3
      },
      {
        "id": "david_and_bathsheba-4",
        "text": "David repents and Bathsheba later bears Solomon",
        "reference": "2 Samuel 12:13, 24",
        "sequence": 4
      }
    ]
  },
  {
    "key": "solomon",
    "name": "Solomon",
    "category": "OLD_TESTAMENT",
    "subcategory": "Solomon",
    "difficulty": 1,
    "description": "David's son inherits a united, peaceful kingdom and famously asks God for wisdom rather than wealth or power. His building of the Jerusalem Temple marks the high point of Israel's united monarchy.",
    "events": [
      {
        "id": "solomon-1",
        "text": "Solomon becomes king after David",
        "reference": "1 Kings 1:38-39",
        "sequence": 1
      },
      {
        "id": "solomon-2",
        "text": "Solomon asks God for wisdom",
        "reference": "1 Kings 3:5-9",
        "sequence": 2
      },
      {
        "id": "solomon-3",
        "text": "Solomon builds the Temple in Jerusalem",
        "reference": "1 Kings 6:1",
        "sequence": 3
      },
      {
        "id": "solomon-4",
        "text": "The Queen of Sheba visits Solomon",
        "reference": "1 Kings 10:1-2",
        "sequence": 4
      }
    ]
  },
  {
    "key": "the_temple",
    "name": "Building the Temple",
    "category": "OLD_TESTAMENT",
    "subcategory": "Solomon",
    "difficulty": 2,
    "description": "Solomon spends seven years constructing the Temple his father David had longed to build. When it's finished, God's glory fills the building so powerfully the priests can't even continue their service.",
    "events": [
      {
        "id": "the_temple-1",
        "text": "Solomon begins construction of the Temple",
        "reference": "1 Kings 6:1",
        "sequence": 1
      },
      {
        "id": "the_temple-2",
        "text": "The Temple is built to God's specifications",
        "reference": "1 Kings 6:14-22",
        "sequence": 2
      },
      {
        "id": "the_temple-3",
        "text": "The ark of the covenant is brought into the Temple",
        "reference": "1 Kings 8:1-6",
        "sequence": 3
      },
      {
        "id": "the_temple-4",
        "text": "God's glory fills the completed Temple",
        "reference": "1 Kings 8:10-11",
        "sequence": 4
      }
    ]
  },
  {
    "key": "elijah",
    "name": "Elijah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Elijah",
    "difficulty": 1,
    "description": "A fierce prophet who confronts kings and false gods head-on, Elijah's public showdown on Mount Carmel is one of the Old Testament's most dramatic scenes. Yet his story also shows him at his lowest, before God meets him there.",
    "events": [
      {
        "id": "elijah-1",
        "text": "Elijah announces a drought to King Ahab",
        "reference": "1 Kings 17:1",
        "sequence": 1
      },
      {
        "id": "elijah-2",
        "text": "Elijah is fed by ravens at the brook Cherith",
        "reference": "1 Kings 17:4-6",
        "sequence": 2
      },
      {
        "id": "elijah-3",
        "text": "Elijah defeats the prophets of Baal on Mount Carmel",
        "reference": "1 Kings 18:38-40",
        "sequence": 3
      },
      {
        "id": "elijah-4",
        "text": "Elijah is taken up to heaven in a whirlwind",
        "reference": "2 Kings 2:11",
        "sequence": 4
      }
    ]
  },
  {
    "key": "mount_carmel",
    "name": "The Contest on Mount Carmel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Elijah",
    "difficulty": 2,
    "description": "One prophet challenges 450 to see whose God will answer by fire. After the prophets of Baal beg and cut themselves for hours in vain, Elijah's simple prayer is answered instantly and dramatically.",
    "events": [
      {
        "id": "mount_carmel-1",
        "text": "Elijah challenges the prophets of Baal to a contest",
        "reference": "1 Kings 18:22-24",
        "sequence": 1
      },
      {
        "id": "mount_carmel-2",
        "text": "The prophets of Baal fail to call down fire",
        "reference": "1 Kings 18:26-29",
        "sequence": 2
      },
      {
        "id": "mount_carmel-3",
        "text": "Elijah's sacrifice is consumed by fire from heaven",
        "reference": "1 Kings 18:36-38",
        "sequence": 3
      },
      {
        "id": "mount_carmel-4",
        "text": "Elijah has the false prophets put to death",
        "reference": "1 Kings 18:40",
        "sequence": 4
      }
    ]
  },
  {
    "key": "elisha",
    "name": "Elisha",
    "category": "OLD_TESTAMENT",
    "subcategory": "Elijah",
    "difficulty": 2,
    "description": "Elijah's successor asks for a double portion of his mentor's spirit and spends decades performing miracles across Israel — healing, providing, and even raising the dead, right up until after his own death.",
    "events": [
      {
        "id": "elisha-1",
        "text": "Elisha becomes Elijah's successor",
        "reference": "1 Kings 19:19-21",
        "sequence": 1
      },
      {
        "id": "elisha-2",
        "text": "Elisha asks for a double portion of Elijah's spirit",
        "reference": "2 Kings 2:9-10",
        "sequence": 2
      },
      {
        "id": "elisha-3",
        "text": "Elisha performs miracles, including raising a boy to life",
        "reference": "2 Kings 4:32-35",
        "sequence": 3
      },
      {
        "id": "elisha-4",
        "text": "Elisha's bones later revive a dead man",
        "reference": "2 Kings 13:20-21",
        "sequence": 4
      }
    ]
  },
  {
    "key": "naaman",
    "name": "Naaman",
    "category": "OLD_TESTAMENT",
    "subcategory": "Elijah",
    "difficulty": 2,
    "description": "A powerful Syrian commander with a humiliating disease is healed only after he swallows his pride and follows a strange, simple instruction from an Israelite prophet.",
    "events": [
      {
        "id": "naaman-1",
        "text": "Naaman, a Syrian commander, has leprosy",
        "reference": "2 Kings 5:1",
        "sequence": 1
      },
      {
        "id": "naaman-2",
        "text": "A servant girl tells him of a prophet in Israel",
        "reference": "2 Kings 5:2-3",
        "sequence": 2
      },
      {
        "id": "naaman-3",
        "text": "Elisha tells Naaman to wash in the Jordan seven times",
        "reference": "2 Kings 5:9-10",
        "sequence": 3
      },
      {
        "id": "naaman-4",
        "text": "Naaman is healed after obeying",
        "reference": "2 Kings 5:14",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jonah",
    "name": "Jonah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Prophets",
    "difficulty": 1,
    "description": "God sends a reluctant prophet to warn a hostile foreign city, and Jonah runs the other way instead. After being swallowed by a great fish and given a second chance, his story becomes less about the fish and more about a prophet who resents God's mercy.",
    "events": [
      {
        "id": "jonah-1",
        "text": "God calls Jonah to preach to Nineveh",
        "reference": "Jonah 1:1-2",
        "sequence": 1
      },
      {
        "id": "jonah-2",
        "text": "Jonah flees and is swallowed by a great fish",
        "reference": "Jonah 1:3, 17",
        "sequence": 2
      },
      {
        "id": "jonah-3",
        "text": "Jonah is vomited onto dry land and obeys",
        "reference": "Jonah 2:10; 3:3",
        "sequence": 3
      },
      {
        "id": "jonah-4",
        "text": "Nineveh repents and Jonah resents God's mercy",
        "reference": "Jonah 3:5; 4:1",
        "sequence": 4
      }
    ]
  },
  {
    "key": "daniel",
    "name": "Daniel",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 1,
    "description": "Taken captive to Babylon as a young man, Daniel rises to prominence in a foreign court while refusing to compromise his faith — including a night spent unharmed in a den of lions.",
    "events": [
      {
        "id": "daniel-1",
        "text": "Daniel is taken captive to Babylon",
        "reference": "Daniel 1:3-6",
        "sequence": 1
      },
      {
        "id": "daniel-2",
        "text": "Daniel interprets Nebuchadnezzar's dream",
        "reference": "Daniel 2:24-28",
        "sequence": 2
      },
      {
        "id": "daniel-3",
        "text": "Daniel is thrown into the lions' den",
        "reference": "Daniel 6:16",
        "sequence": 3
      },
      {
        "id": "daniel-4",
        "text": "Daniel is delivered unharmed from the lions",
        "reference": "Daniel 6:22-23",
        "sequence": 4
      }
    ]
  },
  {
    "key": "fiery_furnace",
    "name": "The Fiery Furnace",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 1,
    "description": "Three young Israelites in exile refuse to bow to a king's golden idol, even under threat of death. Thrown into a blazing furnace, they walk out untouched — with an unexpected fourth figure seen beside them.",
    "events": [
      {
        "id": "fiery_furnace-1",
        "text": "Nebuchadnezzar sets up a golden image to be worshipped",
        "reference": "Daniel 3:1-6",
        "sequence": 1
      },
      {
        "id": "fiery_furnace-2",
        "text": "Shadrach, Meshach, and Abednego refuse to bow",
        "reference": "Daniel 3:16-18",
        "sequence": 2
      },
      {
        "id": "fiery_furnace-3",
        "text": "They are thrown into a blazing furnace",
        "reference": "Daniel 3:19-23",
        "sequence": 3
      },
      {
        "id": "fiery_furnace-4",
        "text": "They emerge unharmed before the king",
        "reference": "Daniel 3:26-27",
        "sequence": 4
      }
    ]
  },
  {
    "key": "lions_den",
    "name": "Daniel in the Lions' Den",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 1,
    "description": "Jealous officials trick a foreign king into a law designed to trap Daniel for his faith. Daniel keeps praying anyway, and a night in a den of lions becomes a public demonstration of God's protection.",
    "events": [
      {
        "id": "lions_den-1",
        "text": "Officials trick King Darius into a law against prayer",
        "reference": "Daniel 6:6-9",
        "sequence": 1
      },
      {
        "id": "lions_den-2",
        "text": "Daniel continues praying to God despite the law",
        "reference": "Daniel 6:10",
        "sequence": 2
      },
      {
        "id": "lions_den-3",
        "text": "Daniel is thrown into the den of lions",
        "reference": "Daniel 6:16",
        "sequence": 3
      },
      {
        "id": "lions_den-4",
        "text": "God shuts the lions' mouths and Daniel is saved",
        "reference": "Daniel 6:21-23",
        "sequence": 4
      }
    ]
  },
  {
    "key": "esther",
    "name": "Esther",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 1,
    "description": "Set in the Persian empire, Esther's story follows a young Jewish woman who becomes queen and then risks her life to save her people from a planned genocide. It's read as a story of providence working behind the scenes.",
    "events": [
      {
        "id": "esther-1",
        "text": "Esther is chosen as queen of Persia",
        "reference": "Esther 2:17",
        "sequence": 1
      },
      {
        "id": "esther-2",
        "text": "Haman plots to destroy the Jewish people",
        "reference": "Esther 3:8-9",
        "sequence": 2
      },
      {
        "id": "esther-3",
        "text": "Esther approaches the king uninvited to intercede",
        "reference": "Esther 4:16; 5:1-2",
        "sequence": 3
      },
      {
        "id": "esther-4",
        "text": "Haman is exposed and the Jewish people are saved",
        "reference": "Esther 7:9-10; 8:11",
        "sequence": 4
      }
    ]
  },
  {
    "key": "mordecai",
    "name": "Mordecai",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 2,
    "description": "Esther's older cousin raises her, refuses to bow to a proud official, and ultimately persuades her to risk everything for their people — before being honored by the very king who nearly let them be destroyed.",
    "events": [
      {
        "id": "mordecai-1",
        "text": "Mordecai raises his cousin Esther and uncovers a plot",
        "reference": "Esther 2:7, 21-22",
        "sequence": 1
      },
      {
        "id": "mordecai-2",
        "text": "Mordecai refuses to bow to Haman",
        "reference": "Esther 3:2-5",
        "sequence": 2
      },
      {
        "id": "mordecai-3",
        "text": "Mordecai persuades Esther to intervene for their people",
        "reference": "Esther 4:13-14",
        "sequence": 3
      },
      {
        "id": "mordecai-4",
        "text": "Mordecai is honored by the king and rises in power",
        "reference": "Esther 10:2-3",
        "sequence": 4
      }
    ]
  },
  {
    "key": "haman",
    "name": "Haman",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exile",
    "difficulty": 2,
    "description": "A powerful official's wounded pride at one man's refusal to bow spirals into a genocidal plot against an entire people — a plot that ultimately destroys Haman himself instead.",
    "events": [
      {
        "id": "haman-1",
        "text": "Haman is promoted to a high position by the king",
        "reference": "Esther 3:1",
        "sequence": 1
      },
      {
        "id": "haman-2",
        "text": "Haman is enraged when Mordecai refuses to bow",
        "reference": "Esther 3:5-6",
        "sequence": 2
      },
      {
        "id": "haman-3",
        "text": "Haman plots the destruction of the Jewish people",
        "reference": "Esther 3:8-9",
        "sequence": 3
      },
      {
        "id": "haman-4",
        "text": "Haman is exposed by Esther and executed",
        "reference": "Esther 7:6-10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "job",
    "name": "Job",
    "category": "OLD_TESTAMENT",
    "subcategory": "Wisdom",
    "difficulty": 2,
    "description": "A blameless, prosperous man loses his family, wealth, and health in a single catastrophic stretch, and spends the rest of the book wrestling with his friends' bad theology and God's own unanswerable questions.",
    "events": [
      {
        "id": "job-1",
        "text": "Job is described as blameless and prosperous",
        "reference": "Job 1:1-3",
        "sequence": 1
      },
      {
        "id": "job-2",
        "text": "Job loses his family, wealth, and health in disaster",
        "reference": "Job 1:13-19; 2:7",
        "sequence": 2
      },
      {
        "id": "job-3",
        "text": "Job's friends argue that his suffering must be deserved",
        "reference": "Job 4:7-8",
        "sequence": 3
      },
      {
        "id": "job-4",
        "text": "God speaks from the whirlwind and restores Job",
        "reference": "Job 38:1; 42:10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "hezekiah",
    "name": "Hezekiah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Kings",
    "difficulty": 3,
    "description": "A reforming king who tears down idol worship faces the largest crisis of his reign when the Assyrian empire besieges Jerusalem. His prayer for deliverance — and later for his own life — are answered both times.",
    "events": [
      {
        "id": "hezekiah-1",
        "text": "Hezekiah becomes king and removes idol worship",
        "reference": "2 Kings 18:1-4",
        "sequence": 1
      },
      {
        "id": "hezekiah-2",
        "text": "Hezekiah faces the Assyrian siege of Jerusalem",
        "reference": "2 Kings 18:13, 17",
        "sequence": 2
      },
      {
        "id": "hezekiah-3",
        "text": "Hezekiah prays and God delivers the city",
        "reference": "2 Kings 19:14-19, 35",
        "sequence": 3
      },
      {
        "id": "hezekiah-4",
        "text": "Hezekiah becomes ill and God grants him extra years",
        "reference": "2 Kings 20:1-6",
        "sequence": 4
      }
    ]
  },
  {
    "key": "josiah",
    "name": "Josiah",
    "category": "OLD_TESTAMENT",
    "subcategory": "Kings",
    "difficulty": 3,
    "description": "Crowned king as a child, Josiah grows into one of Judah's most devoted reformers after a rediscovered scroll of God's law shakes him to his core, launching a nationwide return to God.",
    "events": [
      {
        "id": "josiah-1",
        "text": "Josiah becomes king as a young boy",
        "reference": "2 Kings 22:1",
        "sequence": 1
      },
      {
        "id": "josiah-2",
        "text": "The Book of the Law is rediscovered in the Temple",
        "reference": "2 Kings 22:8",
        "sequence": 2
      },
      {
        "id": "josiah-3",
        "text": "Josiah tears his robes and seeks the Lord",
        "reference": "2 Kings 22:11, 13",
        "sequence": 3
      },
      {
        "id": "josiah-4",
        "text": "Josiah leads a nationwide religious reform",
        "reference": "2 Kings 23:1-3",
        "sequence": 4
      }
    ]
  },
  {
    "key": "aarons_rod",
    "name": "Aaron's Staff",
    "category": "OLD_TESTAMENT",
    "subcategory": "Exodus",
    "difficulty": 3,
    "description": "Facing rebellion against his brother's God-given priesthood, Moses collects a staff from each tribal leader. Overnight, Aaron's staff alone sprouts, blossoms, and bears almonds — an unmistakable sign settling the dispute.",
    "events": [
      {
        "id": "aarons_rod-1",
        "text": "Leaders rebel against Aaron's priesthood",
        "reference": "Numbers 16:1-3",
        "sequence": 1
      },
      {
        "id": "aarons_rod-2",
        "text": "Moses collects a staff from each tribe, including Aaron's",
        "reference": "Numbers 17:1-6",
        "sequence": 2
      },
      {
        "id": "aarons_rod-3",
        "text": "Aaron's staff buds, blossoms, and produces almonds overnight",
        "reference": "Numbers 17:8",
        "sequence": 3
      },
      {
        "id": "aarons_rod-4",
        "text": "The staff is kept as a sign against further rebellion",
        "reference": "Numbers 17:10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "birth_of_john",
    "name": "Birth of John the Baptist",
    "category": "NEW_TESTAMENT",
    "subcategory": "Gospels",
    "difficulty": 2,
    "description": "An elderly, childless priest is told by an angel that he'll have a son who will prepare the way for the Messiah — news so unbelievable that Zechariah is struck speechless until it comes true.",
    "events": [
      {
        "id": "birth_of_john-1",
        "text": "An angel appears to Zechariah in the temple",
        "reference": "Luke 1:11-13",
        "sequence": 1
      },
      {
        "id": "birth_of_john-2",
        "text": "Zechariah is struck mute for doubting",
        "reference": "Luke 1:18-20",
        "sequence": 2
      },
      {
        "id": "birth_of_john-3",
        "text": "Elizabeth gives birth to John",
        "reference": "Luke 1:57",
        "sequence": 3
      },
      {
        "id": "birth_of_john-4",
        "text": "Zechariah's speech returns and he prophesies",
        "reference": "Luke 1:64, 67",
        "sequence": 4
      }
    ]
  },
  {
    "key": "birth_of_jesus",
    "name": "The Birth of Jesus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Gospels",
    "difficulty": 1,
    "description": "Long-awaited by prophecy, Jesus' birth arrives in humble circumstances — a young couple, no room at the inn, shepherds as the first witnesses to news meant for everyone, not just Israel.",
    "events": [
      {
        "id": "birth_of_jesus-1",
        "text": "An angel announces Jesus' birth to Mary",
        "reference": "Luke 1:26-31",
        "sequence": 1
      },
      {
        "id": "birth_of_jesus-2",
        "text": "Mary and Joseph travel to Bethlehem",
        "reference": "Luke 2:4-5",
        "sequence": 2
      },
      {
        "id": "birth_of_jesus-3",
        "text": "Jesus is born and laid in a manger",
        "reference": "Luke 2:6-7",
        "sequence": 3
      },
      {
        "id": "birth_of_jesus-4",
        "text": "Shepherds visit the newborn Jesus",
        "reference": "Luke 2:15-16",
        "sequence": 4
      }
    ]
  },
  {
    "key": "wise_men",
    "name": "The Visit of the Magi",
    "category": "NEW_TESTAMENT",
    "subcategory": "Gospels",
    "difficulty": 1,
    "description": "Foreign astrologers follow a star across a great distance to worship a child they believe will be a king, presenting Him gifts before slipping away without reporting back to a threatened Herod.",
    "events": [
      {
        "id": "wise_men-1",
        "text": "Magi see a star and travel to Jerusalem",
        "reference": "Matthew 2:1-2",
        "sequence": 1
      },
      {
        "id": "wise_men-2",
        "text": "Herod directs them to Bethlehem",
        "reference": "Matthew 2:7-8",
        "sequence": 2
      },
      {
        "id": "wise_men-3",
        "text": "The Magi find Jesus and present their gifts",
        "reference": "Matthew 2:9-11",
        "sequence": 3
      },
      {
        "id": "wise_men-4",
        "text": "The Magi are warned in a dream and go home another way",
        "reference": "Matthew 2:12",
        "sequence": 4
      }
    ]
  },
  {
    "key": "escape_to_egypt",
    "name": "The Escape to Egypt",
    "category": "NEW_TESTAMENT",
    "subcategory": "Gospels",
    "difficulty": 2,
    "description": "A jealous, threatened king orders the deaths of Bethlehem's infant boys, but a dream warning gets Jesus' family safely out of the country in time, fleeing to Egypt until it's safe to return.",
    "events": [
      {
        "id": "escape_to_egypt-1",
        "text": "An angel warns Joseph of Herod's plan",
        "reference": "Matthew 2:13",
        "sequence": 1
      },
      {
        "id": "escape_to_egypt-2",
        "text": "Joseph takes Mary and Jesus to Egypt by night",
        "reference": "Matthew 2:14",
        "sequence": 2
      },
      {
        "id": "escape_to_egypt-3",
        "text": "Herod orders the massacre of infants in Bethlehem",
        "reference": "Matthew 2:16",
        "sequence": 3
      },
      {
        "id": "escape_to_egypt-4",
        "text": "The family returns to Nazareth after Herod's death",
        "reference": "Matthew 2:19-23",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jesus_in_the_temple",
    "name": "Jesus in the Temple",
    "category": "NEW_TESTAMENT",
    "subcategory": "Gospels",
    "difficulty": 2,
    "description": "The only recorded story from Jesus' childhood: a Passover trip to Jerusalem where His parents lose track of him for three anxious days, only to find him deep in conversation with the temple teachers.",
    "events": [
      {
        "id": "jesus_in_the_temple-1",
        "text": "Jesus' family travels to Jerusalem for Passover",
        "reference": "Luke 2:41-42",
        "sequence": 1
      },
      {
        "id": "jesus_in_the_temple-2",
        "text": "Jesus stays behind in the temple without his parents' knowledge",
        "reference": "Luke 2:43",
        "sequence": 2
      },
      {
        "id": "jesus_in_the_temple-3",
        "text": "His parents search for him for three days",
        "reference": "Luke 2:45-46",
        "sequence": 3
      },
      {
        "id": "jesus_in_the_temple-4",
        "text": "They find him discussing scripture with the teachers",
        "reference": "Luke 2:46-47",
        "sequence": 4
      }
    ]
  },
  {
    "key": "baptism_of_jesus",
    "name": "The Baptism of Jesus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 1,
    "description": "Jesus begins His public ministry not with a miracle or a sermon, but by stepping into the Jordan River to be baptized by John — a moment marked by the Spirit's descent and the Father's voice from heaven.",
    "events": [
      {
        "id": "baptism_of_jesus-1",
        "text": "John the Baptist preaches and baptizes in the Jordan",
        "reference": "Matthew 3:5-6",
        "sequence": 1
      },
      {
        "id": "baptism_of_jesus-2",
        "text": "Jesus comes to John to be baptized",
        "reference": "Matthew 3:13-15",
        "sequence": 2
      },
      {
        "id": "baptism_of_jesus-3",
        "text": "The Spirit descends on Jesus like a dove",
        "reference": "Matthew 3:16",
        "sequence": 3
      },
      {
        "id": "baptism_of_jesus-4",
        "text": "A voice from heaven declares Jesus God's Son",
        "reference": "Matthew 3:17",
        "sequence": 4
      }
    ]
  },
  {
    "key": "temptation_of_jesus",
    "name": "The Temptation of Jesus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "Immediately after His baptism, Jesus is led into the wilderness where He fasts for forty days and faces three direct temptations from Satan — and answers each one with Scripture rather than power.",
    "events": [
      {
        "id": "temptation_of_jesus-1",
        "text": "Jesus is led into the wilderness by the Spirit",
        "reference": "Matthew 4:1",
        "sequence": 1
      },
      {
        "id": "temptation_of_jesus-2",
        "text": "Jesus fasts for forty days and nights",
        "reference": "Matthew 4:2",
        "sequence": 2
      },
      {
        "id": "temptation_of_jesus-3",
        "text": "Satan tempts Jesus three times",
        "reference": "Matthew 4:3-9",
        "sequence": 3
      },
      {
        "id": "temptation_of_jesus-4",
        "text": "Jesus resists and angels attend him",
        "reference": "Matthew 4:10-11",
        "sequence": 4
      }
    ]
  },
  {
    "key": "calling_of_disciples",
    "name": "The Calling of the Disciples",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 1,
    "description": "Walking along the Sea of Galilee, Jesus interrupts a pair of fishing brothers with a simple invitation, and they leave their nets behind on the spot to follow him.",
    "events": [
      {
        "id": "calling_of_disciples-1",
        "text": "Jesus sees Peter and Andrew fishing",
        "reference": "Matthew 4:18",
        "sequence": 1
      },
      {
        "id": "calling_of_disciples-2",
        "text": "Jesus tells them to become fishers of men",
        "reference": "Matthew 4:19",
        "sequence": 2
      },
      {
        "id": "calling_of_disciples-3",
        "text": "They leave their nets to follow him",
        "reference": "Matthew 4:20",
        "sequence": 3
      },
      {
        "id": "calling_of_disciples-4",
        "text": "Jesus calls James and John as well",
        "reference": "Matthew 4:21-22",
        "sequence": 4
      }
    ]
  },
  {
    "key": "wedding_at_cana",
    "name": "The Wedding at Cana",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "At a wedding celebration running embarrassingly low on wine, Jesus performs His first recorded miracle — quietly, at his mother's prompting, turning ordinary water into the best wine of the feast.",
    "events": [
      {
        "id": "wedding_at_cana-1",
        "text": "Jesus and his disciples attend a wedding in Cana",
        "reference": "John 2:1-2",
        "sequence": 1
      },
      {
        "id": "wedding_at_cana-2",
        "text": "The wine runs out at the celebration",
        "reference": "John 2:3",
        "sequence": 2
      },
      {
        "id": "wedding_at_cana-3",
        "text": "Mary asks Jesus to help, and jars are filled with water",
        "reference": "John 2:5-7",
        "sequence": 3
      },
      {
        "id": "wedding_at_cana-4",
        "text": "Jesus turns the water into wine",
        "reference": "John 2:9-10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "nicodemus",
    "name": "Nicodemus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "A respected Pharisee comes to Jesus under cover of night with genuine questions, and receives one of the Bible's most famous answers about what it means to be born again.",
    "events": [
      {
        "id": "nicodemus-1",
        "text": "Nicodemus, a Pharisee, comes to Jesus at night",
        "reference": "John 3:1-2",
        "sequence": 1
      },
      {
        "id": "nicodemus-2",
        "text": "Nicodemus asks how a person can be born again",
        "reference": "John 3:4",
        "sequence": 2
      },
      {
        "id": "nicodemus-3",
        "text": "Jesus explains the need for spiritual rebirth",
        "reference": "John 3:5-7",
        "sequence": 3
      },
      {
        "id": "nicodemus-4",
        "text": "Jesus tells him God so loved the world",
        "reference": "John 3:16",
        "sequence": 4
      }
    ]
  },
  {
    "key": "samaritan_woman",
    "name": "The Samaritan Woman at the Well",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "Jesus crosses a deep cultural divide to speak with a Samaritan woman at a well, exposing what He already knows about her life and offering her something no well could provide.",
    "events": [
      {
        "id": "samaritan_woman-1",
        "text": "Jesus stops at a well in Samaria",
        "reference": "John 4:5-6",
        "sequence": 1
      },
      {
        "id": "samaritan_woman-2",
        "text": "Jesus asks a Samaritan woman for water",
        "reference": "John 4:7",
        "sequence": 2
      },
      {
        "id": "samaritan_woman-3",
        "text": "Jesus reveals knowledge of her past and offers living water",
        "reference": "John 4:16-18, 13-14",
        "sequence": 3
      },
      {
        "id": "samaritan_woman-4",
        "text": "The woman tells her town and many believe",
        "reference": "John 4:28-30, 39",
        "sequence": 4
      }
    ]
  },
  {
    "key": "paralyzed_man",
    "name": "The Paralyzed Man Lowered Through the Roof",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "Unable to reach Jesus through a packed crowd, four friends dig through a roof to lower their paralyzed friend down — and Jesus responds first to their faith, then to the man's greatest need.",
    "events": [
      {
        "id": "paralyzed_man-1",
        "text": "Friends carry a paralyzed man to Jesus",
        "reference": "Mark 2:3",
        "sequence": 1
      },
      {
        "id": "paralyzed_man-2",
        "text": "Unable to get through the crowd, they lower him through the roof",
        "reference": "Mark 2:4",
        "sequence": 2
      },
      {
        "id": "paralyzed_man-3",
        "text": "Jesus forgives his sins and heals him",
        "reference": "Mark 2:5, 10-11",
        "sequence": 3
      },
      {
        "id": "paralyzed_man-4",
        "text": "The man picks up his mat and walks",
        "reference": "Mark 2:12",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jesus_calms_the_storm",
    "name": "Jesus Calms the Storm",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 1,
    "description": "Asleep in the back of a boat during a sudden, violent storm, Jesus is woken by terrified disciples — and calms the wind and waves with nothing more than a word.",
    "events": [
      {
        "id": "jesus_calms_the_storm-1",
        "text": "Jesus and the disciples set out across the lake",
        "reference": "Mark 4:35-36",
        "sequence": 1
      },
      {
        "id": "jesus_calms_the_storm-2",
        "text": "A fierce storm arises while Jesus sleeps",
        "reference": "Mark 4:37-38",
        "sequence": 2
      },
      {
        "id": "jesus_calms_the_storm-3",
        "text": "The terrified disciples wake him for help",
        "reference": "Mark 4:38",
        "sequence": 3
      },
      {
        "id": "jesus_calms_the_storm-4",
        "text": "Jesus calms the wind and waves",
        "reference": "Mark 4:39",
        "sequence": 4
      }
    ]
  },
  {
    "key": "feeding_of_5000",
    "name": "Feeding the Five Thousand",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 1,
    "description": "Facing a hungry crowd of thousands in a remote place with only five loaves and two fish on hand, Jesus multiplies the meal into more than enough, with baskets of food left over.",
    "events": [
      {
        "id": "feeding_of_5000-1",
        "text": "A large crowd follows Jesus to a remote place",
        "reference": "Matthew 14:13-14",
        "sequence": 1
      },
      {
        "id": "feeding_of_5000-2",
        "text": "Evening comes and the disciples want to send the crowd away",
        "reference": "Matthew 14:15",
        "sequence": 2
      },
      {
        "id": "feeding_of_5000-3",
        "text": "Jesus blesses five loaves and two fish",
        "reference": "Matthew 14:17-19",
        "sequence": 3
      },
      {
        "id": "feeding_of_5000-4",
        "text": "The crowd is fed with baskets of food left over",
        "reference": "Matthew 14:20",
        "sequence": 4
      }
    ]
  },
  {
    "key": "walking_on_water",
    "name": "Jesus Walks on Water",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "After sending His disciples ahead by boat, Jesus goes up a mountain alone to pray — then joins them later by walking across the water itself, prompting Peter's brief, faltering attempt to do the same.",
    "events": [
      {
        "id": "walking_on_water-1",
        "text": "Jesus sends the disciples ahead by boat",
        "reference": "Matthew 14:22",
        "sequence": 1
      },
      {
        "id": "walking_on_water-2",
        "text": "Jesus goes up a mountain alone to pray",
        "reference": "Matthew 14:23",
        "sequence": 2
      },
      {
        "id": "walking_on_water-3",
        "text": "Jesus walks toward the boat on the water",
        "reference": "Matthew 14:25",
        "sequence": 3
      },
      {
        "id": "walking_on_water-4",
        "text": "Peter briefly walks toward him before sinking in fear",
        "reference": "Matthew 14:29-30",
        "sequence": 4
      }
    ]
  },
  {
    "key": "transfiguration",
    "name": "The Transfiguration",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "On a mountain with three of His closest disciples, Jesus is suddenly transfigured, His face and clothes shining like light, as Moses and Elijah appear beside Him and a voice speaks from the cloud.",
    "events": [
      {
        "id": "transfiguration-1",
        "text": "Jesus takes Peter, James, and John up a mountain",
        "reference": "Matthew 17:1",
        "sequence": 1
      },
      {
        "id": "transfiguration-2",
        "text": "Jesus is transfigured, his face and clothes shining",
        "reference": "Matthew 17:2",
        "sequence": 2
      },
      {
        "id": "transfiguration-3",
        "text": "Moses and Elijah appear speaking with him",
        "reference": "Matthew 17:3",
        "sequence": 3
      },
      {
        "id": "transfiguration-4",
        "text": "A voice from a cloud declares Jesus God's Son",
        "reference": "Matthew 17:5",
        "sequence": 4
      }
    ]
  },
  {
    "key": "good_samaritan",
    "name": "The Good Samaritan",
    "category": "NEW_TESTAMENT",
    "subcategory": "Parables",
    "difficulty": 1,
    "description": "Asked to define who counts as a 'neighbor,' Jesus tells of a beaten traveler ignored by religious insiders but rescued by the one person least expected to help — an outsider despised by his audience.",
    "events": [
      {
        "id": "good_samaritan-1",
        "text": "A man is beaten and left for dead on the road",
        "reference": "Luke 10:30",
        "sequence": 1
      },
      {
        "id": "good_samaritan-2",
        "text": "A priest and a Levite pass by without helping",
        "reference": "Luke 10:31-32",
        "sequence": 2
      },
      {
        "id": "good_samaritan-3",
        "text": "A Samaritan stops and cares for his wounds",
        "reference": "Luke 10:33-34",
        "sequence": 3
      },
      {
        "id": "good_samaritan-4",
        "text": "The Samaritan pays an innkeeper to continue his care",
        "reference": "Luke 10:35",
        "sequence": 4
      }
    ]
  },
  {
    "key": "prodigal_son",
    "name": "The Prodigal Son",
    "category": "NEW_TESTAMENT",
    "subcategory": "Parables",
    "difficulty": 1,
    "description": "A younger son demands his inheritance early, wastes it completely, and returns home rehearsing an apology — only to find his father already running to meet him with open arms.",
    "events": [
      {
        "id": "prodigal_son-1",
        "text": "A younger son demands his inheritance and leaves home",
        "reference": "Luke 15:12-13",
        "sequence": 1
      },
      {
        "id": "prodigal_son-2",
        "text": "He squanders it and ends up feeding pigs",
        "reference": "Luke 15:13-16",
        "sequence": 2
      },
      {
        "id": "prodigal_son-3",
        "text": "He returns home planning to beg forgiveness",
        "reference": "Luke 15:17-19",
        "sequence": 3
      },
      {
        "id": "prodigal_son-4",
        "text": "His father runs to embrace and celebrate him",
        "reference": "Luke 15:20-24",
        "sequence": 4
      }
    ]
  },
  {
    "key": "lost_sheep",
    "name": "The Lost Sheep",
    "category": "NEW_TESTAMENT",
    "subcategory": "Parables",
    "difficulty": 1,
    "description": "A shepherd with a hundred sheep notices just one missing and leaves the ninety-nine to search until he finds it — a short parable about how much a single person matters to God.",
    "events": [
      {
        "id": "lost_sheep-1",
        "text": "A shepherd has a hundred sheep",
        "reference": "Luke 15:4",
        "sequence": 1
      },
      {
        "id": "lost_sheep-2",
        "text": "One sheep wanders off and is lost",
        "reference": "Luke 15:4",
        "sequence": 2
      },
      {
        "id": "lost_sheep-3",
        "text": "The shepherd leaves the ninety-nine to search for it",
        "reference": "Luke 15:4",
        "sequence": 3
      },
      {
        "id": "lost_sheep-4",
        "text": "He rejoices with his friends upon finding it",
        "reference": "Luke 15:5-6",
        "sequence": 4
      }
    ]
  },
  {
    "key": "lost_coin",
    "name": "The Lost Coin",
    "category": "NEW_TESTAMENT",
    "subcategory": "Parables",
    "difficulty": 2,
    "description": "A woman with ten silver coins loses one and turns her house upside down looking for it, celebrating with her friends the moment she finds it — a small, homely picture of God's joy over one recovered sinner.",
    "events": [
      {
        "id": "lost_coin-1",
        "text": "A woman has ten silver coins",
        "reference": "Luke 15:8",
        "sequence": 1
      },
      {
        "id": "lost_coin-2",
        "text": "She loses one and searches the house carefully",
        "reference": "Luke 15:8",
        "sequence": 2
      },
      {
        "id": "lost_coin-3",
        "text": "She sweeps until she finds the coin",
        "reference": "Luke 15:8",
        "sequence": 3
      },
      {
        "id": "lost_coin-4",
        "text": "She calls her friends together to celebrate",
        "reference": "Luke 15:9",
        "sequence": 4
      }
    ]
  },
  {
    "key": "lazarus",
    "name": "The Raising of Lazarus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "Jesus deliberately delays going to a dying friend, arriving only after Lazarus has been dead four days — then weeps at the tomb before calling him back to life in front of a stunned crowd.",
    "events": [
      {
        "id": "lazarus-1",
        "text": "Jesus hears that his friend Lazarus is sick",
        "reference": "John 11:3",
        "sequence": 1
      },
      {
        "id": "lazarus-2",
        "text": "Jesus delays and arrives after Lazarus has died",
        "reference": "John 11:6, 17",
        "sequence": 2
      },
      {
        "id": "lazarus-3",
        "text": "Jesus weeps and goes to the tomb",
        "reference": "John 11:35, 38",
        "sequence": 3
      },
      {
        "id": "lazarus-4",
        "text": "Jesus calls Lazarus out and he rises",
        "reference": "John 11:43-44",
        "sequence": 4
      }
    ]
  },
  {
    "key": "zacchaeus",
    "name": "Zacchaeus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Ministry of Jesus",
    "difficulty": 2,
    "description": "A wealthy, despised tax collector climbs a tree just to see Jesus over the crowd, and is stunned when Jesus invites Himself to his house — an encounter that leaves Zacchaeus a changed man.",
    "events": [
      {
        "id": "zacchaeus-1",
        "text": "Zacchaeus, a short tax collector, climbs a tree to see Jesus",
        "reference": "Luke 19:2-4",
        "sequence": 1
      },
      {
        "id": "zacchaeus-2",
        "text": "Jesus calls Zacchaeus down and invites himself to his house",
        "reference": "Luke 19:5",
        "sequence": 2
      },
      {
        "id": "zacchaeus-3",
        "text": "The crowd grumbles that Jesus is visiting a sinner",
        "reference": "Luke 19:7",
        "sequence": 3
      },
      {
        "id": "zacchaeus-4",
        "text": "Zacchaeus repents and repays those he cheated",
        "reference": "Luke 19:8",
        "sequence": 4
      }
    ]
  },
  {
    "key": "triumphal_entry",
    "name": "The Triumphal Entry",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "Jesus enters Jerusalem riding a borrowed donkey as crowds throw down cloaks and branches and shout praises — a joyful welcome that will turn to hostility within days.",
    "events": [
      {
        "id": "triumphal_entry-1",
        "text": "Jesus sends disciples to bring a donkey",
        "reference": "Matthew 21:2-3",
        "sequence": 1
      },
      {
        "id": "triumphal_entry-2",
        "text": "Jesus rides into Jerusalem on the donkey",
        "reference": "Matthew 21:6-7",
        "sequence": 2
      },
      {
        "id": "triumphal_entry-3",
        "text": "Crowds lay down cloaks and branches",
        "reference": "Matthew 21:8",
        "sequence": 3
      },
      {
        "id": "triumphal_entry-4",
        "text": "The crowds shout Hosanna as he enters",
        "reference": "Matthew 21:9",
        "sequence": 4
      }
    ]
  },
  {
    "key": "cleansing_of_the_temple",
    "name": "Cleansing the Temple",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "Entering the temple courts and finding them turned into a marketplace, Jesus overturns the tables of merchants and money changers, declaring the space was meant for prayer, not profit.",
    "events": [
      {
        "id": "cleansing_of_the_temple-1",
        "text": "Jesus enters the temple courts",
        "reference": "Matthew 21:12",
        "sequence": 1
      },
      {
        "id": "cleansing_of_the_temple-2",
        "text": "Jesus finds merchants and money changers there",
        "reference": "Matthew 21:12",
        "sequence": 2
      },
      {
        "id": "cleansing_of_the_temple-3",
        "text": "Jesus overturns their tables in anger",
        "reference": "Matthew 21:12",
        "sequence": 3
      },
      {
        "id": "cleansing_of_the_temple-4",
        "text": "Jesus declares the temple a house of prayer",
        "reference": "Matthew 21:13",
        "sequence": 4
      }
    ]
  },
  {
    "key": "last_supper",
    "name": "The Last Supper",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "On the night before His crucifixion, Jesus shares a final Passover meal with His disciples, washes their feet, reinterprets the bread and wine as His own body and blood, and predicts both His betrayal and Peter's denial.",
    "events": [
      {
        "id": "last_supper-1",
        "text": "Jesus shares Passover with his disciples",
        "reference": "Matthew 26:20",
        "sequence": 1
      },
      {
        "id": "last_supper-2",
        "text": "Jesus washes his disciples' feet",
        "reference": "John 13:4-5",
        "sequence": 2
      },
      {
        "id": "last_supper-3",
        "text": "Jesus shares bread and wine as his body and blood",
        "reference": "Matthew 26:26-28",
        "sequence": 3
      },
      {
        "id": "last_supper-4",
        "text": "Jesus predicts Peter's denial and his own betrayal",
        "reference": "Matthew 26:21, 34",
        "sequence": 4
      }
    ]
  },
  {
    "key": "gethsemane",
    "name": "Gethsemane",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "Hours before His arrest, Jesus takes His disciples to a garden to pray, agonizing in anguish over what's coming while His closest friends repeatedly fall asleep beside Him.",
    "events": [
      {
        "id": "gethsemane-1",
        "text": "Jesus takes his disciples to the garden to pray",
        "reference": "Matthew 26:36",
        "sequence": 1
      },
      {
        "id": "gethsemane-2",
        "text": "Jesus prays in anguish for the cup to pass",
        "reference": "Matthew 26:39",
        "sequence": 2
      },
      {
        "id": "gethsemane-3",
        "text": "The disciples repeatedly fall asleep",
        "reference": "Matthew 26:40, 43",
        "sequence": 3
      },
      {
        "id": "gethsemane-4",
        "text": "Judas arrives with soldiers to arrest Jesus",
        "reference": "Matthew 26:47-50",
        "sequence": 4
      }
    ]
  },
  {
    "key": "peters_denial",
    "name": "Peter's Denial",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "Warned in advance that he would deny Jesus three times before dawn, Peter follows the arrest at a distance and does exactly that — then breaks down weeping the moment the rooster crows.",
    "events": [
      {
        "id": "peters_denial-1",
        "text": "Jesus predicts Peter will deny him three times",
        "reference": "Matthew 26:34",
        "sequence": 1
      },
      {
        "id": "peters_denial-2",
        "text": "Peter follows at a distance after the arrest",
        "reference": "Matthew 26:58",
        "sequence": 2
      },
      {
        "id": "peters_denial-3",
        "text": "Peter denies knowing Jesus three times",
        "reference": "Matthew 26:69-74",
        "sequence": 3
      },
      {
        "id": "peters_denial-4",
        "text": "The rooster crows and Peter weeps bitterly",
        "reference": "Matthew 26:74-75",
        "sequence": 4
      }
    ]
  },
  {
    "key": "jesus_before_pilate",
    "name": "Jesus Before Pilate",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "Handed over to the Roman governor, Jesus faces a trial where Pilate finds no real charge against him, yet caves to a crowd demanding his death instead of a convicted criminal's.",
    "events": [
      {
        "id": "jesus_before_pilate-1",
        "text": "Jesus is brought before Pilate for trial",
        "reference": "Matthew 27:11-14",
        "sequence": 1
      },
      {
        "id": "jesus_before_pilate-2",
        "text": "Pilate finds no basis for a charge against him",
        "reference": "John 18:38",
        "sequence": 2
      },
      {
        "id": "jesus_before_pilate-3",
        "text": "Pilate offers to release Jesus, but the crowd chooses Barabbas",
        "reference": "Matthew 27:20-21",
        "sequence": 3
      },
      {
        "id": "jesus_before_pilate-4",
        "text": "Pilate hands Jesus over to be crucified",
        "reference": "Matthew 27:26",
        "sequence": 4
      }
    ]
  },
  {
    "key": "crucifixion",
    "name": "The Crucifixion",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "Jesus carries His own cross to a hill outside Jerusalem, is crucified between two criminals, and dies as darkness covers the land and the temple curtain tears from top to bottom.",
    "events": [
      {
        "id": "crucifixion-1",
        "text": "Jesus carries his cross to Golgotha",
        "reference": "John 19:17",
        "sequence": 1
      },
      {
        "id": "crucifixion-2",
        "text": "Jesus is crucified between two criminals",
        "reference": "Matthew 27:35, 38",
        "sequence": 2
      },
      {
        "id": "crucifixion-3",
        "text": "Darkness covers the land as Jesus dies",
        "reference": "Matthew 27:45-46, 50",
        "sequence": 3
      },
      {
        "id": "crucifixion-4",
        "text": "The temple curtain tears in two",
        "reference": "Matthew 27:51",
        "sequence": 4
      }
    ]
  },
  {
    "key": "burial_of_jesus",
    "name": "The Burial of Jesus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "A previously unmentioned follower named Joseph steps forward to give Jesus a proper burial, laying His body in his own new tomb and sealing it with a large stone.",
    "events": [
      {
        "id": "burial_of_jesus-1",
        "text": "Joseph of Arimathea asks Pilate for Jesus' body",
        "reference": "Matthew 27:57-58",
        "sequence": 1
      },
      {
        "id": "burial_of_jesus-2",
        "text": "Joseph wraps the body in a linen cloth",
        "reference": "Matthew 27:59",
        "sequence": 2
      },
      {
        "id": "burial_of_jesus-3",
        "text": "Jesus is laid in Joseph's new tomb",
        "reference": "Matthew 27:60",
        "sequence": 3
      },
      {
        "id": "burial_of_jesus-4",
        "text": "A stone is rolled across the entrance and it's sealed",
        "reference": "Matthew 27:60, 66",
        "sequence": 4
      }
    ]
  },
  {
    "key": "resurrection",
    "name": "The Resurrection",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 1,
    "description": "Early on the third day, women arrive at Jesus' tomb expecting to finish preparing His body — and instead find the stone rolled away, the tomb empty, and an angel announcing He has risen.",
    "events": [
      {
        "id": "resurrection-1",
        "text": "Women go to the tomb early Sunday morning",
        "reference": "Matthew 28:1",
        "sequence": 1
      },
      {
        "id": "resurrection-2",
        "text": "They find the stone rolled away and the tomb empty",
        "reference": "Matthew 28:2, 6",
        "sequence": 2
      },
      {
        "id": "resurrection-3",
        "text": "An angel announces that Jesus has risen",
        "reference": "Matthew 28:5-6",
        "sequence": 3
      },
      {
        "id": "resurrection-4",
        "text": "The women run to tell the disciples",
        "reference": "Matthew 28:7-8",
        "sequence": 4
      }
    ]
  },
  {
    "key": "road_to_emmaus",
    "name": "The Road to Emmaus",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "Two disillusioned disciples walking to a nearby village are joined by a stranger who explains the Scriptures about the Messiah — and turns out, at the dinner table, to be Jesus himself.",
    "events": [
      {
        "id": "road_to_emmaus-1",
        "text": "Two disciples walk to Emmaus discussing Jesus' death",
        "reference": "Luke 24:13-17",
        "sequence": 1
      },
      {
        "id": "road_to_emmaus-2",
        "text": "The risen Jesus joins them, though they don't recognize him",
        "reference": "Luke 24:15-16",
        "sequence": 2
      },
      {
        "id": "road_to_emmaus-3",
        "text": "Jesus explains the scriptures about himself",
        "reference": "Luke 24:27",
        "sequence": 3
      },
      {
        "id": "road_to_emmaus-4",
        "text": "They recognize him as he breaks bread, and he vanishes",
        "reference": "Luke 24:30-31",
        "sequence": 4
      }
    ]
  },
  {
    "key": "doubting_thomas",
    "name": "Doubting Thomas",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "Absent when the risen Jesus first appears to the disciples, Thomas refuses to believe without physical proof — proof Jesus offers him personally a week later.",
    "events": [
      {
        "id": "doubting_thomas-1",
        "text": "The risen Jesus appears to the disciples without Thomas",
        "reference": "John 20:19, 24",
        "sequence": 1
      },
      {
        "id": "doubting_thomas-2",
        "text": "Thomas refuses to believe without seeing the wounds himself",
        "reference": "John 20:25",
        "sequence": 2
      },
      {
        "id": "doubting_thomas-3",
        "text": "Jesus appears again a week later with Thomas present",
        "reference": "John 20:26",
        "sequence": 3
      },
      {
        "id": "doubting_thomas-4",
        "text": "Thomas sees and believes, calling him Lord and God",
        "reference": "John 20:27-28",
        "sequence": 4
      }
    ]
  },
  {
    "key": "great_commission",
    "name": "The Great Commission",
    "category": "NEW_TESTAMENT",
    "subcategory": "Passion Week",
    "difficulty": 2,
    "description": "On a mountain in Galilee, the risen Jesus gives His disciples their final marching orders: make disciples of every nation, with the promise of His presence to the very end of the age.",
    "events": [
      {
        "id": "great_commission-1",
        "text": "The risen Jesus meets the disciples on a mountain in Galilee",
        "reference": "Matthew 28:16",
        "sequence": 1
      },
      {
        "id": "great_commission-2",
        "text": "Some worship him while others doubt",
        "reference": "Matthew 28:17",
        "sequence": 2
      },
      {
        "id": "great_commission-3",
        "text": "Jesus declares all authority has been given to him",
        "reference": "Matthew 28:18",
        "sequence": 3
      },
      {
        "id": "great_commission-4",
        "text": "Jesus commissions them to make disciples of all nations",
        "reference": "Matthew 28:19-20",
        "sequence": 4
      }
    ]
  },
  {
    "key": "ascension",
    "name": "The Ascension",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 2,
    "description": "After forty days of appearances following His resurrection, Jesus gives His disciples final instructions and is taken up into the sky before their eyes, with a promise that He will return the same way.",
    "events": [
      {
        "id": "ascension-1",
        "text": "Jesus appears to his disciples over forty days",
        "reference": "Acts 1:3",
        "sequence": 1
      },
      {
        "id": "ascension-2",
        "text": "Jesus gives final instructions to wait for the Spirit",
        "reference": "Acts 1:4-5",
        "sequence": 2
      },
      {
        "id": "ascension-3",
        "text": "Jesus is taken up into the sky before their eyes",
        "reference": "Acts 1:9",
        "sequence": 3
      },
      {
        "id": "ascension-4",
        "text": "Two angels tell them he will return the same way",
        "reference": "Acts 1:10-11",
        "sequence": 4
      }
    ]
  },
  {
    "key": "pentecost",
    "name": "Pentecost",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 1,
    "description": "Fifty days after the resurrection, the disciples gathered in Jerusalem experience a rushing wind, tongues of fire, and the sudden ability to speak in other languages — the birth of the church.",
    "events": [
      {
        "id": "pentecost-1",
        "text": "The disciples are gathered together in Jerusalem",
        "reference": "Acts 2:1",
        "sequence": 1
      },
      {
        "id": "pentecost-2",
        "text": "A sound like a rushing wind fills the house",
        "reference": "Acts 2:2",
        "sequence": 2
      },
      {
        "id": "pentecost-3",
        "text": "Tongues of fire rest on each of them",
        "reference": "Acts 2:3",
        "sequence": 3
      },
      {
        "id": "pentecost-4",
        "text": "They speak in other languages and Peter preaches to the crowd",
        "reference": "Acts 2:4, 14",
        "sequence": 4
      }
    ]
  },
  {
    "key": "peter_heals_the_lame_man",
    "name": "Peter Heals a Lame Man",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 2,
    "description": "At the temple gate, a man lame from birth asks Peter and John for money — and receives something far greater instead, walking and leaping in front of an astonished crowd.",
    "events": [
      {
        "id": "peter_heals_the_lame_man-1",
        "text": "A man lame from birth begs at the temple gate",
        "reference": "Acts 3:2",
        "sequence": 1
      },
      {
        "id": "peter_heals_the_lame_man-2",
        "text": "Peter tells him he has no silver or gold to give",
        "reference": "Acts 3:6",
        "sequence": 2
      },
      {
        "id": "peter_heals_the_lame_man-3",
        "text": "Peter heals him in the name of Jesus Christ",
        "reference": "Acts 3:6-7",
        "sequence": 3
      },
      {
        "id": "peter_heals_the_lame_man-4",
        "text": "The man walks, leaps, and praises God",
        "reference": "Acts 3:8",
        "sequence": 4
      }
    ]
  },
  {
    "key": "stephen",
    "name": "Stephen",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 2,
    "description": "The church's first deacon becomes its first martyr, boldly recounting Israel's history before a hostile council and dying in a hail of stones while praying for his killers' forgiveness.",
    "events": [
      {
        "id": "stephen-1",
        "text": "Stephen is falsely accused before the council",
        "reference": "Acts 6:11-13",
        "sequence": 1
      },
      {
        "id": "stephen-2",
        "text": "Stephen recounts Israel's history and confronts his accusers",
        "reference": "Acts 7:2, 51-53",
        "sequence": 2
      },
      {
        "id": "stephen-3",
        "text": "The council is enraged and drags him out of the city",
        "reference": "Acts 7:54, 57-58",
        "sequence": 3
      },
      {
        "id": "stephen-4",
        "text": "Stephen is stoned to death while praying for his killers",
        "reference": "Acts 7:59-60",
        "sequence": 4
      }
    ]
  },
  {
    "key": "ethiopian_eunuch",
    "name": "The Ethiopian Eunuch",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 3,
    "description": "An angel sends Philip to a lonely desert road, where he finds a foreign official puzzling over a passage from Isaiah — and walks him straight to faith and baptism in a matter of minutes.",
    "events": [
      {
        "id": "ethiopian_eunuch-1",
        "text": "An angel sends Philip to a desert road",
        "reference": "Acts 8:26",
        "sequence": 1
      },
      {
        "id": "ethiopian_eunuch-2",
        "text": "Philip meets an Ethiopian official reading Isaiah",
        "reference": "Acts 8:27-28",
        "sequence": 2
      },
      {
        "id": "ethiopian_eunuch-3",
        "text": "Philip explains that the passage is about Jesus",
        "reference": "Acts 8:34-35",
        "sequence": 3
      },
      {
        "id": "ethiopian_eunuch-4",
        "text": "Philip baptizes the eunuch in nearby water",
        "reference": "Acts 8:36, 38",
        "sequence": 4
      }
    ]
  },
  {
    "key": "pauls_conversion",
    "name": "Paul's Conversion",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 1,
    "description": "Saul, a zealous persecutor of the early church, is traveling to Damascus to arrest Christians when a blinding light from heaven stops him in his tracks and Jesus speaks to him directly.",
    "events": [
      {
        "id": "pauls_conversion-1",
        "text": "Saul travels to Damascus to arrest Christians",
        "reference": "Acts 9:1-2",
        "sequence": 1
      },
      {
        "id": "pauls_conversion-2",
        "text": "A blinding light from heaven stops him on the road",
        "reference": "Acts 9:3",
        "sequence": 2
      },
      {
        "id": "pauls_conversion-3",
        "text": "Jesus speaks to Saul, and he is struck blind",
        "reference": "Acts 9:4-8",
        "sequence": 3
      },
      {
        "id": "pauls_conversion-4",
        "text": "Ananias restores his sight and Saul is baptized",
        "reference": "Acts 9:17-18",
        "sequence": 4
      }
    ]
  },
  {
    "key": "pauls_missionary_journeys",
    "name": "Paul's Missionary Journeys",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 2,
    "description": "The church at Antioch commissions Paul and Barnabas for a preaching tour across Cyprus and Asia Minor, where they meet both remarkable success and fierce persecution city after city.",
    "events": [
      {
        "id": "pauls_missionary_journeys-1",
        "text": "The church at Antioch sets apart Paul and Barnabas",
        "reference": "Acts 13:2-3",
        "sequence": 1
      },
      {
        "id": "pauls_missionary_journeys-2",
        "text": "Paul and Barnabas preach across Cyprus and Asia Minor",
        "reference": "Acts 13:4-5, 13-14",
        "sequence": 2
      },
      {
        "id": "pauls_missionary_journeys-3",
        "text": "They face both success and persecution in city after city",
        "reference": "Acts 14:1-6, 19",
        "sequence": 3
      },
      {
        "id": "pauls_missionary_journeys-4",
        "text": "They return to report all God had done through them",
        "reference": "Acts 14:26-27",
        "sequence": 4
      }
    ]
  },
  {
    "key": "peter_and_cornelius",
    "name": "Peter and Cornelius",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 3,
    "description": "A Roman centurion's vision and Peter's own rooftop vision converge to break open the early church's biggest boundary: the gospel isn't for Jews only, and the Spirit falls on Gentiles too.",
    "events": [
      {
        "id": "peter_and_cornelius-1",
        "text": "Cornelius is told in a vision to send for Peter",
        "reference": "Acts 10:3-5",
        "sequence": 1
      },
      {
        "id": "peter_and_cornelius-2",
        "text": "Peter has a vision releasing him from dietary restrictions",
        "reference": "Acts 10:9-15",
        "sequence": 2
      },
      {
        "id": "peter_and_cornelius-3",
        "text": "Peter visits Cornelius and preaches the gospel",
        "reference": "Acts 10:24, 34-43",
        "sequence": 3
      },
      {
        "id": "peter_and_cornelius-4",
        "text": "The Holy Spirit falls on the Gentiles present",
        "reference": "Acts 10:44-45",
        "sequence": 4
      }
    ]
  },
  {
    "key": "paul_and_silas",
    "name": "Paul and Silas in Prison",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 2,
    "description": "Beaten and jailed in Philippi for casting out a spirit, Paul and Silas spend midnight singing hymns instead of despairing — right before an earthquake shakes the prison doors open.",
    "events": [
      {
        "id": "paul_and_silas-1",
        "text": "Paul and Silas are beaten and imprisoned in Philippi",
        "reference": "Acts 16:22-24",
        "sequence": 1
      },
      {
        "id": "paul_and_silas-2",
        "text": "They pray and sing hymns at midnight",
        "reference": "Acts 16:25",
        "sequence": 2
      },
      {
        "id": "paul_and_silas-3",
        "text": "An earthquake shakes open the prison doors",
        "reference": "Acts 16:26",
        "sequence": 3
      },
      {
        "id": "paul_and_silas-4",
        "text": "The jailer and his household believe and are baptized",
        "reference": "Acts 16:31-33",
        "sequence": 4
      }
    ]
  },
  {
    "key": "paul_in_athens",
    "name": "Paul in Athens",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 3,
    "description": "Waiting in a city full of idols, Paul can't stay silent — he reasons daily in the marketplace and eventually addresses Athens' philosophers directly about the 'unknown god' they already worship.",
    "events": [
      {
        "id": "paul_in_athens-1",
        "text": "Paul waits in Athens, distressed by its idols",
        "reference": "Acts 17:16",
        "sequence": 1
      },
      {
        "id": "paul_in_athens-2",
        "text": "Paul reasons in the synagogue and marketplace daily",
        "reference": "Acts 17:17",
        "sequence": 2
      },
      {
        "id": "paul_in_athens-3",
        "text": "Paul addresses the Areopagus about the unknown god",
        "reference": "Acts 17:22-23",
        "sequence": 3
      },
      {
        "id": "paul_in_athens-4",
        "text": "Some mock, but some believe, including Dionysius",
        "reference": "Acts 17:32-34",
        "sequence": 4
      }
    ]
  },
  {
    "key": "pauls_shipwreck",
    "name": "Paul's Shipwreck",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 2,
    "description": "Sailing for Rome as a prisoner, Paul survives a violent, days-long storm that eventually wrecks the ship entirely — yet every single person aboard makes it safely to shore, just as Paul had promised.",
    "events": [
      {
        "id": "pauls_shipwreck-1",
        "text": "Paul sails for Rome as a prisoner",
        "reference": "Acts 27:1",
        "sequence": 1
      },
      {
        "id": "pauls_shipwreck-2",
        "text": "A violent storm drives the ship for many days",
        "reference": "Acts 27:18-20",
        "sequence": 2
      },
      {
        "id": "pauls_shipwreck-3",
        "text": "The ship runs aground and breaks apart",
        "reference": "Acts 27:41",
        "sequence": 3
      },
      {
        "id": "pauls_shipwreck-4",
        "text": "Everyone aboard reaches shore safely as Paul foretold",
        "reference": "Acts 27:44",
        "sequence": 4
      }
    ]
  },
  {
    "key": "paul_in_rome",
    "name": "Paul in Rome",
    "category": "NEW_TESTAMENT",
    "subcategory": "Paul",
    "difficulty": 3,
    "description": "Still technically a prisoner, Paul is allowed to live under guard in his own rented house in Rome — and uses the freedom he does have to welcome visitors and preach boldly, unhindered.",
    "events": [
      {
        "id": "paul_in_rome-1",
        "text": "Paul arrives in Rome still a prisoner",
        "reference": "Acts 28:16",
        "sequence": 1
      },
      {
        "id": "paul_in_rome-2",
        "text": "Paul is allowed to live under guard in his own rented house",
        "reference": "Acts 28:30",
        "sequence": 2
      },
      {
        "id": "paul_in_rome-3",
        "text": "Paul welcomes all who come to him",
        "reference": "Acts 28:30",
        "sequence": 3
      },
      {
        "id": "paul_in_rome-4",
        "text": "Paul boldly preaches the kingdom of God unhindered",
        "reference": "Acts 28:31",
        "sequence": 4
      }
    ]
  },
  {
    "key": "james_death_and_peters_escape",
    "name": "James' Death and Peter's Escape",
    "category": "NEW_TESTAMENT",
    "subcategory": "Early Church",
    "difficulty": 3,
    "description": "King Herod's persecution of the church claims the apostle James' life and lands Peter in prison next — until an angel walks Peter past sleeping guards and locked gates to freedom.",
    "events": [
      {
        "id": "james_death_and_peters_escape-1",
        "text": "Herod Agrippa begins persecuting the church",
        "reference": "Acts 12:1",
        "sequence": 1
      },
      {
        "id": "james_death_and_peters_escape-2",
        "text": "Herod has James, the brother of John, executed",
        "reference": "Acts 12:2",
        "sequence": 2
      },
      {
        "id": "james_death_and_peters_escape-3",
        "text": "Seeing this pleases the people, so Herod arrests Peter too",
        "reference": "Acts 12:3-4",
        "sequence": 3
      },
      {
        "id": "james_death_and_peters_escape-4",
        "text": "An angel frees Peter from prison",
        "reference": "Acts 12:7-10",
        "sequence": 4
      }
    ]
  },
  {
    "key": "revelation_new_jerusalem",
    "name": "The New Jerusalem",
    "category": "NEW_TESTAMENT",
    "subcategory": "Revelation",
    "difficulty": 3,
    "description": "Exiled on the island of Patmos, John receives a vision of the world's ending — not in destruction alone, but in a new heaven and earth, and a city where God dwells with His people forever.",
    "events": [
      {
        "id": "revelation_new_jerusalem-1",
        "text": "John receives a vision on the island of Patmos",
        "reference": "Revelation 1:9-10",
        "sequence": 1
      },
      {
        "id": "revelation_new_jerusalem-2",
        "text": "John sees a new heaven and a new earth",
        "reference": "Revelation 21:1",
        "sequence": 2
      },
      {
        "id": "revelation_new_jerusalem-3",
        "text": "John sees the new Jerusalem coming down from heaven",
        "reference": "Revelation 21:2",
        "sequence": 3
      },
      {
        "id": "revelation_new_jerusalem-4",
        "text": "A voice declares God will dwell with his people and end death",
        "reference": "Revelation 21:3-4",
        "sequence": 4
      }
    ]
  }
];

// Export for both the browser (globals) and Node (for the test script).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { STORIES };
} else if (typeof window !== "undefined") {
  window.STORIES = STORIES;
}
