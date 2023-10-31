import { useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const ImageModal = ({ isOpen, isClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const decode = jwtDecode(Cookies.get('ACCESS_TOKEN'));
    const user_id = decode.data.user_id;
    const [message, setMessage] = useState("")
    const handleImageUploadFunc = () => {
        if(selectedImage){
            setMessage("Image Uploaded Successfully")
            const getFileExtention = selectedImage.name.split('.').pop();
            const filename = `${user_id}.${getFileExtention}`;
            const formData = new FormData();
            formData.append("image", selectedImage, filename);
            const authorization = Cookies.get('ACCESS_TOKEN');
            fetch("http://localhost:4000/gatepass/v2/student/profile/upload",{
                method:"POST",
                headers:{
                    Authorization:authorization,
                },
                body: formData,
            })
                .then((response) =>{
                    if(response.ok){
                        return response.json();
                    }else{
                        throw Error("Image Upload Failed");
                    }
                })
                .then((data) => {
                    setMessage(data.message)
                })
                .catch((error) => {
                    console.log(error)
                });

        }else{
            setMessage("Please Select an image")
        }
    };

    const handleImageSelect = (event) =>{
        const file = event.target.files[0];
        setSelectedImage(file)
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur">
                    <div className="bg-background border border-black w-4/12 p-6 rounded-md">
                        <div className="flex flex-col items-center">
                            <div className="w-20 h-20 bg-red-200 flex rounded-xl cursor-pointer hover-bg-red-400">
                                {selectedImage ? (
                                    <img
                                        src={selectedImage}
                                        alt="Selected Image"
                                        className="w-20 h-20 bg-red-200 rounded-xl cursor-pointer hover-bg-red-400"
                                    />
                                ) : (
                                    <div className="w-20 h-20 bg-red-200 flex rounded-xl cursor-pointer hover-bg-red-400">
                                        <p className="text-center hover:text-white">
                                            Please Select an Image
                                        </p>
                                    </div>
                                )}
                            </div>
                                <input
                                    type="file"
                                    id="imageInput"
                                    accept="image/*"
                                    name={`image`}
                                    onChange={handleImageSelect}
                                />
                            <button
                            onClick={handleImageUploadFunc}
                            className={`bg-red-700 text-white p-2 rounded-full hover:bg-red-600`}
                            >Upload</button>
                            <p className="font-bold text-center cursor-pointer mt-3 hover:text-red-700">
                                {message}
                            </p>
                            <p
                                onClick={isClose}
                                className="font-bold mt-5 cursor-pointer hover:text-red-700"
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
