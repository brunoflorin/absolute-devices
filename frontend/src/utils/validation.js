// /frontend/src/utils/validation.js
// Utilitaires de validation pour l'inscription
// Dépendances conseillées : npm i libphonenumber-js

import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Liste minimale d'exemples (à étendre dans /backend/config)
 * Remplace par fichier distant / API si besoin.
 */
const DISPOSABLE_DOMAINS = [
  "yopmail.com",
  "mailinator.com",
  "tempmail.io",
  "10minutemail.com",
  "guerrillamail.com",
];

const BAD_PASSWORDS = ["123456", "password", "azerty", "admin", "tina", "absolute"];

/**
 * Exemples de motifs de numéro "bizarres"
 * - répétitions de paires (0606060606)
 * - séquences monotones (0123456789)
 */
function looksLikeRepeatedPairs(digits) {
  // match 5 répétitions d'une paire : 06 06 06 06 06 => ^([0-9]{2})\1{4}$
  return /^([0-9]{2})\1{4}$/.test(digits);
}

function looksLikeAscendingSequence(digits) {
  // simple heuristique : 012345..., 123456..., 987654...
  return /012345|123456|234567|345678|456789|987654|876543|765432/.test(digits);
}

/**
 * Entropie de Shannon (approx) pour détecter faible diversité
 */
function shannonEntropy(s) {
  const map = {};
  for (const ch of s) map[ch] = (map[ch] || 0) + 1;
  const len = s.length;
  let ent = 0;
  for (const k in map) {
    const p = map[k] / len;
    ent -= p * Math.log2(p);
  }
  return ent;
}

/**
 * Détecte si un numéro de téléphone est "suspect"
 * - digits: chaîne de chiffres nettoyée (ex : "0606060606" ou "0102030405")
 */
export function isPhoneSuspicious(digits) {
  if (!/^\d{8,15}$/.test(digits)) return true; // format étrange
  if (looksLikeRepeatedPairs(digits)) return true;
  if (looksLikeAscendingSequence(digits)) return true;
  const ent = shannonEntropy(digits);
  // seuil arbitraire : entropie très basse => doute
  if (ent < 1.5) return true;
  return false;
}

/**
 * Normalize et retourne { ok, e164, country, reason }
 * requires libphonenumber-js
 */
export function normalizePhone(raw) {
  try {
    const pn = parsePhoneNumberFromString(raw);
    if (!pn) return { ok: false, reason: "invalid" };
    const digits = pn.nationalNumber;
    const suspicious = isPhoneSuspicious(String(digits));
    return {
      ok: pn.isValid(),
      e164: pn.number, // +33...
      country: pn.country || null, // ISO2
      suspicious,
    };
  } catch (err) {
    return { ok: false, reason: "parse_error" };
  }
}

/**
 * Email disposable check (simple)
 */
export function isDisposableEmail(email) {
  if (!email || !email.includes("@")) return true;
  const domain = email.split("@").pop().toLowerCase();
  return DISPOSABLE_DOMAINS.includes(domain);
}

/**
 * Basic name check
 */
export function isNameValid(name) {
  if (!name) return false;
  const trimmed = String(name).trim();
  if (trimmed.length < 2) return false;
  // autorise lettres, espaces, accents, apostrophe, trait d'union
  if (!/^[\p{L}\s'-]{2,}$/u.test(trimmed)) return false;
  // reject obvious tokens
  const low = trimmed.toLowerCase();
  if (/^(test|aaa|qq|123|toto|admin|user)$/.test(low)) return false;
  return true;
}

/**
 * Password strength / blacklists
 */
export function isPasswordAcceptable(pwd) {
  if (!pwd || pwd.length < 8) return { ok: false, reason: "too_short" };
  if (BAD_PASSWORDS.includes(pwd.toLowerCase())) return { ok: false, reason: "too_common" };
  // add more checks if needed
  return { ok: true };
}

/**
 * Render a flag emoji from ISO2 code (ex "FR" -> 🇫🇷)
 */
export function countryCodeToEmoji(code) {
  if (!code) return "";
  //  A -> 0x1F1E6 + (charCode - 65)
  return code
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
}
