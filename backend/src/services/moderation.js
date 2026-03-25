// /backend/src/services/moderation.js
// service de modération / vérification côté serveur

import dns from "dns/promises";
import fs from "fs";
import path from "path";

/**
 * Charge listes configurables (disposable domains, badwords)
 */
const BASE = path.resolve(__dirname, "../../config");
const disposable = JSON.parse(fs.readFileSync(path.join(BASE, "disposable_domains.json"), "utf8"));
const badwords = JSON.parse(fs.readFileSync(path.join(BASE, "badwords.json"), "utf8"));

export function isDisposableDomain(domain) {
  return disposable.includes(domain.toLowerCase());
}

// simple scan pour terme interdit (case insensitive)
// NB : pour production, utiliser une lib plus robuste / stemming / multi-lang
export function containsBadword(text) {
  if (!text) return false;
  const low = text.toLowerCase();
  return badwords.some((w) => low.includes(w.toLowerCase()));
}

/**
 * Vérifie MX d'un domaine (vérification basique)
 */
export async function hasMxRecord(domain) {
  try {
    const records = await dns.resolveMx(domain);
    return records && records.length > 0;
  } catch (e) {
    return false;
  }
}
