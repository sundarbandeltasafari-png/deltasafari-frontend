import HomeBanner from '@/components/website/home/HomeBanner'
import TopDestination from '@/components/website/home/TopDestination'
import TopTrending from '@/components/website/home/TopTrending'
import HolidayPackages from '@/components/website/home/HolidayPackages'
import React from 'react'
import HiddenGems from '@/components/website/home/HiddenGems'
import LimiterOffer from '@/components/website/home/LimiterOffer'
import AllTourActivity from '@/components/website/home/AllTourActivity'
import Testimonial from '@/components/website/home/Testimonial'
import HomeBlog from '@/components/website/home/HomeBlog'
import Faq from '@/components/website/home/Faq'
import HolidaysByTheme from '@/components/website/home/HolidaysByTheme'
import HomeAbout from '@/components/website/home/HomeAbout'
import axios from 'axios'
import { homeDestinationURL } from '@/routes/homeRoutes'


async function page() {
    let topDesination = null;
    let topTrending = null;
    let faqs = null;
    try {
        const response = await axios.get(homeDestinationURL);
        if (response.data?.status) {
            topDesination = response.data?.topDesination
            topTrending = response.data?.topTrending
            faqs = response.data?.faqs
        }
        console.log(response.data);
        
    } catch (error) {
        console.log(error);
        
        topDesination = null
        topTrending = null
        faqs = null
    }
    return (
        <>
            <HomeBanner />
            {topTrending && <TopTrending topTrending={topTrending} />}
            {topDesination && <TopDestination topDesination={topDesination} />}
            <HolidayPackages />
            <HolidaysByTheme />
            <HiddenGems />
            <LimiterOffer />
            <AllTourActivity />
            <Testimonial />
            <HomeAbout />
            <HomeBlog />
            <Faq faqs={faqs} faqText={'We’re committed to offering more than just products—we provide exceptional experiences.'} />
        </>
    )
}

export default page