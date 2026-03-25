import { topics } from "./tinaBase";

// ---------------------------------------------------------------------------
// option :
//   "1" = courte
//   "2" = étendue
//   "3" = tarifaire
//
// level :
//   "a" = vulgarisé
//   "b" = technique
// ---------------------------------------------------------------------------

export function getTopicContent(topicId, option, level) {
  const topic = topics[topicId];
  if (!topic) return null;

  // --- TARIFAIRE ------------------------------------------------------------
  if (option === "3") {
    return {
      label: topic.label,
      pricing: topic.pricing,
      images: topic.images ?? []
    };
  }

  // --- COURTE ---------------------------------------------------------------
  if (option === "1") {
    const text =
      level === "a"
        ? topic.short?.vulgarise
        : topic.short?.technique;

    return {
      label: topic.label,
      text,
      images: topic.images ?? []
    };
  }

  // --- ÉTENDUE --------------------------------------------------------------
  if (option === "2") {
    const text =
      level === "a"
        ? topic.extended?.vulgarise
        : topic.extended?.technique;

    return {
      label: topic.label,
      text,
      images: topic.images ?? []
    };
  }

  return null;
}
