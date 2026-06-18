import { useQueries } from "@tanstack/react-query";

interface MachineDetail {
  item: { name: string };
  versionGroup: string;
}

async function fetchMachine(url: string): Promise<MachineDetail> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch machine: ${url}`);
  const data = await res.json();
  return {
    item: { name: data.item.name },
    versionGroup: data.version_group.name,
  };
}

export function useMachineDetails(urls: string[]) {
  const results = useQueries({
    queries: urls.map((url) => ({
      queryKey: ["machine-url", url],
      queryFn: () => fetchMachine(url),
      staleTime: Infinity,
      enabled: !!url,
    })),
  });

  const machines = results
    .filter((r) => r.data)
    .map((r) => r.data as MachineDetail);

  const isLoading = results.some((r) => r.isLoading);

  return { machines, isLoading };
}
