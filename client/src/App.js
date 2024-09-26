import { useEffect, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';
import Login from './pages/user/Login';
import Logout from './pages/user/Logout';
import SignUp from './pages/user/SignUp';
import Profile from './pages/user/Profile';
import Music from './pages/music/Music';
import Gallery from './pages/gallery/Gallery';
import Dance from './pages/dance/Dance';
import AlbumById from './pages/music/AlbumById';
import AlbumPost from './pages/music/AlbumPost';
import VideoById from './pages/dance/DanceById';
import DancePost from './pages/dance/DancePost';
import PhotoById from './pages/gallery/PhotoById';
import PhotoPost from './pages/gallery/PhotoPost';
import Error404 from './pages/Error404';
import AudioPlayer from './components/music/AudioPlayer';
import SavedAlbums from './pages/music/SavedAlbums';
import SavedSongs from './pages/music/SavedSongs';
import SavedPhotos from './pages/gallery/SavedPhotos';
import SavedDances from './pages/dance/SavedDances';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './actions/userActions';
import PrivateRoute from './routes/PrivateRoute';
import Spinner from './components/utils/Spinner';

function App() {
    const dispatch = useDispatch();

    const { auth } = useSelector(state => state.authUser);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <>
            {/* <Suspense fallback={<Spinner/>}> */}
            {auth && <AudioPlayer />}

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/logout" element={<Logout />} />
                <Route
                    path="/user/:username"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route path="/" element={<Navigate to="/music" />} />
                <Route
                    path="/music"
                    element={
                        <PrivateRoute>
                            <Music />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gallery"
                    element={
                        <PrivateRoute>
                            <Gallery />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dance"
                    element={
                        <PrivateRoute>
                            <Dance />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/music/album/:id"
                    element={
                        <PrivateRoute>
                            <AlbumById />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gallery/:id"
                    element={
                        <PrivateRoute>
                            <PhotoById />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dance/:id"
                    element={
                        <PrivateRoute>
                            <VideoById />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/music/post"
                    element={
                        <PrivateRoute>
                            <AlbumPost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gallery/post"
                    element={
                        <PrivateRoute>
                            <PhotoPost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dance/post"
                    element={
                        <PrivateRoute>
                            <DancePost />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/music/albums/saved"
                    element={
                        <PrivateRoute>
                            <SavedAlbums />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/music/songs/saved"
                    element={
                        <PrivateRoute>
                            <SavedSongs />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/gallery/saved"
                    element={
                        <PrivateRoute>
                            <SavedPhotos />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/dance/saved"
                    element={
                        <PrivateRoute>
                            <SavedDances />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Error404 />} />
            </Routes>
            {/* </Suspense> */}
        </>
    );
}

export default App;
