// ---------------------------------------------------------------------------
// The only file you need to edit. An empty link ("") shows "Coming soon".
// ---------------------------------------------------------------------------
window.SITE_CONFIG = {
  // Buttons below the title
  pdfUrl: "https://arxiv.org/pdf/2611.20207",
  arxivUrl: "https://arxiv.org/abs/2611.20207",
  codeUrl: "",   // e.g. "https://github.com/lukasWoyke/astropie53-code"
  dataUrl: "",   // later: video identifiers, reconstruction scripts, annotations

  // Authors in paper order. "url" (homepage) and "email" are optional.
  // Emails appear in the Contact section. Only add an address with that person's consent.
  authors: [
    { name: "Stephanie Käs", url: "", email: "kaes@vision.rwth-aachen.de", corresponding: true },
    { name: "Marten Flaig", url: "", email: "" },
    { name: "Lukas Woyke", url: "", email: "" },
    { name: "Osmanalp Ömeroğlu", url: "", email: "" },
    { name: "Felix Krueckel", url: "", email: "" },
    { name: "Onur Alp Çulha", url: "", email: "" },
    { name: "Bastian Leibe", url: "", email: "" },
  ],

  // Teaser video. While empty, the page shows the challenge-class figure.
  // Put the file in assets/ (under 100 MB), e.g. "assets/teaser.mp4".
  videoFile: "",

  // Application downloads.
  // Set releaseUrl once the GitHub Release exists, for example:
  //   "https://github.com/lukasWoyke/astropie53/releases/download/v1.0.0"
  // The "Application" button stays on "Coming soon" until then.
  releaseUrl: "",
  version: "1.0.0",
  termsVersion: "2026-11-06",

  // File names must match the files uploaded to the release exactly.
  // "sha256" is optional. Everyone can also compare against SHA256SUMS.txt.
  downloads: {
    linux: [
      { label: "AppImage", note: "Most distributions. Run chmod +x on the file, then start it.", file: "SPAICE-Annotation-1.0.0-linux-x86_64.AppImage", sha256: "" },
      { label: "Debian / Ubuntu (.deb)", note: "Install with: sudo apt install ./<file>", file: "SPAICE-Annotation-1.0.0-linux-amd64.deb", sha256: "" },
    ],
    mac: [
      { label: "Apple Silicon (.dmg)", note: "Unsigned app. On first start, right-click it and choose Open.", file: "SPAICE-Annotation-1.0.0-mac-arm64.dmg", sha256: "" },
    ],
    windows: [
      { label: "Installer (.exe)", note: "If SmartScreen warns, choose More info, then Run anyway.", file: "SPAICE-Annotation-1.0.0-win-x64.exe", sha256: "" },
      { label: "Portable (.exe)", note: "Runs without installation.", file: "SPAICE-Annotation-1.0.0-portable.exe", sha256: "" },
    ],
  },
};
