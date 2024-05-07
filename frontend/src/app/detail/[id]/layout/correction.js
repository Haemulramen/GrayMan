export default function Correction({correction }) {
  return (
    <div>
      <ul>
        {correction.map((item,index)=>(
          <li key={index}>{item}</li>
          ))}
      </ul>
    </div>
  );
}
