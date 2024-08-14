import React from 'react'

type Props = {
    title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  arrow: React.ReactNode;
  description: string;
  isLast: boolean;
}

const StatusCard = ({ title, count, icon, color, arrow, description, isLast }: Props) => (
    <div className={` flex items-center gap-3 ${!isLast ? 'border-b md:border-b-0 lg:border-r' : ''} max-md:pb-5`}>
      <div className="bg-[#f3f2f2] p-3 rounded-full">
        {icon}
      </div>
  
      <div>
        <h4 className="text-xl font-medium">{title}</h4>
        <div className="flex items-center gap-3">
          <div>
            <h2 className="mt-1 text-2xl md:text-4xl 2xl:text-5xl font-bold">{count}</h2>
          </div>
  
          <div className={`mt-2 ${color} flex items-center gap-2`}>
            {arrow}
            <p className="text-xs">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )

export default StatusCard