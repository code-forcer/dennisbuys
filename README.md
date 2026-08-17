# Dennis Buys Vegas Houses — Landing Page

A one-page "We Buy Houses" site: hero with click-to-call/text, a seller lead
form that emails the owner directly, reasons-to-sell section, 3-step process,
a direct-contact section, and a closing call to action.

Built with **Next.js 16** + **Chakra UI v3**, using the brand palette from
`tailwind.config.js` (cherry-cola red, bistre dark, cream-vanilla, lime-green
accents).

## 1. Edit the business details

Everything specific to the client (name, phone, email, service area) lives in
**one file**: `site.config.ts`. Change it there and it updates across the
whole site — header, hero, form, footer, everything.

## 2. Run it locally

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY (see step 4)
npm run dev
```

Open http://localhost:3000

## 3. Deploy & connect the domain

The fastest path for a site this size:

1. Push this folder to a GitHub repo.
2. Import it on [Vercel](https://vercel.com) (free tier is fine for this
   traffic level) — it auto-detects Next.js, no config needed.
3. Add the environment variables from `.env.example` in the Vercel project
   settings (Settings -> Environment Variables).
4. In Vercel -> Settings -> Domains, add the client's domain and follow the
   DNS records it gives you (usually one A record + one CNAME, added at
   whoever the domain is registered with — GoDaddy, Namecheap, etc.).
5. Vercel issues the SSL certificate automatically once DNS propagates.

## 4. Lead delivery to email

The seller form posts to `/api/lead`, which emails the lead to
`site.email` using [Resend](https://resend.com).

1. Create a free Resend account.
2. Verify the client's real domain under Resend -> Domains (adds a couple of
   DNS records, same place as step 3 above).
3. Copy the API key into `RESEND_API_KEY`, and set `RESEND_FROM_DOMAIN` to
   the verified domain, so lead emails send from `leads@theirdomain.com`
   instead of Resend's shared test domain.
4. Until `RESEND_API_KEY` is set, submissions still succeed and are logged
   to the server console instead of emailed — so the form never breaks
   during setup, it just doesn't deliver mail yet.

**Automatic confirmation** is already built in: the moment the form submits
successfully, the page swaps to a "Got it — I'll reach out shortly" message
on-screen. If you'd rather also send the *seller* an automatic confirmation
email (not just show it on-page), that's a small addition to
`app/api/lead/route.ts`.

## 5. Ownership / admin access

- The whole codebase belongs to the client — no proprietary lock-in.
- Hand over the GitHub repo (transfer ownership or add as admin) and the
  Vercel project (invite as Owner) and they have full control: they can
  redeploy, change copy, or hand it to another developer any time.
- Domain and Resend account should be created directly under the client's
  own email/billing, not yours, so they retain full ownership from day one.

## 6. Where things live

```
site.config.ts             <- name, phone, email, service area (edit this)
theme.ts                   <- brand colors/fonts (from tailwind.config.js)
app/page.tsx                <- section order
app/components/             <- Header, Hero, SellerForm, WhySell, Process,
                                DirectContact, FinalCta, Footer
app/api/lead/route.ts       <- handles form submissions -> email
```

## Later upgrades (not built yet, easy to add on this foundation)

- Store leads in a database in addition to email (Postgres/Supabase/Airtable)
- SMS auto-reply to the seller (Twilio)
- Property photo upload on the form
- Analytics (Vercel Analytics / GA4)
- Multiple landing pages for ad campaigns (Google/Facebook Ads variants)
