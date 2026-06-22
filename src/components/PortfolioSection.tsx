import React, { useState } from 'react';
import { ExternalLink, Github, Code, Sparkles, Plus, Eye, Calendar, Folder, X } from 'lucide-react';
import { Project } from '../types';

interface PortfolioSectionProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project | null) => void;
  onAddProject: (project: Project) => void;
}

export default function PortfolioSection({
  projects,
  selectedProject,
  onSelectProject,
  onAddProject
}: PortfolioSectionProps) {
  const filteredProjects = projects;

  return (
    <div className="space-y-12 animate-fade-in" id="portfolio-section-root">
      {/* Intro */}
      <section className="space-y-2">
        <div className="space-y-2">
          <span className="text-xs uppercase font-mono tracking-widest text-indigo-600 font-bold">Showcase of Work</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">Interactive Project Portfolio</h2>
          <p className="text-sm text-slate-500 font-sans max-w-xl">
            An elite showcase of custom corporate platforms, secure digital commerce ecosystems, healthcare and financial gateways, and real-time interactive web applications.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8" id="portfolio-items-grid">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            onClick={() => onSelectProject(project)}
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                
                {/* Category tag */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
                  <Folder className="w-3 h-3" />
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 font-sans tracking-tight group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-sans line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono bg-slate-50 border border-slate-150 text-slate-600 px-2.5 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-50 mt-4 flex items-center justify-between text-xs font-semibold text-indigo-650 group-hover:text-indigo-700">
              {project.demoUrl && project.demoUrl !== '#' ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 hover:underline text-indigo-600 font-bold"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View Live</span>
                </a>
              ) : (
                <span className="flex items-center gap-1.5 hover:underline">
                  <Eye className="w-4 h-4" />
                  <span>View Specs & Code References</span>
                </span>
              )}
              <Calendar className="w-4 h-4 text-slate-300" />
            </div>
          </div>
        ))}
      </section>

      {/* Project Details Overlay Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto animate-fade-in" id="project-modal-backdrop">
          <div className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full border border-slate-200 shadow-2xl relative my-8 animate-scale-up max-h-[90vh] flex flex-col">
            
            {/* Modal Header/Image */}
            <div className="relative aspect-video w-full bg-slate-100 shrink-0">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onSelectProject(null)}
                className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-full backdrop-blur-xs active:scale-90 transition-all cursor-pointer shadow-lg"
                id="close-project-modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold tracking-wide uppercase shadow-md">
                {selectedProject.category} category
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto" id="modal-project-body">
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 font-sans tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>Development Speed: <b>{selectedProject.duration}</b></span>
                  <span>•</span>
                  <span>Status: <b>Production Ready</b></span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">Architectural Summary</h4>
                <p className="text-sm md:text-base text-slate-700 font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedProject.detailedDescription}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">Engineering Stack Integration</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, i) => (
                    <span key={i} className="text-xs font-mono bg-indigo-50 border border-indigo-100/55 text-indigo-700 font-semibold px-3 py-1 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100" id="modal-actions">
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl text-center shadow-md active:scale-97 transition-all w-full"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
