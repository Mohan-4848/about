import CodeArenaVisual from './CodeArenaVisual';
import SpeedPotVisual from './SpeedPotVisual';
import HybridNodeVisual from './HybridNodeVisual';
import AimsVisual from './AimsVisual';

const VISUALS = {
  codearena: CodeArenaVisual,
  speedpot: SpeedPotVisual,
  'hybrid-node': HybridNodeVisual,
  'aims-portal': AimsVisual,
};

export default function ProjectVisual({ id, className = '' }) {
  const Visual = VISUALS[id];
  return (
    <div className={`dot-bg relative overflow-hidden bg-surface-2/40 ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 120%, var(--glow), transparent 60%)' }}
      />
      {Visual && <Visual />}
    </div>
  );
}
