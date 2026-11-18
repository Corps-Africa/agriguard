/**
 * All site content lives here, so text can be updated without touching layout code.
 * Anything wrapped in tbc() is a placeholder AgriGuard still needs to confirm.
 */
import { tbc, type Copy, type RichCopy } from '@/lib/copy';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'X';
  /** Leave empty until the account exists; the link then renders as a placeholder. */
  url: string;
  handle: Copy;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Public URL, used for canonical links and social previews. */
  url: string;
  /**
   * Preview mode: shows the review banner and highlights placeholders.
   * Set to false before launch.
   */
  preview: boolean;
  contact: {
    /** International format, digits only, no "+" (e.g. 233201234567). Empty = not set yet. */
    whatsapp: string;
    phoneDisplay: Copy;
    email: Copy;
    address: RichCopy;
    hours: Copy;
    /** Google Maps "Embed a map" src URL. Empty = show a placeholder. */
    mapEmbedUrl: string;
    /** Normal Google Maps link for "Get directions". */
    mapLink: string;
    serviceArea: Copy;
  };
  /** Formspree (or similar) endpoint. Empty = the contact form sends via WhatsApp instead. */
  formEndpoint: string;
  social: SocialLink[];
  nav: NavItem[];
}

export const site: SiteConfig = {
  name: 'AgriGuard Solutions',
  shortName: 'AgriGuard',
  tagline: 'Building a Food Secure Future',
  description:
    'AgriGuard Solutions buys grain from smallholder farmers, cleans and stores it properly, and supplies buyers with reliable maize, soybeans and more. We also raise healthy guinea fowl.',
  url: 'https://www.agriguardsolutions.com',
  preview: true,
  contact: {
    whatsapp: '',
    phoneDisplay: tbc('+233 XX XXX XXXX', 'Business phone / WhatsApp number'),
    email: tbc('hello@agriguardsolutions.com', 'Business email'),
    address: [tbc('Office / warehouse address'), ', ', tbc('Town, Region')],
    hours: tbc('Mon – Sat, 8:00 am – 5:00 pm'),
    mapEmbedUrl: '',
    mapLink: '',
    serviceArea: tbc('[region / city]', 'Where do you deliver?'),
  },
  formEndpoint: '',
  social: [
    { name: 'Facebook', url: '', handle: tbc('AgriGuard Solutions') },
    { name: 'Instagram', url: '', handle: tbc('@agriguardsolutions') },
    { name: 'LinkedIn', url: '', handle: tbc('AgriGuard Solutions') },
  ],
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about/' },
    { label: 'Products', href: '/products/' },
    { label: 'Contact', href: '/contact/' },
  ],
};

/* ------------------------------------------------------------------ */
/* Supply chain                                                        */
/* ------------------------------------------------------------------ */

export type StepIcon = 'sprout' | 'sieve' | 'warehouse' | 'truck';

export interface Step {
  icon: StepIcon;
  title: string;
  body: RichCopy;
}

export const supplyChain: Step[] = [
  {
    icon: 'sprout',
    title: 'Buy from farmers',
    body: [
      'We buy maize, soybeans and other grains directly from smallholder farmers in ',
      tbc('[districts]'),
      ' and pay fair, prompt prices.',
    ],
  },
  {
    icon: 'sieve',
    title: 'Clean & grade',
    body: 'Every batch is dried, cleaned and checked for moisture and quality before it goes into storage.',
  },
  {
    icon: 'warehouse',
    title: 'Store safely',
    body: 'Grain is bagged and kept in a secure, dry warehouse to protect it from pests and spoilage.',
  },
  {
    icon: 'truck',
    title: 'Deliver to buyers',
    body: 'We supply processors, feed mills, schools and traders, in bulk or by the bag, when they need it.',
  },
];

/* ------------------------------------------------------------------ */
/* Products                                                            */
/* ------------------------------------------------------------------ */

export interface ProductItem {
  name: Copy;
  detail: Copy;
  description?: Copy;
}

export interface ProductLine {
  id: 'grains' | 'guinea-fowl';
  name: string;
  summary: string;
  description: RichCopy;
  tone: 'green' | 'gold';
  photo: { label: string; src?: string; alt?: string };
  items: ProductItem[];
  cta: { label: string; message: string };
}

export const productLines: ProductLine[] = [
  {
    id: 'grains',
    name: 'Grains',
    summary: 'Clean, dry grain for food processing, animal feed and resale.',
    description:
      'We buy from farmers at harvest, then dry, clean and grade every batch before it is bagged and stored. That means steady supply and consistent quality, even between seasons.',
    tone: 'green',
    photo: { label: 'Bagged grain in the warehouse' },
    items: [
      {
        name: 'Maize (white & yellow)',
        detail: tbc('50 kg / 100 kg bags'),
        description: 'For millers, food processors, feed mills and poultry farms.',
      },
      {
        name: 'Soybeans',
        detail: tbc('50 kg / 100 kg bags'),
        description: 'For oil processors, feed producers and food manufacturers.',
      },
      {
        name: tbc('Sorghum / millet / rice?', 'Which other grains do you sell?'),
        detail: tbc('to confirm'),
      },
    ],
    cta: { label: 'Get a grain quote', message: "Hello AgriGuard, I'd like a quote for grain." },
  },
  {
    id: 'guinea-fowl',
    name: 'Guinea Fowl',
    summary: 'Healthy, farm-raised guinea fowl. Lean, flavourful and in demand for every occasion.',
    description:
      'Our guinea fowl are raised on our own farm with clean water, good feed and proper care. Order a few birds for the family or in bulk for restaurants and events.',
    tone: 'gold',
    photo: { label: 'Guinea fowl on the farm' },
    items: [
      { name: 'Live birds', detail: tbc('per bird / bulk') },
      { name: 'Dressed birds', detail: tbc('to confirm') },
      { name: 'Eggs', detail: tbc('per crate') },
      { name: 'Keets (day-old chicks)', detail: tbc('to confirm') },
    ],
    cta: { label: 'Order guinea fowl', message: "Hello AgriGuard, I'd like to order guinea fowl." },
  },
];

export interface Service {
  title: string;
  body: string;
}

export const services: Service[] = [
  {
    title: 'Grain aggregation',
    body: 'We gather grain from many smallholder farmers into consistent, graded lots that large buyers can rely on.',
  },
  {
    title: 'Bulk supply contracts',
    body: 'Regular deliveries on a schedule for processors, feed mills, schools and institutions.',
  },
  {
    title: 'Storage & quality control',
    body: 'Drying, cleaning, moisture checks and safe storage to cut post-harvest losses.',
  },
  {
    title: 'Delivery',
    body: 'We arrange transport from our warehouse to your premises.',
  },
];

export const orderSteps: { title: string; body: string }[] = [
  { title: 'Message us', body: 'Tell us the product, quantity and where you are on WhatsApp or through the contact form.' },
  { title: 'Get a quote', body: 'We confirm availability, price and delivery date, usually the same day.' },
  { title: 'Confirm & pay', body: 'Pay by mobile money or bank transfer once you are happy with the quote.' },
  { title: 'Receive your order', body: 'Pick up from our warehouse or we deliver to you.' },
];

export const faqs: { q: string; a: RichCopy }[] = [
  {
    q: 'What is the minimum order?',
    a: ['For grain, our minimum order is ', tbc('one 50 kg bag'), '. For guinea fowl, you can order a single bird.'],
  },
  {
    q: 'Do you deliver?',
    a: ['Yes. We deliver within ', tbc('[region / city]'), '. Delivery cost depends on the quantity and distance.'],
  },
  {
    q: 'How do I pay?',
    a: tbc('Mobile money or bank transfer. Payment details are shared when your order is confirmed.'),
  },
  {
    q: 'Can I set up a regular supply?',
    a: 'Yes. Businesses and institutions can agree a regular delivery schedule with us. Get in touch to discuss your volumes.',
  },
];

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const reasons: { title: string; body: string }[] = [
  { title: 'Consistent quality', body: 'Every batch is cleaned, graded and moisture-checked before sale.' },
  { title: 'Reliable supply', body: 'Stored stock means we can fill orders between harvests.' },
  { title: 'Fair to farmers', body: 'We pay fair prices and support the farmers we buy from.' },
  { title: 'Easy ordering', body: 'Message us on WhatsApp, agree a price and we arrange delivery.' },
];

export const buyers: string[] = [
  'Food processors',
  'Feed mills & poultry farms',
  'Schools & institutions',
  'Caterers & restaurants',
  'Traders & retailers',
  'Households',
];

export const farmerBenefits: RichCopy[] = [
  'Fair, transparent prices by weight and grade',
  'Prompt payment, including mobile money',
  ['Pick-up from your community ', tbc('(to confirm)')],
];

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const founder = {
  name: 'Victoria Wintonya Ndebugri',
  role: 'Founder',
  photo: { label: 'Portrait of Victoria Ndebugri', src: undefined as string | undefined },
  quote: tbc(
    'I started AgriGuard because too much of our harvest is lost after it leaves the farm. When grain is stored and moved well, farmers earn more and families eat better.',
    'Please replace with your own words',
  ),
  bio: [
    tbc(
      'Victoria is the founder of AgriGuard Solutions. [Add 2–3 sentences about her background, training and what led her to start the business.]',
      'Founder bio',
    ),
  ] as RichCopy[],
};

export const story: RichCopy[] = [
  [
    'AgriGuard Solutions was founded in ',
    tbc('[year]'),
    ' in ',
    tbc('[town]'),
    ' to solve a simple problem: farmers grow good grain, but too much of it is lost or sold cheaply because there is nowhere safe to store it and no reliable buyer.',
  ],
  'We buy directly from smallholder farmers, take care of drying, cleaning and storage, and connect that grain to the businesses and families who need it. Alongside our grain business, we raise guinea fowl, a lean, nutritious local favourite.',
  tbc('[Add a sentence about a milestone, e.g. how many farmers you work with or tonnes handled last season.]'),
];

export const mission = {
  mission: 'To connect smallholder farmers to reliable markets and reduce post-harvest losses, so more of every harvest reaches people who need it.',
  vision: 'A food secure future where every farmer earns a fair living and every family can count on affordable, quality food.',
};

export const values: { title: string; body: string }[] = [
  { title: 'Quality', body: 'We check every batch and only sell what we would buy ourselves.' },
  { title: 'Fairness', body: 'Transparent prices for farmers and honest dealings with buyers.' },
  { title: 'Reliability', body: 'We deliver what we promise, when we promise it.' },
  { title: 'Community', body: 'Our growth is tied to the farmers and communities we work with.' },
];

export const whyFoodSecurity: RichCopy =
  'A large share of grain harvested in West Africa is lost between the farm and the market because of poor drying, storage and transport. Every bag we store safely is food that reaches a family instead of going to waste, and income that stays with the farmer who grew it.';
