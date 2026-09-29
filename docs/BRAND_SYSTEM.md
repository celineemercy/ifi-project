# IFI Savoir-Faire Hub Brand System

## Documented brand rules

- Pradita deep green `#006333` is the primary application color.
- Supporting colors are red `#EC1C24`, orange `#F56E21`, and yellow `#F8D301`.
- Surfaces use white and the light background `#F5F5F5`.
- Inter is the primary application typeface.
- The product should feel professional, modern, academic, international, welcoming, clean, and minimal.

## Observed IFI patterns

IFI's official public website and published artwork use a strong French blue, high-contrast institutional typography, and generous white space. These are observed patterns, not a supplied IFI brand manual.

## Product identity rules

- Pradita green owns navigation, primary actions, and product recognition.
- IFI blue is a restrained secondary institutional accent.
- Orange, red, and yellow support progress, difficulty, state, and emphasis.
- Avoid excessive gradients and decorative visual noise.
- Preserve official IFI artwork in its original colors and aspect ratio.
- Maintain at least half the logo height as clear space around official artwork.
- Never merge the Savoir-Faire Hub product mark with the official IFI logo.
- The Savoir-Faire Hub wordmark is a prototype product identity, not a replacement institutional logo.

## Typography

- Primary family: Inter
- Headings: weight 600–700
- Body: weight 400 with comfortable line height
- Labels: weight 600 with restrained uppercase tracking
- Public and learning body copy should remain at least 16px

## Brand signal packet

```json
{
  "packet_id": "PKT-ifi-savoir-faire-foundation",
  "from": "brand-intelligence",
  "to": "designly-director",
  "job": "Realign the product identity from IFI Pulse to IFI Savoir-Faire Hub while preserving institutional brand boundaries.",
  "decisions": [
    {
      "key": "primary_application_color",
      "value": "#006333",
      "rationale": "Explicit Pradita University brand instruction.",
      "priority": 2
    },
    {
      "key": "typography",
      "value": "Inter",
      "rationale": "Current user instruction for consistent interface typography.",
      "priority": 2
    },
    {
      "key": "product_identity",
      "value": "IFI Savoir-Faire Hub uses a separate prototype wordmark and never alters official IFI artwork.",
      "rationale": "Protects institutional logo fidelity while establishing a distinct learning-product identity.",
      "priority": 2
    }
  ],
  "evidence": [
    "User-supplied IFI Savoir-Faire Hub implementation plan",
    "User-confirmed Pradita palette and Inter preference",
    "Official IFI Indonesia website and supplied public logo artwork"
  ],
  "confidence": 0.9,
  "hard_vetoes": [
    {
      "rule": "Do not redraw, recolor, distort, or merge the official IFI mark.",
      "reason": "No official alternate-mark permission or complete IFI brand manual was supplied.",
      "severity": "hard_gate",
      "remediation": "Use the official artwork unchanged with its original aspect ratio and adequate clear space."
    }
  ],
  "soft_warnings": [
    "IFI blue and spacing behavior are observed from public material rather than a formal supplied manual.",
    "Training visuals must remain welcoming and should not drift into formal HR-performance language."
  ],
  "unresolved": [
    "Official Pradita University vector logo files have not yet been supplied.",
    "Official IFI typography and exact color specifications remain unverified."
  ],
  "recommended_next": [
    "Replace textual Pradita attribution when approved logo files are supplied.",
    "Run a formal joint-brand review before public deployment."
  ]
}
```
