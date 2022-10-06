const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
}


const days = [1, 7, 30];


const Select = () => {

    return (
        <select onChange={changeHandler}>
        {days.map(d => (
          <option value={d}>
            {d} Dni
          </option>
        ))}
        </select>
    );
};


export default Select;