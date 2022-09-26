import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config/api';
import Dropdowns from "../components/Dropdowns"
import ConvertResult from "../components/ConvertResult"
import Spinner from '../components/Spinner'

const CurrencyConverter = () => {

  const [into, setInto] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [fromAmount, setFromAmount] = useState("");
  const [intoAmount, setIntoAmount] = useState("");
  const [conversionRate, setConversionRate] = useState("");
  const [currencyCode, setCurrencyCode] = useState([]);
  const [ratesValue, setRatesValue] = useState();

	useEffect(() => {
		axios.get(BASE_URL)
			.then(response => {
				setRatesValue(response.data.data)
				const result = Object.keys(response.data.data).map((key) => [key, response.data.data[key]]);
				let tempCurrencyCode = [];
				result.map((item) => {
					tempCurrencyCode.push(item[0]);
				})
				setCurrencyCode(tempCurrencyCode);
				setLoading(false);
			})
			.catch(error => console.log(error));
	}, [])

	useEffect(() => {
		if(fromAmount) {
			setConversionRate(ratesValue[into]);
			const conversionResult = ratesValue[into] * fromAmount;
			setIntoAmount(Math.round(conversionResult*100)/100);
		}
	}, [into])

	const resetState = () => {
		setInto("USD");
		setLoading(false);
		setFromAmount("");
		setIntoAmount("");
		setConversionRate("");
	}

	const handleInputFrom = (event) => {
		setFromAmount(event.target.value);
		setConversionRate(ratesValue[into]);
		const conversionResult = ratesValue[into] * event.target.value;
		setIntoAmount(Math.round(conversionResult*100)/100);
	}

	const handleInputInto = (event) => {
		setIntoAmount(event.target.value);
		setConversionRate(ratesValue[into]);
		const conversionResult = event.target.value / ratesValue[into];
		setFromAmount(Math.round(conversionResult*100)/100);
	}

	const handleInto = (event) => {
		setInto(event.currentTarget.value);
	}

	return (
		<>
		{loading ? (
      <Spinner />
		) : (
			<div className='container-fluid mt-3 center'>
				<div className='row'>
					<div className='col-sm-12 col-md-6'>
						<label className='item-subject'>Convert from</label>
						<label className='from-currency-label'>AUD</label>
					</div>
					<div className='col-sm-12 col-md-6'>
						<label className='item-subject'>Amount</label>
						<input
							className="amount-input"
							placeholder="Enter Amount"
							value={fromAmount}
							type="number"
							onChange={handleInputFrom}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='col-sm-12 col-md-6'>
						<label className='item-subject'>Convert into</label>
						<Dropdowns
							currencyCode={currencyCode}
							handleChange={handleInto}
							value={into}
						></Dropdowns>
					</div>
					<div className='col-sm-12 col-md-6'>
						<label className='item-subject'>Amount</label>
						<input
							className="amount-input"
							value={intoAmount}
							placeholder="Enter Amount"
							type="number"
							onChange={handleInputInto}
						/>
					</div>
				</div>
				<div className='row'>
					<div className='reset-button'>
						<button
							className='btn btn-info btn-lg'
							text="Reset"
							onClick={resetState}
						>Reset<i className="fas fa-redo-alt"></i></button>
					</div>
					<div className='rate-result'>
						<ConvertResult
							rate={conversionRate}
						></ConvertResult>
					</div>
				</div>
			</div>
		)}
		</>
	)
}

export default CurrencyConverter