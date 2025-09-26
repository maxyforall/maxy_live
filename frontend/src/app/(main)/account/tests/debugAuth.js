// Quick Authentication Debug Script
// Tests the authentication flow step by step

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function debugAuth() {
  console.log('🔍 Debugging Authentication Flow\n');
  
  // Test 1: Check if server is running
  console.log('1️⃣ Testing server connection...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (healthResponse.status === 401) {
      console.log('✅ Server is running (401 is expected without token)');
    } else {
      console.log('⚠️  Unexpected response:', healthResponse.status);
    }
  } catch (error) {
    console.log('❌ Server connection failed:', error.message);
    console.log('💡 Make sure the backend server is running on port 5000');
    return;
  }
  
  console.log('\n2️⃣ Testing CORS...');
  try {
    const corsResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization',
      }
    });
    
    console.log('✅ CORS preflight response:', corsResponse.status);
    console.log('📋 CORS headers:', {
      'Access-Control-Allow-Origin': corsResponse.headers.get('Access-Control-Allow-Origin'),
      'Access-Control-Allow-Methods': corsResponse.headers.get('Access-Control-Allow-Methods'),
      'Access-Control-Allow-Headers': corsResponse.headers.get('Access-Control-Allow-Headers'),
    });
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
  }
  
  console.log('\n3️⃣ Testing with mock token...');
  const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRlc3QtdXNlci1pZCIsImlhdCI6MTYwOTQ0NTYwMCwiZXhwIjoxNjEwMDUwNDAwfQ.invalid_signature';
  
  try {
    const tokenResponse = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${mockToken}`,
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Mock token response:', tokenResponse.status);
    if (tokenResponse.status === 401) {
      console.log('✅ Invalid tokens are properly rejected');
    }
  } catch (error) {
    console.log('❌ Mock token test failed:', error.message);
  }
  
  console.log('\n📋 Debug Summary:');
  console.log('- Server Status: Check if backend is running');
  console.log('- CORS Configuration: Verify headers are set correctly');
  console.log('- Token Validation: Confirm invalid tokens are rejected');
  console.log('');
  console.log('🔧 Next Steps:');
  console.log('1. Ensure backend server is running: npm start in backend-maxy');
  console.log('2. Check browser console for detailed error messages');
  console.log('3. Verify token is stored in localStorage after login');
  console.log('4. Check network tab for request/response details');
}

// Run the debug script
debugAuth().catch(console.error);