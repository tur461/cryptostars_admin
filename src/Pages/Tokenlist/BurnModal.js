import './Tokenlist.scss'
import { Link } from 'react-router-dom'
import closeBtn from '../../assets/images/ionic-md-close.svg'
import { eHandle } from '../../services/utils'
import { useState } from 'react'
import Card from "../../Components/Card/Card";

const BurnModal = ({ closeModalCallback, doBurnCallback, getBalance, addr}) => {
    const [burnValue, setBurnValue] = useState('');
    return (
        <>
            <div className="backdrop"></div>
            <Card className="burn-token_modal">
                <div className=" modal_headerStyle__rowA_colRight">
                    <Link to="#" onClick={e => eHandle(e) && closeModalCallback()}>
                        <img src={closeBtn} alt="icon" />
                    </Link>
                </div>
                <div className='burn-modal--body'>
                    <div>
                        Balance:
                        <span>{getBalance()}</span>
                    </div>
                    <div>
                        Amount:
                        <input 
                            onChange={e => {
                                eHandle(e);
                                const val = e.target.value;
                                setBurnValue(val);
                            }} 
                            value={burnValue}
                        />
                    </div>
                    <div>
                        <button onClick={e => eHandle(e) && doBurnCallback(burnValue, addr)}>DO BURN</button>
                    </div>
                </div>
            </Card>
        </>
    )

}

export default BurnModal;