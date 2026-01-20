export default function ContectUs() {
  return (
    <>
      <div
        className="max-w-xl mx-auto p-8  bg-gray-900 rounded-2xl 
            shadow-lg flex flex-col items-center w-full  lg:w-full   "
      >
        <h2 className="text-xl font-semibold text-white  text-center tracking-wide mb-8 lg:mb-6 lg:mb-0 lg:text-2xl">
          Contact Information
        </h2>

        <div className="flex flex-col w-60  items-center lg:items-start lg:w-full lg:flex-row ">
          <div className="space-y-3 text-gray-300 text-sm">
            <p className="text-lg font-medium text-white lg:text-xl ">
              Mr. Pumin
            </p>

            <div className="flex gap-5 lg:text-lg">
              <span className="text-gray-400 lg:w-16">Email :</span>
              <span className="w-35 ">puminbg@gmail.com</span>
            </div>

            <div className="flex gap-5 lg:text-lg">
              <span className="text-gray-400 lg:w-16">Line ID :</span>
              <span className="w-35 ">puminkmutnb</span>
            </div>
          </div>
          <div className="max-w-30 lg:ml-18 mt-5 lg:mt-0">
            <img
              src="https://res.cloudinary.com/dtbfee3ql/image/upload/v1766140321/0AADBAA9-DA84-4BF0-A207-61089FC84F25_wlbyyw.jpg"
              alt="ID"
            />
          </div>
        </div>
      </div>
    </>
  )
}
