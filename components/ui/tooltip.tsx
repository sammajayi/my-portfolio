"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = () => { timeoutRef.current = setTimeout(() => setOpen(true), 700); };
  const hide = () => { clearTimeout(timeoutRef.current); setOpen(false); };

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if ((child.type as any)?.displayName === "TooltipTrigger") return child;
        if ((child.type as any)?.displayName === "TooltipContent") return open ? child : null;
        return child;
      })}
    </div>
  );
};

const TooltipTrigger = React.forwardRef<HTMLButtonElement, { children: React.ReactNode; asChild?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, asChild, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, { ref, ...props });
    }
    return <button ref={ref} {...props}>{children}</button>;
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<HTMLDivElement, { children: React.ReactNode; className?: string }>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs rounded-md bg-foreground text-background whitespace-nowrap z-50 pointer-events-none", className)} {...props}>
      {children}
    </div>
  )
);
TooltipContent.displayName = "TooltipContent";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
