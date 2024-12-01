// operations.ts
import { User, Auth, Comment, Home, Post } from './endpoints';

const apiUrl = 'http://localhost:5024/api/';

async function callApi(endpoint: string, method: string, body?: any) {
    const headers = { 'Content-Type': 'application/json' };
    const config: RequestInit = {
        method: method,
        headers: headers,
        credentials: 'include',
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, config);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'API call failed');
        }
        return data;
    } catch (error) {
        if (error instanceof Error) return { error: error.message };
        return { error: 'An unexpected error occurred' };
    }
}

// Auth operations
export const login = async (username: string, password: string) => {
    return callApi(Auth.LOGIN, 'POST', { username, password });
};

export const register = async (userDetails: any) => {
    return callApi(Auth.REGISTER, 'POST', userDetails);
};

export const logout = async () => {
    return callApi(Auth.LOGOUT, 'POST');
};

export const checkAuthentication = async () => {
    return callApi(Auth.isAuthenticated, 'GET');
};

// Comment operations
export const addComment = async (commentData: any) => {
    return callApi(Comment.ADD_COMMENT, 'POST', commentData);
};

export const deleteComment = async (commentId: string) => {
    return callApi(Comment.DELETE_COMMENT.replace('{id}', commentId), 'DELETE');
};

// Home operations
export const fetchHomeIndex = async () => {
    return callApi(Home.HOME_INDEX, 'GET');
};

// Post operations
export const getPostDetails = async (postId: number) => {
    return callApi(Post.GET_POST_DETAILS.replace('{id}', postId.toString()), 'GET');
};

export const createPost = async (postDetails: { text: string; imgUrl?: string }) => {
    return callApi(Post.CREATE_POST, 'POST', postDetails);
};

export const deletePost = async (postId: string) => {
    return callApi(Post.DELETE_POST.replace('{id}', postId), 'DELETE');
};

export const updatePost = async (postId: string, updatedDetails: any) => {
    return callApi(Post.UPDATE_POST.replace('{id}', postId), 'PUT', updatedDetails);
};

export const likePost = async (postId: number) => {
    return callApi(Post.LIKE_POST.replace('{postId}', postId.toString()), 'POST');
};

// User operations
export const getUserProfile = async (userId: string) => {
    return callApi(User.GET_USER_PROFILE.replace('{id}', userId), 'GET');
};

export const getUserProfileByUsername = async (username: string) => {
    return callApi(User.GET_USER_PROFILE_BY_USERNAME.replace('{username}', username), 'GET');
};

export const fetchCurrentUser = async () => {
    return callApi(User.GET_CURRENT_USER, 'GET');
};

export const updateUserProfile = async (userDetails: any) => {
    return callApi(User.UPDATE_USER_PROFILE, 'POST', userDetails);
};

export const deleteUser = async () => {
    return callApi(User.DELETE_USER, 'DELETE');
};
