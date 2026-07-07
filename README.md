# TrustFix — Trusted Home Services Marketplace Prototype

TrustFix is a premium, clickable mobile prototype simulating a home services marketplace. It is built as a single-page React application powered by Vite, styled with Tailwind CSS, and optimized for a 390px (iPhone-style) viewport centered dynamically on desktop screens.

It features two distinct, state-synchronized flows: a **Customer App Flow (10 screens)** and a **Provider App Flow (5 screens)**, along with an **Admin Control Panel** for advanced demo testing.

---

## 🎨 Design System

The visual design is clean, light, and trustworthy, conforming to the following theme parameters:
*   **Primary Color:** Teal (`#2F7C8C`)
*   **Secondary Color:** Aqua Teal (`#00A896`)
*   **Accent Color:** Emerald Green (`#02C39A`)
*   **Background:** White (`#FFFFFF`)
*   **Card Background:** Light Teal (`#EAF6F5`)
*   **Text:** Charcoal (`#1A1A1A`)
*   **Muted Text:** Grey (`#6B7280`)
*   **Error/Alert:** Crimson (`#D64550`)
*   **Typography:** Inter / system sans-serif
*   **Border Radii:** `12px` on cards, `10px` on buttons, `8px` on inputs
*   **Touch Targets:** Minimum `44px` height on all interactive elements for mobile accessibility.

---

## 📱 Prototype Structure & Flow Screens

The prototype boots into a **Role Selector** to pick the interface to evaluate. A left-hand **Admin Control Panel** is always available to jump directly to any of the 15 screens or simulate interactive events.

### 👤 Customer Flow (10 Screens)
1.  **Screen 1 — Splash:** Brand logo lettermark, tagline, and CTA to enter.
2.  **Screen 2 — Home:** Location selection, categories search, and category cards (AC Repair, Electrical, Plumbing, Appliances) with lists grouped by Recommended, Near You, and Budget Friendly.
3.  **Screen 3 — Provider Discovery:** Pre-filled category searches, filter chips (Nearest, Price, Recommended), and verified badge listings.
4.  **Screen 4 — Provider Profile:** Service statistics (Experience, Jobs Done, Availability), portfolio galleries, ratings, and customer reviews.
5.  **Screen 5 — Booking:** Address and notes inputs, calendar day picker, time slots, and a dashed camera upload block to simulate uploading an issue photo.
6.  **Screen 6 — Booking Confirmation:** Success screen showing booking reference ID (`#TF10245`) and service summary card.
7.  **Screen 7 — Live Tracking:** Simulated real-time map displaying the technician's GPS route. Includes:
    *   *Stepped Progress Tracker:* Step from Confirmed → On the Way → Arrived → In Progress → Done.
    *   *In-App Chat Overlay:* Send and receive mock live messages with the technician.
    *   *In-App Call Overlay:* Dial and simulate a phone conversation overlay.
8.  **Screen 8 — Payment:** Break down charges (Inspection fee + visit fee), choose payment methods (UPI, Card, Net Banking, Cash fallback), and apply promo codes.
9.  **Screen 9 — Service Completion:** 5-star interactive rating, feedback reviews, and technician-provided work proof.
10. **Screen 10 — Support & Rework:** FAQs with accordion expanders, request rework tickets, and direct customer helpline triggers.

### 🛠️ Provider Flow (5 Screens)
11. **Screen 11 — Provider Login:** Verification using mobile number and a visual OTP input flow (`4829`).
12. **Screen 12 — Provider Dashboard:** Overview of earnings, active schedules, and job requests. Includes:
    *   *Decline Drawer:* Reject job requests with specific reasons (Busy, Out of Area, etc.).
13. **Screen 13 — Job Detail:** View booking information, customer notes, navigation route options, and the exact issue photo uploaded by the customer.
14. **Screen 14 — Upload Completion Proof:** Perform checklists, add resolution notes, upload clean work photos, and await customer payout confirmation.
15. **Screen 15 — Earnings & Analytics:** Displays weekly pay histograms, earnings tiles (Today, Week, Month), and transaction lists.

---

## ⚡ Interactive & State-Synchronized Features

*   **Cross-Flow Data Integration:** 
    *   Any issue photo selected or details typed in the *Customer Booking* flow will dynamically show in the *Provider Job Details* page.
    *   When the provider uploads completion proofs, they are immediately populated in the *Customer Service Completion* screen.
*   **Navigation Stack:** Uses a custom stack system (`navStack`) so that all mobile app back buttons return to the correct screen regardless of role jumps.
*   **Force Payment Failure:** Toggle payment failures in the control panel to evaluate the toast error and cash fallback flows.
*   **Tracking Simulation:** Click step progress circles on the live tracking screen to trigger custom status changes.

---

## 🚀 How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup Steps
1.  Clone the repository:
    ```bash
    git clone https://github.com/saivardhankundala2005-sys/TrustFix-MVP.git
    cd TrustFix-MVP
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173/](http://localhost:5173/) in your web browser.
