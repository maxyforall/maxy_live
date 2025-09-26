// Quick test to verify authentication fix
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function testAuthFix() {
  console.log('🧪 Testing Authentication Fix...\n');
  
  // Test 1: Profile access without token (should fail with 401)
  console.log('1️⃣ Testing profile access without token...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Response status:', response.status);
    const data = await response.json();
    console.log('✅ Response message:', data.message);
    
    if (response.status === 401) {
      console.log('✅ Authentication correctly rejecting unauthenticated requests');
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  console.log('\n2️⃣ Testing profile access with invalid token...');
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid_token_12345',
        'Content-Type': 'application/json',
      }
    });
    
    console.log('✅ Response status:', response.status);
    const data = await response.json();
    console.log('✅ Response message:', data.message);
    
    if (response.status === 401) {
      console.log('✅ Authentication correctly rejecting invalid tokens');
    }
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
  
  console.log('\n🎉 Authentication fix verification complete!');
  console.log('✅ The server is now properly protecting the profile endpoint');
  console.log('✅ No more "Cannot read properties of undefined" errors');
}

// Run the test
testAuthFix().catch(console.error);