const express = require("express");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = 3001;
const ABI = require("./abi.json");

app.use(cors());
app.use(express.json());
const chain = EvmChain.ETHEREUM;
const address = "0xc777B228Af89471A5B2265660084D7C7451cb81d";

function convertArrayToObjects(arr) {
  const dataArray = arr.map((transaction, index) => ({
    key: (arr.length + 1 - index).toString(),
    type: transaction[0],
    amount: transaction[1],
    message: transaction[2],
    address: `${transaction[3].slice(0, 4)}...${transaction[3].slice(38)}`,
    subject: transaction[4],
  }));
  return dataArray.reverse();
}

app.get("/getNameAndBalance", async (req, res) => {
  const { userAddress } = req.query;
  const response = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0xc777B228Af89471A5B2265660084D7C7451cb81d", // contract address
    functionName: "getMyName",
    abi: ABI,
    params: { _user: userAddress },
  });

  const jsonResponseName = response.raw;
  const secResponse = await Moralis.EvmApi.balance.getNativeBalance({
    address: userAddress,
  });
  const jsonResponseBal = (secResponse.raw.balance / 1e18).toFixed(2);
  const thirdResponse = await Moralis.EvmApi.token.getTokenPrice({
    address,
    chain,
  });
  console.log("jj", thirdResponse.toJSON());
  const jsonResponseDollars = (
    thirdResponse.raw.usdPrice * jsonResponseBal
  ).toFixed(2);
  const fourthResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0xc777B228Af89471A5B2265660084D7C7451cb81d", // contract address
    functionName: "getMyHistory",
    abi: ABI,
    params: { _user: userAddress },
  });
  const jsonResponseHistory = convertArrayToObjects(fourthResponse.raw);
  const fifthResponse = await Moralis.EvmApi.utils.runContractFunction({
    chain: "0x13881",
    address: "0xc777B228Af89471A5B2265660084D7C7451cb81d", // contract address
    functionName: "getMyRequest",
    abi: ABI,
    params: { _user: userAddress },
  });
  const jsonResponseRequests = fifthResponse.raw;
  const jsonResponse = {
    name: jsonResponseName,
    balance: jsonResponseBal,
    dollars: jsonResponseDollars,
    history: jsonResponseHistory,
    requests: jsonResponseRequests,
  };
  return res.status(200).json(jsonResponse);
});

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls`);
  });
});
