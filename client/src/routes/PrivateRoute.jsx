import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { loadUser } from '../actions/userActions';
import Spinner from '../components/utils/Spinner';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, auth } = useSelector(state => state.authUser);

    useEffect(() => {
        console.log('private');
        // dispatch(loadUser());
    }, [children]);

    if (loading) return <Spinner />;
    else if (auth) return children;
    else navigate('/login');
};

export default PrivateRoute;
