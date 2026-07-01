import { Heart, Home, Shield, Star, User } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT, Screen, T, useV3 } from "../contexts/AppContext";

const NAV_TABS: { icon: any; label: string; screens: Screen[] }[] = [
  { icon: Home, label: "Home", screens: ["home"] },
  {
    icon: Heart,
    label: "Match",
    screens: [
      "match",
      "filter",
      "match-profile",
      "send-request",
      "request-received",
    ],
  },
  { icon: User, label: "Profile", screens: ["dog-profile", "owner-profile"] },
  {
    icon: Shield,
    label: "Verify",
    screens: [
      "verify-upload",
      "verify-choose",
      "verify-status",
      "empty-verify",
    ],
  },
  {
    icon: Star,
    label: "Community",
    screens: [
      "reputation",
      "notifications",
      "events",
      "empty-notif",
      "empty-matches",
    ],
  },
];

// Screens that should NOT show the bottom navigation
const SCREENS_WITHOUT_NAV: Screen[] = [
  "landing",
  "splash",
  "onboarding",
  "register",
  "login",
];

const SCREENS_WITH_NAV: Screen[] = [
  "home",
  "match",
  "filter",
  "match-profile",
  "send-request",
  "request-received",
  "dog-profile",
  "owner-profile",
  "verify-upload",
  "verify-choose",
  "verify-status",
  "reputation",
  "notifications",
  "events",
  "settings",
  "empty-matches",
  "empty-notif",
  "empty-verify",
];

export function BottomNav() {
  const { screen, navigate } = useV3();

  const activeTab = NAV_TABS.findIndex((t) => t.screens.includes(screen));

  return (
    <View
      style={[
        styles.bottomNav,
        { backgroundColor: T.white, borderTopColor: T.border },
      ]}
    >
      {NAV_TABS.map((tab, i) => {
        const isActive = i === activeTab;
        const dest = tab.screens[0];
        const IconComponent = tab.icon;
        
        return (
          <TouchableOpacity
            key={tab.label}
            onPress={() => navigate(dest)}
            style={styles.navTab}
          >
            <IconComponent 
              size={24} 
              color={isActive ? T.primary : T.medium}
              strokeWidth={1.5}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.navLabel,
                { 
                  color: isActive ? T.primary : T.medium,
                  fontFamily: FONT,
                },
              ]}
            >
              {tab.label}
            </Text>
            {isActive && (
              <View
                style={[styles.activeDot, { backgroundColor: T.primary }]}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  const { screen } = useV3();
  
  // Only show navigation if screen is in the WITH_NAV list
  const showNav = SCREENS_WITH_NAV.includes(screen);

  return (
    <View style={styles.shell}>
      <View style={styles.content}>{children}</View>
      {showNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 70,
    paddingHorizontal: 4,
    borderTopWidth: 1,
  },
  navTab: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingHorizontal: 4,
    paddingVertical: 6,
    minWidth: 60,
  },
  navLabel: {
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
    numberOfLines: 1,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 1,
  },
});
