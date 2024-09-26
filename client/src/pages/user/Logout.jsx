import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Logout = () => {
    const [title, setTitle] = useState();
    const [caption, setCaption] = useState('');
    // const fetching = () => {
    //     axios
    //         .get('http://localhost:8000/gallery')
    //         .then(res => res.data)
    //         .then(data => setTitle(data.title))
    // }
    // useEffect(() => {
    //     fetching()
    // }, [])

    // return <Container>{title}</Container>
    const handlesubmit = async () => {
        const formData = new FormData();
        formData.append('post', title);
        formData.append('caption', caption);
        console.log(formData);
        await axios.post(
            '/api/gallery',
            { post: title, caption },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        console.log('hello');
    };

    return (
        <>
            <input
                type="file"
                name="image"
                onChange={e => {
                    setTitle(e.target.files[0]);
                }}
            />
            <input
                type="text"
                value={caption}
                onChange={e => setCaption(e.target.value)}
            />
            <button onClick={handlesubmit}>submit</button>
        </>
    );
};

const Container = styled.div``;

export default Logout;
