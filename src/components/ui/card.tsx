import * as React from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-card text-card-foreground rounded-md border shadow-[0_8px_24px_rgba(15,35,25,0.04)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-4 pb-2",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3 className={cn("leading-none font-semibold", className)} {...props} />
  );
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("p-4 pt-2", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center p-4 pt-2", className)} {...props} />
  );
}
