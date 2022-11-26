import NotFoundImage from '~/assets/images/404_not_found.svg'

const NotFound = () => {
    return (
        <div className="flex justify-center">
            <img
                className="w-72 md:w-96"
                src={NotFoundImage}
                alt="not found"
            />
        </div>
    )
}

export default NotFound