import {
    useCallback, useEffect, useMemo, useState,
} from 'react'
import getDoctorList, { Doctor } from '~/services/getDoctorList'
import Card from '~/components/Card'
import Spinner from '~/components/Spinner'
import Modal from '~/components/Modal'
import { useFetch, useMounted } from '~/hooks'
import MultiSelect from '~/components/MultiSelect'
import NotFound from '~/components/NotFound'
import DoctorDetail from './DoctorDetail'

type OptionType = {
    label: string
    value: string
}

const DoctorList = () => {
    const [{ response, isLoading }, fetchDoctorList] = useFetch(getDoctorList)
    const [data, setData] = useState<Doctor[]>([])
    const [selectedItem, setSelectedItem] = useState<Doctor | undefined>()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [filter, setFilter] = useState({
        keyword: '',
        hospital: [] as string[],
        specialization: [] as string[]
    })

    const mounted = useMounted()

    const hospitals: OptionType[] = useMemo(() => {
        const temp: OptionType[] = []
        response?.data?.forEach((item) => {
            item.hospital.forEach((item) => {
                if (!temp.find((option) => option.value === item.id)) {
                    temp.push({
                        label: item.name,
                        value: item.id
                    })
                }
            })
        })
        return temp
    }, [response])

    const specializations: OptionType[] = useMemo(() => {
        const temp: OptionType[] = []
        response?.data?.forEach((item) => {
            if (!temp.find((option) => option.value === item.specialization.id)) {
                temp.push({
                    label: item.specialization.name,
                    value: item.specialization.id
                })
            }
        })
        return temp
    }, [response])

    const handleClickItem = useCallback(
        (item: Doctor) => {
            setSelectedItem(item)
            setIsOpenModal(true)
        },
        [],
    )

    useEffect(() => {
        fetchDoctorList()
    }, [])

    useEffect(() => {
        if (mounted) {
            setData(response?.data || [])
        }
    }, [response])

    useEffect(() => {
        if (mounted) {
            let data = response?.data
            if (filter.hospital.length) {
                data = data?.filter((item) => item.hospital.find((hospital) => filter.hospital.includes(hospital.id)))
            }
            if (filter.specialization.length) {
                data = data?.filter((item) => filter.specialization.includes(item.specialization.id))
            }
            if (filter.keyword) {
                data = data?.filter((item) => {
                    return item.name.toLowerCase().includes(filter.keyword.toLocaleLowerCase())
                })
            }
            setData(data || response?.data || [])
        }
    }, [filter])

    return (
        <div className="container mx-auto">
            <div className="px-5 pt-8 pb-3">
                <h2 className="font-semibold text-2xl mb-6">
                    Doctor Finder
                </h2>
                <div className="flex items-center flex-wrap md:flex-nowrap">
                    <input
                        className="css-1s2u09g-control !cursor-auto mr-4 flex-1 px-2 min-w-[10em] mb-2"
                        placeholder="Keyword"
                        onChange={(e) => setFilter((filter) => ({
                            ...filter,
                            keyword: e?.target?.value || ''
                        }))}
                        value={filter.keyword}
                    />
                    <MultiSelect
                        className="mr-4"
                        options={hospitals}
                        onChange={(e) => setFilter((filter) => ({
                            ...filter,
                            hospital: e?.map((item) => item.value) || []
                        }))}
                        value={
                            hospitals.filter((item) => filter.hospital.includes(item.value))
                        }
                    />
                    <MultiSelect
                        options={specializations}
                        onChange={(e) => setFilter((filter) => ({
                            ...filter,
                            specialization: e?.map((item) => item.value) || []
                        }))}
                        value={
                            specializations.filter((item) => filter.specialization.includes(item.value))
                        }
                    />
                </div>
            </div>
            <div className="p-3 flex flex-wrap">
                {
                    data?.map?.((item) => (
                        <div
                            key={item.doctor_id}
                            className="p-2 w-full md:w-1/2"
                        >
                            <Card
                                item={item}
                                onClick={handleClickItem}
                            />
                        </div>
                    ))
                }
            </div>
            { !data?.length && !isLoading && <NotFound /> }
            { isLoading && <Spinner /> }
            <Modal
                isOpen={isOpenModal}
                onRequestClose={() => setIsOpenModal(false)}
            >
                <DoctorDetail item={selectedItem as Doctor} />
            </Modal>
        </div>
    )
}

export default DoctorList