const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/';
const SERVER_URL = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;

export const loginURL = `${SERVER_URL}auth/login`;
export const registerURL = `${SERVER_URL}auth/register`;
export const googleLoginURL = `${SERVER_URL}auth/googleLogin`;
export const getUserDetailsURL = `${SERVER_URL}user/getUserDetails`;
export const editProfileURL = `${SERVER_URL}user/editProfile`;
export const changePasswordURL = `${SERVER_URL}user/changePassword`;

// Referral & Custom Package Endpoints
export const getReferralStatsURL = `${SERVER_URL}user/getReferralStats`;
export const getCustomPackageEnquiriesURL = `${SERVER_URL}user/getCustomPackageEnquiries`;

// Agent B2B & Wallet Endpoints
export const createAgentBookingURL = `${SERVER_URL}user/createAgentBooking`;
export const getAgentBookingsURL = `${SERVER_URL}user/getAgentBookings`;
export const getAgentDashboardStatsURL = `${SERVER_URL}user/getAgentDashboardStats`;
export const updateAgentBankDetailsURL = `${SERVER_URL}user/updateAgentBankDetails`;
export const requestAgentWithdrawalURL = `${SERVER_URL}user/requestAgentWithdrawal`;