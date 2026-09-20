/* ==========================================================================
   EDIT ME
   Everything a non-developer is likely to update lives in this block.
   See README.md for a walkthrough of each field.
   ========================================================================== */

const SITE_CONFIG = {
  email: "prakhar.mehta@outlook.com",
  // Add real URLs to turn these links on. Leave empty ("") to hide them.
  linkedin: "https://www.linkedin.com/in/prakharmehta/",
  googleScholar: "https://scholar.google.com/citations?user=f15GSnQAAAAJ&hl=en",
  researchGate: "https://www.researchgate.net/profile/Prakhar_Mehta?ev=hdr_xprf",
  github: "",
  // A Calendly (or similar) booking link. Leave empty to hide.
  calendly: "",
};

// "More on request" is shown under this list either way — replace these
// with real thesis titles before publishing. Leave linkedin empty unless
// the student has agreed to be linked publicly.
const THESES = [
  {
    title: "Sensitivity analysis of residential battery storage under dynamic electricity tariffs",
    degree: "MSc",
    area: "Energy systems",
    linkedin: "",
  },
  {
    title: "Agent-based modeling of solar PV adoption in residential communities",
    degree: "BSc",
    area: "Energy systems",
    linkedin: "",
  },
  {
    title: "Time-series clustering of household electricity consumption patterns",
    degree: "MSc",
    area: "Data analytics",
    linkedin: "",
  },
  {
    title: "Behavioral drivers of electric vehicle charging choices",
    degree: "MSc",
    area: "Behavioral economics",
    linkedin: "",
  },
  {
    title: "A GIS-based approach to siting community energy projects",
    degree: "BSc",
    area: "Sustainability",
    linkedin: "",
  },
];

// Replace quote/name/context with a real testimonial and set filled: true.
// Placeholder entries render with a dashed border so it's obvious on the
// live site if one is ever left unedited.
const TESTIMONIALS = [
  {
    quote: "Add a short quote from a student or partner here.",
    name: "Add name",
    context: "Program, year",
    filled: false,
  },
  {
    quote: "Add a short quote from a student or partner here.",
    name: "Add name",
    context: "Program, year",
    filled: false,
  },
];

/* ==========================================================================
   Rendering
   ========================================================================== */

function renderTheses() {
  const list = document.getElementById("thesisList");
  if (!list) return;
  list.innerHTML = THESES.map((t) => {
    const titleHtml = t.linkedin
      ? `<a href="${t.linkedin}" target="_blank" rel="noopener">${t.title}</a>`
      : t.title;
    return `
      <div class="thesis-row">
        <span class="degree">${t.degree}</span>
        <span class="title">${titleHtml}</span>
        <span class="area">${t.area}</span>
      </div>`;
  }).join("");
}

function renderTestimonials() {
  const grid = document.getElementById("testimonialGrid");
  if (!grid) return;
  grid.innerHTML = TESTIMONIALS.map((t) => `
    <div class="testimonial-card ${t.filled ? "filled" : ""}">
      <p>&ldquo;${t.quote}&rdquo;</p>
      <cite>${t.name} — ${t.context}</cite>
    </div>`).join("");
}

function renderContactLinks() {
  const list = document.getElementById("contactLinks");
  const footer = document.getElementById("footerLinks");
  if (!list || !footer) return;

  const items = [];
  if (SITE_CONFIG.email) {
    items.push({ label: `Email: ${SITE_CONFIG.email}`, href: `mailto:${SITE_CONFIG.email}` });
  }
  if (SITE_CONFIG.calendly) {
    items.push({ label: "Book a call directly", href: SITE_CONFIG.calendly });
  }

  list.innerHTML = items.map((i) => `<li><a href="${i.href}">${i.label}</a></li>`).join("");

  const social = [
    { key: "linkedin", label: "LinkedIn" },
    { key: "googleScholar", label: "Google Scholar" },
    { key: "researchGate", label: "ResearchGate" },
    { key: "github", label: "GitHub" },
  ].filter((s) => SITE_CONFIG[s.key]);

  footer.innerHTML = social.map((s) =>
    `<li><a href="${SITE_CONFIG[s.key]}" target="_blank" rel="noopener">${s.label}</a></li>`
  ).join("");
}

/* ==========================================================================
   Mobile nav
   ========================================================================== */

function initNav() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  if (!header || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) {
      header.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ==========================================================================
   Contact form
   ========================================================================== */

function initForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (!form || !status) return;

  const isPlaceholderEndpoint = form.action.includes("YOUR_FORM_ID");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    if (isPlaceholderEndpoint) {
      // No form backend configured yet — fall back to a mailto draft so
      // the form is still useful out of the box. See README to connect
      // Formspree (or another provider) and remove this fallback.
      const subject = encodeURIComponent(`Website enquiry from ${data.get("name")}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nI am a: ${data.get("role")}\n\n${data.get("message")}`
      );
      window.location.href = `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email app. (Connect Formspree — see README — to collect messages directly instead.)";
      status.className = "form-status";
      return;
    }

    status.textContent = "Sending…";
    status.className = "form-status";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        status.textContent = "Thanks — your message is sent. I'll get back to you soon.";
        status.className = "form-status success";
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (err) {
      status.textContent = `Something went wrong. Email me directly at ${SITE_CONFIG.email}.`;
      status.className = "form-status error";
    }
  });
}

/* ==========================================================================
   Init
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderTheses();
  renderTestimonials();
  renderContactLinks();
  initNav();
  initForm();
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
