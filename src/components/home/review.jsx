import { Star } from 'lucide-react'
import React from 'react'

export default function Review() {

    const reviewsData = [
        {name: "Eleanor Collins", comment:"Highly impressed!", rating: 1},
        {name: "Lucas Gordon", comment:"Highly impressed!", rating: 3},
        {name: "Liam Smith", comment:"Highly impressed!", rating: 5},
        {name: "Clara Berry", comment:"Highly impressed!", rating: 4},
    ]



  return (<section className='review'>

    <h1 className='review-title'>reviews clients</h1>
    <p className='review-description'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut dolor reiciendis, a unde maxime consectetur doloremque quas nobis asperiores alias, sed inventore! Distinctio amet quos modi quae sapiente doloribus alias consectetur sed! Eum dicta cum nisi mollitia consectetur, saepe suscipit.</p>

    <div className='review-cards'>
        {
            reviewsData.map((rd, index)=>{return <div key={index} className="review-card">
                <p className='review-card-rating'> 
                    {
                        rd.rating == 1 ? <>
                            <Star className='star-icon' />
                        </> 
                        : rd.rating == 2 ? <>
                            <Star className='star-icon' /><Star className='star-icon' />
                        </>
                        : rd.rating == 3 ? <>
                            <Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' />
                        </>
                        : rd.rating == 4 ? <>
                            <Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' />
                        </>
                        :<>
                            <Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' /><Star className='star-icon' />
                        </>
                        
                    }    
                </p>
                <p className='review-card-comment'> {rd.comment} </p>
                <p className='review-card-name'> {rd.name} </p>
            </div>})
        }
    </div>




  </section>
  )
}
