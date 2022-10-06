const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
}
const Select = () => {

    return (
        <select onChange={changeHandler}>
            <option>
               1 Dzień
            </option>
            <option>
                7 Dni
            </option>
            <option>
                1 Miesiąc
            </option>
        </select>
    );
};

enum Option{
    day=0,
    week=1,
    month=2,
}

export default Select;