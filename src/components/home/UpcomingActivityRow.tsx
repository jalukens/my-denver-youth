interface UpcomingActivityRowProps {
  programName: string;
  childAvatar: string;
  childName: string;
  date: string;
  time: string;
  categoryIcon: string;
}

export function UpcomingActivityRow({
  programName,
  childAvatar,
  childName,
  date,
  time,
  categoryIcon,
}: UpcomingActivityRowProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      {/* Category emoji */}
      <div className="w-8 h-8 rounded-lg bg-denver-gray-soft/50 flex items-center justify-center text-base shrink-0">
        {categoryIcon}
      </div>

      {/* Program info */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-[#0D1B35] line-clamp-1">
          {programName}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs">{childAvatar}</span>
          <span className="text-xs text-denver-gray-mid">{childName}</span>
          <span className="text-xs text-denver-gray-soft">|</span>
          <span className="text-xs text-denver-gray-mid">{date}</span>
        </div>
      </div>

      {/* Time */}
      <div className="text-xs font-semibold text-denver-navy shrink-0">
        {time}
      </div>
    </div>
  );
}
