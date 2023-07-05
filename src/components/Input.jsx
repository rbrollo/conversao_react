function Input(props) {
  return (
    <input
      onChange={props.onChange}
      type={props.type}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
    />
  );
}
export default Input;
