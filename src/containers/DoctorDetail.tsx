import React from 'react'
import { Doctor } from '~/services/getDoctorList'
import { BiBriefcase } from 'react-icons/bi'
import { FaRegHospital } from 'react-icons/fa'

interface Props {
    className?: string
    item: Doctor
}

const DoctorDetail: React.FC<Props> = (props) => {
    const {
        className = '',
        item,
    } = props

    return (
        <div
            className={`px-4 py-5 ${className}`}
        >
            <div className="flex items-start">
                <img
                    className="w-24 rounded-md"
                    src={item.photo.formats.medium}
                    alt="job"
                />
                <div className="ml-3">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <ul className="flex flex-col">
                        <li className="flex items-center">
                            <FaRegHospital className="text-gray-600 mr-1" />
                            <span className="text-sm text-gray-600">
                                {`${item.hospital.map((item) => item.name).join(', ')} - ${item.specialization.name}`}
                            </span>
                        </li>
                        <li className="flex items-center">
                            <BiBriefcase className="text-gray-600 mr-1" />
                            <span className="text-sm">{item.experience}</span>
                        </li>
                        <li>
                            <span className="font-semibold text-base text-black">
                                {item.price.formatted}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
            <p
                className="mt-4 prose"
                dangerouslySetInnerHTML={{ __html: item?.about as string }}
            />
        </div>
    )
}

export default DoctorDetail