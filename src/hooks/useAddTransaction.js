import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from "./useGetUserInfo";


export const useAddTransaction = () => {
    // Getting userInfo because we store those as localStorage
    
    const { userID } = useGetUserInfo();
    const transactionCollectionRef = collection(db, "transaction");

    const addTransaction = async ({
        description,
        transactionAmount,
        transactionType
    }) => {

        await addDoc(transactionCollectionRef, {
            userID,
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp()
        });
    }
    return { addTransaction };
}



//step 1:here we going to add values to database (Documentation) and retuen them as object
//step 2: then we need to specify the which collection those documentation need to store (by getFirestore @ config)
//step 3: we goin to mention the object which are going to send to db
// serverTimestamp to get current time / createdTime service of firestore