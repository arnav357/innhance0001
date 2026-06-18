import { useTranslation } from 'react-i18next'
import { useNavigate, useLocation } from 'react-router-dom'
import { MapPin, Mail } from 'lucide-react'
import data from '../../data/innhanceData.json'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavClick = (path, e) => {
    if (e) e.preventDefault()
    if (location.pathname !== path) {
      navigate(path)
    }
  }

  const handleSectionClick = (e, path, sectionId) => {
    e.preventDefault()
    if (location.pathname !== path) {
      navigate(path)
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0,0)
      }, 300)
    } else {
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0,0)
      }, 100)
    }
  }
  return (
    <footer className="footer-cito">
      <div className="container-custom">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/assets/logo.webp" alt="Innhance Logo" className="logo-img" loading="lazy" decoding="async" />
              <span className="logo-text">{data.company.name}</span>
            </div>
            <p className="footer-desc">{t("footer.companyDescription")}</p>
          </div>
      </div>    

        <div className="footer-links-grid">
          <div className="flink-col">
            <h3>{t("footer.product")}</h3>
            <ul>
              <li><a href="#features" onClick={(e) => handleSectionClick(e, '/', 'features')}>{t("footer.featuresLink")}</a></li>
              <li><a href="#pricing" onClick={(e) => handleSectionClick(e, '/', 'pricing')}>{t("footer.pricingLink")}</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h3>{t("footer.resources")}</h3>
            <ul>
              <li><a href="/blog" onClick={(e) => handleNavClick('/blog', e)}>{t("footer.blog")}</a></li>
            </ul>
          </div>
          <div className="flink-col">
            <h3>{t("footer.company")}</h3>
            <ul>
              <li><a href="/about" onClick={(e) => handleNavClick('/about', e)}>{t("footer.aboutUs")}</a></li>
              <li><a href="/privacy" onClick={(e) => handleNavClick('/privacy', e)}>{t("footer.privacyPolicy")}</a></li>
            </ul>
          </div>
          <div className="flink-col contact-col">
            <h3>{t("footer.contact")}</h3>
            <ul>
              <li><a href={`mailto:${data.company.email}`} className="contact-link"><Mail size={16}/> {data.company.email}</a></li>
              <li><MapPin size={16}/> {data.company.location}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  )
}
