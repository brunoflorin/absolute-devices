import React from "react";
import logo from "../assets/logo.jpg";

export default function LogoIntro() {
  return (
    <section className="w-full max-w-6xl mx-auto my-6 rounded-2xl bg-gradient-to-r from-slate-50 to-sky-50 border border-slate-200 shadow-lg px-6 py-5 lg:px-8 lg:py-6">
      <div className="grid gap-6 lg:grid-cols-[200px,1fr] items-center">

        {/* Logo Absolute Micro */}
        <div className="flex justify-center lg:justify-start">
          <img
            src={logo}
            alt="Absolute Micro"
            className="max-h-40 rounded-xl shadow-lg object-contain bg-white p-2 border border-slate-200"
          />
        </div>

        {/* Texte d’accueil */}
        <div className="space-y-3">
          <h1 className="text-2xl text-sky-900">
            Bienvenue chez Absolute Micro
          </h1>

        <p className="text-sm lg:text-base text-slate-700 mt-1">
  Ce tableau interactif vous permet d’explorer nos services facilement.
  Nous avons regroupé l’ensemble de nos prestations en quatre grandes familles.
</p>

<p className="text-sm lg:text-base text-slate-700">
  Cliquez sur une famille pour afficher les sujets liés, puis consultez une fiche détaillée en version
  courte ou étendue, vulgarisée ou technique, avec la possibilité d’accéder à une estimation tarifaire.
  Cela vous permet de visualiser rapidement ce que nous pouvons mettre en place dans votre entreprise.
</p>

        </div>
      </div>
    </section>
  );
}
