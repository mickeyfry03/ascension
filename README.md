* {
  box-sizing: border-box;
}

:root {
  --bg: #f7f2ed;
  --panel: #fffaf4;
  --panel-strong: #fff;
  --card: #fff;
  --text: #1d1d1a;
  --muted: #5c554d;
  --line: rgba(29, 29, 26, 0.08);
  --primary: #b75f3d;
  --primary-deep: #8e4329;
  --primary-soft: #f4d7cc;
  --secondary: #dcae7b;
  --success: #2d7a5a;
  --success-soft: #dff3ea;
  --shadow: 0 18px 42px rgba(49, 33, 24, 0.08);
  --radius: 24px;
  --container: 1180px;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea,
select {
  font: inherit;
}

img {
  max-width: 100%;
  display: block;
}

.container {
  width: min(var(--container), calc(100% - 32px));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(247, 242, 237, 0.86);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}

.nav-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 82px;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  color: white;
  box-shadow: 0 8px 18px rgba(183, 95, 61, 0.28);
}

.main-nav,
.nav-actions {
  display: flex;
  align-items: center;
  gap: 22px;
}

.main-nav a,
.nav-link {
  color: var(--muted);
  font-weight: 600;
}

.primary-btn,
.secondary-btn,
.ghost-btn,
.filter-btn,
.close-btn {
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-deep) 100%);
  color: white;
  border-radius: 999px;
  padding: 0.8rem 1.35rem;
  font-weight: 700;
  box-shadow: 0 14px 26px rgba(183, 95, 61, 0.18);
}

.primary-btn:hover,
.secondary-btn:hover,
.ghost-btn:hover,
.filter-btn:hover,
.close-btn:hover {
  transform: translateY(-1px);
}

.secondary-btn,
.ghost-btn,
.filter-btn {
  padding: 0.8rem 1.2rem;
  border-radius: 999px;
  font-weight: 700;
}

.secondary-btn {
  background: rgba(183, 95, 61, 0.08);
  color: var(--primary-deep);
}

.ghost-btn {
  background: transparent;
  border: 1px solid rgba(29, 29, 26, 0.12);
  color: var(--text);
  width: 100%;
  margin-top: 1rem;
}

.large {
  padding-inline: 1.5rem;
}

.hero {
  padding: 70px 0 42px;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: center;
  gap: 52px;
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--primary-deep);
  font-size: 0.76rem;
  font-weight: 800;
}

h1,
h2,
h3,
h4 {
  margin: 0;
  letter-spacing: -0.05em;
}

h1 {
  font-size: clamp(2.7rem, 5vw, 5rem);
  line-height: 0.96;
  max-width: 560px;
}

h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.08;
}

h3 {
  font-size: 1.3rem;
}

.lede {
  margin-top: 18px;
  max-width: 600px;
  font-size: 1.12rem;
  color: var(--muted);
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 30px;
}

.trust-points {
  list-style: none;
  padding: 0;
  margin: 28px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  color: var(--muted);
  font-weight: 700;
}

.trust-points li {
  position: relative;
  padding-left: 18px;
}

.trust-points li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--primary);
}

.hero-panel {
  display: flex;
  justify-content: center;
}

.impact-card {
  width: min(100%, 430px);
  background: linear-gradient(180deg, #fffefc 0%, #fff4ee 100%);
  border: 1px solid rgba(183, 95, 61, 0.12);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 28px;
}

.card-head,
.metric-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  font-size: 0.75rem;
  font-weight: 800;
}

.status-badge.success {
  background: var(--success-soft);
  color: var(--success);
}

.muted {
  color: var(--muted);
  font-weight: 700;
}

.metric-block {
  margin-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-block strong {
  font-size: clamp(2.4rem, 5vw, 4rem);
  letter-spacing: -0.08em;
}

.metric-block span {
  color: var(--muted);
}

.meter {
  height: 12px;
  width: 100%;
  margin: 24px 0;
  background: rgba(183, 95, 61, 0.08);
  border-radius: 999px;
  overflow: hidden;
}

.meter-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%);
  border-radius: inherit;
}

.metric-row {
  margin-top: 18px;
}

.metric-row small {
  display: block;
  color: var(--muted);
}

.metric-row strong {
  display: block;
  margin-top: 4px;
  font-size: 1.25rem;
}

.trust-bar {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.38);
}

.trust-bar-inner {
  padding: 18px 0;
  text-align: center;
  color: var(--muted);
  font-weight: 700;
}

.section {
  padding: 88px 0;
}

.alt {
  background: rgba(255, 255, 255, 0.3);
}

.section-heading {
  margin-bottom: 34px;
}

.section-heading.center {
  text-align: center;
}

.section-heading.split {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 18px;
}

.steps-grid,
.needs-grid,
.info-grid,
.about-grid {
  display: grid;
  gap: 24px;
}

.steps-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.step-card,
.need-card,
.info-card,
.faq-item {
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.step-card {
  padding: 28px 22px;
}

.step-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  font-weight: 800;
  border-radius: 50%;
  background: var(--primary-soft);
  color: var(--primary-deep);
  margin-bottom: 16px;
}

.step-card p,
.need-card p,
.about-copy p,
.faq-item p,
.info-card p,
.site-footer p {
  color: var(--muted);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
}

.filter-btn {
  background: rgba(29, 29, 26, 0.04);
  color: var(--text);
}

.filter-btn.active {
  background: var(--primary-soft);
  color: var(--primary-deep);
}

.needs-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.need-card {
  padding: 22px;
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.need-card h3 {
  margin-top: 20px;
  font-size: 1.28rem;
}

.card-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.need-amount {
  font-weight: 800;
  color: var(--primary-deep);
}

.card-meta {
  margin-top: auto;
  padding-top: 18px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: var(--muted);
  font-size: 0.9rem;
}

.info-grid {
  grid-template-columns: 0.8fr 1.2fr;
  align-items: center;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.info-card {
  padding: 22px 18px;
}

.about-grid {
  grid-template-columns: 0.9fr 1.1fr;
  align-items: center;
}

.about-copy {
  display: grid;
  gap: 18px;
}

.faq-list {
  display: grid;
  gap: 18px;
  max-width: 880px;
  margin: 0 auto;
}

.faq-item {
  padding: 22px 24px;
}

.site-footer {
  padding-top: 30px;
  background: #1f1c1a;
  color: rgba(255, 255, 255, 0.8);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr;
  gap: 24px;
  padding-bottom: 26px;
}

.footer-brand {
  font-size: 1.2rem;
}

.site-footer h4 {
  color: white;
  margin-bottom: 14px;
  font-size: 1rem;
}

.site-footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0 28px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.modal {
  position: fixed;
  inset: 0;
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal.open {
  display: flex;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(16, 13, 11, 0.55);
}

.modal-card {
  position: relative;
  width: min(620px, calc(100% - 24px));
  max-height: calc(100vh - 24px);
  overflow: auto;
  background: #fff;
  border-radius: 28px;
  box-shadow: var(--shadow);
  padding: 26px 24px 20px;
  z-index: 1;
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(29, 29, 26, 0.05);
  color: var(--text);
  font-size: 1.5rem;
}

.modal-header {
  margin-bottom: 18px;
}

.help-form {
  display: grid;
  gap: 18px;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

label {
  display: grid;
  gap: 8px;
  color: var(--text);
  font-weight: 700;
}

input,
textarea,
select {
  width: 100%;
  border: 1px solid rgba(29, 29, 26, 0.12);
  background: #fff;
  border-radius: 14px;
  padding: 0.9rem 1rem;
  color: var(--text);
}

input:focus,
textarea:focus,
select:focus {
  outline: 2px solid rgba(183, 95, 61, 0.2);
  border-color: rgba(183, 95, 61, 0.45);
}

.submit-btn {
  width: fit-content;
}

@media (max-width: 920px) {
  .hero-grid,
  .steps-grid,
  .info-grid,
  .about-grid,
  .needs-grid,
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .section-heading.split {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    justify-content: flex-start;
  }

  .main-nav {
    display: none;
  }
}

@media (max-width: 640px) {
  .nav-wrap {
    min-height: 72px;
  }

  .nav-actions {
    gap: 10px;
  }

  .nav-link {
    display: none;
  }

  .field-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
  }
}

