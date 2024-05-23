/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import "./index.css";
import Button from "./components/Button";
import Input from "./components/Input";
import { useEffect, useState } from "react";
import * as math from "mathjs";

const App = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  // useEffect 훅을 사용하여 컴포넌트가 마운트될 때 키보드 이벤트를 감지할 수 있도록 설정합니다.
  useEffect(() => {
    // 컴포넌트가 마운트될 때, 키보드 이벤트 리스너를 추가합니다.
    document.addEventListener("keydown", handleKeyDown);

    // 컴포넌트가 언마운트될 때, 키보드 이벤트 리스너를 제거합니다.
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // useEffect가 처음 한 번만 실행되도록 빈 배열을 전달합니다.

  const handleKeyDown = (event) => {
    const key = event.key;

    // 숫자와 연산자 키만 처리합니다.
    if (/^[0-9+\-*\/.=]$/.test(key)) {
      event.preventDefault(); // 기본 동작 방지 (브라우저 리로드 등)
      addToText(key);
    } else if (key === "Enter") {
      event.preventDefault();
      // Enter 키가 눌렸을 때 "=" 기호를 추가하거나 결과를 계산합니다.
      addToText("=");
      calculateResult();
    } else if (key === "Escape") {
      event.preventDefault(); // ESC 키의 기본 동작 방지 (페이지 새로고침 등)
      resetInput();
    } else if (key === "Backspace") {
      event.preventDefault(); // 백스페이스 키의 기본 동작 방지
      // 텍스트가 비어있지 않은 경우에만 마지막 문자를 삭제합니다.
      if (text.length > 0) {
        const newText = text.slice(0, -1);
        setText(newText);
        // 백스페이스 키를 눌렀을 때는 결과를 다시 계산합니다.
        if (newText.length > 0) {
          calculateResult();
        } else {
          setResult("");
        }
      }
    }
  };

  const addToText = (val) => {
    // 입력된 텍스트에서 마지막 문자를 가져옵니다.
    const lastChar = text[text.length - 1];

    // 마지막 문자가 연산자인지 확인하고, 새로 입력된 문자가 연산자인 경우를 확인합니다.
    // 만약 둘 다 연산자라면 추가하지 않고 함수를 종료합니다.
    if (
      ["+", "-", "*", "/"].includes(lastChar) &&
      ["+", "-", "*", "/"].includes(val)
    ) {
      return;
    }

    // 위의 조건이 걸리지 않는 경우, 새로 입력된 문자를 텍스트에 추가합니다.
    setText((text) => [...text, val]);
  };

  const resetInput = () => {
    setText("");
    setResult("");
  };

  const calculateResult = () => {
    // 계산 결과를 표시하기 전에 입력된 수식을 하나의 문자열로 합칩니다.
    const input = text.join("");

    // JavaScript의 예외 처리 기능을 사용하여 오류가 발생할 가능성이 있는 코드를 시도합니다.
    try {
      // 문자열로 된 수식을 계산하여 결과를 반환하고, 그 결과를 문자열로 변환합니다.
      let calculatedResult = math.evaluate(input).toString();

      // 계산된 결과의 길이가 10자를 초과하는지 확인합니다.
      if (calculatedResult.length > 10) {
        // 계산된 결과가 10자 이상인 경우, 처음 14자까지만 자른 후에 '...'을 추가하여 결과를 대체합니다.
        calculatedResult = calculatedResult.substring(0, 14) + "...";
      }

      // 계산된 결과를 화면에 표시하기 위해 결과 상태를 업데이트합니다.
      setResult(calculatedResult);
    } catch (error) {
      // 오류가 발생한 경우 "Error" 문자열을 결과로 설정하여 사용자에게 오류 메시지를 표시합니다.
      setResult("Error");
    }
  };

  const buttonColor = "orange";

  return (
    <div className="App">
      <div className="calc-wrapper">
        <Input text={text} result={result} />
        <div className="row">
          <Button symbol="7" handleClick={addToText} />
          <Button symbol="8" handleClick={addToText} />
          <Button symbol="9" handleClick={addToText} />
          <Button symbol="/" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="4" handleClick={addToText} />
          <Button symbol="5" handleClick={addToText} />
          <Button symbol="6" handleClick={addToText} />
          <Button symbol="*" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="1" handleClick={addToText} />
          <Button symbol="2" handleClick={addToText} />
          <Button symbol="3" handleClick={addToText} />
          <Button symbol="+" color={buttonColor} handleClick={addToText} />
        </div>
        <div className="row">
          <Button symbol="." handleClick={addToText} />
          <Button symbol="0" handleClick={addToText} />
          <Button symbol="=" handleClick={calculateResult} />
          <Button symbol="-" color={buttonColor} handleClick={addToText} />
        </div>
        <Button symbol="AC " color="red" handleClick={resetInput} />
      </div>
    </div>
  );
};

export default App;
