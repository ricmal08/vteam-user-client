import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import api_url from "../url.js";
import styled from 'styled-components';

function InvoicePage() {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    // Loading state to prevent crashing when compoments rendering before fetching invoice
    const [loading, setLoading] = useState(true);

    // Fetch single invoice
    async function fetchSingleInvoice() {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.log("Ingen användare inloggad!");
                setLoading(false);
                return;
            }

            // Fetching
            const response = await fetch(`${api_url}invoices/${id}`, {
                headers: { "Authorization": `Bearer ${accessToken}` }
            });
            console.log("respons för invoice: ", response.ok);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Kunde inte hämta fakturor", errorData);
            }

            const data = await response.json();
            console.log("Lyckad hämtning av fakturan: ", data);
            setInvoice(data);

        } catch (error) {
            console.error("Fel vid hämtning av enskild faktura: ", error);
        } finally {
            setLoading(false);
        }
        
    }

    useEffect(() => {
        fetchSingleInvoice();
    }, [id]);

    if (loading) {
        return <LoadingWrapper>Laddar faktura...</LoadingWrapper>;
    }

    if (!invoice) {
        return <ErrorWrapper>Faktura hittades inte</ErrorWrapper>;
    }


    return (
        <>
            <PageWrapper>
                <InvoiceWrapper>
                    <InvoiceHead>
                        <h1>Faktura detaljer</h1>
                        <p>Din digitala kvittens</p>
                        <span className={invoice.paid ? 'status paid' : 'status unpaid'}>
                            {invoice.paid ? 'Betald' : 'Obetald'}
                        </span>
                    </InvoiceHead>
                    
                    <InvoiceDetails>
                        <InvoiceNr>Faktura {invoice._id}</InvoiceNr>
                        <DetailRow>
                            <span>Datum</span>
                            <span>{new Date(invoice.date).toLocaleDateString('sv-SE')}</span>
                        </DetailRow>
                        <DetailRow>
                            <span>Starttid</span>
                            <span>{invoice.startTime}</span>
                        </DetailRow>
                        <DetailRow>
                            <span>Sluttid</span>
                            <span>{invoice.endTime}</span>
                        </DetailRow>
                        <DetailRow>
                            <span>Totalt tid</span>
                            <span>{invoice.time}</span>
                        </DetailRow>
                        <DetailRow>
                            <span>Avstånd</span>
                            <span>{invoice.distance} km</span>
                        </DetailRow>
                        <DetailRow>
                            <span>Belopp</span>
                            <span>{invoice.amount}kr</span>
                        </DetailRow>
                    </InvoiceDetails>
                </InvoiceWrapper>
            </PageWrapper>
        </>
    )
}

const PageWrapper = styled.section`
    padding-bottom: 100px;
`;

const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 1.2em;
    color: #6b7280;
`;

const ErrorWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    font-size: 1.2em;
    color: #dc2626;
`;

const InvoiceWrapper = styled.section`
    margin: 0 auto;
    margin-top: 1rem;
    max-width: 500px;
    width: 80%;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;    
`;

const InvoiceHead = styled.section`
    color: #000;
    padding: 30px 20px;
    text-align: center;
    background: linear-gradient(135deg, #55928c 0%, #3d6b66 100%);

    p {
        opacity: 0.9;
    }
    
    .status {
        display: inline-block;
        border-radius: 8px;
        padding: 6px 16px;
        font-weight: 600;
        margin-top: 10px;
    }
    .status.paid {
        background-color: #10b981;
        color: #fff;
    }
    .status.unpaid {
    background-color: #b4b1b1ff;
    color: #000;
    opacity: 0.9;

    }
`;

const InvoiceNr = styled.section`
    text-align: center;
    color: #666;
    border-bottom: 1px solid #eee;
    padding: 10px;
    margin-bottom: 10px;
`;

const InvoiceDetails = styled.section`
    padding: 30px 20px;
    background-color: #ccc;
`;

const DetailRow = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
`;

export default InvoicePage;
