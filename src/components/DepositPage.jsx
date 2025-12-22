import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MdArrowBackIosNew } from "react-icons/md";
import { FaCcMastercard, FaCcVisa, FaCcAmex, FaRegCreditCard  } from "react-icons/fa";
import api_url from "../url.js";
import styled from 'styled-components';


function DepositPage({user, setUserStatus}) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // Submitting form to make a deposit
    async function onSubmit(data) {
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                console.log("Ingen användare inloggad!");
                return;
            }

            console.log("Innan: ", user.balance);

            console.log('datan som läggs in: ', data);
            // Make the deposit
            const response = await fetch(`${api_url}payments`, {
                method: "POST",
                headers: { "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                 },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error("Misslyckades göra en insättning", errorData);
            }
            console.log("Response deposit: ", response.ok, response.status);


            const responseData = await response.json();
            console.log(responseData);
            setUserStatus("updated-user");
            navigate("/user");
        } catch (error) {
            console.error("Något gick fel!", error);
        }
        
    }

    return (
    /*
    Returns a login form that on submit calls handleSubmit from react-hook-form
    */
   <PageWrapper>
        <DepositWrapper>
            <DepositHead>
                <button type='button' className='back-btn' onClick={() => navigate("/user")}>
                <MdArrowBackIosNew size={30}/>
                </button>
                <PayMethods>
                    <FaCcVisa size={30}/>
                    <FaCcMastercard size={30}/>
                    <FaCcAmex size={30}/>
                </PayMethods>
                <PayMethods>
                    <FaRegCreditCard size={80}/>
                </PayMethods>

                <h4>Gör en insättning</h4>
            </DepositHead>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <div className='row'>
                    <label htmlFor="cardnumber">Kortnummer</label><br/>
                    <input
                    type='text'
                    id='cardnumber'
                    {...register("cardnumber", { required: 'Du måste fylla i korrekt kortnummer.',
                        pattern: {
                            value: /^\d{4} \d{4} \d{4} \d{4}$/,
                            message: "Format: XXXX XXXX XXXX XXXX"
                        }
                    })} 
                    placeholder='XXXX XXXX XXXX XXXX'/><br/>
                    {errors.cardnumber && <p className="error-message">{ errors.cardnumber.message }</p>}
                </div>

                <div className='flex-row'>
                    <div className='row'>
                        <label htmlFor="firstName">Förnamn</label><br/>
                        <input
                        type='text'
                        id='firstName'
                        {...register("firstName", { required: true })} /><br/>
                        {errors.firstName && <p className="error-message">Du måste fylla i förnamn.</p>}
                    </div>
                    <div className='row'>
                        <label htmlFor="lastName">Efternamn</label><br/>
                        <input
                        type='text'
                        id='lastName'
                        {...register("lastName", { required: true })} /><br/>
                        {errors.lastName && <p className="error-message">Du måste fylla i efternamn.</p>}
                    </div>
                </div>

                <div className='flex-row'>
                    <div className='row'>
                        <label htmlFor="valid">Utgångsdatum</label><br/>
                        <input
                        type='text'
                        id='valid'
                        {...register("valid", { required: 'Du måste fylla i korrekt utgångsdatum.',
                            pattern: {
                            value: /^(0[1-9]|1[0-2])-\d{2}$/,
                            message: "Format: MM-YY"
                            }
                        })}
                        placeholder='MM-YY'/><br/>
                        {errors.valid && <p className="error-message">{ errors.valid.message }</p>}
                    </div>
                    <div className='row'>
                        <label htmlFor="cvc">CVC</label><br/>
                        <input
                        type='password'
                        id='cvc'
                        {...register("cvc", { required: 'Du måste fylla i korrekt cvc.',
                            pattern: {
                                value: /^\d{3}$/,
                                message: "CVC måste vara 3 siffror"
                            }
                        })} 
                        placeholder='XXX'/><br/>
                        {errors.cvc && <p className="error-message">{ errors.cvc.message }</p>}
                    </div>
                </div>

                <div className='row'>
                    <label htmlFor="amount">Belopp</label><br/>
                    <input
                    type='number'
                    id='amount'
                    {...register("amount", { required: 'Du måste fylla i belopp.',
                        min: { value: 50, message: "Minst 50 kr" }
                    })} /><br/>
                    {errors.amount && <p className="error-message">{ errors.amount.message }</p>}
                </div>

                <input className="form-button" type="submit" value="Slutför insättning" />
            </form>
        </DepositWrapper>
    </PageWrapper>
  )
}

const PageWrapper = styled.section`
    padding-bottom: 100px;
`;

const DepositWrapper = styled.section`
    margin: 0 auto;
    margin-top: 1rem;
    max-width: 500px;
    width: 80%;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    background-color: #fff;

    .login-form {
        padding: 30px 20px;
    }

    .row {
        margin-bottom: 20px;
    }
    .flex-row {
        display: flex;
        gap: 10px;
        justify-content: center;

        .row {
            flex: 1;
            margin-bottom: 20px;
        }
    }

    label {
        display: block;
        font-weight: 600;
        font-size: 0.95em;
    }

    .error-message {
        color: red;
        font-size: 0.9em;
        margin-top: 0;
        margin-bottom: 10px;
    }

    input {
        box-sizing: border-box;
        padding: 10px;
        border-radius: 5px;
        width: 100%;

    }

    .form-button {
        font-size: 1em;
        margin-top: 20px;
        padding: 5px;
        border-radius: 10px;
        background-color: #10b981;
    }
    .form-button:hover  {
        cursor: pointer;
    }

`;

const DepositHead = styled.section`
    color: #000;
    padding: 30px 20px;
    text-align: center;
    background: linear-gradient(135deg, #55928c 0%, #3d6b66 100%);

    .back-btn {
        position: absolute;
        top: 20px;
        left: 390px;
        background: none;
        border: none;
        cursor: pointer;
    }

    h4 {
        color: #fff;
        margin-top: 10px;
    }

`;

const PayMethods = styled.section`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
`;


export default DepositPage