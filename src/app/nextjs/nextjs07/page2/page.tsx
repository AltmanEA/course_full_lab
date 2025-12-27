export default function Page2() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Page 2</h2>
      <p className="text-gray-600">
        This is the second page in our navigation example. The active link in the 
        navigation bar should be highlighted differently from other links.
      </p>
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="text-sm text-gray-600">
          Notice how the "Page 2" link in the navigation bar is highlighted 
          to indicate it's the current page.
        </p>
      </div>
    </div>
  );
}