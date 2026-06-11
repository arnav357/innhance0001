import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Check, Sparkles } from 'lucide-react'
import './Pricing.css'

gsap.registerPlugin(ScrollTrigger)

export default function Pricing() {
  const { t } = useTranslation()
  const container = useRef(null)
  const plans = t('pricing.plans', { returnObjects: true })

  useGSAP(() => {
    gsap.from('.price-card', {
      scrollTrigger: { trigger: container.current, start: 'top 70%' },
      y: 50, opacity: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out'
    })
  }, { scope: container })

  return (
    <section className="pricing-section section-padding" id="pricing" ref={container}>
      <div className="container-custom">
        <div className="pricing-header">
          <h2 className="section-title">
            {t("pricing.titleLine1")} <br/>
            <span className="text-muted">{t("pricing.titleLine2")}</span>
          </h2>
        </div>
        <div className="promo-capsule">
          <Sparkles size={20} className="promo-icon"/>
          <span className="promo-text">{t("pricing.launchOfferTitle")} {t("pricing.launchOfferDesc")}</span>
        </div>
        <div className="pricing-grid">
          {plans.map((plan, idx) => {
            const isRec = idx === 1
            return (
              <div key={idx} className={`price-card ${isRec ? 'rec-card' : ''}`}>
                {isRec && <div className="rec-badge">{t("pricing.mostPopular")}</div>}
                <div className="price-top">
                  <h3 className="plan-title">{plan.tier}</h3>
                  {plan.subtitle && <div className="plan-sub">{plan.subtitle}</div>}
                  <div className="plan-price">{plan.price}</div>
                  <p className="plan-desc">{plan.description}</p>
                </div>
                <div className="price-list-wrap">
                  <ul className="price-features">
                    {plan.features.map((f, i) => (
                      <li key={i}><Check size={18} className="check"/>{f}</li>
                    ))}
                  </ul>
                </div>
                <div className="price-bot">
                  <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer ">
                  <button className={isRec ? 'btn-primary w-full' : 'btn-secondary w-full'}>
                    {t("pricing.choose")} {plan.tier}
                  </button>
                  </a>  
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
