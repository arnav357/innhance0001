import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles, HelpCircle } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Blog.css'

gsap.registerPlugin(ScrollTrigger)

const uppercaseFirstWord = (text) => {
  if (typeof text !== 'string' || !text) return text;
  return text
    .split(' ')
    .map(word => {
      if (!word) return '';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

export default function Blog() {
  const { t, i18n } = useTranslation()
  const [selectedPostId, setSelectedPostId] = useState(null)
  const container = useRef(null)
  const rawPosts = t("blog.posts", { returnObjects: true });
  const blogPosts = Array.isArray(rawPosts) ? rawPosts.filter(post => post.contentBlocks && post.contentBlocks.length > 0) : [];
  
  useGSAP(() => {
    if (selectedPostId === null) {
      gsap.from('.blog-header > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all"
      })

      gsap.from('.blog-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
        clearProps: "all"
      })
    } else {
      gsap.from('.blog-article-header > *', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      })
      gsap.from('.blog-article-banner, .blog-article-content > *', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all"
      })
    }
  }, { scope: container, dependencies: [selectedPostId, blogPosts.length] })

  const blogPostImages = {
    1: "/assets/blog/blog_img_1.webp",
    2: "/assets/blog/blog_img_2.webp",
    3: "/assets/blog/blog_img_3.webp",
    4: "/assets/blog/blog_img_4.webp",
    5: "/assets/blog/blog_img_5.webp"
  }

  if (selectedPostId !== null) {
    const post = blogPosts.find(p => p.id === selectedPostId) || blogPosts[0]
    
    return (
      <section className="blog-section section-padding" id="blog" ref={container}>
        <div className="blog-bg-grid"></div>
        <div className="blog-blob blog-blob-1"></div>
        <div className="blog-blob blog-blob-2"></div>

        <div className="container-custom relative-z">
          {/* Back button */}
          <button className="blog-back-btn" onClick={() => { setSelectedPostId(null); window.scrollTo(0,0); }}>
            <ArrowLeft size={18} /> {t("blog.backToJournal") || "Back to Journal"}
          </button>

          <article className="blog-article-wrapper">
            <div className="blog-article-card">
              {/* Header */}
            <header className="blog-article-header">
              <div className="blog-badge">
                <Sparkles size={16} /> {post.category}
              </div>
              <h1 className="blog-article-title">{post.title}</h1>
              {post.subtitle && <h2 className="blog-article-subtitle">{post.subtitle}</h2>}
              <div className="blog-article-meta">
                <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
              </div>
            </header>

            {/* Banner Image */}
            <div className="blog-article-banner">
              <img src={blogPostImages[post.id]} alt={post.title} className="blog-banner-img" />
            </div>

            {/* Content Body */}
            {Array.isArray(post.contentBlocks) ? (
              <div className="blog-article-content">
                {post.contentBlocks.map((block, index) => {
                  switch (block.type) {
                    case "h3":
                      return <h3 key={index} className="blog-body-heading-3">{block.text}</h3>
                    case "h4":
                      return <h4 key={index} className="blog-body-heading-4">{block.text}</h4>
                    case "p":
                      return <p key={index} dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                    case "list":
                      return (
                        <ul key={index} className="blog-bullet-list">
                          {Array.isArray(block.items) && block.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: uppercaseFirstWord(item).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          ))}
                        </ul>
                      )
                    case "table1":
                      return (
                        <div key={index} className="blog-table-container">
                          <table className="blog-table">
                            <thead>
                              <tr>
                                <th>{post.table1HeaderTrend}</th>
                                <th>{post.table1HeaderData}</th>
                                {post.table1HeaderCol3 && <th>{post.table1HeaderCol3}</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(post.table1Rows) && post.table1Rows.map((row, idx) => (
                                <tr key={idx}>
                                  <td>{row.label}</td>
                                  <td className="text-highlight">{row.val}</td>
                                  {row.val2 && <td className="text-highlight">{row.val2}</td>}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="table-source">{post.table1Source}</div>
                        </div>
                      )
                    case "table2":
                      return (
                        <div key={index} className="blog-table-container">
                          <table className="blog-table">
                            <thead>
                              <tr>
                                <th>{post.table2HeaderArea}</th>
                                <th>{post.table2HeaderImprovement}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(post.table2Rows) && post.table2Rows.map((row, idx) => (
                                <tr key={idx}>
                                  <td>{row.label}</td>
                                  <td className="text-highlight">{row.val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="table-source">{post.table2Source}</div>
                        </div>
                      )
                    case "table3":
                      return (
                        <div key={index} className="blog-table-container">
                          <table className="blog-table">
                            <thead>
                              <tr>
                                <th>{post.table3HeaderDept}</th>
                                <th>{post.table3HeaderAction}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Array.isArray(post.table3Rows) && post.table3Rows.map((row, idx) => (
                                <tr key={idx}>
                                  <td>{row.label}</td>
                                  <td className="text-highlight">{row.val}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )
                    case "faqs":
                      return (
                        <section key={index} className="blog-article-section faqs-section-wrapper">
                          <h3><HelpCircle size={20} className="faq-title-icon" /> {post.faqsTitle}</h3>
                          <div className="blog-faqs-list">
                            {Array.isArray(post.faqs) && post.faqs.map((faq, idx) => (
                              <div key={idx} className="blog-faq-item">
                                <h5 className="blog-faq-question">{faq.q}</h5>
                                <p className="blog-faq-answer">{faq.a}</p>
                              </div>
                            ))}
                          </div>
                        </section>
                      )
                    case "conclusion":
                      return (
                        <div key={index} className="conclusion-block">
                          <p dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                        </div>
                      )
                    case "conclusion_list":
                      return (
                        <ul key={index} className="blog-bullet-list conclusion-bullet-list">
                          {Array.isArray(block.items) && block.items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: uppercaseFirstWord(item).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                          ))}
                        </ul>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            ) : (
              <div className="blog-article-content">
                <p>{post.excerpt}</p>
                <div className="coming-soon-stub" style={{ marginTop: '40px', padding: '30px', border: '1px dashed var(--color-polished-brass)', borderRadius: '12px', textAlign: 'center' }}>
                  <h4 style={{ color: 'var(--color-racing-green)', marginBottom: '10px' }}>Full Article Coming Soon</h4>
                  <p style={{ margin: 0, color: 'var(--color-surface-500)' }}>We are currently crafting a detailed analysis for this topic. Stay tuned!</p>
                </div>
              </div>
            )}

            {/* Article Footer CTA */}
            <div className="blog-article-footer-cta">
              <h4>{t("blog.ctaTitle") || "Ready to build a highly integrated operation?"}</h4>
              <p>{t("blog.ctaDesc") || "Visit Innhance.in to see our platform capabilities in action, or connect with our integration specialists to design a high-performing tech stack for your brand today."}</p>
              <a href="https://wa.link/jkc1du" target="_blank" rel="noopener noreferrer">
                <button className="btn-primary">{t("blog.ctaBtn") || "Book a Demo Today"}</button>
              </a>
            </div>
            </div>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="blog-section section-padding" id="blog" ref={container}>
      <div className="blog-bg-grid"></div>
      <div className="blog-blob blog-blob-1"></div>
      <div className="blog-blob blog-blob-2"></div>

      <div className="container-custom relative-z">
        <div className="blog-header">
          <div className="blog-badge"><Sparkles size={16} /> {t("blog.latestInsights")}</div>
          <h1 className="blog-title">
            {t("blog.titlePrefix")}<span className="blog-title-highlight">{t("blog.titleHighlight")}</span>
          </h1>
          <p className="blog-subtitle">
            {t("blog.subtitle")}
          </p>
        </div>

        <div className="blog-grid-wrapper">
          <div className="blog-grid">
            {Array.isArray(blogPosts) && blogPosts.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="blog-image-wrapper">
                  <img src={blogPostImages[post.id]} alt={post.title} className="blog-image" loading="lazy" decoding="async" />
                  <div className="blog-category">{post.category}</div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span className="meta-item"><Calendar size={14} /> {post.date}</span>
                    <span className="meta-item"><Clock size={14} /> {post.readTime}</span>
                  </div>
                  <h3 className="blog-post-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <a href="#" className="read-more-btn" onClick={(e) => { e.preventDefault(); setSelectedPostId(post.id); window.scrollTo(0,0); }}>
                    {t("blog.readArticle")} <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
