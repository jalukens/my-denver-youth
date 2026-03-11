import { useState } from 'react';
import {
  MessageCircle,
  ChevronRight,
  CheckCircle,
  BarChart3,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';
import { family, programs } from '@/lib/mockData';

const emojiReactions = [
  { emoji: '😍', labelEn: 'Loved it', labelEs: 'Me encanto', value: 5 },
  { emoji: '😊', labelEn: 'Liked it', labelEs: 'Me gusto', value: 4 },
  { emoji: '😐', labelEn: 'It was ok', labelEs: 'Estuvo bien', value: 3 },
  { emoji: '😕', labelEn: 'Meh', labelEs: 'Regular', value: 2 },
  { emoji: '😢', labelEn: "Didn't like", labelEs: 'No me gusto', value: 1 },
];

// Mock pending check-ins (programs attended but not yet reviewed)
const pendingCheckins = [
  { programId: 'prog-009', childId: 'child-001', sessionDate: '2025-01-21', sessionLabel: 'Session 4' },
  { programId: 'prog-001', childId: 'child-002', sessionDate: '2025-01-21', sessionLabel: 'Session 6' },
  { programId: 'prog-007', childId: 'child-001', sessionDate: '2025-01-23', sessionLabel: 'Session 3' },
];

// Mock past feedback
const pastFeedback: {
  programId: string;
  childId: string;
  date: string;
  emoji: string;
  rating: number;
  comment?: string;
}[] = [
  { programId: 'prog-002', childId: 'child-001', date: '2025-01-20', emoji: '😍', rating: 5, comment: 'Built my first Python game today!' },
  { programId: 'prog-001', childId: 'child-002', date: '2025-01-16', emoji: '😊', rating: 4, comment: 'Scored a goal in practice' },
  { programId: 'prog-007', childId: 'child-001', date: '2025-01-16', emoji: '😍', rating: 5 },
  { programId: 'prog-006', childId: 'child-002', date: '2025-01-15', emoji: '😐', rating: 3, comment: 'Guitar is hard but I want to keep trying' },
  { programId: 'prog-002', childId: 'child-001', date: '2025-01-15', emoji: '😊', rating: 4 },
  { programId: 'prog-009', childId: 'child-001', date: '2025-01-14', emoji: '😊', rating: 4, comment: 'Resume workshop was useful' },
];

// Mock aggregated sentiment per program
const programSentiment: Record<string, { avg: number; total: number; trend: 'up' | 'down' | 'stable' }> = {
  'prog-001': { avg: 4.2, total: 48, trend: 'up' },
  'prog-002': { avg: 4.6, total: 32, trend: 'up' },
  'prog-006': { avg: 3.8, total: 24, trend: 'stable' },
  'prog-007': { avg: 4.5, total: 28, trend: 'up' },
  'prog-009': { avg: 4.1, total: 15, trend: 'up' },
};

export default function VoiceLoopPage() {
  const { language } = useI18n();
  const [selectedChild, setSelectedChild] = useState(family.children[0].id);
  const [activeCheckin, setActiveCheckin] = useState<string | null>(null);
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState<string[]>([]);

  const childPending = pendingCheckins.filter(
    (p) => p.childId === selectedChild && !submitted.includes(`${p.programId}-${p.sessionDate}`)
  );
  const childFeedback = pastFeedback.filter((f) => f.childId === selectedChild);

  const handleSubmit = (programId: string, sessionDate: string) => {
    setSubmitted((prev) => [...prev, `${programId}-${sessionDate}`]);
    setActiveCheckin(null);
    setSelectedEmoji(null);
    setComment('');
  };

  return (
    <div className="flex flex-col">
      <Header title={language === 'es' ? 'Voz Juvenil' : 'Youth Voice'} showBack />

      <div className="px-4 py-3 space-y-4">
        {/* Intro */}
        <div className="rounded-xl bg-gradient-to-r from-denver-purple to-denver-purple/80 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <MessageCircle className="w-4 h-4 text-white/80" />
            <p className="text-xs text-white/70 uppercase tracking-wider">
              {language === 'es' ? 'Tu Voz Importa' : 'Your Voice Matters'}
            </p>
          </div>
          <p className="text-sm text-white/90 leading-relaxed">
            {language === 'es'
              ? 'Despues de cada sesion, dinos como te fue. Tu opinion ayuda a mejorar los programas para todos los jovenes de Denver.'
              : 'After each session, tell us how it went. Your feedback helps improve programs for all Denver youth.'}
          </p>
          <p className="text-[10px] text-white/50 mt-2">
            {language === 'es'
              ? '60 segundos — elige un emoji y agrega un comentario opcional'
              : '60 seconds — pick an emoji and add an optional comment'}
          </p>
        </div>

        {/* Child selector */}
        <div className="flex gap-2">
          {family.children.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedChild(c.id);
                setActiveCheckin(null);
                setSelectedEmoji(null);
                setComment('');
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedChild === c.id
                  ? 'bg-denver-navy text-white shadow-sm'
                  : 'bg-denver-gray-soft text-denver-gray-mid hover:bg-denver-gray-soft'
              }`}
            >
              <span>{c.avatar}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Pending Check-ins */}
        {childPending.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
              {language === 'es'
                ? `${childPending.length} sesion${childPending.length !== 1 ? 'es' : ''} por evaluar`
                : `${childPending.length} session${childPending.length !== 1 ? 's' : ''} to review`}
            </h3>
            <div className="space-y-2">
              {childPending.map((checkin) => {
                const program = programs.find((p) => p.id === checkin.programId);
                if (!program) return null;
                const isActive = activeCheckin === `${checkin.programId}-${checkin.sessionDate}`;

                return (
                  <Card key={`${checkin.programId}-${checkin.sessionDate}`} className="overflow-hidden">
                    <button
                      className="w-full text-left p-3"
                      onClick={() => {
                        setActiveCheckin(isActive ? null : `${checkin.programId}-${checkin.sessionDate}`);
                        setSelectedEmoji(null);
                        setComment('');
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-denver-purple/10 flex items-center justify-center">
                            <MessageCircle className="w-4 h-4 text-denver-purple" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-denver-navy">
                              {language === 'es' ? program.nameEs : program.name}
                            </p>
                            <p className="text-[10px] text-denver-gray-mid">
                              {checkin.sessionLabel} · {new Date(checkin.sessionDate + 'T00:00:00').toLocaleDateString(
                                language === 'es' ? 'es-US' : 'en-US',
                                { month: 'short', day: 'numeric' }
                              )}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default" className="bg-denver-purple/10 text-denver-purple text-[10px]">
                          {language === 'es' ? 'Evaluar' : 'Review'}
                        </Badge>
                      </div>
                    </button>

                    {/* Expanded check-in form */}
                    {isActive && (
                      <div className="px-3 pb-3 space-y-3 border-t border-denver-gray-soft pt-3">
                        <p className="text-xs text-denver-gray-mid text-center">
                          {language === 'es' ? 'Como te fue?' : 'How was it?'}
                        </p>

                        {/* Emoji picker */}
                        <div className="flex justify-center gap-2">
                          {emojiReactions.map((reaction) => (
                            <button
                              key={reaction.value}
                              onClick={() => setSelectedEmoji(reaction.value)}
                              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                                selectedEmoji === reaction.value
                                  ? 'bg-denver-purple/10 scale-110 ring-2 ring-denver-purple/30'
                                  : 'hover:bg-denver-gray-soft/50'
                              }`}
                            >
                              <span className="text-2xl">{reaction.emoji}</span>
                              <span className="text-[9px] text-denver-gray-mid">
                                {language === 'es' ? reaction.labelEs : reaction.labelEn}
                              </span>
                            </button>
                          ))}
                        </div>

                        {/* Optional comment */}
                        {selectedEmoji !== null && (
                          <>
                            <Textarea
                              placeholder={language === 'es'
                                ? 'Algo mas que quieras compartir? (opcional)'
                                : 'Anything else you want to share? (optional)'}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              rows={2}
                              className="text-sm"
                            />
                            <Button
                              className="w-full bg-denver-purple hover:bg-denver-purple/90"
                              onClick={() => handleSubmit(checkin.programId, checkin.sessionDate)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {language === 'es' ? 'Enviar' : 'Submit'}
                            </Button>
                          </>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* All caught up */}
        {childPending.length === 0 && (
          <Card className="bg-denver-green/5 border-denver-green/20">
            <div className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-denver-green mx-auto mb-2" />
              <p className="text-sm font-medium text-denver-navy">
                {language === 'es' ? 'Todo al dia!' : 'All caught up!'}
              </p>
              <p className="text-xs text-denver-gray-mid mt-1">
                {language === 'es'
                  ? 'No hay sesiones pendientes por evaluar'
                  : 'No pending sessions to review'}
              </p>
            </div>
          </Card>
        )}

        {/* Sentiment Stats */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Sentimiento por Programa' : 'Program Sentiment'}
          </h3>
          <div className="space-y-2">
            {Object.entries(programSentiment).map(([progId, sentiment]) => {
              const program = programs.find((p) => p.id === progId);
              if (!program) return null;

              const emoji = sentiment.avg >= 4.5 ? '😍' : sentiment.avg >= 3.5 ? '😊' : sentiment.avg >= 2.5 ? '😐' : '😕';
              const barWidth = (sentiment.avg / 5) * 100;

              return (
                <Link key={progId} to={`/program/${progId}`}>
                  <Card className="hover:shadow-md transition-shadow">
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-sm font-medium text-denver-navy truncate flex-1 min-w-0">
                          {language === 'es' ? program.nameEs : program.name}
                        </p>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                          <span className="text-lg">{emoji}</span>
                          <span className="text-sm font-bold text-denver-navy">{sentiment.avg.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-denver-gray-soft rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-denver-purple to-denver-sky"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-denver-gray-mid shrink-0">
                          {sentiment.total} {language === 'es' ? 'voces' : 'voices'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Past Feedback */}
        <div>
          <h3 className="text-xs font-semibold text-denver-navy uppercase tracking-wide mb-2">
            {language === 'es' ? 'Historial de Opiniones' : 'Feedback History'}
          </h3>
          <Card>
            <div className="divide-y divide-denver-gray-soft">
              {childFeedback.map((fb, i) => {
                const program = programs.find((p) => p.id === fb.programId);
                return (
                  <div key={i} className="flex items-start gap-3 p-3">
                    <span className="text-xl shrink-0">{fb.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-denver-navy truncate">
                        {program ? (language === 'es' ? program.nameEs : program.name) : fb.programId}
                      </p>
                      {fb.comment && (
                        <p className="text-xs text-denver-gray-mid mt-0.5 italic">"{fb.comment}"</p>
                      )}
                      <p className="text-[10px] text-denver-gray-mid mt-0.5">
                        {new Date(fb.date + 'T00:00:00').toLocaleDateString(
                          language === 'es' ? 'es-US' : 'en-US',
                          { month: 'short', day: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Impact note */}
        <div className="flex items-start gap-2 bg-denver-amber/10 rounded-lg px-3 py-2">
          <Sparkles className="w-4 h-4 text-denver-gold shrink-0 mt-0.5" />
          <p className="text-[10px] text-denver-gray-mid leading-relaxed">
            {language === 'es'
              ? 'Tu opinion se comparte anonimamente con los proveedores de programas y alimenta el motor de recomendaciones de IA para mejorar las sugerencias futuras.'
              : 'Your feedback is shared anonymously with program providers and feeds the AI recommendation engine to improve future suggestions.'}
          </p>
        </div>
      </div>
    </div>
  );
}
