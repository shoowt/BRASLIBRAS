import React from 'react';
import { BookOpen, GraduationCap, HelpCircle, X, Search, CheckCircle } from 'lucide-react';
import { DICTIONARY_ITEMS } from '../data/mockData';

interface InfoModalProps {
  type: 'dictionary' | 'learn' | 'help' | null;
  onClose: () => void;
  onSelectSignToTranslate?: (term: string, phrase: string) => void;
}

export const InfoModals: React.FC<InfoModalProps> = ({
  type,
  onClose,
  onSelectSignToTranslate,
}) => {
  const [search, setSearch] = React.useState('');

  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 border border-slate-200 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {type === 'dictionary' && (
              <>
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Dicionário de Libras</h3>
                  <p className="text-xs text-slate-500">Termos e descrições dos principais sinais</p>
                </div>
              </>
            )}
            {type === 'learn' && (
              <>
                <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Aprender Libras</h3>
                  <p className="text-xs text-slate-500">Dicas e práticas essenciais para comunicação</p>
                </div>
              </>
            )}
            {type === 'help' && (
              <>
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800">Central de Ajuda</h3>
                  <p className="text-xs text-slate-500">Como utilizar o protótipo do BRASLIBRAS</p>
                </div>
              </>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {type === 'dictionary' && (
            <div>
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Pesquisar termo em Libras..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                {DICTIONARY_ITEMS.filter((item) =>
                  item.term.toLowerCase().includes(search.toLowerCase()) ||
                  item.desc.toLowerCase().includes(search.toLowerCase())
                ).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50/60 hover:border-blue-200 transition-colors flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{item.term}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/70 text-blue-700 font-medium">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                    {onSelectSignToTranslate && (
                      <button
                        onClick={() => {
                          onSelectSignToTranslate(item.term, item.term + '!');
                          onClose();
                        }}
                        className="shrink-0 text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline pt-1"
                      >
                        Testar Sinal
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'learn' && (
            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-800">
                <p className="font-semibold mb-1">Dica de Enquadramento:</p>
                Mantenha as mãos e o rosto centralizados na câmera com boa iluminação frontal para obter mais precisão na detecção dos pontos de articulação (landmarks).
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 text-sm">Os 5 Parâmetros da Libras:</h4>
                <ol className="list-decimal pl-4 space-y-1.5">
                  <li><strong>Configuração de Mão (CM):</strong> A forma que as mãos tomam ao realizar o sinal.</li>
                  <li><strong>Ponto de Articulação (PA):</strong> O local do corpo ou no espaço onde o sinal é feito.</li>
                  <li><strong>Movimento (M):</strong> A trajetória executada pelas mãos (linear, circular, etc).</li>
                  <li><strong>Orientação (O):</strong> A direção para onde a palma da mão está voltada.</li>
                  <li><strong>Expressão Facial/Corporal:</strong> Dá entonação gramatical (afirmativa, interrogativa, exclamação).</li>
                </ol>
              </div>
            </div>
          )}

          {type === 'help' && (
            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>Este protótipo do <strong>BRASLIBRAS</strong> reproduz a experiência completa do sistema:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Login e Cadastro:</strong> Permite autenticar ou registrar novas contas com persistência local.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Simulação de Libras:</strong> Clique nos botões de sinais rápidos para testar a resposta imediata da interface.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>TTS (Text-to-Speech):</strong> Clique em <em>Gravar Active</em> para ouvir a frase traduzida com sintetizador de áudio real.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Histórico:</strong> Selecione qualquer tradução passada na barra lateral para recarregar o texto instantaneamente.</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
