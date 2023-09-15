import { PointRecord, Stock } from '.';

interface User {
  id: string;
  password: string;
}

interface UserDetail extends User {
  id: string;
  password2: string;
  name: string;
  phonenumber: string;
}
export type UserKeyType = keyof UserDetail;

interface TotalCapital {
  userName: string;
  point: number;
  stockMoney: number;
  depositMoney: number;
  fundingMoney: number;
  solvingRate: string;
  pointRecord: PointRecord[];
  stockList: Stock[];
}

interface PointRecord {
  useType: '주식' | '예금';
  pointChange: number;
}

export type { User, UserDetail, TotalCapital, PointRecord };