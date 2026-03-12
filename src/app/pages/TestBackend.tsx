import { useState } from "react";
import { projectId, publicAnonKey } from '/utils/supabase/info';

export default function TestBackend() {
  const [testResults, setTestResults] = useState<any>(null);
  const [testing, setTesting] = useState(false);
  const [clearing, setClearing] = useState(false);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-9f30820f`;

  const clearAllItems = async () => {
    if (!confirm('Are you sure you want to delete ALL items from the marketplace? This cannot be undone.')) {
      return;
    }

    setClearing(true);
    try {
      const response = await fetch(`${API_URL}/dev/clear-all-items`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message || 'All items cleared!');
        window.location.reload();
      } else {
        alert('Failed to clear items: ' + data.error);
      }
    } catch (error: any) {
      alert('Error: ' + error.message);
    } finally {
      setClearing(false);
    }
  };

  const runTests = async () => {
    setTesting(true);
    const results: any = {
      projectId,
      apiUrl: API_URL,
      tests: {}
    };

    try {
      // Test 1: Health Check
      const healthResponse = await fetch(`${API_URL}/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      results.tests.health = {
        status: healthResponse.status,
        ok: healthResponse.ok,
        data: await healthResponse.json()
      };

      // Test 2: Get Items (should return empty array if no items)
      const itemsResponse = await fetch(`${API_URL}/items`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      results.tests.items = {
        status: itemsResponse.status,
        ok: itemsResponse.ok,
        data: await itemsResponse.json()
      };

    } catch (error: any) {
      results.error = error.message;
      results.errorDetails = error.toString();
    }

    setTestResults(results);
    setTesting(false);
  };

  return (
    <div className="min-h-screen bg-[rgba(230,225,220,0.37)] pt-24 pb-16">
      <div className="container mx-auto px-6 max-w-[1000px]">
        <h1 className="font-['Libre_Caslon_Display',sans-serif] text-4xl mb-8">
          Backend Status Check
        </h1>

        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
            Configuration
          </h2>
          <div className="font-['Courier',monospace] text-sm space-y-2">
            <div>
              <span className="text-gray-600">Project ID:</span>{' '}
              <span className="font-semibold">{projectId}</span>
            </div>
            <div>
              <span className="text-gray-600">API URL:</span>{' '}
              <span className="font-semibold">{API_URL}</span>
            </div>
          </div>
        </div>

        <button
          onClick={runTests}
          disabled={testing}
          className="bg-black text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] hover:bg-gray-800 disabled:bg-gray-400 mb-6"
        >
          {testing ? 'Testing...' : 'Run Backend Tests'}
        </button>

        {testResults && (
          <div className="bg-white rounded-lg p-6">
            <h2 className="font-['Libre_Caslon_Display',sans-serif] text-2xl mb-4">
              Test Results
            </h2>
            
            {testResults.error ? (
              <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                <h3 className="font-semibold text-red-800 mb-2">❌ Backend Not Running</h3>
                <p className="text-red-600 text-sm mb-2">Error: {testResults.error}</p>
                <p className="text-xs text-gray-600">{testResults.errorDetails}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Health Check */}
                <div className={`border rounded p-4 ${testResults.tests.health?.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h3 className="font-semibold mb-2">
                    {testResults.tests.health?.ok ? '✅' : '❌'} Health Check
                  </h3>
                  <div className="text-sm">
                    <div>Status: {testResults.tests.health?.status}</div>
                    <div className="font-['Courier',monospace] text-xs mt-2 bg-white p-2 rounded">
                      {JSON.stringify(testResults.tests.health?.data, null, 2)}
                    </div>
                  </div>
                </div>

                {/* Items Endpoint */}
                <div className={`border rounded p-4 ${testResults.tests.items?.ok ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h3 className="font-semibold mb-2">
                    {testResults.tests.items?.ok ? '✅' : '❌'} Items Endpoint
                  </h3>
                  <div className="text-sm">
                    <div>Status: {testResults.tests.items?.status}</div>
                    <div className="font-['Courier',monospace] text-xs mt-2 bg-white p-2 rounded max-h-40 overflow-auto">
                      {JSON.stringify(testResults.tests.items?.data, null, 2)}
                    </div>
                  </div>
                </div>

                {testResults.tests.health?.ok && testResults.tests.items?.ok && (
                  <div className="bg-green-100 border border-green-300 rounded p-4">
                    <h3 className="font-semibold text-green-800 text-lg">
                      🎉 Backend is Running!
                    </h3>
                    <p className="text-green-700 text-sm mt-2">
                      Your Supabase backend is working correctly. You can now use the app!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-3">
            What to do if tests fail:
          </h3>
          <ol className="list-decimal list-inside space-y-2 font-['Inter',sans-serif] text-sm">
            <li>Make sure the Supabase Edge Function is deployed</li>
            <li>Check that the project ID is correct: <code className="bg-white px-2 py-1 rounded">{projectId}</code></li>
            <li>Verify environment variables are set in Supabase dashboard</li>
            <li>Check the Supabase Functions logs for errors</li>
          </ol>
        </div>

        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-['Libre_Caslon_Display',sans-serif] text-xl mb-3">
            Clear All Items:
          </h3>
          <button
            onClick={clearAllItems}
            disabled={clearing}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-['Inter',sans-serif] hover:bg-red-600 disabled:bg-gray-400"
          >
            {clearing ? 'Clearing...' : 'Clear All Items'}
          </button>
        </div>
      </div>
    </div>
  );
}