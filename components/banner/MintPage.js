import React, { useReducer, useState, useEffect } from 'react';
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import bannerimg from "../../assets/images/landingpage/banner-img.png";
import ConnectToBlockchain from '../ConnectToBlockchain'
import WalletConnectProvider from "@walletconnect/web3-provider";


const MintPage = () => {
  const bridgeParams = {
    tokenAddress: process.env.contractAddress,
    providerOptions: {
      metamask: {
        id: 'injected',
        name: 'MetaMask',
        type: 'injected',
        check: 'isMetaMask'
      },
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          // rpc: {
          //     1: 'https://mainnet.infura.io/v3/b830c8484bf841d795848610ff791d5b'
          // },
          network: process.env.network,
          chainId: process.env.chainId,
          infuraId: process.env.infuraID, // "b830c8484bf841d795848610ff791d5b", // required
          address: process.env.contractAddress //,
          // qrcodeModalOptions: {
          //     mobileLinks: [
          //         'rainbow',
          //         'metamask',
          //         'argent',
          //         'trust',
          //         'imtoken',
          //         'pillar'
          //     ]
          // }
        }
      }
    }
  };

  let dappParams = { bridgeParams: bridgeParams, mintType: "Public" }
  let walletBridge1 = ConnectToBlockchain(dappParams);

  let currentUseState = walletBridge1.getUseStates();


  async function generalAdmissionMint(props) {

    if (mintNum > 0) {
      const returnedhash = await walletBridge1.generalAdmissionMint(props);
    }
    // setNum(0)
  }

  async function ringSideMint(props) {
    
    if (mintNum > 0) {
      const returnedhash = await walletBridge1.ringSideMint(props);
    }
    // setNum(0)
  }

  const [formInput, updateFormInput] = useState({
    price: "",
    amount: "1",
  });

  let displayData = true ? walletBridge1.getUseStates().hash : "Loading!" //(<ul>{resultData}</ul>)

  let [mintNum, setNum] = useState(1);
  let incNum = () => {
    if (mintNum < +process.env.maxMintCount) {
      console.log(mintNum)
      console.log(process.env.maxMint)
      console.log(mintNum <= +process.env.maxMint)
      setNum(Number(mintNum) + 1);
    }
  };

  let decNum = () => {
    if (mintNum > 1) {
      setNum(mintNum - 1);
    }
  }

  let handleChange = (e) => {
    if (mintNum > 1 && mintNum <= +process.env.maxMint) {
      setNum(e.target.value);
    }
  }

  let itemRows = [];

  function eventFetchedData() {
    itemRows = [];
    if (currentUseState && currentUseState.thisContractData && currentUseState.thisContractData.events) {

      console.log(currentUseState.thisContractData.events);
      for (let element of currentUseState.thisContractData.events) {
        const row = (
          <tr key={element.eventID}>
            <td key={1}>{element.title}</td>
            <td key={2}>{new Date(element.startMint * 1000).toLocaleDateString("en-US")}</td>
            <td key={3}>{new Date(element.endMint * 1000).toLocaleDateString("en-US")}</td>
            <td key={4}>            
              {element.noOfGeneralMints - element.generalMinted} Tickets Left
              <br></br>
              Mint Cost : <strong>{process.env.GeneralAdmissionEth} ETH</strong>
            </td>
            <td key={5}>
              {element.noOfRingSideMints - element.ringsideMinted} Tickets Left
              <br></br>
              Mint Cost : <strong>{process.env.RingSideEth} ETH</strong>                        
            </td>
            <td key={5}>
            {getMintControls(element.eventID, decNum, mintNum, handleChange, incNum, generalAdmissionMint, ringSideMint)}
            </td>
          </tr>
        );
        itemRows.push(row);
      }
    }
    return (<table className="table table-dark table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Sale Starts</th>
          <th>Sale Ends</th>
          <th>General Admission</th>
          <th>Ring Side</th>
          <th>Mint NFT Ticket</th>
        </tr>
      </thead>
      <tbody>
        {itemRows}
      </tbody>
    </table>)
  }

  const eventData = eventFetchedData(currentUseState.thisContractData.events)

  function getMintControls(eventID, decNum, mintNum, handleChange, incNum, mintCall, mintCall2) {
    return <>
      <label className="connected">Number to mint (1-{process.env.maxMintCount}):</label>
      <div className="">
        <div className="input-group">
          <div className="input-group-prepend">
            <button className="btn btn-outline-primary dappbtn mr-1" type="button" onClick={decNum}>-</button>
          </div>
          <div className="input-group-prepend" style={{width: "50px"}}>
            <input type="text" id="mints" name="mints" className="form-control dappbtn mr-1 " value={mintNum} min="1" max={process.env.maxMintCount} onChange={handleChange} readOnly />
          </div>
          <div className="input-group-prepend">
            <button className="btn btn-outline-primary dappbtn" type="button" onClick={incNum}>+</button>
          </div>
          <div className="input-group-prepend">
            <Link href="">
              <a className="btn btn-success btn-outline-light ml-1 mr-1" onClick={() => mintCall({ eventID : eventID, mint: mintNum })}>
                General
              </a>
            </Link>
            <Link href="">
              <a className="btn btn-info btn-outline-light" onClick={() => mintCall2({ eventID : eventID, mint: mintNum })}>
                Ring Side 
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>;
  }

  return (
    <>
      <div className="static-slider-head banner2">
        <Container>
          <Row className="" style={{ paddingTop: "120px", paddingBottom: "100px" }}>
            {(!currentUseState.isConnected) ?
              <>
                <Col lg="6" md="6" className="align-self-center">
                  {(process.env.network == "rinkeby") ? <h3 style={{ color: "#fff" }}>DEMO ONLY RINKEBY</h3> : ""}
                  <h3 className="title">
                    NFT Tickets to John Harding JR Boxing.
                  </h3>
                  <h4 className="subtitle font-light">
                    Exclusive NFT Tickets to Boxing Events.
                    <br />
                  </h4>
                  <a
                    onClick={() => walletBridge1.showWeb3Modal()}
                    className="btn btn-success m-r-20 btn-md m-t-30 " style={{ backgroundColor: "#C2C2C2" }}
                  >
                    Connect Wallet
                  </a>
                  <Link href={process.env.mainWWW}>
                    <a className="btn btn-md m-t-30  btn-outline-light " style={{ backgroundColor: "#760680" }}>
                      Back Home
                    </a>
                  </Link>
                </Col>
                <Col lg="6" md="6" >
                  <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
                    <Image src={bannerimg} alt="Monster Window" />
                  </div>
                </Col>
              </> :
              <Col lg="12" md="12" className="align-self-center">
                <>
                  {(currentUseState.isPublicMintIsOpen) ?
                    <>
                      <br />
                      <p className="connected" style={{ backgroundColor: "RGB(0,0,0,0.5)", padding: "5px" }}>                       
                        Wallet address: <strong>{currentUseState.xmPower.filteredAddress}</strong>
                        <br />
                        Eth Balance : <strong>{currentUseState.xmPower.theBalance}</strong>
                        <br />
                        Contract : <strong>{process.env.contractAddress}</strong>
                        <br />
                      </p>
                      {eventData}
                      <a
                        onClick={() => walletBridge1.disconnect()}
                        className="btn btn-md m-t-30 btn-outline-light "
                      >
                        Disconnect Wallet
                      </a>
                      <br />
                      <br />
                      {/* <h4 className="subtitle font-light">
                        NFT&apos;s minted {currentUseState.numMinted} of {process.env.maxMint}
                      </h4> */}
                      <br />
                      {currentUseState.hashHtml}
                    </>
                    :
                    <h1 className="subtitle font-light">Public mint is currently closed!</h1>
                  }
                </>
              </Col>
            }
          </Row>


        </Container>
      </div>
    </>
  );
};

export default MintPage;


