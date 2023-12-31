import { config } from 'dotenv';
import { ServiceAccount } from 'firebase-admin';

config();

export const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  // type: 'service_account',
  // project_id: 'chatme-d4b25',
  // private_key_id: '1b256ca73ae49a5e7120e5767bb1d97f1da3e4ac',
  // private_key:
  //   '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC079Jh1bp5kcbg\ne8qW0ag4rw7oewfWM3Us39PQknLdjVy0J54d3gnBWPKnMk4rwiWnuKYp/l0PezTd\nSS1FmBhfonkYGTrMK2pvNVdYAY49R8EST5loKGGWY2wliQHGWCLeCg0OyA3TNFVr\nMShDcJ5CTe/WI1xiZGRbqLKqXcfPQ12HH6CWfkCOGlkEls8sn0aMLzSwCwHpYlMi\nAnrhQfa0rjGF0ZClmT0rq6suVsqgFsZVORtMP9kCXD15+gbV0eyvAWdVg8L31laS\n8HtHSsgtGT+YmoBRs6bh9wwlsPrEPBqsWr61Qb199tAwcxXVKW+uOdtVXKDnpPKT\nMeENCxLfAgMBAAECggEAEBHGmQrO23IvfAtyhC+Npa8if1JB8Wuzie89FCaVjgi6\nhYOJPvTT3/ii4GeO2sMM7hbvpwYgxLm4CbkwjKBD9eZro9DF0JFAjCzsG3RT6ixf\nwN0R7la7yAv/dFv1LOTx/89btobc93eL6I++mDK903yxgs60K0boRN24NHpMvyMB\nPrOdWkLquRVC5BtCWy0nTyEplE6u0y4duSWAatK6ppu5sGfUJRioinKQ3+EQAy05\nyptL0NmZuLWnUWgo7+EBWvq6titaiXaY0uIJGmwRkjkwF8njjdNMjkXfPcj6V0KN\nXzXFf3aVDDo3uv5u8vjswev9ZvP1IW5EI0sSdJSoaQKBgQD+KHA2R5ZcM6cDRj4D\ngR8oZKyljdVN0qFHnn08ZmpR2ysfs6Qk2MiGEPmgprtbchzhykGOwZdLUAML2ge+\nWF8nVq5w8wyd1Sdi5XLwlok7JynzKgddZMAdLX7xFPy2JoDQUJNLIwI+5y2D+kSp\n32fO6g49W3N03uBTJSgfImnn+QKBgQC2P4ehd7tRAxR85M2MeE3vNmva327PFAH9\nRhxuVyqHskj6SN0E1yNJTCCIbpV6vIjs10XRuDpaLfd2rLPKeoEIa0E6pl8ZfPk5\nw8BwkRTEGTAMgSLbKKRaSecd6s26dOuqVrb+K/aX0kLNF83h+BfNMgF3tscamaD+\nc4x2ZFL3lwKBgQCjAeqeVaGxNwuqBPYnJzyFmrREZkhlZm88UQE/qOwN3gS1i3D+\nlO9fVSnViLpntzOg+Si815simYmqo0cOJP26bFTramcwH5LoUgM7HUGc58x3AgDB\nPKoezJw7IVvHs8AwW01tBmIdWAYQPIancPrScbl6TtopHf1ANneaKGdGeQKBgFk6\nm5ZTv9N3NZW8lGLdGBMxyva7hE5A1oSByjO/26Pah157RDM1fiJJ8ne55NfV7RhA\ngf+fOnqinNFu1wwglIJhuOsVP+SDyqYckGDMt6UXS+4jX8R7jpRiMJT2PEm5KxUY\nJbomHjLREEHIENY9GLIvdIZ/Z9Y/N5K9Uh05G2H7AoGAQZNREcJX8LCzQ6ckwWxU\nUtcDrFmKU5pwMS3qmDsyZCMMAjnUsrIE9rpeL3uiF0veFGa03iTnWfFmD5YQGNDC\nl+oz3ijMyWQlGYyJZEI4sbOIAiqhK8wNU1hUnDb3vgFWB8zweGzvrzku20aQ1QJY\nW6gOHCQS4C6LCd+1679essE=\n-----END PRIVATE KEY-----\n',
  // client_email: 'firebase-adminsdk-c54fn@chatme-d4b25.iam.gserviceaccount.com',
  // client_id: '102528259537042280375',
  // auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  // token_uri: 'https://oauth2.googleapis.com/token',
  // auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  // client_x509_cert_url:
  //   'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c54fn%40chatme-d4b25.iam.gserviceaccount.com',
  // universe_domain: 'googleapis.com',
};
