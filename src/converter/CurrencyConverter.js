import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/api';
import Dropdowns from "../components/Dropdowns"
import ConvertResult from "../components/ConvertResult"

const label = {
    "width": "325px",
    "color": "white",
    "fontSize": "21px"
}

const CurrencyConverter = () => {

    const [from, setFrom] = useState("USD");
    const [into, setInto] = useState("INR");
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState(1);
    const [conversionResult, setConversionResult] = useState("");
    const [conversionRate, setConversionRate] = useState("");
    const [currencyName, setCurrencyName] = useState([]);
    const [ratesValue, setRatesValue] = useState();
    useEffect(() => {
        axios.get(BASE_URL)
            .then(response => {
                setRatesValue(response.data.data)
                const result = Object.keys(response.data.data).map((key) => [key, response.data.data[key]]);
                let tempCurrencyName = [];
                result.map((item) => {
                    tempCurrencyName.push(item[0]);
                })
                setCurrencyName(tempCurrencyName);
            })
            .catch(error => console.log(error));
    }, [])

    const resetState = () => {
        setFrom("AUD");
        setInto("USD");
        setLoading(false);
        setAmount(0);
        setConversionResult("");
        setConversionRate("");
    }

    const convertCurrency = async () => {
        setLoading(true);
        const conversionRate = ratesValue[into];
        const conversionResult = conversionRate * amount;
        setConversionRate(conversionRate);
        setConversionResult(conversionResult);
        setLoading(false);
    }

    const handleInput = (event) => {
        setAmount(event.target.value);
    }

    const handleInto = (event) => {
        setInto(event.currentTarget.value);
    }

    const handleReset = () => {
        resetState();
    }

    return (
        <>
            <div className='container-fluid shadow'>
                <input
                    className="form-control-lg mt-5 shadow amount bg-dark"
                    placeholder="Enter Amount"
                    value={amount}
                    type="number"
                    onChange={handleInput}
                />
                <div className='fromdrop'>
                    <label className='label' style={label}>AUD</label>
                </div>
                <div className='text-center swap'>
                    <button className="btn shadow text-center"><i className="fas fa-sort"></i></button>
                </div>
                <div className='intodrop'>
                    <Dropdowns
                        labelName="Into"
                        handleChange={handleInto}
                        value={into}
                    ></Dropdowns>
                </div>
                <div className="mt-5 text-center">
                    <button
                        className='btn btn-scolor btn-lg shadow'
                        disabled={amount === "0" || amount === "" || amount < 0}
                        onClick={() => convertCurrency()}
                    >Convert</button>
                </div>
                <div className="mt-4 text-center">
                    <button
                        className='btn btn-rcolor btn-lg shadow'
                        text="Reset"
                        onClick={handleReset}
                    >Reset <i className="fas fa-redo-alt"></i></button>
                </div>
                <div className='mt-5 mb-2 text-center'>
                    <ConvertResult
                        Loading={loading}
                        result={conversionResult}
                        rate={conversionRate}
                    ></ConvertResult>
                </div>
            </div>
        </>
    )
}

export default CurrencyConverter