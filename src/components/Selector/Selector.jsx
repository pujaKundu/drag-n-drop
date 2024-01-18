import "./Selector.css";

const Selector = ({ setSelectedOption }) => {
  const handleSelectOption = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      <select name="" id="" className="selector" onChange={handleSelectOption}>
        <option value="top">Top</option>
        <option value="bottom">Bottom</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>
    </>
  );
};

export default Selector;
