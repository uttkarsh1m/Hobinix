import React, { useState } from 'react';
import styledComponent from 'styled-components';
import Popup from 'reactjs-popup';
import {
    Button,
    IconButton,
    Box,
    Stepper,
    Step,
    StepLabel,
    TextField,
    styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ThumbnailPost from '../utils/ThumbnailPost';
import SongUpload from './SongUpload';
import SongList from './SongList';
import { useDispatch } from 'react-redux';
import { albumUpload } from '../../actions/musicActions';

const Post = () => {
    const dispatch = useDispatch();
    const steps = ['Create your album', 'Add thumbnail', 'Add name'];

    const [songs, setSongs] = useState([]);
    const [songThumbs, setSongThumbs] = useState([]);
    const [songDetails, setSongDetails] = useState([]);
    const [thumb, setThumb] = useState();
    const [thumbUrl, setThumbUrl] = useState();
    const [name, setName] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (songs.length === 0 && activeStep === 0) {
            console.log('upload a post first');
            return;
        }
        if (!thumb && activeStep === 1) {
            console.log('upload thumbnail first');
            return;
        }
        if (activeStep === steps.length - 1) handleSubmit();
        else setActiveStep(prevActiveStep => prevActiveStep + 1);
        console.log(songDetails);
    };
    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('albumThumb', thumb);
        songThumbs.forEach(e => formData.append('songThumbs', e));
        songs.forEach(e => formData.append('songs', e));
        songDetails.forEach(e => formData.append('songTitles', e.title));
        formData.append('albumDetails', name.trim());
        dispatch(albumUpload(formData));
    };

    return (
        <Container className="w-full h-full py-2 px-5 overflow-y-auto text-zinc-200">
            <div className="sm:text-4xl text-3xl font-semibold whitespace-nowrap tracking-wide text-center py-3 pb-6 sm:px-10">
                Upload Your Album Here
            </div>
            <Stepper activeStep={activeStep}>
                {steps.map(label => {
                    return (
                        <Step key={label}>
                            <StepLabel>
                                <span className="text-white font-semibold text-base">
                                    {label}
                                </span>
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <form>
                {activeStep === 0 ? (
                    <div className=" py-4 relative">
                        <Popup
                            trigger={
                                <div className="group flex items-center z-20 absolute top-6 right-0 overflow-hidden cursor-pointer transition-all duration-300">
                                    <div className="pl-4 pr-6 py-[12px] text-2xl text-white font-semibold bg-emerald-500 whitespace-nowrap rounded-l-full translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-[all] duration-300">
                                        Add Song
                                    </div>
                                    {/* <div className='bg-emerald-500 w-20'>

                                    </div> */}
                                    {/* <div className="pl-4 text-lg font-semibold w-0 scale-0 whitespace-nowrap group-hover:scale-100 group-hover:w-24 transition-[all] duration-300">
                                        Add Song
                                    </div> */}
                                    <div className="group-hover:rotate-90 transition-all bg-emerald-500 rounded-full duration-300 z-20">
                                        <IconButton>
                                            <AddIcon
                                                sx={{
                                                    fontSize: 40,
                                                    color: 'white',
                                                }}
                                            />
                                        </IconButton>
                                    </div>
                                </div>
                            }
                            modal
                            nested
                        >
                            {close => (
                                <SongUpload
                                    songs={songs}
                                    setSongs={setSongs}
                                    songThumbs={songThumbs}
                                    setSongThumbs={setSongThumbs}
                                    songDetails={songDetails}
                                    setSongDetails={setSongDetails}
                                    close={close}
                                />
                            )}
                        </Popup>
                        <div className="mt-10">
                            <SongList upload songs={songDetails} />
                        </div>
                    </div>
                ) : activeStep === steps.length - 1 ? (
                    <div className="flex justify-center pt-16 p-6">
                        <TextField
                            id="outlined-error"
                            label="Album Name"
                            variant="outlined"
                            value={name}
                            onChange={e => {
                                setName(e.target.value);
                            }}
                            placeholder="Enter Your Album Name"
                        />
                    </div>
                ) : (
                    <ThumbnailPost
                        setThumb={setThumb}
                        thumbUrl={thumbUrl}
                        setThumbUrl={setThumbUrl}
                    />
                )}
            </form>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    pt: 2,
                    color: 'white',
                }}
            >
                <BTN
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={() => {
                        setActiveStep(prevActiveStep => prevActiveStep - 1);
                    }}
                    sx={{ mr: 1, position: 'fixed', bottom: '20px' }}
                >
                    Back
                </BTN>
                <Box sx={{ flex: '1 1 auto' }} />

                <BTN
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                        color: 'white',
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        backgroundColor: 'rgb(16, 185, 129 )',
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </BTN>
            </Box>
        </Container>
    );
};

const Container = styledComponent.div`
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root {
        color: white;
    }
    .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
        border: 2px solid #beffd2;
    }
    .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root {
        color: #beffd2d9;
    }
    .MuiOutlinedInput-notchedOutline {
        color: #5acb9a;
    }
    label.Mui-focused {
        color: white;
    }
    .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
        min-width: 28vw;
        min-height: 1.5rem;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
        .MuiOutlinedInput-notchedOutline {
        border: 3px solid #4acaaa;
    }
    .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover
        .MuiOutlinedInput-notchedOutline {
        border: 2px solid #83d3bfde;
    }
    .trans{
        transition: width 2s;
    }
`;

export default Post;

const BTN = styled(Button)(
    ({ theme }) => `
        &:hover{
            background-color: rgb(19 93 68)
        }
    `
);
