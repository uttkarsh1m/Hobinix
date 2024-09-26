import React from 'react';
import styled from 'styled-components';
import { Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SkeletonProfile = () => {
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
                <div className="content w-full overflow-y-hidden">
                    <div className=" p-10 sm:p-20 pb-5 flex justify-center flex-wrap space-x-10 max-sm:space-y-5">
                        <Skeleton
                            variant="circular"
                            animation="wave"
                            width={150}
                            height={150}
                        />
                        <div className="flex flex-col space-y-3">
                            <Skeleton
                                variant="text"
                                animation="wave"
                                sx={{ fontSize: '2rem' }}
                                width={150}
                            />
                            <div className="space-x-6">
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    sx={{ fontSize: '1rem' }}
                                />
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    sx={{ fontSize: '1rem' }}
                                />
                            </div>
                            <Skeleton
                                variant="text"
                                animation="wave"
                                sx={{ fontSize: '1.5rem' }}
                            />
                        </div>
                    </div>
                    <Skeleton
                        variant="text"
                        animation="wave"
                        sx={{ fontSize: '2rem', mx: '15px', my: '5px' }}
                        width={300}
                    />
                    <div className="flex justify-around flex-wrap gap-3">
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

export default SkeletonProfile;
