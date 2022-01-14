const Picker = ({ onChange, options, value }: { onChange: Function, options : string[], value: string }) => (
  <span>
    <h1>{value}</h1>
    <select
      onChange={e => onChange(e.target.value)}
      value={value}>
      {options.map(option =>
        (<option key={option} value={option}>
          {option}
        </option>))
      }
    </select>
  </span>
)

export default Picker
