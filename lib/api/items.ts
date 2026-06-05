import { ApiEndpoints } from "@/constants/api";
import { Item, ItemFlingEffect } from "@/types/items";

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status} for ${url}`);
  return res.json() as Promise<T>;
}

export const fetchItem = (idOrName: string | number) =>
  apiFetch<Item>(ApiEndpoints.item(idOrName));

export const fetchItemFlingEffect = (idOrName: string | number) =>
  apiFetch<ItemFlingEffect>(ApiEndpoints.itemFlingEffect(idOrName));
