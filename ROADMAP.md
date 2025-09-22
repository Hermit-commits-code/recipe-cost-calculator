## Feature Prioritization: Most to Least Prudent

### Free Tier (Core User Value)

1. **Polish Mobile UX & Responsive Layout**
   - Ensures accessibility and usability for the majority of users (mobile-first)
2. **Recipe Import/Export (JSON)**
   - Prevents data loss, enables backup, and builds trust
3. **Basic Analytics Dashboard**
   - Shows users their most/least expensive recipes, average cost per serving, and ingredient usage
4. **Recipe Organization (Categories/Tags)**
   - Helps users manage and find recipes as their collection grows
5. **Full PWA Support (Manifest, Offline, Installability)**
   - Makes the app installable and reliable offline, increasing engagement

### Premium Tier (Advanced/Monetizable Value)

6. **Bulk Buying Calculator & Ingredient Sharing**
   - Delivers unique cost-saving insights, core to your value prop
7. **Recipe Cost Comparison Tools**
   - Lets users compare similar recipes or ingredient swaps for savings
8. **Cost Optimization Suggestions**
   - "Make this recipe cheaper" tips, seasonal price awareness
9. **Cloud Sync (Firebase)**
   - Enables cross-device use, backup, and premium upsell
10. **Advanced Analytics Dashboard**
    - Monthly cost reports, efficiency rankings, budget tracking
11. **Receipt Scanning (OCR)**
    - Power feature for price tracking and ingredient database
12. **Recipe Sharing, Meal Planning, Grocery List Generation**
    - Social and planning features for stickiness and upsell
13. **Push Notifications for Price Alerts**
    - Drives engagement and retention

---

**Recommendation:**

- Focus next on mobile polish, import/export, and basic analytics for the free tier.
- Begin premium work with bulk calculator and comparison tools once free tier is robust.

# Recipe Cost Calculator - Full Roadmap

## MVP (Free Tier) - Core Features

- [x] Recipe entry: name, servings, ingredients, manual cost per ingredient
- [x] Total cost and cost per serving calculations
- [x] Ingredient cost breakdown (basic)
- [x] Recipe list with card layout and search/filter by name and cost
- [x] Edit and delete recipes
- [x] Data stored in localStorage
- [x] Routing for add, view, edit, and list
- [x] Only one "+ Add Recipe" button for clean UX
- [ ] Polish mobile UX and responsive layout
- [ ] Recipe import/export (JSON)
- [ ] Basic recipe organization (categories/tags)
- [ ] Basic analytics (most/least expensive, average cost, ingredient usage, trends)

## Free Tier - Next Steps

- [ ] Polish mobile/responsive layout for all main screens
- [ ] Add PWA support and true offline capabilities
- [ ] Recipe import/export (JSON)
- [ ] Basic recipe organization (categories/tags)
- [ ] Basic analytics dashboard

## Premium Features ($4.99/month)

- [ ] Bulk buying calculator (compare sizes, waste factor)
- [ ] Ingredient sharing across recipes
- [ ] Recipe cost comparison tools
- [ ] Cost optimization suggestions
- [ ] Ingredient usage analytics
- [ ] Cloud sync (Firebase)
- [ ] Advanced analytics dashboard
- [ ] Receipt scanning (OCR)
- [ ] Recipe sharing with cost info
- [ ] Meal planning and grocery list generation
- [ ] Push notifications for price alerts

## Technical/Infrastructure

- [x] React 18+ with Vite, TypeScript, Chakra UI
- [ ] PWA: manifest, service worker, installability
- [ ] Firebase setup for premium features
- [ ] Stripe integration for payments

## Launch & Marketing

- [ ] Landing page with value proposition
- [ ] Documentation and FAQ
- [ ] Beta test with real users
- [ ] ProductHunt, Reddit, and social launch

---

**You are here:**

- MVP core features are complete (basic CRUD, cost calculations, search/filter, routing, localStorage)
- Ready to polish mobile UX and begin adding import/export, analytics, and organization
- Premium and advanced features are not started
