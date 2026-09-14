import { useState } from 'react';
import type { User, TranslationHistoryItem, LibrasSignSample } from './types';
import { INITIAL_HISTORY, SAMPLE_SIGNS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { AuthCard } from './components/AuthCard';
import { HistorySidebar } from './components/HistorySidebar';
import { VideoTranslator } from './components/VideoTranslator';
import { TranslationOutput } from './components/TranslationOutput';
import { TextToLibrasView } from './components/TextToLibrasView';
import { InfoModals } from './components/InfoModals';
import { CheckCircle2, Video, ArrowRightLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  // Para apresentação em aula: sempre inicia na tela de Login/Cadastro!
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mode state: Câmera -> Texto | Texto -> Libras
  const [currentMode, setCurrentMode] = useState<'camera_to_text' | 'text_to_libras'>('camera_to_text');

  // Retractable sidebar state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // History state
  const [history, setHistory] = useState<TranslationHistoryItem[]>(INITIAL_HISTORY);

  // Active translation state matching the reference photo
  const [activeHistoryId, setActiveHistoryId] = useState<string>('2');
  const [currentText, setCurrentText] = useState<string>(
    'Olá! Bom Dia! Como posso ajudar você hoje?'
  );
  const [videoConfidence, setVideoConfidence] = useState<number>(55);
  const [textConfidence, setTextConfidence] = useState<number>(45);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Modals state
  const [activeModal, setActiveModal] = useState<'dictionary' | 'learn' | 'help' | null>(null);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Flow: Handle Login -> Transitions to Main Dashboard
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    showToast(`Bem-vinda, ${user.name}!`);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Flow: Handle Logout -> Transitions back to Login Screen
  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Sessão encerrada com sucesso.');
  };

  // Select item from history
  const handleSelectHistoryItem = (item: TranslationHistoryItem) => {
    setActiveHistoryId(item.id);
    setCurrentText(item.text);
    setVideoConfidence(item.confidence);
    setTextConfidence(Math.max(40, item.confidence - 10));
    showToast(`Carregado: ${item.title}`);
  };

  // Save current translation to history
  const handleSaveCurrentToHistory = () => {
    if (!currentText.trim()) return;

    const newItem: TranslationHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      timeDisplay: 'Agora mesmo',
      title: currentText.slice(0, 24) + (currentText.length > 24 ? '...' : ''),
      text: currentText,
      confidence: Math.round(Math.random() * 10 + 88),
    };

    setHistory([newItem, ...history]);
    setActiveHistoryId(newItem.id);
    showToast('Tradução salva no histórico!');
  };

  // Clear history
  const handleClearHistory = () => {
    if (window.confirm('Deseja limpar todo o histórico de traduções?')) {
      setHistory([]);
      showToast('Histórico limpo com sucesso.');
    }
  };

  // Trigger simulated translation / signal again
  const handleTriggerTranslation = () => {
    setIsTranslating(true);
    showToast('Interpretando sinais de Libras...');

    setTimeout(() => {
      const randomSample =
        SAMPLE_SIGNS[Math.floor(Math.random() * SAMPLE_SIGNS.length)];
      setCurrentText(randomSample.portugueseText);
      const newConf = Math.round(Math.random() * 10 + 88);
      setVideoConfidence(newConf);
      setTextConfidence(Math.max(42, newConf - 10));
      setIsTranslating(false);

      showToast(`Interpretado: "${randomSample.title}" (${newConf}%)`);
    }, 1000);
  };

  // Select sample sign
  const handleSelectSample = (sample: LibrasSignSample) => {
    setIsTranslating(true);
    setTimeout(() => {
      setCurrentText(sample.portugueseText);
      setVideoConfidence(sample.confidence);
      setTextConfidence(Math.max(42, sample.confidence - 10));
      setIsTranslating(false);
      showToast(`Sinal: ${sample.title}`);
    }, 400);
  };

  // File upload simulation
  const handleFileUpload = (file: File) => {
    setIsTranslating(true);
    showToast(`Processando vídeo "${file.name}"...`);

    setTimeout(() => {
      setCurrentText('Vídeo interpretado: "Sejam todos bem-vindos ao BRASLIBRAS!"');
      setVideoConfidence(98);
      setTextConfidence(94);
      setIsTranslating(false);
      showToast('Interpretação concluída!');
    }, 1300);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex flex-col font-sans selection:bg-[#356294] selection:text-white">
      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-slate-700 animate-slideDown">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* CONDITIONAL FLOW: Se não logado -> Inicia DIRETO na tela de Login/Cadastro */}
      {!currentUser ? (
        <div className="min-h-screen flex-1 flex flex-col justify-center items-center p-4 sm:p-6 bg-gradient-to-b from-[#f8fafc] via-[#f1f4f8] to-[#e2e8f0] relative overflow-hidden animate-fadeIn">
          {/* Fundo suave e elegante */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl pointer-events-none" />

          {/* Cartão de Login / Cadastro centralizado */}
          <div className="w-full flex flex-col items-center relative z-10">
            <AuthCard onLogin={handleLogin} />

            <p className="mt-7 text-xs text-slate-400 text-center font-medium">
              BRASLIBRAS &bull; Tradução e Acessibilidade em Tempo Real
            </p>
          </div>
        </div>
      ) : (
        /* Se logado -> Exibe o Main Translation Dashboard com layout amplo e conteúdo central estendido */
        <div className="min-h-screen flex-1 flex flex-col bg-[#f0f2f5] animate-fadeIn">
          {/* Top Navigation Bar */}
          <Navbar
            user={currentUser}
            onLogout={handleLogout}
            onOpenDictionary={() => setActiveModal('dictionary')}
            onOpenLearn={() => setActiveModal('learn')}
            onOpenHelp={() => setActiveModal('help')}
          />

          {/* Mode Switcher Bar (Bidirecional) */}
          <div className="w-full px-4 sm:px-6 lg:px-8 pt-3 pb-1 flex items-center justify-between flex-wrap gap-2 shrink-0">
            <div className="flex items-center gap-1.5 p-1 bg-white border border-slate-200/90 rounded-xl shadow-2xs">
              <button
                type="button"
                onClick={() => setCurrentMode('camera_to_text')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentMode === 'camera_to_text'
                    ? 'bg-[#2d588f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Câmera &rarr; Texto</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentMode('text_to_libras')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  currentMode === 'text_to_libras'
                    ? 'bg-[#2d588f] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
                <span>Texto &rarr; Libras (Avatar/Vídeo)</span>
              </button>
            </div>

            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                {currentMode === 'camera_to_text' && 'Tradução Contínua Ativa'}
                {currentMode === 'text_to_libras' && 'Síntese Bidirecional em Libras'}
              </span>
            </div>
          </div>

          {/* Main Dashboard Area: Preenche a tela inteira */}
          <main className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex-1 flex flex-col min-h-0">
            {currentMode === 'text_to_libras' ? (
              <TextToLibrasView onBackToCamera={() => setCurrentMode('camera_to_text')} />
            ) : (
              <div className="flex flex-col lg:flex-row gap-4 xl:gap-5 items-stretch flex-1 w-full min-h-0">
                {/* Coluna 1 (Esquerda): Histórico de Traduções (Retrátil) */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isSidebarCollapsed
                      ? 'w-14 shrink-0'
                      : 'w-full lg:w-[270px] xl:w-[290px] shrink-0'
                  } flex flex-col`}
                >
                  <HistorySidebar
                    history={history}
                    activeId={activeHistoryId}
                    onSelect={handleSelectHistoryItem}
                    onClear={handleClearHistory}
                    onSaveCurrent={handleSaveCurrentToHistory}
                    isCollapsed={isSidebarCollapsed}
                    onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  />
                </div>

                {/* Coluna 2 (Centro): Video Translator (Expande proporcionalmente quando a sidebar recolhe) */}
                <div className="flex-1 min-w-0 flex flex-col transition-all duration-300">
                  <VideoTranslator
                    confidence={videoConfidence}
                    isTranslating={isTranslating}
                    onSelectSample={handleSelectSample}
                    onTriggerTranslation={handleTriggerTranslation}
                  />
                </div>

                {/* Coluna 3 (Direita): Texto Traduzido & TTS & Dúvida da IA */}
                <div className="w-full lg:w-[340px] xl:w-[370px] shrink-0 flex flex-col">
                  <TranslationOutput
                    text={currentText}
                    confidence={textConfidence}
                    onTextChange={setCurrentText}
                    onSignalAgain={handleTriggerTranslation}
                    onFileUpload={handleFileUpload}
                  />
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* Auxiliary Modals (Dicionário, Aprender, Ajuda) */}
      <InfoModals
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onSelectSignToTranslate={(term, phrase) => {
          setCurrentText(phrase);
          setVideoConfidence(95);
          setTextConfidence(90);
          showToast(`Sinal selecionado: "${term}"`);
        }}
      />
    </div>
  );
}

export default App;
