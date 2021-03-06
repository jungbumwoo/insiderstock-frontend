import React, { useEffect, useState } from "react";
import { getInterestAction } from "../../actions/stockAction";
import { getNotInterestAction, interestDeleteAct } from "../../actions";
import Layout from "../../components/Layouts/Layout/Layout.js";
import InitialEmpty from "../InitialEmpty/InitialEmpty";
import NeedLogin from "../NeedLogin/NeedLogin";
import "./Interest.css";
import { Link } from "react-router-dom";
import { ModalMessage } from "../../components/Modals/ModalMessage/ModalMessage";
import { useDispatch, useSelector } from "react-redux";
import { returnUtil } from "../containerUtils";
import { textObject } from "../../components/text/textObject";


const Interest = (props) => {
    const dispatch = useDispatch();
    const stock = useSelector(state => state.stock);
    const { pager, pageOfItems } = stock.pagedGetInt;
    const [ checkedArray, setCheckedArray ] = useState([]);
    // const [ checkedNum, setCheckedNum ] = useState([]);

    // For Modal
    const [ modalMessageShow, setModalMessageShow ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent1, setModalContent1 ] = useState('');
    const [ modalContent2, setModalContent2 ] = useState('');

    // Pagination
    const [ currentUrl, setCurrentUrl ] = useState(1);

    useEffect(() => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        if(urlParams !== stock.pagedGetInt.pager.pages){
            console.log("urlParams !== stock.pagedGetInt.pager.currentPage");
            dispatch(getInterestAction(urlParams));
        } else if (urlParams === 1 && stock.pagedGetInt.pager.pages === 1) {
            // When first page was loaded.
            console.log("urlParams === 1 && stock.pagedGetInt.pager.currentPage === 1")
            dispatch(getInterestAction(urlParams));    
        }
        // console.log(curntUrl);
        // dispatch(getInterestAction(curntUrl));
    }, [currentUrl]);

    const handlePageClick = (e) => {
        let targetNum = e.target.innerHTML;
        setCurrentUrl(parseInt(targetNum));
        setCheckedArray([]);
    }; 

    const returnPages = () => {
        let pageReturn = pager.pages.map(el => {
            return (
                <li onClick={handlePageClick}>
                    <span>{el}</span>        
                </li>
            )
        });
        return pageReturn;
    };

    const checkBoxChange = (e) => {
        let intId = parseInt(e.target.id);
        if(!e.target.checked){
            // uncheck, remove
            let filtered = checkedArray.filter(el => (el !== intId))
            setCheckedArray(filtered);
        } else {
            // check, insert 
            setCheckedArray([...checkedArray, intId]);
        }
    };

    const returnPageOfItems = () => {
        let result = pageOfItems.map(trs => {
            return (
                <tr onClick={handleTRClick} className={checkedArray.includes(parseInt(pageOfItems.indexOf(trs))) ? 'checked-tr' : 'unchecked-tr'} id={parseInt(pageOfItems.indexOf(trs))} key={pageOfItems.indexOf(trs)}>
                    <td className="checkbox-hide"><input type="checkbox" onChange={checkBoxChange} id={parseInt(pageOfItems.indexOf(trs))} checked={checkedArray.includes(pageOfItems.indexOf(trs))} name="chk" /></td>
                    <td><a href={`https://www.gurufocus.com/stock/${trs.ticker}/insider`} target='_blank' rel="noreferrer">{trs.ticker}</a></td>
                    <td><a href={`https://www.google.com/search?q=${trs.company}`} target='_blank' rel="noreferrer">{trs.company}</a></td>
                    {/* <th>{trs.currentprice}</th> */}
                    <td>{trs.insiderName}</td>
                    <td>{trs.insiderPosition}</td>
                    <td>{trs.date}</td>
                    <td>{trs.transaction}</td>
                    <td>{trs.insiderTradingShares}</td>
                    <td>{trs.sharesChange}</td>
                    <td>{trs.purchasePrice}</td>
                    <td>{trs.finalShare}</td>
                    <td>{trs.priceChangeSIT}</td>
                    {/* <th>{trs.DividendYield}</th> */}
                    <td>{trs.PERatio}</td>
                    <td>{trs.MarketCap}</td>
                </tr>
            )
        })
        return result;
    };

    const hadnleDeleteBtn = () => {
        let wholeArrayNum = [];
        for(let i = 0; i < pageOfItems.length; i++){
            wholeArrayNum.push(i);
        }

        let remainArrayNum = wholeArrayNum.filter(el => {
            return !checkedArray.includes(el);
        });

        let remainItems = pageOfItems.filter(item => remainArrayNum.includes(pageOfItems.indexOf(item)));

        let deleteItems = pageOfItems.filter(item => (checkedArray.includes(pageOfItems.indexOf(item))));
        
        dispatch(interestDeleteAct(deleteItems, remainItems));
        setCheckedArray([]);
    };

    const handleWhatis = () => {
        console.log('handlewhatis clicked')
        setModalMessageShow(true);
        setModalTitle(textObject.interest.title);
        setModalContent1(textObject.interest.description1);
        setModalContent2(textObject.interest.description2);
    };

    const handleMessageClose = () => {
        setModalTitle('');
        setModalContent1('');
        setModalContent2('');
        setModalMessageShow(false);
    }

    const pageChange = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        setCurrentUrl(urlParams);
        setCheckedArray([]);
    }

    const getPageNum = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        return urlParams;
    }

    const handleTRClick = (e) => {
        let intId = parseInt(e.target.parentNode.id);
        let isChecked = checkedArray.includes(intId);
        if(isChecked && !isNaN(intId)) {
            //uncheck
            let filtered = checkedArray.filter(el => el !== intId);
            setCheckedArray(filtered);
        } else if (!isChecked && !isNaN(intId)) {
            //check
            setCheckedArray([
                ...checkedArray,
                intId
            ])
        }
    }
    
    let isToken = localStorage.getItem('token');
    if(!isToken) {
        return <NeedLogin 
                    title= {textObject.interest.title}
                    description1 = {textObject.interest.description1}
                    description2 = {textObject.interest.description2} />
    } else if(pageOfItems.length == 0) {
        return <InitialEmpty title= {textObject.interest.title}
                            description1 = {textObject.interest.description1}
                            description2 = {textObject.interest.description2}/>
    } else {
        console.log("token exsist");
        return(
            <>
                <Layout />
                <div className="interestContainer">
                    <div className="mainquestion" onClick={handleWhatis}>
                        <span className="subtitle">??????????????????</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Blue_question_mark_icon.svg" alt="" />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th className="checkbox-hide">#</th>
                                <th>????????????</th>
                                <th>?????????</th>
                                <th>?????????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>????????????</th>
                                <th>Insider Trading Shares</th>
                                <th>????????????</th>
                                <th>?????????</th>
                                <th>Final Share</th>
                                <th>?????? ??? ???????????????(%)</th>
                                <th>???????????????</th>
                                <th>????????????($M)</th>
                            </tr>  
                        </thead>
                        <tbody>
                            {returnUtil(stock, returnPageOfItems)}
                        </tbody>
                    </table>
    
                    <div className="pageNum">
                        <ul>
                            <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{search: `?page=1`}} onClick={pageChange}>&laquo;</Link>
                            </li> 
                            <li className={ `${pager.currentPage === 1 ? 'disabled' : ''}`}>
                                <Link to={{search: `?page=${pager.currentPage - 1}`}} onClick={pageChange}>&lt;</Link>
                            </li>
                            {pageOfItems ? pager.pages.map(num => {
                                return (
                                    <li key={num}>
                                        <Link to={{search: `?page=${num}`}} onClick={pageChange} className={(num === getPageNum() ? 'active-pagenum' : 'pagenum')}>{num}</Link>
                                    </li>
                                )
                            }) : <span>Pager undefined at News</span>}
                            <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{search: `?page=${pager.currentPage + 1}`}} onClick={pageChange}>&gt;</Link>
                            </li>
                            <li className={ `${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                                <Link to={{search: `?page=${pager.totalPages}`}} onClick={pageChange}>&raquo;</Link>
                            </li>
                        </ul>
                        {/* <ul>{returnPages()}</ul> */}
                    </div>
    
                    <div className="buttons">
                        <button onClick={hadnleDeleteBtn}>Delete</button>
                    </div>
                </div>
                <ModalMessage
                    shown={modalMessageShow}
                    onCloseRequest={handleMessageClose}
                    modalTitle={modalTitle}
                    modalContent1={modalContent1}
                    modalContent2={modalContent2}
                />
            </>
        )
    }

}

export default Interest;