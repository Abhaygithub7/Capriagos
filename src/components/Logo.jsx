export default function Logo({ className = '' }) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "'Public Sans', system-ui, sans-serif",
        fontWeight: 900,
        fontSize: '1.15rem',
        letterSpacing: '-0.03em',
        textTransform: 'uppercase',
        display: 'inline-block',
        lineHeight: 1,
        color: 'currentColor',
      }}
    >
      Capriagos
    </span>
  );
}