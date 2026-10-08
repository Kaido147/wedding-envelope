"use client";

import { useId, useRef, useState } from "react";

import { Reveal } from "./reveal";

export function RsvpPreview({ deadline }: { deadline: string }) {
  const prefix = useId();
  const nextId = useRef(0);
  const addButton = useRef<HTMLButtonElement>(null);
  const [companions, setCompanions] = useState<{ id: number; name: string }[]>([]);

  function addCompanion() {
    const id = nextId.current++;
    setCompanions((current) => [...current, { id, name: "" }]);
    requestAnimationFrame(() => document.getElementById(`${prefix}-companion-${id}`)?.focus());
  }

  function removeCompanion(id: number) {
    setCompanions((current) => current.filter((companion) => companion.id !== id));
    addButton.current?.focus();
  }

  return (
    <div className="rsvp-layout">
      <Reveal as="form" variant="fade" order={1} className="rsvp-form paper-card" onSubmit={(event) => event.preventDefault()} aria-label="Attendance confirmation" aria-describedby={`${prefix}-notice`}>
        <div className="form-heading">
          <span className="eyebrow">A seat at our table</span>
          <h3>We hope you can join us.</h3>
          <p>Please respond by {deadline}.</p>
        </div>
        <label htmlFor={`${prefix}-name`}>Your full name</label>
        <input id={`${prefix}-name`} name="guest-name" autoComplete="name" placeholder="First and last name" maxLength={100} />
        <div className="companions-heading">
          <span>Invited companions <span className="optional">(optional)</span></span>
          <p>Only include people named in your invitation.</p>
        </div>
        <div className="companions-list">
          {companions.map((companion, index) => (
            <div className="companion-field" key={companion.id}>
              <label htmlFor={`${prefix}-companion-${companion.id}`}>Companion {index + 1}</label>
              <div className="companion-input-row">
                <input
                  id={`${prefix}-companion-${companion.id}`}
                  name={`companion-${companion.id}`}
                  autoComplete="off"
                  placeholder="First and last name"
                  maxLength={100}
                  value={companion.name}
                  onChange={(event) => setCompanions((current) => current.map((item) => item.id === companion.id ? { ...item, name: event.target.value } : item))}
                />
                <button type="button" className="remove-companion" onClick={() => removeCompanion(companion.id)} aria-label={`Remove companion ${index + 1}`}>×</button>
              </div>
            </div>
          ))}
        </div>
        <button ref={addButton} type="button" className="add-companion" onClick={addCompanion}>
          <span aria-hidden="true">+</span> Add a companion
        </button>
        <p className="rsvp-notice" id={`${prefix}-notice`}>Online confirmation will be available here soon. For now, please contact us to confirm your attendance.</p>
        <button type="submit" className="button button--disabled" disabled>Confirm attendance <span aria-hidden="true">↗</span></button>
      </Reveal>
      <Reveal as="aside" variant="fade" order={2} className="guest-list paper-card" aria-labelledby="guest-list-title">
        <span className="eyebrow">Celebrating together</span>
        <h3 id="guest-list-title">Our guests</h3>
        <p>Looking forward to sharing this day with you.</p>
        <div className="guest-list-columns" aria-hidden="true"><span>Guest name</span><span>Party size</span></div>
        <div className="guest-list-empty">
          <span className="empty-monogram" aria-hidden="true">K&T</span>
          <p>Confirmed guests will appear here.</p>
          <span>A celebration made special by you.</span>
        </div>
      </Reveal>
    </div>
  );
}
