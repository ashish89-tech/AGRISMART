import React from 'react'
import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import './Footer.css'

const MARKETPLACE_LINKS = [
  { name: 'All Products',    desc: 'Browse every listing',   to: '/all-posts' },
  { name: 'Fruits',          desc: 'Seasonal & exotic picks', to: '/all-posts' },
  { name: 'Vegetables',      desc: 'Farm-fresh daily',        to: '/all-posts' },
  { name: 'Cereals & Grains',desc: 'Bulk & retail',           to: '/all-posts' },
  { name: 'Seeds & Plants',  desc: 'Grow your own',           to: '/all-posts' },
]

const FARMER_LINKS = [
  { name: 'Sell on FarmDirect',  desc: 'List your produce',    to: '/add-post' },
  { name: 'Mandi Price Tracker', desc: 'Live APMC rates',      to: '/mandi' },
  { name: 'Farmer Stories',      desc: 'Community voices',     to: '/blog' },
  { name: 'Support',             desc: 'Help & guidance',      to: '/contact' },
]

const COMPANY_LINKS = [
  { name: 'About Us',       desc: 'Our mission',            to: '/about' },
  { name: 'Blog',           desc: 'Articles & updates',     to: '/blog' },
  { name: 'Privacy Policy', desc: 'How we protect data',    to: '/privacy' },
  { name: 'Contact',        desc: 'Get in touch',           to: '/contact' },
]

function LinkColumn({ title, links }) {
  return (
    <div>
      <div className="ft-col-title">{title}</div>
      <div className="ft-links">
        {links.map((link) => (
          <Link key={link.name} to={link.to} className="ft-link">
            <span className="ft-link-name">{link.name}</span>
            <span className="ft-link-desc">{link.desc}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="ft">

      {/* ── CTA Banner ── */}
      {/* <div className="ft-cta">
        <div className="ft-cta-text">
          Farm-fresh produce, <span>direct to your door.</span> No middlemen.
        </div>
        <div className="ft-btns">
          <Link to="/all-posts">
            <button className="ft-btn-primary">Shop Now</button>
          </Link>
          <Link to="/add-post">
            <button className="ft-btn-secondary">Sell on FarmDirect</button>
          </Link>
        </div>
      </div> */}

      {/* ── Main Grid ── */}
      <div className="ft-main">

        {/* Brand */}
        <div>
          <div className="ft-logo">
            <div className="ft-logo-icon">
              <Sprout size={20} color="#0d1a0e" />
            </div>
            <span className="ft-logo-name">
              Agri<span>Smart</span>
            </span>
          </div>
          <p className="ft-tagline">
            Connecting farmers and consumers since 2022. Fresh, organic, and
            sustainably grown produce from fields to your table.
          </p>
          <div className="ft-socials">
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noreferrer" className="ft-social">
              <svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.93.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
            {/* Discord */}
            <a href="https://discord.com" target="_blank" rel="noreferrer" className="ft-social">
              <svg viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>
            </a>
            {/* YouTube */}
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="ft-social">
              <svg viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
            </a>
          </div>
        </div>

        <LinkColumn title="Marketplace" links={MARKETPLACE_LINKS} />
        <LinkColumn title="Farmers"     links={FARMER_LINKS} />
        <LinkColumn title="Company"     links={COMPANY_LINKS} />
      </div>

      <div className="ft-divider" />

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <div className="ft-copy">
          © {new Date().getFullYear()} <span>FarmDirect</span>. All rights reserved.
          &nbsp;·&nbsp; Ministry of Agriculture &amp; Farmers Welfare partner.
        </div>
        <div className="ft-badge">
          <span className="ft-badge-dot" />
          Serving farmers across India
        </div>
      </div>

    </footer>
  )
}

export default Footer