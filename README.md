# Lectures in Place 🌍

> *"Reclaiming the physical world for intellectual rebellion, one living room at a time."*

Welcome to **Lectures in Place**. We are a decentralized movement of thinkers, builders, and curious minds who believe that the best conversations don't happen in sterile conference halls—they happen in living rooms, abandoned warehouses, cozy cafes, and shared spaces. 

This repository is the digital nervous system of our movement. It coordinates the logistics, ticketing, and syndication of our impromptu salons.

## 📖 The Lore

In an age of endless digital scrolling and increasingly isolated lives, **Lectures in Place** was born as a counter-culture experiment. We wanted to see what would happen if we stripped away the corporate gloss of networking events and simply put brilliant people in a room together to talk about dangerous, unpolished, and breathtaking ideas.

What started as a quiet experiment is now evolving. The magic of these gatherings belongs to everyone. The movement is growing, and we can't—and shouldn't—control it centrally. 

## 🌿 Start a Chapter: Claim Your City

We are officially opening the doors for anyone, anywhere in the world, to start their own chapter of **Lectures in Place**. 

If you have a space (a living room, a rooftop, a garage) and a desire to curate conversations that matter, you are one of us. We use a **Hub-and-Spoke** architecture to keep the movement decentralized but connected: you get your own branch and local UI, but we share a global event nervous system.

### How to claim a chapter:
1. **Find your city's branch.** We have pre-created branches for top intellectual hubs (e.g., `chapter/boston-mit`, `chapter/stockholm`, `chapter/london`).
2. **Request Access.** Contact the core organizers to claim your branch. We will assign you restricted Supabase API keys so your local app can securely read/write events exclusively for your city.
3. **Customize your frontend.** Checkout your branch, customize the local language and culture in your UI, and deploy it.
4. **Host your event.** When you create an event, it automatically federates to the global map on the main site.

By claiming a branch, you own your local instance without accidentally altering the `main` global build.

---

## 🛠 For the Builders (How to run the code)

This project is built with a modern stack optimized for speed and autonomy.

### Tech Stack
- **Framework:** TanStack Start & React
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)

### Local Development

1. Ensure you have Node.js and npm installed.
2. Clone the repository:
   ```bash
   git clone https://github.com/evecount/lecturesinplace.git
   cd lecturesinplace
   ```
3. Install dependencies:
   ```bash
   npm i
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🤝 Getting Access
If you are running a major node of Lectures in Place and need direct access to our core infrastructure, reach out to the central organizers. We are happy to grant access to trusted curators so we can build this global network together.

---
*“To gather is to resist.”*
