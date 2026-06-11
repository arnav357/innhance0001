import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import data from '../../data/innhanceData.json';
import './FAQ.css';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const { t } = useTranslation();
  const faqs = t('faq_section.items', { returnObjects: true }) || [];
  const [openIndex, setOpenIndex] = useState(null);
  const faqRef = useRef(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 85%',
        }
      });

      gsap.from('.faq-item', {
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: faqRef.current,
          start: 'top 85%',
        }
      });
    }, faqRef);

    return () => ctx.revert();
  }, { scope: faqRef });

  return (
    <section className="faq-section section-padding" ref={faqRef} id="faq">
      <div className="container-custom">
        <div className="faq-layout">
          
          <div className="faq-header">
            <h2 className="faq-title">{t('faq_section.title')}</h2>
            <p className="faq-subtitle">{t('faq_section.subtitle')}</p>
          </div>

          <div className="faq-list-container">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${openIndex === index ? 'active' : ''}`}
                >
                  <button 
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openIndex === index}
                  >
                    <h3 style={{ fontSize: 'inherit', margin: 0, fontWeight: 'inherit' }}>{faq.question}</h3>
                    <ChevronDown className="faq-icon" />
                  </button>
                  <div 
                    className="faq-answer-wrapper"
                    style={{
                      maxHeight: openIndex === index ? '500px' : '0px',
                      opacity: openIndex === index ? 1 : 0,
                    }}
                  >
                    <div className="faq-answer">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
