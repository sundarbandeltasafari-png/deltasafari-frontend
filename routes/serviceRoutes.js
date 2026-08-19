// Page Routes
export const particularPageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getParticularPage`
export const getPageSeoUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getPageSeo`
export const getParticularPackageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getParticularPackage`

// destinations
export const getDestinationsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getDestinations`
export const getCorporateDestinationsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getCorporateDestinations`

// Bookings & Razorpay Payments
export const createBookingsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/createBookings`
export const createRazorpayOrderUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/create-razorpay-order`
export const verifyRazorpayPaymentUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/verify-razorpay-payment`

// Corporate Lead Enquiry
export const createCorporateLeadEnquiryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createCorporateLeadEnquiry`

// Holiday Enquiry
export const createHolidayEnquiryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createHolidayEnquiry`

// Contact Query
export const createContactQueryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createContactQuery`
export const contactQueryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}contact-query`

// Saved Packages / Wishlist
export const toggleSavePackageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/toggleSavePackage`
export const getSavedPackagesUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/getSavedPackages`
export const checkIsPackageSavedUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/checkIsPackageSaved`

// Public Hotels & Stays
export const getHotelsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getHotels`
export const getParticularHotelUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getParticularHotel`

