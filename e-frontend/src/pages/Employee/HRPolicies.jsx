import React, { useEffect, useState } from 'react'

const tabs = [
  'Code of Conduct',
  'Dress Code',
  'Leave Policies',
  'Benefits'
]
const content = [
  {
    'Code of Conduct':"An employee code of conduct is a set of principles characterizes how an organization's workers should follow up on an everyday premise. It mirrors the association's day by day tasks, beliefs and organization culture. Thus, every set of accepted rules is one of a kind to the association it speaks to."
  },
  {
    'Dress Code':"An Code code of conduct is a set of principles characterizes how an organization's workers should follow up on an everyday premise. It mirrors the association's day by day tasks, beliefs and organization culture. Thus, every set of accepted rules is one of a kind to the association it speaks to."
  },
  {
    'Leave Policies':"An Policies code of conduct is a set of principles characterizes how an organization's workers should follow up on an everyday premise. It mirrors the association's day by day tasks, beliefs and organization culture. Thus, every set of accepted rules is one of a kind to the association it speaks to."
  },
  {
    'Benefits':"An Benefits code of conduct is a set of principles characterizes how an organization's workers should follow up on an everyday premise. It mirrors the association's day by day tasks, beliefs and organization culture. Thus, every set of accepted rules is one of a kind to the association it speaks to."
  },
]


function HRPolicies() {
  const [switchTab, setSwitchTab] = useState('Code of Conduct')
  const [showContent,setShowContent] = useState(content[0]['Code of Conduct'])

  useEffect(() => {
  const matched = content.find((item) => item[switchTab]);
  if (matched) {
    setShowContent(matched[switchTab]);
  }
}, [switchTab]);

  return (
    <div className='mt-10'>
      <div className='flex flex-col lg:w-[90%] md:h-12 h-22  justify-between font-semibold text-xl'>
        <div className='flex justify-between lg:w-[80%]'>
        {
          tabs.map((tab, index) => (
            <h1 onClick={() => setSwitchTab(tab)} key={index} className={`h-full ${switchTab === tab ? "after:relative after:content-[''] after:block after:top-4 after:bg-[#0075FF] text-[#0075FF] after:rounded-full after:h-[6px] after:w-full" : "none"} cursor-pointer`}>{tab}</h1>
          ))
        }
        </div>
        <hr className='hidden md:block h-[2px] w-full bg-[#A0AEC0]'/>
      </div>

      <div className='mt-12 space-y-5'>
        <h1 className='text-3xl font-semibold md:text-left text-center'>{switchTab}</h1>
        <p className='text-lg text-[#A0AEC0] md:text-left text-center'>{showContent}</p>
      </div>
    </div>
  )
}

export default HRPolicies
