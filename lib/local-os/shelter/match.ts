import type { ShelterAnimal } from '@/lib/local-os/shelter/types';

/**
 * Name/breed matching for the shelter directory. Allison's knowledge base states the same rules, so a
 * caller and a website visitor get the same answer from the same snapshot.
 *
 * ShelterBuddy publishes a primary breed ("Labrador Cross") and sometimes a second breed ("Shepherd").
 * "Cross" means mix, so a listing is only an exact breed match when its primary breed has no
 * Cross/Mix marker and there is no second breed.
 */
export type MatchKind = 'name' | 'exact' | 'primary' | 'secondary';
export type BreedMatch = { kind: MatchKind; label: string };

/** Everyday names → the wording ShelterBuddy uses. Keys and values are lower case. */
const ALIASES: Record<string, string> = {
  lab: 'labrador', labs: 'labrador', 'labrador retriever': 'labrador',
  pit: 'pit bull', pitbull: 'pit bull', pitbulls: 'pit bull', pittie: 'pit bull', pitty: 'pit bull',
  gsd: 'german shepherd', alsatian: 'german shepherd',
  husky: 'siberian husky', huskies: 'siberian husky',
  doxie: 'dachshund', wiener: 'dachshund', sausage: 'dachshund',
  chi: 'chihuahua', frenchie: 'french bulldog', pom: 'pomeranian',
  jrt: 'jack russell terrier', 'jack russell': 'jack russell terrier',
  rottie: 'rottweiler', griffon: 'brussels griffon', collie: 'border collie',
  mutt: 'mixed', mix: 'mixed',
};

const STOP = new Set(['a', 'an', 'any', 'breed', 'breeds', 'dog', 'dogs', 'puppy', 'puppies']);
const MIX = /\b(cross|mix|mixed)\b/i;
const words = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean);
/** Primary breed without the Cross/Mix marker: "Dachshund, Miniature Cross" → "Dachshund, Miniature". */
export const primaryBreed = (breed: string) => breed.replace(/\s+(cross|mix)$/i, '').trim();

export function normalizeQuery(q: string): string {
  // "Lab mix" / "boxer cross" search the breed; "mix" alone asks for mixed breeds.
  const w = words(q).filter((x) => !STOP.has(x));
  const kept = w.filter((x) => !MIX.test(x));
  const s = (kept.length ? kept : w).join(' ');
  if (ALIASES[s]) return ALIASES[s];
  return s.split(' ').map((x) => ALIASES[x] ?? x).join(' ');
}

/** Every query word must start a word in the text ("lab" → "Labrador", not "Collaborator"). */
function contains(text: string, q: string): boolean {
  const t = words(text);
  return words(q).every((w) => t.some((x) => x.startsWith(w)));
}

export function matchAnimal(a: ShelterAnimal, query: string): BreedMatch | null {
  const raw = query.trim();
  if (!raw) return null;
  const q = normalizeQuery(raw);
  if (!q) return null;
  const breed = a.fields.find((f) => f.label === 'Breed')?.value ?? '';
  const second = a.fields.find((f) => f.label === 'Second breed')?.value ?? '';
  const primary = primaryBreed(breed);
  if (contains(a.name, raw)) return { kind: 'name', label: 'Name match' };
  if (contains(primary, q) || (q === 'mixed' && MIX.test(breed))) {
    if (!MIX.test(breed) && !second && words(primary).join(' ') === q) return { kind: 'exact', label: `Exact breed match · ${primary}` };
    return { kind: 'primary', label: /^mixed$/i.test(primary) ? 'Close match · listed as a mixed breed' : `Close match · ${primary} mix` };
  }
  if (second && contains(second, q)) return { kind: 'secondary', label: `Close match · mix that includes ${second}` };
  return null;
}

const RANK: Record<MatchKind, number> = { name: 0, exact: 1, primary: 2, secondary: 3 };

/** Matching animals, best first: name, exact breed, primary-breed mix, second-breed mix. */
export function searchAnimals(animals: ShelterAnimal[], query: string): { animal: ShelterAnimal; match: BreedMatch | null }[] {
  if (!normalizeQuery(query)) return animals.map((animal) => ({ animal, match: null }));
  return animals
    .map((animal, i) => ({ animal, match: matchAnimal(animal, query), i }))
    .filter((r): r is { animal: ShelterAnimal; match: BreedMatch; i: number } => r.match !== null)
    .sort((x, y) => RANK[x.match.kind] - RANK[y.match.kind] || x.i - y.i)
    .map(({ animal, match }) => ({ animal, match }));
}
