import { useState, useMemo } from 'react';
import {
  Search,
  Sparkles,
  ChevronRight,
  DollarSign,
  CheckCircle,
  Loader2,
  GraduationCap,
  Clock,
  MapPin,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ProgramCard } from '@/components/programs/ProgramCard';
import { ProgramFilters, type FilterState } from '@/components/programs/ProgramFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { useI18n } from '@/lib/i18n';
import { programs, family, fundingAccounts, schoolPrograms } from '@/lib/mockData';
import { getAiRecommendations, type AiRecommendation } from '@/lib/aiMock';
import { getCategoryIcon, getCategoryColor, formatCurrency } from '@/lib/utils';
import { cn } from '@/lib/utils';

type ViewMode = 'community' | 'school';

export default function ExplorePage() {
  const { t, language } = useI18n();
  const [viewMode, setViewMode] = useState<ViewMode>('community');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    age: null,
    category: null,
    day: null,
    neighborhood: null,
    hasSpots: false,
  });
  const [showAiSheet, setShowAiSheet] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState<AiRecommendation[]>([]);
  const [aiSearching, setAiSearching] = useState(false);
  const [aiSearched, setAiSearched] = useState(false);

  const neighborhoods = useMemo(() => {
    const set = new Set(programs.map((p) => p.location.neighborhood));
    return Array.from(set).sort();
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter((program) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchName =
          program.name.toLowerCase().includes(query) ||
          program.nameEs.toLowerCase().includes(query);
        const matchProvider = program.provider.toLowerCase().includes(query);
        const matchTags = program.tags.some((tag) => tag.toLowerCase().includes(query));
        const matchCategory = program.category.toLowerCase().includes(query);
        if (!matchName && !matchProvider && !matchTags && !matchCategory) return false;
      }
      if (filters.category && program.category !== filters.category) return false;
      if (filters.age && (filters.age < program.ageRange.min || filters.age > program.ageRange.max)) return false;
      if (filters.day && !program.schedule.days.includes(filters.day)) return false;
      if (filters.neighborhood && program.location.neighborhood !== filters.neighborhood) return false;
      if (filters.hasSpots && program.spotsAvailable === 0) return false;
      return true;
    });
  }, [searchQuery, filters]);

  // Group school programs by child
  const schoolByChild = useMemo(() => {
    return family.children.map((child) => ({
      child,
      programs: schoolPrograms.filter((sp) => sp.childId === child.id),
    }));
  }, []);

  const handleAiSearch = (query: string) => {
    if (!query.trim()) return;
    setAiSearching(true);
    setAiSearched(false);
    setAiRecommendations([]);
    setTimeout(() => {
      const results = getAiRecommendations(query, family, programs, fundingAccounts);
      setAiRecommendations(results);
      setAiSearching(false);
      setAiSearched(true);
    }, 1000);
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setAiQuery(suggestion);
    handleAiSearch(suggestion);
  };

  const dayAbbreviations: Record<string, string> = {
    Monday: 'M', Tuesday: 'T', Wednesday: 'W', Thursday: 'Th',
    Friday: 'F', Saturday: 'Sa', Sunday: 'Su',
  };

  return (
    <div className="flex flex-col">
      <Header title={t('explore.title')} />

      {/* Search bar + AI button */}
      <div className="px-4 py-3 bg-white border-b border-denver-gray-soft">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-denver-gray-mid" />
            <Input
              type="text"
              placeholder={t('explore.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="shrink-0 rounded-lg border-denver-purple/30 text-denver-purple hover:bg-denver-purple/5"
            onClick={() => setShowAiSheet(true)}
          >
            <Sparkles className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* View toggle: School / Community */}
      <div className="px-4 py-3 bg-white border-b border-denver-gray-soft">
        <div className="flex gap-1 bg-denver-gray-soft p-1 rounded-lg">
          <button
            onClick={() => setViewMode('community')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all',
              viewMode === 'community'
                ? 'bg-denver-navy text-white'
                : 'text-denver-gray-mid'
            )}
          >
            <MapPin className="w-3.5 h-3.5" />
            {language === 'es' ? 'Comunitarios' : 'Community'}
          </button>
          <button
            onClick={() => setViewMode('school')}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-all',
              viewMode === 'school'
                ? 'bg-denver-navy text-white'
                : 'text-denver-gray-mid'
            )}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            {language === 'es' ? 'Escolares' : 'School'}
          </button>
        </div>
      </div>

      {/* ========== SCHOOL VIEW ========== */}
      {viewMode === 'school' && (
        <div className="px-4 py-4 space-y-6">
          {schoolByChild.map(({ child, programs: childPrograms }) => (
            <div key={child.id}>
              {/* Child + School header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-denver-gold/20 border-2 border-white flex items-center justify-center text-lg shadow-sm shrink-0">
                  {child.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-denver-navy">{child.name}</p>
                  <div className="flex items-center gap-1 text-xs text-denver-gray-mid">
                    <GraduationCap className="w-3 h-3" />
                    <span className="truncate">
                      {childPrograms[0]
                        ? (language === 'es' ? childPrograms[0].schoolEs : childPrograms[0].school)
                        : ''}
                    </span>
                  </div>
                </div>
                <Badge variant="default" className="text-[10px] bg-denver-sky/10 text-denver-sky shrink-0">
                  {childPrograms.length} {language === 'es' ? 'clases' : 'classes'}
                </Badge>
              </div>

              {/* School program cards */}
              <div className="space-y-2">
                {childPrograms.map((sp) => {
                  const categoryColor = getCategoryColor(sp.category);
                  const icon = getCategoryIcon(sp.category);

                  return (
                    <Card key={sp.id} className="hover:shadow-md transition-shadow">
                      <div className="p-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-denver-gray-soft/50 flex items-center justify-center text-base shrink-0">
                            {icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-medium text-denver-navy line-clamp-1">
                                {language === 'es' ? sp.nameEs : sp.name}
                              </p>
                              <Badge className={`${categoryColor} text-[10px] shrink-0`}>
                                {sp.category}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-denver-gray-mid mt-0.5">
                              {sp.instructor} · {sp.room}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-denver-gray-mid">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-2.5 h-2.5" />
                                {sp.schedule.days.map((d) => dayAbbreviations[d] || d).join(' ')} {sp.schedule.startTime}
                              </span>
                              <span className="flex items-center gap-0.5">
                                <Users className="w-2.5 h-2.5" />
                                {sp.spotsAvailable}/{sp.spotsTotal}
                              </span>
                              <span>
                                {sp.cost === 0
                                  ? (language === 'es' ? 'Gratis' : 'Free')
                                  : formatCurrency(sp.cost)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-[10px] text-denver-gray-mid text-center px-4">
            {language === 'es'
              ? 'Programas escolares proporcionados por DPS en asociacion con proveedores comunitarios.'
              : 'School-based programs provided by DPS in partnership with community providers.'}
          </p>
        </div>
      )}

      {/* ========== COMMUNITY VIEW ========== */}
      {viewMode === 'community' && (
        <>
          {/* AI Recommendation CTA */}
          <div className="px-4 py-3">
            <button
              onClick={() => setShowAiSheet(true)}
              className="w-full rounded-xl bg-gradient-to-r from-denver-purple to-denver-purple/80 p-4 text-left shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white">
                    {language === 'es' ? 'Buscar con IA' : 'AI Program Finder'}
                  </h3>
                  <p className="text-xs text-white/80 mt-0.5">
                    {language === 'es'
                      ? 'Describe lo que buscas — deportes, arte, STEM — y te recomendaremos programas con costos personalizados para tu familia'
                      : 'Describe what you need — sports, art, STEM — and get personalized program recommendations with your real out-of-pocket costs'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/60 shrink-0 mt-1" />
              </div>
            </button>
          </div>

          {/* Filter chips row */}
          <div className="px-4 py-3 bg-white border-b border-denver-gray-soft">
            <ProgramFilters
              filters={filters}
              onFiltersChange={setFilters}
              neighborhoods={neighborhoods}
            />
          </div>

          {/* Results count */}
          <div className="px-4 py-2">
            <p className="text-xs text-denver-gray-mid">
              {filteredPrograms.length} {t('explore.results')}
            </p>
          </div>

          {/* Program list */}
          <div className="px-4 pb-4 space-y-3">
            {filteredPrograms.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-denver-gray-mid">{t('explore.noResults')}</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({
                      age: null,
                      category: null,
                      day: null,
                      neighborhood: null,
                      hasSpots: false,
                    });
                  }}
                  className="text-sm text-denver-sky mt-2"
                >
                  {t('explore.clearFilters')}
                </button>
              </div>
            ) : (
              filteredPrograms.map((program) => (
                <ProgramCard key={program.id} program={program} lang={language} />
              ))
            )}
          </div>
        </>
      )}

      {/* AI Recommend Sheet */}
      <Sheet open={showAiSheet} onOpenChange={(open) => {
        setShowAiSheet(open);
        if (!open) {
          setAiSearched(false);
          setAiRecommendations([]);
          setAiSearching(false);
        }
      }}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-denver-purple" />
              {t('ai.title')}
            </SheetTitle>
            <SheetDescription>
              {language === 'es'
                ? 'Describe lo que buscas y te recomendaremos programas'
                : "Describe what you're looking for and we'll recommend programs"}
            </SheetDescription>
          </SheetHeader>
          <div className="px-6 py-4 space-y-4">
            <Textarea
              placeholder={t('ai.placeholder')}
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              rows={3}
            />
            <Button
              className="w-full bg-denver-purple hover:bg-denver-purple/90"
              onClick={() => handleAiSearch(aiQuery)}
              disabled={aiSearching || !aiQuery.trim()}
            >
              {aiSearching ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4 mr-2" />
              )}
              {aiSearching
                ? (language === 'es' ? 'Buscando...' : 'Searching...')
                : t('ai.find')}
            </Button>

            {/* AI Results */}
            {aiSearching && (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 text-denver-purple animate-spin mx-auto mb-2" />
                  <p className="text-sm text-denver-gray-mid">
                    {language === 'es'
                      ? 'Analizando programas para tu familia...'
                      : 'Analyzing programs for your family...'}
                  </p>
                </div>
              </div>
            )}

            {aiSearched && !aiSearching && aiRecommendations.length === 0 && (
              <div className="text-center py-6">
                <p className="text-sm text-denver-gray-mid">{t('ai.noResults')}</p>
              </div>
            )}

            {aiRecommendations.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs text-denver-gray-mid font-medium uppercase tracking-wide">
                  {language === 'es'
                    ? `${aiRecommendations.length} programas recomendados`
                    : `${aiRecommendations.length} recommended programs`}
                </p>
                {aiRecommendations.map((rec, idx) => (
                  <Card key={`${rec.program.id}-${rec.child.id}-${idx}`} className="overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-denver-navy truncate">
                            {language === 'es' ? rec.program.nameEs : rec.program.name}
                          </h4>
                          <p className="text-xs text-denver-gray-mid truncate">
                            {language === 'es'
                              ? (rec.program.providerEs || rec.program.provider)
                              : rec.program.provider}
                          </p>
                        </div>
                        <Badge variant="default" className="shrink-0 bg-denver-purple/10 text-denver-purple text-[10px]">
                          {rec.matchScore}% match
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-denver-gray-mid mb-2">
                        <span className="flex items-center gap-1">
                          {rec.child.avatar} {t('ai.recommended')} {rec.child.name}
                        </span>
                        <span className="text-denver-gray-soft">|</span>
                        <span>
                          {rec.program.schedule.days.join(', ')} {rec.program.schedule.startTime}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {rec.matchReasons.slice(0, 3).map((reason, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-0.5 text-[10px] text-denver-green bg-denver-green/10 px-1.5 py-0.5 rounded-full"
                          >
                            <CheckCircle className="w-2.5 h-2.5" />
                            {reason}
                          </span>
                        ))}
                      </div>

                      <div className="bg-denver-gray-soft/50 rounded-lg p-3 space-y-1.5">
                        <p className="text-[10px] text-denver-gray-mid font-medium uppercase tracking-wide">
                          {language === 'es' ? 'Desglose de fondos' : 'Funding Breakdown'}
                        </p>
                        {rec.fundingBreakdown.map((fb, i) => (
                          <div key={i} className="flex items-center justify-between text-xs">
                            <span className="text-denver-gray-mid">{fb.name}</span>
                            <span className="text-denver-green font-medium flex items-center gap-0.5">
                              <DollarSign className="w-3 h-3" />
                              {fb.amount.toFixed(0)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-denver-gray-soft pt-1.5 flex items-center justify-between text-xs">
                          <span className="font-medium text-denver-navy">
                            {t('ai.yourCost')}
                          </span>
                          <span className={`font-bold ${rec.outOfPocket === 0 ? 'text-denver-green' : 'text-denver-navy'}`}>
                            {rec.outOfPocket === 0
                              ? (language === 'es' ? 'Gratis' : 'FREE')
                              : `$${rec.outOfPocket.toFixed(0)}`}
                          </span>
                        </div>
                      </div>

                      <Link
                        to={`/program/${rec.program.id}`}
                        className="block mt-3 text-center text-xs font-medium text-denver-sky hover:text-denver-sky/80 transition-colors"
                        onClick={() => setShowAiSheet(false)}
                      >
                        {t('ai.viewProgram')} &rarr;
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick suggestions */}
            {!aiSearched && !aiSearching && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-denver-gray-mid font-medium uppercase tracking-wide">
                  {language === 'es' ? 'Sugerencias rapidas' : 'Quick suggestions'}
                </p>
                {[
                  language === 'es' ? 'Deportes despues de la escuela' : 'After-school sports',
                  language === 'es' ? 'Clases de arte para mi hija de 10 anos' : 'Art classes for my 10 year old',
                  language === 'es' ? 'Actividades STEM gratuitas' : 'Free STEM activities',
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleQuickSuggestion(suggestion)}
                    className="block w-full text-left px-3 py-2 text-sm rounded-lg bg-denver-gray-soft/50 hover:bg-denver-gray-soft transition-colors text-denver-navy"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
