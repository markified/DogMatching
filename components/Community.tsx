import { ArrowLeft, Award, Bell, Calendar, CheckCircle, Clock, CreditCard, FileText, Globe, Heart, HelpCircle, Info, MapPin, MessageSquare, PawPrint, Search, Settings, Shield, Star, Stethoscope, XCircle } from "lucide-react-native";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FONT, T, useV3 } from "../contexts/AppContext";

/* ── Reputation & History ──────────────────────────────────── */
export function ReputationScreen() {
  const { goBack } = useV3();
  const [tab, setTab] = useState<"badges" | "history" | "reviews">("reviews");

  const badges = [
    { Icon: CheckCircle, label: "Verified Owner" },
    { Icon: Stethoscope, label: "Health Champion" },
    { Icon: Heart, label: "Trusted Breeder" },
    { Icon: Calendar, label: "Active Member" },
    { Icon: Award, label: "Top Breeder" },
  ];
  const history = [
    {
      Icon: CheckCircle,
      t: "Match with Choco (Golden Retriever)",
      d: "June 2025",
      s: "Successful",
    },
    { Icon: Clock, t: "Match Request from Luna", d: "May 2025", s: "Pending" },
    { Icon: XCircle, t: "Match Declined", d: "April 2025", s: "Declined" },
    {
      Icon: CheckCircle,
      t: "Match with Rex (Labrador)",
      d: "March 2025",
      s: "Successful",
    },
  ];
  const reviews = [
    {
      avatar: "CR",
      name: "Carlo Reyes",
      dog: "Bruno",
      rating: 5,
      date: "May 2025",
      text: "Very cooperative and her dog's documents are complete and verified. Highly recommended!",
    },
    {
      avatar: "AL",
      name: "Ana Lim",
      dog: "Luna",
      rating: 5,
      date: "April 2025",
      text: "Excellent owner. Communication was great and Bella is in perfect health.",
    },
    {
      avatar: "MV",
      name: "Mark Villanueva",
      dog: "Rex",
      rating: 4,
      date: "March 2025",
      text: "Smooth process. Would definitely consider again for future partnerships.",
    },
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
          <Star size={18} color={T.dark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            Reputation & History
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 70 }}>
        {/* Owner card */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            backgroundColor: T.white,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: T.teal,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: "#fff" }}>
              J
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: T.dark,
                fontFamily: FONT,
              }}
            >
              Juan dela Cruz
            </Text>
            <View style={{ flexDirection: "row", gap: 2, marginVertical: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={14}
                  color={i <= 5 ? "#f59e0b" : "#d1d5db"}
                  fill={i <= 5 ? "#f59e0b" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </View>
            <Text style={{ fontSize: 12, color: T.medium }}>
              12 completed matches · Verified since 2025
            </Text>
          </View>
        </View>

        {/* Verification Tier Summary — Multi-tier trust indicator */}
        <View style={{ marginHorizontal: 20, marginTop: 12, marginBottom: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: "700", color: T.dark, marginBottom: 8, fontFamily: FONT }}>
            Multi-Tier Verification Status
          </Text>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {[
              { tier: 1, label: "Tier 1", desc: "Owner Uploaded", done: true, color: T.amber, textColor: "#8a5a00" },
              { tier: 2, label: "Tier 2", desc: "Vet Verified", done: true, color: T.teal, textColor: T.tealDark },
              { tier: 3, label: "Tier 3", desc: "Breeder Validated", done: false, color: T.light, textColor: T.medium },
            ].map((t) => (
              <View key={t.tier} style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: t.done ? (t.tier === 2 ? T.tealLight : T.amberLight) : T.bg, borderWidth: 1, borderColor: t.done ? t.color + "60" : T.border, alignItems: "center" }}>
                <Text style={{ fontSize: 11, fontWeight: "700", color: t.done ? t.textColor : T.medium }}>{t.label}</Text>
                <Text style={{ fontSize: 10, color: t.done ? t.textColor : T.medium, textAlign: "center", marginTop: 2 }}>{t.desc}</Text>
                <Text style={{ fontSize: 14, marginTop: 4 }}>{t.done ? "✅" : "⬜"}</Text>
              </View>
            ))}
          </View>
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
            ["badges", "Badges", Award],
            ["history", "History", FileText],
            ["reviews", "Reviews", MessageSquare],
          ].map(([id, l, Icon]) => (
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
                {l}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          {tab === "badges" && (
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {badges.map((b) => (
                <View
                  key={b.label}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: T.tealLight,
                    borderWidth: 1,
                    borderColor: T.teal + "30",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <b.Icon size={14} color={T.teal} strokeWidth={1.5} />
                  <Text
                    style={{ fontSize: 12, fontWeight: "600", color: T.teal }}
                  >
                    {b.label}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {tab === "history" &&
            history.map((h, i) => (
              <View
                key={i}
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
                  <h.Icon size={18} color={T.teal} strokeWidth={1.5} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: T.dark,
                    }}
                  >
                    {h.t}
                  </Text>
                  <Text style={{ fontSize: 12, color: T.medium }}>
                    {h.d}
                  </Text>
                </View>
                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    borderRadius: 12,
                    backgroundColor:
                      h.s === "Successful"
                        ? T.tealLight
                        : h.s === "Pending"
                          ? T.amberLight
                          : T.coralLight,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "700",
                      color:
                        h.s === "Successful"
                          ? T.teal
                          : h.s === "Pending"
                            ? "#a06000"
                            : T.coral,
                    }}
                  >
                    {h.s}
                  </Text>
                </View>
              </View>
            ))}

          {tab === "reviews" &&
            reviews.map((r, i) => (
              <View
                key={i}
                style={{
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: T.teal,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{ fontSize: 14, fontWeight: "700", color: "#fff" }}
                    >
                      {r.avatar}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{ fontSize: 14, fontWeight: "700", color: T.dark }}
                    >
                      {r.name}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          color={i <= r.rating ? "#f59e0b" : "#d1d5db"} 
                          fill={i <= r.rating ? "#f59e0b" : "none"}
                          strokeWidth={1.5} 
                        />
                      ))}
                      <Text
                        style={{ fontSize: 12, marginLeft: 4, color: T.medium }}
                      >
                        {r.date}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: T.dark,
                  }}
                >
                  {r.text}
                </Text>
                <Text style={{ fontSize: 12, marginTop: 6, color: T.medium }}>
                  re: {r.dog}
                </Text>
              </View>
            ))}
        </View>

        <View style={{ paddingHorizontal: 20, marginTop: 16 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              paddingVertical: 12,
              borderRadius: 12,
              backgroundColor: T.tealLight,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
              gap: 6
            }}
          >
            <MessageSquare size={16} color={T.teal} strokeWidth={1.5} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: T.teal,
                fontFamily: FONT,
              }}
            >
              Write a Review
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


/* ── Empty States & Additional Screens ────────────────────────── */
export function EmptyMatches() {
  const { navigate } = useV3();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: T.bg }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <PawPrint size={40} color={T.teal} strokeWidth={1.5} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center", color: T.dark, fontFamily: FONT }}>
        No Matches Yet
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: T.medium, marginBottom: 24 }}>
        Start exploring to find the perfect match for your dog!
      </Text>
      <TouchableOpacity
        onPress={() => navigate("match")}
        style={{ paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, backgroundColor: T.teal, flexDirection: "row", alignItems: "center", gap: 6 }}
      >
        <Search size={16} color="#fff" strokeWidth={2} />
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: FONT }}>
          Browse Matches
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function EmptyNotifications() {
  const { goBack } = useV3();
  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Bell size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Notifications
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.bg, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <Bell size={40} color={T.medium} strokeWidth={1.5} />
        </View>
        <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center", color: T.dark, fontFamily: FONT }}>
          No Notifications
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center", color: T.medium }}>
          You're all caught up!
        </Text>
      </View>
    </View>
  );
}

export function EmptyVerify() {
  const { navigate } = useV3();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24, backgroundColor: T.bg }}>
      <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
        <Shield size={40} color={T.teal} strokeWidth={1.5} />
      </View>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8, textAlign: "center", color: T.dark, fontFamily: FONT }}>
        Get Verified
      </Text>
      <Text style={{ fontSize: 16, textAlign: "center", color: T.medium, marginBottom: 24 }}>
        Upload your dog's documents to unlock verified matches!
      </Text>
      <TouchableOpacity
        onPress={() => navigate("verify-upload")}
        style={{ paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12, backgroundColor: T.teal, flexDirection: "row", alignItems: "center", gap: 6 }}
      >
        <Shield size={16} color="#fff" strokeWidth={2} />
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#fff", fontFamily: FONT }}>
          Start Verification
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function NotificationsScreen() {
  const { goBack } = useV3();
  const notifications = [
    { Icon: Heart, t: "New match request from Max", time: "2 min ago" },
    { Icon: CheckCircle, t: "Your document was verified", time: "1 hour ago" },
    { Icon: Star, t: "You received a 5-star review", time: "3 hours ago" },
    { Icon: Calendar, t: "Community meetup this Saturday", time: "1 day ago" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Bell size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Notifications
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={{ fontSize: 12, fontWeight: "600", color: T.teal }}>Mark all read</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, gap: 12, paddingBottom: 70 }}>
        {notifications.map((n, i) => (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 12, padding: 16, borderRadius: 16, backgroundColor: T.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center" }}>
              <n.Icon size={18} color={T.teal} strokeWidth={1.5} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "600", color: T.dark }}>{n.t}</Text>
              <Text style={{ fontSize: 12, color: T.medium, marginTop: 2 }}>{n.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function EventsScreen() {
  const { goBack } = useV3();
  const events = [
    { Icon: PawPrint, t: "PawMatch Dog Owners Meetup", date: "June 28, 2026", loc: "Davao City Park" },
    { Icon: Stethoscope, t: "Free Vet Consultation Day", date: "July 5, 2026", loc: "Mindanao Vet Clinic" },
    { Icon: Award, t: "Dog Training Workshop", date: "July 12, 2026", loc: "K9 Training Center" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Calendar size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Upcoming Events
          </Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, gap: 12, paddingBottom: 80 }}>
        {events.map((ev, i) => (
          <View key={i} style={{ padding: 16, borderRadius: 16, backgroundColor: T.white, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center" }}>
                <ev.Icon size={24} color={T.teal} strokeWidth={1.5} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark }}>{ev.t}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 }}>
                  <Calendar size={12} color={T.medium} strokeWidth={1.5} />
                  <Text style={{ fontSize: 12, color: T.medium }}>{ev.date}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <MapPin size={12} color={T.medium} strokeWidth={1.5} />
                  <Text style={{ fontSize: 12, color: T.medium }}>{ev.loc}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={{ paddingVertical: 10, borderRadius: 12, backgroundColor: T.teal, alignItems: "center", marginTop: 8, flexDirection: "row", justifyContent: "center", gap: 6 }}>
              <CheckCircle size={14} color="#fff" strokeWidth={2} />
              <Text style={{ fontSize: 12, fontWeight: "600", color: "#fff", fontFamily: FONT }}>RSVP</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function SettingsScreen() {
  const { goBack, user, userName } = useV3();
  const settings = [
    { Icon: Bell, t: "Notification Settings" },
    { Icon: Shield, t: "Privacy & Security" },
    { Icon: Globe, t: "Language & Region" },
    { Icon: CreditCard, t: "Payment Methods" },
    { Icon: HelpCircle, t: "Help & Support" },
    { Icon: FileText, t: "Terms & Privacy Policy" },
    { Icon: Info, t: "About PawMatch" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: T.bg }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 48, paddingBottom: 12, flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <TouchableOpacity onPress={goBack}>
          <ArrowLeft size={20} color={T.dark} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, flex: 1 }}>
          <Settings size={18} color={T.dark} strokeWidth={1.5} />
          <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
            Settings
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12, backgroundColor: T.white, borderBottomWidth: 1, borderBottomColor: T.border }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {user?.user_metadata?.avatar_url ? (
            <Image
              source={{ uri: user.user_metadata.avatar_url }}
              style={{ width: 44, height: 44, borderRadius: 22 }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: T.teal, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>
                {(user?.user_metadata?.full_name || user?.email || userName)
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </Text>
            </View>
          )}
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: T.dark, fontFamily: FONT }}>
              {user?.user_metadata?.full_name || userName}
            </Text>
            <Text style={{ fontSize: 12, color: T.medium }}>
              {user?.email || "Signed in with Supabase"}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 16, paddingBottom: 80 }}>
        <View style={{ borderRadius: 16, overflow: "hidden", backgroundColor: T.white }}>
          {settings.map((s, i) => (
            <TouchableOpacity key={s.t} style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: i < settings.length - 1 ? 1 : 0, borderBottomColor: T.border }}>
              <s.Icon size={20} color={T.dark} strokeWidth={1.5} />
              <Text style={{ flex: 1, fontSize: 14, fontWeight: "500", color: T.dark, fontFamily: FONT }}>{s.t}</Text>
              <Text style={{ fontSize: 16, color: T.medium }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
