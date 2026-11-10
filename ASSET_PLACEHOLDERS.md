# AcademyGrowth — Asset Placeholders & Replacement Catalog

This document tracks all temporary visual and animation placeholders implemented across the public marketing website of **AcademyGrowth**. 

Each entry corresponds to an intentional visual placeholder component (`components/marketing/asset-placeholder.tsx`) rendered on the website, ensuring the layout remains production-ready and visually balanced while specific custom illustrations and Lottie animations are acquired.

---

## 1. Integrated Production Assets

The following visual assets have been integrated into production:

| Section | Asset File | Intrinsic Dimensions | Implementation Details | Status |
|---|---|---|---|---|
| **Features page → Admission CRM** | `public/assets/images/Admission CRM Kanban Pipeline Animation.svg` | 1000 × 1000 (1:1 square) | Integrated via responsive container `h-[210px] sm:h-[260px] lg:h-[320px]`, `object-contain object-center`, subtle border and soft shadow. | **Integrated & Live** |
| **Features page → AI Content Studio** | `public/assets/images/AI Marketing Content Generation Animation.svg` | 306 × 418 (approx 3:4 portrait) | Integrated via responsive container `h-[210px] sm:h-[260px] lg:h-[320px]`, `object-contain object-center`, max width constrained to 80–90% for visual balance. | **Integrated & Live** |
| **Homepage → Hero Dashboard Preview** | `public/assets/images/AcademyGrowth SaaS Dashboard Hero.png` | 16:10 wide | Rendered via responsive container with subtle border, shadow, and mobile overflow protection. | **Integrated & Live** |

---

## 2. Active Visual Placeholders (Awaiting Assets)

| ID | Page | Section | Asset Needed | Search Keywords | Format | Suggested Free Source | Attribution / License Requirements |
|---|---|---|---|---|---|---|---|
| `placeholder-home-ai` | Home (`/`) | AI Section | AI Marketing & Admissions Assistant Animation | "AI assistant writing content animation Lottie JSON" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License (or CC-BY with attribution in footer/credits) |
| `placeholder-feature-analytics` | Features (`/features`) | Marketing Analytics | Marketing Analytics Growth Chart Animation | "analytics dashboard line chart growth animation Lottie" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License |
| `placeholder-feature-vault` | Features (`/features`) | Student Success Vault | Student Achievement Celebration Animation | "student graduation achievement trophy celebration animation Lottie" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License |
| `placeholder-feature-team` | Features (`/features`) | Team Management | Team Collaboration Animation | "team collaboration people working animation Lottie" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License |
| `placeholder-feature-ai` | Features (`/features`) | AI Growth Assistant | AI Assistant Data Insights Animation | "AI assistant chatbot analytics animation Lottie" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License |
| `placeholder-solution-jee` | Solutions (`/solutions`) | JEE & NEET Coaching | JEE & NEET Admissions Funnel Illustration | "stem medical engineering students learning illustration SVG" | Vector SVG | unDraw / ManyPixels | Free MIT License (No attribution required for unDraw) |
| `placeholder-solution-cet` | Solutions (`/solutions`) | MHT-CET Academies | State CET Entrance Campaign Illustration | "regional university student campus illustration SVG" | Vector SVG | unDraw / Open Doodles | Free CC0 / MIT License |
| `placeholder-solution-upsc` | Solutions (`/solutions`) | UPSC & Competitive Exams | UPSC Aspirant Journey Illustration | "student reading books library mentor illustration SVG" | Vector SVG | ManyPixels / unDraw | Free ManyPixels License / unDraw MIT |
| `placeholder-workflow-full` | How It Works (`/how-it-works`) | Workflow Timeline | Marketing to Admission Workflow Animation | "business process workflow connected steps animation Lottie" | Lottie JSON | LottieFiles Free Catalog | Free Lottie Simple License |
| `placeholder-resources-banner` | Resources (`/resources`) | Knowledge Hub Banner | Education Resources & Learning Illustration | "online education resources books learning illustration SVG" | Vector SVG | unDraw | Free MIT License |
| `placeholder-about-story` | About (`/about`) | The Genesis Section | Education Innovation & Academy Growth Illustration | "education innovation digital learning illustration SVG" | Vector SVG | unDraw / Open Peeps | Free MIT / CC0 License |

---

## 3. Recommended Free Asset Sources & Licensing Guidelines

1. **unDraw (undraw.co)**
   - **Format:** SVG
   - **License:** Free to use for commercial and personal projects without attribution.
   - **Recommended for:** Conceptual educational illustrations (JEE/NEET, UPSC, Resources, About).
   - **Palette adjustment:** Custom hex `#0B4F49` and `#18796D` can be selected directly on unDraw before downloading SVGs.

2. **ManyPixels (manypixels.co/gallery)**
   - **Format:** SVG
   - **License:** Free royalty-free license for commercial use without attribution.
   - **Recommended for:** Workflow and office/counselling interactions.

3. **Open Doodles (opendoodles.com)**
   - **Format:** SVG / PNG
   - **License:** CC0 1.0 Universal (Public Domain).
   - **Recommended for:** Expressive student learning scenarios.

4. **LottieFiles Free Community (lottiefiles.com/featured)**
   - **Format:** Lottie JSON / dotLottie
   - **License:** Verify that the chosen animation has a "Lottie Simple License" (commercial use allowed) or CC-BY (requires author attribution).
   - **Recommended for:** Kanban progression, data growth charts, and AI writing indicators.

5. **Lucide React Icons**
   - **Format:** Embedded React components (`lucide-react`)
   - **License:** ISC License (already installed as core dependency).
   - **Recommended for:** All in-app badges, micro-interactions, and UI controls.

---

## 4. How to Replace a Placeholder with a Final Asset

Once an SVG or Lottie file is downloaded:
1. Place the SVG into `public/assets/illustrations/<filename>.svg` (or Lottie JSON into `public/assets/lottie/<filename>.json`).
2. In the corresponding page (e.g. `app/features/page.tsx`), replace `<AssetPlaceholder ... />` with Next.js `<Image src="/assets/illustrations/<filename>.svg" alt="..." width={...} height={...} />` or a Lottie player component.
3. The component container already has responsive aspect-ratio boundaries, ensuring seamless layout stability.

