// Placeholder Context component file
// This file is intentionally left blank for now.
import type { Session, User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

/* ── Design Tokens ───────────────────────────────────────────── */
export const T = {
  // Primary Colors - ORANGE AS MAIN COLOR! 🟠
  primary: "#FF7043", // Playful Orange - MAIN COLOR
  primaryLight: "#FFE8E3", // Light orange background
  primaryDark: "#D84315", // Dark orange for text
  
  secondary: "#FFB84D", // Warm Yellow - cheerful and welcoming
  secondaryLight: "#FFF3E0", // Light yellow background
  secondaryDark: "#E69500", // Dark yellow
  
  accent: "#4A90E2", // Soft Blue - calm and trustworthy
  accentLight: "#E3F2FD", // Light blue background
  accentDark: "#2E5C8A", // Dark blue
  
  // Additional Colors
  mintGreen: "#66D9B8", // Mint Green - fresh and nature-associated
  mintGreenLight: "#E8F8F4", // Light mint background
  mintGreenDark: "#3DAA87", // Dark mint
  
  vibrantBlue: "#2196F3", // Vibrant Blue - engaging nod to canine vision
  
  // Neutrals
  dark: "#2C2C2A", // Dark text
  medium: "#888780", // Secondary text
  light: "#D3D1C7", // Border/disabled
  bg: "#F5F5F5", // Neutral white/light gray background
  white: "#FFFFFF",
  border: "#E0E0E0",
  
  // Legacy aliases (for backward compatibility)
  teal: "#FF7043", // Now orange (was blue)
  tealLight: "#FFE8E3", // Light orange
  tealDark: "#D84315", // Dark orange
  amber: "#FFB84D", // Warm yellow
  amberLight: "#FFF3E0",
  coral: "#FF7043", // Orange
  coralLight: "#FFE8E3",
  
  // Shadows
  shadow: "0 2px 8px rgba(0,0,0,0.08)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.10)",
  shadowLg: "0 8px 24px rgba(0,0,0,0.12)",
};

export const FONT = "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif";

/* ── Compatibility Scoring Algorithm ────────────────────────── */
// Formula from Section 2.3.2 of PawMatch Mobile research paper:
// Score = (w1 · BreedMatch) + (w2 · AgeMatch) + (w3 · SexMatch) + (w4 · TemperamentMatch)
//
// Weights reflect relative importance of each attribute in responsible breeding:
//   w1 (Breed)        = 0.35 — same-breed pairings are most compatible
//   w2 (Temperament)  = 0.30 — temperament compatibility critical for offspring behavior
//   w3 (Age)          = 0.20 — age-appropriate pairing matters for health
//   w4 (Sex)          = 0.15 — opposite sex required, bonus for optimal age pairing

const W1_BREED = 0.35;
const W2_TEMPERAMENT = 0.30;
const W3_AGE = 0.20;
const W4_SEX = 0.15;

function parseAgeYears(age: string): number {
  // Handles: "2 yrs", "1.5 yrs", "1 yr", "3 years", "6mo"
  if (age.toLowerCase().includes("mo")) {
    const months = parseFloat(age);
    return months / 12;
  }
  return parseFloat(age) || 1;
}

function breedMatch(a: string, b: string): number {
  if (a.toLowerCase() === b.toLowerCase()) return 1.0;
  // Partial credit for related breeds (e.g. both retrievers)
  const aWords = a.toLowerCase().split(/\s+/);
  const bWords = b.toLowerCase().split(/\s+/);
  const shared = aWords.filter((w) => bWords.includes(w) && w.length > 3);
  return shared.length > 0 ? 0.5 : 0.0;
}

function ageMatch(ageA: string, ageB: string): number {
  const a = parseAgeYears(ageA);
  const b = parseAgeYears(ageB);
  const diff = Math.abs(a - b);
  // Ideal breeding age: 1–6 years; penalise large age gaps
  if (diff <= 1) return 1.0;
  if (diff <= 2) return 0.75;
  if (diff <= 3) return 0.5;
  return 0.25;
}

function sexMatch(sexA: "Male" | "Female", sexB: "Male" | "Female"): number {
  // For responsible breeding, opposite sex is required
  return sexA !== sexB ? 1.0 : 0.0;
}

function temperamentMatch(tempA: string[], tempB: string[]): number {
  if (tempA.length === 0 || tempB.length === 0) return 0.5;
  const setA = new Set(tempA.map((t) => t.toLowerCase()));
  const setB = new Set(tempB.map((t) => t.toLowerCase()));
  const overlap = [...setA].filter((t) => setB.has(t)).length;
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? overlap / union : 0;
}

/**
 * Calculates the PawMatch compatibility score (0–100) between two dogs.
 * Uses the weighted formula from Section 2.3.2 of the research paper.
 */
export function calculateCompatibilityScore(dogA: Dog, dogB: Dog): number {
  const breed = breedMatch(dogA.breed, dogB.breed);
  const age = ageMatch(dogA.age, dogB.age);
  const sex = sexMatch(dogA.sex, dogB.sex);
  const temp = temperamentMatch(dogA.temperament, dogB.temperament);

  const rawScore =
    W1_BREED * breed +
    W2_TEMPERAMENT * temp +
    W3_AGE * age +
    W4_SEX * sex;

  // Apply verification tier bonus: Tier 2 = +3%, Tier 3 = +5%
  const tierBonus = dogB.tier === 3 ? 0.05 : dogB.tier === 2 ? 0.03 : 0;

  return Math.min(Math.round((rawScore + tierBonus) * 100), 100);
}

/**
 * Returns dogs ranked by compatibility score against a reference dog.
 * Implements the "ranked recommendations, default top-3" feature.
 */
export function getRankedMatches(
  referenceDog: Dog,
  candidates: Dog[],
  topN = 3,
): Dog[] {
  return candidates
    .filter((d) => d.id !== referenceDog.id)
    .map((d) => ({ ...d, score: calculateCompatibilityScore(referenceDog, d) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}

/* ── Screen types ────────────────────────────────────────────── */
export type Screen =
  | "landing"
  | "splash"
  | "onboarding"
  | "register"
  | "login"
  | "home"
  | "match"
  | "filter"
  | "match-profile"
  | "send-request"
  | "request-received"
  | "dog-profile"
  | "owner-profile"
  | "verify-upload"
  | "verify-choose"
  | "verify-status"
  | "reputation"
  | "notifications"
  | "events"
  | "settings"
  | "empty-matches"
  | "empty-notif"
  | "empty-verify";

/* ── Types ───────────────────────────────────────────────────── */
export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: string;
  sex: "Male" | "Female";
  size: "Small" | "Medium" | "Large";
  color: string;
  temperament: string[];
  score: number;
  verified: boolean;
  tier: 1 | 2 | 3;
  ownerName: string;
  ownerLocation: string;
  ownerAvatar: string;
  img: string;
  rating: number;
  reviews: number;
}

export interface Verifier {
  id: string;
  name: string;
  role: string;
  clinic: string;
  rating: number;
  available: boolean;
  avatar: string;
}

/* ── Mock Data ───────────────────────────────────────────────── */
const IMGS = {
  bella:
    "https://images.unsplash.com/photo-1629740067905-bd3f515aa739?w=600&fit=crop",
  choco:
    "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=600&fit=crop",
  luna: "https://images.unsplash.com/photo-1693615775129-f2004d6e3e0b?w=600&fit=crop",
  bruno:
    "https://images.unsplash.com/photo-1637098063179-d73d8034621c?w=600&fit=crop",
  yuki: "https://images.unsplash.com/photo-1721781060617-2c451646fee7?w=600&fit=crop",
  rex: "https://images.unsplash.com/photo-1539692177343-b2b990faef15?w=600&fit=crop",
  kiko: "https://images.unsplash.com/photo-1721781010133-8eb0e9b23daf?w=600&fit=crop",
  ganda:
    "https://images.unsplash.com/photo-1693615774176-a5560f55ac49?w=600&fit=crop",
};
export { IMGS };

export const MOCK_DOGS: Dog[] = [
  {
    id: "d1",
    name: "Bella",
    breed: "Shih Tzu",
    age: "2 yrs",
    sex: "Female",
    size: "Small",
    color: "White & Brown",
    temperament: ["Friendly", "Calm", "Playful"],
    score: 94,
    verified: true,
    tier: 2,
    ownerName: "Maria Santos",
    ownerLocation: "Buhangin, Davao City",
    ownerAvatar: "MS",
    img: IMGS.bella,
    rating: 4.8,
    reviews: 12,
  },
  {
    id: "d2",
    name: "Choco",
    breed: "Golden Retriever",
    age: "3 yrs",
    sex: "Male",
    size: "Large",
    color: "Golden Brown",
    temperament: ["Friendly", "Active", "Playful"],
    score: 87,
    verified: true,
    tier: 2,
    ownerName: "Carlo Reyes",
    ownerLocation: "Matina, Davao City",
    ownerAvatar: "CR",
    img: IMGS.choco,
    rating: 4.5,
    reviews: 8,
  },
  {
    id: "d3",
    name: "Luna",
    breed: "Golden Retriever",
    age: "1.5 yrs",
    sex: "Female",
    size: "Large",
    color: "Light Gold",
    temperament: ["Calm", "Friendly"],
    score: 82,
    verified: false,
    tier: 1,
    ownerName: "Ana Lim",
    ownerLocation: "Toril, Davao City",
    ownerAvatar: "AL",
    img: IMGS.luna,
    rating: 4.2,
    reviews: 5,
  },
  {
    id: "d4",
    name: "Bruno",
    breed: "German Shepherd",
    age: "4 yrs",
    sex: "Male",
    size: "Large",
    color: "Black & Tan",
    temperament: ["Independent", "Calm"],
    score: 79,
    verified: true,
    tier: 3,
    ownerName: "Mark Villanueva",
    ownerLocation: "Agdao, Davao City",
    ownerAvatar: "MV",
    img: IMGS.bruno,
    rating: 4.9,
    reviews: 17,
  },
  {
    id: "d5",
    name: "Yuki",
    breed: "Pomeranian",
    age: "1 yr",
    sex: "Female",
    size: "Small",
    color: "White",
    temperament: ["Playful", "Friendly", "Active"],
    score: 91,
    verified: true,
    tier: 2,
    ownerName: "Jenny Cruz",
    ownerLocation: "Matina, Davao City",
    ownerAvatar: "JC",
    img: IMGS.yuki,
    rating: 4.7,
    reviews: 9,
  },
  {
    id: "d6",
    name: "Rex",
    breed: "Labrador Retriever",
    age: "3 yrs",
    sex: "Male",
    size: "Large",
    color: "Black",
    temperament: ["Friendly", "Active"],
    score: 76,
    verified: true,
    tier: 3,
    ownerName: "Ben Santos",
    ownerLocation: "Buhangin, Davao City",
    ownerAvatar: "BS",
    img: IMGS.rex,
    rating: 4.6,
    reviews: 14,
  },
];

export const MOCK_VERIFIERS: Verifier[] = [
  {
    id: "v1",
    name: "Dr. Patricia Reyes",
    role: "Licensed Veterinarian",
    clinic: "Davao Animal Clinic",
    rating: 4.9,
    available: true,
    avatar: "PR",
  },
  {
    id: "v2",
    name: "Dr. Eduardo Tan",
    role: "Certified Breeder",
    clinic: "Mindanao K9 Center",
    rating: 4.8,
    available: true,
    avatar: "ET",
  },
  {
    id: "v3",
    name: "Dr. Angela Flores",
    role: "Licensed Veterinarian",
    clinic: "City Pet Hospital",
    rating: 4.7,
    available: false,
    avatar: "AF",
  },
];

type DogRow = {
  id: string;
  name: string;
  breed: string;
  age: string;
  sex: Dog["sex"];
  size: Dog["size"];
  color: string;
  temperament: string[] | string | null;
  score: number;
  verified: boolean;
  tier: Dog["tier"];
  owner_name: string;
  owner_location: string;
  owner_avatar: string;
  img: string;
  rating: number;
  reviews: number;
};

type VerifierRow = {
  id: string;
  name: string;
  role: string;
  clinic: string;
  rating: number;
  available: boolean;
  avatar: string;
};

function mapDogRow(row: DogRow): Dog {
  return {
    id: row.id,
    name: row.name,
    breed: row.breed,
    age: row.age,
    sex: row.sex,
    size: row.size,
    color: row.color,
    temperament: Array.isArray(row.temperament)
      ? row.temperament
      : typeof row.temperament === "string"
        ? row.temperament.split(",").map((item) => item.trim()).filter(Boolean)
        : [],
    score: Number(row.score),
    verified: Boolean(row.verified),
    tier: row.tier,
    ownerName: row.owner_name,
    ownerLocation: row.owner_location,
    ownerAvatar: row.owner_avatar,
    img: row.img,
    rating: Number(row.rating),
    reviews: Number(row.reviews),
  };
}

function mapVerifierRow(row: VerifierRow): Verifier {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    clinic: row.clinic,
    rating: Number(row.rating),
    available: Boolean(row.available),
    avatar: row.avatar,
  };
}

/* ── Context ─────────────────────────────────────────────────── */
interface ContextType {
  screen: Screen;
  selectedDog: Dog | null;
  dogs: Dog[];
  verifiers: Verifier[];
  userName: string;
  user: User | null;
  session: Session | null;
  catalogReady: boolean;
  catalogError: string | null;
  authReady: boolean;
  authError: string | null;
  myDog: Dog; // The current user's primary dog (Bella) used as reference for scoring
  topMatches: Dog[]; // Top-3 ranked matches computed by the Compatibility Scoring Algorithm
  navigate: (s: Screen, dog?: Dog) => void;
  goBack: () => void;
  refreshCatalog: () => Promise<void>;
  signIn: (input: { email: string; password: string }) => Promise<void>;
  signUp: (input: { email: string; password: string; fullName?: string; location?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  createMatchRequest: (input: {
    dogId: string;
    requesterName: string;
    requesterEmail?: string;
    message?: string;
  }) => Promise<void>;
  createVerifierSubmission: (input: {
    dogId: string;
    verifierName: string;
    submissionType: string;
    documentUrl: string;
    notes?: string;
  }) => Promise<void>;
}

const Context = createContext<ContextType | null>(null);

export function V3Provider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("landing");
  const [history, setHistory] = useState<Screen[]>([]);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [dogs, setDogs] = useState<Dog[]>(MOCK_DOGS);
  const [verifiers, setVerifiers] = useState<Verifier[]>(MOCK_VERIFIERS);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [catalogReady, setCatalogReady] = useState(false);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // The current user's primary dog — used as reference for the Compatibility Scoring Algorithm
  // In a production build this would come from the user's profile; here we use dogs[0] (Bella)
  const myDog: Dog = dogs[0] ?? MOCK_DOGS[0];

  // Top-3 ranked matches computed by the Compatibility Scoring Algorithm (Section 2.3.2)
  const topMatches: Dog[] = getRankedMatches(myDog, dogs, 3);

  const loadCatalog = async () => {
    if (!supabase) {
      setDogs(MOCK_DOGS);
      setVerifiers(MOCK_VERIFIERS);
      setCatalogError(null);
      setCatalogReady(true);
      return;
    }

    try {
      setCatalogError(null);

      const [dogsResult, verifiersResult] = await Promise.all([
        supabase.from("dogs").select("*").order("score", { ascending: false }),
        supabase.from("verifiers").select("*").order("rating", { ascending: false }),
      ]);

      const dogRows = (dogsResult.data ?? []) as DogRow[];
      const verifierRows = (verifiersResult.data ?? []) as VerifierRow[];

      setDogs(dogRows.length > 0 ? dogRows.map(mapDogRow) : MOCK_DOGS);
      setVerifiers(
        verifierRows.length > 0 ? verifierRows.map(mapVerifierRow) : MOCK_VERIFIERS,
      );

      if (dogsResult.error || verifiersResult.error) {
        setCatalogError(
          dogsResult.error?.message || verifiersResult.error?.message || "Unable to load Supabase catalog.",
        );
      }
    } catch (error) {
      setDogs(MOCK_DOGS);
      setVerifiers(MOCK_VERIFIERS);
      setCatalogError(error instanceof Error ? error.message : "Unable to load Supabase catalog.");
    } finally {
      setCatalogReady(true);
    }
  };

  useEffect(() => {
    void loadCatalog();
  }, []);

  useEffect(() => {
    if (!supabase) {
      setAuthReady(true);
      return;
    }

    let mounted = true;

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!mounted) {
        return;
      }

      if (error) {
        setAuthError(error.message);
      }

      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setAuthReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setAuthReady(true);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const createMatchRequest: ContextType["createMatchRequest"] = async (input) => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.from("match_requests").insert({
      dog_id: input.dogId,
      requester_name: input.requesterName,
      requester_email: input.requesterEmail ?? null,
      message: input.message ?? null,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const createVerifierSubmission: ContextType["createVerifierSubmission"] = async (input) => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.from("verifier_submissions").insert({
      dog_id: input.dogId,
      verifier_name: input.verifierName,
      submission_type: input.submissionType,
      document_url: input.documentUrl,
      notes: input.notes ?? null,
    });

    if (error) {
      throw new Error(error.message);
    }
  };

  const signIn: ContextType["signIn"] = async ({ email, password }) => {
    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAuthError(error.message);
      throw new Error(error.message);
    }
  };

  const signUp: ContextType["signUp"] = async ({ email, password, fullName, location }) => {
    if (!supabase) {
      throw new Error("Supabase is not configured.");
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          location,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      throw new Error(error.message);
    }
  };

  const signOut: ContextType["signOut"] = async () => {
    if (!supabase) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      setAuthError(error.message);
      throw new Error(error.message);
    }
  };

  const navigate = (s: Screen, dog?: Dog) => {
    setHistory((h) => [...h, screen]);
    if (dog) setSelectedDog(dog);
    setScreen(s);
  };

  const goBack = () => {
    const prev = [...history];
    const last = prev.pop();
    setHistory(prev);
    if (last) setScreen(last);
  };

  return (
    <Context.Provider
      value={{
        screen,
        selectedDog,
        dogs,
        verifiers,
        userName: user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Guest",
        user,
        session,
        catalogReady,
        catalogError,
        authReady,
        authError,
        myDog,
        topMatches,
        navigate,
        goBack,
        refreshCatalog: loadCatalog,
        signIn,
        signUp,
        signOut,
        createMatchRequest,
        createVerifierSubmission,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useV3() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error("useV3 must be within V3Provider");
  return ctx;
}

/* ── Shared UI components ────────────────────────────────────── */
export function Btn({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  sm = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  sm?: boolean;
}) {
  const { TouchableOpacity, Text } = require("react-native");
  const styles: Record<string, any> = {
    primary: { backgroundColor: T.teal },
    secondary: {
      backgroundColor: "#fff",
      borderWidth: 1.5,
      borderColor: T.teal,
    },
    danger: { backgroundColor: T.coral },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: T.border,
    },
  };
  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        paddingHorizontal: sm ? 16 : 20,
        paddingVertical: sm ? 8 : 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <Text
        style={{
          fontSize: sm ? 12 : 14,
          fontWeight: "700",
          color:
            variant === "primary" || variant === "danger" ? "#fff" : variant === "secondary" ? T.teal : T.dark,
          fontFamily: FONT,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function Field({
  emoji,
  placeholder,
  type = "text",
  value,
}: {
  emoji: string;
  placeholder: string;
  type?: string;
  value?: string;
}) {
  const { View, Text, TextInput } = require("react-native");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        height: 52,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: T.border,
        backgroundColor: T.white,
      }}
    >
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <TextInput
        placeholder={placeholder}
        defaultValue={value}
        secureTextEntry={type === "password"}
        style={{
          flex: 1,
          fontSize: 14,
          color: T.dark,
          fontFamily: FONT,
        }}
        placeholderTextColor={T.medium}
      />
    </View>
  );
}

export function Chip({
  children,
  active,
  onPress,
}: {
  children: ReactNode;
  active?: boolean;
  onPress?: () => void;
}) {
  const { TouchableOpacity, Text } = require("react-native");
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: active ? T.teal : T.white,
        borderWidth: 1,
        borderColor: active ? T.teal : T.border,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: "600",
          color: active ? "#fff" : T.dark,
          fontFamily: FONT,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export function VeriBadge({
  verified,
  tier,
}: {
  verified?: boolean;
  tier?: number;
}) {
  const { View, Text } = require("react-native");

  // Tier 3: Expert-Verified by Certified Breeder (pedigree + highest trust)
  if (tier === 3)
    return (
      <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, backgroundColor: T.amberLight, flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Text style={{ fontSize: 10 }}>🏆</Text>
        <Text style={{ fontSize: 12, fontWeight: "700", color: "#8a5a00", fontFamily: FONT }}>
          Tier 3 · Breeder
        </Text>
      </View>
    );

  // Tier 2: Expert-Verified by Licensed Vet
  if (verified || tier === 2)
    return (
      <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, backgroundColor: T.tealLight, flexDirection: "row", alignItems: "center", gap: 3 }}>
        <Text style={{ fontSize: 10 }}>✅</Text>
        <Text style={{ fontSize: 12, fontWeight: "700", color: T.tealDark, fontFamily: FONT }}>
          Tier 2 · Vet Verified
        </Text>
      </View>
    );

  // Tier 1: Owner-Uploaded (pending expert review)
  return (
    <View style={{ paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, backgroundColor: T.amberLight, flexDirection: "row", alignItems: "center", gap: 3 }}>
      <Text style={{ fontSize: 10 }}>📋</Text>
      <Text style={{ fontSize: 12, fontWeight: "700", color: "#a06000", fontFamily: FONT }}>
        Tier 1 · Uploaded
      </Text>
    </View>
  );
}

export function ScoreBar({ score }: { score: number }) {
  const { View, Text } = require("react-native");
  const color = score >= 80 ? T.teal : score >= 60 ? T.amber : T.coral;
  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <Text style={{ fontSize: 11, color: T.medium, fontFamily: FONT }}>
          Compatibility Score
        </Text>
        <Text style={{ fontSize: 13, fontWeight: "700", color, fontFamily: FONT }}>
          {score}%
        </Text>
      </View>
      <View style={{ height: 8, borderRadius: 4, overflow: "hidden", backgroundColor: T.light }}>
        <View style={{ width: `${score}%`, height: "100%", borderRadius: 4, backgroundColor: color }} />
      </View>
    </View>
  );
}

export function TopBar({
  title,
  onBack,
  rightEmoji,
  onRight,
}: {
  title?: string;
  onBack?: () => void;
  rightEmoji?: string;
  onRight?: () => void;
}) {
  const { View, Text, TouchableOpacity } = require("react-native");
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 20,
        paddingTop: 48,
        paddingBottom: 12,
        backgroundColor: T.white,
        borderBottomWidth: 1,
        borderBottomColor: T.border,
      }}
    >
      {onBack && (
        <TouchableOpacity
          onPress={onBack}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: T.bg,
          }}
        >
          <Text style={{ fontSize: 18 }}>←</Text>
        </TouchableOpacity>
      )}
      {title && (
        <Text
          style={{
            flex: 1,
            fontWeight: "600",
            fontSize: 16,
            color: T.dark,
            fontFamily: FONT,
          }}
        >
          {title}
        </Text>
      )}
      {rightEmoji && onRight && (
        <TouchableOpacity onPress={onRight}>
          <Text style={{ fontSize: 20 }}>{rightEmoji}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

