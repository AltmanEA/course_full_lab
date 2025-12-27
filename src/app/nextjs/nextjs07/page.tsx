export default function Home() {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Active Link Navigation</h1>
      <p className="text-gray-600 mb-4">
        This example demonstrates how to implement active link styling in Next.js navigation.
      </p>
      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="text-sm text-gray-600">
          The navigation bar above shows active link styling. The current page link 
          is highlighted differently from other links.
        </p>
      </div>
    </div>
  );
}