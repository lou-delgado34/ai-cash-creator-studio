export const PLAN_CREDITS = {
  free: 10,
  pro: 100,
  premium: 500,
  admin: 999999999,
} as const;

export const GENERATION_COSTS = {
  prompt: 1,
  caption: 1,
  script: 2,
  contentPlan: 3,
  offer: 2,
} as const;

export type UserPlan = keyof typeof PLAN_CREDITS;
export type GenerationType = keyof typeof GENERATION_COSTS;

export function getCreditsForPlan(plan: UserPlan) {
  if (plan === "admin") {
    return "Unlimited";
  }

  return PLAN_CREDITS[plan];
}

export function canGenerate(
  plan: UserPlan,
  currentCredits: number,
  generationType: GenerationType
) {
  if (plan === "admin") {
    return true;
  }

  const cost = GENERATION_COSTS[generationType];

  return currentCredits >= cost;
}

export function subtractCredits(
  plan: UserPlan,
  currentCredits: number,
  generationType: GenerationType
) {
  if (plan === "admin") {
    return currentCredits;
  }

  const cost = GENERATION_COSTS[generationType];

  return Math.max(currentCredits - cost, 0);
}

export function getCreditLabel(plan: UserPlan, credits: number) {
  if (plan === "admin") {
    return "Unlimited";
  }

  return `${credits} credits`;
}