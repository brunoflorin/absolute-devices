import { topics } from "./tinaBase";

// ---------------------------------------------------------------------------
// option :
//   "1" = courte
//   "2" = étendue
//   "3" = tarifaire
//   "4" = visuels
//
// level :
//   "a" = vulgarisé
//   "b" = technique
// ---------------------------------------------------------------------------

export function getTopicContent(topicId, option, level) {
  const topic = topics[topicId];
  if (!topic) return null;

  const baseContent = {
    label: topic.label,
    images: topic.images ?? [],
  };

  // --- VISUELS --------------------------------------------------------------
  if (option === "4") {
    return baseContent;
  }

  // --- TARIFAIRE ------------------------------------------------------------
  if (option === "3") {
    return {
      ...baseContent,
      pricing: topic.pricing,
    };
  }

  // --- COURTE ---------------------------------------------------------------
  if (option === "1") {
    const text =
      level === "a"
        ? topic.short?.vulgarise
        : topic.short?.technique;

    return {
      ...baseContent,
      text,
    };
  }

  // --- ÉTENDUE --------------------------------------------------------------
  if (option === "2") {
    const text =
      level === "a"
        ? topic.extended?.vulgarise
        : topic.extended?.technique;

    return {
      ...baseContent,
      text,
    };
  }

  // --- FALLBACK -------------------------------------------------------------
  return baseContent;
}