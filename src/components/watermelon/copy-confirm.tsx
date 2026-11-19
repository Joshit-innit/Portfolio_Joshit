// Adapted from Watermelon UI "Copy Confirm" (MIT): https://ui.watermelon.sh/animated-components/copy-confirm
// Changes: just the button, quiet color and icon swap, portfolio colours,
// falls back to opening the mail app if the clipboard is blocked.
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CopyConfirmProps {
  value: string;
  copyText?: string;
  copiedText?: string;
  className?: string;
}

export function CopyConfirm({ value, copyText = 'Copy email', copiedText = 'Copied', className }: CopyConfirmProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  }

  const Icon = copied ? CheckIcon : CopyIcon;
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Email copied' : `Copy email address ${value}`}
      className={cn(
        'btn cursor-pointer border',
        copied ? 'border-gold bg-gold text-ink' : 'border-current/40 hover:border-current hover:bg-white/10',
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.5} />
      <span aria-hidden>{copied ? copiedText : copyText}</span>
      <span className="sr-only" aria-live="polite">{copied ? 'Copied to clipboard' : ''}</span>
    </button>
  );
}
