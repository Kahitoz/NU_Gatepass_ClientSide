const ImageModal = ({ isOpen, isClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
          <div className="bg-background border border-black w-4/12 p-6 rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-red-200 flex rounded-xl cursor-pointer hover:bg-red-400">
                <p className="text-center hover:text-white">Tap to select image</p>
              </div>
              <p className="font-bold text-center cursor-pointer mt-3 hover:text-red-700">Upload</p>
              <p
                onClick={isClose}
                className={`font-bold mt-5 cursor-pointer hover:text-red-700`}
              >
                Close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ImageModal;
