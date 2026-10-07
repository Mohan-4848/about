import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { onToast } from '../../lib/toast';

export default function Toaster() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    const off = onToast((msg) => {
      setMessage(msg);
      setVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setVisible(false), 2200);
    });
    return () => {
      off();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4 transition-all duration-500 ease-out-expo ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      {message && (
        <div className="flex items-center gap-2.5 rounded-full border border-line-strong bg-surface/90 py-2 pl-2.5 pr-4 text-sm shadow-2xl shadow-black/20 backdrop-blur-xl">
          <span className="grid size-5 place-items-center rounded-full bg-ok/15 text-ok">
            <Check className="size-3" strokeWidth={3} />
          </span>
          {message}
        </div>
      )}
    </div>
  );
}
