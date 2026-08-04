// Page Routes
export const particularPageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getParticularPage`
export const getPageSeoUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getPageSeo`
export const getParticularPackageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getParticularPackage`

// destinations
export const getDestinationsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/getDestinations`

// Bookings
export const createBookingsUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}service/createBookings`

// Corporate Lead Enquiry
export const createCorporateLeadEnquiryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createCorporateLeadEnquiry`

// Holiday Enquiry
export const createHolidayEnquiryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createHolidayEnquiry`

// Contact Query
export const createContactQueryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}service/createContactQuery`
export const contactQueryUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3002/'}contact-query`
