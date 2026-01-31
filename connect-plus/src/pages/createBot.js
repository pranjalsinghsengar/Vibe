import React, { useState } from 'react'
import Layout from '../components/layout';
import { IoMdArrowRoundBack } from "react-icons/io";
import { PiChatText } from "react-icons/pi";
import { IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { MdAdd } from "react-icons/md";


function CreateBot() {

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        language: "",
        assistantName: "",
        welcomeMessages: [""],
        placeholder: "",
        fallbackMessage: "",
        color: "#d8c9ae",
        launcherIcon: "",
        widgetPosition: "",
        termsUrl: "",
        privacyUrl: "",
        assistantType: [],
        generativeAI: "",

    });

    console.log("formData", formData)

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
    };
    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
    // const handleChange = (index, event) => {
    //     const newMessages = [...formData.welcomeMessages];
    //     newMessages[index] = event.target.value;
    //     setFormData({ ...formData, welcomeMessages: newMessages });
    // };

    const handleChange = (e, index = null) => {
        if (index !== null) {
            // Updating a specific welcome message
            const newMessages = [...formData.welcomeMessages];
            newMessages[index] = e.target.value;
            setFormData({ ...formData, welcomeMessages: newMessages });
        } else {
            // Updating other form fields
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };


    const addMessage = () => {
        setFormData({ ...formData, welcomeMessages: [...formData.welcomeMessages, ""] });
    };

    const removeMessage = (index) => {
        const newMessages = formData.welcomeMessages.filter((_, i) => i !== index);
        setFormData({ ...formData, welcomeMessages: newMessages });
    };
    const handleCheckboxChange = (type) => {
        setFormData((prevState) => {
            const updatedTypes = prevState.assistantType.includes(type)
                ? prevState.assistantType.filter((item) => item !== type)
                : [...prevState.assistantType, type];
            return { ...prevState, assistantType: updatedTypes };
        });
    };

    return (
        <Layout>
            {/* <div className="flex w-full gap-5 h-full p-6 bg-gradient-to-r from-[#d7cab4] via-[#b1b1b1] to-[#c2af93]"> */}
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5 h-full p-6 bg-[#fffdfc] overflow-scroll hide-scrollbar">
                {/* Sidebar Steps */}
                <div className="w-full  p-4">
                    <div className="flex flex-col">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="relative flex flex-col items-start">
                                <div className="flex flex-row items-center gap-4">

                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step >= num ? "bg-primary border-primary text-white" : "bg-gray-300 border-gray-300 text-black"
                                            }`}
                                    >
                                        {num}
                                    </div>
                                    <div>
                                        {num === 1 ? <p>Bot Info</p> : num === 2 ? <p>Customization</p> : <p>Select LLM</p>}

                                    </div>
                                </div>
                                {num < 3 && (
                                    <div
                                        className={`h-28 md:h-48 w-1 ml-3 ${step > num ? "bg-primary" : "bg-gray-300"
                                            }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:col-span-2 min-h-96 h-full p-3 md:p-6 bg-slate-50 rounded-sm border border-primary overflow-hidden">
                    <div className='h-[10%] max-h-16'>
                        <button
                            onClick={handleBack}
                            className="px-4 py-2 flex justify-start items-center gap-2 bg-gray-200 border border-primary hover:bg-primary text-secondary text-xs md:text-sm font-medium rounded-sm"
                            disabled={step === 1}
                        >
                            <IoMdArrowRoundBack />
                            Back
                        </button>
                    </div>
                    <div className='h-[90%] overflow-scroll hide-scrollbar'>
                        {step === 1 && (
                            <div className='text-start'>
                                <h2 className="text-xl font-semibold text-secondary pb-5">Bot Info</h2>
                                <p className="text-gray-600">Select the language for your virtual assistant</p>
                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded-sm outline-1 outline-primary"
                                >
                                    <option value="">Select a language</option>
                                    <option value="English">English</option>
                                    {/* <option value="Spanish">Spanish</option>
                                    <option value="French">French</option> */}
                                </select>
                                <label className="block mt-4">What is your Virtual Assistant's Name? *</label>
                                <input
                                    type="text"
                                    name="assistantName"
                                    value={formData.assistantName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-sm outline-1 outline-primary"
                                />

                                {/* <label className="block mt-4">What will be your Welcome Message? (Max 50 words) *</label>
                                <textarea
                                    name="welcomeMessage"
                                    value={formData.welcomeMessage}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-sm"
                                ></textarea> */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <label className="block mt-4">What will be your Welcome Message? (Max 50 words) *</label>
                                        <button
                                            onClick={addMessage}
                                            className="mt-2 p-2  border border-primary bg-[#fffdfc] hover:bg-primary text-lg text-white rounded-sm"
                                        >
                                            <MdAdd className='text-secondary' />
                                        </button>
                                    </div>

                                    {formData.welcomeMessages.map((message, index) => (
                                        <div key={index} className="flex items-center gap-2 mt-2">
                                            <input
                                                name="welcomeMessages"
                                                // value={message}
                                                // onChange={(e) => handleChange(index, e)}
                                                value={formData.welcomeMessages[index]}
                                                onChange={(e) => handleChange(e, index)}
                                                className="w-full p-2 border rounded-sm outline-1 outline-primary"
                                            ></input>
                                            <button
                                                onClick={() => removeMessage(index)}
                                                className="p-2 bg-red-100 text-white rounded-sm border text-lg border-red-400"
                                            >
                                                <RxCross2 className='text-red-400' />
                                            </button>
                                        </div>
                                    ))}

                                </div>
                                <label className="block mt-4">What is Virtual Assistant Placeholder? *</label>
                                <input
                                    type="text"
                                    name="placeholder"
                                    value={formData.placeholder}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-sm outline-1 outline-primary"
                                />

                                <label className="block mt-4">What will be your Fallback Message? (Max 50 words) *</label>
                                <textarea
                                    name="fallbackMessage"
                                    value={formData.fallbackMessage}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-sm outline-1 outline-primary"
                                ></textarea>

                                <p className="text-gray-500 text-sm mt-2">
                                    Note: A fallback message is a bot's default response when it doesn’t have an answer, helping keep the conversation going.
                                </p>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="text-start">
                                <div className="pb-5">
                                    <h2 className="text-xl font-semibold text-secondary">Customization</h2>
                                    <p className="text-gray-600">Set the theme for your Bot. Customize your widget with colour, icons, positions etc.</p>
                                </div>
                                <label className="block mt-4">Color:</label>
                                <div className="flex items-center gap-4">

                                    <input type="color" name="color" value={formData.color} onChange={handleChange} />
                                    <p>Selected Color: {formData?.color}</p>
                                </div>
                                <label className="block mt-4">Launcher Icon:</label>
                                <input type="file" name="launcherIcon" onChange={handleChange} className="w-full p-2 border rounded-md" />

                                <label className="block mt-4">Widget position on the screen:</label>
                                <div className="flex gap-4">
                                    <label><input type="radio" name="widgetPosition" value="Left" onChange={handleChange} /> Left</label>
                                    <label><input type="radio" name="widgetPosition" value="Right" onChange={handleChange} /> Right</label>
                                </div>

                                <label className="block mt-4">Please give Terms and Condition URL (Optional)</label>
                                <input type="text" name="termsUrl" onChange={handleChange} className="w-full p-2 border rounded-md outline-1 outline-primary" />

                                <label className="block mt-4">Please give Privacy and Policy URL (Optional)</label>
                                <input type="text" name="privacyUrl" onChange={handleChange} className="w-full p-2 border rounded-md outline-1 outline-primary" />

                                <label className="block mt-4">Select virtual assistant type (Optional)</label>
                                <div className="flex gap-4">
                                    <label><input type="checkbox" onChange={() => handleCheckboxChange("Click")} /> Click</label>
                                    <label><input type="checkbox" onChange={() => handleCheckboxChange("Text")} /> Text</label>
                                    <label><input type="checkbox" onChange={() => handleCheckboxChange("Voice")} /> Voice</label>
                                    <label><input type="checkbox" onChange={() => handleCheckboxChange("Video")} /> Video</label>
                                    <label><input type="checkbox" onChange={() => handleCheckboxChange("Other")} /> Other</label>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className='text-start'>
                                <h2 className="text-xl font-semibold text-secondary pb-5">AI Model Selection</h2>
                                <p className="text-gray-600">Do you want to use Generative AI - LLM (as fallback)?</p>
                                <select
                                    name="generativeAI"
                                    value={formData.generativeAI}
                                    onChange={handleChange}
                                    className="mt-2 w-full p-2 border rounded-md outline-1 outline-primary"
                                >
                                    <option value="">Select an AI Model</option>
                                    <option value="GPT-4">GPT-4</option>
                                    <option value="Claude">Claude</option>
                                    <option value="Gemini">Gemini</option>
                                    <option value="BharatGPT">BharatGPT</option>
                                </select>
                            </div>
                        )}

                        {/* Navigation Button */}
                        {step === 3 ? <button
                            className="mt-4 bg-gray-200 border border-primary hover:bg-primary text-secondary font-medium px-4 py-2 rounded-sm disabled:opacity-50"
                        >
                            Create Bot
                        </button> : <button
                            onClick={handleNext}
                            className="mt-4 bg-gray-200 border border-primary hover:bg-primary text-secondary font-medium px-4 py-2 rounded-sm disabled:opacity-50"
                            disabled={step === 3}
                        >
                            Next
                        </button>}

                    </div>
                </div>

                {/* Preview Section */}
                <div className="w-full col-span-1 lg:col-span-2 xl:col-span-1 h-full p-3 md:p-6 bg-slate-100 rounded-sm border border-primary">
                    <h2 className="text-lg font-semibold mb-2">Bot Preview</h2>
                    <div className="border rounded-lg h-96 overflow-hidden bg-white">
                        <div
                            className="flex h-[15%] p-4 items-center gap-5 text-white"
                            style={{ backgroundColor: formData?.color }}
                        >
                            <PiChatText className='text-lg flex flex-shrink-0' />
                            {/* <p>{formData?.assistantName}</p> */}
                            <p className="">
                                {formData?.assistantName?.length > 20
                                    ? `${formData.assistantName.substring(0, 20)}...`
                                    : formData?.assistantName}
                            </p>
                        </div>
                        {/* <div className='flex h-[70%] p-4 flex flex-col overflow-scroll text-start hide-scrollbar w-full'>
                            <div>
                                {formData?.welcomeMessages.map(welcomeMessage)=>{
                                    <p className="px-4 py-2 bg-slate-300 rounded-tl-md rounded-tr-md rounded-br-md w-fit max-w-70%">{welcomeMessage}</p>
                                }}
                            </div>

                        </div> */}
                        <div className="flex h-[70%] p-4 flex-col overflow-scroll text-start hide-scrollbar w-full">
                            <div className='flex flex-col gap-2'>
                                {formData?.welcomeMessages.map((welcomeMessage, index) => (
                                    // <p
                                    //     key={index}
                                    //     className="px-4 py-2 bg-slate-300 rounded-tl-md rounded-tr-md rounded-br-md w-fit max-w-[70%] text-nowrap break-words"
                                    // >
                                    //     {welcomeMessage}
                                    // </p>
                                    <p
                                        key={index}
                                        className="px-4 py-2 bg-slate-300 rounded-tl-md rounded-tr-md rounded-br-md w-fit max-w-[70%] break-words"
                                    >
                                        {welcomeMessage}
                                    </p>

                                ))}
                            </div>
                        </div>

                        <div className='flex h-[15%] p-4 flex items-center justify-between gap-5 border-t' style={{ borderColor: formData?.color }}>
                            {/* <p className="text-slate-400 text-sm">{formData?.placeholder}</p> */}
                            <p className="text-slate-400 text-sm">
                                {formData?.placeholder?.length > 20
                                    ? `${formData.placeholder.substring(0, 20)}...`
                                    : formData?.placeholder}
                            </p>

                            <div className='flex gap-2'>
                                <IoMicOutline className='text-lg' />
                                <VscSend className='text-lg' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateBot