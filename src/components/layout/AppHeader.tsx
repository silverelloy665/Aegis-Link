import React from 'react';
import { Activity, Gift, Shield, ShoppingCart, Video } from 'lucide-react';
import { Family, User } from '../../types';

interface AppHeaderProps {
  currentUser: User | null;
  currentFamily: Family | null;
  selectedMember: User | null;
  onOpenSymptomChecker: () => void;
  onOpenTelemedicine: () => void;
  onOpenTelepharmacy: () => void;
  onOpenPointsStore: () => void;
  onLogout: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentUser,
  currentFamily,
  selectedMember,
  onOpenSymptomChecker,
  onOpenTelemedicine,
  onOpenTelepharmacy,
  onOpenPointsStore,
  onLogout
}) => {
  const isDoctor = currentUser?.role === 'doctor';
  const isCaregiver = currentUser?.role === 'caregiver';

  return (
    <header className="bg-gradient-to-r from-white/90 to-blue-50/80 backdrop-blur-xl shadow-lg border-b border-blue-200/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Shield className="h-10 w-10 text-blue-600 drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Aegis Link
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Family Health Management • {currentFamily?.family_name || 'Family'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              {!isDoctor && (
                <button
                  onClick={onOpenSymptomChecker}
                  className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  title="AI Symptom Checker"
                >
                  <Activity className="h-5 w-5" />
                </button>
              )}
              {!isDoctor && !isCaregiver && (
                <>
                  <button
                    onClick={onOpenTelemedicine}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Telemedicine"
                  >
                    <Video className="h-5 w-5" />
                  </button>
                  <button
                    onClick={onOpenTelepharmacy}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="Telepharmacy"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button
                    onClick={onOpenPointsStore}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 transition-all duration-300"
                    title="Points Store"
                  >
                    <Gift className="h-4 w-4" />
                    <span className="font-bold">{currentUser?.points || 0}</span>
                  </button>
                </>
              )}
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">Welcome, {currentUser?.name}</p>
              <p className="text-xs text-gray-600 font-medium capitalize">
                {currentUser?.role.replace('_', ' ')} • {selectedMember?.name}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

