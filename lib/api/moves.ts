import { ApiEndpoints } from "@/constants/api";
import {
    Move,
    MoveBattleStyle,
    MoveCategory,
    MoveDamageClass,
    MoveLearnMethod,
} from "@/types/moves";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchMove = (idOrName: string | number) =>
  apiFetch<Move>(ApiEndpoints.move(idOrName));

export const fetchMoveBattleStyle = (idOrName: string | number) =>
  apiFetch<MoveBattleStyle>(ApiEndpoints.moveBattleStyle(idOrName));

export const fetchMoveCategory = (idOrName: string | number) =>
  apiFetch<MoveCategory>(ApiEndpoints.moveCategory(idOrName));

export const fetchMoveDamageClass = (idOrName: string | number) =>
  apiFetch<MoveDamageClass>(ApiEndpoints.moveDamageClass(idOrName));

export const fetchMoveLearnMethod = (idOrName: string | number) =>
  apiFetch<MoveLearnMethod>(ApiEndpoints.moveLearnMethod(idOrName));
