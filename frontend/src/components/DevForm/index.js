import React, {useState, useEffect} from "react";
import "./styles.css"
function DevForm({ onSubmit }) {
    const [github_username, setGithubUsername] = useState('');
    const [techs, setTechnologies] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (err) => {
                console.log(err)
            },
            {
                timeout: 30000,
            }
        )
    }, []);
    
    async function handleSubmit(e) {
        e.preventDefault();
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });
        setGithubUsername('');
        setTechnologies('');
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <div className={"input-block"}>
                <label htmlFor={"github_username"}>Usuario do Github</label>
                <input
                    name="github_username"
                    id="github_username"
                    required value={github_username}
                    onChange={e => setGithubUsername(e.target.value)}
                />
            </div>

            <div className={"input-block"}>
                <label htmlFor={"techs"}>Tecnologias</label>
                <input
                    name={"techs"}
                    id={"techs"}
                    required value={techs}
                    onChange={e => setTechnologies(e.target.value)}
                />
            </div>

            <div className={"input-group"}>
                <div className={"input-block"}>
                    <label htmlFor={"latitude"}>Latitude</label>
                    <input
                        type={"number"}
                        name={"latitude"}
                        id={"latitude"}
                        required value={latitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>

                <div className={"input-block"}>
                    <label htmlFor={"longitude"}>Longitude</label>
                    <input
                        type={"number"}
                        name={"longitude"}
                        id={"longitude"}
                        required value={longitude}
                        onChange={e => setLatitude(e.target.value)}
                    />
                </div>
            </div>

            <button type={"Submit"}>Salvar</button>
        </form>
    );
}

export default DevForm;