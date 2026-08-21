import { Bookmark } from 'lucide-react'
const Card = (props) => {

    console.log(props.company);
  return (
    <div className="card">
      <div className="top">
        <img className='img' src={props.brandLogo} alt="avatar" />
       <button>save <Bookmark /></button>
      </div>
      <div className="center">
      <h1>{props.company}  </h1>
      <h2>{props.datePosted}</h2>
      <h2>{props.post}</h2>
      <div>
        <h4>{props.tag1}</h4>
        <h4>{props.tag2}</h4>
      </div>
      </div>
    <div className="bottom">
          <div>  
            <h3>{props.pay}</h3>
          <p>{props.location}</p>
          </div>
          <button>Apply Now</button>
      </div>
      </div>
  )
}

export default Card