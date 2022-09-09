import axios from "axios";
import { PickerOverlay } from "filestack-react-18";
import { useEffect, useState } from "react";

function App() {
    const [isPickerOverlayVisible, setIsPickerOverlayVisible] = useState(false);
    const [imageURL, setImageURL] = useState("");
    const [vehicle, setVehicle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [useTrigger, setUseTrigger] = useState(true);
    const [make, setMake] = useState(null);
    const [model, setModel] = useState("");

    useEffect(() => {

        if (imageURL.length) {
            console.log(imageURL);
            axios
                .get(`http://localhost:4000`, {
                    params: {
                        url: imageURL,
                    },
                })
                .then((res) => setVehicle(res.data))
                .catch((err) => console.log(err.data));
        }
        setLoading(false);
    }, [loading]);

    console.log(`vehicle`, vehicle);

    const test = () => {
        setLoading(!loading);
        Object.values(vehicle).map((i) => {
            return i.displayName;
        });
        test2();
    };

    const test2 = () => {
        setMake(vehicle[0].displayName);
        setModel(vehicle[1].displayName);
    };

    const handleFileUploadSuccess = (result) => {
        setImageURL(result.filesUploaded[0].url);
        setIsPickerOverlayVisible(false);
        setUseTrigger(!useTrigger);
        setLoading(true);
    };

    const handleClick = () => {
        setIsPickerOverlayVisible(!isPickerOverlayVisible);
    };

    return (
        <>
            <div className="top-app">
                <img className="uploaded" src={imageURL} width={500} alt='img' />
                <button onClick={handleClick}>Upload Image</button>
                {isPickerOverlayVisible && (
                    <PickerOverlay
                        apikey={"AOaUmZeTESPulVb0fxzPkz"}
                        onSuccess={(result) => {
                            handleFileUploadSuccess(result);
                        }}
                    />
                )}
            </div>
            <div className="middle-app">
                <button onClick={test}>Match Vehicles</button>
                <h2>{make !== null ? `Here are our ${make}'s` : ""}</h2>
            </div>
            <div className="test-div">
                {/* {Object.values(vehicle).map((i) => {
                    return console.log(`map`, i.displayName);
                })} */}
            </div>
        </>
    );
}

export default App;