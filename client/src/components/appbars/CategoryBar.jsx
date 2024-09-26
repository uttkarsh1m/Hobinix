import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CategoryBar = ({ post,saved }) => {
    const [path, setPath] = useState('music');
    const [links, setLinks] = useState(category)

    useEffect(()=>{
        if(post) setLinks(category.map(e =>{
            return {...e, link: e.link+'/post'}
        }))
        else if(saved){
            const temp = [{category: 'Albums', link: '/music/albums'}, {category: 'Songs', link: '/music/songs'}]
            category.forEach(e=>{
                if(e.category!='Music') temp.push(e)
            })
            setLinks(temp.map(e =>{
                return {...e, link: e.link+'/saved'}
            }))
        }
        else setLinks(category)
    },[])

    useEffect(() => {
        console.log(path);
        const x = window.location.pathname;
        if (x.includes('music')) setPath('music');
        else if (x.includes('gallery')) setPath('gallery');
        else if (x.includes('dance')) setPath('dance');
    }, [window.location.pathname]);

    return (
        <div className="py-4 px-10 flex space-x-16 bg-neutral-900 max-sm:space-x-7 max-sm:px-4 overflow-x-auto w-full">
            {links.map((e, i) => {
                return (
                    <Link to={e.link} key={e.category}>
                        <button
                            className={`button flex items-center py-1 px-5 border-[1px] border-white whitespace-nowrap rounded-full font-serif text-lg text-zinc-200 hover:border-emerald-500 hover:text-emerald-400 ${
                                e.link.includes(path) &&
                                'border-emerald-500 text-emerald-200'
                            }`}
                        >
                            {e.category}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};

export default CategoryBar;

const category = [
    {
        category: 'Music',
        link: '/music',
    },
    {
        category: 'Photography',
        link: '/gallery',
    },
    {
        category: 'Dance',
        link: '/dance',
    },
    {
        category: 'Read & Write',
        link: '',
    },
    {
        category: 'Painting',
        link: '',
    },
    {
        category: 'Cooking',
        link: '',
    },
    {
        category: 'Sports & Gaming',
        link: '',
    },
];
