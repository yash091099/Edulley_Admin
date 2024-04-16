import { baseUrl } from "./enviroment";
import instance from "./httpInterceptor";

export const fetchDashboardData = () => {
  const url = `${baseUrl}/v1/metrics/dashboard`;
  return instance.get(url);
}

export const getReports = () => {
  const url = `${baseUrl}/v1/metrics/reports`;
  return instance.get(url);
}

export const getAllStudents = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/student/list/pagination?${queryString}`;
  return instance.get(url);
};

export const addClient = (payload) => {
  const url = `${baseUrl}v1/clients/superadmin/add/basic/details`;
  return instance.post(url, payload);
};
export const submitClientHost = (payload) => {
  const url = `${baseUrl}v1/clientAccount/superadmin/update/clientHost`;
  return instance.patch(url, payload);
};

export const getAllClients = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}v1/clients/superadmin/list/pagination?${queryString}`;
  return instance.get(url);
};


export const changePassword = (payload) => {
  const url = `${baseUrl}v1/auth/admin/change/password`;
  return instance.patch(url, payload);
}

// API call to add a new blog
export const addBlog = (payload) => {
 const url=`${baseUrl}/v1/blog/add/new`;
  return instance.post(url, payload);
};

// API call to edit an existing blog
export const editBlog = (payload) => {
  const url = `${baseUrl}/v1/blog/edit`;
  return instance.patch(url, payload);
};

// API call to get all blogs
export const getAllBlogs = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/blog/list/pagination?${queryString}`;
  return instance.get(url);
};

// API call to upload a file
export const uploadFile = (formData) => {
  const url = `${baseUrl}`
  return instance.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const addInstitute = (payload) => {
  const url = `${baseUrl}/v1/institute/add/new`;
  return instance.post(url, payload);
};

export const editInstitute = (payload) => {
  const url = `${baseUrl}/v1/institute/edit`;
  return instance.patch(url, payload);
};

export const getAllInstitutes = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/institute/list/pagination?${queryString}`;
  return instance.get(url);
}

export const editCourse = (payload) => {
  const url = `${baseUrl}/v1/course/edit`;
  return instance.patch(url, payload);
};

export const addCourse = (payload) => {
  const url = `${baseUrl}/v1/course/add/new`;
  return instance.post(url, payload);
};

export const getCourses = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/course/list/pagination?${queryString}`;
  return instance.get(url);
}

export const addScholarship = (payload) => {
  const url = `${baseUrl}/v1/scholarship/add/new`;
  return instance.post(url, payload);
};

export const editScholarship = (payload) => {
  const url = `${baseUrl}/v1/scholarship/edit`;
  return instance.patch(url, payload);
};

export const getAllScholarships = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/scholarship/list/pagination?${queryString}`;
  return instance.get(url);
}

export const addCareerDetails = (payload) => {
  const url = `${baseUrl}/v1/careerPath/add/new`;
  return instance.post(url, payload);
};

export const editCareerDetails = (payload) => {
  const url = `${baseUrl}/v1/careerPath/edit`;
  return instance.patch(url, payload);
};

export const getCareers = (queryParams) => {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${baseUrl}/v1/careerPath/list/pagination?${queryString}`;
  return instance.get(url);
}

export const addStudent = (payload) => {
  const url = `${baseUrl}/v1/student/add/new`;
  return instance.post(url, payload);
};

