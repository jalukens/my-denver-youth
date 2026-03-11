import { Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { isChildEligible } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Child, Program } from '@/lib/types';

interface ChildSelectorProps {
  children: Child[];
  program: Program;
  selectedChildId: string | null;
  onSelect: (childId: string) => void;
}

export function ChildSelector({
  children,
  program,
  selectedChildId,
  onSelect,
}: ChildSelectorProps) {
  return (
    <div className="space-y-3">
      {children.map((child) => {
        const eligible = isChildEligible(child, program);
        const isSelected = child.id === selectedChildId;

        return (
          <button
            key={child.id}
            onClick={() => eligible && onSelect(child.id)}
            disabled={!eligible}
            className="w-full text-left"
          >
            <Card
              className={cn(
                'transition-all',
                isSelected && 'border-denver-teal bg-denver-teal-light ring-1 ring-denver-teal/20',
                !eligible && 'opacity-50'
              )}
            >
              <div className="p-4 flex items-center gap-4">
                {/* Avatar */}
                <div className="text-3xl">{child.avatar}</div>

                {/* Info */}
                <div className="flex-1">
                  <div className="font-medium text-denver-navy">
                    {child.name}
                  </div>
                  <div className="text-sm text-denver-gray-mid">
                    Age {child.age}
                  </div>
                </div>

                {/* Status icon */}
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-denver-teal flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                {!eligible && (
                  <div className="flex items-center gap-1 text-xs text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>
                      Ages {program.ageRange.min}-{program.ageRange.max}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </button>
        );
      })}
    </div>
  );
}
