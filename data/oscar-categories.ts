import type { Category } from "../types/oscar-types"

export const oscarCategories: Category[] = [
  {
    id: "best-picture",
    name: "Best Picture",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "barbie", name: "Barbie" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "poor-things", name: "Poor Things" },
      { id: "maestro", name: "Maestro" },
    ],
  },
  {
    id: "best-director",
    name: "Best Director",
    nominees: [
      { id: "christopher-nolan", name: "Christopher Nolan (Oppenheimer)" },
      { id: "martin-scorsese", name: "Martin Scorsese (Killers of the Flower Moon)" },
      { id: "yorgos-lanthimos", name: "Yorgos Lanthimos (Poor Things)" },
      { id: "jonathan-glazer", name: "Jonathan Glazer (The Zone of Interest)" },
      { id: "justine-triet", name: "Justine Triet (Anatomy of a Fall)" },
    ],
  },
  {
    id: "best-actor",
    name: "Best Actor",
    nominees: [
      { id: "cillian-murphy", name: "Cillian Murphy (Oppenheimer)" },
      { id: "bradley-cooper", name: "Bradley Cooper (Maestro)" },
      { id: "colman-domingo", name: "Colman Domingo (Rustin)" },
      { id: "paul-giamatti", name: "Paul Giamatti (The Holdovers)" },
      { id: "jeffrey-wright", name: "Jeffrey Wright (American Fiction)" },
    ],
  },
  {
    id: "best-actress",
    name: "Best Actress",
    nominees: [
      { id: "lily-gladstone", name: "Lily Gladstone (Killers of the Flower Moon)" },
      { id: "emma-stone", name: "Emma Stone (Poor Things)" },
      { id: "sandra-huller", name: "Sandra Hüller (Anatomy of a Fall)" },
      { id: "carey-mulligan", name: "Carey Mulligan (Maestro)" },
      { id: "annette-bening", name: "Annette Bening (Nyad)" },
    ],
  },
  {
    id: "best-cinematography",
    name: "Best Cinematography",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "poor-things", name: "Poor Things" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "maestro", name: "Maestro" },
      { id: "el-conde", name: "El Conde" },
    ],
  },
  {
    id: "best-production-design",
    name: "Best Production Design",
    nominees: [
      { id: "poor-things", name: "Poor Things" },
      { id: "barbie", name: "Barbie" },
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "napoleon", name: "Napoleon" },
    ],
  },
  {
    id: "best-adapted-screenplay",
    name: "Best Adapted Screenplay",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "poor-things", name: "Poor Things" },
      { id: "american-fiction", name: "American Fiction" },
      { id: "zone-of-interest", name: "The Zone of Interest" },
      { id: "barbie", name: "Barbie" },
    ],
  },
  {
    id: "best-sound",
    name: "Best Sound",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "the-creator", name: "The Creator" },
      { id: "maestro", name: "Maestro" },
      { id: "mission-impossible", name: "Mission: Impossible - Dead Reckoning Part One" },
      { id: "zone-of-interest", name: "The Zone of Interest" },
    ],
  },
  {
    id: "best-animated-short-film",
    name: "Best Animated Short Film",
    nominees: [
      { id: "letter-to-a-pig", name: "Letter to a Pig" },
      { id: "ninety-five-senses", name: "Ninety-Five Senses" },
      { id: "our-uniform", name: "Our Uniform" },
      { id: "pachyderme", name: "Pachyderme" },
      { id: "war-is-over", name: "War Is Over! Inspired by the Music of John & Yoko" },
    ],
  },
  {
    id: "best-live-action-short-film",
    name: "Best Live Action Short Film",
    nominees: [
      { id: "the-after", name: "The After" },
      { id: "invincible", name: "Invincible" },
      { id: "knight-of-fortune", name: "Knight of Fortune" },
      { id: "red-white-and-blue", name: "Red, White and Blue" },
      { id: "the-wonderful-story-of-henry-sugar", name: "The Wonderful Story of Henry Sugar" },
    ],
  },
  {
    id: "best-film-editing",
    name: "Best Film Editing",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "poor-things", name: "Poor Things" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "anatomy-of-a-fall", name: "Anatomy of a Fall" },
      { id: "the-holdovers", name: "The Holdovers" },
    ],
  },
  {
    id: "best-original-score",
    name: "Best Original Score",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "poor-things", name: "Poor Things" },
      { id: "indiana-jones", name: "Indiana Jones and the Dial of Destiny" },
      { id: "american-fiction", name: "American Fiction" },
    ],
  },
  {
    id: "best-original-song",
    name: "Best Original Song",
    nominees: [
      { id: "what-was-i-made-for", name: "What Was I Made For? (Barbie)" },
      { id: "im-just-ken", name: "I'm Just Ken (Barbie)" },
      { id: "the-fire-inside", name: "The Fire Inside (Flamin' Hot)" },
      { id: "wahzhazhe", name: "Wahzhazhe (A Song for My People) (Killers of the Flower Moon)" },
      { id: "it-never-went-away", name: "It Never Went Away (American Symphony)" },
    ],
  },
  {
    id: "best-supporting-actor",
    name: "Best Supporting Actor",
    nominees: [
      { id: "robert-downey-jr", name: "Robert Downey Jr. (Oppenheimer)" },
      { id: "ryan-gosling", name: "Ryan Gosling (Barbie)" },
      { id: "mark-ruffalo", name: "Mark Ruffalo (Poor Things)" },
      { id: "robert-de-niro", name: "Robert De Niro (Killers of the Flower Moon)" },
      { id: "sterling-k-brown", name: "Sterling K. Brown (American Fiction)" },
    ],
  },
  {
    id: "best-supporting-actress",
    name: "Best Supporting Actress",
    nominees: [
      { id: "davine-joy-randolph", name: "Da'Vine Joy Randolph (The Holdovers)" },
      { id: "emily-blunt", name: "Emily Blunt (Oppenheimer)" },
      { id: "danielle-brooks", name: "Danielle Brooks (The Color Purple)" },
      { id: "jodie-foster", name: "Jodie Foster (Nyad)" },
      { id: "america-ferrera", name: "America Ferrera (Barbie)" },
    ],
  },
  {
    id: "best-visual-effects",
    name: "Best Visual Effects",
    nominees: [
      { id: "the-creator", name: "The Creator" },
      { id: "godzilla-minus-one", name: "Godzilla Minus One" },
      { id: "guardians-of-the-galaxy-vol-3", name: "Guardians of the Galaxy Vol. 3" },
      { id: "mission-impossible", name: "Mission: Impossible - Dead Reckoning Part One" },
      { id: "napoleon", name: "Napoleon" },
    ],
  },
  {
    id: "best-original-screenplay",
    name: "Best Original Screenplay",
    nominees: [
      { id: "anatomy-of-a-fall", name: "Anatomy of a Fall" },
      { id: "the-holdovers", name: "The Holdovers" },
      { id: "maestro", name: "Maestro" },
      { id: "may-december", name: "May December" },
      { id: "past-lives", name: "Past Lives" },
    ],
  },
  {
    id: "best-documentary-short-film",
    name: "Best Documentary Short Film",
    nominees: [
      { id: "the-abcs-of-book-banning", name: "The ABCs of Book Banning" },
      { id: "the-barber-of-little-rock", name: "The Barber of Little Rock" },
      { id: "island-in-between", name: "Island in Between" },
      { id: "the-last-repair-shop", name: "The Last Repair Shop" },
      { id: "nai-nai-and-wai-po", name: "Nǎi Nai & Wài Pó" },
    ],
  },
  {
    id: "best-documentary-feature-film",
    name: "Best Documentary Feature Film",
    nominees: [
      { id: "20-days-in-mariupol", name: "20 Days in Mariupol" },
      { id: "bobi-wine", name: "Bobi Wine: The People's President" },
      { id: "the-eternal-memory", name: "The Eternal Memory" },
      { id: "four-daughters", name: "Four Daughters" },
      { id: "to-kill-a-tiger", name: "To Kill a Tiger" },
    ],
  },
  {
    id: "best-international-feature-film",
    name: "Best International Feature Film",
    nominees: [
      { id: "io-capitano", name: "Io Capitano (Italy)" },
      { id: "perfect-days", name: "Perfect Days (Japan)" },
      { id: "society-of-the-snow", name: "Society of the Snow (Spain)" },
      { id: "the-teachers-lounge", name: "The Teachers' Lounge (Germany)" },
      { id: "zone-of-interest", name: "The Zone of Interest (United Kingdom)" },
    ],
  },
  {
    id: "best-costume-design",
    name: "Best Costume Design",
    nominees: [
      { id: "barbie", name: "Barbie" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "napoleon", name: "Napoleon" },
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "poor-things", name: "Poor Things" },
    ],
  },
  {
    id: "best-makeup-and-hairstyling",
    name: "Best Makeup and Hairstyling",
    nominees: [
      { id: "golda", name: "Golda" },
      { id: "maestro", name: "Maestro" },
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "poor-things", name: "Poor Things" },
      { id: "society-of-the-snow", name: "Society of the Snow" },
    ],
  },
  {
    id: "best-animated-feature-film",
    name: "Best Animated Feature Film",
    nominees: [
      { id: "the-boy-and-the-heron", name: "The Boy and the Heron" },
      { id: "elemental", name: "Elemental" },
      { id: "nimona", name: "Nimona" },
      { id: "robot-dreams", name: "Robot Dreams" },
      { id: "spider-man-across-the-spider-verse", name: "Spider-Man: Across the Spider-Verse" },
    ],
  },
  {
    id: "best-casting",
    name: "Best Casting",
    nominees: [
      { id: "oppenheimer", name: "Oppenheimer" },
      { id: "barbie", name: "Barbie" },
      { id: "killers-of-the-flower-moon", name: "Killers of the Flower Moon" },
      { id: "poor-things", name: "Poor Things" },
      { id: "the-holdovers", name: "The Holdovers" },
    ],
  },
]

