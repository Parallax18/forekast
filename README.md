This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, pull the code and install dependencies

```bash
npm i
# or
yarn
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Structure

This project utilizes nextjs server actions to make requests to [`weather-api`](https://app.swaggerhub.com/apis-docs/WeatherAPI.com/WeatherAPI/1.0.2#/) without suffering CORs error

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load the custom Google Font.

[`React query`](https://tanstack.com/query/latest/docs/framework/react/installation) is used to handle API calls.

Styling is handled with [`tailwindcss`](https://tailwindcss.com/) .


## Deployed on Vercel

The application is live on vercel at [`Forekast`](https://forekast-sage.vercel.app/)
