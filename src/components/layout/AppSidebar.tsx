import React from 'react';
import {
  Bell,
  Calendar,
  CheckCircle,
  FileText,
  Heart,
  Home,
  Phone,
  Pill,
  Sparkles,
  Target,
  Users,
  Video
} from 'lucide-react';
import { Family, User } from '../../types';

interface AppSidebarProps {
  currentUser: User | null;
  currentFamily: Family | null;
  activeTab: string;
  showFamilyView: boolean;
  onNavigate: (key: string, label: string) => void;
  onToggleFamilyView: () => void;
}

const NAVIGATION_CONFIG = {
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

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentUser,
  currentFamily,
  activeTab,
  showFamilyView,
  onNavigate,
  onToggleFamilyView
}) => {
  const role = currentUser?.role as keyof typeof NAVIGATION_CONFIG;
  const currentNav = NAVIGATION_CONFIG[role] || NAVIGATION_CONFIG.patient;

  return (
    <nav className="w-72 relative">
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-blue-400 via-cyan-300 to-emerald-400 opacity-60 blur" />
      <div className="relative bg-gradient-to-br from-white/90 to-blue-50/50 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 p-6 sticky top-24 h-fit">
        {!(showFamilyView && (currentUser?.role === 'patient' || currentUser?.role === 'family_member')) && (
          <ul className="space-y-2">
            {currentNav.map(({ key, label, icon: Icon }) => (
              <li key={key}>
                <button
                  onClick={() => onNavigate(key, label)}
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
                onClick={onToggleFamilyView}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  showFamilyView ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {showFamilyView ? 'On' : 'Off'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">Toggle to view aggregated family stats and challenges.</p>
          </div>
        )}

        {currentFamily && currentUser?.role !== 'caregiver' && currentUser?.role !== 'doctor' && (
          <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-200">
            <h3 className="text-sm font-bold text-gray-800 mb-3">Family Information</h3>
            <div className="space-y-2">
              <p className="text-xs text-gray-600">Family ID:</p>
              <div className="bg-white/60 p-2 rounded-lg">
                <p className="font-mono text-xs font-bold text-blue-600">{currentFamily.family_id}</p>
              </div>
              <p className="text-xs text-gray-600 mt-3">Members: {currentFamily.members.length}</p>
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
  );
};

export default AppSidebar;

