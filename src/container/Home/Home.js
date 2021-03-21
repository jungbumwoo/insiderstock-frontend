import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStock, savestock } from "../../actions/stockAction";
import Table from "react-bootstrap/Table";
import Layout from "../../components/Layouts/Layout/Layout.js";
import Button from 'react-bootstrap/Button';

import "./Home.css";

const useInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);
    let onChange = (e) => {
        setValue(e.target.value);
    };

    return { 
        value,
        onChange
    }
}


const Home = (props) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const stock = useSelector(state => state.stock);
    const [ newArray, setNewArray] = useState([]);
    let checkboxArray = [];
    let maplist = () => {
        console.log("maplist Func executed. to get the list");
        stock.stocks.map((trs) => {
            checkboxArray.push({
                id: trs[0],
                checked         
            })
        })
        return checkboxArray;
    } 
    const [checkArray, setCheckArray] = useState(maplist());

    useEffect(()=> {
        dispatch(getAllStock());
    }, [])

    const checkBoxChange = (e) => {
        console.log(e.target.id);
        const itemToFind = newArray.find((item) => { return item.id == e.target.id })
        // let isexist = newArray.filter((cat) => {
        //     cat.id = e.target.id
        // });
        const idx = newArray.indexOf(itemToFind)
        if (idx > -1) {
            newArray.splice(idx, 1)
        } else {
            newArray.push({ id: e.target.id })
        }
        setNewArray(newArray);
    }

    const handleSaveBtn = () => {
        console.log("Save btn clicked.");
        console.log(newArray);
        let stocksToSave = newArray.map((item) => {
            let puppy = stock.stocks.filter((cat) => {
                return cat[0] == item.id 
            })
            return puppy
        })
        console.log(stocksToSave);
        dispatch(savestock(stocksToSave));
        setNewArray([]);
    }

    let inputProps = useInput("muyaho");

    if (!stock.loading) {
        return (
            <>
                <div className="container">
                <Layout />
                    <Table responsive>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Ticker</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Insider Name</th>
                                <th>Insider Position</th>
                                <th>Date</th>
                                <th>Buy/sell</th>
                                <th>Insider Trading Shares</th>
                                <th>Shares Change</th>
                                <th>Price</th>
                                <th>Cost</th>
                                <th>Final Share</th>
                                <th>Price Change Since Insider Trade (%)</th>
                                <th>Dividend Yield %</th>
                                <th>PE Ratio</th>
                                <th>Market Cap ($M)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {stock.stocks.map((trs) => {
                            return (
                                <tr key={trs[0] + trs[11] + trs[12] + Math.random()}>
                                    <th><input type="checkbox" id={trs[0]} name={trs[0]} onChange={checkBoxChange}/></th>
                                    <th>{trs[0]}</th>
                                    <th>{trs[2]}</th>
                                    <th>{trs[3]}</th>
                                    <th>{trs[4]}</th>
                                    <th>{trs[5]}</th>
                                    <th>{trs[6]}</th>
                                    <th>{trs[7]}</th>
                                    <th>{trs[8]}</th>
                                    <th>{trs[9]}</th>
                                    <th>{trs[10]}</th>
                                    <th>{trs[11]}</th>
                                    <th>{trs[12]}</th>
                                    <th>{trs[13]}</th>
                                    <th>{trs[14]}</th>
                                    <th>{trs[15]}</th>
                                    <th>{trs[16]}</th>
                                </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    <div>
                        <Button onClick={handleSelectAll} variant="primary" size="sm">
                            Select All
                        </Button>{' '}
                        <Button onClick={handleSaveBtn} variant="success" size="sm">
                            Save
                        </Button>
                    </div>
                    <div>
                        <input
                            value= {inputProps.value}
                            onChange= {inputProps.onChange}
                            placeholder="Type in here"/>
                        <span>Value: {inputProps.value}</span>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div>Loading..</div>
        )
    }
}

const handleSelectAll = () => {
    console.log("select All");
}

export default Home;