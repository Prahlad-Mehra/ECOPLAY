import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Award, Download, CheckCircle, Clock, BarChart3 } from 'lucide-react';

const TeacherDashboard = () => {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'students' | 'submissions'>('overview');

  // Mock data for demo
  const classStats = {
    totalStudents: 28,
    activeToday: 22,
    averageScore: 78,
    completedLessons: 156,
    totalPoints: 8420,
    badgesEarned: 89,
  };

  const studentData = [
    { id: 1, name: 'Alice Johnson', points: 450, level: 5, lessons: 8, badges: 4, lastActive: '2 hours ago', status: 'active' },
    { id: 2, name: 'Bob Smith', points: 380, level: 4, lessons: 6, badges: 3, lastActive: '1 day ago', status: 'active' },
    { id: 3, name: 'Carol Davis', points: 520, level: 6, lessons: 10, badges: 5, lastActive: '30 mins ago', status: 'active' },
    { id: 4, name: 'David Wilson', points: 290, level: 3, lessons: 4, badges: 2, lastActive: '3 days ago', status: 'inactive' },
    { id: 5, name: 'Emma Brown', points: 610, level: 7, lessons: 12, badges: 6, lastActive: '1 hour ago', status: 'active' },
  ];

  const submissions = [
    { id: 1, student: 'Alice Johnson', type: 'Photo', title: 'Waste Segregation at Home', status: 'pending', date: '2 hours ago' },
    { id: 2, student: 'Carol Davis', type: 'Photo', title: 'Community Garden Project', status: 'approved', date: '1 day ago' },
    { id: 3, student: 'Emma Brown', type: 'Report', title: 'Energy Conservation Report', status: 'pending', date: '3 hours ago' },
    { id: 4, student: 'Bob Smith', type: 'Photo', title: 'Recycling Initiative', status: 'approved', date: '2 days ago' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'submissions', label: 'Submissions', icon: CheckCircle },
  ];

  const handleApproveSubmission = (submissionId: number) => {
    console.log('Approved submission:', submissionId);
    // In a real app, this would update the backend
  };

  const handleExportData = () => {
    console.log('Exporting leaderboard data...');
    // In a real app, this would generate and download a CSV/PDF
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            👩‍🏫 Teacher Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Monitor student progress and manage environmental learning activities
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-white rounded-2xl shadow-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-emerald-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{classStats.totalStudents}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Total Students</h3>
                <p className="text-sm text-gray-600">{classStats.activeToday} active today</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-2xl font-bold text-emerald-600">{classStats.averageScore}%</span>
                </div>
                <h3 className="font-semibold text-gray-800">Average Score</h3>
                <p className="text-sm text-gray-600">Class performance</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{classStats.badgesEarned}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Badges Earned</h3>
                <p className="text-sm text-gray-600">Total achievements</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-orange-600">{classStats.completedLessons}</span>
                </div>
                <h3 className="font-semibold text-gray-800">Lessons Completed</h3>
                <p className="text-sm text-gray-600">Total progress</p>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
                <button
                  onClick={handleExportData}
                  className="flex items-center space-x-2 bg-emerald-500 text-white px-4 py-2 rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Emma Brown completed Water Cycle lesson</p>
                    <p className="text-sm text-gray-600">1 hour ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-xl">
                  <Award className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Alice Johnson earned "Eco Warrior" badge</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-xl">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Carol Davis submitted recycling project</p>
                    <p className="text-sm text-gray-600">3 hours ago</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedTab === 'students' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50">
              <h2 className="text-2xl font-bold text-gray-800">Student Progress</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lessons</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badges</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentData.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{student.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-emerald-600 font-semibold">{student.points}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-blue-600 font-semibold">{student.level}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-purple-600 font-semibold">{student.lessons}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-orange-600 font-semibold">{student.badges}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {student.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          student.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selectedTab === 'submissions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Submissions</h2>
              
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          submission.type === 'Photo' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          <span className={`text-sm font-bold ${
                            submission.type === 'Photo' ? 'text-blue-600' : 'text-purple-600'
                          }`}>
                            {submission.type === 'Photo' ? '📷' : '📄'}
                          </span>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-800">{submission.title}</h3>
                          <p className="text-sm text-gray-600">by {submission.student}</p>
                          <p className="text-xs text-gray-500">{submission.date}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                          submission.status === 'approved' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {submission.status}
                        </span>
                        
                        {submission.status === 'pending' && (
                          <button
                            onClick={() => handleApproveSubmission(submission.id)}
                            className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-600 transition-colors"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;