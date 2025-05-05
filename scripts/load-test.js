const k6 = require('k6');
const http = require('k6/http');
const { check, sleep } = require('k6');
const { Rate } = require('k6/metrics');

// Custom metrics
const errorRate = new Rate('errors');

// Configuration
const BASE_URL = process.env.LOAD_TEST_URL || 'https://your-production-url.com';
const RAMP_UP_TIME = '30s';
const STEADY_STATE = '2m';
const RAMP_DOWN_TIME = '30s';
const VU_START = 1; // Virtual users to start with
const VU_TARGET = 50; // Max virtual users for load test

// K6 options for load test
exports.options = {
  scenarios: {
    ramp_up_down: {
      executor: 'ramping-vus',
      startVUs: VU_START,
      stages: [
        { duration: RAMP_UP_TIME, target: VU_TARGET }, // Ramp up
        { duration: STEADY_STATE, target: VU_TARGET },  // Stay at target
        { duration: RAMP_DOWN_TIME, target: VU_START }, // Ramp down
      ],
      gracefulRampDown: '10s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'], // 95% of requests should complete within 1s
    http_req_failed: ['rate<0.05'],    // Less than 5% of requests should fail
    'errors': ['rate<0.05'],           // Custom error rate should be under 5%
  },
};

// Main test function
export default function() {
  const homePageRes = http.get(`${BASE_URL}/`);
  
  // Verify homepage loads correctly
  check(homePageRes, {
    'homepage status is 200': (r) => r.status === 200,
    'homepage has correct title': (r) => r.body.includes('Find Your Healthshare Plan'),
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Load the questionnaire page
  const questionnaireRes = http.get(`${BASE_URL}/questionnaire`);
  
  check(questionnaireRes, {
    'questionnaire status is 200': (r) => r.status === 200,
    'questionnaire page loads': (r) => r.body.includes('Questionnaire'),
  }) || errorRate.add(1);
  
  sleep(2);
  
  // Submit a GET request to the plans page
  const plansRes = http.get(`${BASE_URL}/plans`);
  
  check(plansRes, {
    'plans page status is 200': (r) => r.status === 200,
    'plans page contains plan cards': (r) => r.body.includes('plan-card'),
  }) || errorRate.add(1);
  
  sleep(1);
  
  // Check blog content loading
  const blogRes = http.get(`${BASE_URL}/blog`);
  
  check(blogRes, {
    'blog status is 200': (r) => r.status === 200,
    'blog page loads': (r) => r.body.includes('Latest Articles'),
  }) || errorRate.add(1);
  
  sleep(3);
  
  // API test for plan data
  const apiRes = http.get(`${BASE_URL}/api/plans`);
  
  check(apiRes, {
    'API status is 200': (r) => r.status === 200,
    'API returns JSON': (r) => r.headers['Content-Type'].includes('application/json'),
    'API returns plan data': (r) => {
      try {
        const data = JSON.parse(r.body);
        return Array.isArray(data) && data.length > 0;
      } catch (e) {
        return false;
      }
    },
  }) || errorRate.add(1);
  
  // Test authentication endpoints with minimal impact
  const authPageRes = http.get(`${BASE_URL}/auth/login`);
  
  check(authPageRes, {
    'auth page loads': (r) => r.status === 200,
    'auth form is present': (r) => r.body.includes('form'),
  }) || errorRate.add(1);
  
  // Random sleep between requests to simulate real user behavior
  sleep(Math.random() * 3 + 1);
}

// Setup function - runs once per VU
export function setup() {
  console.log(`Starting load test against ${BASE_URL}`);
  
  // Verify site is reachable before starting full test
  const checkRes = http.get(BASE_URL);
  if (checkRes.status !== 200) {
    throw new Error(`Target site returned ${checkRes.status}, aborting load test`);
  }
  
  return { startTime: new Date().toISOString() };
}

// Teardown function - runs at end of test
export function teardown(data) {
  console.log(`Load test completed. Started at: ${data.startTime}, Ended at: ${new Date().toISOString()}`);
}

/*
To run this test:
1. Install k6: npm install -g k6
2. Set environment variable for target URL: 
   export LOAD_TEST_URL=https://your-production-url.com
3. Run test:
   k6 run scripts/load-test.js

Common flags:
- Lower load test: k6 run --vus 10 --duration 30s scripts/load-test.js
- Save results: k6 run --out json=results.json scripts/load-test.js
*/ 