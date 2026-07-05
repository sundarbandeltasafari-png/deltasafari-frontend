'use client'
import { showMessage } from '@/libs/commonHelper';
import { handleCopyLink } from '@/libs/handleCopyLink';
import React from 'react'

function BlogShareCard({ url }) {
    function shareOnFacebook() {
        const urlToShare = encodeURIComponent(process.env.NEXT_PUBLIC_PUBLIC_URL + "blogs/" + url);
        const fbUrl = `https://facebook.com/sharer/sharer.php?u=${urlToShare}`;
        window.open(fbUrl, '_blank', 'width=600,height=400');
    }

    function shareOnTwitter() {
        const urlToShare = encodeURIComponent(process.env.NEXT_PUBLIC_PUBLIC_URL + "blogs/" + url);
        const twitterUrl = `https://twitter.com/share?url=${urlToShare}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    }

    function copyUrl() {
        handleCopyLink(process.env.NEXT_PUBLIC_PUBLIC_URL + "blogs/" + url).then((res) => {
            if (res) {
                showMessage("success", 'URL copied successfully!');
            }
        })
    }
    return (
        <ul class="social-list">
            <li><button onClick={shareOnFacebook} ><i class="bi bi-facebook"></i></button></li>
            <li><button onClick={shareOnTwitter} ><i class="bi bi-twitter-x"></i></button></li>
            <li><button onClick={copyUrl} ><i class="bi bi-link"></i></button></li>
        </ul>
    )
}

export default BlogShareCard