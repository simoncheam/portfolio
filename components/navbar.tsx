"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Github, Linkedin, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Work" },
    { href: "#experience", label: "Timeline" },
    { href: "#contact", label: "Contact" },
  ];

  // Console branding message
  useEffect(() => {
    const style2 = [
      "background: linear-gradient(#E36C4E, #19272f)",
      "border: 1px solid #E36C4E",
      "color: white",
      "padding: 1px 5px",
      "display: block",
      "line-height: 40px",
      "text-align: center",
      "font-weight: bold",
      "font-size: large",
    ].join(";");
    console.log(
      "%cIf you like what you see...I'd love to help you to take your software, team, or company to the next level.",
      style2
    );
    console.log("%cLet's chat >>> simon@simoncheam.dev", style2);
  }, []);

  // Pre-warm external project URLs
  useEffect(() => {
    Promise.all([
      // fetch('https://covidtrackerdashboard.herokuapp.com/status', { mode: 'no-cors' }),
      // fetch('https://ultimate-life-purpose.herokuapp.com/status', { mode: 'no-cors' }),
      fetch("https://react-cocktailsapp.netlify.app", { mode: "no-cors" }),
      fetch("https://next-bnb.vercel.app", { mode: "no-cors" }),
      fetch("https://nextjs-gpt-tour-guide.vercel.app", { mode: "no-cors" }),
      // fetch('https://personal-blogs-app.herokuapp.com/status', { mode: 'no-cors' }),
      fetch("https://mini-netflix-angular.web.app/movie", { mode: "no-cors" }),
    ]).then(() => console.log("apps loaded successfully"));
  }, []);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-lg border-b border-border"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className="text-xl font-bold tracking-tighter flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-mono">
            S
          </div>
          <span>
            SimonCheam<span className="text-primary">.</span>dev
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/simoncheam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-all"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/simoncheam"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-secondary text-foreground transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <VisuallyHidden>
                <DialogTitle>Mobile Navigation Menu</DialogTitle>
              </VisuallyHidden>
              <div className="flex flex-col items-center justify-center h-full gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 pt-8 border-t border-border">
                  <a
                    href="https://github.com/simoncheam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/simoncheam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
