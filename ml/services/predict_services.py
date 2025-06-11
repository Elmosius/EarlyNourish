import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from schemas.predict_schemas import StuntingInput, StuntingOutput
from core.config import settings
from pathlib import Path
from typing import Optional, Dict, Any

class WHOZScoreCalculator:
    """
    Calculator untuk menghitung z-score berdasarkan data WHO secara langsung
    menggunakan metode LMS (Lambda-Mu-Sigma)
    """
    
    def __init__(self, data_folder_path: str = None):
        if data_folder_path is None:
            current_file_dir = Path(__file__).parent.absolute()
            self.data_folder = current_file_dir.parent / "data_who"
        else:
            self.data_folder = Path(data_folder_path)
        
        self.tables = {}
        self._load_who_tables()
    
    def _load_who_tables(self):
        """Load semua tabel WHO yang diperlukan"""
        try:
            # Mapping file names
            file_mappings = {
                'wfa_boys': 'data-who-berat-lk.csv',     
                'wfa_girls': 'data-who-berat-pr.csv',       
                'hfa_boys': 'data-who-tinggi-lk.csv',    
                'hfa_girls': 'data-who-tinggi-pr.csv',   
                'wfh_boys': 'data-who-berat-tinggi-lk.csv',
                'wfh_girls': 'data-who-berat-tinggi-pr.csv' 
            }
            
            for table_name, filename in file_mappings.items():
                file_path = self.data_folder / filename
                
                if file_path.exists():
                    df = pd.read_csv(file_path)
                    df.columns = df.columns.str.strip()
                    
                    # Standardize column names
                    if 'Month' in df.columns:
                        df = df.rename(columns={'Month': 'age_key'})
                    elif 'Length' in df.columns:
                        df = df.rename(columns={'Length': 'age_key'})
                    
                    self.tables[table_name] = df.set_index('age_key')
                    
        except Exception as e:
            self.tables = {}
    
    def _interpolate_lms(self, df: pd.DataFrame, key_value: float) -> Optional[Dict[str, float]]:
        """
        Interpolasi nilai L, M, S dari tabel WHO untuk key_value tertentu
        """
        if df is None or df.empty:
            return None
            
        try:
            # Exact match
            if key_value in df.index:
                row = df.loc[key_value]
                return {
                    'L': float(row['L']),
                    'M': float(row['M']), 
                    'S': float(row['S'])
                }
            
            # Interpolation
            available_keys = df.index.values
            lower_keys = available_keys[available_keys <= key_value]
            upper_keys = available_keys[available_keys >= key_value]
            
            if len(lower_keys) == 0:
                min_key = available_keys.min()
                row = df.loc[min_key]
                return {
                    'L': float(row['L']),
                    'M': float(row['M']),
                    'S': float(row['S'])
                }
            
            if len(upper_keys) == 0:
                max_key = available_keys.max()
                row = df.loc[max_key]
                return {
                    'L': float(row['L']),
                    'M': float(row['M']),
                    'S': float(row['S'])
                }
            
            # Linear interpolation
            x0 = lower_keys.max()
            x1 = upper_keys.min()
            
            if x0 == x1:
                row = df.loc[x0]
                return {
                    'L': float(row['L']),
                    'M': float(row['M']),
                    'S': float(row['S'])
                }
            
            row0 = df.loc[x0]
            row1 = df.loc[x1]
            
            factor = (key_value - x0) / (x1 - x0)
            
            return {
                'L': float(row0['L'] + factor * (row1['L'] - row0['L'])),
                'M': float(row0['M'] + factor * (row1['M'] - row0['M'])),
                'S': float(row0['S'] + factor * (row1['S'] - row0['S']))
            }
            
        except Exception:
            return None
    
    def _calculate_zscore_lms(self, measurement: float, L: float, M: float, S: float) -> Optional[float]:
        """
        Hitung z-score menggunakan metode LMS
        Formula: Z = ((measurement/M)^L - 1) / (L * S)
        Jika L = 0, gunakan: Z = ln(measurement/M) / S
        """
        try:
            if L == 0:
                z_score = np.log(measurement / M) / S
            else:
                z_score = (((measurement / M) ** L) - 1) / (L * S)
            
            if np.isnan(z_score) or np.isinf(z_score):
                return None
                
            return round(float(z_score), 2)
            
        except Exception:
            return None
    
    def get_weight_for_age_zscore(self, weight_kg: float, age_months: int, gender: str) -> Optional[float]:
        """Hitung Weight-for-Age z-score (BBU)"""
        try:
            table_key = 'wfa_boys' if gender.upper() in ['L', 'LAKI', 'M', 'MALE'] else 'wfa_girls'
            
            if table_key not in self.tables:
                return None
            
            lms = self._interpolate_lms(self.tables[table_key], age_months)
            if not lms:
                return None
            
            return self._calculate_zscore_lms(weight_kg, lms['L'], lms['M'], lms['S'])
            
        except Exception:
            return None
    
    def get_height_for_age_zscore(self, height_cm: float, age_months: int, gender: str) -> Optional[float]:
        """Hitung Height-for-Age z-score (TBU)"""
        try:
            table_key = 'hfa_boys' if gender.upper() in ['L', 'LAKI', 'M', 'MALE'] else 'hfa_girls'
            
            if table_key not in self.tables:
                return None
            
            lms = self._interpolate_lms(self.tables[table_key], age_months)
            if not lms:
                return None
            
            return self._calculate_zscore_lms(height_cm, lms['L'], lms['M'], lms['S'])
            
        except Exception:
            return None
    
    def get_weight_for_height_zscore(self, weight_kg: float, height_cm: float, gender: str) -> Optional[float]:
        """Hitung Weight-for-Height z-score (BBTB)"""
        try:
            table_key = 'wfh_boys' if gender.upper() in ['L', 'LAKI', 'M', 'MALE'] else 'wfh_girls'
            
            if table_key not in self.tables:
                return None
            
            lms = self._interpolate_lms(self.tables[table_key], height_cm)
            if not lms:
                return None
            
            return self._calculate_zscore_lms(weight_kg, lms['L'], lms['M'], lms['S'])
            
        except Exception:
            return None
    
    def calculate_all_zscores(self, gender: str, age_months: int, weight_kg: float, height_cm: float) -> Dict[str, Optional[float]]:
        """Hitung semua z-scores sekaligus"""
        results = {}
        
        # Weight-for-Age (BBU)
        results['bbU'] = self.get_weight_for_age_zscore(weight_kg, age_months, gender)
        
        # Height-for-Age (TBU)  
        results['tbU'] = self.get_height_for_age_zscore(height_cm, age_months, gender)
        
        # Weight-for-Height (BBTB)
        results['bbTb'] = self.get_weight_for_height_zscore(weight_kg, height_cm, gender)
        
        return results

# Load models and encoders
try:
    model = tf.keras.models.load_model(settings.MODEL_STUNTING_H5_PATH)
    scaler = joblib.load(settings.SCALER_STUNTING_PKL_PATH)
    status_encoder = joblib.load(settings.STATUS_ENCODER_PKL_PATH)
except Exception as e:
    model = None
    scaler = None
    status_encoder = None

# Initialize WHO Calculator
try:
    who_calculator = WHOZScoreCalculator()
except Exception as e:
    who_calculator = None

def validate_input_data(gender, age_months, weight_kg, height_cm):
    """Validasi input data sebelum kalkulasi z-score"""
    errors = []
    
    # Validasi gender
    if gender.upper() not in ['L', 'P']:
        errors.append(f"Gender tidak valid: {gender}. Hanya 'L' (Laki-laki) atau 'P' (Perempuan) yang diterima.")
    
    # Validasi umur (0-240 bulan = 0-20 tahun)
    if age_months < 0 or age_months > 240:
        errors.append(f"Umur di luar rentang normal: {age_months} bulan")
    
    # Validasi berat badan berdasarkan umur
    if age_months <= 60:  # 0-5 tahun
        if weight_kg < 1.5 or weight_kg > 50:
            errors.append(f"Berat badan tidak wajar untuk usia {age_months} bulan: {weight_kg} kg")
    else:  # 5-20 tahun
        if weight_kg < 5 or weight_kg > 150:
            errors.append(f"Berat badan tidak wajar untuk usia {age_months} bulan: {weight_kg} kg")
    
    # Validasi tinggi badan berdasarkan umur
    if age_months <= 24:  # 0-2 tahun (panjang badan)
        if height_cm < 40 or height_cm > 110:
            errors.append(f"Panjang badan tidak wajar untuk usia {age_months} bulan: {height_cm} cm")
    elif age_months <= 60:  # 2-5 tahun
        if height_cm < 70 or height_cm > 130:
            errors.append(f"Tinggi badan tidak wajar untuk usia {age_months} bulan: {height_cm} cm")
    else:  # 5-20 tahun
        if height_cm < 90 or height_cm > 220:
            errors.append(f"Tinggi badan tidak wajar untuk usia {age_months} bulan: {height_cm} cm")
    
    return errors

def calculate_zscores(gender: str, age_months: int, weight_kg: float, height_cm: float):
    """Fungsi utama untuk menghitung z-score menggunakan WHO calculator"""
    
    # Validasi input
    validation_errors = validate_input_data(gender, age_months, weight_kg, height_cm)
    if validation_errors:
        return None, None, None
    
    # Gunakan WHO calculator
    if who_calculator and who_calculator.tables:
        try:
            results = who_calculator.calculate_all_zscores(gender, age_months, weight_kg, height_cm)
            return results.get('bbU'), results.get('tbU'), results.get('bbTb')
        except Exception:
            return None, None, None
    
    return None, None, None

def get_recommendations_by_age_and_status(age_months, status):
    """Generate recommendations based on age group and stunting status"""
    tindakan = []
    nutrisi = []
    
    # 0-6 bulan
    if 0 <= age_months <= 6:
        if "Normal" in status:
            tindakan = [
                "ASI eksklusif 6 bulan",
                "Pantau tumbuh kembang rutin"
            ]
            nutrisi = [
                "ASI langsung dari ibu (8-12x sehari)"
            ]
        elif "Stunting" in status or "Severely Stunted" in status:
            tindakan = [
                "Evaluasi menyusui",
                "Gizi ibu ditingkatkan",
                "Rujukan bila perlu"
            ]
            nutrisi = [
                "ASI eksklusif",
                "Ibu konsumsi: telur, ikan, hati, kacang hijau, sayur hijau, susu ibu menyusui"
            ]
    
    # 6-24 bulan
    elif 6 < age_months <= 24:
        if "Normal" in status:
            tindakan = [
                "MPASI dimulai usia 6 bulan",
                "Edukasi tekstur dan variasi makanan"
            ]
            nutrisi = [
                "Bubur nasi + telur + bayam halus",
                "Puree kentang + ayam + wortel",
                "Snack: pisang, pepaya, biskuit bayi"
            ]
        elif "Stunting" in status:
            tindakan = [
                "Tambah protein & lemak sehat",
                "Konsultasi gizi"
            ]
            nutrisi = [
                "Nasi tim hati + daun katuk",
                "Daging cincang + labu",
                "Snack: alpukat, susu full cream, ubi kukus"
            ]
        elif "Severely Stunted" in status:
            tindakan = [
                "PMT atau RUTF",
                "Suplementasi Fe, zinc, vitamin A/D",
                "Rujukan faskes"
            ]
            nutrisi = [
                "Bubur kacang hijau + santan",
                "Nasi tim daging + minyak",
                "Susu fortifikasi, biskuit balita, roti isi telur"
            ]
    
    # >2 tahun (>24 bulan)
    else:
        if "Normal" in status:
            tindakan = [
                "Variasi menu harian",
                "Makan bersama keluarga",
                "Stimulasi motorik makan"
            ]
            nutrisi = [
                "Nasi + ikan + sayur asem",
                "Sup ayam + kentang",
                "Snack: smoothie pisang, roti isi telur"
            ]
        elif "Stunting" in status:
            tindakan = [
                "Frekuensi makan >5x/hari",
                "Pemantauan tinggi badan bulanan"
            ]
            nutrisi = [
                "Nasi + pepes ikan + buncis",
                "Bubur ayam + telur",
                "Snack: tahu goreng, puding susu, alpukat"
            ]
        elif "Severely Stunted" in status:
            tindakan = [
                "Intervensi komunitas (PMT/Posyandu)",
                "Evaluasi sanitasi dan infeksi"
            ]
            nutrisi = [
                "Nasi + rendang + bayam tumis",
                "Bubur kacang merah + santan",
                "Susu tinggi kalori, camilan berbasis kacang"
            ]
    
    # Add general advice if recommendations are empty
    if not tindakan:
        tindakan = ["Konsultasikan dengan dokter anak atau ahli gizi untuk saran lebih lanjut."]
    if not nutrisi:
        nutrisi = ["Pastikan asupan gizi seimbang sesuai usia."]
            
    return tindakan, nutrisi

async def get_stunting_prediction(data: StuntingInput) -> StuntingOutput:
    if not all([model, scaler, status_encoder]):
        return StuntingOutput(
            risikoStunting="Error: Model tidak dimuat", 
            tindakan=["Silakan periksa log server untuk masalah pemuatan model."],
            nutrisi=["Tidak ada saran nutrisi karena model tidak dapat diakses."],
            bbU=None,
            tbU=None,
            bbTb=None
        )

    # Kalkulasi z-score dengan WHO calculator
    bbU, tbU, bbTb = calculate_zscores(
        gender=data.jk,
        age_months=data.umur,
        weight_kg=data.bb,
        height_cm=data.tb
    )

    # Preprocess input data untuk model ML
    jk_encoded = 0 if data.jk.upper() == "P" else 1

    nama_kolom = ["JK", "BB_Lahir", "TB_Lahir", "Umur", "Berat", "Tinggi"]
    
    fitur_input_df = pd.DataFrame([
        [
            jk_encoded,
            data.bbLahir,
            data.tbLahir,
            data.umur,  
            data.bb,  
            data.tb   
        ]
    ], columns=nama_kolom)

    # Scale features
    fitur_scaled = scaler.transform(fitur_input_df)

    # Make prediction
    pred = model.predict(fitur_scaled)
    pred_label = np.argmax(pred, axis=1)

    # Decode prediction
    status_prediksi = status_encoder.inverse_transform(pred_label)
    predicted_status = status_prediksi[0]
    
    # Get age-specific and status-specific recommendations
    tindakan_list, nutrisi_list = get_recommendations_by_age_and_status(
        data.umur, predicted_status
    )
    
    # Return final result
    return StuntingOutput(
        risikoStunting=predicted_status,
        tindakan=tindakan_list,
        nutrisi=nutrisi_list,
        bbU=bbU,
        tbU=tbU,
        bbTb=bbTb
    )