# dkat4

2023 redesign of [danielkauer.at](https://www.danielkauer.at/) featuring a portfolio of selected projects.
This project uses [Parcel](https://parceljs.org/) as its main bundler, but [Vite](https://vitejs.dev/) is also utilized for component driven development using [Storybook](https://storybook.js.org/).

## Site Content

The actual site content is not included in this repository due to its size.
See the comment on top on `app.tsx` on how to build using provided example data.

## Development and Building

Install dependencies using `yarn install`

- use `yarn storybook` for running Storybook
- use `yarn dev` for HMR development
- use `yarn build` for a production build of the site