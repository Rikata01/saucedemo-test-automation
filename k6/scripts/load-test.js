import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 20 },  // ramp up
    { duration: '3m', target: 20 },  // stay
    { duration: '1m', target: 0 },   // ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<3000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io/');
  check(res, {
    'status 200': (r) => r.status === 200,
    'response fast': (r) => r.timings.duration < 2000,
  });

  sleep(Math.random() * 2 + 1); // random 1-3s เพื่อ simulate real user
}