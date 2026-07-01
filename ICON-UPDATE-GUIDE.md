# PawMatch Icon Update Guide 🐾

## ⚠️ Current Issue
The splash screen and app icons show a **blue "A" icon** instead of PawMatch branding with **orange theme** (#FF7043).

---

## ✅ Fixed in app.json

### 1. Android Adaptive Icon Background
- **Before**: `#E6F4FE` (light blue)
- **After**: `#FFE8E3` (light orange) ✅

### 2. Splash Screen Background
- **Before**: `#ffffff` (white)
- **After**: `#FFE8E3` (light orange) ✅

### 3. Dark Mode Splash
- **Before**: `#000000` (pure black)
- **After**: `#2C2C2A` (dark gray matching app theme) ✅

---

## 🎨 Icon Files to Replace

You need to replace these PNG image files with PawMatch-themed designs:

### Required Icon Files:
```
d:\DogMatching\assets\images\
├── icon.png                          (Main app icon - 1024x1024)
├── splash-icon.png                   (Splash screen icon - 200x200 or larger)
├── android-icon-foreground.png       (Android adaptive icon foreground)
├── android-icon-background.png       (Android adaptive icon background)
├── android-icon-monochrome.png       (Android monochrome icon)
└── favicon.png                       (Web favicon - 48x48)
```

---

## 🎨 Design Recommendations

### Color Palette (PawMatch Orange Theme):
- **Primary Orange**: `#FF7043`
- **Light Orange Background**: `#FFE8E3`
- **Dark Orange**: `#D84315`
- **White**: `#FFFFFF`

### Icon Design Options:

#### Option 1: Paw Print Icon 🐾
```
- Orange paw print (#FF7043) on white/light orange background
- Simple, recognizable, pet-focused
- Matches "PawMatch" name perfectly
```

#### Option 2: Heart + Paw Combo ❤️🐾
```
- Heart shape with paw print inside
- Represents love/matching + dogs
- Orange heart with white paw or vice versa
```

#### Option 3: Two Paws Meeting 🤝
```
- Two paw prints touching/connecting
- Symbolizes dog matching/meeting
- Orange gradient or solid orange
```

---

## 🛠️ How to Create Icons

### Method 1: Online Icon Generator (Easiest)
1. Use **App Icon Generator** tools:
   - https://www.appicon.co/
   - https://icon.kitchen/
   - https://www.figma.com/ (free design tool)

2. Upload or create your design with:
   - Orange paw print
   - 1024x1024px for main icon
   - Export all required sizes

### Method 2: Canva (Quick & Free)
1. Go to https://www.canva.com/
2. Create 1024x1024px design
3. Use paw print elements + orange colors
4. Download as PNG
5. Use icon generator to create all sizes

### Method 3: Design from Scratch
Use any design tool (Figma, Adobe Illustrator, Inkscape):
1. Create 1024x1024px canvas
2. Design orange paw print icon
3. Export as PNG with transparent background
4. Generate all required sizes

---

## 📱 After Replacing Icons

### 1. Clear Expo Cache
```bash
npx expo start -c
```

### 2. Rebuild App
For Android:
```bash
npx expo prebuild --clean
```

For testing on Expo Go:
```bash
npx expo start
```

### 3. Verify Changes
- ✅ Splash screen shows orange background
- ✅ Icon matches PawMatch branding
- ✅ Colors consistent throughout

---

## 🎯 Quick Fix (If You Want to Keep Current Icons Temporarily)

The splash screen will now show an **orange/peach background** (#FFE8E3) instead of white, which is more on-brand with PawMatch. The blue "A" icon will be visible on the orange background until you replace the icon files.

---

## 📝 Icon Specifications Summary

| File | Size | Purpose | Background |
|------|------|---------|------------|
| `icon.png` | 1024x1024 | Main app icon | Transparent or solid |
| `splash-icon.png` | 200x200+ | Splash screen center | Transparent (shows on #FFE8E3) |
| `android-icon-foreground.png` | 432x432 | Android adaptive | Transparent |
| `android-icon-background.png` | 432x432 | Android adaptive | Solid #FFE8E3 |
| `android-icon-monochrome.png` | 432x432 | Android themed | Black/White only |
| `favicon.png` | 48x48 | Web browser | Transparent |

---

## 🚀 Next Steps

1. ✅ **Config Updated** - `app.json` now has orange theme colors
2. ⚠️ **Icons Pending** - Replace PNG files in `assets/images/` folder
3. ✅ **Cache Clear** - Run `npx expo start -c` after replacing icons

**The color scheme is now consistent!** Just replace the icon image files when ready. 🎨
