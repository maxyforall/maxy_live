// Profile Management System Test Suite
// This file contains comprehensive tests for all profile management features

// Test data
const testUser = {
  name: 'Test User',
  email: 'testuser@example.com',
  password: 'TestPassword123!',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  maxy_id: 'testmaxy123',
  terms_accepted: true
};

// API Endpoints Test
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Test functions
async function testUserRegistration() {
  console.log('🧪 Testing User Registration...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        dateOfBirth: testUser.dateOfBirth,
        gender: testUser.gender,
        maxy_id: testUser.maxy_id,
        terms_accepted: testUser.terms_accepted
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ User Registration: PASSED');
      console.log('   - User created successfully');
      console.log(`   - User ID: ${data.userId}`);
      return data.userId;
    } else {
      console.log('❌ User Registration: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ User Registration: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testUserLogin() {
  console.log('\n🧪 Testing User Login...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password
      }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ User Login: PASSED');
      console.log('   - Login successful');
      console.log(`   - Token received: ${data.token.substring(0, 20)}...`);
      return data.token;
    } else {
      console.log('❌ User Login: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ User Login: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testGetUserProfile(token) {
  console.log('\n🧪 Testing Get User Profile...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Get User Profile: PASSED');
      console.log('   - Profile retrieved successfully');
      console.log(`   - Name: ${data.name}`);
      console.log(`   - Email: ${data.email}`);
      console.log(`   - Maxy ID: ${data.maxy_id}`);
      console.log(`   - Can change Maxy ID: ${data.canChangeMaxyId}`);
      return data;
    } else {
      console.log('❌ Get User Profile: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ Get User Profile: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testUpdateUserProfile(token) {
  console.log('\n🧪 Testing Update User Profile...');
  
  const updatedData = {
    name: 'Updated Test User',
    email: 'updatedemail@example.com',
    dateOfBirth: '1991-02-02',
    gender: 'female'
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Update User Profile: PASSED');
      console.log('   - Profile updated successfully');
      console.log(`   - Updated Name: ${data.name}`);
      console.log(`   - Updated Email: ${data.email}`);
      return data;
    } else {
      console.log('❌ Update User Profile: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ Update User Profile: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testChangePassword(token) {
  console.log('\n🧪 Testing Change Password...');
  
  const passwordData = {
    currentPassword: testUser.password,
    newPassword: 'NewPassword123!'
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(passwordData),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Change Password: PASSED');
      console.log('   - Password changed successfully');
      return true;
    } else {
      console.log('❌ Change Password: FAILED');
      console.log(`   - Error: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Change Password: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return false;
  }
}

async function testUpdateMaxyId(token) {
  console.log('\n🧪 Testing Update Maxy ID...');
  
  const newMaxyId = 'newmaxyid456';
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/update-maxy-id`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newMaxyId }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Update Maxy ID: PASSED');
      console.log('   - Maxy ID updated successfully');
      console.log(`   - New Maxy ID: ${data.maxy_id}`);
      return data;
    } else {
      console.log('❌ Update Maxy ID: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ Update Maxy ID: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testAcceptTerms(token) {
  console.log('\n🧪 Testing Accept Terms...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/accept-terms`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Accept Terms: PASSED');
      console.log('   - Terms accepted successfully');
      return true;
    } else {
      console.log('❌ Accept Terms: FAILED');
      console.log(`   - Error: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Accept Terms: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return false;
  }
}

async function testGetAccountDetails(token) {
  console.log('\n🧪 Testing Get Account Details...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/account-details`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Get Account Details: PASSED');
      console.log('   - Account details retrieved successfully');
      console.log(`   - Account Status: ${data.account_status}`);
      console.log(`   - Terms Accepted: ${data.terms_accepted}`);
      console.log(`   - Login Attempts: ${data.login_attempts}`);
      return data;
    } else {
      console.log('❌ Get Account Details: FAILED');
      console.log(`   - Error: ${data.message}`);
      return null;
    }
  } catch (error) {
    console.log('❌ Get Account Details: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return null;
  }
}

async function testDeactivateAccount(token) {
  console.log('\n🧪 Testing Deactivate Account...');
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/deactivate-account`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Deactivate Account: PASSED');
      console.log('   - Account deactivated successfully');
      return true;
    } else {
      console.log('❌ Deactivate Account: FAILED');
      console.log(`   - Error: ${data.message}`);
      return false;
    }
  } catch (error) {
    console.log('❌ Deactivate Account: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return false;
  }
}

async function testValidation() {
  console.log('\n🧪 Testing Input Validation...');
  
  const invalidData = {
    name: '', // Empty name
    email: 'invalid-email', // Invalid email format
    password: '123', // Weak password
    dateOfBirth: 'invalid-date', // Invalid date format
    gender: 'invalid-gender', // Invalid gender value
    maxy_id: 'test maxy id' // Invalid Maxy ID (contains spaces)
  };
  
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.log('✅ Input Validation: PASSED');
      console.log('   - Validation correctly rejected invalid data');
      console.log(`   - Error: ${data.message}`);
      return true;
    } else {
      console.log('❌ Input Validation: FAILED');
      console.log('   - Validation should have rejected invalid data');
      return false;
    }
  } catch (error) {
    console.log('❌ Input Validation: FAILED');
    console.log(`   - Network Error: ${error.message}`);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting Profile Management System Tests\n');
  console.log('='.repeat(60));
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test validation
  totalTests++;
  if (await testValidation()) passedTests++;
  
  // Test registration
  totalTests++;
  const userId = await testUserRegistration();
  if (userId) passedTests++;
  
  // Test login
  totalTests++;
  const token = await testUserLogin();
  if (token) passedTests++;
  
  if (token) {
    // Test profile operations
    totalTests++;
    if (await testGetUserProfile(token)) passedTests++;
    
    totalTests++;
    if (await testUpdateUserProfile(token)) passedTests++;
    
    totalTests++;
    if (await testChangePassword(token)) passedTests++;
    
    totalTests++;
    if (await testUpdateMaxyId(token)) passedTests++;
    
    totalTests++;
    if (await testAcceptTerms(token)) passedTests++;
    
    totalTests++;
    if (await testGetAccountDetails(token)) passedTests++;
    
    totalTests++;
    if (await testDeactivateAccount(token)) passedTests++;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Test Results Summary:');
  console.log(`   Total Tests: ${totalTests}`);
  console.log(`   Passed: ${passedTests}`);
  console.log(`   Failed: ${totalTests - passedTests}`);
  console.log(`   Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 All tests passed! Profile management system is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the implementation.');
  }
}

// Export for use in other files
export {
  testUserRegistration,
  testUserLogin,
  testGetUserProfile,
  testUpdateUserProfile,
  testChangePassword,
  testUpdateMaxyId,
  testAcceptTerms,
  testGetAccountDetails,
  testDeactivateAccount,
  testValidation,
  runAllTests
};

// Run tests if this file is executed directly
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}