"use client";

import * as React from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

import { siteConfig } from "~/config/site";
// import { cn } from "~/utils/style";
import { Icons } from "~/components/icons";
import Image from "next/image";

export function MainNav() {
  // const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        <Image
          src={"/nbc.webp"}
          width={32}
          height={32}
          alt={"nbc"}
          className="rounded-lg"
        />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {/* <Link */}
        {/*   href="/themes" */}
        {/*   className={cn( */}
        {/*     "transition-colors hover:text-foreground/80", */}
        {/*     pathname?.startsWith("/themes") */}
        {/*       ? "text-foreground" */}
        {/*       : "text-foreground/60", */}
        {/*   )} */}
        {/* > */}
        {/*   Themes */}
        {/* </Link> */}
      </nav>
    </div>
  );
}
