import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  User as UserIcon, Heart, Calendar, Pill, Shield, Plus, Bell, BarChart3, 
  Users, MessageCircle, AlertTriangle, Phone, Mail, Clock,
  Activity, TrendingUp, CheckCircle, XCircle, Home, Settings,
  UserPlus, Crown, Star, Gift, Video, ShoppingCart, Stethoscope,
  FileText, Award, Target, ChevronRight, Baby, MapPin, Sparkles, Eye, Zap, FlaskConical as TestTube
} from 'lucide-react';
import {
  Appointment,
  Coupon,
  EmergencyContact,
  Family,
  HealthGoal,
  Medication,
  MenstrualData,
  User,
  Vital,
  WellnessChallenge
} from './types';
import { sampleCoupons } from './constants/sampleCoupons';
import { initializeSampleData as createSampleData } from './data/initializeSampleData';
import { getAIHealthInsight } from './services/aiInsightsService';
import { authenticate } from './services/authService';
import { clearSession, getStoredFamily, getStoredUser, saveSession, saveUser } from './services/storageService';
import React, { useEffect } from 'react';
import { useAuthStore, useHealthDataStore } from './store';
import { useLiveVitals } from './hooks/useLiveVitals';
import LandingPage from './features/auth/LandingPage';
import AuthForm from './features/auth/AuthForm';
import FamilyMemberSelector from './components/layout/FamilyMemberSelector';
import MedicationManager from './features/medications/MedicationManager';
import AppointmentManager from './features/appointments/AppointmentManager';
import VitalManager from './features/vitals/VitalManager';
import HealthGoalsManager from './features/goals/HealthGoalsManager';
import BarChart from './components/charts/BarChart';
import DonutChart from './components/charts/DonutChart';
import LineChart from './components/charts/LineChart';
import AppShell from './components/layout/AppShell';
import { AuthFormData } from './services/authService';

const AegisLink: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentFamily, setCurrentFamily] = useState<Family | null>(null);
  const [selectedMember, setSelectedMember] = useState<User | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
                    placeholder="Age"
                    className="p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    required
                  />
                  <select
                    className="p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value as 'male' | 'female'})}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <select
                  className="w-full p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="patient">Patient</option>
                  <option value="caregiver">Caregiver</option>
                  <option value="doctor">Doctor</option>
                </select>
                
                <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  className="w-full p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                
                {(formData.role === 'patient' || formData.role === 'family_member') && (
                <div className="bg-green-50/50 p-4 rounded-xl">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-500 rounded"
                      checked={formData.joinFamily}
                      onChange={(e) => setFormData({...formData, joinFamily: e.target.checked})}
                    />
                    <span className="text-sm font-medium text-gray-700">Join existing family</span>
                  </label>
                  
                  {formData.joinFamily ? (
                    <input
                      type="text"
                      placeholder="Family ID"
                      className="w-full mt-3 p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                      value={formData.familyId}
                      onChange={(e) => setFormData({...formData, familyId: e.target.value})}
                      required={formData.joinFamily}
                    />
                  ) : (
                    <input
                      type="text"
                      placeholder="Family Name"
                      className="w-full mt-3 p-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
                      value={formData.familyName}
                      onChange={(e) => setFormData({...formData, familyName: e.target.value})}
                    />
                  )}
                </div>
                )}
              </>
            )}
            
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 border-2 border-blue-200/50 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-white/70 backdrop-blur-sm"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
  const {
    currentUser,
    currentFamily,
    authMode,
    setAuthMode,
    loading,
    showLanding,
    setShowLanding,
    initSession,
    login,
    signup
  } = useAuthStore();

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </div>
              ) : (
                authMode === 'login' ? 'Login' : 'Sign Up'
              )}
            </button>
          </form>
  const { setVitals, loadSampleData, fetchAiInsights } = useHealthDataStore();

          <div className="mt-6 text-center text-sm text-gray-600 bg-blue-50/30 p-4 rounded-xl">
            <p className="mb-2 font-medium">Demo Access:</p>
            <p>Use any email/password to explore the family health system</p>
          </div>
        </div>
      </div>
    );
  };

  const TelemedicineModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [appointmentType, setAppointmentType] = useState<'consultation' | 'followup' | 'emergency'>('consultation');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const specialties = [
      'General Medicine', 'Cardiology', 'Dermatology', 'Psychiatry', 
      'Pediatrics', 'Gynecology', 'Orthopedics', 'Neurology'
    ];

    const handleBooking = () => {
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        title: `Telemedicine - ${selectedSpecialty}`,
        type: 'telemedicine',
        doctor_name: 'Dr. Virtual Care',
        appointment_date: preferredDate,
        location: 'Online Video Call',
        notes: symptoms,
        member_id: selectedMember?.user_id || '',
        status: 'scheduled'
      };
      
      setAppointments([...appointments, newAppointment]);
      alert('Telemedicine appointment booked successfully!');
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                  <Video className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Telemedicine Consultation</h3>
                  <p className="text-gray-600">Book a virtual appointment with specialists</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'consultation', label: 'New Consultation', icon: Stethoscope },
                    { key: 'followup', label: 'Follow-up', icon: CheckCircle },
                    { key: 'emergency', label: 'Urgent Care', icon: AlertTriangle }
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setAppointmentType(key as any)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        appointmentType === key
                          ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <Icon className="h-6 w-6 mx-auto mb-2" />
                      <p className="text-sm font-medium">{label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Medical Specialty</label>
                <select
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  required
                >
                  <option value="">Select Specialty</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date & Time</label>
                <input
                  type="datetime-local"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms & Reason for Visit</label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  rows={4}
                  placeholder="Please describe your symptoms and reason for the consultation..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  required
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="font-bold text-gray-800 mb-3">Consultation Features:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>HD video consultation with board-certified doctors</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Digital prescription delivery to your pharmacy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Follow-up care and health monitoring</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Integration with your health records</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={handleBooking}
                disabled={!selectedSpecialty || !preferredDate || !symptoms.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-4 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 disabled:opacity-50 font-semibold text-lg shadow-lg"
              >
                Book Telemedicine Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AISymptomChecker: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [symptoms, setSymptoms] = useState<string[]>([]);
    const [selectedBodyPart, setSelectedBodyPart] = useState<string>('');
    const [symptomSeverity, setSymptomSeverity] = useState(5);
    const [symptomHistory, setSymptomHistory] = useState<Array<{symptoms: string[], severity: number, date: string, assessment: any}>>([]);
    const [duration, setDuration] = useState<string>('');
    const [additionalNotes, setAdditionalNotes] = useState<string>('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const steps = ['Body Area', 'Severity', 'Duration', 'Assessment'];
    
    const bodyParts = [
      { id: 'head', name: 'Head', x: 150, y: 60, symptoms: ['headache', 'dizziness', 'nausea'] },
      { id: 'chest', name: 'Chest', x: 150, y: 140, symptoms: ['chest pain', 'shortness of breath', 'heart palpitations'] },
      { id: 'stomach', name: 'Stomach', x: 150, y: 180, symptoms: ['stomach pain', 'indigestion', 'bloating'] },
      { id: 'arm', name: 'Arm', x: 100, y: 150, symptoms: ['arm pain', 'numbness', 'weakness'] },
      { id: 'leg', name: 'Leg', x: 130, y: 250, symptoms: ['leg pain', 'swelling', 'cramps'] }
    ];
    
    const getAIRecommendation = useCallback((symptoms: string[], severity: number, duration: string) => {
      const hasChestPain = symptoms.some(s => s.includes('chest pain') || s.includes('heart'));
      const hasHeadache = symptoms.some(s => s.includes('headache') || s.includes('dizziness'));
      const isHighSeverity = severity >= 8;
      const isLongDuration = duration.includes('days') || duration.includes('week');
      
      // Pattern recognition from history
      const recentSimilar = symptomHistory.filter(h => 
        h.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() &&
        h.symptoms.some(s => symptoms.includes(s))
      );
      
      if (hasChestPain || (isHighSeverity && isLongDuration)) {
        return {
          severity: 'High',
          recommendation: 'Seek immediate medical attention. Your symptoms may indicate a serious condition.',
          actions: ['Call emergency services', 'Contact your cardiologist', 'Monitor vital signs'],
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          confidence: 0.92,
          patterns: recentSimilar.length > 0 ? `Similar symptoms reported ${recentSimilar.length} times recently` : null
        };
      } else if (hasHeadache || (severity >= 6 && isLongDuration)) {
        return {
          severity: 'Medium',
          recommendation: 'Monitor symptoms closely and consider contacting your healthcare provider.',
          actions: ['Rest in a quiet, dark room', 'Stay hydrated', 'Track symptom patterns', 'Consider OTC pain relief'],
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          confidence: 0.78,
          patterns: recentSimilar.length > 0 ? `Recurring pattern detected` : null
        };
      } else {
        return {
          severity: 'Low',
          recommendation: 'Continue monitoring. Consider home care remedies and lifestyle adjustments.',
          actions: ['Rest and hydration', 'Over-the-counter relief if needed', 'Monitor for changes', 'Maintain regular sleep schedule'],
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          confidence: 0.65,
          patterns: recentSimilar.length > 0 ? `Mild recurring symptoms` : null
        };
      }
    }, [symptomHistory]);
    
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.98 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: -10 }} 
          transition={{ duration: 0.35 }} 
          className="relative max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        >
          <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-purple-400 via-pink-300 to-fuchsia-400 opacity-60 blur animate-pulse" />
          <div className="relative bg-white/95 backdrop-blur-xl rounded-[28px] shadow-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center animate-pulse">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI Symptom Checker</h3>
                  <p className="text-gray-600">Intelligent health assessment with pattern recognition</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            {/* Step indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                {steps.map((s, i) => (
                  <div key={s} className="flex-1 flex items-center">
                    <div className={`h-8 px-3 rounded-full mr-2 flex items-center justify-center font-semibold ${i+1 <= currentStep ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'}`}>{i+1}</div>
                    <span className={`${i+1 <= currentStep ? 'text-purple-700' : ''}`}>{s}</span>
                    {i < steps.length-1 && <div className="flex-1 h-1 mx-3 bg-gradient-to-r from-gray-200 to-purple-200 rounded-full"></div>}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="text-center">
                <h4 className="text-xl font-bold mb-6 text-gray-800">Where are you experiencing symptoms?</h4>
                <div className="relative mx-auto" style={{ width: '300px', height: '350px' }}>
                  <svg viewBox="0 0 300 350" className="w-full h-full">
                    <circle cx="150" cy="60" r="25" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    <rect x="125" y="85" width="50" height="80" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    <rect x="110" y="100" width="20" height="60" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    <rect x="170" y="100" width="20" height="60" rx="10" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    <rect x="135" y="165" width="15" height="80" rx="7" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    <rect x="150" y="165" width="15" height="80" rx="7" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
                    
                    {bodyParts.map((part) => (
                      <g key={part.id} onClick={() => setSelectedBodyPart(part.id)} className="cursor-pointer">
                        <circle cx={part.x} cy={part.y} r="18" fill="transparent" />
                        <circle cx={part.x} cy={part.y} r="8" fill={selectedBodyPart === part.id ? '#8b5cf6' : 'rgba(139,92,246,0.7)'} className="transition-all duration-300" />
                        <circle cx={part.x} cy={part.y} r="14" className="animate-ping" fill={selectedBodyPart === part.id ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.15)'} />
                      </g>
                    ))}
                  </svg>
                </div>
                
                {selectedBodyPart && (
                  <div className="mt-6 p-6 bg-purple-50 rounded-2xl border border-purple-200">
                    <h5 className="font-bold text-purple-800 mb-4">
                      {bodyParts.find(p => p.id === selectedBodyPart)?.name} Symptoms
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {bodyParts.find(p => p.id === selectedBodyPart)?.symptoms.map((symptom) => (
                        <button
                          key={symptom}
                          onClick={() => {
                            setSymptoms([...symptoms, symptom]);
                            setCurrentStep(2);
                          }}
                          className="p-3 bg-white rounded-xl border border-purple-200 hover:bg-purple-100 transition-all duration-300 text-purple-800 font-medium shadow-sm hover:shadow"
                        >
                          {symptom}
                        </button>
                      ))}
                    </div>
                    {symptoms.length > 0 && (
                      <div className="text-left mt-4">
                        <span className="text-xs uppercase text-purple-700 font-semibold">Selected</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {symptoms.map(s => (
                            <span key={s} className="px-2 py-1 bg-white border border-purple-200 rounded-full text-xs text-purple-700">{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="mt-6 flex justify-end">
                  <button disabled className="px-4 py-2 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed">Back</button>
                  <button onClick={()=> setCurrentStep(2)} disabled={!selectedBodyPart} className={`ml-3 px-4 py-2 rounded-lg ${selectedBodyPart ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}>Next</button>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <h4 className="text-xl font-bold mb-6 text-gray-800">Symptom Severity Assessment</h4>
                <div className="mb-6">
                  <p className="text-gray-600 mb-4">Rate your symptom intensity (1-10):</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Mild (1)</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={symptomSeverity}
                      onChange={(e) => setSymptomSeverity(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none slider"
                    />
                    <span className="text-sm text-gray-500">Severe (10)</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className={`text-2xl font-bold ${
                      symptomSeverity <= 3 ? 'text-green-600' : 
                      symptomSeverity <= 6 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {symptomSeverity}/10
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <button onClick={()=> setCurrentStep(1)} className="px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Back</button>
                  <motion.button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Next: Duration
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <h4 className="text-xl font-bold mb-6 text-gray-800">Symptom Duration & Details</h4>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">How long have you been experiencing these symptoms?</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {['Less than 1 hour', '1-6 hours', '6-24 hours', '1-3 days', '3-7 days', '1-2 weeks', '2+ weeks'].map((dur) => (
                      <motion.button
                        key={dur}
                        onClick={() => setDuration(dur)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          duration === dur
                            ? 'bg-purple-500 text-white border-purple-500 shadow-lg'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {dur}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Additional notes (optional)</label>
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Describe any triggers, patterns, or additional symptoms..."
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    rows={3}
                  />
                </div>
                
                <div className="flex justify-between">
                  <button onClick={()=> setCurrentStep(2)} className="px-4 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">Back</button>
                  <motion.button
                    onClick={() => setCurrentStep(4)}
                    disabled={!duration}
                    className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg ${
                      duration 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={duration ? { scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" } : {}}
                    whileTap={duration ? { scale: 0.95 } : {}}
                  >
                    Get AI Assessment
                  </motion.button>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                <h4 className="text-xl font-bold mb-6 text-gray-800">AI Health Assessment</h4>
                {(() => {
                  const assessment = getAIRecommendation(symptoms, symptomSeverity, duration);
                  return (
                    <div className={`relative p-[1px] rounded-2xl overflow-hidden`}>
                      <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-purple-400 via-pink-300 to-fuchsia-400 opacity-60 blur`}></div>
                      <div className={`relative p-6 rounded-2xl border ${assessment.bgColor}`}>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`h-3 w-3 rounded-full ${assessment.color.replace('text-', 'bg-')}`}></div>
                            <span className="font-bold">Severity: {assessment.severity}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600">Confidence</span>
                            <div className="text-lg font-bold text-purple-600">{Math.round(assessment.confidence * 100)}%</div>
                          </div>
                        </div>
                        
                        {assessment.patterns && (
                          <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                            <div className="flex items-center space-x-2">
                              <Sparkles className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-800">Pattern Recognition</span>
                            </div>
                            <p className="text-sm text-blue-700 mt-1">{assessment.patterns}</p>
                          </div>
                        )}
                        
                        <div className="mb-6">
                          <h5 className="font-bold mb-2">AI Recommendation:</h5>
                          <p className="text-gray-700">{assessment.recommendation}</p>
                        </div>
                        
                        <div className="mb-6">
                          <h5 className="font-bold mb-2">Suggested Actions:</h5>
                          <ul className="space-y-2">
                            {assessment.actions.map((action, idx) => (
                              <li key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => {
                              const newEntry = { symptoms, severity: symptomSeverity, date: new Date().toISOString(), assessment };
                              setSymptomHistory(prev => [newEntry, ...prev].slice(0, 10));
                              alert('Emergency contacts have been notified with your symptom assessment.');
                              onClose();
                            }}
                            className="flex-1 bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors"
                          >
                            Alert Caregivers
                          </button>
                          <button
                            onClick={() => {
                              const newEntry = { symptoms, severity: symptomSeverity, date: new Date().toISOString(), assessment };
                              setSymptomHistory(prev => [newEntry, ...prev].slice(0, 10));
                              alert('Your doctor has been notified and will contact you shortly.');
                              onClose();
                            }}
                            className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                          >
                            Contact Doctor
                          </button>
                          <button 
                            onClick={()=> { 
                              setCurrentStep(1); 
                              setSymptoms([]); 
                              setSelectedBodyPart(''); 
                              setSymptomSeverity(5); 
                              setDuration('');
                              setAdditionalNotes('');
                            }} 
                            className="px-4 py-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200"
                          >
                            Restart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
            </AnimatePresence>
          </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const TelepharmacyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cart, setCart] = useState<any[]>([]);

    const categories = [
      'all', 'prescription', 'otc', 'vitamins', 'supplements', 'first-aid'
    ];

    const medications = [
      { id: '1', name: 'Lisinopril 10mg', category: 'prescription', price: 25.99, description: 'Blood pressure medication', requires_rx: true },
      { id: '2', name: 'Ibuprofen 200mg', category: 'otc', price: 8.99, description: 'Pain relief and anti-inflammatory', requires_rx: false },
      { id: '3', name: 'Multivitamin Complex', category: 'vitamins', price: 15.99, description: 'Daily essential vitamins', requires_rx: false },
      { id: '4', name: 'Omega-3 Fish Oil', category: 'supplements', price: 22.99, description: 'Heart and brain health support', requires_rx: false },
      { id: '5', name: 'First Aid Kit', category: 'first-aid', price: 35.99, description: 'Complete emergency first aid kit', requires_rx: false }
    ];

    const filteredMedications = medications.filter(med => {
      const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || med.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    const addToCart = (medication: any) => {
      setCart([...cart, { ...medication, quantity: 1 }]);
    };

    const placeOrder = () => {
      if (cart.length === 0) return;
      alert(`Order placed successfully! ${cart.length} items will be delivered within 2-3 business days.`);
      setCart([]);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-white/95 to-green-50/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Telepharmacy</h3>
                  <p className="text-gray-600">Order medications and health products online</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="mb-6 space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Search medications..."
                  className="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredMedications.map((medication) => (
                <div key={medication.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-green-100">
                  <div className="mb-4">
                    <h4 className="font-bold text-gray-800 text-lg">{medication.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{medication.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">${medication.price}</span>
                      {medication.requires_rx && (
                        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                          Prescription Required
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(medication)}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 mb-6">
                <h4 className="font-bold text-gray-800 mb-4">Your Cart ({cart.length} items)</h4>
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white/60 p-3 rounded-xl">
                      <span className="font-medium">{item.name}</span>
                      <span className="font-bold text-green-600">${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-200">
                  <span className="text-xl font-bold">Total: ${cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                  <button
                    onClick={placeOrder}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const PointsStoreModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const userPoints = currentUser?.points || 0;
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const redeemCoupon = (coupon: Coupon) => {
      if (userPoints >= coupon.points_required) {
        if (currentUser) {
          const updatedUser = { ...currentUser, points: userPoints - coupon.points_required };
          setCurrentUser(updatedUser);
          saveUser(updatedUser);
        }
        alert(`Successfully redeemed: ${coupon.title}! You now have ${userPoints - coupon.points_required} points.`);
        onClose();
      } else {
        alert(`You need ${coupon.points_required - userPoints} more points to redeem this coupon.`);
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-white/95 to-yellow-50/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Points Store</h3>
                  <p className="text-gray-600">Redeem your wellness points for rewards</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Your Points</p>
                <p className="text-3xl font-bold text-yellow-600">{userPoints}</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sampleCoupons.map((coupon) => (
                <div key={coupon.id} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-yellow-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-lg mb-2">{coupon.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{coupon.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        {coupon.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">Cost</p>
                      <p className="text-2xl font-bold text-yellow-600">{coupon.points_required} pts</p>
                    </div>
                    <button
                      onClick={() => redeemCoupon(coupon)}
                      disabled={userPoints < coupon.points_required}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg ${
                        userPoints >= coupon.points_required
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Expires: {new Date(coupon.expires_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200">
              <h4 className="font-bold text-gray-800 mb-3">How to Earn Points:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-white/60 p-4 rounded-xl">
                  <Pill className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Take Medications</p>
                  <p className="text-xs text-gray-600">10 pts each</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Log Vitals</p>
                  <p className="text-xs text-gray-600">5 pts each</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl">
                  <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Complete Goals</p>
                  <p className="text-xs text-gray-600">50 pts each</p>
                </div>
                <div className="bg-white/60 p-4 rounded-xl">
                  <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium">Win Challenges</p>
                  <p className="text-xs text-gray-600">100 pts each</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PredictiveHealthInsights: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const insights = [
      { title: 'Blood Pressure Trend Alert', prediction: 'Your BP readings show a 15% increase trend over the past week', recommendation: 'Consider reducing sodium intake and increasing cardio exercise', confidence: 92, priority: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Heart },
      { title: 'Medication Adherence Risk', prediction: 'AI predicts 23% chance of missing evening medications this week', recommendation: 'Set additional reminders for 6 PM medications', confidence: 87, priority: 'High', color: 'text-red-600', bg: 'bg-red-50', icon: Pill },
      { title: 'Sleep Quality Improvement', prediction: 'Your sleep patterns indicate potential for 18% better rest quality', recommendation: 'Try going to bed 30 minutes earlier based on your activity data', confidence: 76, priority: 'Low', color: 'text-blue-600', bg: 'bg-blue-50', icon: Clock },
      { title: 'Health Score Projection', prediction: "Continuing current habits will improve your health score to 91 by next month", recommendation: "You're on track! Keep up your current routine", confidence: 94, priority: 'Low', color: 'text-green-600', bg: 'bg-green-50', icon: TrendingUp }
    ];
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Predictive Health Insights</h3>
                  <p className="text-gray-600">AI-powered health predictions and recommendations</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <XCircle className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {insights.map((insight, idx) => (
                <div key={idx} className={`p-6 rounded-2xl border-2 ${insight.bg} ${insight.color.replace('text-', 'border-')}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`h-3 w-3 rounded-full ${insight.color.replace('text-', 'bg-')}`}></div>
                    <span className="font-bold">Priority: {insight.priority}</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-xl flex items-center justify-center">
                      <insight.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">{insight.title}</h4>
                  </div>
                  <div className="mb-4">
                    <p className="text-gray-700 mb-3">{insight.prediction}</p>
                    <div className="bg-white/60 p-3 rounded-lg">
                      <p className="text-sm font-medium text-gray-800">Recommendation: {insight.recommendation}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Confidence: {insight.confidence}%</span>
                    <button className="text-indigo-600 text-sm font-medium hover:underline">View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const EnhancedWellnessChallenges: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [selectedChallenge, setSelectedChallenge] = useState<WellnessChallenge | null>(null);
    const [showCreateChallenge, setShowCreateChallenge] = useState(false);
    const [newChallenge, setNewChallenge] = useState({
      name: '',
      description: '',
      target_value: 0,
      duration_days: 7
    });

    const createChallenge = () => {
      const challenge: WellnessChallenge = {
        id: Date.now().toString(),
        name: newChallenge.name,
        description: newChallenge.description,
        progress: 0,
        points: newChallenge.target_value * 10,
        family_progress: {},
        participants: []
      };
      
      setWellnessChallenges([...wellnessChallenges, challenge]);
      setShowCreateChallenge(false);
      setNewChallenge({ name: '', description: '', target_value: 0, duration_days: 7 });
      alert('Challenge created successfully!');
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-gradient-to-br from-white/95 to-green-50/80 backdrop-blur-xl rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Wellness Challenges</h3>
                  <p className="text-gray-600">Family competitions with rewards and tracking</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowCreateChallenge(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg"
                >
                  <Plus className="h-4 w-4 inline mr-2" />
                  New Challenge
                </button>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>
            
            {showCreateChallenge && (
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-200 mb-8">
                <h4 className="font-bold text-gray-800 mb-4">Create New Challenge</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Challenge Name"
                    className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newChallenge.name}
                    onChange={(e) => setNewChallenge({...newChallenge, name: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Target Value"
                    className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newChallenge.target_value}
                    onChange={(e) => setNewChallenge({...newChallenge, target_value: parseInt(e.target.value)})}
                  />
                  <textarea
                    placeholder="Description"
                    className="md:col-span-2 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                  />
                  <div className="md:col-span-2 flex space-x-3">
                    <button
                      onClick={createChallenge}
                      disabled={!newChallenge.name || !newChallenge.description}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 font-medium"
                    >
                      Create Challenge
                    </button>
                    <button
                      onClick={() => setShowCreateChallenge(false)}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {selectedChallenge ? (
              <div className="space-y-6">
                <button 
                  onClick={() => setSelectedChallenge(null)}
                  className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ChevronRight className="h-4 w-4 mr-1 rotate-180" />
                  Back to Challenges
                </button>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">{selectedChallenge.name}</h4>
                      <p className="text-gray-600">{selectedChallenge.description}</p>
                    </div>
                    <div className="text-6xl">🏆</div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/80 p-6 rounded-2xl text-center">
                      <p className="text-3xl font-bold text-green-600 mb-2">{selectedChallenge.progress}%</p>
                      <p className="text-sm text-gray-600">Progress</p>
                    </div>
                    <div className="bg-white/80 p-6 rounded-2xl text-center">
                      <p className="text-3xl font-bold text-blue-600 mb-2">{selectedChallenge.points}</p>
                      <p className="text-sm text-gray-600">Points Available</p>
                    </div>
                    <div className="bg-white/80 p-6 rounded-2xl text-center">
                      <p className="text-3xl font-bold text-purple-600 mb-2">{selectedChallenge.participants.length}</p>
                      <p className="text-sm text-gray-600">Participants</p>
                    </div>
                  </div>
                  
                  <div className="bg-white/60 p-6 rounded-2xl">
                    <h5 className="font-bold text-gray-800 mb-4">Family Leaderboard</h5>
                    <div className="space-y-3">
                      {currentFamily?.members.map((member, idx) => {
                        const memberProgress = selectedChallenge.family_progress?.[member.user_id] || 0;
                        return (
                          <div key={member.user_id} className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
                            <div className="flex items-center space-x-4">
                              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white ${
                                idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : idx === 2 ? 'bg-orange-600' : 'bg-purple-500'
                              }`}>
                                #{idx + 1}
                              </div>
                              <div className="text-2xl">{member.gender === 'female' ? '👩' : '👨'}</div>
                              <span className="font-semibold text-gray-800">{member.name}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{memberProgress}%</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wellnessChallenges.map((challenge) => (
                  <div key={challenge.id} className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-gray-800">{challenge.name}</h4>
                      <div className="text-2xl">🏆</div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-semibold">{challenge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Points</p>
                        <p className="text-lg font-bold text-green-600">{challenge.points}</p>
                      </div>
                      <button
                        onClick={() => setSelectedChallenge(challenge)}
                        className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MenstrualTracker: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [cycleData, setCycleData] = useState({
      cycle_start: '',
      cycle_length: 28,
      symptoms: [] as string[],
      flow_intensity: 'medium'
    });

    if (selectedMember?.gender !== 'female' || currentUser?.role === 'caregiver') {
      return null;
  useEffect(() => {
    const { user, family } = initSession();
    if (user) {
      loadSampleData(user, family);
      fetchAiInsights(user);
    }
  }, [initSession, loadSampleData, fetchAiInsights]);

    const symptomOptions = [
      'Cramps', 'Headache', 'Mood swings', 'Bloating', 'Fatigue',
      'Breast tenderness', 'Nausea', 'Back pain', 'Food cravings'
    ];
  useLiveVitals(currentFamily, setVitals);

    const logCycle = () => {
      const newData: MenstrualData = {
        id: Date.now().toString(),
        cycle_start: cycleData.cycle_start,
        cycle_length: cycleData.cycle_length,
        symptoms: cycleData.symptoms,
        flow_intensity: cycleData.flow_intensity,
        member_id: selectedMember?.user_id || ''
      };
      
      setMenstrualData([...menstrualData, newData]);
      setShowForm(false);
      setCycleData({ cycle_start: '', cycle_length: 28, symptoms: [], flow_intensity: 'medium' });
      alert('Cycle data logged successfully!');
    };

    const memberCycles = menstrualData.filter(d => d.member_id === selectedMember?.user_id);
    const lastCycle = memberCycles[0];
    const nextPredicted = lastCycle ? new Date(new Date(lastCycle.cycle_start).getTime() + (lastCycle.cycle_length * 24 * 60 * 60 * 1000)) : null;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Baby className="h-6 w-6 mr-2 text-pink-600" />
            Menstrual Cycle Tracker
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-medium shadow-lg"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Log Cycle
          </button>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-200">
            <h4 className="font-bold text-gray-800 mb-4">Log Menstrual Cycle</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cycle Start Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={cycleData.cycle_start}
                    onChange={(e) => setCycleData({...cycleData, cycle_start: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cycle Length (days)</label>
                  <input
                    type="number"
                    min="21"
                    max="35"
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    value={cycleData.cycle_length}
                    onChange={(e) => setCycleData({...cycleData, cycle_length: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Flow Intensity</label>
                <select
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={cycleData.flow_intensity}
                  onChange={(e) => setCycleData({...cycleData, flow_intensity: e.target.value})}
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms</label>
                <div className="grid grid-cols-3 gap-2">
                  {symptomOptions.map(symptom => (
                    <label key={symptom} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={cycleData.symptoms.includes(symptom)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCycleData({...cycleData, symptoms: [...cycleData.symptoms, symptom]});
                          } else {
                            setCycleData({...cycleData, symptoms: cycleData.symptoms.filter(s => s !== symptom)});
                          }
                        }}
                        className="form-checkbox h-4 w-4 text-pink-500"
                      />
                      <span className="text-sm">{symptom}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={logCycle}
                  disabled={!cycleData.cycle_start}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 font-medium"
                >
                  Save Data
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-2xl border border-pink-200">
            <h4 className="font-bold text-gray-800 mb-4">Cycle Overview</h4>
            {lastCycle ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Period:</span>
                  <span className="font-semibold">{new Date(lastCycle.cycle_start).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cycle Length:</span>
                  <span className="font-semibold">{lastCycle.cycle_length} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Predicted:</span>
                  <span className="font-semibold text-pink-600">
                    {nextPredicted?.toLocaleDateString()}
                  </span>
                </div>
                <div className="pt-3 border-t border-pink-200">
                  <span className="text-gray-600 block mb-2">Recent Symptoms:</span>
                  <div className="flex flex-wrap gap-2">
                    {lastCycle.symptoms.map(symptom => (
                      <span key={symptom} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No cycle data logged yet</p>
            )}
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <h4 className="font-bold text-gray-800 mb-4">Health Insights</h4>
            <div className="space-y-4">
              <div className="bg-white/60 p-4 rounded-xl">
                <h5 className="font-medium text-gray-800 mb-2">Cycle Regularity</h5>
                <p className="text-sm text-gray-600">
                  {memberCycles.length > 2 ? 'Regular cycles detected' : 'Track more cycles for insights'}
                </p>
              </div>
              <div className="bg-white/60 p-4 rounded-xl">
                <h5 className="font-medium text-gray-800 mb-2">Symptom Patterns</h5>
                <p className="text-sm text-gray-600">
                  {lastCycle?.symptoms.length ? 
                    `Common symptoms: ${lastCycle.symptoms.slice(0, 2).join(', ')}` : 
                    'Log symptoms to identify patterns'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DoctorDashboard: React.FC = () => {
    const [selectedPatient, setSelectedPatient] = useState<User | null>(null);
    const [treatmentPlan, setTreatmentPlan] = useState('');
    const [showCreatePlan, setShowCreatePlan] = useState(false);
    const [showLabResults, setShowLabResults] = useState(false);
    const [showPrescription, setShowPrescription] = useState(false);
    const [prescriptionData, setPrescriptionData] = useState({ medication: '', dosage: '', instructions: '' });
    const [plans, setPlans] = useState<{ id: string; patient_id: string; text: string; created_at: string }[]>([]);
    
    // New state for patient management
    const [showAddPatient, setShowAddPatient] = useState(false);
    const [patientCode, setPatientCode] = useState('');
    const [doctorPatients, setDoctorPatients] = useState<User[]>([]);
    const [selectedPatientForLab, setSelectedPatientForLab] = useState<User | null>(null);

    // Mock lab results data
    const [labResults] = useState([
        {
            id: '1',
            patient_id: 'user1',
            patient_name: 'John Doe',
            test_date: '2025-09-10T10:30:00',
            ordered_by: 'Dr. Smith',
            results: {
                cbc: {
                    wbc: { value: 6.2, unit: 'K/μL', normal: '4.0-10.0', status: 'normal' },
                    rbc: { value: 4.8, unit: 'M/μL', normal: '4.2-5.4', status: 'normal' },
                    hgb: { value: 13.9, unit: 'g/dL', normal: '12.0-16.0', status: 'normal' },
                    hct: { value: 41.2, unit: '%', normal: '36-46', status: 'normal' },
                    platelets: { value: 280, unit: 'K/μL', normal: '150-450', status: 'normal' }
                },
                metabolic: {
                    glucose: { value: 96, unit: 'mg/dL', normal: '70-100', status: 'normal' },
                    creatinine: { value: 0.9, unit: 'mg/dL', normal: '0.6-1.2', status: 'normal' },
                    bun: { value: 18, unit: 'mg/dL', normal: '7-20', status: 'normal' },
                    sodium: { value: 142, unit: 'mEq/L', normal: '136-145', status: 'normal' },
                    potassium: { value: 4.1, unit: 'mEq/L', normal: '3.5-5.0', status: 'normal' }
                },
                lipid: {
                    total_cholesterol: { value: 185, unit: 'mg/dL', normal: '<200', status: 'normal' },
                    ldl: { value: 110, unit: 'mg/dL', normal: '<100', status: 'borderline' },
                    hdl: { value: 48, unit: 'mg/dL', normal: '>40', status: 'normal' },
                    triglycerides: { value: 135, unit: 'mg/dL', normal: '<150', status: 'normal' }
                }
            }
        },
        {
            id: '2',
            patient_id: 'user2',
            patient_name: 'Jane Smith',
            test_date: '2025-09-08T14:15:00',
            ordered_by: 'Dr. Smith',
            results: {
                cbc: {
                    wbc: { value: 8.5, unit: 'K/μL', normal: '4.0-10.0', status: 'normal' },
                    rbc: { value: 4.5, unit: 'M/μL', normal: '4.2-5.4', status: 'normal' },
                    hgb: { value: 12.8, unit: 'g/dL', normal: '12.0-16.0', status: 'normal' },
                    hct: { value: 38.9, unit: '%', normal: '36-46', status: 'normal' },
                    platelets: { value: 320, unit: 'K/μL', normal: '150-450', status: 'normal' }
                },
                metabolic: {
                    glucose: { value: 108, unit: 'mg/dL', normal: '70-100', status: 'high' },
                    creatinine: { value: 0.8, unit: 'mg/dL', normal: '0.6-1.2', status: 'normal' },
                    bun: { value: 22, unit: 'mg/dL', normal: '7-20', status: 'high' },
                    sodium: { value: 140, unit: 'mEq/L', normal: '136-145', status: 'normal' },
                    potassium: { value: 3.8, unit: 'mEq/L', normal: '3.5-5.0', status: 'normal' }
                }
            }
        }
    ]);

    const familyMembers = currentFamily?.members.filter(m => m.role !== 'doctor') || [];

    // Add patient by code
    const addPatientByCode = () => {
        if (!patientCode.trim()) return;
        
        // Mock patient lookup by code
        const mockPatient: User = {
            user_id: `patient_${Date.now()}`,
            name: `Patient ${patientCode}`,
            age: Math.floor(Math.random() * 50) + 20,
            email: `patient${patientCode}@example.com`,
            role: 'patient' as const,
            relationship: 'patient',
            code: patientCode,
            // satisfy required fields in User
            gender: 'male',
            family_id: 'temp_family',
            access_token: ''
        };
        
        setDoctorPatients([...doctorPatients, mockPatient]);
        setPatientCode('');
        setShowAddPatient(false);
        alert(`Patient ${mockPatient.name} added successfully!`);
    };

    const createTreatmentPlan = () => {
      if (!selectedPatient || !treatmentPlan.trim()) return;
      
      alert(`Treatment plan created for ${selectedPatient.name}:\n${treatmentPlan}`);
      setTreatmentPlan('');
      setShowCreatePlan(false);
      setSelectedPatient(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'normal': return 'text-green-600 bg-green-50';
            case 'high': return 'text-red-600 bg-red-50';
            case 'low': return 'text-blue-600 bg-blue-50';
            case 'borderline': return 'text-yellow-600 bg-yellow-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    return (
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowTelemedicine(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 font-medium shadow-lg"
            >
              <Video className="h-4 w-4 inline mr-2" />
              Attend Video Calls
            </button>
            <button
              onClick={() => setShowCreatePlan(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg"
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Treatment Plans
            </button>
          </div>
        </div>

        <div className="bg-white/80 p-4 rounded-2xl border flex items-center space-x-3">
          <span className="text-sm text-gray-700 font-medium">Switch Patient:</span>
          <select
            className="p-2 border rounded-lg"
            value={selectedPatient?.user_id || ''}
            onChange={(e)=> setSelectedPatient([...familyMembers, ...doctorPatients].find(m=>m.user_id===e.target.value) || null)}
          >
            <option value="">Select</option>
            {[...familyMembers, ...doctorPatients].map(m => (
              <option key={m.user_id} value={m.user_id}>{m.name} ({m.age})</option>
            ))}
          </select>
          {selectedPatient && (
            <span className="text-xs text-gray-500">Viewing: {selectedPatient.name}</span>
          )}
        </div>

        {showCreatePlan && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create Treatment Plan</h3>
            <div className="space-y-4">
              <select
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={selectedPatient?.user_id || ''}
                onChange={(e) => {
                  const patient = [...familyMembers, ...doctorPatients].find(m => m.user_id === e.target.value);
                  setSelectedPatient(patient || null);
                }}
              >
                <option value="">Select Patient</option>
                {[...familyMembers, ...doctorPatients].map(member => (
                  <option key={member.user_id} value={member.user_id}>
                    {member.name} ({member.relationship || member.role})
                  </option>
                ))}
              </select>
              
              <textarea
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                rows={6}
                placeholder="Enter treatment plan details, medications, follow-up instructions..."
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={createTreatmentPlan}
                  disabled={!selectedPatient || !treatmentPlan.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 font-medium"
                >
                  Create Plan
                </button>
                <button
                  onClick={() => setShowCreatePlan(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab - New Dynamic Implementation */}
        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">My Patients</h3>
              <button 
                onClick={() => setShowAddPatient(true)} 
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <UserPlus className="h-4 w-4 inline mr-2" />
                Add Patient
              </button>
            </div>

            {/* Add Patient Modal */}
            {showAddPatient && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200">
                <h4 className="text-lg font-bold text-gray-800 mb-4">Add New Patient</h4>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter patient code (e.g., PAT123)"
                    value={patientCode}
                    onChange={(e) => setPatientCode(e.target.value)}
                  />
                  <button
                    onClick={addPatientByCode}
                    disabled={!patientCode.trim()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    Add Patient
                  </button>
                  <button
                    onClick={() => setShowAddPatient(false)}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Patient List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...familyMembers, ...doctorPatients].map(patient => (
                <div key={patient.user_id} className="bg-white/80 p-6 rounded-2xl border hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{patient.name}</h4>
                        <p className="text-sm text-gray-600">Age: {patient.age}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{patient.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Role:</span>
                      <span className="font-medium capitalize">{patient.relationship || patient.role}</span>
                    </div>
                    {patient.code && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Code:</span>
                        <span className="font-medium">{patient.code}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowLabResults(true);
                      }}
                      className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm hover:bg-green-200 transition-colors"
                    >
                      View Labs
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedPatient(patient);
                        setShowPrescription(true);
                      }}
                      className="flex-1 bg-purple-100 text-purple-700 py-2 px-3 rounded-lg text-sm hover:bg-purple-200 transition-colors"
                    >
                      Prescribe
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {[...familyMembers, ...doctorPatients].length === 0 && (
              <div className="bg-white/80 p-8 rounded-2xl border text-center">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-600 mb-2">No Patients Yet</h4>
                <p className="text-gray-500 mb-4">Add patients using their unique patient codes to start managing their healthcare.</p>
                <button 
                  onClick={() => setShowAddPatient(true)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Add Your First Patient
                </button>
              </div>
            )}
          </div>
        )}

        {/* Doctor content based on tab */}
        {activeTab === 'telemedicine' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Telemedicine</h3>
              <button onClick={() => setShowTelemedicine(true)} className="px-4 py-2 rounded-xl bg-blue-600 text-white">New Telemedicine Visit</button>
            </div>
            <div className="bg-white/80 p-6 rounded-2xl border">
              <h4 className="font-bold mb-4">Scheduled Telemedicine</h4>
              <div className="space-y-2">
                {appointments.filter(a=>a.type==='telemedicine').map(a => (
                  <div key={a.id} className="p-3 bg-gray-50 rounded-xl border flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{a.title}</p>
                      <p className="text-xs text-gray-600">{new Date(a.appointment_date).toLocaleString()} • {a.doctor_name}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">{a.status}</span>
                  </div>
                ))}
                {appointments.filter(a=>a.type==='telemedicine').length===0 && <p className="text-sm text-gray-500">No telemedicine visits scheduled</p>}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'treatments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-800">Treatments</h3>
              <button onClick={()=> setShowCreatePlan(true)} className="px-4 py-2 rounded-xl bg-purple-600 text-white">Create Plan</button>
            </div>
            <div className="bg-white/80 p-6 rounded-2xl border">
              <h4 className="font-bold mb-4">Existing Plans</h4>
              <div className="space-y-2">
                {plans.map(p => {
                  const patient = [...familyMembers, ...doctorPatients].find(m=>m.user_id===p.patient_id);
                  return (
                    <div key={p.id} className="p-3 bg-gray-50 rounded-xl border">
                      <p className="font-semibold">{patient?.name || 'Unknown Patient'}</p>
                      <p className="text-sm text-gray-700 whitespace-pre-line">{p.text}</p>
                      <p className="text-xs text-gray-500">{new Date(p.created_at).toLocaleString()}</p>
                    </div>
                  );
                })}
                {plans.length===0 && <p className="text-sm text-gray-500">No plans yet</p>}
              </div>
            </div>
            {showCreatePlan && (
              <div className="bg-white/80 p-6 rounded-2xl border">
                <h4 className="font-bold mb-3">New Treatment Plan</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <select className="p-3 border rounded-xl" value={selectedPatient?.user_id || ''} onChange={(e)=> setSelectedPatient([...familyMembers, ...doctorPatients].find(m=>m.user_id===e.target.value) || null)}>
                    <option value="">Select Patient</option>
                    {[...familyMembers, ...doctorPatients].map(m => (<option key={m.user_id} value={m.user_id}>{m.name}</option>))}
                  </select>
                  <textarea className="md:col-span-2 p-3 border rounded-xl" rows={4} placeholder="Plan details..." value={treatmentPlan} onChange={e=> setTreatmentPlan(e.target.value)} />
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={()=> { if(selectedPatient && treatmentPlan.trim()){ setPlans([{ id: Date.now().toString(), patient_id: selectedPatient.user_id, text: treatmentPlan.trim(), created_at: new Date().toISOString() }, ...plans]); setTreatmentPlan(''); setShowCreatePlan(false);} }} className="px-4 py-2 bg-purple-600 text-white rounded-xl">Save</button>
                  <button onClick={()=> setShowCreatePlan(false)} className="px-4 py-2 bg-gray-100 rounded-xl">Cancel</button>
                </div>
              </div>
            )}
          </div>
        )}

        {(activeTab === 'dashboard' || activeTab === 'patients') && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-white/90 to-blue-50/50 p-8 rounded-2xl shadow-xl border border-blue-100">
                <h3 className="text-xl font-bold mb-6 text-gray-800">Patient Overview</h3>
                <div className="space-y-6">
                  <div className="bg-white/80 p-6 rounded-2xl border">
                    <h4 className="font-bold mb-3">Selected Patient Vitals Trend</h4>
                    {(() => {
                      const pid = selectedPatient?.user_id || [...familyMembers, ...doctorPatients][0]?.user_id;
                      const series = vitals.filter(v=>v.member_id===pid && v.type==='bp').slice(-12);
                      const data = series.map(v=> parseInt(v.value.split('/')[0]));
                      const labels = series.map(v=> new Date(v.recorded_at).toLocaleDateString());
                      return <LineChart data={data.length?data:[115,116,118,119]} labels={labels.length?labels:['Mon','Tue','Wed','Thu']} color="#3b82f6" title="Systolic BP" />;
                    })()}
                  </div>
                  <div className="bg-white/80 p-6 rounded-2xl border">
                    {(() => {
                      const pid = selectedPatient?.user_id || [...familyMembers, ...doctorPatients][0]?.user_id;
                      const medsCount = medications.filter(m=>m.member_id===pid).length;
                      const apptCount = appointments.filter(a=>a.member_id===pid).length;
                      return <DonutChart values={[medsCount, apptCount]} labels={["Meds","Appts"]} colors={["#06b6d4","#8b5cf6"]} title="Meds vs Appointments" />;
                    })()}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white/80 p-6 rounded-2xl border">
                <h4 className="font-bold mb-3">Quick Actions</h4>
                <div className="grid grid-cols-1 gap-2">
                  <button onClick={() => setShowTelemedicine(true)} className="w-full bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium">Schedule Virtual Visit</button>
                  <button onClick={() => setShowLabResults(true)} className="w-full bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 transition-colors font-medium">Review Lab Results</button>
                  <button onClick={() => setShowPrescription(true)} className="w-full bg-purple-500 text-white py-3 rounded-xl hover:bg-purple-600 transition-colors font-medium">Send Prescriptions</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Lab Results Modal */}
        {showLabResults && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-bold">Lab Results</h3>
                <button onClick={()=> setShowLabResults(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              
              {/* Patient Selection */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Select Patient:</span>
                  <select
                    className="p-2 border rounded-lg"
                    value={selectedPatientForLab?.user_id || ''}
                    onChange={(e) => {
                      const patient = [...familyMembers, ...doctorPatients].find(m => m.user_id === e.target.value);
                      setSelectedPatientForLab(patient || null);
                    }}
                  >
                    <option value="">Choose patient</option>
                    {[...familyMembers, ...doctorPatients].map(m => (
                      <option key={m.user_id} value={m.user_id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                {selectedPatientForLab ? (
                  labResults
                    .filter(result => result.patient_id === selectedPatientForLab.user_id || result.patient_name === selectedPatientForLab.name)
                    .map(result => (
                      <div key={result.id} className="space-y-6">
                        {/* Result Header */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-lg font-bold text-gray-800">{result.patient_name}</h4>
                              <p className="text-sm text-gray-600">Test Date: {new Date(result.test_date).toLocaleDateString()} at {new Date(result.test_date).toLocaleTimeString()}</p>
                              <p className="text-sm text-gray-600">Ordered by: {result.ordered_by}</p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                              Lab Report
                            </span>
                          </div>
                        </div>

                        {/* CBC Panel */}
                        {result.results.cbc && (
                          <div className="bg-white p-4 rounded-xl border">
                            <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <Activity className="h-5 w-5 mr-2 text-red-500" />
                              Complete Blood Count (CBC)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(result.results.cbc).map(([key, value]) => (
                                <div key={key} className={`p-3 rounded-lg border-l-4 ${
                                  value.status === 'normal' ? 'border-green-500 bg-green-50' : 
                                  value.status === 'high' ? 'border-red-500 bg-red-50' : 
                                  'border-yellow-500 bg-yellow-50'
                                }`}>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700 uppercase">{key.replace('_', ' ')}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(value.status)}`}>
                                      {value.status}
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-gray-800">{value.value} {value.unit}</p>
                                  <p className="text-xs text-gray-500">Normal: {value.normal}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Metabolic Panel */}
                        {result.results.metabolic && (
                          <div className="bg-white p-4 rounded-xl border">
                            <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <Zap className="h-5 w-5 mr-2 text-blue-500" />
                              Comprehensive Metabolic Panel (CMP)
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {Object.entries(result.results.metabolic).map(([key, value]) => (
                                <div key={key} className={`p-3 rounded-lg border-l-4 ${
                                  value.status === 'normal' ? 'border-green-500 bg-green-50' : 
                                  value.status === 'high' ? 'border-red-500 bg-red-50' : 
                                  'border-yellow-500 bg-yellow-50'
                                }`}>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700 uppercase">{key.replace('_', ' ')}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(value.status)}`}>
                                      {value.status}
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-gray-800">{value.value} {value.unit}</p>
                                  <p className="text-xs text-gray-500">Normal: {value.normal}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Lipid Panel */}
                        {result.results.lipid && (
                          <div className="bg-white p-4 rounded-xl border">
                            <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                              <Heart className="h-5 w-5 mr-2 text-purple-500" />
                              Lipid Panel
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                              {Object.entries(result.results.lipid).map(([key, value]) => (
                                <div key={key} className={`p-3 rounded-lg border-l-4 ${
                                  value.status === 'normal' ? 'border-green-500 bg-green-50' : 
                                  value.status === 'borderline' ? 'border-yellow-500 bg-yellow-50' :
                                  'border-red-500 bg-red-50'
                                }`}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span className="text-sm font-medium text-gray-700 uppercase">{key.replace('_', ' ')}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(value.status)}`}>
                                      {value.status}
                                    </span>
                                  </div>
                                  <p className="text-lg font-bold text-gray-800">{value.value} {value.unit}</p>
                                  <p className="text-xs text-gray-500">Target: {value.normal}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Clinical Notes Section */}
                        <div className="bg-gray-50 p-4 rounded-xl border">
                          <h5 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <FileText className="h-5 w-5 mr-2 text-gray-500" />
                            Clinical Notes
                          </h5>
                          <div className="space-y-2">
                            <p className="text-sm text-gray-700">
                              <strong>Overall Assessment:</strong> Most values within normal limits. 
                              {result.results.metabolic?.glucose?.status === 'high' && " Slightly elevated glucose noted - recommend dietary counseling and follow-up in 3 months."}
                              {result.results.lipid?.ldl?.status === 'borderline' && " LDL cholesterol is borderline high - lifestyle modifications recommended."}
                            </p>
                            <p className="text-sm text-gray-700">
                              <strong>Recommendations:</strong> Continue current medications, maintain healthy diet, regular exercise, and schedule follow-up appointment in 6 months unless otherwise indicated.
                            </p>
                            <p className="text-sm text-gray-500">
                              <strong>Next Review:</strong> {new Date(new Date(result.test_date).getTime() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8">
                    <TestTube className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">Select a Patient</h4>
                    <p className="text-gray-500">Choose a patient from the dropdown above to view their lab results.</p>
                  </div>
                )}

                {selectedPatientForLab && labResults.filter(r => r.patient_id === selectedPatientForLab.user_id || r.patient_name === selectedPatientForLab.name).length === 0 && (
                  <div className="text-center py-8">
                    <svg className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">No Lab Results Available</h4>
                    <p className="text-gray-500">No lab results found for {selectedPatientForLab.name}.</p>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">
                      Order New Tests
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showPrescription && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl max-w-xl w-full">
              <div className="p-6 border-b flex items-center justify-between">
                <h3 className="text-xl font-bold">Send Prescription</h3>
                <button onClick={()=> setShowPrescription(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-3">
                <select className="w-full p-3 border rounded-xl" value={selectedPatient?.user_id || ''} onChange={(e)=> setSelectedPatient([...familyMembers, ...doctorPatients].find(m=>m.user_id===e.target.value) || null)}>
                  <option value="">Select Patient</option>
                  {[...familyMembers, ...doctorPatients].map(m => (<option key={m.user_id} value={m.user_id}>{m.name}</option>))}
                </select>
                <input className="w-full p-3 border rounded-xl" placeholder="Medication" value={prescriptionData.medication} onChange={e=> setPrescriptionData({...prescriptionData, medication:e.target.value})} />
                <input className="w-full p-3 border rounded-xl" placeholder="Dosage" value={prescriptionData.dosage} onChange={e=> setPrescriptionData({...prescriptionData, dosage:e.target.value})} />
                <textarea className="w-full p-3 border rounded-xl" rows={3} placeholder="Instructions" value={prescriptionData.instructions} onChange={e=> setPrescriptionData({...prescriptionData, instructions:e.target.value})} />
                <button onClick={()=> { alert(`Prescription sent for ${selectedPatient?.name || 'patient'}`); setShowPrescription(false); }} className="w-full bg-purple-600 text-white py-3 rounded-xl">Send</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const CaregiverDashboard: React.FC = () => {
    // caregiver links patients by Patient ID; start with any known family patients as defaults for demo
    const familyPatients = (currentFamily?.members || []).filter(m => m.role !== 'caregiver' && m.role !== 'doctor');
    type Patient = { id: string; name: string; medication_count: number; appointment_count: number; linked_at: string };
    const patients: Patient[] = familyPatients.map(m => ({
      id: m.user_id,
      name: m.name,
      medication_count: medications.filter(x => x.member_id === m.user_id).length,
      appointment_count: appointments.filter(x => x.member_id === m.user_id).length,
      linked_at: new Date(Date.now() - Math.floor(Math.random()*20)*864e5).toISOString()
    }));

    // Allow caregiver to link by Patient ID (PID-XXXXXX)
    const [linkPid, setLinkPid] = useState('');
    const linkPatientById = () => {
      const member = (currentFamily?.members || []).find(m => m.patient_id && m.patient_id.toLowerCase() === linkPid.trim().toLowerCase());
      if (member) {
        alert(`Linked to patient ${member.name}`);
      } else {
        alert('No patient found with that Patient ID');
      }
      setLinkPid('');
    };

    type AlertItem = { id: string; patient_name: string; priority: 'emergency'|'high'|'normal'|'low'; message: string; created_at: string; acknowledged?: boolean };
    const [alerts, setAlerts] = useState<AlertItem[]>([
      { id: 'a1', patient_name: patients[0]?.name || 'Patient', priority: 'high', message: 'Missed morning medication', created_at: new Date().toISOString() },
      { id: 'a2', patient_name: patients[1]?.name || 'Patient', priority: 'normal', message: 'Vital check due', created_at: new Date(Date.now()-3600e3).toISOString() },
      { id: 'a3', patient_name: patients[2]?.name || 'Patient', priority: 'emergency', message: 'Critical BP reading detected', created_at: new Date(Date.now()-2*3600e3).toISOString() }
    ]);

    const patientMedicationData = patients.map(p => p.medication_count);
    const patientMedicationLabels = patients.map(p => p.name);
    const patientAppointmentData = patients.map(p => p.appointment_count);
    const patientAppointmentLabels = patients.map(p => p.name);
    const alertPriorityData = [
      alerts.filter(a => a.priority === 'emergency').length,
      alerts.filter(a => a.priority === 'high').length,
      alerts.filter(a => a.priority === 'normal').length,
      alerts.filter(a => a.priority === 'low').length
    ];
    const alertPriorityLabels = ['Emergency', 'High', 'Normal', 'Low'];
    const alertPriorityColors = ['#ef4444', '#f97316', '#eab308', '#10b981'];
    const adherenceRateData = patients.map(() => Math.floor(Math.random() * 40) + 60);

    // Care tasks state
    type CareTask = { id: string; text: string; priority: 'low'|'normal'|'high'; patient?: string; completed: boolean };
    const [careTasks, setCareTasks] = useState<CareTask[]>([
      { id: 't1', text: 'Check BP for morning patients', priority: 'high', patient: patients[0]?.name, completed: false },
      { id: 't2', text: 'Refill pill organizer', priority: 'normal', patient: patients[1]?.name, completed: false }
    ]);
    const [newTask, setNewTask] = useState({ text: '', priority: 'normal' as 'low'|'normal'|'high', patient: '' });
    const addTask = () => {
      if (!newTask.text.trim()) return;
      setCareTasks([{ id: Date.now().toString(), text: newTask.text.trim(), priority: newTask.priority, patient: newTask.patient || undefined, completed: false }, ...careTasks]);
      setNewTask({ text: '', priority: 'normal', patient: '' });
    };
    const toggleTask = (id: string) => setCareTasks(careTasks.map(t => t.id===id?{...t, completed:!t.completed}:t));
    const removeTask = (id: string) => setCareTasks(careTasks.filter(t => t.id!==id));

    // Patient details modal
    const [showPatientModal, setShowPatientModal] = useState(false);
    const [patientModalId, setPatientModalId] = useState<string>('');
    const openPatientModal = (id: string) => { setPatientModalId(id); setShowPatientModal(true); };
    const closePatientModal = () => { setShowPatientModal(false); setPatientModalId(''); };
    const patientModalMember = familyPatients.find(m => m.user_id === patientModalId) || null;

    const PatientCard: React.FC<{ patient: Patient }> = ({ patient }) => (
      <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
              <UserIcon className="h-7 w-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{patient.name}</h3>
              <p className="text-sm text-gray-600">Linked: {new Date(patient.linked_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div className="bg-emerald-50 p-3 rounded-xl">
            <p className="text-2xl font-bold text-emerald-600">{patient.medication_count || 0}</p>
            <p className="text-xs text-gray-600">Medications</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{patient.appointment_count || 0}</p>
            <p className="text-xs text-gray-600">Appointments</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button onClick={() => openPatientModal(patient.id)} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-semibold shadow">
            View Details
          </button>
          <button onClick={() => { setNewTask({ text: `Check in with ${patient.name}`, priority: 'normal', patient: patient.name }); setActiveTab('tasks'); }} className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-2 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold shadow">
            Create Task
          </button>
        </div>
      </div>
    );

    const CaregiverCharts = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {patients.length > 0 && (
          <BarChart values={patientMedicationData} labels={patientMedicationLabels} color="#10b981" title="Medications by Patient" />
        )}
        {patients.length > 0 && (
          <BarChart values={patientAppointmentData} labels={patientAppointmentLabels} color="#3b82f6" title="Appointments by Patient" />
        )}
        {alerts.length > 0 && (
          <DonutChart values={alertPriorityData} labels={alertPriorityLabels} colors={alertPriorityColors} title="Alerts by Priority" />
        )}
        {patients.length > 0 && (
          <BarChart values={adherenceRateData} labels={patientMedicationLabels} color="#8b5cf6" title="Adherence Rate by Patient (%)" />
        )}
      </div>
    );

    const AlertsPanel = () => (
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
        <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
          <Bell className="h-6 w-6 mr-3 text-red-600" />
          Recent Alerts
        </h3>
        <div className="space-y-4">
          {alerts.slice(0,5).map((alert) => (
            <div key={alert.id} className={`p-4 rounded-xl border-l-4 ${alert.priority==='emergency'?'bg-red-50 border-red-500': alert.priority==='high'?'bg-yellow-50 border-yellow-500':'bg-blue-50 border-blue-500'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{alert.patient_name}</p>
                  <p className="text-sm text-gray-600">{alert.message}</p>
                  <p className="text-xs text-gray-500">{new Date(alert.created_at).toLocaleString()}</p>
                </div>
                {!alert.acknowledged && (
                  <button onClick={() => { setAlerts(alerts.map(a => a.id===alert.id?{...a, acknowledged:true}:a)); window.alert('Alert acknowledged'); }} className="text-blue-600 text-sm hover:underline font-medium">Acknowledge</button>
                )}
              </div>
            </div>
          ))}
          {alerts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-lg font-medium">No active alerts</p>
              <p className="text-sm">All patients are doing well!</p>
            </div>
          )}
        </div>
      </div>
    );

    if (activeTab === 'patients') {
      return (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">My Patients</h2>
            <div className="flex items-center space-x-2">
              <input value={linkPid} onChange={e=>setLinkPid(e.target.value)} placeholder="Enter Patient ID (e.g., PID-AB12CD)" className="p-2 border rounded-lg text-sm w-64" />
              <button onClick={linkPatientById} className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">Link Patient</button>
              <button onClick={()=> navigateTo('alerts', 'Alerts')} className="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">View Alerts</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
            {patients.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-500">
                <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-gray-400" />
                </div>
                <p className="text-lg font-medium">No patients linked yet</p>
                <p className="text-sm">Share your Caregiver ID with patients to get started</p>
              </div>
            )}
          </div>

          {showPatientModal && patientModalMember && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white/95 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{patientModalMember.name} • Details</h3>
                    <p className="text-sm text-gray-600">Age {patientModalMember.age} • {patientModalMember.gender}</p>
                  </div>
                  <button onClick={closePatientModal} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="h-6 w-6 text-gray-500" /></button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1 space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border">
                      <p className="text-xs text-gray-600">Patient ID</p>
                      <p className="font-mono font-bold text-blue-700">{patientModalMember.patient_id || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-xl border">
                      <p className="text-xs text-gray-600">Medications</p>
                      <p className="font-bold text-emerald-700">{medications.filter(m=>m.member_id===patientModalMember.user_id).length}</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-xl border">
                      <p className="text-xs text-gray-600">Appointments</p>
                      <p className="font-bold text-purple-700">{appointments.filter(a=>a.member_id===patientModalMember.user_id).length}</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-6">
                    <div className="bg-white/70 p-4 rounded-xl border">
                      <h4 className="font-bold mb-3">Recent Vitals</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {vitals.filter(v=>v.member_id===patientModalMember.user_id).slice(0,6).map(v => (
                          <div key={v.id} className="p-3 bg-gray-50 rounded-xl border">
                            <p className="font-semibold text-gray-800">{v.type.toUpperCase()} • {v.value} {v.unit}</p>
                            <p className="text-xs text-gray-500">{new Date(v.recorded_at).toLocaleString()}</p>
                          </div>
                        ))}
                        {vitals.filter(v=>v.member_id===patientModalMember.user_id).length===0 && (
                          <p className="text-sm text-gray-500">No vitals available</p>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl border">
                      <h4 className="font-bold mb-3">Medications</h4>
                      <div className="space-y-2">
                        {medications.filter(m=>m.member_id===patientModalMember.user_id).map(m => (
                          <div key={m.id} className="p-3 bg-gray-50 rounded-xl border flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-gray-800">{m.name}</p>
                              <p className="text-xs text-gray-600">{m.dosage} • {m.frequency}</p>
                            </div>
                            <span className={`text-xs px-2 py-1 rounded-full ${m.taken_today?'bg-emerald-100 text-emerald-700':'bg-yellow-100 text-yellow-700'}`}>{m.taken_today?'Taken':'Due'}</span>
                          </div>
                        ))}
                        {medications.filter(m=>m.member_id===patientModalMember.user_id).length===0 && (
                          <p className="text-sm text-gray-500">No medications</p>
                        )}
                      </div>
                    </div>
                    <div className="bg-white/70 p-4 rounded-xl border">
                      <h4 className="font-bold mb-3">Appointments</h4>
                      <div className="space-y-2">
                        {appointments.filter(a=>a.member_id===patientModalMember.user_id).map(a => (
                          <div key={a.id} className="p-3 bg-gray-50 rounded-xl border">
                            <p className="font-semibold text-gray-800">{a.title}</p>
                            <p className="text-xs text-gray-600">{new Date(a.appointment_date).toLocaleString()} • {a.type}</p>
                          </div>
                        ))}
                        {appointments.filter(a=>a.member_id===patientModalMember.user_id).length===0 && (
                          <p className="text-sm text-gray-500">No appointments</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
  const handleAuthSubmit = async (formData: AuthFormData) => {
    try {
      const result = authMode === 'login' ? await login(formData) : await signup(formData);
      loadSampleData(result.user, result.family);
      fetchAiInsights(result.user);
    } catch {
      alert('Authentication failed. Please try again.');
    }

    if (activeTab === 'alerts') {
      return (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Patient Alerts</h2>
          <CaregiverCharts />
          <AlertsPanel />
        </div>
      );
    }

    if (activeTab === 'tasks') {
      return (
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-800">Care Tasks</h2>
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Add Task</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <input className="p-3 border rounded-xl" placeholder="Task description" value={newTask.text} onChange={e=>setNewTask({...newTask, text:e.target.value})} />
              <select className="p-3 border rounded-xl" value={newTask.priority} onChange={e=>setNewTask({...newTask, priority:e.target.value as any})}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
              <select className="p-3 border rounded-xl" value={newTask.patient} onChange={e=>setNewTask({...newTask, patient:e.target.value})}>
                <option value="">No specific patient</option>
                {patients.map(p => (<option key={p.id} value={p.name}>{p.name}</option>))}
              </select>
              <button onClick={addTask} className="bg-blue-600 text-white rounded-xl px-6">Add</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careTasks.map(task => (
              <div key={task.id} className={`p-4 rounded-2xl border ${task.completed?'bg-emerald-50 border-emerald-200':'bg-blue-50 border-blue-200'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={()=>toggleTask(task.id)} className={`h-6 w-6 rounded-full border flex items-center justify-center ${task.completed?'bg-emerald-500 border-emerald-500 text-white':'border-gray-300'}`}>{task.completed && '✓'}</button>
                    <div>
                      <p className={`font-semibold ${task.completed?'line-through text-gray-500':'text-gray-800'}`}>{task.text}</p>
                      {task.patient && <p className="text-xs text-gray-600">Patient: {task.patient}</p>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${task.priority==='high'?'bg-red-100 text-red-700':task.priority==='normal'?'bg-yellow-100 text-yellow-700':'bg-gray-100 text-gray-700'}`}>{task.priority}</span>
                    <button onClick={()=>removeTask(task.id)} className="text-red-600 text-sm">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {careTasks.length===0 && (
              <div className="col-span-2 text-center text-gray-500 py-12">No tasks yet</div>
            )}
          </div>
        </div>
      );
    }

    // dashboard default
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[{ title: 'Total Patients', value: patients.length, icon: Users, bgColor: 'from-blue-400 to-blue-600' }, { title: 'Active Alerts', value: alerts.filter(a=>!a.acknowledged).length, icon: Bell, bgColor: 'from-red-400 to-red-600' }, { title: 'Avg Adherence', value: `${Math.round(adherenceRateData.reduce((a,b)=>a+b,0)/(adherenceRateData.length||1))}%`, icon: BarChart3, bgColor: 'from-green-400 to-green-600' }].map((stat, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`h-12 w-12 bg-gradient-to-br ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <CaregiverCharts />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20">
              <h3 className="text-xl font-bold mb-6 text-gray-800">Patient Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {patients.slice(0,4).map((patient) => (
                  <PatientCard key={patient.id} patient={patient} />
                ))}
                {patients.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-gray-500">
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium">No patients linked yet</p>
                    <p className="text-sm">Share your Caregiver ID to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>

        {showPatientModal && patientModalMember && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white/95 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">{patientModalMember.name} • Details</h3>
                  <p className="text-sm text-gray-600">Age {patientModalMember.age} • {patientModalMember.gender}</p>
                </div>
                <button onClick={closePatientModal} className="p-2 hover:bg-gray-100 rounded-lg"><XCircle className="h-6 w-6 text-gray-500" /></button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border">
                    <p className="text-xs text-gray-600">Patient ID</p>
                    <p className="font-mono font-bold text-blue-700">{patientModalMember.patient_id || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border">
                    <p className="text-xs text-gray-600">Medications</p>
                    <p className="font-bold text-emerald-700">{medications.filter(m=>m.member_id===patientModalMember.user_id).length}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl border">
                    <p className="text-xs text-gray-600">Appointments</p>
                    <p className="font-bold text-purple-700">{appointments.filter(a=>a.member_id===patientModalMember.user_id).length}</p>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white/70 p-4 rounded-xl border">
                    <h4 className="font-bold mb-3">Recent Vitals</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {vitals.filter(v=>v.member_id===patientModalMember.user_id).slice(0,6).map(v => (
                        <div key={v.id} className="p-3 bg-gray-50 rounded-xl border">
                          <p className="font-semibold text-gray-800">{v.type.toUpperCase()} • {v.value} {v.unit}</p>
                          <p className="text-xs text-gray-500">{new Date(v.recorded_at).toLocaleString()}</p>
                        </div>
                      ))}
                      {vitals.filter(v=>v.member_id===patientModalMember.user_id).length===0 && (
                        <p className="text-sm text-gray-500">No vitals available</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl border">
                    <h4 className="font-bold mb-3">Medications</h4>
                    <div className="space-y-2">
                      {medications.filter(m=>m.member_id===patientModalMember.user_id).map(m => (
                        <div key={m.id} className="p-3 bg-gray-50 rounded-xl border flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-800">{m.name}</p>
                            <p className="text-xs text-gray-600">{m.dosage} • {m.frequency}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${m.taken_today?'bg-emerald-100 text-emerald-700':'bg-yellow-100 text-yellow-700'}`}>{m.taken_today?'Taken':'Due'}</span>
                        </div>
                      ))}
                      {medications.filter(m=>m.member_id===patientModalMember.user_id).length===0 && (
                        <p className="text-sm text-gray-500">No medications</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-white/70 p-4 rounded-xl border">
                    <h4 className="font-bold mb-3">Appointments</h4>
                    <div className="space-y-2">
                      {appointments.filter(a=>a.member_id===patientModalMember.user_id).map(a => (
                        <div key={a.id} className="p-3 bg-gray-50 rounded-xl border">
                          <p className="font-semibold text-gray-800">{a.title}</p>
                          <p className="text-xs text-gray-600">{new Date(a.appointment_date).toLocaleString()} • {a.type}</p>
                        </div>
                      ))}
                      {appointments.filter(a=>a.member_id===patientModalMember.user_id).length===0 && (
                        <p className="text-sm text-gray-500">No appointments</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const EmergencyContactsManager: React.FC = () => {
    const [showForm, setShowForm] = useState(false);
    const [contactData, setContactData] = useState({
      name: '',
      relationship: '',
      phone: '',
      priority: 'secondary' as 'primary' | 'secondary'
    });

    const addContact = () => {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        name: contactData.name,
        relationship: contactData.relationship,
        phone: contactData.phone,
        priority: contactData.priority,
        family_id: currentFamily?.family_id || ''
      };
      
      setEmergencyContacts([...emergencyContacts, newContact]);
      setContactData({ name: '', relationship: '', phone: '', priority: 'secondary' });
      setShowForm(false);
      alert('Emergency contact added successfully!');
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <Phone className="h-6 w-6 mr-2 text-red-600" />
            Emergency Contacts
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 font-medium shadow-lg"
          >
            <Plus className="h-4 w-4 inline mr-2" />
            Add Contact
          </button>
        </div>

        {showForm && (
          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200">
            <h4 className="font-bold text-gray-800 mb-4">Add Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={contactData.name}
                onChange={(e) => setContactData({...contactData, name: e.target.value})}
              />
              <input
                type="text"
                placeholder="Relationship"
                className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={contactData.relationship}
                onChange={(e) => setContactData({...contactData, relationship: e.target.value})}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={contactData.phone}
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
              />
              <select
                className="p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                value={contactData.priority}
                onChange={(e) => setContactData({...contactData, priority: e.target.value as 'primary' | 'secondary'})}
              >
                <option value="primary">Primary Contact</option>
                <option value="secondary">Secondary Contact</option>
              </select>
            </div>
            <div className="flex space-x-3 mt-4">
              <button
                onClick={addContact}
                disabled={!contactData.name || !contactData.phone}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 font-medium"
              >
                Add Contact
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact) => (
            <div key={contact.id} className="bg-gradient-to-br from-white/90 to-red-50/50 p-6 rounded-2xl shadow-xl border border-red-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                    contact.priority === 'primary' 
                      ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-500'
                  }`}>
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  contact.priority === 'primary' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {contact.priority}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/60 p-3 rounded-xl">
                  <p className="text-sm font-medium text-gray-600">Phone</p>
                  <p className="font-bold text-gray-800">{contact.phone}</p>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => window.open(`tel:${contact.phone}`, '_self')}
                    className="flex-1 bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition-colors font-medium"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => window.open(`sms:${contact.phone}`, '_self')}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                  >
                    Text
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {emergencyContacts.length === 0 && (
            <div className="col-span-2 text-center py-12 text-gray-500">
              <div className="h-20 w-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-gray-400" />
              </div>
              <p className="text-lg font-medium">No emergency contacts added yet</p>
              <p className="text-sm">Add contacts for emergency situations</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const Chatbot: React.FC = () => {
    const [messages, setMessages] = useState([
      { type: 'bot', text: `Hi ${currentUser?.name}! I'm your Aegis family health assistant. I can help with medications, appointments, health insights, and family coordination. How can I help today?` }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
      if (!input.trim()) return;
      
      setMessages(prev => [...prev, { type: 'user', text: input }]);
      
      setTimeout(() => {
        const botResponse = getBotResponse(input);
        setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
      }, 1000);
      
      setInput('');
    };

    const getBotResponse = (message: string) => {
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('family') || lowerMsg.includes('member')) {
        return `Your family has ${currentFamily?.members.length || 0} members. You can switch between family members using the member selector to view their individual health data. Would you like help navigating between family members?`;
      }
      
      if (lowerMsg.includes('telemedicine') || lowerMsg.includes('doctor appointment')) {
        return 'You can book telemedicine consultations directly through the platform! Use the telemedicine feature to schedule virtual appointments with specialists. Would you like me to guide you through booking one?';
      }
      
      if (lowerMsg.includes('medication') || lowerMsg.includes('pill')) {
        const memberMeds = medications.filter(m => m.member_id === selectedMember?.user_id);
        return `${selectedMember?.name} has ${memberMeds.length} medications tracked. You can view medication schedules, set reminders, and check for drug interactions. Need help with medication management?`;
      }
      
      if (lowerMsg.includes('points') || lowerMsg.includes('rewards')) {
        return `You have ${currentUser?.points || 0} wellness points! Earn points by taking medications on time, logging vitals, completing health goals, and participating in family challenges. Visit the Points Store to redeem rewards!`;
      }
      
      if (lowerMsg.includes('challenge') || lowerMsg.includes('competition')) {
        return 'Family wellness challenges are a great way to stay motivated! You can join existing challenges or create new ones. Compete with family members and earn points for healthy behaviors.';
      }
      
      if (lowerMsg.includes('emergency') || lowerMsg.includes('sos')) {
        return 'For medical emergencies, call emergency services immediately. The SOS feature alerts your emergency contacts and family members with your location and recent health data. You can manage emergency contacts in your settings.';
      }
      
      if (lowerMsg.includes('ai') || lowerMsg.includes('insight')) {
        return 'AI health insights analyze your health patterns to provide personalized recommendations. The system can predict health trends, suggest lifestyle changes, and alert you to potential concerns based on your data.';
      }
      
      if (lowerMsg.includes('menstrual') || lowerMsg.includes('cycle')) {
        if (selectedMember?.gender === 'female') {
          return 'The menstrual cycle tracker helps monitor periods, symptoms, and patterns. This data is private and only accessible by the user and doctors (not other family members). Would you like help logging cycle data?';
        } else {
          return 'The menstrual cycle tracker is available for female family members to track their cycles privately and share data with healthcare providers when needed.';
        }
      }
      
      return `I understand you're asking about "${message}". I can help with family health coordination, medication tracking, telemedicine bookings, wellness challenges, AI health insights, emergency contacts, and much more. What specific area would you like assistance with?`;
    };

    return (
      <div className="fixed bottom-4 right-4 z-50">
        {showChatbot && (
          <div className="bg-gradient-to-br from-white/95 to-blue-50/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl shadow-2xl w-96 h-96 flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-t-2xl">
              <h3 className="font-bold">Aegis Family Assistant</h3>
              <p className="text-sm text-blue-100">Your intelligent health companion</p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={msg.type === 'user' ? 'text-right' : 'text-left'}>
                  <div className={`inline-block p-3 rounded-2xl max-w-xs ${
                    msg.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-blue-200/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask about family health..."
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-3 rounded-xl text-sm hover:from-blue-600 hover:to-green-600 transition-all duration-300 font-semibold"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setShowChatbot(!showChatbot)}
          className="bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-2xl hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    );
  };

  const MainApp: React.FC = () => {
    useEffect(() => {
      const previous = document.body.style.background;
      document.body.style.background = 'linear-gradient(135deg, #fff9db 0%, #e6f0ff 50%, #eafff1 100%)';
      return () => { document.body.style.background = previous; };
    }, []);

    const navigation = {
      patient: [
        { key: 'dashboard', label: 'Dashboard', icon: Home },
        { key: 'medications', label: 'Medications', icon: Pill },
        { key: 'appointments', label: 'Appointments', icon: Calendar },
        { key: 'vitals', label: 'Vitals', icon: Heart },
        { key: 'insights', label: 'AI Insights', icon: Sparkles },
        { key: 'goals', label: 'Health Goals', icon: Target },
        { key: 'emergency', label: 'Emergency', icon: Phone }
      ],
      family_member: [
        { key: 'dashboard', label: 'Dashboard', icon: Home },
        { key: 'medications', label: 'Medications', icon: Pill },
        { key: 'appointments', label: 'Appointments', icon: Calendar },
        { key: 'vitals', label: 'Vitals', icon: Heart },
        { key: 'insights', label: 'AI Insights', icon: Sparkles },
        { key: 'goals', label: 'Health Goals', icon: Target },
        { key: 'emergency', label: 'Emergency', icon: Phone }
      ],
      caregiver: [
        { key: 'dashboard', label: 'Dashboard', icon: Home },
        { key: 'patients', label: 'Patients', icon: Users },
        { key: 'alerts', label: 'Alerts', icon: Bell },
        { key: 'tasks', label: 'Care Tasks', icon: CheckCircle },
        { key: 'emergency', label: 'Emergency', icon: Phone }
      ],
      doctor: [
        { key: 'dashboard', label: 'Dashboard', icon: Home },
        { key: 'patients', label: 'Patients', icon: Users },
        { key: 'treatments', label: 'Treatments', icon: FileText },
        { key: 'telemedicine', label: 'Telemedicine', icon: Video }
      ]
    };

    const currentNavigation = navigation[currentUser?.role as keyof typeof navigation] || navigation.patient;

    const renderContent = () => {
      if (currentUser?.role === 'doctor') {
        return <DoctorDashboard />;
      }
      
      if (currentUser?.role === 'caregiver') {
        if (['dashboard','tasks','patients','alerts'].includes(activeTab)) {
          return <CaregiverDashboard />;
        }
        if (activeTab === 'family') {
          return <FamilyDashboard />;
        }
        if (activeTab === 'emergency') {
          return <EmergencyContactsManager />;
        }
      }

      // Patient and Family Member content
      if (showFamilyView && (currentUser?.role === 'patient' || currentUser?.role === 'family_member')) {
        return <FamilyDashboard />;
      }

      switch (activeTab) {
        case 'medications':
          return (
            <MedicationManager
              selectedMember={selectedMember}
              medications={medications}
              setMedications={setMedications}
            />
          );
        case 'appointments':
          return (
            <AppointmentManager
              selectedMember={selectedMember}
              appointments={appointments}
              setAppointments={setAppointments}
            />
          );
        case 'vitals':
          return <VitalManager selectedMember={selectedMember} vitals={vitals} setVitals={setVitals} />;
        case 'insights':
          return (
            <div className="space-y-6">
              <div className="relative p-[2px] rounded-3xl overflow-hidden">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-400 via-pink-300 to-fuchsia-400 opacity-70 blur"></div>
                <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">AI Insights</h3>
                      <p className="text-gray-600">Personalized, live health intelligence</p>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={()=> setShowSymptomChecker(true)} className="relative group rounded-xl px-5 py-3 font-semibold text-white">
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600" />
                        <span className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-purple-400/60 to-pink-400/60 blur opacity-70 group-hover:opacity-100 transition" />
                        <span className="relative z-10">Symptom Checker</span>
                      </button>
                      <button onClick={()=> setShowPredictiveInsights(true)} className="relative group rounded-xl px-5 py-3 font-semibold text-white">
                        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600" />
                        <span className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-indigo-400/60 to-blue-400/60 blur opacity-70 group-hover:opacity-100 transition" />
                        <span className="relative z-10">Predictive Insights</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-white/70 border">
                      <p className="text-xs text-gray-500">Risk Level</p>
                      <p className="text-xl font-bold text-purple-700">{aiInsights?.risk_level || 'low'}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/70 border">
                      <p className="text-xs text-gray-500">Confidence</p>
                      <p className="text-xl font-bold text-indigo-700">{aiInsights ? `${Math.round(aiInsights.confidence*100)}%` : '—'}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/70 border md:col-span-1">
                      <p className="text-xs text-gray-500">Trend</p>
                      <p className="text-sm text-gray-700">{aiInsights?.predicted_trends || 'Stable'}</p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200">
                    <p className="text-sm text-gray-700 font-medium">Recommendations</p>
                    <ul className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                      {(aiInsights?.recommendations || ['Stay hydrated','Daily walk 20 min','Sleep 7-8h']).map((rec:string, i:number) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Sparkles className="w-4 h-4 text-purple-600" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        case 'goals':
          return <HealthGoalsManager selectedMember={selectedMember} healthGoals={healthGoals} setHealthGoals={setHealthGoals} />;
        case 'emergency':
          return <EmergencyContactsManager />;
        default:
          return <PatientDashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50/30 via-blue-50/20 to-green-50/40 transition-all duration-300">
        <header className="bg-gradient-to-r from-white/90 to-blue-50/80 backdrop-blur-xl shadow-lg border-b border-blue-200/50 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Shield className="h-10 w-10 text-blue-600 drop-shadow-lg" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                    Aegis Link
                  </h1>
                  <p className="text-sm text-gray-600 font-medium">
                    Family Health Management • {currentFamily?.family_name}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  {(currentUser?.role !== 'doctor') && (
                    <button
                      onClick={() => setShowSymptomChecker(true)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="AI Symptom Checker"
                    >
                      <Activity className="h-5 w-5" />
                    </button>
                  )}
                  {(currentUser?.role !== 'doctor' && currentUser?.role !== 'caregiver') && (
                    <button
                      onClick={() => setShowTelemedicine(true)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Telemedicine"
                    >
                      <Video className="h-5 w-5" />
                    </button>
                  )}
                  {(currentUser?.role !== 'doctor' && currentUser?.role !== 'caregiver') && (
                    <button
                      onClick={() => setShowTelepharmacy(true)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Telepharmacy"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  )}
                  {(currentUser?.role !== 'doctor' && currentUser?.role !== 'caregiver') && (
                    <button
                      onClick={() => setShowPointsStore(true)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                      title="Points Store"
                    >
                      <Gift className="h-4 w-4" />
                      <span className="font-bold">{currentUser?.points || 0}</span>
                    </button>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-800">Welcome, {currentUser?.name}</p>
                  <p className="text-xs text-gray-600 font-medium capitalize">
                    {currentUser?.role.replace('_', ' ')} • {selectedMember?.name}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentUser?.role !== 'patient' && (
            <FamilyMemberSelector
              currentFamily={currentFamily}
              currentUser={currentUser}
              selectedMember={selectedMember}
              onSelectMember={setSelectedMember}
            />
          )}
          
          <div className="flex gap-8">
            <nav className="w-72 relative">
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-400 opacity-60 blur"></div>
              <div className="relative bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 sticky top-24 h-fit">
              {!(showFamilyView && (currentUser?.role === 'patient' || currentUser?.role === 'family_member')) && (
                <ul className="space-y-2">
                  {currentNavigation.map(({ key, label, icon: Icon }) => (
                    <li key={key}>
                      <button
                        onClick={() => navigateTo(key, label)}
                        className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl text-left transition-all duration-300 font-medium transform ${
                          activeTab === key
                            ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg scale-105'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:translate-x-0.5'
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                        <span>{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {(currentUser?.role === 'patient' || currentUser?.role === 'family_member') && (
                <div className="mt-6 bg-white/70 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Family View</span>
                    <button
                      onClick={() => setShowFamilyView(!showFamilyView)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${showFamilyView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {showFamilyView ? 'On' : 'Off'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Toggle to view aggregated family stats and challenges.</p>
                </div>
              )}
              
              {(currentFamily && currentUser?.role !== 'caregiver' && currentUser?.role !== 'doctor') && (
                <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">Family Information</h3>
                  <div className="space-y-2">
                    <p className="text-xs text-gray-600">Family ID:</p>
                    <div className="bg-white/60 p-2 rounded-lg">
                      <p className="font-mono text-xs font-bold text-blue-600">
                        {currentFamily.family_id}
                      </p>
                    </div>
                    <p className="text-xs text-gray-600 mt-3">
                      Members: {currentFamily.members.length}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentFamily.family_id);
                      alert('Family ID copied to clipboard!');
                    }}
                    className="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors"
                  >
                    Share Family ID
                  </button>
                </div>
              )}
              </div>
            </nav>

            <main className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab + (showFamilyView?'-family':'') + (currentUser?.role||'')}
                  initial={{ opacity: 0, y: 8, scale: 0.997 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.997 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {renderContent()}
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>

        <Chatbot />

        {frameLoading.visible && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 backdrop-blur-md flex items-center justify-center z-50"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 animate-pulse shadow-2xl flex items-center justify-center">
                <Heart className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div className="absolute inset-0 -z-10 animate-spin-slow">
                <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-40">
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa"/>
                      <stop offset="50%" stopColor="#a855f7"/>
                      <stop offset="100%" stopColor="#ec4899"/>
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="60" r="50" stroke="url(#grad)" strokeWidth="2" fill="none" strokeDasharray="8 6" />
                </svg>
              </div>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-white text-center mt-4 font-medium text-lg"
              >
                {frameLoading.label}...
              </motion.p>
            </div>
          </motion.div>
        )}
        
        {showTelemedicine && <TelemedicineModal onClose={() => setShowTelemedicine(false)} />}
        {showTelepharmacy && <TelepharmacyModal onClose={() => setShowTelepharmacy(false)} />}
        {showPointsStore && <PointsStoreModal onClose={() => setShowPointsStore(false)} />}
        {showSymptomChecker && <AISymptomChecker onClose={() => setShowSymptomChecker(false)} />}
        {showPredictiveInsights && <PredictiveHealthInsights onClose={() => setShowPredictiveInsights(false)} />}
      </div>
    );
  };

  const FamilyDashboard: React.FC = () => {
    const memberCount = currentFamily?.members.length || 0;
    const totalMeds = currentFamily ? currentFamily.members.reduce((sum, m) => sum + medications.filter(x => x.member_id === m.user_id).length, 0) : 0;
    const totalAppts = currentFamily ? currentFamily.members.reduce((sum, m) => sum + appointments.filter(x => x.member_id === m.user_id).length, 0) : 0;
    const familyProgress = wellnessChallenges.reduce((sum, c) => sum + c.progress, 0) / (wellnessChallenges.length || 1);
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[{title:'Family Members', value: memberCount, icon: Users, color:'from-blue-400 to-blue-600'}, {title:'Total Medications', value: totalMeds, icon: Pill, color:'from-green-400 to-green-600'}, {title:'Upcoming Appointments', value: totalAppts, icon: Calendar, color:'from-purple-400 to-purple-600'}, {title:'Challenge Progress', value: `${Math.round(familyProgress)}%`, icon: Target, color:'from-yellow-400 to-orange-600'}].map((s, i)=> (
            <div key={i} className={`bg-gradient-to-r ${s.color} rounded-lg p-6 text-white`}>
              <div className="flex items-center"><s.icon className="w-8 h-8 mr-4"/><div><p className="text-sm font-medium">{s.title}</p><p className="text-2xl font-bold">{s.value}</p></div></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart
            values={(currentFamily?.members || []).map(m => appointments.filter(x => x.member_id===m.user_id).length)}
            labels={(currentFamily?.members || []).map(m => m.name.split(' ')[0])}
            color="#3b82f6"
            title="Appointments per Member"
          />
          <div className="bg-white/80 p-6 rounded-2xl border">
            <h4 className="font-bold mb-3">Wellness Challenges</h4>
            <div className="space-y-3">
              {wellnessChallenges.map(c => (
                <div key={c.id} className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">{c.name}</span>
                    <span className="text-sm font-bold text-green-700">{c.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full mt-2"><div className="bg-green-500 h-2 rounded-full" style={{width:`${c.progress}%`}} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BarChart
            values={(currentFamily?.members || []).map(m => medications.filter(x => x.member_id===m.user_id).length)}
            labels={(currentFamily?.members || []).map(m => m.name.split(' ')[0])}
            color="#f59e0b"
            title="Medications per Member"
          />
          <LineChart
            data={(currentFamily?.members || []).map((m,i)=> 60 + i*10)}
            labels={(currentFamily?.members || []).map(m => m.name.split(' ')[0])}
            color="#10b981"
            title="Challenge Contribution by Member (%)"
          />
        </div>
      </div>
    );
  };

  const PatientDashboard: React.FC = React.memo(() => {
    const memberId = selectedMember?.user_id;
    
    const dashboardStats = useMemo(() => [
      { key: 'medications', title: "Today's Medications", value: medications.filter(m => m.member_id === memberId).length, icon: Pill, bg: "from-blue-400 to-blue-600" },
      { key: 'appointments', title: "Upcoming Appointments", value: appointments.filter(a => a.member_id === memberId).length, icon: Calendar, bg: "from-green-400 to-green-600" },
      { key: 'goals', title: "Health Goals", value: healthGoals.filter(g => g.member_id === memberId).length, icon: Target, bg: "from-purple-400 to-purple-600" },
      { key: 'dashboard', title: "Patient ID", value: selectedMember?.patient_id || 'N/A', icon: Shield, bg: "from-yellow-400 to-orange-600" }
    ], [medications, appointments, healthGoals, memberId, selectedMember?.patient_id]);

    const bpData = useMemo(() => {
      const bp = vitals.filter(v => v.member_id === memberId && v.type === 'bp').slice(-12);
      return {
        data: bp.map(v => parseInt(v.value.split('/')[0])),
        labels: bp.map(v => new Date(v.recorded_at).toLocaleDateString())
      };
    }, [vitals, memberId]);

    const appointmentData = useMemo(() => {
      const appts = appointments.filter(a => a.member_id === memberId).slice(0, 6);
      return {
        values: appts.map(() => 1),
        labels: appts.map(a => new Date(a.appointment_date).toLocaleDateString())
      };
    }, [appointments, memberId]);

    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {dashboardStats.map((item, index) => (
            <motion.button 
              key={index} 
              onClick={() => navigateTo(item.key, item.title)} 
              className={`relative group rounded-lg p-[2px] overflow-hidden`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`absolute -inset-[2px] bg-gradient-to-r ${item.bg} opacity-80 blur group-hover:opacity-100 transition-all duration-300`}></div>
              <div className="relative bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 text-left text-gray-900">
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 mr-3 md:mr-4 rounded-xl bg-white/20 flex items-center justify-center text-white">
                    <item.icon className="w-4 h-4 md:w-6 md:h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs md:text-sm font-medium truncate">{item.title}</p>
                    <p className="text-lg md:text-2xl font-bold">{item.value}</p>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedMember?.gender === 'female' && <MenstrualTracker />}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <LineChart 
              data={bpData.data.length ? bpData.data : [115,116,117,118,119,120,121]} 
              labels={bpData.labels.length ? bpData.labels : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']} 
              color="#60a5fa" 
              title="Blood Pressure (Systolic)" 
            />
            <BarChart 
              values={appointmentData.values.length ? appointmentData.values : [1,1,1]} 
              labels={appointmentData.labels.length ? appointmentData.labels : ['Date1','Date2','Date3']} 
              color="#34d399" 
              title="Upcoming Appointments" 
            />
          </div>
          <button
            className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 text-left hover:shadow-lg transition-all duration-300 group"
            onClick={() => navigateTo('goals', 'Health Goals')}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Family Wellness Challenges</h4>
                <p className="text-sm text-gray-600">Compete with family members</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">Join family competitions, earn points, and achieve health goals together</p>
            <div className="flex items-center justify-between">
              <span className="text-green-600 font-semibold">{currentUser?.points || 0} pts earned</span>
              <span className="text-2xl">🏆</span>
            </div>
          </button>
          <button
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 text-left hover:shadow-lg transition-all duration-300 group"
            onClick={() => navigateTo('vitals', 'Vitals')}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">AI Health Insights</h4>
                <p className="text-sm text-gray-600">Personalized recommendations</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-4">Get AI-powered health predictions and personalized care suggestions</p>
            <div className="flex items-center justify-between">
              <span className="text-purple-600 font-semibold">
                {aiInsights ? `${Math.round(aiInsights.confidence * 100)}% confidence` : 'Loading...'}
              </span>
              <span className="text-2xl">🤖</span>
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(() => {
            const taken = medications.filter(m=>m.member_id===selectedMember?.user_id && m.taken_today).length;
            const due = medications.filter(m=>m.member_id===selectedMember?.user_id && !m.taken_today).length;
            return <DonutChart values={[taken, due]} labels={["Taken","Due"]} colors={["#22c55e","#f59e0b"]} title="Medication Adherence" />;
          })()}
          <BarChart
            values={healthGoals.filter(g=>g.member_id===selectedMember?.user_id).slice(0,5).map(g=>Math.round((g.current_value/g.target_value)*100))}
            labels={healthGoals.filter(g=>g.member_id===selectedMember?.user_id).slice(0,5).map(g=>g.title.slice(0,6))}
            color="#818cf8"
            title="Goal Completion %"
          />
          {(() => {
            const wt = vitals.filter(v=>v.member_id===selectedMember?.user_id && v.type==='weight').slice(-12);
            const data = wt.map(v=> parseInt(v.value));
            const labels = wt.map(v=> new Date(v.recorded_at).toLocaleDateString());
            return <LineChart data={data.length?data:[72,72,73,73,72,71]} labels={labels.length?labels:['Mon','Tue','Wed','Thu','Fri','Sat']} color="#f97316" title="Weight Trend (kg)" />;
          })()}
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 p-8 rounded-2xl text-center shadow-xl">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to activate the family emergency SOS? This will notify all family members and emergency contacts immediately.')) {
                alert('🚨 Emergency SOS activated! All family members and emergency contacts have been notified with your location and recent health data.');
              }
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-2xl font-bold py-6 px-12 rounded-full transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-110 animate-pulse"
          >
            🚨 Family Emergency SOS
          </button>
          <p className="text-red-700 text-sm mt-4 font-medium">Instantly alerts family + emergency contacts with location & vitals</p>
        </div>
      </div>
    );
  });

  if (!currentUser || !currentFamily) {
    if (showLanding) return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    if (showLanding) {
      return <LandingPage onGetStarted={() => setShowLanding(false)} />;
    }
    return (
      <AuthForm
        authMode={authMode}
        onAuthModeChange={setAuthMode}
        loading={loading}
        onSubmit={formData => handleAuth(formData, authMode === 'login')}
        onSubmit={handleAuthSubmit}
      />
    );
  }

  return <MainApp />;
  return <AppShell />;
};

export default AegisLink;