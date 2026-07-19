const APP_BASE_URL =
  import.meta.env.VITE_APP_BASE_URL?.trim() || "https://app.captavola.com";

export const APP_SIGN_IN_URL = `${APP_BASE_URL}/`;
export const APP_REGISTER_URL = `${APP_BASE_URL}/register`;

export const DEMO_REQUEST_SECTION_ID = "request-demo";

export function goToDemoRequest() {
  const section = document.getElementById(DEMO_REQUEST_SECTION_ID);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = `/#${DEMO_REQUEST_SECTION_ID}`;
  }
}
