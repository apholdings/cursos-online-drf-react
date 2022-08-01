import {
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_PYTHONS_TOKEN_DATA_SUCCESS,
    LOAD_PYTHONS_TOKEN_DATA_FAIL,
    LOAD_PYTHONS_TOKEN_BALANCE_SUCCESS,
    LOAD_PYTHONS_TOKEN_BALANCE_FAIL,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOAD_NETWORK_SUCCESS,
    LOAD_NETWORK_FAIL,
    LOAD_GAS_SUCCESS,
    LOAD_GAS_FAIL
} from './types'

import axios from "axios"
import { ethers } from 'ethers';
import Web3 from "web3/dist/web3.min";

import Token from 'cache/contracts/Token.sol/Token.json'
const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

export const loadWeb3 = () => async dispatch => {
    if(window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        localStorage.setItem('account', accounts[0]);
        dispatch({
            type: LOAD_WEB3_SUCCESS,
            payload:accounts[0]
        })
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        localStorage.setItem('account', accounts[0]);
        dispatch({
            type: LOAD_WEB3_SUCCESS,
            payload:accounts[0]
        })
    } else {
        dispatch({
            type: LOAD_WEB3_FAIL,
        })
    }
}

export const get_network_id = () => async dispatch => {
    if(window.ethereum){
        const netId = await window.ethereum.request({ method: 'eth_chainId' })
        const networkID = parseInt(netId)

        dispatch({
            type: LOAD_NETWORK_SUCCESS,
            payload:networkID
        })
    }else{
        dispatch({
            type: LOAD_NETWORK_FAIL,
            payload:false
        })
    }
}

export const load_token = () => async dispatch => {
    if(window.web3){
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        if(typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner()

            const gasPrice = await provider.getGasPrice()

            const contract = new ethers.Contract(tokenAddress, Token.abi, signer)

            const tokenBalance = await contract.balanceOf(accounts[0]);

            dispatch({
                type: LOAD_PYTHONS_TOKEN_DATA_SUCCESS,
                payload:contract
            })

            dispatch({
                type: LOAD_GAS_SUCCESS,
                payload:gasPrice
            })

            if(tokenBalance){
                dispatch({
                    type: LOAD_PYTHONS_TOKEN_BALANCE_SUCCESS,
                    payload:tokenBalance.toString()
                })
            } else {
                dispatch({
                    type: LOAD_PYTHONS_TOKEN_BALANCE_FAIL
                })
            }
            
        }else{
            dispatch({
                type: LOAD_PYTHONS_TOKEN_DATA_FAIL
            })
            dispatch({
                type: LOAD_GAS_FAIL
            })
            dispatch({
                type: LOAD_PYTHONS_TOKEN_BALANCE_FAIL
            })
         }
    }
}