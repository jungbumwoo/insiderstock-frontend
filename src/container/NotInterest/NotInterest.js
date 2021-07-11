import React, { useEffect, useState } from "react";
import { getNotInterestAction } from "../../actions";
import { notInterestDeleteAct } from "../../actions";
import { returnUtil } from "../containerUtils.js";
import { textObject } from "../../components/text/textObject.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ModalMessage } from "../../components/Modals/ModalMessage/ModalMessage";
import NeedLogin from "../NeedLogin/NeedLogin";
import InitialEmpty from "../InitialEmpty/InitialEmpty";
import Layout from "../../components/Layouts/Layout/Layout";

import "./NotInterest.css"

const NotInterest = (props) => {
    const dispatch = useDispatch();
    const notinterest = useSelector(state => state.notinterest);
    const { pager, pageOfItems } = notinterest.pagedNotInt;
    const [ checkedArray, setCheckedArray ] = useState([]);
    const [ curntUrl, setCurntUrl ] = useState(1);

    // For Modal
    const [ modalMessageShow, setModalMessageShow ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent1, setModalContent1 ] = useState('');
    const [ modalContent2, setModalContent2 ] = useState('');

    // Pagination
    const [ currentUrl, setCurrentUrl ] = useState(1);
    
    useEffect(() => {
        dispatch(getNotInterestAction(currentUrl));
    }, [currentUrl]);
    
    const checkBoxChange = (e) => {
        let intId = parseInt(e.target.id);
        if(e.target.checked){
            //checked, true
            setCheckedArray([
                ...checkedArray,
                intId
            ]);
        } else {
            // unchecked
            let deletedUnchecked = checkedArray.filter(element => element !== intId);
            setCheckedArray(deletedUnchecked);
        }
    };

    const handlePageBtn = (e) => {
        setCurrentUrl(e.target.innerHTML);
    };

    const handleDeleteBtn = () => {
        // remain element
        let wholearray = [];
        for( let i = 0; i < pageOfItems.length; i++ ){
            wholearray.push(i);
        };
        let remainArrayNum = wholearray.filter((num) => {
            console.log(num);
            let deleteIndex = checkedArray.indexOf(num);
            // 여기 값이 달라지네;;;
            //checkedArray. 항상그대로.
            if (deleteIndex > -1 ) {
                console.log(`num: ${num}, deleteIndx: ${deleteIndex}`);
            }
            return deleteIndex <= -1
        });
        console.log(remainArrayNum);

        let remainArray = remainArrayNum.map((num) => {
            return pageOfItems[num];
        });

        let deleteArray = checkedArray.map((num) => {
            return pageOfItems[num];
        });
        dispatch(notInterestDeleteAct(deleteArray, remainArray));
    }

    const returnNotInt = () => {
        let result = pageOfItems.map((trs) => {
            return (
                <tr onClick={handleTRClick} className={checkedArray.includes(parseInt(pageOfItems.indexOf(trs))) ? 'checked-tr' : 'unchecked-tr'} id={parseInt(pageOfItems.indexOf(trs))} key={pageOfItems.indexOf(trs)}>
                    <td className="checkbox-hide"><input type="checkbox" id={pageOfItems.indexOf(trs)} name="chk" onChange={checkBoxChange} /></td>
                    <td>{trs.ticker}</td>
                    <td>{trs.company}</td>
                    <td>{trs.insiderName}</td>
                    <td>{trs.date}</td>
                    <td>{trs.MarketCap}</td>
                </tr>
            )
        })
        return result;
    }

    const handleWhatis = () => {
        console.log('handlewhatis clicked')
        setModalMessageShow(true);
        setModalTitle(textObject.notinterest.title);
        setModalContent1(textObject.notinterest.description1);
        setModalContent2(textObject.notinterest.description2);
    };

    const handleMessageClose = () => {
        setModalTitle('');
        setModalContent1('');
        setModalContent2('');
        setModalMessageShow(false);
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

    let isToken = localStorage.getItem('token');
    if(!isToken) {
        return <NeedLogin 
                    title= {textObject.notinterest.title}
                    description1 = {textObject.notinterest.description1}
                    description2 = {textObject.notinterest.description2} />
    } else if (pageOfItems.length == 0) {
        return <InitialEmpty
                    title= {textObject.notinterest.title}
                    description1 = {textObject.notinterest.description1}
                    description2 = {textObject.notinterest.description2} />
    }

    return (
        <>
            <Layout />
            <div className="notinterestContainer">
                <div className="mainquestion" onClick={handleWhatis}>
                    <span className="subtitle">노관심목록은</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Blue_question_mark_icon.svg" alt="" />
                </div>    
                <table>
                    <thead>
                        <tr>
                            <th className="checkbox-hide"></th>
                            <th>종목코드</th>
                            <th>종목명</th>
                            <th>거래자</th>
                            <th>일자</th>
                            <th>시가총액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnUtil(notinterest, returnNotInt)}
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
                    <button onClick={handleDeleteBtn}>Delete</button>
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
    );
}

export default NotInterest;