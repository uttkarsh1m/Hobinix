import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../../components/utils/Background';
import Appbar from '../../components/appbars/Appbar';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterUser } from '../../actions/userActions';
import { toast } from 'react-toastify';

const SignUp = () => {
    const dispatch = useDispatch();

    // const [photo, setPhoto] = useState();
    // const [url, setUrl] = useState();
    const [passType, setPassType] = useState('password');
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const togglePassType = () => {
        if (passType === 'password') setPassType('text');
        else setPassType('password');
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // const handlePhoto = e => {
    //     if (e.target.files.length !== 0) {
    //         setUrl(URL.createObjectURL(e.target.files[0]));
    //     }
    //     setPhoto(e.target.files[0]);
    // };

    const handleSubmit = () => {
        const trimmedData = {};
        Object.keys(data).forEach(e => (trimmedData[e] = data[e].trim()));
        setData(trimmedData);

        const { email, username, password, confirmPassword } = data;

        if (!validator.isEmail(email) || email.length === 0) {
            toast.error('enter valid email');
            return;
        }
        if (!validator.isAlphanumeric(username) || username.length === 0) {
            toast.error('usernamen should be alphanumeric');
            return;
        }
        if (password !== confirmPassword) {
            //############################ passowrd validation ######################
            toast.error('password ');
            return;
        }
        // if (!photo) {
        //     console.log('photo');
        //     return;
        // }

        dispatch(
            RegisterUser({
                email,
                username,
                password,
            })
        );
    };

    return (
        <div className="w-screen h-screen">
            <Background />
            <Appbar signup />
            <section class="text-gray-400 body-font overflow-y-auto">
                <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 class="title-font font-medium text-5xl text-white">
                            Welcome To HOBINIX
                        </h1>
                        <p class="leading-relaxed mt-4">
                            Poke slow-carb mixtape knausgaard, typewriter street
                            art gentrify hammock starladder roathse. Craies
                            vegan tousled etsy austin.
                        </p>
                    </div>
                    <div class="lg:w-2/6 md:w-1/2 bg-black bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 class="text-white text-lg font-medium title-font mb-5">
                            Register
                        </h2>
                        <div class="relative mb-4">
                            <label
                                for="username"
                                class="leading-7 text-sm text-gray-400"
                            >
                                Username
                            </label>
                            <input
                                type="username"
                                id="username"
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div class="relative mb-4">
                            <label
                                for="email"
                                class="leading-7 text-sm text-gray-400"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div class="relative mb-4">
                            <label
                                for="password"
                                class="leading-7 text-sm text-gray-400"
                            >
                                Password
                            </label>
                            <div class="relative">
                                <input
                                    type={passType}
                                    id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {passType === 'password' && (
                                    <RemoveRedEyeOutlinedIcon
                                        className="absolute right-2 top-2 cursor-pointer"
                                        onClick={togglePassType}
                                    />
                                )}
                                {passType === 'text' && (
                                    <VisibilityOffOutlinedIcon
                                        className="absolute right-2 top-2 cursor-pointer"
                                        onClick={togglePassType}
                                    />
                                )}
                            </div>
                        </div>
                        <div class="relative mb-4">
                            <label
                                for="password"
                                class="leading-7 text-sm text-gray-400"
                            >
                                Confirm Password
                            </label>
                            <div class="relative">
                                <input
                                    type={passType}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    class="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {passType === 'password' && (
                                    <RemoveRedEyeOutlinedIcon
                                        className="absolute right-2 top-2 cursor-pointer"
                                        onClick={togglePassType}
                                    />
                                )}
                                {passType === 'text' && (
                                    <VisibilityOffOutlinedIcon
                                        className="absolute right-2 top-2 cursor-pointer"
                                        onClick={togglePassType}
                                    />
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            class="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg"
                        >
                            Register{' '}
                        </button>
                        <p class="text-xs mt-3">
                            You already have an account.{' '}
                            <Link
                                to="/login"
                                class="cursor-pointer hover:underline hover:text-white"
                            >
                                Login Now.
                            </Link>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;
