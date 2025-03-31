"use client";
import React, { useEffect, useRef, useState } from "react";
import CodeEditor from "./CodeEditor";
import CodeEditorHeader from "./CodeEditorHeader";
import Testcase from "../testcase/Testcase";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { optionsType } from "@/app/problems/[problemName]/ProblemHeader";

export type defaultTestCaseType = {
  testCase1: string;
  testCase2: string;
  testCase3: string;
};

export type defaultCodeType = {
  cppCode: string;
  tsCode: string;
  jsCode: string;
};

export type languageType = {
  name: string;
  code: number;
  defaultCode: string;
  submitCode: string;
};
// const outputType:
export type outputType = {
  status?: string;
  error?: boolean;
  errorMessage?: string;
  time?: string;
  memory?: string;
  stdout?: string;
  testCaseResult?: [boolean, boolean, boolean];
  compile_output?: string;
  submissionType: "run" | "submit";
};

const Editor = ({
  defaultTestCase,
  defaultCode,
  options,
  setOptions,
}: {
  defaultTestCase: defaultTestCaseType;
  defaultCode: defaultCodeType;
  options: optionsType;
  setOptions: React.Dispatch<React.SetStateAction<optionsType>>;
}) => {
  const languages: languageType[] = [
    {
      name: "Cpp",
      code: 54,
      defaultCode: defaultCode.cppCode,
      submitCode: "cpp",
    },
    {
      name: "Js",
      code: 63,
      defaultCode: defaultCode.jsCode,
      submitCode: "js",
    },
    {
      name: "Ts",
      code: 74,
      defaultCode: defaultCode.tsCode,
      submitCode: "ts",
    },
  ];

  const editorRef = useRef<HTMLInputElement | null>(null);
  const [langName, setLangName] = useState<languageType>(languages[0]);
  const [userCode, setUserCode] = useState<string>(languages[0].defaultCode);
  const [userCodeOutput, setUserCodeOutput] = useState<outputType | null>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, [langName]);

  return (
    <div className="dark:bg-[rgba(13,17,23)] bg:white w-full h-[calc(100vh-60px)] p-[0.5px] rounded-sm">
      <ResizablePanelGroup direction="vertical" className="h-full rounded-lg">
        <ResizablePanel defaultSize={50}>
          <div className="bg-black rounded-sm flex flex-col h-full">
            <CodeEditorHeader
              langName={langName}
              setLangName={setLangName}
              languages={languages}
              setUserCode={setUserCode}
              userCode={userCode}
              setUserCodeOutput={setUserCodeOutput}
              options={options}
              setOptions={setOptions}
            />
            <CodeEditor
              langName={langName}
              editorRef={editorRef}
              userCode={userCode}
              setUserCode={setUserCode}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle className="h-1 bg-gray-600 my-1" />
        <ResizablePanel defaultSize={50}>
          <div className="bg:white overflow-y-auto h-full">
            <Testcase
              defaultTestCase={defaultTestCase}
              userCodeOutput={userCodeOutput}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Editor;
