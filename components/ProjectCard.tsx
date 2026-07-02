"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GithubIcon, Globe02Icon, ArrowDown01Icon, ArrowUp01Icon } from "hugeicons-react";
import { motion } from "framer-motion";
import type { Project, ProjectLink } from "@/app/data/project";

const linkIcons: Record<ProjectLink["type"], React.ReactNode> = {
  github: <GithubIcon size={14} />,
  live: <Globe02Icon size={14} />,
};

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

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
              className="text-muted hover:text-foreground transition-colors duration-200 p-1"
            >
              {linkIcons[link.type]}
            </Link>
          ))}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-muted hover:text-foreground transition-colors duration-200 p-1"
          >
            {isExpanded ? <ArrowUp01Icon size={14} /> : <ArrowDown01Icon size={14} />}
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
            onClick={() => setExpanded(true)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Load More <ArrowDown01Icon size={14} className="inline" />
          </button>
        )}
        {expanded && projects.length > 5 && (
          <button
            onClick={() => setExpanded(false)}
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Show Less <ArrowUp01Icon size={14} className="inline" />
          </button>
        )}
      </div>
    </div>
  );
}
