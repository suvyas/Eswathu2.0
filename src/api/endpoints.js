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
};

export default endpoints;