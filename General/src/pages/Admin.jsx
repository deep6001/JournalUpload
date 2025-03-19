import React from 'react'
import { Link } from 'react-router-dom'

function Admin() {
  return (
    <div className='space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white'>
      {/* Main Heading */}
      <div>
        <h1 className='text-3xl font-serif font-bold text-white mb-4'>
          Admin
        </h1>
        <p className='text-lg text-gray-300 leading-relaxed mb-8'>
          The Admin Panel provides a centralized location for managing the website's content and user data.
        </p>
      </div>

      {/* Admin Features */}
      
      <div>
        <h2 className='text-xl font-serif font-bold text-blue-300 mb-6'>
          Admin Features
        </h2>
        <div className='grid md:grid-cols-2 gap-6'>
          {[
            { name: 'Content Management', description: 'Create, edit, and delete articles, blog posts, and other content.' },
          ].map((feature, index) => (
            <div key={index} className='bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 shadow-lg hover:shadow-xl transition duration-300 hover:bg-white/20 hover:cursor-pointer'> 
              <h3 className='font-bold text-gray-300'>{feature.name}</h3>
              <p className='text-gray-200 text-sm'>{feature.description}</p>
              {feature.name === 'Content Management' && <Link to="/fileupload" className='mt-2 block text-blue-400 hover:text-blue-500'>Go to {feature.name}</Link>}
            </div>
          ))}
        </div>
      </div>
  
    </div>
  )
}

export default Admin
