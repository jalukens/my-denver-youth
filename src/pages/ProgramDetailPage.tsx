import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Clock,
  Calendar,
  Users,
  DollarSign,
  Tag,
  ExternalLink,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useI18n } from '@/lib/i18n';
import {
  programs,
  family,
  fundingAccounts,
  categoryLabels,
  dayLabels,
} from '@/lib/mockData';
import {
  formatCurrency,
  getCategoryIcon,
  getCategoryAccentColor,
  getCategoryColor,
  getAvailabilityStatus,
  getEligibleFunding,
  isChildEligible,
  formatDate,
  generateCalendarUrl,
} from '@/lib/utils';

export default function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, language } = useI18n();

  const program = programs.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="flex flex-col">
        <div className="sticky top-0 z-40 bg-white px-4 py-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="px-4 py-8 text-center">
          <p className="text-sm text-denver-gray-mid">
            {language === 'es' ? 'Programa no encontrado' : 'Program not found'}
          </p>
        </div>
      </div>
    );
  }

  const accentColor = getCategoryAccentColor(program.category);
  const categoryColor = getCategoryColor(program.category);
  const availability = getAvailabilityStatus(program.spotsAvailable);
  const eligibleFunding = getEligibleFunding(program, fundingAccounts);
  const eligibleChildren = family.children.filter((child) =>
    isChildEligible(child, program)
  );

  const totalFundingAvailable = eligibleFunding.reduce(
    (sum, f) => sum + f.balance,
    0
  );
  const coveredCost = Math.min(totalFundingAvailable, program.cost);
  const familyCost = program.cost - coveredCost;
  const isFull = program.spotsAvailable === 0;

  const programName = language === 'es' ? program.nameEs : program.name;
  const providerName = language === 'es'
    ? (program.providerEs || program.provider)
    : program.provider;

  const calendarUrl = generateCalendarUrl(
    program.name,
    program.schedule.startDate,
    program.schedule.startTime,
    program.schedule.endTime,
    program.location.address
  );

  const handleRegister = (childId?: string) => {
    const url = childId
      ? `/register/${program.id}?child=${childId}`
      : `/register/${program.id}`;
    navigate(url);
  };

  return (
    <div className="flex flex-col">
      {/* Hero section */}
      <div
        className="relative pt-12 pb-8 px-4"
        style={{
          background: `linear-gradient(135deg, ${accentColor}30, ${accentColor}10)`,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm"
        >
          <ChevronLeft className="w-5 h-5 text-denver-navy" />
        </button>

        <div className="text-center mt-4">
          <div className="text-5xl mb-3">{getCategoryIcon(program.category)}</div>
          <h1 className="text-xl font-heading font-bold text-denver-navy">
            {programName}
          </h1>
          <p className="text-sm text-denver-gray-mid mt-1">{providerName}</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <Badge className={categoryColor}>
              {categoryLabels[program.category]?.[language] || program.category}
            </Badge>
            <span className={`text-xs font-medium ${availability.color}`}>
              {language === 'es' ? availability.labelEs : availability.label}
              {program.spotsAvailable > 0 &&
                ` (${program.spotsAvailable} ${t('program.spots')})`}
            </span>
          </div>
        </div>
      </div>

      {/* Cost display */}
      <div className="px-4 -mt-4 relative z-10">
        <Card className="shadow-md">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-denver-gray-mid">{t('program.cost')}</p>
                <p className="text-lg font-heading font-bold text-denver-navy">
                  {formatCurrency(program.cost)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-denver-gray-mid">{t('program.yourCost')}</p>
                <p
                  className={`text-lg font-heading font-bold ${
                    familyCost === 0 ? 'text-denver-green' : 'text-denver-navy'
                  }`}
                >
                  {familyCost === 0
                    ? (language === 'es' ? 'Gratis' : 'Free')
                    : formatCurrency(familyCost)}
                </p>
              </div>
            </div>
            {eligibleFunding.length > 0 && (
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-xs text-denver-gray-mid">
                  {t('program.covered')}:
                </span>
                {eligibleFunding.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center gap-1"
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: f.color }}
                    />
                    <span className="text-[10px] text-denver-gray-mid">
                      {language === 'es' ? f.nameEs : f.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Details sections */}
      <div className="px-4 py-4 space-y-4">
        {/* Schedule */}
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-denver-navy" />
              <h3 className="text-sm font-heading font-semibold text-denver-navy">
                {t('program.schedule')}
              </h3>
            </div>
            <div className="space-y-2 text-sm text-denver-gray-mid">
              <div className="flex items-center gap-2">
                <span className="text-denver-gray-mid w-16 shrink-0">
                  {language === 'es' ? 'Dias' : 'Days'}
                </span>
                <span>
                  {program.schedule.days
                    .map((d) => dayLabels[d]?.[language] || d)
                    .join(', ')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-denver-gray-mid w-16 shrink-0">
                  {language === 'es' ? 'Hora' : 'Time'}
                </span>
                <span>
                  {program.schedule.startTime} - {program.schedule.endTime}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-denver-gray-mid w-16 shrink-0">
                  {language === 'es' ? 'Duracion' : 'Length'}
                </span>
                <span>{program.schedule.sessionLength}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-denver-gray-mid w-16 shrink-0">
                  {language === 'es' ? 'Fechas' : 'Dates'}
                </span>
                <span>
                  {formatDate(program.schedule.startDate, language)} -{' '}
                  {formatDate(program.schedule.endDate, language)}
                </span>
              </div>
            </div>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-denver-sky font-medium mt-3"
            >
              <ExternalLink className="w-3 h-3" />
              {t('program.addToCalendar')}
            </a>
          </div>
        </Card>

        {/* Location */}
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-denver-navy" />
              <h3 className="text-sm font-heading font-semibold text-denver-navy">
                {t('program.location')}
              </h3>
            </div>
            <div className="space-y-1 text-sm text-denver-gray-mid">
              <p className="font-medium text-denver-navy">{program.location.name}</p>
              <p>{program.location.address}</p>
              <p className="text-xs text-denver-gray-mid">{program.location.neighborhood}</p>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                program.location.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-denver-sky font-medium mt-3"
            >
              <ExternalLink className="w-3 h-3" />
              {t('program.directions')}
            </a>
          </div>
        </Card>

        {/* Ages */}
        <Card>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-denver-navy" />
              <h3 className="text-sm font-heading font-semibold text-denver-navy">
                {t('program.ages')}
              </h3>
            </div>
            <p className="text-sm text-denver-gray-mid">
              {program.ageRange.min} - {program.ageRange.max} {t('common.years')}
            </p>
          </div>
        </Card>

        {/* Description */}
        <Card>
          <div className="p-4">
            <h3 className="text-sm font-heading font-semibold text-denver-navy mb-2">
              {t('program.about')}
            </h3>
            <p className="text-sm text-denver-gray-mid leading-relaxed">
              {language === 'es' ? program.descriptionEs : program.description}
            </p>
          </div>
        </Card>

        {/* Tags */}
        {program.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {program.tags.map((tag) => (
              <Badge key={tag} variant="default" className="text-xs">
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Accepted Funding */}
        {eligibleFunding.length > 0 && (
          <Card>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-denver-navy" />
                <h3 className="text-sm font-heading font-semibold text-denver-navy">
                  {t('program.fundingAvailable')}
                </h3>
              </div>
              <div className="space-y-2">
                {eligibleFunding.map((fund) => (
                  <div key={fund.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: fund.color }}
                      />
                      <span className="text-sm text-denver-navy">
                        {language === 'es' ? fund.nameEs : fund.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-denver-navy">
                      {formatCurrency(fund.balance)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        <Separator />

        {/* Eligible Children + Register */}
        <div>
          <h3 className="text-sm font-heading font-semibold text-denver-navy mb-3">
            {t('program.eligibleChildren')}
          </h3>
          {eligibleChildren.length === 0 ? (
            <p className="text-sm text-denver-gray-mid">
              {language === 'es'
                ? 'Ningun hijo es elegible para este programa por edad.'
                : 'No children are eligible for this program by age.'}
            </p>
          ) : (
            <div className="space-y-2">
              {eligibleChildren.map((child) => (
                <Card key={child.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-denver-gold/20 flex items-center justify-center text-lg">
                        {child.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-denver-navy">{child.name}</p>
                        <p className="text-xs text-denver-gray-mid">
                          {language === 'es' ? `${child.age} anos` : `Age ${child.age}`}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      disabled={isFull}
                      onClick={() => handleRegister(child.id)}
                    >
                      {isFull ? t('program.waitlist') : t('program.register')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Full-width register button */}
        <Button
          size="lg"
          className="w-full"
          disabled={isFull && eligibleChildren.length === 0}
          onClick={() => handleRegister()}
        >
          {isFull ? t('program.waitlist') : t('program.register')}
        </Button>
      </div>
    </div>
  );
}
