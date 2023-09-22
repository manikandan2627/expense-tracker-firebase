import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState(null);
    const [transactionTotals, setTransactionTotals] = useState({
        balance: 0.0,
        expense: 0.0,
        income: 0.0,
    })

    const transactionCollectionRef = collection(db, "transaction");
    const { userID } = useGetUserInfo();

    useEffect(() => {
        const qureyTransaction = query(
            transactionCollectionRef,
            where("userID", "==", userID),
            orderBy("createdAt")
        );

        const unsubscribe = onSnapshot(qureyTransaction, (snapshot) => {
            let docs = [];
            let totalIncome = 0;
            let totalExpense = 0;

            snapshot.forEach((doc) => {
                const data = doc.data();
                const id = doc.id;

                docs.push({ ...data, id });

                if (data.transactionType === "expense") {
                    totalExpense += Number(data.transactionAmount);
                } else {
                    totalIncome += Number(data.transactionAmount);
                }
            });

            setTransactions(docs);
            let balance = totalIncome - totalExpense;
            setTransactionTotals({
                balance,
                totalExpense,
                totalIncome
            })
        }, (error) => {
            setError(error);
        });

        return () => unsubscribe();


    }, []);



    return { transactions, transactionTotals, error };
}


//here going to retreview from firestore
// we need refere which collection is from
// onSnapshot keep tracking of all transaction 