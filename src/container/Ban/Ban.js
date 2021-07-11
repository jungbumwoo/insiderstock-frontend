import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteBanAction, getBanAction } from '../../actions/banAction';
import InitialEmpty from '../InitialEmpty/InitialEmpty';
import Layout from "../../components/Layouts/Layout/Layout.js";
import { ModalMessage } from '../../components/Modals/ModalMessage/ModalMessage';
import NeedLogin from "../NeedLogin/NeedLogin.js";
import { Link } from "react-router-dom";
import { returnUtil } from '../containerUtils';
import { textObject } from '../../components/text/textObject';

import './Ban.css'

const Ban = (props) => {
    const dispatch = useDispatch();
    const ban = useSelector(state => state.ban);
    const { pager, pageOfItems } = ban.bans;
    const [ checkedArray, setCheckedArray] = useState([]);

    // For Modal
    const [ modalMessageShow, setModalMessageShow ] = useState(false);
    const [ modalTitle, setModalTitle ] = useState('');
    const [ modalContent1, setModalContent1 ] = useState('');
    const [ modalContent2, setModalContent2 ] = useState('');

    // Pagination
    const [ currentUrl, setCurrentUrl ] = useState(1);

    useEffect(() => {
        dispatch(getBanAction( currentUrl));
    }, [ currentUrl]);
    
    const returnBans = () => {
        let returnBan = pageOfItems.map((trs) => {
            return (
                <tr onClick={handleTRClick} className={checkedArray.includes(parseInt(pageOfItems.indexOf(trs))) ? 'checked-tr' : 'unchecked-tr'} id={parseInt(pageOfItems.indexOf(trs))} key={pageOfItems.indexOf(trs)}>
                    <td className="checkbox-hide"><input type="checkbox" id={pageOfItems.indexOf(trs)} onChange={handleCheckBox} /></td>
                    <td>{trs.ticker}</td>
                    <td>{trs.company}</td>
                    <td>{trs.MarketCap}</td>
                    <td>{trs.PERatio}</td>
                    {/* <td>{item.DividendYield.$numberDecimal}</td> */}
                </tr>
            )
        })
        return returnBan;
    };

    const handleCheckBox = (e) => {
        console.log(` checkedArray`,  checkedArray);
        const { id, checked } = e.target;
        const intId = parseInt(id);
        if (checked) {
            // checked true
            setCheckedArray([
                ... checkedArray,
                intId
            ])
        } else {
            // unchecked false
            let filtered =  checkedArray.filter(num => (num !== intId));
            setCheckedArray(filtered);
        }
    }; 

    const handleDeleteBtn = () => {
        console.log(` checkedArray`,  checkedArray);
        const deleteData =  checkedArray.map(num => {
            return pageOfItems[num]
        });
        dispatch(deleteBanAction(deleteData));
        window.location.reload(true);
        // setCheckedArray([]);
    };

    const handlePageClick = (e) => {
        let clickedNum = parseInt(e.target.innerHTML);
        setCurrentUrl(clickedNum);
    };

    const handleWhatis = () => {
        console.log('handlewhatis clicked')
        setModalMessageShow(true);
        setModalTitle(textObject.ban.title);
        setModalContent1(textObject.ban.description1);
        setModalContent2(textObject.ban.description2);
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
                    title= {textObject.ban.title}
                    description1 = {textObject.ban.description1}
                    description2 = {textObject.ban.description2} />
    } else if (pageOfItems.length == 0) {
        return <InitialEmpty
                    title= {textObject.ban.title}
                    description1 = {textObject.ban.description1}
                    description2 = {textObject.ban.description2} />
    }
 
    return(
        <>  
            <Layout />
            <div className="banContainer">
                <div className="mainquestion" onClick={handleWhatis}>
                    <span className="subtitle">ban목록은</span>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/11/Blue_question_mark_icon.svg" alt="" />
                </div>    
                <table class="styled-table">
                    <thead>
                        <tr>
                            <th className="checkbox-hide"></th>
                            <th>종목코드</th>
                            <th>종목명</th>
                            <th>시가총액</th>
                            <th>주가수익률</th>
                            {/* <th>DividendYield</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {returnUtil(ban, returnBans)}
                    </tbody>
                </table>
                
                <div className=" currentUrl">
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
    )

}

export default Ban;