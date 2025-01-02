import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { googleLogin } from '../features/auth/asyncThunks';

const useGoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginWithGoogle = useGoogleLogin({
        onSuccess: (codeResponse) => {
             console.log(codeResponse)
            dispatch(googleLogin(codeResponse.code));  // Dispatch the googleLogin thunk with the code
        },
        onError: (error) => {
            toast.error('Google login failed. Please try again.');
        },
        flow: 'auth-code',
    });

    return { loginWithGoogle };
};

export default useGoogleAuth;
