# IFI Pulse Brand System

## Evidence levels

### Documented brand rules

Supplied directly in the project brief:

- Pradita deep green `#006333` is the primary application color.
- Supporting colors are red `#EC1C24`, orange `#F56E21`, amber `#FFA421`, and yellow `#F8D301`.
- Neutral background is `#F5F5F5` with white surfaces.
- The visual character is professional, modern, institutional, minimal, and dashboard-oriented.
- Titillium Web is the preferred product typeface.

### Observed IFI patterns

Observed on [IFI's official website](https://www.ifi-id.com/fr/) and its published logo artwork:

- the institutional mark uses a strong French blue and a high-contrast typographic construction;
- white space and restrained institutional layouts support cultural content;
- French and Indonesian identity coexist without the logo being recolored or reconstructed.

These observations are not presented as an official IFI brand manual.

## Application rules

- Pradita green owns navigation, primary actions, and product recognition.
- IFI blue is a secondary institutional accent, not the main app color.
- Red, orange, amber, and yellow communicate urgency, status, and analytic emphasis.
- Avoid decorative gradients. Use flat color, purposeful contrast, and generous grouping space.
- Preserve all official IFI artwork in its original aspect ratio and color.
- Maintain at least half the logo height as clear space around official marks.
- Never fabricate an IFI symbol or merge the official IFI logo into the IFI Pulse product mark.
- “IFI Pulse” is a product wordmark, not an alternate IFI institutional logo.

## Typography

- Primary family: Titillium Web
- Headings: 600–700 weight, compact tracking
- Body: 400 weight, comfortable 1.5–1.7 line height
- Labels: 600 weight with restrained uppercase tracking
- Minimum body size: 16px for public feedback; 14px for dense dashboard supporting text

## Brand signal packet

```json
{
  "packet_id": "PKT-ifi-pulse-foundation",
  "from": "brand-intelligence",
  "to": "designly-director",
  "job": "Define the Phase 1 brand foundation for the IFI Pulse product interface.",
  "decisions": [
    {
      "key": "primary_application_color",
      "value": "#006333",
      "rationale": "Explicitly supplied as Pradita University's primary color.",
      "priority": 2
    },
    {
      "key": "typography",
      "value": "Titillium Web",
      "rationale": "Explicit user preference for Pradita-facing communication.",
      "priority": 2
    },
    {
      "key": "ifi_identity_handling",
      "value": "Preserve official artwork; use IFI blue only as a secondary accent.",
      "rationale": "Separates documented Pradita rules from observed IFI visual patterns.",
      "priority": 2
    }
  ],
  "evidence": [
    "User-supplied IFI Pulse implementation brief",
    "User confirmation of Titillium as Pradita's usual font",
    "Official IFI Indonesia website and logo assets at https://www.ifi-id.com/fr/"
  ],
  "confidence": 0.88,
  "hard_vetoes": [
    {
      "rule": "Do not redraw, recolor, distort, or merge the official IFI mark.",
      "reason": "No official IFI brand manual or alternate-mark permission was supplied.",
      "severity": "hard_gate",
      "remediation": "Use the downloaded official artwork at its original aspect ratio with adequate clear space."
    }
  ],
  "soft_warnings": [
    "IFI color and spacing observations are inferred from public materials, not a supplied brand manual.",
    "The IFI Pulse product mark should not be presented as an official replacement for either institution's logo."
  ],
  "unresolved": [
    "Official Pradita University logo files and complete brand manual have not yet been supplied.",
    "Official IFI font and exact color specifications remain unverified."
  ],
  "recommended_next": [
    "Replace temporary textual Pradita attribution when approved vector logo files are supplied.",
    "Run a formal brand review before a public deployment."
  ]
}
```
