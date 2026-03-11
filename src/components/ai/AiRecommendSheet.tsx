import { useState, useCallback, useEffect, useRef } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AudioInput } from './AudioInput';
import { RecommendationCard } from './RecommendationCard';
import { getAiRecommendations } from '@/lib/aiMock';
import type { AiRecommendation } from '@/lib/aiMock';
import { family, programs, fundingAccounts } from '@/lib/mockData';
import { useSpeechToText } from '@/hooks/useSpeechToText';
import { useLanguage } from '@/lib/i18n';

interface AiRecommendSheetProps {
  open: boolean;
  onClose: () => void;
}

export function AiRecommendSheet({ open, onClose }: AiRecommendSheetProps) {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState<AiRecommendation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { lang, t } = useLanguage();

  const { isListening, isSupported, startListening, stopListening, transcript } = useSpeechToText();

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Sync transcript into query
  const prevTranscript = useRef('');
  useEffect(() => {
    if (transcript && transcript !== prevTranscript.current) {
      prevTranscript.current = transcript;
      setQuery((prev) => (prev ? prev + ' ' + transcript : transcript));
    }
  }, [transcript]);

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const results = getAiRecommendations(
      query,
      family,
      programs,
      fundingAccounts
    );
    setRecommendations(results);
    setIsSearching(false);
  }, [query]);

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-denver-amber" />
            <SheetTitle>{t('ai.title')}</SheetTitle>
          </div>
        </SheetHeader>

        <div className="px-6 py-4 space-y-4">
          {/* Input area */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('ai.placeholder')}
                className="min-h-[60px]"
              />
            </div>
            <AudioInput
              isListening={isListening}
              onToggle={toggleListening}
              isSupported={isSupported}
            />
          </div>

          {/* Search button */}
          <Button
            variant="brand"
            className="w-full"
            onClick={handleSearch}
            disabled={!query.trim() || isSearching}
          >
            {isSearching ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-4 h-4 mr-2" />
            )}
            {t('ai.findPrograms')}
          </Button>

          {/* Results */}
          {isSearching && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-denver-amber mb-3" />
              <p className="text-sm text-denver-gray-mid">{t('ai.thinking')}</p>
            </div>
          )}

          {!isSearching && recommendations.length > 0 && (
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <RecommendationCard
                  key={i}
                  recommendation={rec}
                  lang={lang}
                  t={t}
                />
              ))}
            </div>
          )}

          {!isSearching && hasSearched && recommendations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-denver-gray-mid">{t('ai.noResults')}</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
