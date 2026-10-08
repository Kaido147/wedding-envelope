import type { CSSProperties } from "react";
import { Entourage } from "./components/entourage";
import { PhotoPanel } from "./components/photo-panel";
import { RsvpPreview } from "./components/rsvp-preview";
import { Reveal } from "./components/reveal";
import { SiteHeader } from "./components/site-header";
import { Botanical, Ornament, PaperEdge, WaxSeal } from "./components/stationery";
import { wedding } from "./wedding-content";

export default function Home() {
  const paperStyle = {
    "--paper-grain": `url("${wedding.decorations.grain}")`,
    "--paper-edge": `url("${wedding.decorations.edge}")`,
  } as CSSProperties;

  return (
    <div className="site-wrapper" style={paperStyle}>
      <a className="skip-link" href="#main">Skip to invitation</a>
      <SiteHeader />
      <main id="main">
        <section className="hero" id="top" aria-labelledby="invitation-title">
          <div className="hero-scene container">
            <Botanical className="hero-flowers-left" eager />
            <Botanical className="hero-flowers-right" eager />
            <div className="invitation-card paper-card">
              <span className="invitation-border" aria-hidden="true" />
              <p className="invitation-family">Together with their families</p>
              <p className="hero-introduction">You are warmly invited to the wedding of</p>
              <h1 id="invitation-title" className="couple-names" aria-label={wedding.couple.fullNames.join(" and ")}>
                <span>{wedding.couple.first}</span>
                <span className="hero-ampersand" aria-hidden="true">&</span>
                <span>{wedding.couple.second}</span>
              </h1>
              <div className="invitation-details">
                <Ornament />
                <time className="wedding-date" dateTime={wedding.date.iso}>{wedding.date.weekday}, {wedding.date.display}</time>
                <p className="hero-venue">{wedding.venue.name}<span>{wedding.venue.location}</span></p>
                <a href="#rsvp" className="button hero-rsvp">RSVP <span className="sr-only">— visit attendance details</span></a>
              </div>
              <WaxSeal className="invitation-seal" />
            </div>
            <figure className="hero-photograph photo-mat paper-card">
              <PhotoPanel photo={wedding.photos.portrait} />
              <figcaption>Our forever begins here.</figcaption>
            </figure>
          </div>
          <a href="#our-story" className="scroll-note">A beautiful chapter, together <span aria-hidden="true">↓</span></a>
        </section>

        <section className="story-section section" id="our-story" aria-labelledby="story-title">
          <PaperEdge className="edge-from-paper" />
          <div className="container">
            <Reveal className="story-layout">
              <figure className="story-photograph photo-mat paper-card">
                <PhotoPanel photo={wedding.photos.story} variant="story" />
                <figcaption>The little moments. The greatest journey.</figcaption>
              </figure>
              <div className="story-copy paper-card">
                <p className="eyebrow">Our love story</p>
                <h2 id="story-title">Choosing each other,<br /><em>every single day.</em></h2>
                <Ornament />
                <p>{wedding.story[0]}</p>
                <p>{wedding.story[1]}</p>
                <details className="story-more">
                  <summary>Read the rest of our story <span className="disclosure-mark" aria-hidden="true" /></summary>
                  <div>{wedding.story.slice(2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                </details>
                <span className="note-signature">With love, Kian & Trisha</span>
              </div>
            </Reveal>
          </div>
          <Botanical className="story-flowers" />
        </section>

        <section className="day section" id="the-day" aria-labelledby="day-title">
          <PaperEdge className="edge-from-ivory" />
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <p className="eyebrow">The wedding day</p>
                <h2 id="day-title">One day.<br /><em>A lifetime together.</em></h2>
                <Ornament />
                <p>We cannot wait to celebrate with our favorite people.</p>
              </div>
              <div className="day-grid">
                <article className="day-detail paper-card">
                  <Ornament /><h3>The ceremony</h3>
                  <p className="detail-emphasis">{wedding.venue.name}</p>
                  <p>{wedding.venue.location}</p>
                  <p className="detail-description">{wedding.venue.ceremony}</p>
                  <span className="detail-meta">Arrive at 4:00 PM<br />Ceremony at 5:00 PM</span>
                </article>
                <article className="day-detail paper-card">
                  <Ornament /><h3>The celebration</h3>
                  <p className="detail-emphasis">Dinner, laughter & love</p>
                  <p>{wedding.venue.name}</p>
                  <p className="detail-description">{wedding.venue.reception}</p>
                  <span className="detail-meta">Dinner begins at 7:00 PM</span>
                </article>
                <article className="day-detail paper-card">
                  <Ornament /><h3>The dress code</h3>
                  <p className="detail-emphasis">{wedding.attire}</p>
                  <div className="attire-swatch"><span aria-hidden="true" /> Timeless elegance</div>
                  <p className="detail-description">Dress in your favorite all-black semi-formal outfit for our special day.</p>
                  <span className="detail-meta">We look forward to seeing you dressed up.</span>
                </article>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="schedule section" aria-labelledby="schedule-title">
          <PaperEdge className="edge-from-paper" />
          <Botanical className="schedule-flowers botanical--light" />
          <Reveal className="container schedule-content">
            <p className="eyebrow">An evening to remember</p>
            <h2 id="schedule-title">The day we say <em>I do.</em></h2>
            <Ornament />
            <p className="schedule-date">{wedding.date.display}</p>
            <ol className="schedule-list">
              {wedding.schedule.map((event) => (
                <li key={event.time}>
                  <span className="schedule-time">{event.time}<small>{event.period}</small></span>
                  <h3>{event.name}</h3><p>{event.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>

        <section className="entourage section" aria-labelledby="entourage-title">
          <div className="container">
            <Reveal className="entourage-program paper-card">
              <div className="section-heading centered">
                <p className="eyebrow">The entourage</p>
                <h2 id="entourage-title">The people<br /><em>by our side.</em></h2>
                <Ornament />
                <p>With love and gratitude for those who walk with us.</p>
              </div>
              <Entourage groups={wedding.entourage} />
              <Botanical className="program-flowers" />
            </Reveal>
          </div>
        </section>

        <section className="gifts section" aria-labelledby="gifts-title">
          <Reveal className="container gift-content paper-card">
            <Botanical className="gift-flowers" />
            <p className="eyebrow">A little note on gifts</p>
            <h2 id="gifts-title">Your presence,<br /><em>our greatest gift.</em></h2>
            <Ornament />
            <p>{wedding.giftMessage}</p>
            <span className="note-signature">With all our love</span>
            <WaxSeal className="gift-seal" />
          </Reveal>
        </section>

        <section className="faq section" aria-labelledby="faq-title">
          <div className="container">
            <Reveal className="faq-card paper-card">
              <div className="section-heading">
                <p className="eyebrow">Guest information</p>
                <h2 id="faq-title">A few things<br /><em>to know.</em></h2>
                <Ornament />
                <p>A little preparation for<br />a beautiful celebration.</p>
              </div>
              <div className="faq-list">
                {wedding.faqs.map((faq) => (
                  <details className="faq-item" key={faq.question}>
                    <summary><span>{faq.question}</span><span className="disclosure-mark" aria-hidden="true" /></summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="rsvp section" id="rsvp" aria-labelledby="rsvp-title">
          <div className="container">
            <Reveal>
              <div className="section-heading centered">
                <p className="eyebrow">Join the celebration</p>
                <h2 id="rsvp-title">Kindly <em>RSVP.</em></h2>
                <Ornament />
                <p>Our day would not be the same without you.</p>
              </div>
              <RsvpPreview deadline={wedding.rsvpDeadline} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="site-footer section" id="contact">
        <PaperEdge className="edge-from-ivory" />
        <Botanical className="footer-flowers-left botanical--light" />
        <Botanical className="footer-flowers-right botanical--light" />
        <Reveal className="container footer-content">
          <span className="footer-monogram" aria-hidden="true">{wedding.couple.monogram}</span>
          <Ornament />
          <p className="footer-message">From two separate dreams<br />to one <em>forever.</em></p>
          <p className="footer-date">{wedding.date.display}</p>
          <div className="footer-contacts">
            {wedding.contacts.map((contact) => (
              <div key={contact.name}>
                <h2>{contact.name}</h2>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <p>{contact.phoneDisplay}</p>
              </div>
            ))}
          </div>
          <div className="footer-bottom"><span>{wedding.hashtag}</span><a href="#top">Back to invitation <span aria-hidden="true">↑</span></a></div>
        </Reveal>
      </footer>
    </div>
  );
}
