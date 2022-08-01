
import {Helmet} from 'react-helmet'
import { useEffect } from "react"

import Header from 'components/privacy/Header'
import InfoCollection from 'components/privacy/InfoCollection'
import TypesOfData from 'components/privacy/TypesOfData'
import UsageData from 'components/privacy/UsageData'
import CookiesData from 'components/privacy/CookiesData'
import UseOfData from 'components/privacy/UseOfData'
import TransferOfData from 'components/privacy/TransferOfData'
import DisclosureOfData from 'components/privacy/DisclosureOfData'
import SecurityOfData from 'components/privacy/SecurityOfData'
import ServiceProviders from 'components/privacy/ServiceProviders'
import Analytics from 'components/privacy/Analytics'
import OtherSites from 'components/privacy/OtherSites'
import ChildrensPrivacy from 'components/privacy/ChildrensPrivacy'
import Changes from 'components/privacy/Changes'
import FullWidthLayout from 'hocs/layouts/FullWidthLayout'

const Privacy = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <FullWidthLayout>
            <Helmet>
                <title>Privacidad - Nuestra Politica de Privacidad</title>
                <meta name="description" content="Politica de privacidad de SoloPython"/>
                <link rel="canonical" href="https://solopython.com" />
            </Helmet>

            <Header/>
            <InfoCollection/>
            <TypesOfData/>
            <UsageData/>
            <CookiesData/>
            <UseOfData/>
            <TransferOfData/>
            <DisclosureOfData/>
            <SecurityOfData/>
            <ServiceProviders/>
            <Analytics/>
            <OtherSites/>
            <ChildrensPrivacy/>
            <Changes/>
            <br/>
        </FullWidthLayout>
    )
}

export default Privacy