<a href="https://www.llamatutor.com">
  <img alt="Llama Tutor" src="./public/og-image.png">
  <h1 align="center">Llama Tutor</h1>
</a>

<p align="center">
  An open source AI personal tutor. Powered by Llama 3 70B & Together.ai
</p>

## Tech stack

- Llama 3.1 70B from Meta for the LLM
- Together AI for LLM inference
- Next.js app router with Tailwind
- Serper for the search API
- Helicone for observability
- Plausible for website analytics

## Cloning & running

1. Fork or clone the repo
2. Create an account at [Together AI](https://togetherai.link) for the LLM
3. Create an account at [SERP API](https://serper.dev/) or with Azure ([Bing Search API](https://www.microsoft.com/en-us/bing/apis/bing-web-search-api))
4. Create an account at [Helicone](https://www.helicone.ai/) for observability
5. Create a `.env` (use the `.example.env` for reference) and replace the API keys
6. Run `npm install` and `npm run dev` to install dependencies and run locally

## New Features

- [] Added "Share" and "Copy" buttons that users can click on after conversations are generated. The "Copy" button allows users to copy the conversation to the clipboard, and the "Share" button enables sharing the conversation via compatible apps and social platforms.

## Future Tasks

- [ ] Add potential follow up questions + new chat at the end of chat page
- [ ] Split the page into two pages and add back the footer
- [ ] Move all my icons into their own typescript file (transform.tools)
- [ ] Add a more detailed landing page with a nice section with the GitHub link
- [ ] Add nice hamburger menu on mobile
- [ ] Try out the generative UI stuff from Vercel
- [ ] Add a nicer dropdown overall

## CI/CD

The project is configured for CI/CD with GitHub Actions, which automates deployment to Vercel every time changes are pushed to the main branch.

## Performance Optimizations

- [] Removed unused dependencies to reduce bundle size.
- [] Optimized images to improve load times.

### Объяснение изменений:
4. **CI/CD Setup** — указано, что проект настроен для автоматического деплоя через GitHub Actions.
5. **Performance Optimizations** — предложены оптимизации для улучшения производительности проекта.