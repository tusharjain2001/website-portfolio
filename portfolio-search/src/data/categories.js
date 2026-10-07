// Quick-search chips on the hero. Rows match the three chip rows in the Figma design.
// A chip matches a project when any of its keywords is found (as whole words) in the
// project's tags or industry. Without `keywords`, the label itself is used.
export const categoryRows = [
  [
    { label: 'Logo' },
    { label: 'Branding' },
    { label: 'Website', keywords: ['website', 'web design'] },
    { label: 'App', keywords: ['app'] },
    { label: 'Emailer & Newsletter', keywords: ['emailer', 'newsletter'] },
    { label: 'Print Design', keywords: ['print'] },
    { label: 'Event Booth & Carousel', keywords: ['event booth', 'carousel'] },
  ],
  [
    { label: 'Presentation' },
    { label: 'Pitch Deck' },
    { label: 'Static Ad' },
    { label: 'Video Ad' },
    { label: 'Social Media Content', keywords: ['social media'] },
    { label: 'Publication' },
    { label: '2D Animation Video', keywords: ['2d animation', 'animation video'] },
  ],
  [
    { label: 'Motion Graphics', keywords: ['motion graphics'] },
    { label: 'Proposal & Docs', keywords: ['proposal'] },
    { label: 'Annual Report' },
    { label: 'Infographics' },
    { label: 'Corporate Video' },
    { label: 'Packaging Design', keywords: ['packaging'] },
  ],
]
