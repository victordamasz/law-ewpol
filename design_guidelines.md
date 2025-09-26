# Administrative Dashboard Design Guidelines for Brazilian Law Firm

## Design Approach: Design System
**Selected System**: Material Design with custom adaptations  
**Justification**: Utility-focused application requiring consistency, professional appearance, and information-dense layouts typical of enterprise dashboards.

## Core Design Elements

### A. Color Palette
**Primary Colors**:
- Primary: #1976D2 (professional blue)
- Secondary: #424242 (dark gray)
- Background: #F5F5F5 (light gray)
- Surface: #FFFFFF (white)

**Semantic Colors**:
- Text Primary: #212121 (soft black)
- Success: #2E7D32 (green)
- Warning: #F57C00 (orange)  
- Error: #D32F2F (red)

**Dark Mode**:
- Background: #121212
- Surface: #1E1E1E
- Text: #FFFFFF

### B. Typography
**Font Stack**: Roboto (primary), Inter (fallback)
**Hierarchy**:
- Headers: Roboto Medium (24px, 20px, 18px)
- Body: Roboto Regular (16px, 14px)
- Captions: Roboto Regular (12px)

### C. Layout System
**Spacing Units**: Tailwind classes using 2, 4, 6, 8, 12, 16 units
- Component padding: p-4, p-6
- Section margins: m-8, m-12
- Element spacing: gap-4, gap-6

**Grid Structure**:
- Sidebar: 280px fixed width (desktop), collapsible (mobile)
- Main content: CSS Grid with responsive card layout
- Cards: 4-column grid (desktop), 2-column (tablet), 1-column (mobile)

### D. Component Library

**Navigation**:
- Persistent sidebar with modular sections
- Collapsible navigation for mobile
- Breadcrumb navigation for deep pages

**Cards & Containers**:
- Rounded corners: 8px border-radius
- Subtle shadows: Material Design elevation 2
- Consistent 16px internal padding

**Forms**:
- Material Design outlined inputs
- Grouped form sections with clear labels
- Validation states using semantic colors

**Data Display**:
- Clean tables with zebra striping
- KANBAN boards with drag-and-drop cards
- Calendar views for agenda module
- Document lists with file type icons

**Interactive Elements**:
- Primary buttons: Filled with #1976D2
- Secondary buttons: Outlined with transparent background
- FAB buttons for primary actions
- Icon buttons for secondary actions

### E. Responsive Behavior

**Breakpoints**:
- Mobile: < 768px (stacked layout, hamburger menu)
- Tablet: 768px - 1024px (condensed sidebar, 2-column cards)
- Desktop: > 1024px (full sidebar, multi-column layouts)

**Mobile Adaptations**:
- Bottom navigation bar for primary modules
- Swipe gestures for KANBAN boards
- Collapsible sections for forms
- Touch-optimized button sizes (44px minimum)

### F. Module-Specific Guidelines

**Dashboard Home**:
- KPI cards in 4-column grid
- Recent activity feed
- Quick action buttons

**Legal Modules**:
- Process timeline visualization
- Document status indicators
- Court calendar integration styling

**Administrative Tools**:
- File manager with grid/list toggle
- Document generator with form wizard styling
- Financial module with clear transaction categorization

## Animations
Minimal and functional only:
- Sidebar collapse/expand transition
- Card hover elevation changes
- Form validation feedback
- Loading states for data fetching