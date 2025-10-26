"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "@/components/BookingModal"; // now correct
// ...rest unchanged


const projects = [
  {
    id: "gestion-leads",
    title: "Gestion des leads",
    year: 2025,
    video: "/videos/placeholder.mp4",
    description:
      "Pipeline complet pour la collecte, la qualification et le suivi des leads. Intégrations CRM, webhooks, et dashboards de conversion en temps réel.",
    date: "Jan 15, 2025",
    github: "https://github.com/yourusername/gestion-leads",
  },
  {
    id: "dashboard-sales",
    title: "Dashboard sales",
    year: 2025,
    video: "/videos/placeholder.mp4",
    description:
      "Tableau de bord temps réel des KPI ventes : CA, funnel, cohortes. Stack cloud-native avec streaming events et système d'alerting avancé.",
    date: "Dec 8, 2024",
    github: "https://github.com/yourusername/dashboard-sales",
  },
  {
    id: "autocontract",
    title: "Auto-Contract",
    year: 2025,
    video: "/videos/placeholder.mp4",
    description:
      "Génère automatiquement des contrats PDF à partir de templates dynamiques et de données saisies. Envoi par e-mail automatisé avec traçabilité des versions.",
    date: "Nov 22, 2024",
    github: "https://github.com/yourusername/auto-contract",
  },
  {
    id: "sql-impl",
    title: "SQL Implementation",
    year: 2025,
    video: "/videos/placeholder.mp4",
    description:
      "Conception de schéma relationnel, normalisation complète, scripts de migration versionnés et tests de performance. Système de backups et restauration automatisés.",
    date: "Oct 10, 2024",
    github: "https://github.com/yourusername/sql-implementation",
  },
  {
    id: "get-next-line",
    title: "get_next_line",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Lecture de flux ligne par ligne en C avec gestion optimisée de buffer. Performances garanties et gestion mémoire efficace pour traitement de gros fichiers.",
    date: "Sep 5, 2024",
    github: "https://github.com/yourusername/get-next-line",
  },
  {
    id: "get-next-word",
    title: "get_next_word",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Extraction de tokens optimisée pour analyse de texte et pipelines CLI. Algorithme performant avec support de délimiteurs personnalisés.",
    date: "Aug 18, 2024",
    github: "https://github.com/yourusername/get-next-word",
  },
  {
    id: "minigrep-c",
    title: "minigrep-c",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Utilitaire grep minimaliste en C avec recherche de patterns, support d'expressions régulières basiques et options de performance pour grands volumes.",
    date: "Jul 3, 2024",
    github: "https://github.com/yourusername/minigrep-c",
  },
  {
    id: "webserver",
    title: "Webserver HTTP",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Serveur HTTP multi-threadé en C avec support de méthodes GET/POST, gestion de fichiers statiques et configuration flexible.",
    date: "Jun 12, 2024",
    github: "https://github.com/yourusername/webserver",
  },
  {
    id: "printf",
    title: "ft_printf",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Réimplémentation de la fonction printf de la libc avec support des conversions standards et gestion de flags.",
    date: "May 8, 2024",
    github: "https://github.com/yourusername/ft-printf",
  },
  {
    id: "libft",
    title: "Libft",
    year: 2024,
    video: "/videos/placeholder.mp4",
    description:
      "Bibliothèque C personnalisée avec réimplémentation de fonctions standards et utilitaires pour la manipulation de chaînes et listes.",
    date: "Apr 2, 2024",
    github: "https://github.com/yourusername/libft",
  },
];

export default function PortfolioApp() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lockedId, setLockedId] = useState<string | null>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(true);
  const [canScroll, setCanScroll] = useState(false);
  const [showBooking, setShowBooking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeId = lockedId || hoveredId;
  const activeProject = projects.find((p) => p.id === activeId);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight } = scrollRef.current;
        setCanScroll(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleProjectClick = (projectId: string) => {
    if (lockedId === projectId) {
      setLockedId(null);
    } else {
      setLockedId(projectId);
    }
  };

  const handleMouseEnter = (projectId: string) => {
    if (!lockedId) setHoveredId(projectId);
  };

  const handleMouseLeave = () => {
    if (!lockedId) setHoveredId(null);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;

    setShowTopFade(scrollTop > 10);
    setShowBottomFade(scrollBottom > 10);
  };

  return (
    <div className="min-h-screen bg-[#141416] text-zinc-300 antialiased flex items-center justify-center px-12 py-16">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-center">
        <div className="relative h-[420px]">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto py-2 pl-2 pr-4"
            style={{
              direction: "rtl",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(39, 39, 42, 0.3) transparent",
            }}
          >
            <div style={{ direction: "ltr" }} className="space-y-1 pr-2">
              {projects.map((project) => {
                const isActive = activeId === project.id;
                const isLocked = lockedId === project.id;

                return (
                  <button
                    key={project.id}
                    onMouseEnter={() => handleMouseEnter(project.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleProjectClick(project.id)}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all duration-300 group ${
                      isLocked
                        ? "bg-zinc-900/70 ring-1 ring-zinc-700"
                        : "hover:bg-zinc-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-base font-normal transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-zinc-300 group-hover:text-white"
                        }`}
                      >
                        {project.title}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {project.year}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {canScroll && (
            <>
              <div
                className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#141416] via-[#141416]/60 to-transparent pointer-events-none transition-opacity duration-300 ease-in-out"
                style={{ opacity: showTopFade ? 1 : 0 }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#141416] via-[#141416]/70 to-transparent pointer-events-none transition-opacity duration-300 ease-in-out"
                style={{ opacity: showBottomFade ? 1 : 0 }}
              />
            </>
          )}
        </div>

        <div className="relative w-full h-[600px]">
          <AnimatePresence mode="wait">
            {!activeId ? (
              <motion.div
                key="bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute top-1/2 -translate-y-1/2 left-0 space-y-6"
              >
                <h1 className="text-3xl font-normal">
                  <span className="text-white">Amrane Youcef,</span>
                  <br />
                  <span className="text-zinc-400">
                    DevOps Engineer Junior at{" "}
                  </span>
                  <span className="text-blue-500">Your Company</span>
                </h1>

                <div className="flex items-center gap-8">
                  <button
                    onClick={() => setShowBooking(true)}
                    className="inline-flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30"
                  >
                    Prendre un rendez-vous
                  </button>

                  <div className="flex gap-6 text-sm text-zinc-500">
                    <a href="#about" className="hover:text-white transition-colors">
                      About
                    </a>
                    <a
                      href="mailto:your.email@example.com"
                      className="hover:text-white transition-colors"
                    >
                      Email
                    </a>
                    <a
                      href="https://linkedin.com/in/yourprofile"
                      className="hover:text-white transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/yourusername"
                      className="hover:text-white transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`project-${activeId}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6"
              >
                <div className="relative h-full bg-zinc-900/30 rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    key={activeProject?.video}
                    src={activeProject?.video}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>

                <div className="bg-zinc-900/40 border border-[#4a4a52] rounded-2xl p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs text-zinc-500">
                        {activeProject?.date}
                      </span>
                      <a
                        href={activeProject?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-70 transition-opacity"
                      >
                        <img
                          src="/github-logo.png"
                          alt="GitHub"
                          className="w-6 h-6"
                        />
                      </a>
                    </div>

                    <h2 className="text-2xl font-semibold text-white mb-3">
                      {activeProject?.title}
                    </h2>

                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {activeProject?.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-zinc-800/50">
                    <span className="text-xs text-zinc-500">
                      Year: {activeProject?.year}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
      />
    </div>
  );
}
