import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    {
      id: "best-picture",
      name: "Best Picture",
      nominees: [
        { id: "anora", name: "Anora" },
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "a-complete-unknown", name: "A Complete Unknown" },
        { id: "conclave", name: "Conclave" },
        { id: "dune-part-two", name: "Dune: Part Two" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "im-still-here", name: "I’m Still Here" },
        { id: "nickel-boys", name: "Nickel Boys" },
        { id: "the-substance", name: "The Substance" },
        { id: "wicked", name: "Wicked" },
      ],
    },
    {
      id: "best-actor",
      name: "Best Actor",
      nominees: [
        { id: "adrien-brody", name: "Adrien Brody (The Brutalist)" },
        {
          id: "timothee-chalamet",
          name: "Timothée Chalamet (A Complete Unknown)",
        },
        { id: "colman-domingo", name: "Colman Domingo (Sing Sing)" },
        { id: "ralph-fiennes", name: "Ralph Fiennes (Conclave)" },
        { id: "sebastian-stan", name: "Sebastian Stan (The Apprentice)" },
      ],
    },
    {
      id: "best-actress",
      name: "Best Actress",
      nominees: [
        { id: "cynthia-erivo", name: "Cynthia Erivo (Wicked)" },
        { id: "karla-sofia-gascon", name: "Karla Sofía Gascón (Emilia Pérez)" },
        { id: "mikey-madison", name: "Mikey Madison (Anora)" },
        { id: "demi-moore", name: "Demi Moore (The Substance)" },
        { id: "fernanda-torres", name: "Fernanda Torres (I’m Still Here)" },
      ],
    },
    {
      id: "best-supporting-actor",
      name: "Best Supporting Actor",
      nominees: [
        { id: "yura-borisov", name: "Yura Borisov (Anora)" },
        { id: "kieran-culkin", name: "Kieran Culkin (A Real Pain)" },
        { id: "edward-norton", name: "Edward Norton (A Complete Unknown)" },
        { id: "guy-pearce", name: "Guy Pearce (The Brutalist)" },
        { id: "jeremy-strong", name: "Jeremy Strong (The Apprentice)" },
      ],
    },
    {
      id: "best-supporting-actress",
      name: "Best Supporting Actress",
      nominees: [
        { id: "monica-barbaro", name: "Monica Barbaro (A Complete Unknown)" },
        { id: "ariana-grande", name: "Ariana Grande (Wicked)" },
        { id: "felicity-jones", name: "Felicity Jones (The Brutalist)" },
        { id: "isabella-rossellini", name: "Isabella Rossellini (Conclave)" },
        { id: "zoe-saldana", name: "Zoe Saldaña (Emilia Pérez)" },
      ],
    },
    {
      id: "best-directing",
      name: "Best Directing",
      nominees: [
        { id: "sean-baker", name: "Sean Baker (Anora)" },
        { id: "brady-corbet", name: "Brady Corbet (The Brutalist)" },
        { id: "james-mangold", name: "James Mangold (A Complete Unknown)" },
        { id: "jacques-audiard", name: "Jacques Audiard (Emilia Pérez)" },
        { id: "coralie-fargeat", name: "Coralie Fargeat (The Substance)" },
      ],
    },
    {
      id: "best-adapted-screenplay",
      name: "Best Adapted Screenplay",
      nominees: [
        { id: "a-complete-unknown", name: "A Complete Unknown" },
        { id: "conclave", name: "Conclave" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "nickel-boys", name: "Nickel Boys" },
        { id: "sing-sing", name: "Sing Sing" },
      ],
    },
    {
      id: "best-original-screenplay",
      name: "Best Original Screenplay",
      nominees: [
        { id: "anora", name: "Anora" },
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "a-real-pain", name: "A Real Pain" },
        { id: "september-5", name: "September 5" },
        { id: "the-substance", name: "The Substance" },
      ],
    },
    {
      id: "best-international-feature-film",
      name: "Best International Feature Film",
      nominees: [
        { id: "i-still-here", name: "I'm Still Here" },
        { id: "the-girl-with-the-needle", name: "The Girl With the Needle" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "the-seed-of-a-sacred-fig", name: "The Seed of a Sacred Fig" },
        { id: "flow", name: "Flow" },
      ],
    },
    {
      id: "best-animated-feature-film",
      name: "Best Animated Feature Film",
      nominees: [
        { id: "flow", name: "Flow" },
        { id: "inside-out-2", name: "Inside Out 2" },
        { id: "memoir-of-a-snail", name: "Memoir of a Snail" },
        {
          id: "wallace-and-gromit-vengeance",
          name: "Wallace & Gromit: Vengeance Most Fowl",
        },
        { id: "the-wild-robot", name: "The Wild Robot" },
      ],
    },
    {
      id: "best-documentary-feature-film",
      name: "Best Documentary Feature Film",
      nominees: [
        { id: "black-box-diaries", name: "Black Box Diaries" },
        { id: "no-other-land", name: "No Other Land" },
        { id: "porcelain-war", name: "Porcelain War" },
        { id: "soundtrack-to-a-coup", name: "Soundtrack to a Coup d'Etat" },
        { id: "sugarcane", name: "Sugarcane" },
      ],
    },
    {
      id: "best-film-editing",
      name: "Best Film Editing",
      nominees: [
        { id: "anora", name: "Anora" },
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "conclave", name: "Conclave" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "wicked", name: "Wicked" },
      ],
    },
    {
      id: "best-cinematography",
      name: "Best Cinematography",
      nominees: [
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "dune-part-two", name: "Dune: Part Two" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "maria", name: "Maria" },
        { id: "nosferatu", name: "Nosferatu" },
      ],
    },
    {
      id: "best-production-design",
      name: "Best Production Design",
      nominees: [
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "conclave", name: "Conclave" },
        { id: "dune-part-two", name: "Dune: Part Two" },
        { id: "nosferatu", name: "Nosferatu" },
        { id: "wicked", name: "Wicked" },
      ],
    },
    {
      id: "best-costume-design",
      name: "Best Costume Design",
      nominees: [
        { id: "a-complete-unknown", name: "A Complete Unknown" },
        { id: "conclave", name: "Conclave" },
        { id: "gladiator-ii", name: "Gladiator II" },
        { id: "nosferatu", name: "Nosferatu" },
        { id: "wicked", name: "Wicked" },
      ],
    },
    {
      id: "best-original-score",
      name: "Best Original Score",
      nominees: [
        { id: "the-brutalist", name: "The Brutalist" },
        { id: "conclave", name: "Conclave" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "wicked", name: "Wicked" },
        { id: "the-wild-robot", name: "The Wild Robot" },
      ],
    },
    {
      id: "best-original-song",
      name: "Best Original Song",
      nominees: [
        { id: "el-mal", name: "El Mal, Emilia Pérez" },
        { id: "the-journey", name: "The Journey, The Six Triple Eight" },
        { id: "like-a-bird", name: "Like a Bird, Sing Sing" },
        { id: "mi-camino", name: "Mi Camino, Emilia Pérez" },
        {
          id: "never-too-late",
          name: "Never Too Late, Elton John: Never Too Late",
        },
      ],
    },
    {
      id: "best-live-action-short-film",
      name: "Best Live Action Short Film",
      nominees: [
        { id: "a-lien", name: "A Lien" },
        { id: "anuja", name: "Anuja" },
        { id: "im-not-a-robot", name: "I'm Not a Robot" },
        { id: "the-last-ranger", name: "The Last Ranger" },
        {
          id: "the-man-who-could-not-remain-silent",
          name: "The Man Who Could Not Remain Silent",
        },
      ],
    },
    {
      id: "best-animated-short-film",
      name: "Best Animated Short Film",
      nominees: [
        { id: "beautiful-men", name: "Beautiful Men" },
        {
          id: "in-the-shadow-of-the-cypress",
          name: "In the Shadow of the Cypress",
        },
        { id: "magic-candies", name: "Magic Candies" },
        { id: "wander-to-wonder", name: "Wander to Wonder" },
        { id: "yuck", name: "Yuck!" },
      ],
    },
    {
      id: "best-documentary-short-film",
      name: "Best Documentary Short Film",
      nominees: [
        { id: "death-by-numbers", name: "Death By Numbers" },
        { id: "i-am-ready-warden", name: "I Am Ready, Warden" },
        { id: "incident", name: "Incident" },
        {
          id: "instruments-of-a-beating-heart",
          name: "Instruments of a Beating Heart",
        },
        {
          id: "the-only-girl-in-the-orchestra",
          name: "The Only Girl in the Orchestra",
        },
      ],
    },
    {
      id: "best-makeup-and-hairstyling",
      name: "Best Makeup and Hairstyling",
      nominees: [
        { id: "a-different-man", name: "A Different Man" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "nosferatu", name: "Nosferatu" },
        { id: "the-substance", name: "The Substance" },
        { id: "wicked", name: "Wicked" },
      ],
    },
    {
      id: "best-sound",
      name: "Best Sound",
      nominees: [
        { id: "a-complete-unknown", name: "A Complete Unknown" },
        { id: "dune-part-two", name: "Dune: Part Two" },
        { id: "emilia-perez", name: "Emilia Pérez" },
        { id: "wicked", name: "Wicked" },
        { id: "the-wild-robot", name: "The Wild Robot" },
      ],
    },
    {
      id: "best-visual-effects",
      name: "Best Visual Effects",
      nominees: [
        { id: "alien-romulus", name: "Alien: Romulus" },
        { id: "better-man", name: "Better Man" },
        { id: "dune-part-two", name: "Dune: Part Two" },
        {
          id: "kingdom-of-the-planet-of-the-apes",
          name: "Kingdom of the Planet of the Apes",
        },
        { id: "wicked", name: "Wicked" },
      ],
    },
  ];

  for (const category of categories) {
    // First, create or update the category
    const createdCategory = await prisma.category.upsert({
      where: { id: category.id },
      update: { name: category.name },
      create: { id: category.id, name: category.name },
    });

    // Then, handle the nominees
    for (const nominee of category.nominees) {
      const upsertedNominee = await prisma.nominee.upsert({
        where: {
          id: `${nominee.id}-${createdCategory.id}`, // Combine nominee id and category id
        },
        update: {
          name: nominee.name,
          categoryId: createdCategory.id,
        },
        create: {
          id: `${nominee.id}-${createdCategory.id}`, // Unique id for each category nomination
          name: nominee.name,
          categoryId: createdCategory.id,
        },
      });
      console.log(
        `Upserted nominee: ${upsertedNominee.name} in ${category.name}`
      );
    }

    const nomineeCount = await prisma.nominee.count({
      where: { categoryId: createdCategory.id },
    });
    console.log(`${category.name} actually has ${nomineeCount} nominees`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
