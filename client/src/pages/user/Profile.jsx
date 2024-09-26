import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Appbar from '../../components/appbars/Appbar';
import Sidebar from '../../components/appbars/Sidebar';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import Divider from '@mui/material/Divider';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ButtonOutline from '../../components/utils/Button';
import SkeletonProfile from '../../components/utils/SkeletonProfile';
import { followUser, getUserDetails } from '../../actions/userActions';

const Profile = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(state => state.authUser);
    const { user, loading } = useSelector(state => state.user);

    const [me, setMe] = useState(false);

    useEffect(() => {
        if (username === authUser.username) setMe(true);
        dispatch(getUserDetails(username));
    }, []);

    const handleFollow = () => {
        dispatch(followUser(username));
    };

    // const hobbies = ['Music', 'Painting'];

    return (
        <>
            {loading && <SkeletonProfile />}
            {user && (
                <div className="w-screen h-screen">
                    <Appbar />
                    <div
                        className="flex text-zinc-200 w-screen"
                        style={{ height: '90vh' }}
                    >
                        <Sidebar hidden={true} />
                        <Container className="w-full relative">
                            <div
                                className="bg-[#cccccc66] w-8 h-8 rounded-full absolute top-7 left-7 flex justify-center items-center cursor-pointer hover:text-slate-700 text-slate-800"
                                onClick={() => {
                                    navigate(-1);
                                }}
                            >
                                <ChevronLeftRoundedIcon sx={{ fontSize: 34 }} />
                            </div>
                            <div className=" p-10 sm:p-20 pb-5 flex justify-center items-center flax-wrap max-sm:flex-col space-x-10 max-sm:space-y-5">
                                <img
                                    src="https://imgix.ranker.com/list_img_v2/1337/2681337/original/the-best-itachi-uchiha-quotes?fit=crop&fm=pjpg&q=80&dpr=2&w=1200&h=720"
                                    className="w-48 h-48 rounded-full"
                                />
                                <div className="flex flex-col space-y-3">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-3xl font-semibold">
                                            {user.username}
                                        </span>
                                        <ButtonOutline
                                            style={`${!me && 'hidden'} px-2`}
                                            value={
                                                <>
                                                    <EditTwoToneIcon /> Edit
                                                    Profile
                                                </>
                                            }
                                        />
                                    </div>
                                    <div className="space-x-6">
                                        <span>
                                            {user.followers.length} Follower
                                            {user.followers.length > 1 && 's'}
                                        </span>
                                        <span>
                                            {user.followings.length} Following
                                            {user.followings.length > 1 && 's'}
                                        </span>
                                    </div>
                                    <div className="space-x-6 flex">
                                        <span className=" text-lg font-medium">
                                            {user.name}
                                        </span>
                                        <ButtonOutline
                                            value={`${
                                                user.followers.find(e => {
                                                    return (
                                                        e._id === authUser._id
                                                    );
                                                }) ||
                                                user.followers.includes(
                                                    authUser._id
                                                )
                                                    ? 'Unfollow'
                                                    : 'Follow'
                                            }`}
                                            style={`${me && 'hidden'}`}
                                            onClick={handleFollow}
                                        />
                                    </div>
                                    {/* <div className="space-x-2">
                                        {hobbies.map(e => {
                                            return (
                                                <Chip
                                                    label={e}
                                                    variant="outlined"
                                                    sx={{ color: 'white' }}
                                                    onClick={() => {}}
                                                />
                                            );
                                        })}
                                    </div> */}
                                </div>
                            </div>
                            <div
                                className=" group text-3xl py-2 px-5 cursor-pointer"
                                onClick={() => {}}
                            >
                                Your Posts Since Yet{' '}
                                <ArrowForwardIcon className="group-hover:translate-x-1 arrow" />
                            </div>
                            <Divider
                                variant="middle"
                                className=" bg-slate-500"
                            />
                            <span className="text-white text-xl font-semibold ">
                                YET UNDER DEVELOPMENT PROCESS
                            </span>
                            {/* <CategoryBar /> */}
                            <div>{/* posts */}</div>
                        </Container>
                    </div>
                </div>
            )}
        </>
    );
};

const Container = styled.div`
    .arrow {
        transition: transform 0.1s ease-out 0s;
    }
`;

export default Profile;
