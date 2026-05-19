import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 50 },   // ramp up
    { duration: '3m', target: 50 },   // stay
    { duration: '2m', target: 100 },  // push harder
    { duration: '3m', target: 100 },  // stay
    { duration: '2m', target: 0 },    // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io/');
  check(res, {
    'status 200': (r) => r.status === 200,
    'response under 3s': (r) => r.timings.duration < 3000,
  });

  sleep(Math.random() * 2 + 1);
}