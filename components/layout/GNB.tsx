'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
  { label: 'SERVICES', href: '/#services' },
  { label: 'PORTFOLIO', href: '/portfolio' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT', href: '/contact' },
]

export default function GNB() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const textColor = scrolled ? '#111' : '#fff'

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          ...(scrolled
            ? {
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                borderBottom: '1px solid #eee',
              }
            : {
                mixBlendMode: 'difference',
              }),
          transition: 'background 0.3s, border-bottom 0.3s',
        }}
      >
        <div
          style={{
            padding: '0 20px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              color: textColor,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textDecoration: 'none',
              transition: 'color 0.3s',
            }}
          >
            WIZ THE PLANNING
          </Link>

          {/* Desktop nav */}
          <div
            style={{ display: 'flex', gap: 28 }}
            className="hidden md:flex"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  color: textColor,
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
              padding: 4,
            }}
            aria-label="메뉴 열기"
          >
            <span style={{ display: 'block', width: 22, height: 1.5, background: textColor, transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: 22, height: 1.5, background: textColor, transition: 'background 0.3s' }} />
            <span style={{ display: 'block', width: 14, height: 1.5, background: textColor, transition: 'background 0.3s' }} />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
          }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              fontSize: 24,
              lineHeight: 1,
            }}
            aria-label="메뉴 닫기"
          >
            ×
          </button>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: '0.2em',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
