import React, { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import {
  accountEnums,
  accountTableAtom,
  AccountTableRow,
  moneyFlowEnums,
  ACCOUNT_CATEGORY,
  MONEY_FLOW,
} from 'recoil/diaryAtom';
import { getCurrentDate } from 'utilities/getCurrentDate';

const ACCOUNT_STATE = Object.values(accountEnums);

const MONEY_STATE = Object.values(moneyFlowEnums);

const initialAccountInfo: AccountTableRow = {
  id: getCurrentDate(),
  moneyFlow: moneyFlowEnums.EXPENSE,
  category: accountEnums.FOOD,
  amount: 0,
  memo: '',
};

function AccountBook() {
  const [todayAccountInfo, setTodatAccountInfo] = useState<AccountTableRow>(initialAccountInfo);
  const [accountTable, setAccountTable] = useRecoilState<AccountTableRow[]>(accountTableAtom);

  const todayAccountInfoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodatAccountInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const appendAccountInfoHandler = () => {
    setAccountTable((prev) => [...prev, { ...todayAccountInfo, id: getCurrentDate() }]);
    setTodatAccountInfo(initialAccountInfo);
  };

  const deleteTableInfoHandler = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>, id: string) => {
      setAccountTable((cur) => [...cur].filter((row) => row.id !== id));
    },
    [setAccountTable]
  );

  const moneyFlowOptions = useMemo(
    () =>
      MONEY_STATE.map((type) => (
        <option key={uuid()} value={type}>
          {MONEY_FLOW[type]}
        </option>
      )),
    []
  );

  const categoryOptions = useMemo(
    () =>
      ACCOUNT_STATE.map((category) => (
        <option key={uuid()} value={category}>
          {ACCOUNT_CATEGORY[category]}
        </option>
      )),
    []
  );

  const tableInfo = useMemo(
    () =>
      accountTable.map(({ id, moneyFlow, category, amount, memo }) => (
        <tr key={uuid()}>
          <th>{moneyFlow}</th>
          <th>{category}</th>
          <th>{amount}</th>
          <th>{memo}</th>
          <th>
            <button type="button" onClick={(e) => deleteTableInfoHandler(e, id)}>
              삭제하기
            </button>
          </th>
        </tr>
      )),
    [accountTable, deleteTableInfoHandler]
  );

  return (
    <div>
      <div>
        <p>오늘 수입/지출을 알려주세요</p>
        <div onChange={todayAccountInfoChangeHandler}>
          <select name="moneyFlow" defaultValue={todayAccountInfo.moneyFlow}>
            {moneyFlowOptions}
          </select>
          <select name="category" defaultValue={todayAccountInfo.category}>
            {categoryOptions}
          </select>
          <div>
            <input
              type="number"
              min={0}
              placeholder="금액을 입력해주세요"
              name="amount"
              defaultValue={todayAccountInfo.amount}
            />
            <label htmlFor="memo">원</label>
          </div>
          <input
            id="memo"
            type="text"
            placeholder="메모를 입력해주세요"
            name="memo"
            defaultValue={todayAccountInfo.memo}
          />
          <button type="button" onClick={appendAccountInfoHandler}>
            추가하기
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>분류</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>메모</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{tableInfo}</tbody>
      </table>
    </div>
  );
}

export default AccountBook;
