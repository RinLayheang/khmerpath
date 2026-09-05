import type { Major, School, LocalizedText } from "./types";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.API_URL ||
  "http://127.0.0.1:8000";

export interface SearchResultMajor {
  slug: string;
  name: LocalizedText;
  category?: string;
  demand?: string;
}

export interface SearchResultUniversity {
  slug: string;
  name: LocalizedText;
  province?: LocalizedText;
  type?: "public" | "private";
}

export interface SearchResultCareer {
  title: LocalizedText;
  majorSlug: string;
  majorName: LocalizedText;
}

export interface SearchResults {
  majors: SearchResultMajor[];
  universities: SearchResultUniversity[];
  careers: SearchResultCareer[];
}

export interface PlatformCategory {
  slug: string;
  count: number;
}

export interface PlatformStats {
  totalMajors: number;
  totalSchools: number;
  totalCareers: number;
  topDemandMajors: Major[];
  provinces: LocalizedText[];
  categories?: PlatformCategory[];
  searchSuggestions?: LocalizedText[];
}

export async function fetchMajors(): Promise<Major[]> {
  try {
    const res = await fetch(`${API_BASE}/majors/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`Failed to fetch majors: ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching majors from backend:", err);
    return [];
  }
}

export async function fetchMajorBySlug(slug: string): Promise<Major | null> {
  try {
    const res = await fetch(`${API_BASE}/majors/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(`Error fetching major ${slug} from backend:`, err);
    return null;
  }
}

export async function fetchSchools(): Promise<School[]> {
  try {
    const res = await fetch(`${API_BASE}/universities/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      console.error(`Failed to fetch universities: ${res.statusText}`);
      return [];
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching universities from backend:", err);
    return [];
  }
}

export async function fetchSchoolBySlug(slug: string): Promise<School | null> {
  try {
    const res = await fetch(
      `${API_BASE}/universities/${encodeURIComponent(slug)}`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error(`Error fetching university ${slug} from backend:`, err);
    return null;
  }
}

export async function fetchSchoolsForMajor(majorSlug: string): Promise<School[]> {
  try {
    const res = await fetch(
      `${API_BASE}/majors/${encodeURIComponent(majorSlug)}/schools`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error(`Error fetching schools for major ${majorSlug}:`, err);
    return [];
  }
}

export async function fetchMajorsForSchool(schoolSlug: string): Promise<Major[]> {
  try {
    const res = await fetch(
      `${API_BASE}/universities/${encodeURIComponent(schoolSlug)}/majors`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    console.error(`Error fetching majors for school ${schoolSlug}:`, err);
    return [];
  }
}

export async function fetchStats(): Promise<PlatformStats> {
  try {
    const res = await fetch(`${API_BASE}/stats/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch stats");
    return res.json();
  } catch (err) {
    console.error("Error fetching stats from backend:", err);
    return {
      totalMajors: 0,
      totalSchools: 0,
      totalCareers: 0,
      topDemandMajors: [],
      provinces: [],
    };
  }
}

export async function fetchSearch(
  query: string,
  lang: string = "en",
  limit: number = 5
): Promise<SearchResults> {
  if (!query || query.trim().length < 2) {
    return { majors: [], universities: [], careers: [] };
  }
  try {
    const res = await fetch(
      `${API_BASE}/search?q=${encodeURIComponent(query.trim())}&lang=${encodeURIComponent(lang)}&limit=${limit}`
    );
    if (!res.ok) {
      console.error(`Failed to fetch search results: ${res.statusText}`);
      return { majors: [], universities: [], careers: [] };
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching search results:", err);
    return { majors: [], universities: [], careers: [] };
  }
}
