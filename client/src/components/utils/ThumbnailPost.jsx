import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/system';

const ThumbnailPost = ({ setThumb, thumbUrl, setThumbUrl }) => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const handleThumb = e => {
        if (e.target.files.length !== 0) {
            setThumbUrl(URL.createObjectURL(e.target.files[0]));
        }
        setThumb(e.target.files[0]);
    };

    return (
        <div className="flex flex-col items-center gap-4 py-6 pb-4 whitespace-nowrap">
            <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
            >
                Upload Thumbnail
                <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={handleThumb}
                />
            </Button>
            {thumbUrl && (
                <div
                    className={`p-2  h-[70vh] ${
                        md ? 'max-w-screen-md' : 'max-w-sm'
                    }`}
                >
                    <img
                        src={thumbUrl}
                        className={`max-w-full max-h-full object-contain rounded-xl drop-shadow-3xl`}
                    />
                </div>
            )}
        </div>
    );
};

export default ThumbnailPost;

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
