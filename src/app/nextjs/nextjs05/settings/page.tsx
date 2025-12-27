import DashboardNav from '../DashboardNav';

export default function DashboardSettings() {
  return (
    <div>
      {/* TODO: Перенесите эту навигацию в общий layout */}
      <div className="mt-4">
        <DashboardNav />
      </div>
      
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Dashboard Settings
          </h2>
          <p className="text-gray-600">
            Manage your dashboard preferences and configuration.
          </p>
          
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dashboard Title</label>
                  <input
                    type="text"
                    defaultValue="My Dashboard"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Theme</label>
                  <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>Auto</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="email-notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                    Email notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-notifications"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-900">
                    Push notifications
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}