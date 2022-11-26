import axios from 'axios'
import { Response } from './types'

export interface Doctor {
    doctor_id: string;
    name: string;
    slug: string;
    is_popular: boolean;
    about: string;
    overview: string;
    photo: Photo;
    sip: string;
    experience: string;
    price: Price;
    specialization: Specialization;
    hospital: Hospital[];
    about_preview: string;
}

export interface Hospital {
    id: string;
    name: string;
    image: Photo;
    icon: Photo;
}

export interface Photo {
    size_formatted: string;
    url: string;
    formats: Formats;
}

export interface Formats {
    thumbnail: string;
    large: string;
    medium: string;
    small: string;
}

export interface Price {
    raw: number;
    formatted: string;
}

export interface Specialization {
    id: string;
    name: string;
}

const getDoctorList = async () => {
    const res = await axios.get<Response<Doctor[]>>('https://run.mocky.io/v3/c9a2b598-9c93-4999-bd04-0194839ef2dc')
    return res.data
}

export default getDoctorList