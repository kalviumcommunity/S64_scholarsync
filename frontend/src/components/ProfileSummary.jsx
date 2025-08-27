import React from 'react';
import { User, BookOpen, Award, MapPin } from 'lucide-react';

const ProfileSummary = ({ profile }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <User className="w-6 h-6 mr-3 text-blue-600" />
        Your Profile Summary
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Academic Year</div>
            <div className="font-semibold">{profile.year}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Award className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Field of Study</div>
            <div className="font-semibold">{profile.field}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-purple-100 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Location</div>
            <div className="font-semibold">{profile.location}</div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Special Category</div>
            <div className="font-semibold">
              {profile.specialCategory.length > 0 ? profile.specialCategory.join(', ') : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;