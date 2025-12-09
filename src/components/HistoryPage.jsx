import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import api_url from "../url.js";
import styled from 'styled-components';

function HistoryPage({user, setUser}) {
    const navigate = useNavigate();

    // Save invoices in useState to not over fetch
    const [invoices, setInvoices] = useState(null);

    // Function that fetch the user invoices
    async function fetchInvoices() {
        try {
            const userEmail = user.email;
            if (!userEmail) {
                console.log("Ingen användare inloggad!");
                setUser(null);
                return;
            }

            // Fetch invoices for user
            const response = await fetch(`${api_url}users/${userEmail}/invoices`);
            console.log("respons för invoices: ", response.ok);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Kunde inte hämta fakturor", errorData);
            }

            const data = await response.json();
            console.log("Lyckad hämtning av fakturor: ", data);
            setInvoices(data);

        } catch (error) {
            console.error("Fel vid hämtning av fakturor för användaren: ", error);
        }
        
    }

    // Used in onClick to navigate to single invoice
    const handleSingleInvoice = (invoiceId) => {
        navigate(`/history/invoice/${invoiceId}`);
    }

    useEffect(() => {
        if(user && !invoices) {
          fetchInvoices();
        }
    }, [user, invoices]);

    return (
        <>
            <TableWrapper>
                {invoices && invoices.length === 0  && <p>Inga tidigare resor</p>}
                {invoices && invoices.length > 0 && (
                    <>
                        <h1>Resor</h1>
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Resa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map(invoice => (
                                    <tr key={invoice._id} onClick={() => handleSingleInvoice(invoice._id)}
                                        className="invoice-link">
                                        <td>
                                            {new Date(invoice.date).toLocaleDateString('sv-SE')} {' '}
                                                {new Date(invoice.date).toLocaleTimeString('sv-SE', 
                                                    { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            
                        </table>
                    </>

                )}
            </TableWrapper>
        </>
    )

}

const TableWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  min-height: 80vh;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2em;
    color: #6b7280;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 2em;
    color: #111827;
    font-weight: 600;
  }

  .history-table {
    font-family: 'Arial', sans-serif;
    border-collapse: collapse;
    width: 90%;
    margin: 20px 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    overflow: hidden;
    background-color: white;
  }

  thead {
    background-color: #111827;
    color: white;
  }

  th {
    padding: 16px 20px;
    text-align: left;
    font-weight: 500;
    font-size: 0.95em;
    border: none;
    text-transform: uppercase;
  }

  td {
    padding: 16px 20px;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
    color: #374151;
    font-size: 0.95em;
  }

  tbody tr:nth-child(even) {
    background-color: #dddddd;
  }

  .invoice-link {
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .invoice-link:hover {
    background-color: #f3f4f6 !important;
  }

`
;

export default HistoryPage;