import React, { useEffect, useState } from 'react';
import styledComponents from 'styled-components';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, Box, Stepper, Step, StepLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import VideoPlayer from './VideoPlayer';
import ThumbnailPost from '../utils/ThumbnailPost';
import { photoPost, dancePost } from '../../actions/postActions';
import { useDispatch } from 'react-redux';

const Post = ({ dance }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const steps = dance
        ? ['Upload your dance video', 'add thumbnail', 'add caption']
        : ['Upload Photo', 'Add a caption'];

    const [caption, setCaption] = useState('');
    const [thumb, setThumb] = useState();
    const [thumbUrl, setThumbUrl] = useState();
    const [post, setPost] = useState();
    const [url, setUrl] = useState('');
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        console.log(url);
    }, [url]);

    const handlePost = e => {
        console.log(e.target.files[0]);
        if (e.target.files.length !== 0) {
            const x = URL.createObjectURL(e.target.files[0]);
            console.log(x);
            setUrl(x);
        }
        setPost(e.target.files[0]);
    };
    const handleNext = () => {
        console.log(url);
        if (!post && activeStep === 0) {
            console.log('upload a post first');
            return;
        }
        if (dance && !thumb && activeStep === 1) {
            console.log('upload thumbnail first');
            return;
        }
        if (activeStep === steps.length - 1) handleSubmit();
        else setActiveStep(prevActiveStep => prevActiveStep + 1);
    };
    const handleSubmit = () => {
        caption.trim();
        if (dance) dispatch(dancePost({ post, thumbnail: thumb, caption }));
        else dispatch(photoPost({ post, caption }));
    };
    return (
        <Container className="w-full h-full py-2 px-5 overflow-y-auto text-zinc-200">
            <div className="sm:text-4xl text-3xl font-semibold whitespace-nowrap tracking-wide text-center py-3 pb-6 sm:px-10">
                Show Your Art Here
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
                    <div className="flex flex-col items-center gap-4 py-6 pb-4">
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload {dance ? 'Video' : 'Photo'}
                            <VisuallyHiddenInput
                                type="file"
                                accept={dance ? 'video/*' : 'image/*'}
                                onChange={handlePost}
                            />
                        </Button>
                        {dance
                            ? url && (
                                  <div className="h-screen">
                                      <VideoPlayer url={url} upload />
                                  </div>
                              )
                            : url && (
                                  <div
                                      className={`p-2 h-[70vh] ${
                                          md ? 'max-w-screen-md' : 'max-w-sm'
                                      }`}
                                  >
                                      <img
                                          src={url}
                                          className={`max-w-full max-h-full object-contain rounded-xl drop-shadow-3xl`}
                                      />
                                  </div>
                              )}
                    </div>
                ) : activeStep === steps.length - 1 ? (
                    <div className="flex justify-center p-6">
                        <TextareaAutosize
                            aria-label="empty textarea"
                            value={caption}
                            onChange={e => {
                                setCaption(e.target.value);
                                // console.log(caption, photo, url);
                            }}
                            placeholder="Enter Your Caption here"
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
                <Button
                    variant="contained"
                    disabled={activeStep === 0}
                    onClick={() => {
                        setActiveStep(prevActiveStep => prevActiveStep - 1);
                    }}
                    sx={{ mr: 1, position: 'fixed', bottom: '20px' }}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />

                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                        color: 'white',
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                    }}
                >
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Box>
        </Container>
    );
};

const Container = styledComponents.div`
.css-sghohy-MuiButtonBase-root-MuiButton-root{
  max-width: 200px;
}
`;

export default Post;

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const blue = {
    100: '#DAECFF',
    200: '#b6daff',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
    ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px 12px 0 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  
  &:hover {
    border-color: ${blue[400]};
  }
  
  &:focus {
    // border-color: ${blue[400]};
    // box-shadow: 0 0 0 3px ${
        theme.palette.mode === 'dark' ? blue[600] : blue[200]
    };
    box-shadow: 0px 2px 10px ${
        theme.palette.mode === 'dark' ? blue[900] : blue[100]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
