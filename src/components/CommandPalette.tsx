import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, FileText, Download, Mail, ArrowRight, Cpu, BookOpen, Layers, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { PROJECTS_DATA, RESEARCH_PAPERS, HARDWARE_INVENTORY, PROFILE_INFO } from '../data/profileData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onOpenProjectModal: (projectId: string) => void;
  onDownloadVCard: () => void;
}

interface PaletteItem {
  id: string;
  category: 'Actions' | 'Projects' | 'Research' | 'Hardware' | 'Navigation';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onOpenProjectModal,
  onDownloadVCard,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global shortcut listener: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const allItems: PaletteItem[] = useMemo(() => {
    const items: PaletteItem[] = [
      // Primary Actions
      {
        id: 'action-resume',
        category: 'Actions',
        title: 'Open Curriculum Vitae / Resume',
        subtitle: 'View ATS formatted resume & download PDF',
        icon: <FileText className="w-4 h-4 text-amber-400" />,
        action: () => {
          onClose();
          onOpenResumeModal();
        },
      },
      {
        id: 'action-vcard',
        category: 'Actions',
        title: 'Save Contact (.vcf vCard)',
        subtitle: 'Sync into Apple Contacts, Google Contacts, Outlook',
        icon: <Download className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onClose();
          onDownloadVCard();
        },
      },
      {
        id: 'action-email',
        category: 'Actions',
        title: 'Copy Email Address',
        subtitle: PROFILE_INFO.email,
        icon: <Mail className="w-4 h-4 text-sky-400" />,
        action: () => {
          navigator.clipboard.writeText(PROFILE_INFO.email);
          onClose();
        },
      },
      {
        id: 'action-github',
        category: 'Actions',
        title: 'Visit GitHub Profile',
        subtitle: '@Harihara-Subramanian-V',
        icon: <GithubIcon className="w-4 h-4 text-zinc-300" />,
        action: () => {
          window.open(PROFILE_INFO.github, '_blank');
          onClose();
        },
      },
      {
        id: 'action-linkedin',
        category: 'Actions',
        title: 'Visit LinkedIn Profile',
        subtitle: 'in/harihara-subramanian-v',
        icon: <LinkedinIcon className="w-4 h-4 text-blue-400" />,
        action: () => {
          window.open(PROFILE_INFO.linkedin, '_blank');
          onClose();
        },
      },
    ];

    // Add Projects
    PROJECTS_DATA.forEach((p) => {
      items.push({
        id: `proj-${p.id}`,
        category: 'Projects',
        title: p.title,
        subtitle: p.subtitle,
        icon: <Layers className="w-4 h-4 text-amber-400" />,
        action: () => {
          onClose();
          onOpenProjectModal(p.id);
        },
      });
    });

    // Add Research Papers
    RESEARCH_PAPERS.forEach((r) => {
      items.push({
        id: `research-${r.id}`,
        category: 'Research',
        title: r.title,
        subtitle: r.domain,
        icon: <BookOpen className="w-4 h-4 text-purple-400" />,
        action: () => {
          onClose();
          const el = document.getElementById('research');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      });
    });

    // Add Hardware Specs
    HARDWARE_INVENTORY.forEach((h) => {
      items.push({
        id: `hw-${h.tag}`,
        category: 'Hardware',
        title: h.name,
        subtitle: h.architecture,
        icon: <Cpu className="w-4 h-4 text-emerald-400" />,
        action: () => {
          onClose();
          const el = document.getElementById('hardware-skills');
          el?.scrollIntoView({ behavior: 'smooth' });
        },
      });
    });

    return items;
  }, [onClose, onOpenResumeModal, onOpenProjectModal, onDownloadVCard]);

  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems;
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-[#121216] border border-zinc-700/80 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, project, research paper, or skill..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
              }}
              className="text-zinc-500 hover:text-zinc-300 text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-zinc-800/40">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-xs text-zinc-500 font-mono">
              No matching commands or projects found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                  idx === selectedIndex ? 'bg-zinc-800/90 text-white' : 'hover:bg-zinc-800/40 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 shrink-0">
                    {item.icon}
                  </div>
                  <div className="truncate">
                    <div className="text-xs sm:text-sm font-medium truncate text-zinc-200">
                      {item.title}
                    </div>
                    {item.subtitle && (
                      <div className="text-[11px] text-zinc-400 truncate">
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-800 text-zinc-400">
                    {item.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
