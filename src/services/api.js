import axiosInstance from '../api/axios';
import endpoints from '../api/endpoints';

export const createCaptcha = async () => {
    try {
        const response = await axiosInstance.get('/auth/captcha');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to load captcha');
    }
};

export const sendOtp = async (payload) => {
    try {
        const response = await axiosInstance.post('/auth/send-otp', payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to send OTP');
    }
};

export const verifyOtp = async (payload) => {
    try {
        const response = await axiosInstance.post(endpoints.LOGIN, payload);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to verify OTP');
    }
};
