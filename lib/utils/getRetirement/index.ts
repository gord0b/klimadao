import { ethers, providers, BigNumber } from "ethers";
import { getJsonRpcProvider } from "../getJsonRpcProvider";
import KlimaRetirementStorage from "../../abi/KlimaRetirementStorage.json";
import { addresses } from "../../constants";
import {
  getTypeofTokenByAddress,
  formatUnits,
  getTokenDecimals,
} from "../../utils";

import {
  RetirementTotals,
  RetirementsTotalsAndBalances,
  RetirementIndexInfo,
  RetirementIndexInfoResult,
} from "../../types/offset";

export const createRetirementStorageContract = (
  provider: providers.JsonRpcProvider
) => {
  return new ethers.Contract(
    addresses["mainnet"].retirementStorage,
    KlimaRetirementStorage.abi,
    provider
  );
};

export const getRetirementTotalsAndBalances = async (params: {
  address: string;
}): Promise<RetirementsTotalsAndBalances> => {
  try {
    const provider = getJsonRpcProvider();
    const retirementStorageContract = createRetirementStorageContract(provider);

    const [
      totalRetirements,
      totalTonnesRetired,
      totalTonnesClaimedForNFTS,
    ]: RetirementTotals = await retirementStorageContract.getRetirementTotals(
      params.address
    );
    const bct = await retirementStorageContract.getRetirementPoolInfo(
      params.address,
      addresses["mainnet"].bct
    );
    const mco2 = await retirementStorageContract.getRetirementPoolInfo(
      params.address,
      addresses["mainnet"].mco2
    );
    const nct = await retirementStorageContract.getRetirementPoolInfo(
      params.address,
      addresses["mainnet"].nct
    );
    const ubo = await retirementStorageContract.getRetirementPoolInfo(
      params.address,
      addresses["mainnet"].ubo
    );
    const nbo = await retirementStorageContract.getRetirementPoolInfo(
      params.address,
      addresses["mainnet"].nbo
    );

    return {
      totalRetirements: totalRetirements.toString(),
      totalTonnesRetired: formatUnits(totalTonnesRetired, 18),
      totalTonnesClaimedForNFTS: formatUnits(totalTonnesClaimedForNFTS, 18),
      bct: formatUnits(bct, 18),
      mco2: formatUnits(mco2, 18),
      nct: formatUnits(nct, 18),
      ubo: formatUnits(ubo, 18),
      nbo: formatUnits(nbo, 18),
    };
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getRetirementIndexInfo = async (
  beneficiaryAdress: string,
  index: number
): Promise<RetirementIndexInfoResult> => {
  try {
    const provider = getJsonRpcProvider();
    const storageContract = createRetirementStorageContract(provider);

    const [
      tokenAddress,
      amount,
      beneficiaryName,
      retirementMessage,
    ]: RetirementIndexInfo = await storageContract.getRetirementIndexInfo(
      beneficiaryAdress,
      BigNumber.from(index)
    );

    const typeOfToken = getTypeofTokenByAddress(tokenAddress);
    const tokenDecimals = getTokenDecimals(typeOfToken);
    const formattedAmount = formatUnits(amount, tokenDecimals);

    return {
      tokenAddress,
      typeOfToken,
      amount: formattedAmount,
      beneficiaryName,
      retirementMessage,
    };
  } catch (e) {
    console.error("getRetirementIndexInfo Error", e);
    return Promise.reject(e);
  }
};
