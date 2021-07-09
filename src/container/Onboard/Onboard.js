import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFillInOnboardAction, deleteOnboardAction, getOnboard } from "../../actions/onboardAction.js";
import { returnUtil } from "../containerUtils.js";
import { ModalMessage } from "../../components/Modals/ModalMessage/ModalMessage.js";
import { textObject } from "../../components/text/textObject.js";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

import InitialEmpty from "../InitialEmpty/InitialEmpty.js";
import Layout from "../../components/Layouts/Layout/Layout.js";
import NeedLogin from "../NeedLogin/NeedLogin.js";
import OnboardAddModal from "../../components/Modals/OnboardAddModal/OnboardAddModal.js";

const Onboard = (props) => {
    const onboard = useSelector(state => state.onboard);
    const { pager, pageOfItems } = onboard.pagedOnboard;
    const dispatch = useDispatch();
    const [ checkedNum, setCheckedNum ] = useState([]);
    const [ pageNum, setpageNum ] = useState(1);

    //about Add Modal
    const [modalShow, setmodalShow] = useState(false);
    const [mdTicker, setmdTicker] = useState('');
    const [mdCompany, setmdCompany] = useState('');
    const [mdPrice, setmdPrice] = useState('');
    const [mdShares, setmdShares] = useState('');
    const [mdMarketPrice, setmdMarketPrice] = useState('');

    // messageModal 
    const [ modalMessageShow, setModalMessageShow ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalAlert, setModalAlert ] = useState('');

    // Pagination
    const [ currentUrl, setCurrentUrl ] = useState('');
    const [ checkedArray, setCheckedArray ] = useState([]);

    useEffect(()=> {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
            // When Page Change
            if(urlParams !== onboard.pagedOnboard.pager.pages){
                console.log("urlParams !== stock.paginatedResult.pager.currentPage");
                dispatch(getOnboard(urlParams));
            } else if (urlParams === 1 && onboard.pagedOnboard.pager.pages === 1) {
                // When first page was loaded.
                console.log("urlParams === 1 && stock.paginatedResult.pager.currentPage === 1")
                dispatch(getOnboard(urlParams));    
            }
            // setCurrentUrl(stock.paginatedResult.pager.currentPage);
    }, [currentUrl]);

    const checkBoxChange = (e) => {
        const { id, checked } = e.target;
        let intId = parseInt(id);
        if(checked) {
            // checked, true
            setCheckedNum([
                ...checkedNum,
                intId
            ]);
        } else {
            //unchecked, false
            let filtered = checkedNum.filter(num => (num !== intId));
            setCheckedNum(filtered);
        }
    }
    
    const returnOnboards = () => {
        let onboardList = pageOfItems.map((trs) => {
            return (
                <tr onClick={handleTRClick} className={checkedNum.includes(parseInt(pageOfItems.indexOf(trs))) ? 'checked-tr' : 'unchecked-tr'} id={parseInt(pageOfItems.indexOf(trs))} key={pageOfItems.indexOf(trs)}>
                    <td><input type="checkbox" onChange={checkBoxChange} id={parseInt(pageOfItems.indexOf(trs))} checked={checkedNum.includes(pageOfItems.indexOf(trs))} name="chk" /></td>
                    <td>{trs.ticker ? trs.ticker : '-'}</td>
                    <td>{trs.company}</td>
                    <td>{trs.MarketCap ? trs.MarketCap : '-'}</td>
                    <td>{trs.price}</td> 
                    <td>{trs.shares ? trs.shares : '-'}</td>
                    <td>{trs.cost ? trs.cost : '-'}</td>
                </tr>
            )
        })
        return onboardList;
    };
    
    const handlePageChange = (e) => {
        const clickedNum = e.target.innerHTML;
        setpageNum(parseInt(clickedNum));
    }; 

    const handleDelete = () => {
        let checkedItems = checkedNum.map(num => {
            return pageOfItems[num];
        })
        dispatch(deleteOnboardAction(checkedItems));
        window.location.reload(true);
        setCheckedNum([]);
    };

    const handleAddBtn = () => {
        if (checkedNum.length === 0) {
            console.log("should select at least 1");
            setModalAlert(textObject.alret.atleastPick);
            setModalMessageShow(!modalMessageShow);
        } else {
            setmodalShow(!modalShow);   
        }
    }

    const handleModalInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "ticker") {
            setmdTicker(value);
        } else if (name === "company") {
            setmdCompany(value);
        } else if (name === "price") {
            setmdPrice(value);
        } else if (name === "MarketCap") {
            setmdMarketPrice(value);
        } else if (name === 'shares') {
            setmdShares(value);
        } else {
            console.log('err at handleModalInputChange');
        }
    }

    const modalClose = () => {
        setmodalShow(false);
    }

    const modalSubmit = () => {
        console.log(mdTicker, mdCompany, mdPrice, mdMarketPrice, mdShares);
        // prevent Empthy
        if (mdTicker !== '' && mdCompany !== '' && mdPrice !== '' && mdShares !== '') {
            // dispatch
            let singleOnboard = {
                ticker: mdTicker,
                company: mdCompany,
                shares: mdShares,
                MarketCap: mdMarketPrice,
                price: mdPrice
            }
            dispatch(addFillInOnboardAction(singleOnboard));
        } else {
            console.log('기호, 회사명, 매수가, 수량은 필수기입 항목입니다.');
        }
        window.location.reload(true);
        modalClose();
        
    }

    const getPageNum = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        return urlParams;
    }

    const pageChange = () => {
        let urlSearchParams = new URLSearchParams(props.location.search);
        let urlParams = parseInt(urlSearchParams.get('page')) || 1;
        setCurrentUrl(urlParams);
        setCheckedNum([]);
    }

    const handleTRClick = (e) => {
        let intId = parseInt(e.target.parentNode.id);
        let isChecked = checkedNum.includes(intId);
        console.log(`isChecked`, isChecked);
        if(isChecked && !isNaN(intId)) {
            //uncheck
            let filtered = checkedNum.filter(el => el !== intId);
            setCheckedNum(filtered);
        } else if (!isChecked && !isNaN(intId)) {
            //check
            setCheckedNum([
                ...checkedNum,
                intId
            ])
        }
    }
    console.log(`checkedNum`, checkedNum);

    const handleWhatis = () => {};

    let isToken = localStorage.getItem('token');
    if(!isToken) {
        return <NeedLogin 
                    title= {textObject.onboard.whatisOnboard}
                    description1 = {textObject.onboard.description1}
                    description2 = {textObject.onboard.description2} />
    } else if (pageOfItems.length == 0) {
        return <InitialEmpty title= {textObject.interest.title}
                            description1 = {textObject.interest.description1}
                            description2 = {textObject.interest.description2}/>
    }

    if(onboard.loading){
        return <LoadingSpinner />
    }

    return(
        <>
            <Layout />
            <div className="onboard-container">
                <div className="mainquestion" onClick={handleWhatis}>
                    <span className="subtitle">담은목록이란</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Blue_question_mark_icon.svg" alt="" />
                </div>
                <table className="onboard-table">
                    <thead>
                        <tr>
                            <th className="checkbox-hide">#</th>
                            <th>종목코드</th>
                            <th>종목명</th>
                            <th>시가총액</th>
                            <th>Price</th>
                            <th>수량</th>
                            <th>비용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnUtil(onboard, returnOnboards)}
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
                </div>
                <div className="buttons">
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <OnboardAddModal 
                    modalShow={modalShow}
                    handleModalInputChange={handleModalInputChange}
                    submit={modalSubmit}
                />
                <ModalMessage 
                    shown={modalMessageShow}
                    modalTitle={textObject.onboard.whatisOnboard}
                    modalAlert={modalAlert}
                />
            </div>
        </>
    )
}

export default Onboard;