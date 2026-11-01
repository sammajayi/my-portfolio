"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GithubIcon, Globe02Icon, ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import type { Project, ProjectLink } from "@/app/data/project";

const linkIcons: Record<ProjectLink["type"], React.ReactNode> = {
  github: <GithubIcon size={14} aria-hidden="true" />,
  live: <Globe02Icon size={14} aria-hidden="true" />,
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const panelId = React.useId();

  return (
    <div className={cn("flex flex-col group py-3", className)}>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{project.name}</h3>
        <div className="flex items-center gap-1">
          {project.links.map((link) => (
            <Link
              key={link.type}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} ${link.type === "github" ? "source code" : "live site"} (opens in a new tab)`}
              className="text-muted hover:text-foreground transition-colors duration-200 p-2 rounded focus-visible:outline-2 focus-visible:outline-bright-marine"
            >
              {linkIcons[link.type]}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls={panelId}
            aria-label={`${isExpanded ? "Hide" : "Show"} details for ${project.name}`}
            className="text-muted hover:text-foreground transition-colors duration-200 p-2 rounded focus-visible:outline-2 focus-visible:outline-bright-marine"
          >
            {isExpanded ? <ArrowUp01Icon size={14} aria-hidden="true" /> : <ArrowDown01Icon size={14} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isExpanded ? 1 : 0,
          height: isExpanded ? "auto" : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        id={panelId}
        inert={!isExpanded}
        className="overflow-hidden"
      >
        <p className="text-sm text-muted pt-1">{project.description}</p>
      </motion.div>
    </div>
  );
}

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const [expanded, setExpanded] = React.useState(false);
  const displayed = expanded ? projects : projects.slice(0, 5);
  const showLoadMore = !expanded && projects.length > 5;

  return (
    <div className="flex flex-col">
      {displayed.map((project, index) => (
        <ProjectCard
          key={project.name}
          project={project}
          className={index !== 0 ? "border-t border-alabaster-grey" : ""}
        />
      ))}

      <div className="flex justify-center mt-4 gap-4">
        {showLoadMore && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="text-sm text-muted hover:text-foreground transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-marine"
          >
            Load More <ArrowDown01Icon size={14} className="inline" aria-hidden="true" />
          </button>
        )}
        {expanded && projects.length > 5 && (
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="text-sm text-muted hover:text-foreground transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bright-marine"
          >
            Show Less <ArrowUp01Icon size={14} className="inline" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
