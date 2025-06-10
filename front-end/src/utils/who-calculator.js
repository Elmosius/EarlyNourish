class WHOCalculator {
  interpretZScoreFromAPI(zScoreData) {
    const results = {};

    Object.keys(zScoreData).forEach((indicator) => {
      const zScore = zScoreData[indicator];
      if (typeof zScore === "number") {
        results[indicator] = {
          zScore: parseFloat(zScore.toFixed(2)),
          status: this.interpretZScore(indicator, zScore),
          indicator: this.getIndicatorName(indicator),
          category: this.getIndicatorCategory(indicator),
          color: this.getStatusColor(this.interpretZScore(indicator, zScore)),
        };
      }
    });

    return results;
  }

  interpretZScore(indicator, zScore) {
    const interpretations = {
      "bb-u": {
        severe: { threshold: -3, status: "Gizi Buruk" },
        moderate: { threshold: -2, status: "Gizi Kurang" },
        normal: { min: -2, max: 1, status: "Gizi Baik" },
        over: { threshold: 1, status: "Risiko Gizi Lebih" },
      },
      "tb-u": {
        severe: { threshold: -3, status: "Stunting Berat" },
        moderate: { threshold: -2, status: "Stunting Ringan" },
        normal: { min: -2, max: 3, status: "Normal" },
        over: { threshold: 3, status: "Tinggi" },
      },
      "bb-tb": {
        severe: { threshold: -3, status: "Wasting Berat" },
        moderate: { threshold: -2, status: "Wasting Ringan" },
        normal: { min: -2, max: 1, status: "Normal" },
        over: { threshold: 1, status: "Risiko Gemuk" },
        obese: { threshold: 2, status: "Gemuk" },
      },
    };

    const rules = interpretations[indicator];
    if (!rules) return "Data tidak tersedia";

    if (zScore < rules.severe.threshold) return rules.severe.status;
    if (zScore < rules.moderate.threshold) return rules.moderate.status;
    if (zScore >= rules.normal.min && zScore <= rules.normal.max)
      return rules.normal.status;
    if (indicator === "bb-tb" && zScore > rules.obese.threshold)
      return rules.obese.status;
    if (zScore > (rules.over?.threshold || rules.normal.max))
      return rules.over?.status || rules.obese?.status;

    return rules.normal.status;
  }

  // Helper functions
  getIndicatorName(indicator) {
    const names = {
      "bb-u": "Berat Berdasarkan Umur",
      "tb-u": "Tinggi Berdasarkan Umur",
      "bb-tb": "Berat Berdasarkan Tinggi",
    };
    return names[indicator] || indicator;
  }

  getIndicatorCategory(indicator) {
    const categories = {
      "bb-u": "weight-for-age",
      "tb-u": "height-for-age",
      "bb-tb": "weight-for-height",
    };
    return categories[indicator] || indicator;
  }

  getStatusColor(status) {
    if (
      status.includes("Normal") ||
      status.includes("Baik") ||
      status.includes("Tinggi")
    ) {
      return "green";
    }
    if (
      status.includes("Ringan") ||
      status.includes("Kurang") ||
      status.includes("Risiko")
    ) {
      return "yellow";
    }
    if (
      status.includes("Berat") ||
      status.includes("Buruk") ||
      status.includes("Gemuk")
    ) {
      return "red";
    }
    return "gray";
  }

  // Fungsi untuk convert ke format progress bar yang lebih meaningful
  getProgressBarData(indicator, zScore) {
    // Target ideal untuk setiap indikator (Z-score = 0)
    // Progress bar menunjukkan seberapa dekat dengan ideal

    const idealZScore = 0; // Target ideal
    const maxDeviation = 3; // Maksimal deviasi yang dianggap

    // Hitung jarak dari ideal (absolut)
    const deviation = Math.abs(zScore - idealZScore);

    // Hitung persentase kesehatan (semakin dekat ke 0, semakin baik)
    let healthPercentage;

    if (deviation <= 1) {
      // Sangat baik (90-100%)
      healthPercentage = 100 - deviation * 10;
    } else if (deviation <= 2) {
      // Baik (70-90%)
      healthPercentage = 90 - (deviation - 1) * 20;
    } else if (deviation <= 3) {
      // Perlu perhatian (40-70%)
      healthPercentage = 70 - (deviation - 2) * 30;
    } else {
      // Perlu tindakan (0-40%)
      healthPercentage = Math.max(0, 40 - (deviation - 3) * 10);
    }

    return {
      percentage: Math.round(Math.max(0, Math.min(100, healthPercentage))),
      target: "Z-score: 0 (Ideal)",
      current: zScore,
      status: this.getHealthStatus(deviation),
    };
  }

  // Status kesehatan berdasarkan deviasi dari ideal
  getHealthStatus(deviation) {
    if (deviation <= 1) return "Sangat Baik";
    if (deviation <= 2) return "Baik";
    if (deviation <= 3) return "Perlu Perhatian";
    return "Perlu Tindakan";
  }

  // Alternative: Progress bar berdasarkan zona WHO
  getWHOZoneProgress(zScore) {
    // Progress bar berdasarkan zona WHO
    // Zona hijau (normal) = 100%
    // Zona kuning (perlu perhatian) = 50-80%
    // Zona merah (perlu tindakan) = 0-50%

    if (zScore >= -2 && zScore <= 2) {
      // Zona normal - progress berdasarkan posisi dalam zona normal
      const normalizedInZone = (zScore + 2) / 4; // 0-1
      return Math.round(80 + normalizedInZone * 20); // 80-100%
    } else if (zScore >= -3 && zScore < -2) {
      // Zona kuning bawah
      const normalizedInZone = (zScore + 3) / 1; // 0-1
      return Math.round(50 + normalizedInZone * 30); // 50-80%
    } else if (zScore > 2 && zScore <= 3) {
      // Zona kuning atas
      const normalizedInZone = 1 - (zScore - 2) / 1; // 1-0
      return Math.round(50 + normalizedInZone * 30); // 80-50%
    } else {
      // Zona merah
      return Math.min(
        50,
        Math.max(
          0,
          Math.round(50 - Math.abs(zScore - (zScore > 0 ? 3 : -3)) * 10),
        ),
      );
    }
  }

  // Interpretasi yang lebih detail
  getDetailedInterpretation(indicator, zScore) {
    const basic = this.interpretZScore(indicator, zScore);
    const progressData = this.getProgressBarData(indicator, zScore);

    return {
      status: basic,
      healthStatus: progressData.status,
      percentage: progressData.percentage,
      target: progressData.target,
      recommendation: this.getRecommendation(indicator, zScore),
    };
  }

  // Rekomendasi berdasarkan Z-score
  getRecommendation(indicator, zScore) {
    if (Math.abs(zScore) <= 1) {
      return "Pertahankan pola makan dan aktivitas saat ini";
    } else if (Math.abs(zScore) <= 2) {
      return "Konsultasi dengan ahli gizi untuk penyesuaian";
    } else {
      return "Segera konsultasi dengan dokter anak";
    }
  }

  // Fungsi untuk convert ke format progress bar
  zScoreToProgressPercent(zScore) {
    // Normalisasi Z-score ke persentase (0-100%)
    // Range -3 sd +3 = 0% sd 100%
    if (zScore <= -3) return 0;
    if (zScore >= 3) return 100;
    return Math.round(((zScore + 3) / 6) * 100);
  }

  // Fungsi untuk mendapatkan kategori pertumbuhan sederhana
  getGrowthCategory(indicator, zScore) {
    if (zScore < -2) return "Pertumbuhan terhambat";
    if (zScore > 2) return "Pertumbuhan lebih";
    return "Pertumbuhan normal";
  }
}

// Export singleton instance
export const whoCalculator = new WHOCalculator();
