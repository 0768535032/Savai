type Props = {
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
  minHeight?: string;
  className?: string;
};

export default function PageHead({ src, alt, title, subtitle, minHeight, className }: Props) {
  return (
    <header className={`nbhead${className ? ` ${className}` : ''}`} style={minHeight ? { minHeight } : undefined}>
      <img src={src} alt={alt} />
      <div className="wrap txt">
        <h1 style={{ fontSize: 'clamp(32px,5vw,56px)' }}>{title}</h1>
        {subtitle && <p className="narrow">{subtitle}</p>}
      </div>
    </header>
  );
}
