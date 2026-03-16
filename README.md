## Overview
A simple palette generator in Next.js with shadcn components and tailwind, made after my frustration with existing ones. Kind of a spur-of-the-moment project I'm working on for fun in my spare time. It's nowhere near complete yet (not even an MVP, really), but it has a few basic functionalities:

- Generates palette swatches using oklch and some clever math
- Add more rows (or remove them)
- Add more columns (removal not implemented)
- Select color for each row via numeric hue input
- Expand row for detailed tweaks to chroma and luminosity

I'm also doing this all by hand, as [recent](https://www.thelancet.com/journals/langas/article/PIIS2468-1253(25)00133-5/abstract) [studies](https://pmc.ncbi.nlm.nih.gov/articles/PMC11239631/) have shown that skills can decay with excessive AI use, so I am using this project as a 'whetstone' for keeping my programming skills sharp.

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
