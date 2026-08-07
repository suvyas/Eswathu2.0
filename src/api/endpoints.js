const endpoints = {
  // Authentication
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",

  // Dashboard
  DASHBOARD: "/dashboard",

  // Property
  PROPERTY_LIST: "/property/list",
  PROPERTY_DETAILS: "/property/details",
  SAVE_PROPERTY: "/property/save",
  GET_DISTRICTS: "/v1/PropertyList/GetDistricts",
  GET_BLOCKS: "/v1/PropertyList/GetBlocks",
  GET_GPS: "/v1/PropertyList/GetGPs",
  GET_VILLAGES: "/v1/PropertyList/GetVillages",

  // Reports
  REPORTS: "/reports",

  // Citizen Data Entry Phase 1
  GET_CLASSIFICATIONS: "/PropertyEntry/GetClassifications",
  GET_PROPERTY_TYPES: "/PropertyEntry/GetPropertyTypes",
  GET_PROPERTY_CATEGORIES: "/PropertyEntry/GetPropertyCategories",
  SAVE_BASIC_DETAILS: "/PropertyEntry/SaveBasicDetails",
};

export default endpoints;