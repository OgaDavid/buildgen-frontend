import { atom } from "jotai";
import { ProductIdea, generateProductIdea } from "./data-generator";

// Form data atoms
export const spaceAtom = atom<string>("");
export const vibeAtom = atom<string>("");
export const timeAtom = atom<string>("");

// Derived atom that combines all form data
export const formDataAtom = atom((get) => ({
  space: get(spaceAtom),
  vibe: get(vibeAtom),
  time: get(timeAtom),
}));

// Atom to track the current step
export const stepAtom = atom<number>(1);

// Atom to track if the form is complete
export const isFormCompleteAtom = atom((get) => {
  const space = get(spaceAtom);
  const vibe = get(vibeAtom);
  const time = get(timeAtom);
  return space !== "" && vibe !== "" && time !== "";
});

// Atom to track if the current step is complete
export const isStepCompleteAtom = atom((get) => {
  const step = get(stepAtom);
  const space = get(spaceAtom);
  const vibe = get(vibeAtom);
  const time = get(timeAtom);

  if (step === 1) return space !== "";
  if (step === 2) return vibe !== "";
  if (step === 3) return time !== "";
  return false;
});

// Loading state for results page
export const isLoadingAtom = atom<boolean>(true);

// Tab-specific loading state
export const isTabLoadingAtom = atom<boolean>(false);

// Currently active tab
export const activeTabAtom = atom<string>("stack");

// Generated product idea atom
export const productIdeaAtom = atom<ProductIdea | null>(null);

// Generate product idea based on form inputs
export const generateProductIdeaAtom = atom(null, (get, set) => {
  const space = get(spaceAtom);
  const vibe = get(vibeAtom);
  const time = get(timeAtom);

  if (space && vibe && time) {
    const productIdea = generateProductIdea(space, vibe, time);
    set(productIdeaAtom, productIdea);
  }
});

// For demo purposes, use predefined values but still generate a dynamic product idea
export const setDemoValuesAtom = atom(null, (get, set) => {
  // You can change these default values for testing different combinations
  set(spaceAtom, "Productivity");
  set(vibeAtom, "Solo Builder");
  set(timeAtom, "A Weekend");

  // Generate a product idea based on these values
  set(generateProductIdeaAtom);
});
