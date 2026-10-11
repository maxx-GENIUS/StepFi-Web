# Reputation Embed Integration Guide

Integrate StepFi verified learner reputation scores into any external web application using our secure, unauthenticated embed.

## Quickstart Iframe Snippet

`html
<iframe
  src="https://app.stepfi.io/embed/reputation/GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF?theme=dark"
  width="360"
  height="200"
  frameborder="0"
  sandbox="allow-scripts allow-same-origin"
  title="StepFi Learner Reputation"
></iframe>
`

## Security & Privacy Guarantees
- **Zero Token Leakage**: The embed runs under an unauthenticated client (publicApi).
- **Isolation**: Iframe sandbox prevents host application context contamination.
- **Mock Demo Address**: External documentation uses public non-PII test addresses.