"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";

import { submitRsvp, type RsvpActionState } from "../actions/rsvp";
import { Reveal } from "./reveal";

const initialState: RsvpActionState = { status: "idle", message: "" };

export type ConfirmedGuest = {
  name: string;
  bringingPlusOne: boolean;
};

export function RsvpPreview({ deadline, guests }: { deadline: string; guests: ConfirmedGuest[] }) {
  const prefix = useId();
  const companionInput = useRef<HTMLInputElement>(null);
  const [bringingPlusOne, setBringingPlusOne] = useState(false);
  const [companionName, setCompanionName] = useState("");
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);

  useEffect(() => {
    if (bringingPlusOne) companionInput.current?.focus();
  }, [bringingPlusOne]);

  return (
    <div className="rsvp-layout">
      <Reveal as="form" variant="fade" order={1} className="rsvp-form paper-card" action={formAction} aria-label="Attendance confirmation" aria-describedby={`${prefix}-notice ${prefix}-status`}>
        <div className="form-heading">
          <span className="eyebrow">A seat at our table</span>
          <h3>We hope you can join us.</h3>
          <p>Please respond by {deadline}.</p>
        </div>

        <label htmlFor={`${prefix}-name`}>Your full name</label>
        <input id={`${prefix}-name`} name="guestName" autoComplete="name" placeholder="First and last name" maxLength={100} required aria-invalid={state.fieldErrors?.guestName ? true : undefined} aria-describedby={state.fieldErrors?.guestName ? `${prefix}-name-error` : undefined} />
        {state.fieldErrors?.guestName && <p className="form-error" id={`${prefix}-name-error`}>{state.fieldErrors.guestName}</p>}

        <div className="plus-one-choice">
          <input id={`${prefix}-plus-one`} name="bringingPlusOne" type="checkbox" checked={bringingPlusOne} onChange={(event) => {
            setBringingPlusOne(event.target.checked);
            if (!event.target.checked) setCompanionName("");
          }} aria-controls={`${prefix}-companion-field`} />
          <label htmlFor={`${prefix}-plus-one`}>I&apos;ll be bringing a +1</label>
        </div>
        <p className="plus-one-note">You may bring one guest. Their name can be added now or later.</p>

        <div id={`${prefix}-companion-field`} className={`companion-field ${bringingPlusOne ? "is-visible" : ""}`} aria-hidden={!bringingPlusOne}>
          <label htmlFor={`${prefix}-companion`}>Companion&apos;s name <span className="optional">(optional)</span></label>
          <input ref={companionInput} id={`${prefix}-companion`} name="companionName" autoComplete="off" placeholder="First and last name" maxLength={100} disabled={!bringingPlusOne} value={companionName} onChange={(event) => setCompanionName(event.target.value)} />
          {state.fieldErrors?.companionName && <p className="form-error">{state.fieldErrors.companionName}</p>}
        </div>

        <p className="rsvp-notice" id={`${prefix}-notice`}>Please respond by {deadline}.</p>
        <p className={`form-status form-status--${state.status}`} id={`${prefix}-status`} aria-live="polite">{state.message}</p>
        <button type="submit" className="button" disabled={pending}>{pending ? "Confirming…" : "Confirm attendance"} <span aria-hidden="true">↗</span></button>
      </Reveal>

      <Reveal as="aside" variant="fade" order={2} className="guest-list paper-card" aria-labelledby="guest-list-title">
        <span className="eyebrow">Celebrating together</span>
        <h3 id="guest-list-title">Our guests</h3>
        <p>Looking forward to sharing this day with you.</p>
        <div className="guest-list-columns" aria-hidden="true"><span>Guest name</span><span>Party size</span></div>
        {guests.length > 0 ? <ul className="confirmed-guests">{guests.map((guest) => <li key={guest.name}><span>{guest.name}</span><span>{guest.bringingPlusOne ? "+1" : "1"}</span></li>)}</ul> : <div className="guest-list-empty">
          <span className="empty-monogram" aria-hidden="true">K&T</span>
          <p>Confirmed guests will appear here.</p>
          <span>A celebration made special by you.</span>
        </div>}
      </Reveal>
    </div>
  );
}
