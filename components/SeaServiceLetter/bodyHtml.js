// Content extracted from the Sea Service Letter HTML mockup (form + hero + FAQ).
export const seaServiceLetterBodyHtml = `
<section class="hero" aria-labelledby="pageTitle">
  <div class="wrap">
    <nav class="crumbs" aria-label="Breadcrumb"><ol>
      <li><a href="/">Home</a></li>
      <li><a href="/careers">Careers</a></li>
      <li aria-current="page">Sea Service Letter</li>
    </ol></nav>
    <h1 id="pageTitle">Sea Service Letter</h1>
    <p class="lede">Served on a Nautilus vessel? Tell us where and when. Our crew operations team checks your service against vessel records and issues a signed letter for the Mercantile Marine Department.</p>
    <ol class="route" aria-label="How it works">
      <li><b>You submit</b><span>Your documents and each vessel you served on</span></li>
      <li><b>We verify</b><span>Crew operations matches your dates to vessel records</span></li>
      <li><b>Letter issued</b><span>Signed letter with a QR code anyone can verify</span></li>
    </ol>
  </div>
</section>

<section class="wrap page" id="main">
  <aside class="intro">
    <h2>Keep these ready</h2>
    <ul class="checklist">
      <li><b>CDC</b><span>Number exactly as printed, like MUM 123456</span></li>
      <li><b>INDoS</b><span>Your 8-character INDoS number</span></li>
      <li><b>Passport</b><span>Current passport number</span></li>
      <li><b>Service dates</b><span>Sign-on and sign-off dates as stamped in your CDC</span></li>
    </ul>
    <div class="assure">
      <h3>Only trust letters issued by us</h3>
      <p>Nautilus Shipping never asks seafarers for money for employment or placement. If anyone does in our name, report it to <a href="mailto:hello@nautilusshipping.com">hello@nautilusshipping.com</a>.</p>
    </div>
    <p class="contact">Questions about your service record? Write to <a href="mailto:crew.ops1@nautilusshipping.com">crew.ops1@nautilusshipping.com</a> or <a href="mailto:crew.ops2@nautilusshipping.com">crew.ops2@nautilusshipping.com</a>, or call <a href="tel:+914446849999">+91 44 4684 9999</a>.</p>
  </aside>

  <section class="form-card" aria-labelledby="formTitle">
    <form id="ssForm" novalidate>
      <div class="form-head">
        <h2 id="formTitle">Request your letter</h2>
        <p>All fields are required.</p>
      </div>

      <div class="error-summary" id="errorSummary" role="alert" tabindex="-1">
        <strong>Check the highlighted fields</strong>
        <ul id="errorList"></ul>
      </div>

      <fieldset>
        <legend>About you</legend>
        <p class="legend-note">We'll send updates on your request to this email and phone.</p>
        <div class="grid">
          <div class="field span-2">
            <label for="name">Full name</label>
            <span class="hint">As it appears in your CDC</span>
            <input id="name" name="name" autocomplete="name" required>
            <span class="err" id="name-err"></span>
          </div>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="email" inputmode="email" required>
            <span class="err" id="email-err"></span>
          </div>
          <div class="field">
            <label for="phone">Mobile number</label>
            <div class="phone-row">
              <select id="phoneCode" name="phoneCode" aria-label="Country code" autocomplete="tel-country-code">
                <option value="+91" selected>IN +91</option>
                <option value="+63">PH +63</option>
                <option value="+94">LK +94</option>
                <option value="+880">BD +880</option>
                <option value="+95">MM +95</option>
                <option value="+62">ID +62</option>
                <option value="+971">AE +971</option>
                <option value="+65">SG +65</option>
                <option value="+44">GB +44</option>
                <option value="+1">US +1</option>
              </select>
              <input id="phone" name="phone" type="tel" autocomplete="tel-national" inputmode="tel" placeholder="98765 43210" required>
            </div>
            <span class="err" id="phone-err"></span>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Your documents</legend>
        <div class="grid grid-3">
          <div class="field">
            <label for="cdc">CDC number</label>
            <input id="cdc" name="cdc" class="upper" placeholder="MUM 123456" autocomplete="off" required>
            <span class="err" id="cdc-err"></span>
          </div>
          <div class="field">
            <label for="indos">INDoS number</label>
            <input id="indos" name="indos" class="upper" placeholder="24GM1234" maxlength="9" autocomplete="off" required>
            <span class="err" id="indos-err"></span>
          </div>
          <div class="field">
            <label for="passport">Passport number</label>
            <input id="passport" name="passport" class="upper" placeholder="A1234567" maxlength="8" autocomplete="off" required>
            <span class="err" id="passport-err"></span>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <legend>Sea service</legend>
        <p class="legend-note">Add each Nautilus vessel you served on. Use the dates stamped in your CDC.</p>
        <div class="field">
          <label for="vesselCount" id="vesselCountLabel">Number of vessels</label>
          <div class="stepper">
            <button type="button" id="vcMinus" aria-label="Remove a vessel">−</button>
            <input id="vesselCount" name="vesselCount" type="number" min="1" max="10" value="1" inputmode="numeric" aria-labelledby="vesselCountLabel">
            <button type="button" id="vcPlus" aria-label="Add a vessel">+</button>
          </div>
        </div>
        <div class="vessels" id="vessels"></div>

        <div class="seatime" aria-live="polite">
          <div class="seatime-top">
            <span class="seatime-label">Total sea service you're requesting</span>
            <span class="seatime-total" id="seaTotal">0<small>days</small></span>
          </div>
          <div id="seaTrack"></div>
        </div>
      </fieldset>

      <label class="declare" id="declareWrap">
        <input type="checkbox" id="declare" name="declare">
        <span>I confirm these details match my CDC and that Nautilus Shipping may verify them against its vessel records. I have read the <a href="/privacy-policy">Privacy Statement</a>.</span>
      </label>

      <div class="actions">
        <button class="btn" type="submit" id="submitBtn">Send request</button>
      </div>
    </form>

    <div class="done" id="done" tabindex="-1">
      <h2>Request sent</h2>
      <p>Your reference number:</p>
      <div class="ref-chip" id="doneRef"></div>
      <p>Crew operations will verify your service and email the signed letter to <b id="doneEmail"></b>. Quote your reference number if you contact us about this request.</p>
      <p><button class="btn btn-quiet" type="button" id="newRequest">Start a new request</button></p>
    </div>
  </section>
</section>

<section class="faq" aria-labelledby="faqTitle">
  <div class="wrap">
    <h2 id="faqTitle">Frequently asked questions</h2>
    <div>
      <details>
        <summary>My vessel isn't in the list. Can I still apply?</summary>
        <p>Yes. Type the vessel name exactly as it's written in your CDC. Crew operations adds the vessel particulars (IMO, type, GRT, engine power and flag) from company records before the letter is signed.</p>
      </details>
      <details>
        <summary>How will I receive my letter?</summary>
        <p>We email the signed letter to the address you give in this form. Quote your reference number if you write to crew operations about your request.</p>
      </details>
      <details>
        <summary>How can the MMD or an employer check my letter is genuine?</summary>
        <p>Every letter carries a reference number and a QR code. Scanning the code opens a Nautilus Shipping page that confirms the letter was issued by us.</p>
      </details>
      <details>
        <summary>Two of my sign-on periods overlap. What should I do?</summary>
        <p>Check the stamps in your CDC and correct the dates before sending. The form flags overlapping periods so you can fix them before you send.</p>
      </details>
    </div>
  </div>
</section>
`