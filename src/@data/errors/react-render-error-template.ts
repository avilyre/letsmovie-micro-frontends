export const reactRenderErrorTemplate = (message: string) => {
  return `
    <div style="height:100vh;color: #ef4444;font-size: 2rem;padding: 2rem;background: #111827;">
      ${message}
    </div>
  `;
}