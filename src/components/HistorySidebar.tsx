import React, { useState } from 'react';
import { Clock, Plus, Search, Trash2, CheckCircle2, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import type { TranslationHistoryItem } from '../types';

interface HistorySidebarProps {
  history: TranslationHistoryItem[];
  activeId?: string;
  onSelect: (item: TranslationHistoryItem) => void;
  onClear: () => void;
  onSaveCurrent: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  history,
  activeId,
  onSelect,
  onClear,
  onSaveCurrent,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = history.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.timeDisplay.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isCollapsed) {
    return (
      <aside className="w-14 h-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col items-center py-4 justify-between select-none">
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Expandir Histórico de Traduções"
            className="w-9 h-9 rounded-xl bg-[#2d588f] hover:bg-[#1e3a8a] text-white flex items-center justify-center shadow-sm transition-all cursor-pointer"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onSaveCurrent}
            title="Salvar Tradução Atual"
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center gap-2 my-auto">
          <div className="relative">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="absolute -top-2 -right-2 bg-[#2d588f] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {history.length}
            </span>
          </div>
          <span
            style={{ writingMode: 'vertical-rl' }}
            className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase rotate-180 select-none py-2"
          >
            Histórico
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleCollapse}
          className="text-[10px] text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
        >
          « Abrir
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col justify-between min-w-0">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Dark Blue Header Banner matching reference image: #2D588F */}
        <div className="bg-[#2d588f] px-4 sm:px-5 py-4 text-white flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <h2 className="font-bold text-[13px] sm:text-sm tracking-tight text-white select-none pointer-events-none truncate">
              Histórico de Traduções
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onSaveCurrent();
              }}
              onMouseDown={(e) => e.preventDefault()}
              title="Salvar tradução atual"
              className="p-1 rounded-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer text-white/90 hover:text-white select-none touch-manipulation focus:outline-none"
            >
              <Plus className="w-4 h-4 pointer-events-none" />
            </button>

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                title="Recolher histórico (expandir vídeo)"
                className="p-1 rounded-md hover:bg-white/20 active:scale-95 transition-all cursor-pointer text-white/90 hover:text-white select-none touch-manipulation focus:outline-none"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Subheader: "Recent" in light gray */}
        <div className="px-5 pt-3.5 pb-2 flex items-center justify-between border-b border-slate-100 bg-white shrink-0">
          <span className="text-[11px] font-semibold text-slate-400">
            Recent
          </span>
          {history.length > 0 && (
            <button
              onClick={onClear}
              className="text-[10px] text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
              title="Limpar histórico"
            >
              <Trash2 className="w-3 h-3" />
              <span>Limpar</span>
            </button>
          )}
        </div>

        {/* Search */}
        <div className="px-3.5 py-2 bg-slate-50/70 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-2.5 py-1 text-xs bg-white border border-slate-200 rounded-md focus:outline-none focus:border-[#2d588f] text-slate-700"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 flex flex-col items-center gap-2">
              <Clock className="w-5 h-5 text-slate-300" />
              <span>Nenhum registro.</span>
            </div>
          ) : (
            filtered.map((item) => {
              const isSelected = item.id === activeId;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className={`w-full text-left px-3.5 py-3 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-200 text-slate-900 shadow-2xs'
                      : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px] font-normal text-slate-400">
                      {item.timeDisplay}
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2d588f] shrink-0" />
                    )}
                  </div>

                  <div className="text-[13px] font-semibold text-slate-800 line-clamp-1">
                    {item.title}
                  </div>

                  <p className="text-[11.5px] text-slate-500 line-clamp-1 font-normal mt-0.5">
                    {item.text}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 text-center font-medium shrink-0">
        {history.length} {history.length === 1 ? 'registro salvo' : 'registros salvos'}
      </div>
    </aside>
  );
};
