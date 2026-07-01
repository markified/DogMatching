import { ArrowLeft, Award, Bell, Calendar, Camera, CheckCircle, Clock, Dna, Edit, FileCheck, FileText, LogOut, MapPin, MessageSquare, PawPrint, Plus, Send, Settings, Star, Stethoscope, Syringe, User } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import {
    calculateCompatibilityScore,
    Dog,
    FONT,
    IMGS,
    T,
    useV3,
    VeriBadge,
} from "../contexts/AppContext";

/* ── Dog Profile (My Dog) ────────────────────────────────────── */
export function DogProfile() {
  const { navigate, goBack, dogs } = useV3();
  const [tab, setTab] = useState<"info" | "health" | "gallery">("info");
  const dog =
    dogs[0] ??
    ({
      id: "fallback-dog",
      name: "Bella",
      breed: "Shih Tzu",
      age: "2 years",
      sex: "Female",
      size: "Small",
      color: "White & Brown",
      temperament: ["Friendly", "Calm", "Energetic"],
      score: 94,
      verified: true,
      tier: 2,
      ownerName: "Maria Santos",
      ownerLocation: "Buhangin, Davao City",
      ownerAvatar: "MS",
      img: IMGS.bella,
      rating: 4.8,
      reviews: 12,
    } as Dog);

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 48,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: T.white,
          borderBottomWidth: 1,
          borderBottomColor: T.border,
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text
          style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}
        >
          My Dog's Profile
        </Text>
        <TouchableOpacity>
          <Edit size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Dog avatar */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 24,
            paddingBottom: 20,
            backgroundColor: T.white,
          }}
        >
          <View style={{ position: "relative", marginBottom: 12 }}>
            <Image
              source={{ uri: dog.img }}
              style={{
                width: 112,
                height: 112,
                borderRadius: 56,
                borderWidth: 4,
                borderColor: T.teal,
              }}
              resizeMode="cover"
            />
            <View style={{ position: "absolute", bottom: 4, right: 4 }}>
              <VeriBadge verified tier={2} />
            </View>
          </View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            {dog.name}
          </Text>
          <Text style={{ fontSize: 14, color: T.medium }}>
            {dog.breed} • {dog.age} • {dog.sex}
          </Text>
        </View>

        {/* Tabs */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 16,
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: T.border,
            marginBottom: 16,
          }}
        >
          {[
            ["info", "Basic Info", FileText],
            ["health", "Health", Stethoscope],
            ["gallery", "Gallery", Camera],
          ].map(([id, label, Icon]) => (
            <TouchableOpacity
              key={id}
              onPress={() => setTab(id as any)}
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor: tab === id ? T.teal : T.white,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 6
              }}
            >
              {/* @ts-ignore */}
              <Icon size={14} color={tab === id ? "#fff" : T.medium} strokeWidth={1.5} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: tab === id ? "#fff" : T.medium,
                  fontFamily: FONT,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {tab === "info" && (
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            <View
              style={{
                borderRadius: 16,
                padding: 16,
                backgroundColor: T.white,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              {[
                ["Breed", dog.breed],
                ["Age", dog.age],
                ["Sex", dog.sex],
                ["Size", dog.size],
                ["Color", dog.color],
              ].map(([k, v], i, arr) => (
                <View
                  key={k}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    borderBottomWidth: i < arr.length - 1 ? 1 : 0,
                    borderBottomColor: T.bg,
                  }}
                >
                  <Text style={{ fontSize: 14, color: T.medium }}>{k}</Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: T.dark }}
                  >
                    {v}
                  </Text>
                </View>
              ))}
              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontSize: 14, color: T.medium, marginBottom: 8 }}>
                  Temperament
                </Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                  {dog.temperament.map((t) => (
                    <View
                      key={t}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 12,
                        backgroundColor: T.tealLight,
                      }}
                    >
                      <Text style={{ fontSize: 12, color: T.teal }}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}

        {tab === "health" && (
          <View style={{ paddingHorizontal: 20, gap: 12 }}>
            {[
              {
                Icon: Syringe,
                t: "Vaccination Card",
                s: "verified",
                by: "Dr. Santos, DVM",
                date: "Jan 2025",
              },
              {
                Icon: Stethoscope,
                t: "Vet Health Clearance",
                s: "verified",
                by: "Dr. Reyes, DVM",
                date: "Feb 2025",
              },
              {
                Icon: FileCheck,
                t: "Pedigree Papers",
                s: "pending",
                by: null,
                date: null,
              },
              {
                Icon: Dna,
                t: "DNA / Genetic Test",
                s: "upload",
                by: null,
                date: null,
              },
            ].map((d) => (
              <View
                key={d.t}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: T.white,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center" }}>
                  <d.Icon size={18} color={T.teal} strokeWidth={1.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ fontSize: 14, fontWeight: "600", color: T.dark }}
                  >
                    {d.t}
                  </Text>
                  {d.by && (
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <CheckCircle size={12} color={T.teal} strokeWidth={2} />
                      <Text style={{ fontSize: 12, color: T.medium }}>
                        Verified by {d.by} • {d.date}
                      </Text>
                    </View>
                  )}
                </View>
                {d.s === "verified" && (
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      backgroundColor: T.tealLight,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <CheckCircle size={12} color={T.teal} strokeWidth={2} />
                    <Text style={{ fontSize: 12, fontWeight: "700", color: T.teal }}>
                      Verified
                    </Text>
                  </View>
                )}
                {d.s === "pending" && (
                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      borderRadius: 12,
                      backgroundColor: T.amberLight,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <Clock size={12} color="#a06000" strokeWidth={2} />
                    <Text
                      style={{ fontSize: 12, fontWeight: "700", color: "#a06000" }}
                    >
                      Pending
                    </Text>
                  </View>
                )}
                {d.s === "upload" && (
                  <TouchableOpacity
                    onPress={() => navigate("verify-upload")}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 12,
                      backgroundColor: T.tealLight,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 4
                    }}
                  >
                    <Plus size={12} color={T.teal} strokeWidth={2} />
                    <Text style={{ fontSize: 12, fontWeight: "700", color: T.teal }}>
                      Upload
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {/* Verification tier */}
            <View
              style={{
                padding: 16,
                borderRadius: 16,
                backgroundColor: T.tealLight,
                borderWidth: 1,
                borderColor: T.teal + "30",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Award size={16} color={T.teal} strokeWidth={1.5} />
                <Text
                  style={{ fontSize: 14, fontWeight: "700", color: T.teal }}
                >
                  Verification Status
                </Text>
              </View>
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: T.tealDark }}
              >
                TIER 2 — Expert Verified
              </Text>
              <Text style={{ fontSize: 12, color: T.teal, marginTop: 4 }}>
                Verified by Dr. Patricia Reyes, Licensed Vet • March 2025
              </Text>
              <TouchableOpacity style={{ marginTop: 8 }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    textDecorationLine: "underline",
                    color: T.teal,
                  }}
                >
                  View Audit Trail →
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {tab === "gallery" && (
          <View style={{ paddingHorizontal: 20 }}>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {[IMGS.bella, IMGS.yuki, IMGS.kiko].map((img, i) => (
                <Image
                  key={i}
                  source={{ uri: img }}
                  style={{
                    width: "31%",
                    height: 100,
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                />
              ))}
              <TouchableOpacity
                style={{
                  width: "31%",
                  height: 100,
                  borderRadius: 12,
                  backgroundColor: T.tealLight,
                  borderWidth: 2,
                  borderColor: T.teal + "50",
                  borderStyle: "dashed",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Plus size={24} color={T.teal} strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

/* ── Owner Profile ─────────────────────────────────────────────── */
export function OwnerProfile() {
  const { navigate, goBack, user, userName, dogs, signOut } = useV3();
  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null;
  const avatarInitials =
    user?.user_metadata?.full_name
      ?.split(/\s+/)
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user?.email?.slice(0, 2).toUpperCase() ||
    "U";
  const profileLocation = user?.user_metadata?.location || "Davao City";
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "Jan 2025";

  const settings = [
    { Icon: Bell, t: "Notification Preferences", s: "notifications" as const },
    { Icon: FileText, t: "Privacy & Security", s: "settings" as const },
    { Icon: FileCheck, t: "My Documents", s: "verify-upload" as const },
    { Icon: User, t: "Help & Support", s: "settings" as const },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 48,
          paddingBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          backgroundColor: T.white,
          borderBottomWidth: 1,
          borderBottomColor: T.border,
        }}
      >
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <User size={18} color={T.dark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            My Profile
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Profile header */}
        <View
          style={{
            alignItems: "center",
            paddingTop: 24,
            paddingBottom: 20,
            paddingHorizontal: 20,
            backgroundColor: T.white,
          }}
        >
          <View style={{ position: "relative", marginBottom: 12 }}>
            {avatarUrl ? (
              <Image
                source={{ uri: avatarUrl }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: T.teal,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "700", color: "#fff" }}>
                  {avatarInitials}
                </Text>
              </View>
            )}
            <View style={{ position: "absolute", bottom: -4, right: -4 }}>
              <Award size={20} color="#f59e0b" fill="#f59e0b" strokeWidth={1.5} />
            </View>
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            {user?.user_metadata?.full_name || userName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <MapPin size={12} color={T.medium} strokeWidth={1.5} />
            <Text style={{ fontSize: 14, color: T.medium }}>{profileLocation}</Text>
            <Text style={{ fontSize: 14, color: T.medium }}> • </Text>
            <Calendar size={12} color={T.medium} strokeWidth={1.5} />
            <Text style={{ fontSize: 14, color: T.medium }}>
              Member since {memberSince}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
            {[1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={1.5} />
            ))}
            <Star size={14} color="#d1d5db" strokeWidth={1.5} />
            <Text
              style={{ fontSize: 14, fontWeight: "700", marginLeft: 4, color: T.dark }}
            >
              4.8 / 5.0
            </Text>
          </View>
        </View>

        {/* My dogs */}
        <View style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <PawPrint size={18} color={T.dark} strokeWidth={1.5} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: T.dark,
                fontFamily: FONT,
              }}
            >
              My Dogs
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 4 }}
          >
            {dogs.slice(0, 2).map((dog) => (
              <TouchableOpacity
                key={dog.id}
                onPress={() => navigate("dog-profile")}
                style={{
                  alignItems: "center",
                  gap: 6,
                  padding: 12,
                  borderRadius: 16,
                  backgroundColor: T.white,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 2,
                  width: 100,
                }}
              >
                <View style={{ position: "relative" }}>
                  <Image
                    source={{ uri: dog.img }}
                    style={{ width: 64, height: 64, borderRadius: 12 }}
                    resizeMode="cover"
                  />
                  <View style={{ position: "absolute", bottom: -4, right: -4 }}>
                    {dog.verified ? (
                      <CheckCircle size={16} color={T.teal} fill={T.white} strokeWidth={2} />
                    ) : (
                      <Clock size={16} color="#a06000" fill={T.white} strokeWidth={2} />
                    )}
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "700",
                    color: T.dark,
                    textAlign: "center",
                  }}
                >
                  {dog.name}
                </Text>
                <Text
                  style={{ fontSize: 12, color: T.medium, textAlign: "center" }}
                >
                  {dog.breed}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => navigate("dog-profile")}
              style={{
                width: 80,
                height: 120,
                borderRadius: 16,
                backgroundColor: T.tealLight,
                borderWidth: 2,
                borderColor: T.teal + "50",
                borderStyle: "dashed",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
              }}
            >
              <Plus size={24} color={T.teal} strokeWidth={1.5} />
              <Text
                style={{ fontSize: 12, fontWeight: "600", color: T.teal }}
              >
                Add Dog
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Reputation summary */}
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 20,
            padding: 16,
            borderRadius: 16,
            backgroundColor: T.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <Star size={16} color={T.dark} strokeWidth={1.5} />
            <Text
              style={{ fontSize: 14, fontWeight: "700", color: T.dark }}
            >
              Reputation & History
            </Text>
          </View>
          <Text style={{ fontSize: 12, color: T.medium }}>
            12 successful matches • 8 reviews • Member 1.5 years
          </Text>
          <TouchableOpacity
            onPress={() => navigate("reputation")}
            style={{ marginTop: 8 }}
          >
            <Text
              style={{ fontSize: 12, fontWeight: "600", color: T.teal }}
            >
              View Full Reputation →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Settings size={18} color={T.dark} strokeWidth={1.5} />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: T.dark,
                fontFamily: FONT,
              }}
            >
              Settings
            </Text>
          </View>
          <View
            style={{
              borderRadius: 16,
              overflow: "hidden",
              backgroundColor: T.white,
            }}
          >
            {settings.map((s, i) => (
              <TouchableOpacity
                key={s.t}
                onPress={() => navigate(s.s)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderBottomWidth: i < settings.length - 1 ? 1 : 0,
                  borderBottomColor: T.border,
                }}
              >
                <s.Icon size={20} color={T.dark} strokeWidth={1.5} />
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: "500",
                    color: T.dark,
                    fontFamily: FONT,
                  }}
                >
                  {s.t}
                </Text>
                <Text style={{ fontSize: 16, color: T.medium }}>›</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => void signOut().then(() => navigate("landing"))}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                paddingHorizontal: 16,
                paddingVertical: 16,
              }}
            >
              <LogOut size={20} color={T.coral} strokeWidth={1.5} />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: "500",
                  color: T.coral,
                  fontFamily: FONT,
                }}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


/* ── Match Profile (Other Dog) ───────────────────────────────── */
export function MatchProfileScreen() {
  const { navigate, goBack, selectedDog, dogs, myDog } = useV3();
  const dog = selectedDog || dogs[1] || dogs[0];
  const liveScore = calculateCompatibilityScore(myDog, dog);

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
          {dog.name}'s Profile
        </Text>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
        <View style={{ alignItems: "center", paddingTop: 24, paddingBottom: 20, backgroundColor: T.white }}>
          <Image source={{ uri: dog.img }} style={{ width: 112, height: 112, borderRadius: 56, borderWidth: 4, borderColor: T.teal }} resizeMode="cover" />
          <Text style={{ fontSize: 24, fontWeight: "700", marginTop: 12, color: T.dark, fontFamily: FONT }}>{dog.name}</Text>
          <Text style={{ fontSize: 14, color: T.medium }}>{dog.breed} · {dog.age} · {dog.sex}</Text>
          <View style={{ marginTop: 8 }}><VeriBadge verified={dog.verified} tier={dog.tier} /></View>
        </View>

        <View style={{ paddingHorizontal: 20, paddingVertical: 20, gap: 12 }}>
          {/* Compatibility Score Panel */}
          <View style={{ padding: 16, borderRadius: 16, backgroundColor: T.primaryLight, borderWidth: 1, borderColor: T.primary + "40" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <Award size={16} color={T.primaryDark} strokeWidth={1.5} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: T.primaryDark, fontFamily: FONT }}>
                Compatibility with {myDog.name}
              </Text>
              <View style={{ marginLeft: "auto", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, backgroundColor: T.primary }}>
                <Text style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}>{liveScore}%</Text>
              </View>
            </View>
            {/* Score factor breakdown */}
            {[
              { label: "Breed Match", value: dog.breed === myDog.breed ? "Same breed ✓" : "Different breed", good: dog.breed === myDog.breed },
              { label: "Sex Compatibility", value: dog.sex !== myDog.sex ? "Opposite sex ✓" : "Same sex", good: dog.sex !== myDog.sex },
              { label: "Age Range", value: `${myDog.age} → ${dog.age}`, good: true },
              { label: "Temperament", value: dog.temperament.filter(t => myDog.temperament.includes(t)).length > 0 ? `${dog.temperament.filter(t => myDog.temperament.includes(t)).length} shared traits` : "Different traits", good: dog.temperament.filter(t => myDog.temperament.includes(t)).length > 0 },
            ].map((f) => (
              <View key={f.label} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderTopWidth: 1, borderTopColor: T.primary + "20" }}>
                <Text style={{ fontSize: 13, color: T.primaryDark }}>{f.label}</Text>
                <Text style={{ fontSize: 13, fontWeight: "600", color: f.good ? T.primaryDark : T.medium }}>{f.value}</Text>
              </View>
            ))}
          </View>

          {/* Basic Info */}
          <View style={{ padding: 16, borderRadius: 16, backgroundColor: T.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <FileText size={16} color={T.dark} strokeWidth={1.5} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: T.dark }}>Basic Info</Text>
            </View>
            {[["Breed", dog.breed], ["Age", dog.age], ["Sex", dog.sex], ["Size", dog.size], ["Color", dog.color]].map(([k, v]) => (
              <View key={k} style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: T.bg }}>
                <Text style={{ fontSize: 14, color: T.medium }}>{k}</Text>
                <Text style={{ fontSize: 14, fontWeight: "600", color: T.dark }}>{v}</Text>
              </View>
            ))}
          </View>

          {/* Verification status */}
          <View style={{ padding: 16, borderRadius: 16, backgroundColor: T.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <CheckCircle size={16} color={T.dark} strokeWidth={1.5} />
              <Text style={{ fontSize: 14, fontWeight: "700", color: T.dark }}>Verification</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={{ fontSize: 14, color: T.medium }}>Tier Status</Text>
              <VeriBadge verified={dog.verified} tier={dog.tier} />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingTop: 8 }}>
              <Text style={{ fontSize: 14, color: T.medium }}>Owner Rating</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Star size={14} color="#f59e0b" fill="#f59e0b" strokeWidth={1.5} />
                <Text style={{ fontSize: 14, fontWeight: "600", color: T.dark }}>{dog.rating} ({dog.reviews} reviews)</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigate("send-request", dog)} style={{ width: "100%", paddingVertical: 14, borderRadius: 12, backgroundColor: T.teal, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 }}>
            <Send size={16} color="#fff" strokeWidth={2} />
            <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: FONT }}>Send Match Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

/* ── Send Request ────────────────────────────────────────────── */
export function SendRequest() {
  const { navigate, goBack, selectedDog, dogs, createMatchRequest, user, userName } = useV3();
  const dog = selectedDog || dogs[0] || (dogs[0] as Dog);
  const requesterName = user?.user_metadata?.full_name || userName;
  const requesterEmail = user?.email || undefined;

  const submitRequest = async () => {
    await createMatchRequest({
      dogId: dog.id,
      requesterName,
      requesterEmail,
      message: "Hi, I’d like to request a match.",
    });
    navigate("request-received");
  };

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Send size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Send Request
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20, gap: 16, paddingBottom: 120 }}>
        <View style={{ padding: 16, borderRadius: 16, backgroundColor: T.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
          <Text style={{ fontSize: 14, fontWeight: "700", marginBottom: 8, color: T.dark }}>Sending request to:</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <Image source={{ uri: dog.img }} style={{ width: 48, height: 48, borderRadius: 12 }} resizeMode="cover" />
            <View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark }}>{dog.name}</Text>
              <Text style={{ fontSize: 12, color: T.medium }}>{dog.breed} • {dog.ownerName}</Text>
            </View>
          </View>
        </View>
        <View style={{ padding: 16, borderRadius: 16, backgroundColor: T.white }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 }}>
            <MessageSquare size={16} color={T.dark} strokeWidth={1.5} />
            <Text style={{ fontSize: 14, fontWeight: "700", color: T.dark }}>Message (Optional)</Text>
          </View>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Write a message to the owner..."
            placeholderTextColor={T.medium}
            multiline
            numberOfLines={4}
            style={{ borderRadius: 12, borderWidth: 1, borderColor: T.border, padding: 12, minHeight: 100, backgroundColor: T.bg, fontSize: 14, color: T.dark, textAlignVertical: "top" }}
          />
        </View>
        <TouchableOpacity onPress={() => void submitRequest()} style={{ width: "100%", paddingVertical: 14, borderRadius: 12, backgroundColor: T.teal, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 6 }}>
          <CheckCircle size={16} color="#fff" strokeWidth={2} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: FONT }}>Send Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ── Request Received ────────────────────────────────────────── */
export function RequestReceived() {
  const { navigate, goBack } = useV3();

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Send size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Match Request
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Send size={40} color={T.teal} strokeWidth={1.5} />
        </View>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center", color: T.dark, fontFamily: FONT }}>
          Request Sent!
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: T.medium, marginBottom: 24 }}>
          You'll be notified when the owner responds to your request.
        </Text>
        <TouchableOpacity onPress={() => navigate("home")} style={{ paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, backgroundColor: T.teal, flexDirection: "row", alignItems: "center", gap: 6 }}>
          <ArrowLeft size={16} color="#fff" strokeWidth={2} />
          <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: FONT }}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
