import { ArrowLeft, Award, Camera, CheckCircle, Clock, Dna, FileCheck, FolderOpen, RotateCcw, Search, Shield, Star, Stethoscope, Syringe, Upload, XCircle } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FONT, T, useV3 } from "../contexts/AppContext";

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: T.white,
        borderBottomWidth: 1,
        borderBottomColor: T.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "600", color: T.teal }}>
          Step {step} of {total}
        </Text>
        <View style={{ flexDirection: "row", gap: 6 }}>
          {Array.from({ length: total }, (_, i) => (
            <View
              key={i}
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: i < step ? T.teal : T.bg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color: i < step ? "#fff" : T.medium,
                }}
              >
                ●
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          height: 6,
          borderRadius: 3,
          backgroundColor: T.bg,
          overflow: "hidden",
        }}
      >
        <View
          style={{
            width: `${(step / total) * 100}%`,
            height: "100%",
            backgroundColor: T.teal,
          }}
        />
      </View>
    </View>
  );
}

const DOC_TYPES = [
  { Icon: Syringe, t: "Vaccination Card", req: true },
  { Icon: Stethoscope, t: "Veterinary Health Clearance", req: false },
  { Icon: FileCheck, t: "Pedigree Certificate", req: false },
  { Icon: Dna, t: "DNA / Genetic Test Result", req: false },
];

/* ── Screen 9A: Upload ─────────────────────────────────────── */
export function VerifyUpload() {
  const { navigate, goBack, dogs, createVerifierSubmission, user, userName } = useV3();
  const [selected, setSelected] = useState(0);
  const [uploaded, setUploaded] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const doUpload = () =>
    setUploaded((p) => p.map((v, i) => (i === selected ? true : v)));

  const submitUpload = async () => {
    const documentType = DOC_TYPES[selected]?.t ?? DOC_TYPES[0].t;
    await createVerifierSubmission({
      dogId: dogs[0]?.id ?? "11111111-1111-1111-1111-111111111111",
      verifierName: user?.user_metadata?.full_name || userName,
      submissionType: documentType,
      documentUrl: "https://example.com/uploaded-document.pdf",
      notes: "Uploaded from the app verification flow.",
    });
    navigate("verify-choose");
  };

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
          <Shield size={18} color={T.dark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            Verify Your Dog's Profile
          </Text>
        </View>
      </View>
      <ProgressBar step={1} total={3} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 20,
          paddingBottom: 120,
        }}
      >
        <Text style={{ fontSize: 14, color: T.medium }}>
          Upload documents to earn your verification badge. More documents =
          higher tier.
        </Text>

        {/* Trust score preview */}
        <View
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
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Award size={16} color={T.dark} strokeWidth={1.5} />
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: T.dark }}
              >
                Trust Score Preview
              </Text>
            </View>
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 12,
                backgroundColor:
                  uploaded.filter(Boolean).length >= 2
                    ? T.tealLight
                    : T.amberLight,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "700",
                  color:
                    uploaded.filter(Boolean).length >= 2 ? T.teal : "#a06000",
                }}
              >
                {uploaded.filter(Boolean).length === 0
                  ? "No tier yet"
                  : uploaded.filter(Boolean).length === 1
                    ? "Tier 1"
                    : "Tier 2 progress"}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 12,
              borderRadius: 6,
              backgroundColor: T.bg,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                width: `${Math.min(uploaded.filter(Boolean).length * 33, 100)}%`,
                height: "100%",
                backgroundColor: T.teal,
              }}
            />
          </View>
        </View>

        {/* Document type selector */}
        <View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              marginBottom: 12,
              color: T.dark,
            }}
          >
            Choose Document Type
          </Text>
          <View style={{ gap: 8 }}>
            {DOC_TYPES.map((d, i) => (
              <TouchableOpacity
                key={d.t}
                onPress={() => setSelected(i)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: selected === i ? T.tealLight : T.white,
                  borderWidth: 1.5,
                  borderColor: selected === i ? T.teal : T.border,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 2,
                }}
              >
                <Text style={{ fontSize: 24 }}>{d.e}</Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: T.dark,
                    }}
                  >
                    {d.t}
                  </Text>
                  {d.req && (
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: T.coral,
                      }}
                    >
                      Required
                    </Text>
                  )}
                </View>
                {uploaded[i] ? (
                  <CheckCircle size={20} color={T.teal} fill={T.tealLight} strokeWidth={2} />
                ) : selected === i ? (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: T.teal,
                      backgroundColor: T.teal,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "#fff",
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: T.border,
                    }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Upload area */}
        <View
          style={{
            borderRadius: 16,
            padding: 24,
            alignItems: "center",
            gap: 12,
            borderWidth: 2,
            borderColor: T.teal + "50",
            borderStyle: "dashed",
            backgroundColor: T.tealLight,
          }}
        >
          <View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: T.white, alignItems: "center", justifyContent: "center" }}>
            <Upload size={28} color={T.teal} strokeWidth={1.5} />
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "600", color: T.teal, textAlign: "center" }}
          >
            Tap to upload or take a photo
          </Text>
          <Text style={{ fontSize: 12, color: T.medium, textAlign: "center" }}>
            JPG, PNG, PDF — Max 10MB
          </Text>
          <View style={{ flexDirection: "row", gap: 12, marginTop: 4 }}>
            <TouchableOpacity
              onPress={doUpload}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: T.teal,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              }}
            >
              <Camera size={14} color="#fff" strokeWidth={2} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                Take Photo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={doUpload}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: T.white,
                borderWidth: 1,
                borderColor: T.teal,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              }}
            >
              <FolderOpen size={14} color={T.teal} strokeWidth={2} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: T.teal,
                }}
              >
                Choose File
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: T.white,
          borderTopWidth: 1,
          borderTopColor: T.border,
        }}
      >
        <TouchableOpacity
          onPress={() => void submitUpload()}
          style={{
            width: "100%",
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: T.teal,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#fff",
              fontFamily: FONT,
            }}
          >
            Next →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Screen 9B: Choose Verifier ─────────────────────────────── */
export function VerifyChoose() {
  const { navigate, goBack, verifiers } = useV3();
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = verifiers.filter((v) =>
    v.name.toLowerCase().includes(search.toLowerCase()),
  );

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
          <Shield size={18} color={T.dark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            Choose Your Verifier
          </Text>
        </View>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <RotateCcw size={14} color={T.coral} strokeWidth={2} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: T.coral,
                fontFamily: FONT,
              }}
            >
              Reset
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ProgressBar step={2} total={3} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: 16,
          paddingBottom: 120,
        }}
      >
        <Text style={{ fontSize: 14, color: T.medium }}>
          Select a licensed veterinarian or certified breeder to review your
          documents.
        </Text>

        {/* Search */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 16,
            height: 48,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: T.border,
            backgroundColor: T.white,
          }}
        >
          <Search size={18} color={T.medium} strokeWidth={1.5} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for a vet or breeder"
            placeholderTextColor={T.medium}
            style={{
              flex: 1,
              fontSize: 14,
              color: T.dark,
              fontFamily: FONT,
            }}
          />
        </View>

        {/* Verifier cards */}
        {filtered.map((v) => (
          <TouchableOpacity
            key={v.id}
            onPress={() => setSelected(v.id)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 16,
              padding: 16,
              borderRadius: 16,
              backgroundColor: T.white,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 8,
              elevation: 2,
              borderWidth: 2,
              borderColor: selected === v.id ? T.teal : T.border,
            }}
          >
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: T.teal,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>
                {v.avatar}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: T.dark }}
              >
                {v.name}
              </Text>
              <Text style={{ fontSize: 12, color: T.medium }}>
                {v.role}
              </Text>
              <Text style={{ fontSize: 12, color: T.medium }}>
                {v.clinic}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Star size={12} color="#f59e0b" fill="#f59e0b" strokeWidth={1.5} />
                  <Text style={{ fontSize: 12 }}>{v.rating}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: v.available ? "#22c55e" : T.coral,
                    }}
                  />
                  <Text style={{ fontSize: 12 }}>
                    {v.available ? "Available" : "Busy"}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: selected === v.id ? T.teal : T.white,
                borderWidth: 1.5,
                borderColor: T.teal,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              }}
            >
              {selected === v.id ? (
                <>
                  <CheckCircle size={14} color="#fff" strokeWidth={2} />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    Selected
                  </Text>
                </>
              ) : (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "600",
                    color: T.teal,
                  }}
                >
                  Select
                </Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom button */}
      <View
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          paddingHorizontal: 20,
          paddingVertical: 12,
          backgroundColor: T.white,
          borderTopWidth: 1,
          borderTopColor: T.border,
        }}
      >
        <TouchableOpacity
          onPress={() => navigate("verify-status")}
          disabled={!selected}
          style={{
            width: "100%",
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: selected ? T.teal : T.light,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: selected ? "#fff" : T.medium,
              fontFamily: FONT,
            }}
          >
            Send for Review →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ── Screen 9C: Verification Status ─────────────────────────── */
export function VerifyStatus() {
  const { navigate, goBack } = useV3();
  const [docStatus] = useState<"pending" | "verified" | "rejected">("verified");

  const statusMap = {
    pending: {
      Icon: Clock,
      label: "Under Review",
      color: T.amber,
      bg: T.amberLight,
    },
    verified: { Icon: CheckCircle, label: "Verified!", color: T.teal, bg: T.tealLight },
    rejected: { Icon: XCircle, label: "Rejected", color: T.coral, bg: T.coralLight },
  };
  const s = statusMap[docStatus];

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
          <Shield size={18} color={T.dark} strokeWidth={1.5} />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: T.dark,
              fontFamily: FONT,
            }}
          >
            Verification Status
          </Text>
        </View>
      </View>
      <ProgressBar step={3} total={3} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 24,
          gap: 20,
          paddingBottom: 32,
        }}
      >
        {/* Status card */}
        <View
          style={{
            padding: 20,
            borderRadius: 16,
            backgroundColor: T.white,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Syringe size={16} color={T.dark} strokeWidth={1.5} />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 2,
                    color: T.dark,
                  }}
                >
                  Vaccination Card
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: s.bg,
              }}
            >
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: s.color }}
              >
                {s.e} {s.label}
              </Text>
            </View>
          </View>
          {[
            ["Submitted", "June 24, 2026"],
            ["Reviewer", "Dr. Patricia Reyes, DVM"],
          ].map(([k, v], i) => (
            <View
              key={k}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 8,
                borderTopWidth: 1,
                borderTopColor: T.bg,
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
        </View>

        {/* Verified result */}
        {docStatus === "verified" && (
          <View style={{ alignItems: "center", gap: 16, paddingVertical: 16 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.tealLight, alignItems: "center", justifyContent: "center" }}>
              <CheckCircle size={48} color={T.teal} strokeWidth={1.5} />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                textAlign: "center",
                color: T.dark,
                fontFamily: FONT,
              }}
            >
              Your document has been verified!
            </Text>
            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: T.amberLight,
                flexDirection: "row",
                alignItems: "center",
                gap: 6
              }}
            >
              <Award size={16} color="#8a5a00" strokeWidth={1.5} />
              <Text
                style={{ fontSize: 14, fontWeight: "700", color: "#8a5a00" }}
              >
                Badge awarded: Tier 2 Verified
              </Text>
            </View>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textDecorationLine: "underline",
                  color: T.teal,
                }}
              >
                View Audit Trail
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Rejected result */}
        {docStatus === "rejected" && (
          <View style={{ alignItems: "center", gap: 16, paddingVertical: 16 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.coralLight, alignItems: "center", justifyContent: "center" }}>
              <XCircle size={48} color={T.coral} strokeWidth={1.5} />
            </View>
            <View
              style={{
                padding: 16,
                borderRadius: 16,
                width: "100%",
                backgroundColor: T.coralLight,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  color: T.coral,
                  textAlign: "center",
                }}
              >
                Reason for rejection:
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 4,
                  color: T.dark,
                  textAlign: "center",
                }}
              >
                Document appears blurry and unreadable. Please re-upload a
                clearer photo.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigate("verify-upload")}
              style={{
                width: "100%",
                paddingVertical: 14,
                borderRadius: 12,
                backgroundColor: T.teal,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 6
              }}
            >
              <RotateCcw size={16} color="#fff" strokeWidth={2} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "#fff",
                  fontFamily: FONT,
                }}
              >
                Re-upload Document
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Pending */}
        {docStatus === "pending" && (
          <View style={{ alignItems: "center", gap: 16, paddingVertical: 32 }}>
            <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: T.amberLight, alignItems: "center", justifyContent: "center" }}>
              <Clock size={48} color="#a06000" strokeWidth={1.5} />
            </View>
            <Text
              style={{ fontSize: 20, fontWeight: "700", color: T.dark }}
            >
              Under Review
            </Text>
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
                color: T.medium,
              }}
            >
              Dr. Reyes will review your document within 24–48 hours. You'll get
              a notification when it's done.
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => navigate("dog-profile")}
          style={{
            width: "100%",
            paddingVertical: 14,
            borderRadius: 12,
            backgroundColor: T.teal,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 6
          }}
        >
          <ArrowLeft size={16} color="#fff" strokeWidth={2} />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: "#fff",
              fontFamily: FONT,
            }}
          >
            Back to Profile
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
