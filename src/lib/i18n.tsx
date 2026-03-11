import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Language = 'en' | 'es';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.calendar': 'Calendar',
    'nav.funding': 'Funding',
    'nav.profile': 'Profile',
    'nav.experiences': 'Experiences',

    // Home
    'home.greeting': 'Hello',
    'home.welcome': 'Welcome back',
    'home.familyCard': 'Family Card',
    'home.upcomingActivities': 'Upcoming Activities',
    'home.quickActions': 'Quick Actions',
    'home.findPrograms': 'Find Programs',
    'home.viewFunding': 'View Funding',
    'home.myChildren': 'My Children',
    'home.noActivities': 'No upcoming activities',
    'home.registered': 'Registered',
    'home.tabActivity': 'Activity',
    'home.tabMyCard': 'My Card',
    'home.tabNearMe': 'Near Me',
    'home.tabAlerts': 'Alerts',
    'home.tabProgress': 'Progress',

    // Explore
    'explore.title': 'Explore Programs',
    'explore.search': 'Search programs...',
    'explore.filters': 'Filters',
    'explore.categories': 'Categories',
    'explore.ageRange': 'Age Range',
    'explore.allCategories': 'All',
    'explore.results': 'programs found',
    'explore.noResults': 'No programs found',
    'explore.clearFilters': 'Clear Filters',
    'explore.sortBy': 'Sort by',
    'explore.sortRelevance': 'Relevance',
    'explore.sortPrice': 'Price',
    'explore.sortAvailability': 'Availability',

    // Program Detail
    'program.about': 'About',
    'program.schedule': 'Schedule',
    'program.location': 'Location',
    'program.cost': 'Cost',
    'program.ages': 'Ages',
    'program.spots': 'spots available',
    'program.register': 'Register Now',
    'program.provider': 'Provider',
    'program.directions': 'Get Directions',
    'program.addToCalendar': 'Add to Calendar',
    'program.fundingAvailable': 'Funding Available',
    'program.noFunding': 'No funding available',
    'program.yourCost': 'Your Cost',
    'program.covered': 'Covered',
    'program.full': 'Full',
    'program.almostFull': 'Almost Full',
    'program.available': 'Available',
    'program.waitlist': 'Join Waitlist',
    'program.eligibleChildren': 'Eligible Children',
    'program.selectChild': 'Select Child',

    // Registration
    'register.title': 'Register',
    'register.selectChild': 'Select Child',
    'register.fundingBreakdown': 'Funding Breakdown',
    'register.totalCost': 'Total Cost',
    'register.familyCost': 'Your Cost',
    'register.confirm': 'Confirm Registration',
    'register.success': 'Registration Confirmed!',
    'register.successMessage': 'has been registered for',
    'register.viewDetails': 'View Details',
    'register.backToExplore': 'Back to Explore',

    // Funding
    'funding.title': 'My Funding',
    'funding.available': 'Available',
    'funding.used': 'Used',
    'funding.total': 'Total',
    'funding.expires': 'Expires',
    'funding.eligibleFor': 'Eligible for',
    'funding.transactions': 'Recent Transactions',
    'funding.noTransactions': 'No transactions yet',
    'funding.totalAvailable': 'Total Available',
    'funding.learnMore': 'Learn More',

    // Calendar
    'calendar.title': 'Calendar',
    'calendar.today': 'Today',
    'calendar.noEvents': 'No events this day',
    'calendar.week': 'Week',
    'calendar.month': 'Month',

    // Profile
    'profile.title': 'Family Profile',
    'profile.familyInfo': 'Family Information',
    'profile.children': 'Children',
    'profile.address': 'Address',
    'profile.denverCard': 'My Denver Card',
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.help': 'Help & Support',
    'profile.logout': 'Log Out',
    'profile.editProfile': 'Edit Profile',

    // Check-In
    'checkin.title': 'Check In',
    'checkin.scan': 'Scan QR Code',
    'checkin.manual': 'Manual Check-In',
    'checkin.selectLocation': 'Select Location',
    'checkin.selectChild': 'Select Child',
    'checkin.selectType': 'Visit Type',
    'checkin.programSession': 'Program Session',
    'checkin.openUse': 'Open Use / Drop-In',
    'checkin.confirm': 'Confirm Check-In',
    'checkin.success': 'Checked In!',
    'checkin.recent': 'Recent Check-Ins',
    'checkin.noRecent': 'No recent check-ins',
    'checkin.nearbyLocations': 'Nearby Locations',

    // Experiences
    'experiences.title': 'Experiences',
    'experiences.subtitle': 'Free & discounted attractions with your My Denver Card',
    'experiences.freeSection': 'Free Admission',
    'experiences.discountedSection': 'Discounted Admission',
    'experiences.showCard': 'Show your My Denver Card at the entrance',

    // Alerts
    'alerts.registrationOpening': 'Registration opens in 2 weeks',
    'alerts.newPrograms': 'new programs available',
    'alerts.fundingExpiring': 'Funding expiring soon',

    // Progress
    'progress.title': 'Youth Progress',
    'progress.totalPrograms': 'Programs',
    'progress.totalHours': 'Hours',
    'progress.domains': 'Domains',
    'progress.dpsNote': 'Includes data shared through DPS partnership',

    // AI
    'ai.title': 'AI Program Finder',
    'ai.placeholder': "Describe what you're looking for...",
    'ai.find': 'Find Programs',
    'ai.recommended': 'Recommended for',
    'ai.yourCost': 'Your cost',
    'ai.viewProgram': 'View Program',
    'ai.listening': 'Listening...',
    'ai.noResults': 'No matching programs found. Try different keywords.',
    'ai.covered': 'Covered by funding',

    // Common
    'common.back': 'Back',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.retry': 'Try Again',
    'common.seeAll': 'See All',
    'common.free': 'Free',
    'common.perSession': 'per session',
    'common.years': 'years',
    'common.milesAway': 'miles away',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.explore': 'Explorar',
    'nav.calendar': 'Calendario',
    'nav.funding': 'Fondos',
    'nav.profile': 'Perfil',
    'nav.experiences': 'Experiencias',

    // Home
    'home.greeting': 'Hola',
    'home.welcome': 'Bienvenido de nuevo',
    'home.familyCard': 'Tarjeta Familiar',
    'home.upcomingActivities': 'Proximas Actividades',
    'home.quickActions': 'Acciones Rapidas',
    'home.findPrograms': 'Buscar Programas',
    'home.viewFunding': 'Ver Fondos',
    'home.myChildren': 'Mis Hijos',
    'home.noActivities': 'No hay actividades proximas',
    'home.registered': 'Registrado',
    'home.tabActivity': 'Actividad',
    'home.tabMyCard': 'Mi Tarjeta',
    'home.tabNearMe': 'Cerca de Mi',
    'home.tabAlerts': 'Alertas',
    'home.tabProgress': 'Progreso',

    // Explore
    'explore.title': 'Explorar Programas',
    'explore.search': 'Buscar programas...',
    'explore.filters': 'Filtros',
    'explore.categories': 'Categorias',
    'explore.ageRange': 'Rango de Edad',
    'explore.allCategories': 'Todos',
    'explore.results': 'programas encontrados',
    'explore.noResults': 'No se encontraron programas',
    'explore.clearFilters': 'Limpiar Filtros',
    'explore.sortBy': 'Ordenar por',
    'explore.sortRelevance': 'Relevancia',
    'explore.sortPrice': 'Precio',
    'explore.sortAvailability': 'Disponibilidad',

    // Program Detail
    'program.about': 'Acerca de',
    'program.schedule': 'Horario',
    'program.location': 'Ubicacion',
    'program.cost': 'Costo',
    'program.ages': 'Edades',
    'program.spots': 'lugares disponibles',
    'program.register': 'Registrarse Ahora',
    'program.provider': 'Proveedor',
    'program.directions': 'Obtener Direcciones',
    'program.addToCalendar': 'Agregar al Calendario',
    'program.fundingAvailable': 'Fondos Disponibles',
    'program.noFunding': 'No hay fondos disponibles',
    'program.yourCost': 'Tu Costo',
    'program.covered': 'Cubierto',
    'program.full': 'Lleno',
    'program.almostFull': 'Casi Lleno',
    'program.available': 'Disponible',
    'program.waitlist': 'Unirse a la Lista de Espera',
    'program.eligibleChildren': 'Hijos Elegibles',
    'program.selectChild': 'Seleccionar Hijo',

    // Registration
    'register.title': 'Registrarse',
    'register.selectChild': 'Seleccionar Hijo',
    'register.fundingBreakdown': 'Desglose de Fondos',
    'register.totalCost': 'Costo Total',
    'register.familyCost': 'Tu Costo',
    'register.confirm': 'Confirmar Registro',
    'register.success': 'Registro Confirmado!',
    'register.successMessage': 'ha sido registrado para',
    'register.viewDetails': 'Ver Detalles',
    'register.backToExplore': 'Volver a Explorar',

    // Funding
    'funding.title': 'Mis Fondos',
    'funding.available': 'Disponible',
    'funding.used': 'Usado',
    'funding.total': 'Total',
    'funding.expires': 'Expira',
    'funding.eligibleFor': 'Elegible para',
    'funding.transactions': 'Transacciones Recientes',
    'funding.noTransactions': 'No hay transacciones aun',
    'funding.totalAvailable': 'Total Disponible',
    'funding.learnMore': 'Mas Informacion',

    // Calendar
    'calendar.title': 'Calendario',
    'calendar.today': 'Hoy',
    'calendar.noEvents': 'No hay eventos este dia',
    'calendar.week': 'Semana',
    'calendar.month': 'Mes',

    // Profile
    'profile.title': 'Perfil Familiar',
    'profile.familyInfo': 'Informacion Familiar',
    'profile.children': 'Hijos',
    'profile.address': 'Direccion',
    'profile.denverCard': 'Mi Tarjeta Denver',
    'profile.settings': 'Configuracion',
    'profile.language': 'Idioma',
    'profile.notifications': 'Notificaciones',
    'profile.help': 'Ayuda y Soporte',
    'profile.logout': 'Cerrar Sesion',
    'profile.editProfile': 'Editar Perfil',

    // Check-In
    'checkin.title': 'Registrarse',
    'checkin.scan': 'Escanear Codigo QR',
    'checkin.manual': 'Registro Manual',
    'checkin.selectLocation': 'Seleccionar Ubicacion',
    'checkin.selectChild': 'Seleccionar Hijo',
    'checkin.selectType': 'Tipo de Visita',
    'checkin.programSession': 'Sesion de Programa',
    'checkin.openUse': 'Uso Abierto / Sin Cita',
    'checkin.confirm': 'Confirmar Registro',
    'checkin.success': 'Registrado!',
    'checkin.recent': 'Registros Recientes',
    'checkin.noRecent': 'No hay registros recientes',
    'checkin.nearbyLocations': 'Ubicaciones Cercanas',

    // Experiences
    'experiences.title': 'Experiencias',
    'experiences.subtitle': 'Atracciones gratuitas y con descuento con tu Tarjeta Mi Denver',
    'experiences.freeSection': 'Admision Gratuita',
    'experiences.discountedSection': 'Admision con Descuento',
    'experiences.showCard': 'Muestra tu Tarjeta Mi Denver en la entrada',

    // Alerts
    'alerts.registrationOpening': 'La inscripcion abre en 2 semanas',
    'alerts.newPrograms': 'nuevos programas disponibles',
    'alerts.fundingExpiring': 'Fondos por vencer',

    // Progress
    'progress.title': 'Progreso Juvenil',
    'progress.totalPrograms': 'Programas',
    'progress.totalHours': 'Horas',
    'progress.domains': 'Dominios',
    'progress.dpsNote': 'Incluye datos compartidos a traves de la asociacion con DPS',

    // AI
    'ai.title': 'Buscador de Programas IA',
    'ai.placeholder': 'Describe lo que buscas...',
    'ai.find': 'Buscar Programas',
    'ai.recommended': 'Recomendado para',
    'ai.yourCost': 'Tu costo',
    'ai.viewProgram': 'Ver Programa',
    'ai.listening': 'Escuchando...',
    'ai.noResults': 'No se encontraron programas. Intenta otras palabras.',
    'ai.covered': 'Cubierto por fondos',

    // Common
    'common.back': 'Atras',
    'common.close': 'Cerrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.loading': 'Cargando...',
    'common.error': 'Algo salio mal',
    'common.retry': 'Intentar de Nuevo',
    'common.seeAll': 'Ver Todo',
    'common.free': 'Gratis',
    'common.perSession': 'por sesion',
    'common.years': 'anos',
    'common.milesAway': 'millas',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Alias for convenience
export const LanguageProvider = I18nProvider;

// Hook alias used by LanguageToggle component
export function useLanguage() {
  const { language, setLanguage, t } = useI18n();
  return {
    lang: language,
    toggleLang: () => setLanguage(language === 'en' ? 'es' : 'en'),
    setLang: setLanguage,
    t,
  };
}

export type { Language };
