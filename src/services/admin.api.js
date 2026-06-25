import apiClient from './apiClient';


export const getAdminStatsRequest = async () => {
  const response = await apiClient.get('/api/v1/admin/stats');
  return response.data;
};


export const getAdminActivitiesRequest = async () => {
  const response = await apiClient.get('/api/v1/admin/activities');
  return response.data;
};


export const getVerificationQueueRequest = async (params = {}) => {
  const response = await apiClient.get('/api/v1/admin/verification-queue', {
    params,
  });
  
  return response.data;
};




export const getVerificationDetailsRequest = async (userId) => {
  const response = await apiClient.get(
    `/api/v1/admin/verification-queue/${userId}`
  );
  return response.data;
};


export const makeVerificationDecisionRequest = async (data) => {
  const response = await apiClient.post(
    '/api/v1/admin/verification-queue/decision',
    data
  );
  return response.data;
};


export const getDocumentRequest = async (documentId) => {
  const response = await apiClient.get(
    `/api/v1/admin/verification-queue/documents/${documentId}`,
    {
      responseType: 'blob',
    }
  );
  return response.data;
};