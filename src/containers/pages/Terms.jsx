
import {Helmet} from 'react-helmet'
import { useEffect } from "react"

import Header from 'components/terms/Header'
import InformationCollection from 'components/terms/InformationCollection'
import AccountTerms from 'components/terms/AccountTerms'
import PlanTerms from 'components/terms/PlanTerms'
import UsageTerms from 'components/terms/UsageTerms'
import PaymentTerms from 'components/terms/PaymentTerms'
import CancellationTerms from 'components/terms/CancellationTerms'
import IntellectualProperty from 'components/terms/IntellectualProperty'
import UserContent from 'components/terms/UserContent'
import ThirdParties from 'components/terms/ThirdParties'
import Indemnification from 'components/terms/Indemnification'
import Disclaimers from 'components/terms/Disclaimers'
import Limitation from 'components/terms/Limitation'
import Copyright from 'components/terms/Copyright'
import GeneralTerms from 'components/terms/GeneralTerms'
import FullWidthLayout from 'hocs/layouts/FullWidthLayout'

const Terms = () => {

    useEffect(() => {
        window.scrollTo(0,0)
    }, [])

    return (
        <FullWidthLayout> 
            <Helmet>
                <title>Terminos - Vudera Terminos de servicio</title>
                <meta name="description" content="Nuestros terminos de uso y servicio"/>
                <link rel="canonical" href="https://vudera.com" />
            </Helmet>

            <Header/>
            <InformationCollection/>
            <AccountTerms/>
            <PlanTerms/>
            <UsageTerms/>
            <PaymentTerms/>
            <CancellationTerms/>
            <IntellectualProperty/>
            <UserContent/>
            <ThirdParties/>
            <Indemnification/>
            <Disclaimers/>
            <Limitation/>
            <Copyright/>
            <GeneralTerms/>
            <br/>
        </FullWidthLayout>
    )
}

export default Terms