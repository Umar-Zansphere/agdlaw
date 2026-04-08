This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## E2E Reporting And Jenkins

Run the Playwright suite with:

```bash
pnpm test:e2e
```

The suite now produces these CI-friendly artifacts:

- `test-results/e2e-email-report.html` for Jenkins Extended Email notifications
- `test-results/e2e-junit.xml` for Jenkins test result publishing
- `playwright-report/` for the full Playwright HTML report

The root `Jenkinsfile` is configured to:

- run the e2e suite every day at `10:00` in the Jenkins server timezone
- archive the Playwright and email report artifacts
- send the generated HTML report through `emailext`

Set `E2E_REPORT_RECIPIENTS` in Jenkins, or configure default recipients in the Extended Email plugin, so the scheduled job has a destination address.
