# Planning Guide

A professional website for Mustermann Zimmerei, a German timber construction and carpentry company showcasing their craftsmanship, services, and portfolio.

**Experience Qualities**: 
1. **Craftsmanship** - The design should communicate precision, quality, and traditional woodworking expertise through careful attention to detail
2. **Trustworthy** - Professional presentation that builds confidence in the company's reliability and experience
3. **Warm** - Natural, approachable aesthetic that reflects the organic warmth of wood and personal service

**Complexity Level**: Content Showcase (information-focused)
  - This is primarily a marketing and portfolio website focused on presenting company information, services, and project examples with minimal interactive features beyond navigation and contact forms.

## Essential Features

**Navigation System**
- Functionality: Multi-page navigation with smooth scrolling and section anchoring, plus legal pages (Impressum, Datenschutz, AGB)
- Purpose: Allow users to easily browse different sections (Home, Services, Projects, About, Contact) and access legal information
- Trigger: User clicks navigation links in header or footer
- Progression: User clicks link → smooth scroll to section or page → highlight active section in nav → can navigate back to home
- Success criteria: Navigation is sticky, responsive, and clearly indicates current location; legal pages are accessible from footer

**Legal Pages**
- Functionality: Display Impressum (imprint), Datenschutz (privacy policy), and AGB (terms and conditions)
- Purpose: Provide legally required information and terms for German business compliance
- Trigger: User clicks footer links for Impressum, Datenschutz, or AGB
- Progression: User clicks footer link → navigates to legal page → reads content → clicks back button → returns to home
- Success criteria: All legal information is clearly formatted, easily readable, and accessible from any page

**Services Display**
- Functionality: Showcase different carpentry services (Dachstuhl, Holzbau, Sanierung, etc.)
- Purpose: Inform potential customers about service offerings
- Trigger: User navigates to services section
- Progression: User scrolls → sees service cards → reads descriptions → contacts company
- Success criteria: Services are clearly categorized with icons and descriptions

**Project Portfolio/Gallery**
- Functionality: Display completed projects with images
- Purpose: Demonstrate quality of work and build credibility
- Trigger: User navigates to portfolio section
- Progression: User views grid → clicks project → sees detailed images → returns to grid
- Trigger: Auto-load on scroll
- Success criteria: Images load quickly, grid is responsive, lightbox works smoothly

**Contact Form**
- Functionality: Allow users to submit inquiries
- Purpose: Generate leads and enable customer communication
- Trigger: User fills out contact form
- Progression: User enters details → submits form → sees confirmation → company receives inquiry
- Success criteria: Form validates inputs, provides clear feedback, stores submissions

**Company Information**
- Functionality: Display company history, values, team, certifications
- Purpose: Build trust and establish expertise
- Trigger: User navigates to about section
- Progression: User reads → gains confidence → proceeds to contact
- Success criteria: Information is clear, scannable, and professional

## Edge Case Handling

- **Empty States**: Portfolio shows placeholder when no projects loaded
- **Form Errors**: Clear validation messages guide users to correct inputs
- **Mobile Navigation**: Hamburger menu collapses navigation on small screens
- **Image Loading**: Skeleton loaders shown while images load
- **Long Content**: Smooth scrolling handles long pages gracefully
- **Offline**: Basic content remains visible with cached assets

## Design Direction

The design should evoke traditional craftsmanship meeting modern professionalism - classic, reliable, and warm with natural wood tones and clean typography that communicates quality and trustworthiness; a clean, minimal interface lets the woodwork photography take center stage.

## Color Selection

Custom palette inspired by natural wood and construction materials

- **Primary Color**: Rich Warm Brown (oklch(0.45 0.08 60)) - Represents natural wood, used for headers and primary CTAs to communicate craftsmanship and earthiness
- **Secondary Colors**: 
  - Cream/Beige (oklch(0.95 0.02 80)) - Soft background color reminiscent of light wood or sawdust
  - Dark Charcoal (oklch(0.25 0.01 60)) - For text and professional accents
- **Accent Color**: Warm Amber (oklch(0.65 0.15 70)) - Highlights and call-to-action elements, evokes golden wood tones
- **Foreground/Background Pairings**:
  - Background (Cream oklch(0.95 0.02 80)): Dark Charcoal text (oklch(0.25 0.01 60)) - Ratio 11.2:1 ✓
  - Primary (Warm Brown oklch(0.45 0.08 60)): White text (oklch(1 0 0)) - Ratio 7.8:1 ✓
  - Accent (Warm Amber oklch(0.65 0.15 70)): Dark Charcoal text (oklch(0.25 0.01 60)) - Ratio 4.9:1 ✓
  - Card (White oklch(1 0 0)): Dark Charcoal text (oklch(0.25 0.01 60)) - Ratio 12.8:1 ✓

## Font Selection

Typography should communicate traditional craftsmanship with modern readability - using a strong sans-serif for headings that feels solid and constructed, paired with a clean readable sans-serif for body text.

- **Typographic Hierarchy**: 
  - H1 (Hero Title): Oswald Bold/48px/tight letter spacing - Strong, architectural presence
  - H2 (Section Headers): Oswald SemiBold/36px/normal spacing - Clear section divisions
  - H3 (Card Titles): Open Sans SemiBold/24px/normal spacing - Professional and approachable
  - Body Text: Open Sans Regular/16px/1.6 line height - Excellent readability
  - Navigation: Open Sans SemiBold/14px/wide letter spacing - Clear and modern

## Animations

Subtle, professional animations that enhance usability without distracting from the craftsmanship displayed - smooth scrolling and gentle transitions communicate quality and attention to detail.

- **Purposeful Meaning**: Smooth scroll behavior reflects precision, fade-ins reveal content progressively like unveiling finished woodwork
- **Hierarchy of Movement**: Hero section gets gentle parallax, navigation smoothly sticks on scroll, images fade in on scroll reveal, hover states on cards provide tactile feedback

## Component Selection

- **Components**: 
  - Card (with custom hover effects) - service offerings and project displays
  - Button (primary/secondary variants) - CTAs and navigation
  - Sheet - mobile navigation menu
  - Form + Input + Textarea + Label - contact form
  - Dialog - project image lightbox/gallery
  - Separator - section dividers
  - Badge - service tags or certifications
  
- **Customizations**: 
  - Custom hero section with background image overlay
  - Custom project grid with hover zoom effects
  - Custom navbar with blur backdrop effect when scrolled
  - Image gallery component with lightbox functionality
  
- **States**: 
  - Buttons: Subtle scale on hover, darker shade on active, disabled opacity
  - Cards: Lift shadow and slight scale on hover
  - Navigation: Underline animation on active section, background blur when scrolled
  - Form inputs: Border color change on focus, error state with red border
  
- **Icon Selection**: 
  - Hammer, Wrench - construction/services
  - House, Buildings - projects/buildings
  - Phone, Envelope - contact
  - CheckCircle - certifications/quality markers
  - CaretRight - navigation arrows
  - List - mobile menu toggle
  
- **Spacing**: 
  - Sections: py-16 (desktop), py-12 (mobile)
  - Card padding: p-6
  - Grid gaps: gap-6 (mobile), gap-8 (desktop)
  - Container max-width: max-w-7xl with px-4
  
- **Mobile**: 
  - Navigation collapses to Sheet sidebar on screens <768px
  - Hero text sizes reduce (H1: 36px mobile vs 48px desktop)
  - Grid layout: 1 column mobile → 2 columns tablet → 3 columns desktop
  - Images maintain aspect ratio with object-cover
  - Touch-friendly button sizes (min 44px height)
