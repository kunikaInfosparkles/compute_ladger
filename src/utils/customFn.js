import Cookies from "js-cookie";
import toast from "react-hot-toast";


export const errorMsg = (message) => {
  const msg = message || "Something went wrong";

  toast.error(msg, { id: "error-toast" });
  return message;
};

export const successMsg = (message = "Success") => {
  toast.success(message, { id: "success-toast" });
};

export const getToken = () => {
  return Cookies.get("__er_urAccess");
};
export const getHeader = () => {
  const config = {
    headers: {
      authorization: Cookies.get("__er_urAccess")
    },
  };
  return config;
};
export const downloadFile = (url, filename = "download", action = "open") => {
  if (action === "download") {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
};
// export const getProfileData = () => {
//   const token = getToken();
//   if (!token) return null;
//   try {
//     const decoded = jwtDecode(token);
//     return decoded;
//   } catch {
//     return null;
//   }
// };

export const hasAccessRole = (role) => {
  const profileData = getProfileData();
  if (!profileData || !profileData.accessRoles) return false;
  return Array.isArray(profileData.accessRoles) && profileData.accessRoles.includes(role);
};

export const formatDate = (dateString, format = "DD/MM/YYYY") => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  switch (format) {
    case "MM/DD/YYYY":
      return `${month}/${day}/${year}`;
    case "YYYY-MM-DD":
      return `${year}-${month}-${day}`;
    case "DD/MM/YYYY":
    default:
      return `${day}/${month}/${year}`;
  }
};


export const handleCatchErrors = (error, navigate) => {
  const { status, data } = error.response || {};

  if (error.response !== undefined) {
    if (data?.message) {
      errorMsg(data?.error?.detail || data?.message);
    }
    switch (status) {
      case 409:
        if (data?.message) {
          errorMsg(data?.message);
        }
        break;
      case 403:
        break;
      case 401:
        break;
      case 402:
        break;
      case 400:
        break;
      case 404:
        break;
      case 422:
        break;
      case 500:
        break;
      default:
        // Don't redirect to home page on submission errors
        // Let the component handle the error display
        console.error('Unhandled error status:', status, data);
    }
  }
};

export const buildUrl = (baseUrl, params = {}) => {
  let url = baseUrl;
  const remainingParams = { ...params };

  // Replace path parameters (e.g., :eventId, :judgeId)
  Object.keys(params).forEach((key) => {
    const placeholder = `:${key}`;
    if (url.includes(placeholder)) {
      url = url.replace(placeholder, params[key]);
      delete remainingParams[key]; // Remove used params
    }
  });

  // Add remaining params as query string
  const query = new URLSearchParams(remainingParams).toString();
  return query ? `${url}?${query}` : url;
};
