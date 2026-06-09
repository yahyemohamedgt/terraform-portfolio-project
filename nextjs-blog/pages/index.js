import Head from 'next/head'
import styles from '../styles/Home.module.css'
 
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>James Smith — Web Designer</title>
        <meta name="description" content="Portfolio of James Smith, freelance web designer" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </Head>
 
      <main className={styles.main}>
 
        {/* Nav */}
        <nav className={styles.nav}>
          <span className={styles.navLogo}>JS</span>
          <div className={styles.navLinks}>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
 
        {/* Hero */}
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Freelance Web Designer</p>
          <h1 className={styles.heroTitle}>
            James <span className={styles.gradientText}>Smith</span>
          </h1>
          <p className={styles.heroSub}>
            I design modern, responsive websites that load fast and convert well — hosted on AWS, built to scale.
          </p>
          <div className={styles.heroCtas}>
            <a href="#work" className={styles.btnPrimary}>View Work</a>
            <a href="#contact" className={styles.btnSecondary}>Get in Touch</a>
          </div>
        </section>
 
        {/* Stats */}
        <section className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>50+</span>
            <span className={styles.statLabel}>Projects Delivered</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>8yr</span>
            <span className={styles.statLabel}>Experience</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>100%</span>
            <span className={styles.statLabel}>Client Satisfaction</span>
          </div>
        </section>
 
        {/* Work */}
        <section className={styles.section} id="work">
          <p className={styles.sectionEyebrow}>Selected Work</p>
          <h2 className={styles.sectionTitle}>Recent Projects</h2>
          <div className={styles.grid}>
            {[
              { title: 'E-Commerce Redesign', tag: 'UI/UX · Shopify', desc: 'Rebuilt a struggling online store — 40% increase in conversion rate within 30 days.' },
              { title: 'SaaS Landing Page', tag: 'Next.js · AWS', desc: 'High-performance marketing site deployed on S3 and CloudFront with sub-second load times globally.' },
              { title: 'Brand Identity System', tag: 'Branding · Design', desc: 'Complete visual identity for a fintech startup — logo, type system, and component library.' },
              { title: 'Portfolio Platform', tag: 'React · Tailwind', desc: 'Custom portfolio builder for creative professionals with CMS integration and dark mode.' },
            ].map((p, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardTag}>{p.tag}</div>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
                <span className={styles.cardArrow}>→</span>
              </div>
            ))}
          </div>
        </section>
 
        {/* About */}
        <section className={styles.about} id="about">
          <div className={styles.aboutText}>
            <p className={styles.sectionEyebrow}>About</p>
            <h2 className={styles.sectionTitle}>Design that performs</h2>
            <p className={styles.aboutBody}>
              I've spent 8 years designing websites for clients who care about results — not just aesthetics. Every project starts with understanding the business goal and ends with infrastructure that can handle real traffic.
            </p>
            <p className={styles.aboutBody}>
              Currently deploying all client sites on AWS using Terraform — because fast, reliable hosting is part of good design.
            </p>
          </div>
          <div className={styles.aboutSkills}>
            {['Next.js', 'React', 'Figma', 'AWS', 'Terraform', 'Tailwind CSS', 'TypeScript', 'Node.js'].map((s, i) => (
              <span key={i} className={styles.skillPill}>{s}</span>
            ))}
          </div>
        </section>
 
        {/* Contact */}
        <section className={styles.contact} id="contact">
          <p className={styles.sectionEyebrow}>Contact</p>
          <h2 className={styles.contactTitle}>Let's build something.</h2>
          <p className={styles.contactSub}>Available for freelance projects and long-term contracts.</p>
          <a href="mailto:james@example.com" className={styles.btnPrimary}>james@example.com</a>
        </section>
 
      </main>
 
      <footer className={styles.footer}>
        <span>© 2026 James Smith</span>
        <span className={styles.footerInfra}>Hosted on AWS S3 + CloudFront · Deployed with Terraform</span>
      </footer>
    </div>
  )
}
