import HomeBanner from '@/components/website/home/HomeBanner'
import TopDestination from '@/components/website/home/TopDestination'
import TopTrending from '@/components/website/home/TopTrending'
import HolidayPackages from '@/components/website/home/HolidayPackages'
import React from 'react'
import HiddenGems from '@/components/website/home/HiddenGems'
import LimiterOffer from '@/components/website/home/LimiterOffer'
import AllTourActivity from '@/components/website/home/AllTourActivity'
import LastMinutesDeal from '@/components/website/home/LastMinutesDeal'
import Testimonial from '@/components/website/home/Testimonial'
import DeltaSafari from '@/components/website/home/DeltaSafari'
import HomeBlog from '@/components/website/home/HomeBlog'
import Faq from '@/components/website/home/Faq'


function page() {
    return (
        <>
            <HomeBanner />
            <TopTrending />
            <TopDestination />
            <HolidayPackages />
            <HiddenGems />
            <LimiterOffer />
            <LastMinutesDeal />
            <AllTourActivity />
            <Testimonial />
            <DeltaSafari />
            <HomeBlog />
            <Faq />
        </>
    )
}

export default page