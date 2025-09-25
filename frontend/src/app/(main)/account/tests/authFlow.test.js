/**
 * Authentication Flow Test Suite
 * Tests the complete authentication flow from login to profile access
 */

// Test data
const testUser = {
  maxyId: 'test_user_123',
  password: 'Test@123456',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User'
};

// API endpoints
const API_BASE_URL = 'http://localhost:5000/api';

// Test functions
async function testRegistration() {
  console.log('🧪 Testing user registration...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        emailId: testUser.email,
        maxy_id: testUser.maxyId,
        password: testUser.password,
        terms_accepted: true,
        terms_version: '1.0'
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Registration successful');
      return data.token;
    } else {
      console.log('❌ Registration failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Registration error:', error.message);
    return null;
  }
}

async function testLogin() {
  console.log('🧪 Testing user login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        maxyId: testUser.maxyId,
        password: testUser.password
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Login successful');
      console.log('📋 Token received:', data.token.substring(0, 20) + '...');
      return data.token;
    } else {
      console.log('❌ Login failed:', data.message);
      return null;
    }
  } catch (error) {
    console.log('❌ Login error:', error.message);
    return null;
  }
}

async function testProfileAccess(token) {
  console.log('🧪 Testing profile access with token...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Profile access successful');
      console.log('👤 User data:', {
        maxy_id: data.maxy_id,
        email: data.emailId,
        name: `${data.firstName} ${data.lastName}`
      });
      return true;
    } else {
      console.log('❌ Profile access failed:', data.message);
      console.log('📊 Response status:', response.status);
      console.log('🔍 Response headers:', Object.fromEntries(response.headers.entries()));
      return false;
    }
  } catch (error) {
    console.log('❌ Profile access error:', error.message);
    return false;
  }
}

async function testInvalidToken() {
  console.log('🧪 Testing profile access with invalid token...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid_token_12345',
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.status === 401) {
      console.log('✅ Invalid token properly rejected');
      return true;
    } else {
      console.log('❌ Invalid token test failed');
      console.log('📊 Response status:', response.status);
      console.log('📋 Response data:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Invalid token test error:', error.message);
    return false;
  }
}

async function testMissingToken() {
  console.log('🧪 Testing profile access without token...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    
    if (response.status === 401) {
      console.log('✅ Missing token properly rejected');
      return true;
    } else {
      console.log('❌ Missing token test failed');
      console.log('📊 Response status:', response.status);
      console.log('📋 Response data:', data);
      return false;
    }
  } catch (error) {
    console.log('❌ Missing token test error:', error.message);
    return false;
  }
}

// Main test runner
async function runAuthTests() {
  console.log('🚀 Starting Authentication Flow Tests\n');
  
  let token = null;
  let passedTests = 0;
  let totalTests = 0;
  
  // Test 1: Login (or register if needed)
  totalTests++;
  token = await testLogin();
  if (token) {
    passedTests++;
  } else {
    console.log('📝 Trying registration first...');
    token = await testRegistration();
    if (token) {
      passedTests++;
    }
  }
  
  console.log(''); // Empty line for readability
  
  // Test 2: Profile access with valid token
  if (token) {
    totalTests++;
    if (await testProfileAccess(token)) {
      passedTests++;
    }
  }
  
  console.log(''); // Empty line for readability
  
  // Test 3: Invalid token handling
  totalTests++;
  if (await testInvalidToken()) {
    passedTests++;
  }
  
  console.log(''); // Empty line for readability
  
  // Test 4: Missing token handling
  totalTests++;
  if (await testMissingToken()) {
    passedTests++;
  }
  
  console.log(''); // Empty line for readability
  console.log('📊 Test Results Summary:');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All authentication tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the logs above.');
  }
  
  return { token, passedTests, totalTests };
}

// Export for use in other tests
export { 
  runAuthTests, 
  testLogin, 
  testProfileAccess,
  testUser 
};