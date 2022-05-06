import React, { useReducer, useState, useEffect } from 'react';
import Link from "next/link";
import { Container, Row, Col } from "reactstrap";
import Image from "next/image";
import ConnectToBlockchain from '../ConnectToBlockchain'
import WalletConnectProvider from "@walletconnect/web3-provider";

const AdminComponents = () => {
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

  let dappParams = { bridgeParams: bridgeParams }
  let walletBridge1 = ConnectToBlockchain(dappParams);

  let currentUseState = walletBridge1.getUseStates();

  async function togglePublicMint(props) {

    const returnedhash = await walletBridge1.togglePublicMint()

    //let retu = await loadup(returnedhash)
    if (process.env.debug) {
      console.log(returnedhash)
    }
  }

  async function createEvent(event) {
    
    const eventValues = {
      title: document.getElementById("title").value,
      openMintDate: document.getElementById("openMintDate").value,
      closedMintDate: document.getElementById("closedMintDate").value,
      generalMints: document.getElementById("generalMints").value,
      ringsideMints: document.getElementById("ringsideMints").value,
      generalHiddenMetadataUri: document.getElementById("generalHiddenMetadataUri").value,
      ringsideHiddenMetadataUri: document.getElementById("ringsideHiddenMetadataUri").value,
      forceState: document.getElementById("forceState").value,
      _revealed: document.getElementById("_revealed").value
    }

    await walletBridge1.createEvent(eventValues)
  }

  const [formInput, updateFormInput] = useState({
    price: "",
    amount: "1",
  });

  let displayData = true ? walletBridge1.getUseStates().hash : "Loading!" //(<ul>{resultData}</ul>)

  let newValue = process.env.mintType == "Public" ? process.env.GeneralAdmissionEth : process.env.RingSideEth;

  let [revealVal, setRevealVal] = useState("false");
  function handleOnChange(e) {
    setRevealVal(e.target.value);
  }

  async function submitRevealValue(props) {
    await walletBridge1.setRevealed({ revealed: revealVal.toString() });
  }

  return (
    <>
      <div className="static-slider-head banner2">
        <Container>
          <Row className="" >
            <Col lg="7" md="7" >
              {(currentUseState.isConnected) ?
                <div style={{ backgroundColor: "#fff", marginTop: "150px" }}>
                  <div className="form-horizontal p-5" >
                    <fieldset>

                      {/* <!-- Form Name --> */}
                      <legend>Admin Contract Page</legend>

                      {/* <!-- Button --> */}
                      <div className="form-group">
                        <div className="col-md-8">
                          <label className="" htmlFor="togglePublicMint">Public Mint :  {currentUseState.isPublicMintIsOpen.toString()}</label>
                          <button id="togglePublicMint" name="togglePublicMint" className="btn btn-primary ml-5" onClick={() => togglePublicMint()}>Toggle</button>
                        </div>
                      </div>
                      <hr></hr>
                      <legend>Create Event</legend>
                      <div className="form-group row">
                        <label htmlFor="title" className="col-4 col-form-label">Event Title</label>
                        <div className="col-8">
                          <input id="title" name="title" type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="openMintDate" className="col-4 col-form-label">Sale Start</label>
                        <div className="col-8">
                          <input id="openMintDate" name="openMintDate" type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="closedMintDate " className="col-4 col-form-label">Sale End</label>
                        <div className="col-8">
                          <input id="closedMintDate" name="closedMintDate " type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="generalMints " className="col-4 col-form-label">Maximum General Admission Tickets</label>
                        <div className="col-8">
                          <input id="generalMints" name="generalMints " type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="ringsideMints " className="col-4 col-form-label">Maximum Ringside Tickets</label>
                        <div className="col-8">
                          <input id="ringsideMints" name="ringsideMints " type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="generalHiddenMetadataUri" className="col-4 col-form-label">General Admission Placeholder URI</label>
                        <div className="col-8">
                          <input id="generalHiddenMetadataUri" name="generalHiddenMetadataUri" type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="ringsideHiddenMetadataUri" className="col-4 col-form-label">Ringside Placeholder URI</label>
                        <div className="col-8">
                          <input id="ringsideHiddenMetadataUri" name="ringsideHiddenMetadataUri" type="text" className="form-control" required="required"></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="forceState " className="col-4 col-form-label">Start Event Open or Close</label>
                        <div className="col-8">
                          <select id="forceState" name="forceState" className="custom-select" required="required">
                            <option value="true">Open</option>
                            <option value="false">Closed</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label htmlFor="_revealed " className="col-4 col-form-label">Reveal Tickets</label>
                        <div className="col-8">
                          <select id="_revealed" name="_revealed" className="custom-select" required="required">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="offset-4 col-8">
                          <button id="togglePublicMint" name="togglePublicMint" className="btn btn-primary" onClick={createEvent}>Create Event</button>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
                : <div></div>
              }
            </Col>
            {(!currentUseState.isConnected) ?
              <Col lg="12" md="12" className="align-self-center">
                {(currentUseState.network == "rinkeby") ? <h3 style={{ color: "#fff" }}>DEMO ONLY RINKEBY</h3> : ""}
                <h3 className="title">
                    {process.env.mintPageTitle}
                  </h3>
                  <h4 className="subtitle font-light">
                    {process.env.mintPageDescription}
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
              </Col> :
              <Col lg="5" md="5" className="align-self-center">
                <br />
                {/* <p>Test{currentUseState.isWaiting.toString()}</p> */}
                <p className="connected" style={{ backgroundColor: "RGB(0,0,0,0.5)", padding: "5px" }}>
                  Wallet address: <strong><Link href={process.env.blockExplorerURL + "address/" + currentUseState.xmPower.connectedWalletAddress}>{currentUseState.xmPower.filteredAddress}</Link></strong>
                  <br />
                  Balance : <strong>{(+currentUseState.xmPower.theBalance).toFixed(4)} Ether</strong>
                  <br />
                  Contract : <strong><Link href={process.env.blockExplorerURL + "token/" + process.env.contractAddress}>{process.env.contractAddress}</Link></strong>
                  <br />
                </p>
                <a
                  onClick={() => walletBridge1.disconnect()}
                  className="btn btn-md m-t-30 btn-outline-light "
                >
                  Disconnect Wallet
                </a>
                <br />
                <br />
                <h4 className="subtitle font-light">
                  NFT&apos;s minted {currentUseState.numMinted}
                </h4>
                <br />
                {currentUseState.hashHtml}
              </Col>
            }
          </Row>

        </Container>
      </div>
    </>
  );
};

export default AdminComponents;
