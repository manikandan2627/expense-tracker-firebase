import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'
import { useAddTransaction } from '../../hooks/useAddTransaction'
import { useGetTransaction } from '../../hooks/useGetTransaction';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';

export const ExpenseTracker = () => {

  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, totalExpense, totalIncome } = transactionTotals
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
    alert("Sucessfull");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth)
      localStorage.clear();
      navigate("/")
    } catch (error) {

    }
  }

  return (
    <>
      <Container>
        <ExpenseTrackerWrapper>
          {profilePhoto && <img src={profilePhoto} alt="profile-picture" />}
          <h2>{name}</h2>
          <button onClick={signUserOut}>Sign Out</button>
        </ExpenseTrackerWrapper>
        <h1>Expense Tracker</h1>
        <Balance balance={balance}>
          <h3>Your Balance</h3>
          <p>{balance >= 0 ? `${balance}₹` : `-${(balance * -1)}₹`}</p>
        </Balance>
        <Summary>
          <div>
            <h4>Income</h4>
            <p className='Income-className'>{totalIncome}₹</p>
          </div>
          <div>
            <h4>Expenses</h4>
            <p className='Expense-className'>{totalExpense}₹</p>
          </div>
        </Summary>
        <AddTransactionForm onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Description"
            value={description}
            required
            className='inputFeild'
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={transactionAmount}
            required
            className='inputFeild'
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <Options>
            <label htmlFor="expense">
              <input
                type="radio"
                id="expense"
                value="expense"
                checked={transactionType === 'expense'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Expense
            </label>
            <label htmlFor="income">
              <input
                type="radio"
                id="income"
                value="income"
                checked={transactionType === 'income'}
                onChange={(e) => setTransactionType(e.target.value)}
              />
              Income
            </label>
          </Options>
          <button type="submit">Add Transaction</button>
        </AddTransactionForm>
        <TransactionsList>
          <h3>Transactions</h3>
          <ul>
            {transactions.map((transaction) => (
              <li>
                <div>
                  <span>{transaction.description}</span>
                  <span>{transaction.transactionAmount}₹</span>
                  <span style={{ color: transaction.transactionType === 'expense' ? 'red' : 'green' }}>
                    {transaction.transactionType}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </TransactionsList>
      </Container>
    </>
  )
}
const Container = styled.div`
height: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
    border: 4px solid #000;
  border-radius: 6px;-webkit-box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);
box-shadow: 11px 11px 0px -3px rgba(0,0,0,0.75);

`;

const ExpenseTrackerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 100% !important;
    margin-right: 10px;
       border: 2px solid #000;
  border-radius: 6px;-webkit-box-shadow: 5px 5px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 5px 5px 0px -3px rgba(0,0,0,0.75);
box-shadow: 5px 5px 0px -3px rgba(0,0,0,0.75);
  }

  h2 {
    font-size: 1.2rem;
    margin: 0;
  }

  button {
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const Balance = styled.div`
  text-align: center;
  padding: 10px;
  background-color: white;
  color: black;
  border: 4px solid #000;
  border-radius: 6px;-webkit-box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 8px 11px 0px -3px rgba(0,0,0,0.75);
box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
  h3 {
    font-size: 1rem;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    margin: 0;
  }
`;

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  background-color: white;
  color: black;
  border: 4px solid #000;
  padding: 10px;
  border-radius: 6px;-webkit-box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 8px 11px 0px -3px rgba(0,0,0,0.75);
box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
  div {
    flex: 1;
    text-align: center;
    padding: 10px;
    border-radius: 4px;

    h4 {
      font-size: 1rem;
      margin: 0;
    }

    p {
      font-size: 1.2rem;
      margin: 0;
    }
  }
`;

const AddTransactionForm = styled.form`
margin: 20px 0;
.inputFeild{
      background-color: white;
  color: black;
  border: 4px solid #000;
  border-radius: 6px;-webkit-box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 8px 11px 0px -3px rgba(0,0,0,0.75);
box-shadow: 8px 8px 0px -3px rgba(0,0,0,0.75);
}
  input {
    width: 93%;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    font-size: 1rem;

  }

  label {
    display: flex   ;
    margin-bottom: 10px;
  }

  button {
    background-color: #2ecc71;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
`;

const Options = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-top: 20px;
`

const TransactionsList = styled.div`
  margin-top: 20px;
  h3 {
    font-size: 1.2rem;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
    border: 2px dashed #ddd;
      padding: 10px;
      margin: 10px 0;
      border-radius: 4px;

      h4 {
        font-size: 1rem;
        margin: 0;
      }

      div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          font-size: 1.2rem;
        }

        span.color-red {
          color: red;
        }

        span.color-green {
          color: green;
        }
      }
    }
  }
`;
