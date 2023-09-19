interface Funding {
  itemNo: string;
  itemName: string;
  imagePath: string;
  itemUnitPrice: number;
  itemCount: number;
  fundingAmount: number;
}

interface FundingProgress {
  totalFundingPrice: number;
  fundingPrice: number;
}

interface FundingRecord {
  userName: string;
  itemName: string;
  price: number;
}

export type { Funding, FundingProgress, FundingRecord };
