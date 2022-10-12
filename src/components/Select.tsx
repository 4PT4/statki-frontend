import moment from 'moment';

const options =[
  {text: "1 dzień", days: 1},
  {text: "7 dni", days: 7},
  {text: "30 dni", days: 30}
]


const Select = (props:any) => {

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    props.setLastSeen(e.target.value);
  }

  const convertDate = (days:any) => {
    let timestamp = moment().subtract(days, 'days').toDate().getTime();
    console.log(new Date(timestamp));
    return timestamp;
  }

  return (
    <select onChange={changeHandler}>
      {options.map(o => (
        <option value={convertDate(o.days)}>
          {o.text}
        </option>
      ))}
    </select>
  );
};


export default Select;