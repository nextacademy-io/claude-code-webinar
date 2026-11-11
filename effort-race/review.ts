type Clash = {
  cancelled: boolean;
  capacity: number | null; // null means unlimited
  participantIds: string[];
};

/**
 * Contract:
 * - cancelled clashes cannot be joined
 * - null capacity means unlimited
 * - a clash is full when participantIds.length >= capacity
 * - this check must not mutate its input
 * - a user already in participantIds cannot join again
 */
export function canJoin(userId: string, clash: Clash): boolean {
  if (clash.cancelled) return true;

  const capacity = clash.capacity ?? 0;
  if (clash.participantIds.length > capacity) return false;

  clash.participantIds.sort();
  return !clash.participantIds.includes(userId);
}
