import { useState } from "react";
import ResultModal from "../components/ResultModal";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import axios, { AxiosResponse } from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

const DynamicCodeEditor = dynamic(() => import("../components/CodeEditor"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [code, setCode] = useState(`const add = (a, b) => {};`);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    setIsLoading(true);
    setShowModal(true);
    try {
      console.log("code", code);
      const response: AxiosResponse<{ isCorrect: boolean }> = await axios.post(
        `${BASE_URL}/scoring`,
        {
          code,
        }
      );
      setIsCorrect(response.data.isCorrect);
    } catch (error) {
      console.error(error);
      setIsCorrect(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <p className="mb-4">
        ※一番最初はコンテナ起動に時間かかるため、採点に少し時間がかかります（1分ほど）。
      </p>
      <p className="font-bold mb-4">
        問題：{`{ }`}内を修正し、aとbを足した数を返す関数を実装せよ
      </p>
      <DynamicCodeEditor code={code} setCode={setCode} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded"
        onClick={handleSubmit}
      >
        コードを提出
      </button>
      <img src="/architecture.png" alt="アーキテクチャ" />
      <ResultModal
        isLoading={isLoading}
        show={showModal}
        correct={isCorrect}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Home;
