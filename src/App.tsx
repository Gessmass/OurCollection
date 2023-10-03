import { ChangeEvent, FC, useEffect, useState } from "react";
import { Auth } from "../src/components/auth";
import { db, auth, storage } from "./config/firebase_config";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import styled from "@emotion/styled";
import { ref, uploadBytes } from "firebase/storage";

interface CarList {
  id: string;
  brand: string;
  color: string;
  horsepower: number;
  interior: string;
  model: string;
  year: number;
}

const CreateNewCar = styled.div`
  border: 2px solid red;
  height: 200px;
  width: 50%;
`;

const InputNewCar = styled.input`
  border: 2px solid purple;
`;

const SubmitNewCar = styled.button``;

const App: FC = () => {
  const [carList, setCarList] = useState<CarList[]>([]);
  const [newCarBrand, setNewCarBrand] = useState<string>("");
  const [newCarColor, setNewCarColor] = useState<string>("");
  const [newCarYear, setNewCarYear] = useState<number | null>(null);
  const [updatedCarYear, setUpdatedCarYear] = useState<number | null>(null);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const carCollectionRef = collection(db, "cars");

  const getCarList = async (): Promise<void> => {
    //Read the data
    //Set the car list
    try {
      const data = await getDocs(carCollectionRef);

      //filtre la réponse pour garder seulement le contenu de la database et enlever les éléments annexes de la query
      const filteredData = data.docs.map((doc) => ({
        ...(doc.data() as CarList),
        id: doc.id,
      }));

      setCarList(filteredData);

      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCarList();
  }, []);

  const onSubmitCar = async (): Promise<void> => {
    try {
      await addDoc(carCollectionRef, {
        brand: newCarBrand,
        color: newCarColor,
        year: newCarYear,
        userId: auth?.currentUser?.uid,
      });
      getCarList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCar = async (carId: string): Promise<void> => {
    try {
      const carDoc = doc(db, "cars", carId);
      await deleteDoc(carDoc);
      getCarList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCarYear = async (carId: string): Promise<void> => {
    try {
      const carDoc = doc(db, "cars", carId);
      await updateDoc(carDoc, { year: updatedCarYear });
      getCarList();
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async (): Promise<void> => {
    if (!uploadingFile) return;

    const filesFolderRef = ref(storage, `carsPics/${uploadingFile.name}`);
    try {
      await uploadBytes(filesFolderRef, uploadingFile);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (auth.currentUser) {
      setConnected(true);
    }
  }, []);

  return (
    <>
      <Auth />
      <p>{connected ? "connecté" : "déconnecté"}</p>
      <CreateNewCar>
        <InputNewCar
          placeholder="Brand"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewCarBrand(e.target.value)
          }
        />
        <InputNewCar
          placeholder="Color"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewCarColor(e.target.value)
          }
        />
        <InputNewCar
          placeholder="Year"
          type="number"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewCarYear(Number(e.target.value))
          }
        />
        <SubmitNewCar onClick={onSubmitCar}>Submit new car</SubmitNewCar>
      </CreateNewCar>
      {carList.map((car, i) => (
        <div key={i}>
          <h1>{car.brand}</h1>
          <p>{car.color}</p>
          <p>{car.year}</p>
          <button onClick={() => deleteCar(car.id)}>delete</button>
          <input
            type="number"
            placeholder="New year"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUpdatedCarYear(Number(e.target.value))
            }
          />
          <button onClick={() => updateCarYear(car.id)}>Update year</button>
        </div>
      ))}
      <div>
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              setUploadingFile(e.target.files[0]);
            }
          }}
        />

        <button onClick={uploadFile}>Upload file</button>
      </div>
    </>
  );
};

export default App;
