import React, { useEffect, useState } from 'react';
import ShareIcon from '@mui/icons-material/Share';
import { SocialIcon } from 'react-social-icons';
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import LinkIcon from '@mui/icons-material/Link';

const SharePost = ({id}) => {
    const [open, setOpen] = useState(false);
    const [url, setUrl] = useState('')

    const handleOpen = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        console.log("hekllo", window.location.href.split('/'))
        if(window.location.href.split('/').length === 5) setUrl(window.location.href)
        else setUrl(window.location.href+`/${id}`)
    },[])

    return (
        <div className="flex flex-col items-center relative">
            <div
                className="cursor-pointer h-min rounded-full p-1 active:bg-[rgb(32,32,32)] transition-colors"
                onClick={handleOpen}
            >
                <ShareIcon style={{ fontSize: 32 }} />
            </div>
            <div
                className={`absolute top-11 z-40 bg-neutral-900 p-2 rounded-xl border-[1px] border-slate-600 transition-all ${
                    !open && 'hidden opacity-0'
                }`}
            >
                <div className="flex items-center justify-between gap-4">
                    <WhatsappShareButton url={url}>
                        <SocialIcon
                            network="whatsapp"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </WhatsappShareButton>
                    <FacebookShareButton url={url}>
                        <SocialIcon
                            network="facebook"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </FacebookShareButton>
                    <FacebookMessengerShareButton url={url}>
                        <SocialIcon
                            network="instagram"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </FacebookMessengerShareButton>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <TwitterShareButton url={url}>
                        <SocialIcon
                            network="x"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </TwitterShareButton>
                    <TelegramShareButton url={url}>
                        <SocialIcon
                            network="telegram"
                            style={{ transform: 'scale(0.8)' }}
                        />
                    </TelegramShareButton>
                    <div
                        className="text-white cursor-pointer active:bg-neutral-800 w-10 h-10 rounded-full bg-black flex justify-center items-center"
                        onClick={() => {
                            navigator.clipboard.writeText(url);
                        }}
                    >
                        <LinkIcon style={{ fontSize: 30 }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SharePost;
