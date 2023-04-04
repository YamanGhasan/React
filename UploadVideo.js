import { CFormCheck, CButton, CForm, CFormLabel, CFormInput } from '@coreui/react';
import Multiselect from 'multiselect-react-dropdown';
import ReCAPTCHA from "react-google-recaptcha";
import React, { useState } from 'react'


function onChangeCaptcha(value) {
    console.log("Captcha value:", value);
}

function UploadVideo() {


    const [videoerrorMsg, setVideoErrorMsg] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [errorofdescription, setErrorDescription] = useState(null);
    const [source, setSource] = useState();

    function isValidTitle(title) {
        return /^[a-zA-Z.'\-_\s]{1,99}$/.test(title);
    }
    const handleChangeTitle = event => {
        if (!isValidTitle(event.target.value)) {
            setError('Title is invalid');
        } else {
            setError(null);
        }
        setTitle(event.target.value);
    };

    function isValidtdescription(Description) {
        return /^[a-zA-Z.'\-_\s]{1,499}$/.test(Description);
    }
    const handleChangeDecsription = event => {
        if (!isValidtdescription(event.target.value)) {
            setErrorDescription('Description is invalid');
        } else {
            setErrorDescription(null);
        }
        setDescription(event.target.value);
    };


   
    const videohandleFileChange = (event) => {
        const source = event.target.files[0]
        const url = URL.createObjectURL(source);
        const fileSizeKiloBytes = source.size

        if (fileSizeKiloBytes < 1024) {
            setVideoErrorMsg("File size is less than minimum limit");
            setIsSuccess(false)

            return
        }
        if (fileSizeKiloBytes > 15578456) {
            setVideoErrorMsg("File size is greater than maximum limit");
            setIsSuccess(false)
            return
        }

        setVideoErrorMsg("")
        setSource(url)
        setIsSuccess(true)
    };


    const [agree, setAgree] = useState(false);
    const checkboxHandler = () => {
        setAgree(!agree);
    }

    const Tags = [
        { id: 0, name: 'c++' },
        { id: 1, name: 'c#' },
        { id: 2, name: 'php' },
        { id: 3, name: 'Java' }
    ]

    const Catogory = [
        { id: 0, name: "Mobile" },
        { id: 1, name: "Frontend" },
        { id: 2, name: "Backend" },
        { id: 2, name: "Network" },

    ]

    const [file, setFile] = useState();
    const [title, setTitle] = useState("");
    const [Description, setDescription] = useState("");

    function handleChangeImage(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    const onSubmit = () => {

    }

    return (

        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBfottom: '2rem' }}>
                <div>

                    <CForm onSubmit={onSubmit} name='uploadVideoForm'>

                        <h1>Upload a video</h1>
                        <div className="mb-3">
                            <CFormInput type="file" name='video'
                                id="formFile" label="Select video" accept="video/*" onChange={videohandleFileChange} required />
                            {source && (
                                <video src={source} width="100%" controls />
                            )}</div>
                        {isSuccess ? <p className="success-message">Validation successful</p> : null}
                        
                        <h2 style={{ color: 'red' }}>{videoerrorMsg}</h2>


                        <CForm>
                            <div className="mb-3">
                                <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                                <CFormInput type="text" id="exampleFormControlInput1" size="sm" name='title'
                                    onChange={handleChangeTitle}
                                    value={title} required />
                                {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                            </div>
                            <div className="mb-3">
                                <CFormLabel>Description</CFormLabel>
                                <CFormInput type="text" size="lg" name='Description'
                                    onChange={handleChangeDecsription}
                                    value={Description} required />
                                {errorofdescription && <h2 style={{ color: 'red' }}>{errorofdescription}</h2>}
                            </div>
                        </CForm>
                        <div className="mb-3">
                            <CFormInput type="file" name='image' id="formFile" label="Select image" onChange={handleChangeImage} accept="image/*" required />
                            <img src={file} alt="" />

                        </div>

                        <h6>Tags</h6>
                        <Multiselect
                            options={Tags}
                            selectedValues={Tags.selectedValue}
                            onSelect={Tags.onSelect}
                            onRemove={Tags.onRemove}
                            displayValue="name"
                            selectionLimit='3'
                            name='tag'
                        />

                        <h6>Catogory</h6>
                        <Multiselect
                            options={Catogory}

                            selectedValues={Catogory.selectedValue}
                            onSelect={Catogory.onSelect}
                            onRemove={Catogory.onRemove}
                            displayValue="name"
                            required
name='catogory'
                        />

                        <br />
                        <div className="float-none" style={{ textAlign: 'center', marginBottom: '2rem', display: "inline-block" }}>
                            <CFormCheck label="is Free" defaultChecked name='isfreeCheckbox'/>
                            <CFormCheck label="Terms and conditions" onChange={checkboxHandler} name='termsConditionCheckbox'/>
                            <CFormCheck label="Privacy Policy" name='privacyPolicyCheckbox'/>
                        </div>
                        <br />
                        <div className="float-none" style={{ textAlign: 'center', marginBottom: '2rem', display: "inline-block" }}>
                            <ReCAPTCHA
                                sitekey="Your client site key"
                                onChange={onChangeCaptcha}
                            /></div>
                        <br />

                        <CButton color="primary" type="submit" disabled={!agree} className="btn" href="/video/create">
                            Submit
                        </CButton>
                    </CForm>
                </div>
            </div>
        </div>
    )
}


export default UploadVideo