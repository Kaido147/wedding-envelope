"use client";

import { useActionState, useId } from "react";

import { submitRsvp, type RsvpActionState } from "../actions/rsvp";
import { Reveal } from "./reveal";

const initialState: RsvpActionState = { status: "idle", message: "" };

export type ConfirmedGuest = {
  name: string;
};

export function RsvpPreview({ responseMessage, guests }: { responseMessage: string; guests: ConfirmedGuest[] }) {
  const prefix = useId();
  const [state, formAction, pending] = useActionState(submitRsvp, initialState);
  const participantLabel = `${guests.length} ${guests.length === 1 ? "guest" : "guests"} confirmed`;

  return (
    <div className="rsvp-layout">
      <Reveal as="form" variant="bloom" order={1} className="rsvp-form paper-card" action={formAction} aria-label="Attendance confirmation" aria-describedby={`${prefix}-notice ${prefix}-status`}>
        <div className="form-heading">
          <span className="eyebrow">A seat at our table</span>
          <h3>We hope you can join us.</h3>
          <p>{responseMessage}</p>
        </div>

        <label htmlFor={`${prefix}-name`}>Your full name</label>
        <input id={`${prefix}-name`} name="guestName" autoComplete="name" placeholder="First and last name" maxLength={100} required aria-invalid={state.fieldErrors?.guestName ? true : undefined} aria-describedby={state.fieldErrors?.guestName ? `${prefix}-name-error` : undefined} />
        {state.fieldErrors?.guestName && <p className="form-error" id={`${prefix}-name-error`}>{state.fieldErrors.guestName}</p>}

        <p className="rsvp-notice" id={`${prefix}-notice`}>{responseMessage}</p>
        <p className={`form-status form-status--${state.status}`} id={`${prefix}-status`} aria-live="polite">{state.message}</p>
        <button type="submit" className="button" disabled={pending}>{pending ? "Confirming…" : "Confirm attendance"} <span aria-hidden="true">↗</span></button>
      </Reveal>

      <Reveal as="aside" variant="bloom" order={2} className="guest-list paper-card" aria-labelledby="guest-list-title">
        <span className="eyebrow">Celebrating together</span>
        <div className="guest-list-summary">
          <h3 id="guest-list-title">Our guests</h3>
          <p className="participant-total" aria-live="polite"><strong>{guests.length}</strong><span>{guests.length === 1 ? "guest confirmed" : "guests confirmed"}</span></p>
        </div>
        <p>Looking forward to sharing this day with you.</p>
        {guests.length > 0 ? <ul className="confirmed-guests" aria-label={participantLabel}>{guests.map((guest) => <li key={guest.name}><span>{guest.name}</span></li>)}</ul> : <div className="guest-list-empty">
          <span className="empty-monogram" aria-hidden="true">K&T</span>
          <p>Confirmed guests will appear here.</p>
          <span>A celebration made special by you.</span>
        </div>}
      </Reveal>
    </div>
  );
}
