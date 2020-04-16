import { useState } from "react";

export default (defaultValue) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setValue(value);
  };

  return { value, onChange, setValue };
};

// hooks 작업 - hooks를 만들어서 auth에 추가
