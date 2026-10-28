import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { btnPrimary } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="flex min-h-[70vh] items-center bg-[url('/images/theme/bg-intro.png')] bg-cover bg-bottom bg-no-repeat pb-20 pt-[200px]"
      >
        <div className="mx-auto w-full max-w-site px-5 text-center sm:px-8 lg:px-10">
          <p className="text-[16px] font-semibold uppercase tracking-[3px] text-accent">
            Erreur 404
          </p>
          <h1 className="page-gradient-text mt-4 text-[56px] font-bold leading-none sm:text-[80px]">
            Page introuvable
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[18px] leading-[1.5] text-brand-navy">
            La page que vous cherchez n’existe pas ou a été déplacée.
            <span className="mt-2 block text-[16px] text-brand-navy/70">
              The page you are looking for does not exist or has been moved.
            </span>
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className={btnPrimary}>
              Retour à l’accueil
            </Link>
            <Link
              href="/en/"
              className="inline-flex items-center justify-center rounded-[4px] border-2 border-brand px-8 py-[14px] text-[16px] font-semibold text-brand transition hover:bg-brand hover:text-white"
            >
              Go to English home
            </Link>
          </div>
        </div>
      </main>
      <Footer locale="fr" />
    </>
  );
}
