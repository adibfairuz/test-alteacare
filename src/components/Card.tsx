import React from 'react'
import { Doctor } from '~/services/getDoctorList'
import { FaRegHospital } from 'react-icons/fa'

interface Props {
    className?: string
    item: Doctor
    onClick?: (item: Doctor) => void
}

const Card = React.memo<Props>((props) => {
    const {
        className = '',
        item,
        onClick,
    } = props

    return (
        <div
            className={`
                px-4 py-5 h-full cursor-pointer border bg-white
                border-gray-400 rounded-md hover:shadow-lg
                hover:shadow-slate-300/60 ${className}
            `}
            onClick={() => onClick && onClick(item)}
        >
            <div className="flex items-start">
                <img
                    className="w-14 rounded-md"
                    src={item.photo.formats.thumbnail}
                    alt="job"
                />
                <div className="ml-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <div className="flex items-center">
                        <FaRegHospital className="text-gray-600 mr-1" />
                        <small className="text-sm text-gray-600">
                            {`${item.hospital.map((item) => item.name).join(', ')} - ${item.specialization.name}`}
                        </small>
                    </div>
                    <p
                        className="mt-2 text-base text-gray-600 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: item.about_preview.replace(/&nbsp;/g, ' ') }}
                    />
                    <div className="text-right text-lg font-semibold mt-4">
                        <span>
                            {item.price.formatted}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Card