interface SingleOrganizedEventToggleListButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  withBadge?: boolean;
  badgeCount?: number;
}

export default function SingleOrganizedEventToggleListButton({ active, onClick, label, withBadge, badgeCount }: SingleOrganizedEventToggleListButtonProps) {
  return (
    <button
      className={`relative flex items-center gap-6 text-2xl font-semibold ${active ? 'bg-slate-500/50' : 'text-stone-600 bg-slate-600/20'}  px-10 py-4 rounded-xl border border-gray-400/20 hover:scale-[0.99] cursor-pointer transition-all`}
      onClick={onClick}
    >
      {label}
      {withBadge && badgeCount !== undefined && badgeCount > 0  && (
        <span className={`w-8 h-8 rounded-full text-lg flex justify-center items-center ${!active ? 'bg-red-950' : 'bg-red-700'}`}>
          {!active && (
            <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-red-500 opacity-30"></span>
          )}
          {badgeCount}
        </span>
      )}
    </button>
  )
}