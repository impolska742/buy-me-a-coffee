import { ethers } from "ethers";
import React from "react";
import abi from "../utils/BuyMeACoffee.json";
import { Id, toast } from "react-toastify";

// Contract Address & ABI
export const contractAddress = "0x8BD5D5ea01ef286c2B31797e70d8b516F053aEc9";
export const contractABI = abi;

const buyCoffee = async (
  name: string,
  message: string,
  ethAmount: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const { ethereum }: any = window;

  const id = toast("Buying Coffee ...", {
    autoClose: false,
  });

  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    try {
      const buyMeACoffee = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const coffeeTxn = await buyMeACoffee.buyCoffee(name, message, {
        value: ethers.utils.parseEther(ethAmount),
      });

      await coffeeTxn.wait();

      toast.update(id, {
        render: "Coffee bought successfully",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        closeButton: null,
      });

      console.log("mined ", coffeeTxn.hash);
      console.log("coffee purchased!");

      // Clear the form fields.
      setName("");
      setMessage("");
    } catch (err) {
      toast.update(id, {
        render: "Error in purchasing coffee",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        closeButton: null,
      });

      console.log(err);
    }
  }
};

export { buyCoffee };
