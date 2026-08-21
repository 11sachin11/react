import React from 'react'
import Card from './components/Card'
const App = () => {
const jobOpenings = [
  {
    id: 1,
    brandLogo:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPfgWoFsOSeoZYqt--01x6NRuknvKpv2AApELvjX3zxQ&s=10",
    companyName: "F1Soft International",
    datePosted: "1 day",
    post: "Associate DevOps Engineer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "Rs 500/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 2,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRswT0eqtEgUaaDFho48ghyMGdvG_6ubffhE5CkNm3KkA&s=10",
    companyName: "eSewa",
    datePosted: "1 day",
    post: "Frontend Developer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "Rs 450/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 3,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzI5g-mSll4PUcb-_Dzl0CXl8eZf06HAeKK5TK6TQZqw&s=10",
    companyName: "Fusemachines",
    datePosted: "3 days",
    post: "Machine Learning Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "Rs 900/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 4,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdNecfE8RJ_bPvVazbU7TCytxAQ6WsqDPVS_ySfDG9ng&s",
    companyName: "Cotiviti Nepal",
    datePosted: "1 week",
    post: "Software Engineer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "Rs 700/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 5,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtzSZXtb5tC2l0Kf4DS__GfmGQDwnjdKbEFG9d29KELQ&s=10",
    companyName: "Leapfrog Technology",
    datePosted: "1 week",
    post: "React Developer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "Rs 550/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 6,
    brandLogo:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp9XJsX1bo8U6bWVntqETdLloEEl449OzoIorcJ4hD4w&s=10",
    companyName: "Deerwalk Services",
    datePosted: "2 weeks",
    post: "Backend Developer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "Rs 650/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 7,
    brandLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXGwOxeIhS6f_bkU3jBDPotd92Gs2qPiFK2Msu-I3ClA&s=10",
    companyName: "Khalti",
    datePosted: "2 weeks",
    post: "UI/UX Designer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "Rs 600/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 8,
    brandLogo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzBdrhmnxqu5SMyUtdjFICEs7RnAj22SlF7V0NdQ9ZMA&s=10",
    companyName: "CloudFactory Nepal",
    datePosted: "3 weeks",
    post: "Data Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "Rs 850/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 9,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8QF4vTq_yYcw9aWtBqDAHJ9d1m8DFhayDNXoGmxj-rg&s=10",
    companyName: "Innovate Tech",
    datePosted: "1 month",
    post: "QA Engineer",
    tag1: "Part Time",
    tag2: "Junior Level",
    pay: "Rs 400/hour",
    location: "Kathmandu, Nepal"
  },
  {
    id: 10,
    brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Xo6h97n6cxcKkr8YrfA7ctuz_zp6pPFZQ-OXnXExmA&s=10",
    companyName: "Eksana",
    datePosted: "1 week",
    post: "AI Software Engineer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "Rs 750/hour",
    location: "Kathmandu, Nepal"
  },
  {
  id: 11,
  brandLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwi8mpLUSpOavQHeirk7fSbfrTJUz_am4cXgqXbRuJkw&s",
  companyName: "AuraX Fit",
  datePosted: "1 day",
  post: "Frontend Developer",
  tag1: "Full Time",
  tag2: "Junior Level",
  pay: "Rs 500/hour",
  location: "Kathmandu, Nepal"
}
];

  return (
    <div className='parent'>
      {jobOpenings.map(function (elem, idx) {
        return <div key={idx}>
          <Card company={elem.companyName} datePosted={elem.datePosted} post={elem.post} tag1={elem.tag1} brandLogo={elem.brandLogo} pay={elem.pay} tag2={elem.tag2} />
        </div>
      })}
    </div>
  )
}

export default App