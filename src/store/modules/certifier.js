
import * as constants from '@/store/constants'
import CertifierContract from '@/contracts/Certifier.json'
const state = {
  provider: !!(window.web3 && window.web3.currentProvider),
  isOwner: false,
  name: null,
  contract: null,
  coinbase: null,
  course: null
}

const actions = {
  [constants.CERTIFIER_INIT]: ({commit}) => {
    const abi = CertifierContract.abi
    const contractAddress = '0x7bade04801d29b1ddcfce10a615b942f8c5e47f7'
    const instance = web3.eth.contract(abi).at(contractAddress)
    commit(constants.CERTIFIER_SET_INSTANCE, instance)
    web3.eth.getCoinbase((error, coinbase) => {
      if(error) console.error(error)
      commit(constants.CERTIFIER_SET_COINBASE, coinbase)
      instance.isOwner({from: coinbase}, (error, isOwner) => {
        if(error) console.error(error)
        commit(constants.CERTIFIER_SET_IS_OWNER, isOwner)
      })
      instance.getName({from:coinbase},(error,name)=>{
        if(error) console.error(error)
        commit(constants.CERTIFIER_SET_NAME,name)
      })
    })
  },
  [constants.CERTIFIER_SET_NAME_BY_OWNER]: ({commit, state}, data) => {
    const abi = CertifierContract.abi
    const contractAddress = '0x7bade04801d29b1ddcfce10a615b942f8c5e47f7'
    const instance = web3.eth.contract(abi).at(contractAddress)
    instance.setName(data, {from:state.coinbase},(error,tx)=>{
        if(error) console.error(error)
        console.log(tx);
    })
  },
  [constants.CERTIFIER_ADD_COURSE_BY_OWNER]: ({commit, state}, data) =>{
    const abi = CertifierContract.abi
    const contractAddress = '0x7bade04801d29b1ddcfce10a615b942f8c5e47f7'
    const instance = web3.eth.contract(abi).at(contractAddress)
    instance.setSuscribe(data, {from:state.coinbase}, (error,tx)=>{
      if(error) console.error(error)
      console.log(tx);
    })

  }

}
//
const mutations = {
  [constants.CERTIFIER_SET_INSTANCE]: (state, instance) => {
    state.contract = instance
  },
  [constants.CERTIFIER_SET_COINBASE]: (state, coinbase) => {
    state.coinbase = coinbase
  },
  [constants.CERTIFIER_SET_IS_OWNER]: (state, isOwner) => {
    state.isOwner = isOwner
  },
  [constants.CERTIFIER_SET_NAME]:(state,name)=>{
    state.name= name
  },
  [constants.CERTIFIER_ADD_COURSE_BY_OWNER]:(state,course) =>{
    state.course= course
  }

}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
