import { Link } from 'react-router-dom'
import { HiMail, HiPhone, HiLocationMarker, HiArrowRight } from 'react-icons/hi'
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import logo from '@/assets/images/logo.png'

const footerLinks = {
  services: [
    { label: 'Freight Shipping', path: '/services/freight' },
    { label: 'Express Delivery', path: '/services/express' },
    { label: 'Warehousing', path: '/services/warehousing' },
    { label: 'Supply Chain', path: '/services/supply-chain' },
    { label: 'Cargo Insurance', path: '/services/insurance' },
    { label: 'Customs Brokerage', path: '/services/customs' },
  ],
  company: [
    { label: 'About Us', path: '/about' },
    { label: 'Careers', path: '/careers' },
    { label: 'Our Team', path: '/team' },
    { label: 'Press & Media', path: '/press' },
    { label: 'Sustainability', path: '/sustainability' },
  ],
  support: [
    { label: 'Help Center', path: '/help' },
    { label: 'Track Shipment', path: '/track' },
    { label: 'Get a Quote', path: '/quote' },
    { label: 'Shipping Guide', path: '/guide' },
    { label: 'FAQs', path: '/faqs' },
    { label: 'Contact Us', path: '/contact' },
  ],
}

const socialLinks = [
  { icon: FaLinkedinIn, href: '#', label: 'LinkedIn' },
  { icon: FaTwitter, href: '#', label: 'Twitter' },
  { icon: FaFacebookF, href: '#', label: 'Facebook' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaYoutube, href: '#', label: 'YouTube' },
]

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border-subtle)] bg-[var(--surface)]">
      {/* Background decorative gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-tsg-500/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-6">
            {/* Brand / About */}
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center group mb-5">
                <img
                  src={logo}
                  alt="T.S.G Grateful Logistics"
                  className="h-[68px] w-auto object-contain drop-shadow-[0_4px_12px_rgba(23,58,122,0.12)] transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              <p className="mb-6 text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm">
                T.S.G Grateful Logistics Ltd. — Global Shipping Made Easy. Delivering reliable shipping solutions with real-time tracking, warehousing, and express freight services across 15+ countries.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] transition-all duration-200 hover:border-tsg-500/30 hover:bg-tsg-500/10 hover:text-tsg-500"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <FooterLinkColumn title="Services" links={footerLinks.services} />
              <FooterLinkColumn title="Company" links={footerLinks.company} />
              <FooterLinkColumn title="Support" links={footerLinks.support} />
            </div>

            {/* Newsletter + Contact */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
                    Newsletter
                  </h4>
                  <p className="mb-3 text-xs text-[var(--text-muted)]">
                    Get logistics insights and updates.
                  </p>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input placeholder="your@email.com" />
                    </div>
                    <Button size="icon" variant="primary">
                      <HiArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                  <div>
                  <h4 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">
                    Contact Us
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                      <HiLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Lagos Head Office</p>
                        <p>25A Awolowo Road, Ikeja, Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                      <HiLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                      <div>
                        <p className="font-medium text-[var(--text-primary)]">Airport Office</p>
                        <p>Murtala Muhammed International Airport, Ikeja, Lagos</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <HiPhone className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                      <div>
                        <p>Lagos: +234 800 TSG SHIP</p>
                        <p className="mt-1">Ibadan: +234 900 TSG SHIP</p>
                        <p className="mt-1">Ile-Ife: +234 700 TSG SHIP</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)]">
                      <HiMail className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                      <span>Gratefullogisticsotm@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] py-6 sm:flex-row">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} T.S.G Grateful Logistics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinkColumn({ title, links }: { title: string; links: { label: string; path: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold text-[var(--text-primary)]">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-xs text-[var(--text-muted)] transition-colors hover:text-tsg-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
