import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SkeletonPost = () => {
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const side = [];
    for (let i = 0; i < 4; i++) side[i] = 0;
    const content = [];
    for (let i = 0; i < 12; i++) content[i] = 0;

    return (
        <Container>
            <div className="appbar flex justify-between items-center px-5 w-screen border-b-2 border-slate-700">
                <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={100}
                    height={40}
                />
                <Skeleton variant="circular" width={40} height={40} />
            </div>
            <div className="flex w-screen">
                <div className="content border-slate-700 border-r-2 flex flex-col w-min py-10 px-5 space-y-5 max-sm:hidden">
                    {side.map(e => {
                        return (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={md ? 160 : 80}
                                height={40}
                            />
                        );
                    })}
                </div>
                <div className="content w-full py-10 px-5 sm:px-10 flex justify-around flex-wrap gap-3 overflow-y-hidden">
                    {content.map(e => {
                        return (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                width={300}
                                height={200}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

const Container = styled.div`
    .appbar {
        height: 10vh;
    }
    .content {
        height: 90vh;
    }
`;

export default SkeletonPost;
