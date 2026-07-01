import { Heart, Lock, Mail, MapPin, PawPrint, Shield, ShieldCheck, Star, User, Users } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FONT, T, useV3 } from "../contexts/AppContext";

/* ── Splash Screen ────────────────────────────────────────────── */
export function Splash() {
  const { navigate } = useV3();
  
  useEffect(() => {
    const timer = setTimeout(() => navigate("onboarding"), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <View style={[styles.container, { backgroundColor: T.primary }]}>
      <View style={styles.centerContent}>
        <View style={styles.splashLogoContainer}>
          <Heart size={60} color="#fff" strokeWidth={2} />
        </View>
        <View>
          <Text style={[styles.splashTitle, { fontFamily: FONT }]}>
            PawMatch
          </Text>
          <Text style={[styles.splashSubtitle, { fontFamily: FONT }]}>
            Verified. Local. Trusted.
          </Text>
        </View>
      </View>
      <View style={styles.loadingDots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={styles.dot} />
        ))}
      </View>
    </View>
  );
}

/* ── Onboarding Carousel ─────────────────────────────────────── */
const SLIDES = [
  {
    Icon: Heart,
    title: "Find Your Dog's Perfect Match",
    sub: "Smart compatibility scoring for responsible breeding in Davao City.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified Health Records",
    sub: "Upload documents and get verified by licensed vets or certified breeders.",
  },
  {
    Icon: Users,
    title: "Connect with Confidence",
    sub: "Reputation pages, badges, and interaction history so you always know who you're dealing with.",
  },
];

export function Onboarding() {
  const { navigate } = useV3();
  const [slide, setSlide] = useState(0);
  const s = SLIDES[slide];
  const isLast = slide === SLIDES.length - 1;
  const IconComponent = s.Icon;

  return (
    <View style={[styles.container, { backgroundColor: T.white }]}>
      {/* Top skip */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigate("login")}>
          <Text style={[styles.skipText, { color: T.medium, fontFamily: FONT }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Illustration area */}
      <View style={styles.onboardingContent}>
        <View style={[styles.illustrationBox, { backgroundColor: T.tealLight }]}>
          <IconComponent size={80} color={T.primary} strokeWidth={1.5} />
        </View>
        <View style={styles.textCenter}>
          <Text style={[styles.onboardingTitle, { color: T.dark, fontFamily: FONT }]}>
            {s.title}
          </Text>
          <Text style={[styles.onboardingSubtitle, { color: T.medium, fontFamily: FONT }]}>
            {s.sub}
          </Text>
        </View>
      </View>

      {/* Dots */}
      <View style={styles.dotsContainer}>
        {SLIDES.map((_, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => setSlide(i)}
            style={[
              styles.onboardingDot,
              {
                width: i === slide ? 24 : 8,
                backgroundColor: i === slide ? T.teal : T.light,
              },
            ]}
          />
        ))}
      </View>

      {/* CTA */}
      <View style={styles.ctaContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: T.teal }]}
          onPress={() => isLast ? navigate("register") : setSlide(slide + 1)}
        >
          <Text style={[styles.buttonText, { fontFamily: FONT }]}>
            {isLast ? "Get Started" : "Next →"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Register ────────────────────────────────────────────────── */
export function Register() {
  const { navigate, signUp } = useV3();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("Davao City, Philippines");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await signUp({ email, password, fullName, location });
      navigate("home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: T.white }]}>
      <View style={[styles.header, { backgroundColor: T.teal }]}>
        <Text style={[styles.headerText, { fontFamily: FONT }]}>
          Create Your Account
        </Text>
      </View>
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.formContainer}>
        <InputField icon={User} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
        <InputField icon={Mail} placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <InputField icon={Lock} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <InputField icon={Lock} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <InputField icon={MapPin} placeholder="Location" value={location} onChangeText={setLocation} />
        {error ? (
          <Text style={{ color: T.coral, fontSize: 12, fontFamily: FONT }}>{error}</Text>
        ) : null}
        
        <View style={styles.checkboxRow}>
          <View style={styles.checkbox} />
          <Text style={[styles.checkboxText, { color: T.medium, fontFamily: FONT }]}>
            I agree to PawMatch's{" "}
            <Text style={{ color: T.teal, fontWeight: "600" }}>Terms of Service</Text>
            {" "}and{" "}
            <Text style={{ color: T.teal, fontWeight: "600" }}>Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: T.teal }]}
          onPress={() => void handleRegister()}
          disabled={busy}
        >
          <Text style={[styles.buttonText, { fontFamily: FONT }]}>{busy ? "Creating..." : "Create Account"}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: T.border }]} />
          <Text style={[styles.dividerText, { color: T.medium }]}>or continue with</Text>
          <View style={[styles.dividerLine, { backgroundColor: T.border }]} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, { borderColor: "#E0E0E0" }]}>
            <View style={styles.socialIconContainer}>
              <View style={[styles.socialIcon, { backgroundColor: "#4285F4" }]}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>G</Text>
              </View>
              <Text style={[styles.socialButtonText, { fontFamily: FONT }]}>
                Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { borderColor: "#E0E0E0" }]}>
            <View style={styles.socialIconContainer}>
              <View style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>f</Text>
              </View>
              <Text style={[styles.socialButtonText, { fontFamily: FONT }]}>
                Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigate("login")}>
          <Text style={[styles.linkText, { color: T.medium, fontFamily: FONT }]}>
            Already have an account?{" "}
            <Text style={{ color: T.teal, fontWeight: "600" }}>Log in</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ── Login ───────────────────────────────────────────────────── */
export function Login() {
  const { navigate, signIn } = useV3();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setBusy(true);
    setError(null);
    try {
      await signIn({ email, password });
      navigate("home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: T.white }]}>
      <View style={[styles.header, { backgroundColor: T.teal }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <PawPrint size={20} color="#fff" strokeWidth={2} />
          <Text style={[styles.headerText, { fontFamily: FONT }]}>
            Welcome Back
          </Text>
        </View>
      </View>
      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.formContainer}>
        <InputField icon={Mail} placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <View>
          <InputField icon={Lock} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotPasswordText, { color: T.teal, fontFamily: FONT }]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={{ color: T.coral, fontSize: 12, fontFamily: FONT }}>{error}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, { backgroundColor: T.teal }]}
          onPress={() => void handleLogin()}
          disabled={busy}
        >
          <Text style={[styles.buttonText, { fontFamily: FONT }]}>{busy ? "Logging in..." : "Log In"}</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={[styles.dividerLine, { backgroundColor: T.border }]} />
          <Text style={[styles.dividerText, { color: T.medium }]}>or continue with</Text>
          <View style={[styles.dividerLine, { backgroundColor: T.border }]} />
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={[styles.socialButton, { borderColor: "#E0E0E0" }]}>
            <View style={styles.socialIconContainer}>
              <View style={[styles.socialIcon, { backgroundColor: "#4285F4" }]}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>G</Text>
              </View>
              <Text style={[styles.socialButtonText, { fontFamily: FONT }]}>
                Google
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.socialButton, { borderColor: "#E0E0E0" }]}>
            <View style={styles.socialIconContainer}>
              <View style={[styles.socialIcon, { backgroundColor: "#1877F2" }]}>
                <Text style={{ color: "#fff", fontSize: 14, fontWeight: "700" }}>f</Text>
              </View>
              <Text style={[styles.socialButtonText, { fontFamily: FONT }]}>
                Facebook
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Demo shortcuts */}
        <View style={[styles.demoBox, { backgroundColor: T.tealLight }]}>
          <Text style={[styles.demoTitle, { color: T.teal }]}>
            Demo — tap to login:
          </Text>
          {[
            { label: "Dog Owner", Icon: PawPrint, act: () => navigate("home") },
            { label: "Verifier", Icon: Shield, act: () => navigate("verify-upload") },
            { label: "View Reputation", Icon: Star, act: () => navigate("reputation") },
          ].map((d) => (
            <TouchableOpacity key={d.label} onPress={d.act}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <d.Icon size={14} color={T.tealDark} strokeWidth={1.5} />
                <Text style={[styles.demoOption, { color: T.tealDark, fontFamily: FONT }]}>
                  {d.label}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity onPress={() => navigate("register")}>
          <Text style={[styles.linkText, { color: T.medium, fontFamily: FONT }]}>
            New here?{" "}
            <Text style={{ color: T.teal, fontWeight: "600" }}>Create an account</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

/* ── Input Field Component ───────────────────────────────────── */
function InputField({ 
  icon: Icon,
  placeholder, 
  secureTextEntry, 
  keyboardType, 
  value,
  onChangeText,
}: { 
  icon: any;
  placeholder: string; 
  secureTextEntry?: boolean;
  keyboardType?: any;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  return (
    <View style={[styles.inputContainer, { borderColor: T.border, backgroundColor: T.white }]}>
      <Icon size={20} color={T.medium} strokeWidth={1.5} />
      <TextInput
        style={[styles.input, { color: T.dark }]}
        placeholder={placeholder}
        placeholderTextColor={T.medium}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

/* ── Styles ──────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  splashLogoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  splashTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  splashSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    marginTop: 4,
  },
  loadingDots: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    bottom: 64,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  topBar: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 16,
    alignItems: "flex-end",
  },
  skipText: {
    fontSize: 14,
    fontWeight: "500",
  },
  onboardingContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 32,
  },
  illustrationBox: {
    width: 192,
    height: 192,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  illustrationEmoji: {
    fontSize: 80,
  },
  textCenter: {
    alignItems: "center",
  },
  onboardingTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
  },
  onboardingSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  onboardingDot: {
    height: 8,
    borderRadius: 4,
  },
  ctaContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 12,
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
  },
  scrollContent: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
    gap: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: T.border,
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
  },
  socialButtons: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  socialIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: T.dark,
  },
  linkText: {
    fontSize: 14,
    textAlign: "center",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 6,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: "600",
  },
  demoBox: {
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: "700",
  },
  demoOption: {
    fontSize: 12,
    fontWeight: "500",
    paddingVertical: 6,
  },
});
