import { useInView } from '../../lib/hooks';

export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, shown] = useInView();
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Like Reveal, but animates on mount — for content that is visible on load. */
export function Rise({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  return (
    <Tag className={`rise ${className}`} style={{ '--reveal-delay': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  );
}
