function Select(props) {
  return (
    <select
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      className="text-center text-sm border rounded-md border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:shadow-md"
    />
  );
}
export default Select;
