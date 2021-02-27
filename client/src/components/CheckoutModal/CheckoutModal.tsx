import * as React from 'react';
import {useState,useEffect} from 'react'
import * as numeral from 'numeral';
import * as Modal from 'react-modal';
import { ICartProduct } from '@typings/state/index';
import { ModalProps } from '@typings/modal';
import Button from '@material-ui/core/Button';
import '@styles/CheckoutModal.css';
import StripeCheckout from 'react-stripe-checkout'
import {ToastContainer,toast} from 'react-toastify'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import CancelIcon from '@material-ui/icons/Cancel';





interface TokenProp {
  card:{
    address_city: string|null,
  ​​  address_country: string|null,
    ​address_line1: string|null,
    ​​address_line1_check: string|null,
    ​​​address_line2: string|null,
    ​​​address_state: string|null,
    ​​address_zip: string|null,
    ​​​address_zip_check: string|null,
    ​​​brand: string|null,
    ​​​country: string|null,
    ​​​cvc_check: string|null,
    ​​​dynamic_last4: string|null,
    ​​​exp_month: number,
    ​​​exp_year: number,
    ​​​funding: string,
    ​​​id: string,
    ​​​last4: string,
    ​​​name: string,
    ​​​object: string,
    ​​tokenization_method: string|null
  },
  client_ip: string,
​​  created: number,
​​  email: string,
​​  id: string,
​​  livemode: boolean,
​​  object: string,
​​  type: string,
  ​​used: boolean,
}

const CheckoutModal: React.FC<ModalProps> = ({ cart, isOpen, setActiveModal, makeOrder }): JSX.Element => { 
  
  const [total,setTotal] = useState(0)
  
  useEffect(() => {
      setTotal(cart!.reduce((acc, item) => acc += item.product.info.price * item.quantity!, 0))
  },[cart])
  
  let handleToken = async (tokenParam:TokenProp) => {
    const response = await axios.post('/api/stripe',{
      tokenParam,total
    })
    const {status} = response.data

    if(status === 'success'){
       makeOrder ?  await makeOrder() : null
     
    }else{
      toast('Something went wrong',
      { type: 'error'})
    }
   
  }
 

  return (
  <Modal
    className="checkout-modal"
    isOpen={isOpen}
    onRequestClose={() => setActiveModal(null)}
  >
    <div className="order">
      <h1>Checkout Information</h1>
      <p>
        <i>Please read the list of items in your order and click "Confirm" to confirm your order.</i>
      </p>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart!.length && cart!.map((item: ICartProduct) => {
            return (
              <tr key={item.product.info.name} >
                <td>{item.product.info.name}</td>
                <td>{numeral(item.product.info.price).format('$0,0.00')}</td>
                <td>{item.quantity}</td>
                <td>{numeral(item.product.info.price * item.quantity!).format('$0,0.00')}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="total">
        <b>TOTAL AMOUNT: </b>
        <span>{numeral(cart!.length && cart!.reduce((acc, item) => acc += item.product.info.price * item.quantity!, 0)).format('$0,0.00')}</span>
      </p>
  
      
      <div className="btns">
        <Button
          className="btn checkout-modal-cancel"
          onClick={() => setActiveModal(null)}>
          <CancelIcon></CancelIcon>
        </Button>
   
        <div className="subtotal">
                {
                  cart!.length ?
                  <StripeCheckout
                  stripeKey = "pk_test_51HNzRfKAeHmF2eD8bwbZmHb0zyztLKg5nF4y18Xcl5TmjqeGC8OHELLeZkzFfapygmVZRSTapMv6ylqbqE6sQG9M002UoW5Cx0"
                  token= {handleToken}
                  billingAddress
                  shippingAddress
                  amount={cart!.reduce((acc, item) => acc += item.product.info.price * item.quantity!, 0)*100}
                ></StripeCheckout>
                :
                <div></div> 
              }
              <ToastContainer />
         </div>     
      </div>
    </div>
    
  </Modal>
)
}

export default CheckoutModal;
