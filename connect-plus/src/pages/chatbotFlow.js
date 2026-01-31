// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";

// const nodeTypesConfig = {
//   question: { bg: "bg-blue-100", text: "text-blue-800" },
//   response: { bg: "bg-green-100", text: "text-green-800" },
//   decision: { bg: "bg-yellow-100", text: "text-yellow-800" },
// };

// const questionTypes = ["checkbox", "dropdown", "text", "image", "button", "query", "fetch"];

// const CustomNode = ({ data, id, type, onEdit, onRemove }) => {
//   const nodeStyle = nodeTypesConfig[type] || nodeTypesConfig["question"];
//   const labelInputRef = useRef(null);
//   const urlInputRef = useRef(null);
//   const buttonInputRef = useRef(null);
//   const queryInputRef = useRef(null);
//   const fetchUrlRef = useRef(null);
//   const fetchTokenRef = useRef(null);
//   const fetchPayloadRef = useRef(null);
//   const fetchTypeRef = useRef(null);
//   const fetchMethodRef = useRef(null);

//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   const handleInputChange = (e) => {
//     onEdit(id, {
//       label: e.target.value,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleQuestionTypeChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: e.target.value,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleImageUrlChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: e.target.value,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//     });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         onEdit(id, {
//           label: data.label,
//           questionType: data.questionType,
//           pastedImageUrl: data.pastedImageUrl,
//           uploadedImageUrl: event.target.result,
//           uploadedImageName: file.name,
//           buttonText: data.buttonText,
//           queryText: data.queryText,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonTextChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: e.target.value,
//       // queryText: data.queryText,
//     });
//   };

//   const handleQueryTextChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       //      buttonText: data.buttonText,
//       queryText: e.target.value,
//     });
//   };

//   const handleFetchFieldChange = (field) => (e) => {
//     onEdit(id, {
//       ...data,
//       [field]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   useEffect(() => {
//     if (data.questionType === "image" && document.activeElement !== urlInputRef.current) {
//       urlInputRef.current.focus();
//     }
//   }, [data.pastedImageUrl, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "button" && document.activeElement !== buttonInputRef.current) {
//       buttonInputRef.current.focus();
//     }
//   }, [data.buttonText, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "query" && document.activeElement !== queryInputRef.current) {
//       queryInputRef.current.focus();
//     }
//   }, [data.queryText, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchUrlRef.current) {
//       fetchUrlRef.current.focus();
//     }
//   }, [data.fetchUrl, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTokenRef.current) {
//       fetchTokenRef.current.focus();
//     }
//   }, [data.fetchToken, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchPayloadRef.current) {
//       fetchPayloadRef.current.focus();
//     }
//   }, [data.fetchPayload, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTypeRef.current) {
//       fetchTypeRef.current.focus();
//     }
//   }, [data.fetchType, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchMethodRef.current) {
//       fetchMethodRef.current.focus();
//     }
//   }, [data.fetchMethod, data.questionType]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-48 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => e.stopPropagation()}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <>
//           <select
//             value={data.questionType}
//             onChange={handleQuestionTypeChange}
//             onClick={(e) => e.stopPropagation()}
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//           >
//             {questionTypes.map((qType) => (
//               <option key={qType} value={qType}>
//                 {qType.charAt(0).toUpperCase() + qType.slice(1)}
//               </option>
//             ))}
//           </select>
//           {data.questionType === "image" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={urlInputRef}
//                 type="text"
//                 value={data.pastedImageUrl}
//                 onChange={handleImageUrlChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Paste Image URL"
//               />
//               <p>or</p>
//               <div className="flex flex-col w-full">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   onClick={(e) => e.stopPropagation()}
//                   className="hidden"
//                   id={`customFileInput-${id}`}
//                 />
//                 <label
//                   htmlFor={`customFileInput-${id}`}
//                   className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm text-center"
//                 >
//                   Upload Image
//                 </label>
//                 {data.uploadedImageName && (
//                   <span
//                     className="w-full text-sm mt-1 truncate"
//                     title={data.uploadedImageName}
//                   >
//                     {data.uploadedImageName}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}
//           {data.questionType === "button" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={buttonInputRef}
//                 type="text"
//                 value={data.buttonText}
//                 onChange={handleButtonTextChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Enter Button Name"
//               />
//             </div>
//           )}
//           {data.questionType === "query" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={queryInputRef}
//                 type="text"
//                 value={data.queryText}
//                 onChange={handleQueryTextChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Enter Query Name"
//               />
//             </div>
//           )}
//           {data.questionType === "fetch" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={fetchUrlRef}
//                 type="text"
//                 value={data.fetchUrl}
//                 onChange={handleFetchFieldChange("fetchUrl")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter URL"
//               />
//               <input
//                 ref={fetchTokenRef}
//                 type="text"
//                 value={data.fetchToken}
//                 onChange={handleFetchFieldChange("fetchToken")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Token"
//               />
//               <input
//                 ref={fetchPayloadRef}
//                 type="text"
//                 value={data.fetchPayload}
//                 onChange={handleFetchFieldChange("fetchPayload")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Payload"
//               />
//               <input
//                 ref={fetchTypeRef}
//                 type="text"
//                 value={data.fetchType}
//                 onChange={handleFetchFieldChange("fetchType")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Type"
//               />
//               <input
//                 ref={fetchMethodRef}
//                 type="text"
//                 value={data.fetchMethod}
//                 onChange={handleFetchFieldChange("fetchMethod")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Method"
//               />
//             </div>
//           )}
//         </>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// const flowData = {
//   "nodes": [
//     {
//       "id": "9a2b596b-2776-430b-9055-1540ce988ed4",
//       "type": "question",
//       "level": 1,
//       "label": "Thank you.",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 839.532189870936, "y": 234.48587067643695 }
//     },
//     {
//       "id": "cb6260da-0f06-4ec1-9795-d3a483bf61e5",
//       "type": "question",
//       "level": 1,
//       "label": "Hii, We are fortis hospital. Do you want to proceed with us ?",
//       "questionType": "button",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 396.09811039387, "y": -126.47027393677183 }
//     },
//     {
//       "id": "835c2aab-837e-443e-a0f3-72e7549729eb",
//       "type": "question",
//       "level": 1,
//       "label": "Yes",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": "Yes",
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 211.06321477159804, "y": 68.46970947155421 }
//     },
//     {
//       "id": "237b86a7-5f92-488c-9260-4435daa96915",
//       "type": "question",
//       "level": 1,
//       "label": "No",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": "No",
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 563.0701613915382, "y": 65.06117074332903 }
//     },
//     {
//       "id": "dce3f9bd-de22-4097-b391-31d6de1d19cc",
//       "type": "question",
//       "level": 1,
//       "label": "",
//       "questionType": "query",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": "Select your Query",
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -150.83926936685032, "y": 274.497141019261 }
//     },
//     {
//       "id": "37aa4f57-e041-4048-8e86-547007b548cd",
//       "type": "question",
//       "level": 1,
//       "label": "Doctor List",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -325.6066910226267, "y": 485.74056950887933 }
//     },
//     {
//       "id": "d335884a-ff1a-4074-bdab-6d2b60e56d57",
//       "type": "question",
//       "level": 1,
//       "label": "Services",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -78.07974230683845, "y": 490.98145744592 }
//     },
//     {
//       "id": "24bcdb7e-c1bf-404c-9889-1fb4129dc714",
//       "type": "question",
//       "level": 1,
//       "label": "About",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 183.91665837270153, "y": 490.51440166535974 }
//     },
//     {
//       "id": "dc48de69-9f4d-4398-b8bd-a4d4d7aa4e72",
//       "type": "question",
//       "level": 1,
//       "label": "",
//       "questionType": "query",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": "Select Doctor departeme",
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -417.634236189518, "y": 685.0475853822314 }
//     },
//     {
//       "id": "b9c45d27-2f70-42a2-b633-9913e7131920",
//       "type": "question",
//       "level": 1,
//       "label": "Ortho",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -603.3423020540707, "y": 909.8530938949098 }
//     },
//     {
//       "id": "082cc06a-4065-4f9e-97a1-b09a9130bf76",
//       "type": "question",
//       "level": 1,
//       "label": "Gyno",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -322.724451389667, "y": 911.1827146083355 }
//     },
//     {
//       "id": "b48dac08-66c5-45c2-9ba8-18f364775302",
//       "type": "question",
//       "level": 1,
//       "label": "Heart",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": -35.10704072324964, "y": 898.063487112872 }
//     }
//   ],
//   "edges": [
//     {
//       "source": "cb6260da-0f06-4ec1-9795-d3a483bf61e5",
//       "target": "835c2aab-837e-443e-a0f3-72e7549729eb"
//     },
//     {
//       "source": "cb6260da-0f06-4ec1-9795-d3a483bf61e5",
//       "target": "237b86a7-5f92-488c-9260-4435daa96915"
//     },
//     {
//       "source": "237b86a7-5f92-488c-9260-4435daa96915",
//       "target": "9a2b596b-2776-430b-9055-1540ce988ed4"
//     },
//     {
//       "source": "835c2aab-837e-443e-a0f3-72e7549729eb",
//       "target": "dce3f9bd-de22-4097-b391-31d6de1d19cc"
//     },
//     {
//       "source": "dce3f9bd-de22-4097-b391-31d6de1d19cc",
//       "target": "37aa4f57-e041-4048-8e86-547007b548cd"
//     },
//     {
//       "source": "dce3f9bd-de22-4097-b391-31d6de1d19cc",
//       "target": "d335884a-ff1a-4074-bdab-6d2b60e56d57"
//     },
//     {
//       "source": "dce3f9bd-de22-4097-b391-31d6de1d19cc",
//       "target": "24bcdb7e-c1bf-404c-9889-1fb4129dc714"
//     },
//     {
//       "source": "37aa4f57-e041-4048-8e86-547007b548cd",
//       "target": "dc48de69-9f4d-4398-b8bd-a4d4d7aa4e72"
//     },
//     {
//       "source": "dc48de69-9f4d-4398-b8bd-a4d4d7aa4e72",
//       "target": "b9c45d27-2f70-42a2-b633-9913e7131920"
//     },
//     {
//       "source": "dc48de69-9f4d-4398-b8bd-a4d4d7aa4e72",
//       "target": "082cc06a-4065-4f9e-97a1-b09a9130bf76"
//     },
//     {
//       "source": "dc48de69-9f4d-4398-b8bd-a4d4d7aa4e72",
//       "target": "b48dac08-66c5-45c2-9ba8-18f364775302"
//     }
//   ]
// };

// const initialFlows = {
//   "Flow 1": {
//     nodes: flowData.nodes.map(node => ({
//       id: node.id,
//       type: node.type,
//       level: node.level,
//       position: node.position,
//       data: {
//         label: node.label,
//         questionType: node.questionType,
//         pastedImageUrl: node.pastedImageUrl,
//         uploadedImageUrl: node.uploadedImageUrl,
//         uploadedImageName: node.uploadedImageName,
//         buttonText: node.buttonText,
//         queryText: node.queryText,
//         fetchUrl: node.fetchUrl,
//         fetchToken: node.fetchToken,
//         fetchPayload: node.fetchPayload,
//         fetchType: node.fetchType,
//         fetchMethod: node.fetchMethod
//       }
//     })),
//     edges: flowData.edges.map(edge => ({
//       id: `${edge.source}-${edge.target}`,
//       source: edge.source,
//       target: edge.target,
//       animated: true
//     }))
//   },
//   "Flow 2": {
//     nodes: [
//       {
//         id: uuidv4(),
//         type: "question",
//         level: 1,
//         position: { x: 100, y: 100 },
//         data: {
//           label: "Start of Flow 2",
//           questionType: "text",
//           pastedImageUrl: "",
//           uploadedImageUrl: "",
//           uploadedImageName: "",
//           buttonText: "",
//           queryText: "",
//           fetchUrl: "",
//           fetchToken: "",
//           fetchPayload: "",
//           fetchType: "",
//           fetchMethod: ""
//         }
//       }
//     ],
//     edges: []
//   }
// };

// const ChatbotFlow = () => {
//   const [flows, setFlows] = useState(initialFlows);
//   const [currentFlow, setCurrentFlow] = useState("Flow 1");
//   const [newFlowName, setNewFlowName] = useState("");
//   const [selectedNode, setSelectedNode] = useState(null);
//   const newFlowInputRef = useRef(null);

//   console.log("newFlowName",newFlowName)

//   const nodes = flows[currentFlow].nodes;
//   const edges = flows[currentFlow].edges;

//   const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     // Ensure focus stays on the input after state update
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   console.log("currentFlow",currentFlow)



//   const onNodesChange = useCallback(
//     (changes) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge({ ...connection, animated: true }, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question", level = 1) => {
//     const newNode = {
//       id: uuidv4(),
//       type,
//       level,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: type === "question" ? {
//         label: "",
//         questionType: "text",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         buttonText: "",
//         queryText: "",
//         fetchUrl: "",
//         fetchToken: "",
//         fetchPayload: "",
//         fetchType: "",
//         fetchMethod: ""
//       } : { label: "" },
//     };
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode]
//       }
//     }));
//   };

//   const removeNode = (id) => {
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         nodes: prevFlows[currentFlow].nodes.filter(node => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(edge => edge.source !== id && edge.target !== id)
//       }
//     }));
//     if (selectedNode?.id === id) setSelectedNode(null);
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map(node =>
//             node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
//           )
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [newFlowName]: {
//         nodes: [],
//         edges: []
//       }
//     }));
//     setCurrentFlow(newFlowName);
//     setNewFlowName("");
//   };



//   const exportJSON = () => {
//     const jsonStructure = {
//       flow: {
//         name: currentFlow
//       },
//       nodes: flows[currentFlow].nodes.map(node => ({
//         id: node.id,
//         type: node.type,
//         level: node.level,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         buttonText: node.data.buttonText || null,
//         queryText: node.data.queryText || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         position: node.position
//       })),
//       edges: flows[currentFlow].edges.map(edge => ({
//         source: edge.source,
//         target: edge.target
//       }))
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   // Function to send the JSON to the API
//   const sendFlowToAPI = async () => {
//     try {
//       // Get the JSON structure
//       const flowData = exportJSON();

//       // Configure the API request
//       const response = await axios.post(
//         'https://api-xpresschat.fixall.ai/api/whatsapp/flow/create',
//         flowData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDgwZDgwZjkxOWM4ZDRkYmY0ZDRmNSIsInVzZXJfaWQiOiIxMDAwMDAyIiwiZW1haWwiOiJzb21uYXRoQGdtYWlsLmNvbSIsImlhdCI6MTc0MjkwNTcyMCwiZXhwIjoxNzQyOTM0NTIwfQ.3OdwaQiUFyYdLPhc-jc6tKQfa3laczXXEYGI8SA-vmc'
//           }
//         }
//       );

//       // Handle the successful response
//       if(response?.data?.success === true) {
//         toast.success('Flow saved successfully!');
//       }else{
//         toast.error('Failed to save flow. Please try again.');
//       }
//       return response.data;

//     } catch (error) {
//       // Handle errors
//       console.error('Error sending flow to API:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error('No response received:', error.request);
//       } else {
//         // Something happened in setting up the request
//         console.error('Error message:', error.message);
//       }
//       throw error;
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">


//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex space-x-4 bg-white shadow">
//             <button
//               onClick={() => addNode("question")}
//               className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Question
//             </button>
//             <button
//               onClick={() => addNode("response")}
//               className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Response
//             </button>
//             <button
//               onClick={() => addNode("decision")}
//               className="bg-yellow-500 text-white px-2 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Decision
//             </button>
//             <button
//               onClick={exportJSON}
//               className="bg-purple-500 text-white px-4 py-2 rounded"
//             >
//               Export JSON
//             </button>
//             <button
//               onClick={sendFlowToAPI}
//               className="bg-slate-500 text-white px-4 py-2 rounded"
//             >
//               Save Flow
//             </button>
//           </div>
//           <div className="flex-1">
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onNodeClick={(e, node) => setSelectedNode(node)}
//               nodeTypes={{
//                 question: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//                 response: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//                 decision: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//               }}
//               fitView
//             >
//               <Background />
//               <Controls />
//             </ReactFlow>
//           </div>
//         </div>
//         <div className="w-64 bg-white shadow p-4 flex-shrink-0">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               // onChange={(e) => setNewFlowName(e.target.value)}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2">
//             {Object.keys(flows).map(flowName => (
//               <button
//                 key={flowName}
//                 onClick={() => setCurrentFlow(flowName)}
//                 className={`w-full text-left p-2 rounded ${currentFlow === flowName ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
//                   }`}
//               >
//                 {flowName}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;































// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";

// const nodeTypesConfig = {
//   question: { bg: "bg-blue-100", text: "text-blue-800" },
//   response: { bg: "bg-green-100", text: "text-green-800" },
//   decision: { bg: "bg-yellow-100", text: "text-yellow-800" },
// };

// const questionTypes = ["checkbox", "dropdown", "text", "image", "button", "query", "fetch"];

// const CustomNode = ({ data, id, type, onEdit, onRemove }) => {
//   const nodeStyle = nodeTypesConfig[type] || nodeTypesConfig["question"];
//   const labelInputRef = useRef(null);
//   const urlInputRef = useRef(null);
//   const buttonInputRef = useRef(null);
//   const queryInputRef = useRef(null);
//   const fetchUrlRef = useRef(null);
//   const fetchTokenRef = useRef(null);
//   const fetchPayloadRef = useRef(null);
//   const fetchTypeRef = useRef(null);
//   const fetchMethodRef = useRef(null);

//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   const handleInputChange = (e) => {
//     onEdit(id, {
//       label: e.target.value,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleQuestionTypeChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: e.target.value,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleImageUrlChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: e.target.value,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: data.buttonText,
//       queryText: data.queryText,
//     });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         onEdit(id, {
//           label: data.label,
//           questionType: data.questionType,
//           pastedImageUrl: data.pastedImageUrl,
//           uploadedImageUrl: event.target.result,
//           uploadedImageName: file.name,
//           buttonText: data.buttonText,
//           queryText: data.queryText,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleButtonTextChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       buttonText: e.target.value,
//     });
//   };

//   const handleQueryTextChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       queryText: e.target.value,
//     });
//   };

//   const handleFetchFieldChange = (field) => (e) => {
//     onEdit(id, {
//       ...data,
//       [field]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   useEffect(() => {
//     if (data.questionType === "image" && document.activeElement !== urlInputRef.current) {
//       urlInputRef.current.focus();
//     }
//   }, [data.pastedImageUrl, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "button" && document.activeElement !== buttonInputRef.current) {
//       buttonInputRef.current.focus();
//     }
//   }, [data.buttonText, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "query" && document.activeElement !== queryInputRef.current) {
//       queryInputRef.current.focus();
//     }
//   }, [data.queryText, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchUrlRef.current) {
//       fetchUrlRef.current.focus();
//     }
//   }, [data.fetchUrl, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTokenRef.current) {
//       fetchTokenRef.current.focus();
//     }
//   }, [data.fetchToken, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchPayloadRef.current) {
//       fetchPayloadRef.current.focus();
//     }
//   }, [data.fetchPayload, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTypeRef.current) {
//       fetchTypeRef.current.focus();
//     }
//   }, [data.fetchType, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchMethodRef.current) {
//       fetchMethodRef.current.focus();
//     }
//   }, [data.fetchMethod, data.questionType]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-48 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => e.stopPropagation()}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <>
//           <select
//             value={data.questionType}
//             onChange={handleQuestionTypeChange}
//             onClick={(e) => e.stopPropagation()}
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//           >
//             {questionTypes.map((qType) => (
//               <option key={qType} value={qType}>
//                 {qType.charAt(0).toUpperCase() + qType.slice(1)}
//               </option>
//             ))}
//           </select>
//           {data.questionType === "image" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={urlInputRef}
//                 type="text"
//                 value={data.pastedImageUrl}
//                 onChange={handleImageUrlChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Paste Image URL"
//               />
//               <p>or</p>
//               <div className="flex flex-col w-full">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   onClick={(e) => e.stopPropagation()}
//                   className="hidden"
//                   id={`customFileInput-${id}`}
//                 />
//                 <label
//                   htmlFor={`customFileInput-${id}`}
//                   className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm text-center"
//                 >
//                   Upload Image
//                 </label>
//                 {data.uploadedImageName && (
//                   <span
//                     className="w-full text-sm mt-1 truncate"
//                     title={data.uploadedImageName}
//                   >
//                     {data.uploadedImageName}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}
//           {data.questionType === "button" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={buttonInputRef}
//                 type="text"
//                 value={data.buttonText}
//                 onChange={handleButtonTextChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Enter Button Name"
//               />
//             </div>
//           )}
//           {data.questionType === "query" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={queryInputRef}
//                 type="text"
//                 value={data.queryText}
//                 onChange={handleQueryTextChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Enter Query Name"
//               />
//             </div>
//           )}
//           {data.questionType === "fetch" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={fetchUrlRef}
//                 type="text"
//                 value={data.fetchUrl}
//                 onChange={handleFetchFieldChange("fetchUrl")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter URL"
//               />
//               <input
//                 ref={fetchTokenRef}
//                 type="text"
//                 value={data.fetchToken}
//                 onChange={handleFetchFieldChange("fetchToken")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Token"
//               />
//               <input
//                 ref={fetchPayloadRef}
//                 type="text"
//                 value={data.fetchPayload}
//                 onChange={handleFetchFieldChange("fetchPayload")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Payload"
//               />
//               <input
//                 ref={fetchTypeRef}
//                 type="text"
//                 value={data.fetchType}
//                 onChange={handleFetchFieldChange("fetchType")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Type"
//               />
//               <input
//                 ref={fetchMethodRef}
//                 type="text"
//                 value={data.fetchMethod}
//                 onChange={handleFetchFieldChange("fetchMethod")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Method"
//               />
//             </div>
//           )}
//         </>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// // Commented out static flowData
// /*
// const flowData = {
//   "nodes": [
//     {
//       "id": "9a2b596b-2776-430b-9055-1540ce988ed4",
//       "type": "question",
//       "level": 1,
//       "label": "Thank you.",
//       "questionType": "text",
//       "pastedImageUrl": null,
//       "uploadedImageUrl": null,
//       "uploadedImageName": null,
//       "buttonText": null,
//       "queryText": null,
//       "fetchUrl": null,
//       "fetchToken": null,
//       "fetchPayload": null,
//       "fetchType": null,
//       "fetchMethod": null,
//       "position": { "x": 839.532189870936, "y": 234.48587067643695 }
//     },
//     // ... (rest of the nodes)
//   ],
//   "edges": [
//     {
//       "source": "cb6260da-0f06-4ec1-9795-d3a483bf61e5",
//       "target": "835c2aab-837e-443e-a0f3-72e7549729eb"
//     },
//     // ... (rest of the edges)
//   ]
// };
// */

// // Commented out static initialFlows and replaced with an empty default state
// /*
// const initialFlows = {
//   "Flow 1": {
//     nodes: flowData.nodes.map(node => ({
//       id: node.id,
//       type: node.type,
//       level: node.level,
//       position: node.position,
//       data: {
//         label: node.label,
//         questionType: node.questionType,
//         pastedImageUrl: node.pastedImageUrl,
//         uploadedImageUrl: node.uploadedImageUrl,
//         uploadedImageName: node.uploadedImageName,
//         buttonText: node.buttonText,
//         queryText: node.queryText,
//         fetchUrl: node.fetchUrl,
//         fetchToken: node.fetchToken,
//         fetchPayload: node.fetchPayload,
//         fetchType: node.fetchType,
//         fetchMethod: node.fetchMethod
//       }
//     })),
//     edges: flowData.edges.map(edge => ({
//       id: `${edge.source}-${edge.target}`,
//       source: edge.source,
//       target: edge.target,
//       animated: true
//     }))
//   },
//   "Flow 2": {
//     nodes: [
//       {
//         id: uuidv4(),
//         type: "question",
//         level: 1,
//         position: { x: 100, y: 100 },
//         data: {
//           label: "Start of Flow 2",
//           questionType: "text",
//           pastedImageUrl: "",
//           uploadedImageUrl: "",
//           uploadedImageName: "",
//           buttonText: "",
//           queryText: "",
//           fetchUrl: "",
//           fetchToken: "",
//           fetchPayload: "",
//           fetchType: "",
//           fetchMethod: ""
//         }
//       }
//     ],
//     edges: []
//   }
// };
// */

// // New default initial state (empty flow)
// const defaultInitialFlows = {
//   "Default Flow": {
//     nodes: [],
//     edges: []
//   }
// };

// const ChatbotFlow = () => {
//   const [flows, setFlows] = useState(defaultInitialFlows);
//   const [currentFlow, setCurrentFlow] = useState("Default Flow");
//   const [newFlowName, setNewFlowName] = useState("");
//   const [selectedNode, setSelectedNode] = useState(null);
//   const newFlowInputRef = useRef(null);

//   console.log("newFlowName", newFlowName);

//   const nodes = flows[currentFlow].nodes;
//   const edges = flows[currentFlow].edges;

//   const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   console.log("currentFlow", currentFlow);

//   const onNodesChange = useCallback(
//     (changes) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge({ ...connection, animated: true }, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question", level = 1) => {
//     const newNode = {
//       id: uuidv4(),
//       type,
//       level,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: type === "question" ? {
//         label: "",
//         questionType: "text",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         buttonText: "",
//         queryText: "",
//         fetchUrl: "",
//         fetchToken: "",
//         fetchPayload: "",
//         fetchType: "",
//         fetchMethod: ""
//       } : { label: "" },
//     };
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode]
//       }
//     }));
//   };

//   const removeNode = (id) => {
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         nodes: prevFlows[currentFlow].nodes.filter(node => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(edge => edge.source !== id && edge.target !== id)
//       }
//     }));
//     if (selectedNode?.id === id) setSelectedNode(null);
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map(node =>
//             node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
//           )
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [newFlowName]: {
//         nodes: [],
//         edges: []
//       }
//     }));
//     setCurrentFlow(newFlowName);
//     setNewFlowName("");
//   };

//   const exportJSON = () => {
//     const jsonStructure = {
//       flow: {
//         name: currentFlow
//       },
//       nodes: flows[currentFlow].nodes.map(node => ({
//         id: node.id,
//         type: node.type,
//         level: node.level,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         buttonText: node.data.buttonText || null,
//         queryText: node.data.queryText || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         position: node.position
//       })),
//       edges: flows[currentFlow].edges.map(edge => ({
//         source: edge.source,
//         target: edge.target
//       }))
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   const sendFlowToAPI = async () => {
//     try {
//       const flowData = exportJSON();
//       const response = await axios.post(
//         'https://api-xpresschat.fixall.ai/api/whatsapp/flow/create',
//         flowData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDgwZDgwZjkxOWM4ZDRkYmY0ZDRmNSIsInVzZXJfaWQiOiIxMDAwMDAyIiwiZW1haWwiOiJzb21uYXRoQGdtYWlsLmNvbSIsImlhdCI6MTc0MjkwNTcyMCwiZXhwIjoxNzQyOTM0NTIwfQ.3OdwaQiUFyYdLPhc-jc6tKQfa3laczXXEYGI8SA-vmc'
//           }
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success('Flow saved successfully!');
//       } else {
//         toast.error('Failed to save flow. Please try again.');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error sending flow to API:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
//       throw error;
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex space-x-4 bg-white shadow">
//             <button
//               onClick={() => addNode("question")}
//               className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Question
//             </button>
//             <button
//               onClick={() => addNode("response")}
//               className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Response
//             </button>
//             <button
//               onClick={() => addNode("decision")}
//               className="bg-yellow-500 text-white px-2 py-2 rounded flex items-center gap-4"
//             >
//               <FiPlus /> Add Decision
//             </button>
//             <button
//               onClick={exportJSON}
//               className="bg-purple-500 text-white px-4 py-2 rounded"
//             >
//               Export JSON
//             </button>
//             <button
//               onClick={sendFlowToAPI}
//               className="bg-slate-500 text-white px-4 py-2 rounded"
//             >
//               Save Flow
//             </button>
//           </div>
//           <div className="flex-1">
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onNodeClick={(e, node) => setSelectedNode(node)}
//               nodeTypes={{
//                 question: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//                 response: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//                 decision: (props) => (
//                   <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                 ),
//               }}
//               fitView
//             >
//               <Background />
//               <Controls />
//             </ReactFlow>
//           </div>
//         </div>
//         <div className="w-64 bg-white shadow p-4 flex-shrink-0">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2">
//             {Object.keys(flows).map(flowName => (
//               <button
//                 key={flowName}
//                 onClick={() => setCurrentFlow(flowName)}
//                 className={`w-full text-left p-2 rounded ${currentFlow === flowName ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
//                   }`}
//               >
//                 {flowName}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;



























// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getCookie } from "../config/webStorage";
// import { apiurl } from "../config/config";

// // const nodeTypesConfig = {
// //   question: { bg: "bg-blue-100", text: "text-blue-800" },
// //   response: { bg: "bg-green-100", text: "text-green-800" },
// //   decision: { bg: "bg-yellow-100", text: "text-yellow-800" },
// // };

// const nodeTypesConfig = {
//   text: { bg: "bg-blue-100", text: "text-blue-800" },
//   button: { bg: "bg-green-100", text: "text-green-800" },
//   query: { bg: "bg-yellow-100", text: "text-yellow-800" },
// };

// // const questionTypes = ["checkbox", "dropdown", "text", "image", "button", "query", "fetch"];
// const questionTypes = ["text", "button", "query"];

// const CustomNode = ({ data, id, type, onEdit, onRemove }) => {
//   // const nodeStyle = nodeTypesConfig[type] || nodeTypesConfig["question"];
//   const nodeStyle = nodeTypesConfig[data.questionType] || nodeTypesConfig["text"];

//   const labelInputRef = useRef(null);
//   const urlInputRef = useRef(null);
//   const fetchUrlRef = useRef(null);
//   const fetchTokenRef = useRef(null);
//   const fetchPayloadRef = useRef(null);
//   const fetchTypeRef = useRef(null);
//   const fetchMethodRef = useRef(null);

//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   const handleInputChange = (e) => {
//     onEdit(id, {
//       label: e.target.value,
//       questionType: data.questionType,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleQuestionTypeChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: e.target.value,
//       pastedImageUrl: data.pastedImageUrl,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//       fetchUrl: data.fetchUrl,
//       fetchToken: data.fetchToken,
//       fetchPayload: data.fetchPayload,
//       fetchType: data.fetchType,
//       fetchMethod: data.fetchMethod,
//     });
//   };

//   const handleImageUrlChange = (e) => {
//     onEdit(id, {
//       label: data.label,
//       questionType: data.questionType,
//       pastedImageUrl: e.target.value,
//       uploadedImageUrl: data.uploadedImageUrl,
//       uploadedImageName: data.uploadedImageName,
//     });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         onEdit(id, {
//           label: data.label,
//           questionType: data.questionType,
//           pastedImageUrl: data.pastedImageUrl,
//           uploadedImageUrl: event.target.result,
//           uploadedImageName: file.name,
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleFetchFieldChange = (field) => (e) => {
//     onEdit(id, {
//       ...data,
//       [field]: e.target.value,
//     });
//   };

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   useEffect(() => {
//     if (data.questionType === "image" && document.activeElement !== urlInputRef.current) {
//       urlInputRef.current.focus();
//     }
//   }, [data.pastedImageUrl, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchUrlRef.current) {
//       fetchUrlRef.current.focus();
//     }
//   }, [data.fetchUrl, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTokenRef.current) {
//       fetchTokenRef.current.focus();
//     }
//   }, [data.fetchToken, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchPayloadRef.current) {
//       fetchPayloadRef.current.focus();
//     }
//   }, [data.fetchPayload, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchTypeRef.current) {
//       fetchTypeRef.current.focus();
//     }
//   }, [data.fetchType, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchMethodRef.current) {
//       fetchMethodRef.current.focus();
//     }
//   }, [data.fetchMethod, data.questionType]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-48 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => e.stopPropagation()}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <>
//           <select
//             value={data.questionType}
//             onChange={handleQuestionTypeChange}
//             onClick={(e) => e.stopPropagation()}
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//           >
//             {questionTypes.map((qType) => (
//               <option key={qType} value={qType}>
//                 {qType.charAt(0).toUpperCase() + qType.slice(1)}
//               </option>
//             ))}
//           </select>
//           {data.questionType === "image" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={urlInputRef}
//                 type="text"
//                 value={data.pastedImageUrl}
//                 onChange={handleImageUrlChange}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 truncate`}
//                 placeholder="Paste Image URL"
//               />
//               <p>or</p>
//               <div className="flex flex-col w-full">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                   onClick={(e) => e.stopPropagation()}
//                   className="hidden"
//                   id={`customFileInput-${id}`}
//                 />
//                 <label
//                   htmlFor={`customFileInput-${id}`}
//                   className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm text-center"
//                 >
//                   Upload Image
//                 </label>
//                 {data.uploadedImageName && (
//                   <span
//                     className="w-full text-sm mt-1 truncate"
//                     title={data.uploadedImageName}
//                   >
//                     {data.uploadedImageName}
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}
//           {data.questionType === "fetch" && (
//             <div className="flex flex-col gap-2 w-full overflow-hidden">
//               <input
//                 ref={fetchUrlRef}
//                 type="text"
//                 value={data.fetchUrl}
//                 onChange={handleFetchFieldChange("fetchUrl")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter URL"
//               />
//               <input
//                 ref={fetchTokenRef}
//                 type="text"
//                 value={data.fetchToken}
//                 onChange={handleFetchFieldChange("fetchToken")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Token"
//               />
//               <input
//                 ref={fetchPayloadRef}
//                 type="text"
//                 value={data.fetchPayload}
//                 onChange={handleFetchFieldChange("fetchPayload")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Payload"
//               />
//               <input
//                 ref={fetchTypeRef}
//                 type="text"
//                 value={data.fetchType}
//                 onChange={handleFetchFieldChange("fetchType")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg植物-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Type"
//               />
//               <input
//                 ref={fetchMethodRef}
//                 type="text"
//                 value={data.fetchMethod}
//                 onChange={handleFetchFieldChange("fetchMethod")}
//                 onKeyDown={handleKeyDown}
//                 onClick={(e) => e.stopPropagation()}
//                 className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//                 placeholder="Enter Method"
//               />
//             </div>
//           )}
//         </>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// const ChatbotFlow = () => {
//   const token = getCookie("sctoken");
//   const [flows, setFlows] = useState({});
//   const [currentFlow, setCurrentFlow] = useState("");
//   const [newFlowName, setNewFlowName] = useState("");
//   const [selectedNode, setSelectedNode] = useState(null);
//   const newFlowInputRef = useRef(null);

//   console.log("newFlowName", newFlowName);

//   const nodes = flows[currentFlow]?.nodes || [];
//   const edges = flows[currentFlow]?.edges || [];

//   const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   console.log("currentFlow", currentFlow);

//   const onNodesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge({ ...connection, animated: true }, prevFlows[currentFlow].edges)
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question", level = 1) => {
//     if (!currentFlow) return;
//     const newNode = {
//       id: uuidv4(),
//       type,
//       level,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: type === "question" ? {
//         label: "",
//         questionType: "text",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         fetchUrl: "",
//         fetchToken: "",
//         fetchPayload: "",
//         fetchType: "",
//         fetchMethod: ""
//       } : { label: "" },
//     };
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode]
//       }
//     }));
//   };

//   const removeNode = (id) => {
//     if (!currentFlow) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         nodes: prevFlows[currentFlow].nodes.filter(node => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(edge => edge.source !== id && edge.target !== id)
//       }
//     }));
//     if (selectedNode?.id === id) setSelectedNode(null);
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map(node =>
//             node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
//           )
//         }
//       }));
//     },
//     [currentFlow]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [newFlowName]: {
//         nodes: [],
//         edges: []
//       }
//     }));
//     setCurrentFlow(newFlowName);
//     setNewFlowName("");
//   };

//   const exportJSON = () => {
//     if (!currentFlow) return;
//     const jsonStructure = {
//       flow: {
//         name: currentFlow
//       },
//       nodes: flows[currentFlow].nodes.map(node => ({
//         id: node.id,
//         type: node.type,
//         level: node.level,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         position: node.position
//       })),
//       edges: flows[currentFlow].edges.map(edge => ({
//         source: edge.source,
//         target: edge.target
//       }))
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   const sendFlowToAPI = async () => {
//     if (!currentFlow) return;
//     try {
//       const flowData = exportJSON();
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/create`,
//         flowData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || 'Flow saved successfully!');
//       } else {
//         toast.error(response?.data?.message || 'Failed to save flow. Please try again.');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error sending flow to API:', error);
//       if (error.response) {
//         console.error('Response data:', error.response.data);
//         console.error('Response status:', error.response.status);
//       } else if (error.request) {
//         console.error('No response received:', error.request);
//       } else {
//         console.error('Error message:', error.message);
//       }
//       throw error;
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex space-x-4 bg-white shadow">
//             <button
//               onClick={() => addNode("question")}
//               className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-4"
//               disabled={!currentFlow}
//             >
//               <FiPlus /> Add Node
//             </button>
//             {/* <button
//                 onClick={() => addNode("response")}
//                 className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-4"
//                 disabled={!currentFlow}
//               >
//                 <FiPlus /> Add Response
//               </button>
//               <button
//                 onClick={() => addNode("decision")}
//                 className="bg-yellow-500 text-white px-2 py-2 rounded flex items-center gap-4"
//                 disabled={!currentFlow}
//               >
//                 <FiPlus /> Add Decision
//               </button>
//               <button
//                 onClick={exportJSON}
//                 className="bg-purple-500 text-white px-4 py-2 rounded"
//                 disabled={!currentFlow}
//               >
//                 Export JSON
//               </button> */}
//             <button
//               onClick={sendFlowToAPI}
//               className="bg-slate-500 text-white px-4 py-2 rounded"
//               disabled={!currentFlow}
//             >
//               Save Flow
//             </button>
//           </div>
//           <div className="flex-1">
//             {currentFlow ? (
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 onNodeClick={(e, node) => setSelectedNode(node)}
//                 nodeTypes={{
//                   question: (props) => (
//                     <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                   ),
//                   response: (props) => (
//                     <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                   ),
//                   decision: (props) => (
//                     <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                   ),
//                 }}
//                 fitView
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             ) : (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 Please create or select a flow to begin.
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-64 bg-white shadow p-4 flex-shrink-0">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2">
//             {Object.keys(flows).map(flowName => (
//               <button
//                 key={flowName}
//                 onClick={() => setCurrentFlow(flowName)}
//                 className={`w-full text-left p-2 rounded ${currentFlow === flowName ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
//               >
//                 {flowName}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;









































































// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getCookie } from "../config/webStorage";
// import { apiurl } from "../config/config";

// const nodeTypesConfig = {
//   text: { bg: "bg-blue-100", text: "text-blue-800" },
//   button: { bg: "bg-green-100", text: "text-green-800" },
//   query: { bg: "bg-yellow-100", text: "text-yellow-800" },
// };

// const questionTypes = ["text", "button", "query"];

// const CustomNode = ({ data, id, type, onEdit, onRemove }) => {
//   const nodeStyle = nodeTypesConfig[data.questionType] || nodeTypesConfig["text"];
//   const labelInputRef = useRef(null);

//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   const handleInputChange = (e) => {
//     onEdit(id, { ...data, label: e.target.value });
//   };

//   const handleQuestionTypeChange = (e) => {
//     onEdit(id, { ...data, questionType: e.target.value });
//   };

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-48 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => e.stopPropagation()}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <select
//           value={data.questionType}
//           onChange={handleQuestionTypeChange}
//           onClick={(e) => e.stopPropagation()}
//           className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//         >
//           {questionTypes.map((qType) => (
//             <option key={qType} value={qType}>
//               {qType.charAt(0).toUpperCase() + qType.slice(1)}
//             </option>
//           ))}
//         </select>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// const ChatbotFlow = () => {
//   const token = getCookie("sctoken");
//   const [flows, setFlows] = useState({});
//   const [currentFlow, setCurrentFlow] = useState("");
//   const [newFlowName, setNewFlowName] = useState("");
//   const newFlowInputRef = useRef(null);

//     const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   const fetchFlows = async () => {
//     try {
//       const response = await axios.get(
//         `${apiurl}/api/whatsapp/flow/getFlows`,
//         {
//           headers: {
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         const fetchedFlows = response.data.data.reduce((acc, flowData) => {
//           const flowKey = `${flowData.flow.name}_${flowData.flow.id}`;
//           acc[flowKey] = {
//             name: flowData.flow.name || `Flow_${flowData.flow.id}`, // Fallback if name is missing
//             id: flowData.flow.id,
//             status: flowData.flow.status,
//             nodes: flowData.nodes.map(node => ({
//               id: node.id,
//               type: node.type,
//               position: node.position,
//               data: {
//                 label: node.label,
//                 questionType: node.questionType,
//                 pastedImageUrl: node.pastedImageUrl,
//                 uploadedImageUrl: node.uploadedImageUrl,
//                 uploadedImageName: node.uploadedImageName,
//                 fetchUrl: node.fetchUrl,
//                 fetchToken: node.fetchToken,
//                 fetchPayload: node.fetchPayload,
//                 fetchType: node.fetchType,
//                 fetchMethod: node.fetchMethod,
//               },
//             })),
//             edges: flowData.edges.map(edge => ({
//               id: `${edge.source}-${edge.target}`,
//               source: edge.source,
//               target: edge.target,
//               animated: true,
//             })),
//           };
//           return acc;
//         }, {});
//         setFlows(fetchedFlows);
//         if (Object.keys(fetchedFlows).length > 0) {
//           setCurrentFlow(Object.keys(fetchedFlows)[0]);
//         }
//       } else {
//         toast.error("Failed to fetch flows");
//       }
//     } catch (error) {
//       console.error("Error fetching flows:", error);
//       toast.error("Error fetching flows");
//     }
//   };

//   useEffect(() => {
//     fetchFlows();
//   }, []);

//   const nodes = flows[currentFlow]?.nodes || [];
//   const edges = flows[currentFlow]?.edges || [];

//   const onNodesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge({ ...connection, animated: true }, prevFlows[currentFlow].edges),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question") => {
//     if (!currentFlow) return;
//     const newNode = {
//       id: uuidv4(),
//       type,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: {
//         label: "",
//         questionType: "text",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         fetchUrl: "",
//         fetchToken: "",
//         fetchPayload: "",
//         fetchType: "",
//         fetchMethod: "",
//       },
//     };
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode],
//       },
//     }));
//   };

//   const removeNode = (id) => {
//     if (!currentFlow) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: prevFlows[currentFlow].nodes.filter(node => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(edge => edge.source !== id && edge.target !== id),
//       },
//     }));
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map(node =>
//             node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
//           ),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     const newFlowKey = `${newFlowName}_${uuidv4().slice(0, 5)}`;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [newFlowKey]: {
//         name: newFlowName,
//         id: null,
//         status: "in-active",
//         nodes: [],
//         edges: [],
//       },
//     }));
//     setCurrentFlow(newFlowKey);
//     setNewFlowName("");
//   };

//   const toggleFlowStatus = () => {
//     if (!currentFlow) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         status: prevFlows[currentFlow].status === "active" ? "in-active" : "active",
//       },
//     }));
//   };

//   const exportJSON = () => {
//     if (!currentFlow) return;
//     const flowData = flows[currentFlow];
//     const jsonStructure = {
//       flow: {
//         name: flowData.name,
//         ...(flowData.id && { id: flowData.id }),
//         status: flowData.status || "in-active",
//       },
//       nodes: flowData.nodes.map(node => ({
//         id: node.id,
//         type: node.type,
//         level: 1,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         position: node.position,
//       })),
//       edges: flowData.edges.map(edge => ({
//         source: edge.source,
//         target: edge.target,
//       })),
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   const sendFlowToAPI = async () => {
//     if (!currentFlow) return;
//     try {
//       const flowData = exportJSON();
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/create`,
//         flowData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || 'Flow saved successfully!');
//         if (response.data.data?.flow?.id) {
//           const newFlowKey = `${flowData.flow.name}_${response.data.data.flow.id}`;
//           setFlows(prevFlows => {
//             const updatedFlows = { ...prevFlows };
//             if (newFlowKey !== currentFlow) {
//               updatedFlows[newFlowKey] = {
//                 ...prevFlows[currentFlow],
//                 id: response.data.data.flow.id,
//               };
//               delete updatedFlows[currentFlow];
//             } else {
//               updatedFlows[currentFlow].id = response.data.data.flow.id;
//             }
//             return updatedFlows;
//           });
//           setCurrentFlow(newFlowKey);
//         }
//       } else {
//         toast.error(response?.data?.message || 'Failed to save flow. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending flow to API:', error);
//       toast.error('Error saving flow');
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex space-x-4 bg-white shadow items-center">
//             <button
//               onClick={() => addNode("question")}
//               className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-4"
//               disabled={!currentFlow}
//             >
//               <FiPlus /> Add Node
//             </button>
//             <button
//               onClick={exportJSON}
//               className="bg-purple-500 text-white px-4 py-2 rounded"
//             >
//               Export JSON
//             </button>
//             <button
//               onClick={sendFlowToAPI}
//               className="bg-slate-500 text-white px-4 py-2 rounded"
//               disabled={!currentFlow}
//             >
//               Save Flow
//             </button>
//             <label className="relative inline-flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={flows[currentFlow]?.status === "active"}
//                 onChange={toggleFlowStatus}
//                 className="sr-only peer"
//                 disabled={!currentFlow}
//               />
//               <div
//                 className={`w-12 h-6 p-1 rounded-full flex flex-shrink-0 items-center peer peer-focus:ring-4 peer-focus:ring-blue-300
//                 ${flows[currentFlow]?.status === "active" ? "bg-green-500" : "bg-gray-200"}
//                 peer-checked:bg-green-500 peer-disabled:opacity-50`}
//               >
//                 <div
//                   className={`w-5 h-5 bg-white rounded-full border border-gray-300 transition-all
//                   ${flows[currentFlow]?.status === "active" ? "translate-x-5" : "translate-x-0"}`}
//                 ></div>
//               </div>
//             </label>
//           </div>
//           <div className="flex-1">
//             {currentFlow ? (
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 nodeTypes={{
//                   question: (props) => (
//                     <CustomNode {...props} onEdit={editNodeLabel} onRemove={removeNode} />
//                   ),
//                 }}
//                 fitView
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             ) : (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 Please create or select a flow to begin.
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="w-64 bg-white shadow p-4 flex-shrink-0">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               // onChange={(e) => setNewFlowName(e.target.value)}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-blue-500 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2 h-[80%] overflow-y-scroll">
//             {Object.keys(flows).map(flowKey => (
//               <button
//                 key={flowKey}
//                 onClick={() => setCurrentFlow(flowKey)}
//                 className={`w-full text-left p-2 rounded ${currentFlow === flowKey ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
//               >
//                 {flows[flowKey]?.name || "Unnamed Flow"}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;

































































// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getCookie } from "../config/webStorage";
// import { apiurl } from "../config/config";
// import { VscVmActive } from "react-icons/vsc";
// import { IoInformationCircleOutline } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";




// const nodeTypesConfig = {
//   text: { bg: "bg-blue-100", text: "text-blue-800" },
//   button: { bg: "bg-green-100", text: "text-green-800" },
//   query: { bg: "bg-yellow-100", text: "text-yellow-800" },
// };

// const questionTypes = ["text", "button", "query","fetch"];

// const CustomNode = ({ data, id, type, onEdit, onRemove, onNodeClick }) => {
//   const nodeStyle = nodeTypesConfig[data.questionType] || nodeTypesConfig["text"];
//   const labelInputRef = useRef(null);

//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   const handleInputChange = (e) => {
//     onEdit(id, { ...data, label: e.target.value });
//   };

//   const handleQuestionTypeChange = (e) => {
//     onEdit(id, { ...data, questionType: e.target.value });
//   };

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-48 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => {
//           e.stopPropagation();
//           onNodeClick(id, data.label);
//         }}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <select
//           value={data.questionType}
//           onChange={handleQuestionTypeChange}
//           onClick={(e) => e.stopPropagation()}
//           className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//         >
//           {questionTypes.map((qType) => (
//             <option key={qType} value={qType}>
//               {qType.charAt(0).toUpperCase() + qType.slice(1)}
//             </option>
//           ))}
//         </select>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// const ChatbotFlow = () => {
//   const token = getCookie("sctoken");
//   const [flows, setFlows] = useState({});
//   const [currentFlow, setCurrentFlow] = useState("");
//   const [newFlowName, setNewFlowName] = useState("");
//   const [selectedNodeId, setSelectedNodeId] = useState(null);
//   const [bigInputContent, setBigInputContent] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [isInfoVisible, setInfoVisible] = useState(false);


//   const newFlowInputRef = useRef(null);
//   const bigInputRef = useRef(null);

//   const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   const fetchFlows = async () => {
//     try {
//       const response = await axios.get(
//         `${apiurl}/api/whatsapp/flow/getFlows`,
//         {
//           headers: {
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         const fetchedFlows = response.data.data.reduce((acc, flowData) => {
//           const flowKey = `${flowData.flow.name}_${flowData.flow.id}`;
//           acc[flowKey] = {
//             name: flowData.flow.name || `Flow_${flowData.flow.id}`,
//             id: flowData.flow.id,
//             status: flowData.flow.status,
//             nodes: flowData.nodes.map(node => ({
//               id: node.id,
//               type: node.type,
//               position: node.position,
//               data: {
//                 label: node.label,
//                 questionType: node.questionType,
//                 pastedImageUrl: node.pastedImageUrl,
//                 uploadedImageUrl: node.uploadedImageUrl,
//                 uploadedImageName: node.uploadedImageName,
//                 fetchUrl: node.fetchUrl,
//                 fetchToken: node.fetchToken,
//                 fetchPayload: node.fetchPayload,
//                 fetchType: node.fetchType,
//                 fetchMethod: node.fetchMethod,
//               },
//             })),
//             edges: flowData.edges.map(edge => ({
//               id: `${edge.source}-${edge.target}`,
//               source: edge.source,
//               target: edge.target,
//               animated: true,
//             })),
//           };
//           return acc;
//         }, {});
//         setFlows(fetchedFlows);
//         if (Object.keys(fetchedFlows).length > 0) {
//           setCurrentFlow(Object.keys(fetchedFlows)[0]);
//         }
//       } else {
//         toast.error("Failed to fetch flows");
//       }
//     } catch (error) {
//       console.error("Error fetching flows:", error);
//       toast.error("Error fetching flows");
//     }
//   };

//   useEffect(() => {
//     fetchFlows();
//   }, []);

//   const nodes = flows[currentFlow]?.nodes || [];
//   const edges = flows[currentFlow]?.edges || [];

//   const onNodesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge({ ...connection, animated: true }, prevFlows[currentFlow].edges),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question") => {
//     if (!currentFlow) return;
//     const newNode = {
//       Snippets: true,
//       id: uuidv4(),
//       type,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: {
//         label: "",
//         questionType: "text",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         fetchUrl: "",
//         fetchToken: "",
//         fetchPayload: "",
//         fetchType: "",
//         fetchMethod: "",
//       },
//     };
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode],
//       },
//     }));
//   };

//   const removeNode = (id) => {
//     if (!currentFlow) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: prevFlows[currentFlow].nodes.filter(node => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(edge => edge.source !== id && edge.target !== id),
//       },
//     }));
//     if (selectedNodeId === id) {
//       setSelectedNodeId(null);
//       setBigInputContent("");
//     }
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       if (!currentFlow) return;
//       setFlows(prevFlows => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map(node =>
//             node.id === id ? { ...node, data: { ...node.data, ...updatedData } } : node
//           ),
//         },
//       }));
//       if (selectedNodeId === id) {
//         setBigInputContent(updatedData.label);
//       }
//     },
//     [currentFlow, selectedNodeId]
//   );

//   const handleNodeClick = (id, label) => {
//     setSelectedNodeId(id);
//     setBigInputContent(label);
//     setTimeout(() => {
//       if (bigInputRef.current) {
//         bigInputRef.current.focus();
//       }
//     }, 0);
//   };

//   const handleBigInputChange = useCallback(
//     (e) => {
//       const newValue = e.target.value;
//       setBigInputContent(newValue);
//       if (selectedNodeId) {
//         editNodeLabel(selectedNodeId, { label: newValue });
//       }
//       // Use setTimeout to ensure focus is maintained after state update
//       setTimeout(() => {
//         if (bigInputRef.current && document.activeElement !== bigInputRef.current) {
//           bigInputRef.current.focus();
//         }
//       }, 0);
//     },
//     [selectedNodeId, editNodeLabel]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     const newFlowKey = `${newFlowName}_${uuidv4().slice(0, 5)}`;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [newFlowKey]: {
//         name: newFlowName,
//         id: null,
//         status: "in-active",
//         nodes: [],
//         edges: [],
//       },
//     }));
//     setCurrentFlow(newFlowKey);
//     setNewFlowName("");
//   };

//   const toggleFlowStatus = () => {
//     if (!currentFlow) return;
//     setFlows(prevFlows => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         status: prevFlows[currentFlow].status === "active" ? "in-active" : "active",
//       },
//     }));
//   };

//   const exportJSON = () => {
//     if (!currentFlow) return;
//     const flowData = flows[currentFlow];
//     const jsonStructure = {
//       flow: {
//         name: flowData.name,
//         ...(flowData.id && { id: flowData.id }),
//         status: flowData.status || "in-active",
//       },
//       nodes: flowData.nodes.map(node => ({
//         id: node.id,
//         type: node.type,
//         level: 1,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         position: node.position,
//       })),
//       edges: flowData.edges.map(edge => ({
//         source: edge.source,
//         target: edge.target,
//       })),
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   const sendFlowToAPI = async () => {
//     if (!currentFlow) return;
//     try {
//       const flowData = exportJSON();
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/create`,
//         flowData,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`,
//           },
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || 'Flow saved successfully!');
//         if (response.data.data?.flow?.id) {
//           const newFlowKey = `${flowData.flow.name}_${response.data.data.flow.id}`;
//           setFlows(prevFlows => {
//             const updatedFlows = { ...prevFlows };
//             if (newFlowKey !== currentFlow) {
//               updatedFlows[newFlowKey] = {
//                 ...prevFlows[currentFlow],
//                 id: response.data.data.flow.id,
//               };
//               delete updatedFlows[currentFlow];
//             } else {
//               updatedFlows[currentFlow].id = response.data.data.flow.id;
//             }
//             return updatedFlows;
//           });
//           setCurrentFlow(newFlowKey);
//         }
//       } else {
//         toast.error(response?.data?.message || 'Failed to save flow. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending flow to API:', error);
//       toast.error('Error saving flow');
//     }
//   };
//   const handleDelete = async () => {
//     const flowData = flows[currentFlow];

//     try {
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/delete`,
//         { // Data payload
//           flow: {
//             id: flowData?.id
//           }
//         },
//         { // Headers as separate argument
//           headers: {
//             'Content-Type': 'application/json',
//             'api_key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || 'Flow deleted successfully!');
//       } else {
//         toast.error(response?.data?.message || 'Failed to delete flow. Please try again.');
//       }

//       setShowPopup(false); // Close the popup after deletion
//     } catch (error) {
//       console.error("Error deleting flow:", error);
//       toast.error("Failed to delete flow");
//     }
//   };


//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">
//         {showPopup && (
//           <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded shadow-lg">
//               <p className="text-lg font-semibold mb-4">Are you sure you want to delete this flow?</p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                   onClick={handleDelete}
//                 >
//                   Confirm Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {isInfoVisible && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
//             <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
//               {/* Close Button */}
//               <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
//                 onClick={() => setInfoVisible(false)}
//                 aria-label="Close modal"
//               >
//                 <IoCloseOutline size={24} />
//               </button>

//               {/* Content */}
//               <h2 className="text-xl font-bold text-gray-500 mb-5 tracking-tight">
//                 How to Create a Bot Flow
//               </h2>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
//                   <span className="text-left">The button text length should be between 1 and 20 characters.</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
//                   <span className="text-left">The query text length should be between 1 and 24 characters.</span>
//                 </li>

//                 {/* <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
//                   <span className="text-left">Add decision points for user interactions.</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
//                   <span className="text-left">Use variables to store user inputs.</span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-blue-500 rounded-full" />
//                   <span className="text-left">Test your bot before deploying.</span>
//                 </li> */}
//               </ul>
//             </div>
//           </div>
//         )}
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex justify-between bg-white shadow items-center">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => addNode("question")}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base flex items-center gap-4"
//                 disabled={!currentFlow}
//               >
//                 <FiPlus /> Add Node
//               </button>
//               <button
//                 onClick={exportJSON}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//               >
//                 Export JSON
//               </button>
//               <button
//                 onClick={sendFlowToAPI}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//                 disabled={!currentFlow}
//               >
//                 Save Flow
//               </button>
//               <button
//                 className="border border-red-400 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//                 disabled={!currentFlow}
//                 onClick={() => setShowPopup(true)}
//               >
//                 Delete Flow
//               </button>
//             </div>
//             <div className="flex items-center space-x-4">

//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={flows[currentFlow]?.status === "active"}
//                   onChange={toggleFlowStatus}
//                   className="sr-only peer"
//                   disabled={!currentFlow}
//                 />
//                 <div
//                   className={`w-12 h-6 p-1 rounded-full flex flex-shrink-0 items-center peer peer-focus:ring-4 peer-focus:ring-blue-300
//                 ${flows[currentFlow]?.status === "active" ? "bg-green-200" : "bg-gray-200"}
//                 peer-checked:bg-green-200 peer-disabled:opacity-50`}
//                 >
//                   <div
//                     className={`w-5 h-5 bg-white rounded-full border border-gray-300 transition-all
//                   ${flows[currentFlow]?.status === "active" ? "translate-x-5" : "translate-x-0"}`}
//                   ></div>
//                 </div>
//               </label>
//               <div className="text-xl bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-800 cursor-pointer p-1 rounded-sm flex justify-center items-center" onClick={() => setInfoVisible(true)}>
//                 <IoInformationCircleOutline />
//               </div>
//             </div>
//           </div>
//           <div className="flex-1">
//             {currentFlow ? (
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 nodeTypes={{
//                   question: (props) => (
//                     <CustomNode
//                       {...props}
//                       onEdit={editNodeLabel}
//                       onRemove={removeNode}
//                       onNodeClick={handleNodeClick}
//                     />
//                   ),
//                 }}
//                 fitView
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             ) : (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 Please create or select a flow to begin.
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="max-w-96 bg-white shadow p-4 flex-shrink-0 flex flex-col">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2 h-[30%] overflow-y-scroll custom-scrollbar">
//             {Object.keys(flows).map(flowKey => (
//               <button
//                 key={flowKey}
//                 onClick={() => setCurrentFlow(flowKey)}
//                 className={`w-full text-left flex items-center justify-between p-2 rounded ${currentFlow === flowKey ? 'bg-light-secondary text-primary font-medium border border-primary' : 'hover:bg-gray-100'}`}
//               >
//                 {flows[flowKey]?.name || "Unnamed Flow"}
//                 {/* {flows[flowKey]?.status === "active" ? <VscVmActive color="#008000"/>  : ""} */}
//               </button>
//             ))}
//           </div>
//           <div className="flex-1 mt-4">
//             <textarea
//               ref={bigInputRef}
//               value={bigInputContent}
//               onChange={handleBigInputChange}
//               placeholder="Click a node to edit its content here, or type directly..."
//               className="w-full h-full p-4 border rounded resize-none text-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;














// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   addEdge,
//   Background,
//   Controls,
//   applyNodeChanges,
//   applyEdgeChanges,
//   Handle,
// } from "@xyflow/react";
// import "reactflow/dist/style.css";
// import '@xyflow/react/dist/style.css';
// import { FiPlus, FiX } from "react-icons/fi";
// import { v4 as uuidv4 } from "uuid";
// import Layout from "../components/layout";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { getCookie } from "../config/webStorage";
// import { apiurl } from "../config/config";
// import { VscVmActive } from "react-icons/vsc";
// import { IoInformationCircleOutline } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";

// const nodeTypesConfig = {
//   text: { bg: "bg-blue-100", text: "text-blue-800" },
//   button: { bg: "bg-green-100", text: "text-green-800" },
//   query: { bg: "bg-yellow-100", text: "text-yellow-800" },
//   fetch: { bg: "bg-purple-100", text: "text-purple-800" },
// };

// const questionTypes = ["text", "button", "query", "fetch"];

// const CustomNode = ({ data, id, type, onEdit, onRemove, onNodeClick }) => {
//   const nodeStyle = nodeTypesConfig[data.questionType] || nodeTypesConfig["text"];
//   const labelInputRef = useRef(null);
//   const fetchPayloadRef = useRef(null);
//   const fetchUrlRef = useRef(null);
//   const fetchHeadersRef = useRef(null);


//   const handleKeyDown = (e) => {
//     if (e.key === "Backspace" || e.key === "Delete") {
//       e.stopPropagation();
//     }
//   };

//   // const handleInputChange = (field) => (e) => {
//   //   let value = e.target.value;
//   //   if (field === "fetchPayload" || field === "fetchheaders") {
//   //     try {
//   //       value = value ? JSON.parse(value) : null;
//   //     } catch {
//   //       toast.error(`${field} must be valid JSON`);
//   //       return;
//   //     }
//   //   }
//   //   onEdit(id, { ...data, [field]: value });
//   // };

//   const handleInputChange = (field) => (e) => {
//     const value = e.target.value;
//     onEdit(id, { ...data, [field]: value });
//   };

//   const handleQuestionTypeChange = (e) => {
//     const newType = e.target.value;
//     let updatedData = { ...data, questionType: newType };
//     if (newType === "fetch") {
//       updatedData = {
//         ...updatedData,
//         fetchUrl: "",
//         fetchPayload: null,
//         fetchMethod: "get",
//         fetchheaders: null,
//         fetchResponse: {
//           image: false,
//           text: true,
//           options: true,
//         },
//       };
//     } else {
//       updatedData = {
//         ...updatedData,
//         fetchUrl: "",
//         fetchPayload: "",
//         fetchMethod: "",
//         fetchheaders: null,
//         fetchResponse: {},
//       };
//     }
//     onEdit(id, updatedData);
//   };

//   const handleToggleChange = (field) => () => {
//     onEdit(id, {
//       ...data,
//       fetchResponse: {
//         ...data.fetchResponse,
//         [field]: !data.fetchResponse[field],
//       },
//     });
//   };

//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchPayloadRef.current) {
//       fetchPayloadRef.current.focus();
//     }
//   }, [data.fetchPayload, data.questionType]);

//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchUrlRef.current) {
//       fetchUrlRef.current.focus();
//     }
//   }, [data.fetchUrl, data.questionType]);
//   useEffect(() => {
//     if (data.questionType === "fetch" && document.activeElement !== fetchHeadersRef.current) {
//       fetchHeadersRef.current.focus();
//     }
//   }, [data.fetchheaders, data.questionType]);

//   useEffect(() => {
//     if (document.activeElement !== labelInputRef.current) {
//       labelInputRef.current.focus();
//     }
//   }, [data.label]);

//   return (
//     <div
//       className={`${nodeStyle.bg} p-4 rounded shadow relative w-64 overflow-hidden`}
//       onClick={(e) => e.stopPropagation()}
//     >
//       <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
//       <input
//         ref={labelInputRef}
//         type="text"
//         value={data.label}
//         onChange={handleInputChange("label")}
//         onKeyDown={handleKeyDown}
//         onClick={(e) => {
//           e.stopPropagation();
//           onNodeClick(id, data.label);
//         }}
//         className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
//         placeholder="Enter Text"
//       />
//       {type === "question" && (
//         <select
//           value={data.questionType}
//           onChange={handleQuestionTypeChange}
//           onClick={(e) => e.stopPropagation()}
//           className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
//         >
//           {questionTypes.map((qType) => (
//             <option key={qType} value={qType}>
//               {qType.charAt(0).toUpperCase() + qType.slice(1)}
//             </option>
//           ))}
//         </select>
//       )}
//       {data.questionType === "fetch" && (
//         <div className="space-y-2">
//           <input
//             ref={fetchUrlRef}
//             type="text"
//             value={data.fetchUrl || ""}
//             onChange={handleInputChange("fetchUrl")}
//             placeholder="Fetch URL"
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//           />
//           <input
//             ref={fetchPayloadRef}
//             type="text"
//             value={data.fetchPayload || ""}
//             onChange={handleInputChange("fetchPayload")}
//             placeholder="Fetch Payload (JSON)"
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//           />
//           <select
//             value={data.fetchMethod || "get"}
//             onChange={handleInputChange("fetchMethod")}
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//           >
//             <option value="get">GET</option>
//             <option value="post">POST</option>
//             <option value="put">PUT</option>
//             <option value="delete">DELETE</option>
//           </select>
//           <input
//             ref={fetchHeadersRef}
//             type="text"
//             value={data.fetchheaders || ""}
//             onChange={handleInputChange("fetchheaders")}
//             placeholder="Fetch Headers (JSON)"
//             className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
//           />
//           <div className="flex flex-col">
//             <label className="text-sm">Fetch Response:</label>
//             <div className="flex space-x-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={data.fetchResponse?.image || false}
//                   onChange={handleToggleChange("image")}
//                   className="mr-1"
//                 />
//                 Image
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={data.fetchResponse?.text || false}
//                   onChange={handleToggleChange("text")}
//                   className="mr-1"
//                 />
//                 Text
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={data.fetchResponse?.options || false}
//                   onChange={handleToggleChange("options")}
//                   className="mr-1"
//                 />
//                 Options
//               </label>
//             </div>
//           </div>
//         </div>
//       )}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           onRemove(id);
//         }}
//         className="absolute top-1 right-1 text-red-500"
//       >
//         <FiX className="text-xs" />
//       </button>
//       <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
//     </div>
//   );
// };

// const ChatbotFlow = () => {
//   const token = getCookie("sctoken");
//   const [flows, setFlows] = useState({});
//   const [currentFlow, setCurrentFlow] = useState("");
//   const [newFlowName, setNewFlowName] = useState("");
//   const [selectedNodeId, setSelectedNodeId] = useState(null);
//   const [bigInputContent, setBigInputContent] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [isInfoVisible, setInfoVisible] = useState(false);

//   const newFlowInputRef = useRef(null);
//   const bigInputRef = useRef(null);

//   const handleFlowNameChange = (e) => {
//     setNewFlowName(e.target.value);
//     setTimeout(() => {
//       if (newFlowInputRef.current) {
//         newFlowInputRef.current.focus();
//       }
//     }, 20);
//   };

//   const fetchFlows = async () => {
//     try {
//       const response = await axios.get(`${apiurl}/api/whatsapp/flow/getFlows`, {
//         headers: {
//           api_key:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.data.success) {
//         const fetchedFlows = response.data.data.reduce((acc, flowData) => {
//           const flowKey = `${flowData.flow.name}_${flowData.flow.id}`;
//           acc[flowKey] = {
//             name: flowData.flow.name || `Flow_${flowData.flow.id}`,
//             id: flowData.flow.id,
//             status: flowData.flow.status,
//             nodes: flowData.nodes.map((node) => ({
//               id: node.id,
//               type: node.type,
//               position: node.position,
//               data: {
//                 label: node.label,
//                 questionType: node.questionType,
//                 pastedImageUrl: node.pastedImageUrl,
//                 uploadedImageUrl: node.uploadedImageUrl,
//                 uploadedImageName: node.uploadedImageName,
//                 fetchUrl: node.fetchUrl,
//                 fetchToken: node.fetchToken,
//                 fetchPayload: node.fetchPayload,
//                 fetchType: node.fetchType,
//                 fetchMethod: node.fetchMethod,
//                 fetchheaders: node.fetchheaders || null,
//                 fetchResponse: node.fetchResponse || {
//                   image: false,
//                   text: true,
//                   options: true,
//                 },
//               },
//             })),
//             edges: flowData.edges.map((edge) => ({
//               id: `${edge.source}-${edge.target}`,
//               source: edge.source,
//               edge: edge.target,
//               animated: true,
//             })),
//           };
//           return acc;
//         }, {});
//         setFlows(fetchedFlows);
//         if (Object.keys(fetchedFlows).length > 0) {
//           setCurrentFlow(Object.keys(fetchedFlows)[0]);
//         }
//       } else {
//         toast.error("Failed to fetch flows");
//       }
//     } catch (error) {
//       console.error("Error fetching flows:", error);
//       toast.error("Error fetching flows");
//     }
//   };

//   useEffect(() => {
//     fetchFlows();
//   }, []);

//   const nodes = flows[currentFlow]?.nodes || [];
//   const edges = flows[currentFlow]?.edges || [];

//   const onNodesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows((prevFlows) => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onEdgesChange = useCallback(
//     (changes) => {
//       if (!currentFlow) return;
//       setFlows((prevFlows) => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const onConnect = useCallback(
//     (connection) => {
//       if (!currentFlow) return;
//       setFlows((prevFlows) => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           edges: addEdge(
//             { ...connection, animated: true },
//             prevFlows[currentFlow].edges
//           ),
//         },
//       }));
//     },
//     [currentFlow]
//   );

//   const addNode = (type = "question") => {
//     if (!currentFlow) return;
//     const newNode = {
//       Snippets: true,
//       id: uuidv4(),
//       type,
//       position: { x: Math.random() * 400, y: Math.random() * 400 },
//       data: {
//         label: "",
//         questionType: type === "question" ? "text" : "fetch",
//         pastedImageUrl: "",
//         uploadedImageUrl: "",
//         uploadedImageName: "",
//         fetchUrl:
//           type === "question" && type !== "fetch"
//             ? ""
//             : "https://fakestoreapi.com/products",
//         fetchToken: "",
//         fetchPayload: type === "question" && type !== "fetch" ? "" : null,
//         fetchType: "",
//         fetchMethod: type === "question" && type !== "fetch" ? "" : "get",
//         fetchheaders: null,
//         fetchResponse:
//           type === "question" && type !== "fetch"
//             ? {}
//             : {
//               image: false,
//               text: true,
//               options: true,
//             },
//       },
//     };
//     setFlows((prevFlows) => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: [...prevFlows[currentFlow].nodes, newNode],
//       },
//     }));
//   };

//   const removeNode = (id) => {
//     if (!currentFlow) return;
//     setFlows((prevFlows) => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         nodes: prevFlows[currentFlow].nodes.filter((node) => node.id !== id),
//         edges: prevFlows[currentFlow].edges.filter(
//           (edge) => edge.source !== id && edge.target !== id
//         ),
//       },
//     }));
//     if (selectedNodeId === id) {
//       setSelectedNodeId(null);
//       setBigInputContent("");
//     }
//   };

//   const editNodeLabel = useCallback(
//     (id, updatedData) => {
//       if (!currentFlow) return;
//       setFlows((prevFlows) => ({
//         ...prevFlows,
//         [currentFlow]: {
//           ...prevFlows[currentFlow],
//           nodes: prevFlows[currentFlow].nodes.map((node) =>
//             node.id === id
//               ? { ...node, data: { ...node.data, ...updatedData } }
//               : node
//           ),
//         },
//       }));
//       if (selectedNodeId === id) {
//         setBigInputContent(updatedData.label);
//       }
//     },
//     [currentFlow, selectedNodeId]
//   );

//   const handleNodeClick = (id, label) => {
//     setSelectedNodeId(id);
//     setBigInputContent(label);
//     setTimeout(() => {
//       if (bigInputRef.current) {
//         bigInputRef.current.focus();
//       }
//     }, 0);
//   };

//   const handleBigInputChange = useCallback(
//     (e) => {
//       const newValue = e.target.value;
//       setBigInputContent(newValue);
//       if (selectedNodeId) {
//         editNodeLabel(selectedNodeId, { label: newValue });
//       }
//       setTimeout(() => {
//         if (bigInputRef.current && document.activeElement !== bigInputRef.current) {
//           bigInputRef.current.focus();
//         }
//       }, 0);
//     },
//     [selectedNodeId, editNodeLabel]
//   );

//   const createNewFlow = () => {
//     if (!newFlowName) return;
//     const newFlowKey = `${newFlowName}_${uuidv4().slice(0, 5)}`;
//     setFlows((prevFlows) => ({
//       ...prevFlows,
//       [newFlowKey]: {
//         name: newFlowName,
//         id: null,
//         status: "in-active",
//         nodes: [],
//         edges: [],
//       },
//     }));
//     setCurrentFlow(newFlowKey);
//     setNewFlowName("");
//   };

//   const toggleFlowStatus = () => {
//     if (!currentFlow) return;
//     setFlows((prevFlows) => ({
//       ...prevFlows,
//       [currentFlow]: {
//         ...prevFlows[currentFlow],
//         status:
//           prevFlows[currentFlow].status === "active" ? "in-active" : "active",
//       },
//     }));
//   };

//   const exportJSON = () => {
//     if (!currentFlow) return;
//     const flowData = flows[currentFlow];
//     const jsonStructure = {
//       flow: {
//         name: flowData.name,
//         ...(flowData.id && { id: flowData.id }),
//         status: flowData.status || "in-active",
//       },
//       nodes: flowData.nodes.map((node) => ({
//         id: node.id,
//         type: node.type,
//         level: 1,
//         label: node.data.label,
//         questionType: node.data.questionType || null,
//         pastedImageUrl: node.data.pastedImageUrl || null,
//         uploadedImageUrl: node.data.uploadedImageUrl || null,
//         uploadedImageName: node.data.uploadedImageName || null,
//         fetchUrl: node.data.fetchUrl || null,
//         fetchToken: node.data.fetchToken || null,
//         fetchPayload: node.data.fetchPayload || null,
//         fetchType: node.data.fetchType || null,
//         fetchMethod: node.data.fetchMethod || null,
//         fetchheaders: node.data.fetchheaders || null,
//         fetchResponse: node.data.fetchResponse || null,
//         position: node.position,
//       })),
//       edges: flowData.edges.map((edge) => ({
//         source: edge.source,
//         target: edge.target,
//       })),
//     };
//     console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
//     return jsonStructure;
//   };

//   const sendFlowToAPI = async () => {
//     if (!currentFlow) return;
//     try {
//       const flowData = exportJSON();
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/create`,
//         flowData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             api_key:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M chewing5OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || "Flow saved successfully!");
//         if (response.data.data?.flow?.id) {
//           const newFlowKey = `${flowData.flow.name}_${response.data.data.flow.id}`;
//           setFlows((prevFlows) => {
//             const updatedFlows = { ...prevFlows };
//             if (newFlowKey !== currentFlow) {
//               updatedFlows[newFlowKey] = {
//                 ...prevFlows[currentFlow],
//                 id: response.data.data.flow.id,
//               };
//               delete updatedFlows[currentFlow];
//             } else {
//               updatedFlows[currentFlow].id = response.data.data.flow.id;
//             }
//             return updatedFlows;
//           });
//           setCurrentFlow(newFlowKey);
//         }
//       } else {
//         toast.error(
//           response?.data?.message || "Failed to save flow. Please try again."
//         );
//       }
//     } catch (error) {
//       console.error("Error sending flow to API:", error);
//       toast.error("Error saving flow");
//     }
//   };

//   const handleDelete = async () => {
//     const flowData = flows[currentFlow];

//     try {
//       const response = await axios.post(
//         `${apiurl}/api/whatsapp/flow/delete`,
//         {
//           flow: {
//             id: flowData?.id,
//           },
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             api_key:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response?.data?.success === true) {
//         toast.success(response?.data?.message || "Flow deleted successfully!");
//       } else {
//         toast.error(
//           response?.data?.message || "Failed to delete flow. Please try again."
//         );
//       }

//       setShowPopup(false);
//     } catch (error) {
//       console.error("Error deleting flow:", error);
//       toast.error("Failed to delete flow");
//     }
//   };

//   return (
//     <Layout>
//       <div className="w-full h-full bg-gray-100 flex">
//         {showPopup && (
//           <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
//             <div className="bg-white p-6 rounded shadow-lg">
//               <p className="text-lg font-semibold mb-4">
//                 Are you sure you want to delete this flow?
//               </p>
//               <div className="flex justify-end space-x-4">
//                 <button
//                   className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
//                   onClick={() => setShowPopup(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
//                   onClick={handleDelete}
//                 >
//                   Confirm Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//         {isInfoVisible && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
//             <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
//               <button
//                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
//                 onClick={() => setInfoVisible(false)}
//                 aria-label="Close modal"
//               >
//                 <IoCloseOutline size={24} />
//               </button>
//               <h2 className="text-xl font-bold text-gray-500 mb-5 tracking-tight">
//                 How to Create a Bot Flow
//               </h2>
//               <ul className="space-y-3 text-gray-600">
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
//                   <span className="text-left">
//                     The button text length should be between 1 and 20 characters.
//                   </span>
//                 </li>
//                 <li className="flex items-start">
//                   <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
//                   <span className="text-left">
//                     The query text length should be between 1 and 24 characters.
//                   </span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         )}
//         <div className="flex-1 flex flex-col">
//           <div className="p-4 flex justify-between bg-white shadow items-center">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => addNode("question")}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base flex items-center gap-4"
//                 disabled={!currentFlow}
//               >
//                 <FiPlus /> Add Node
//               </button>
//               <button
//                 onClick={exportJSON}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//               >
//                 Export JSON
//               </button>
//               <button
//                 onClick={sendFlowToAPI}
//                 className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//                 disabled={!currentFlow}
//               >
//                 Save Flow
//               </button>
//               <button
//                 className="border border-red-400 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
//                 disabled={!currentFlow}
//                 onClick={() => setShowPopup(true)}
//               >
//                 Delete Flow
//               </button>
//             </div>
//             <div className="flex items-center space-x-4">
//               <label className="relative inline-flex items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={flows[currentFlow]?.status === "active"}
//                   onChange={toggleFlowStatus}
//                   className="sr-only peer"
//                   disabled={!currentFlow}
//                 />
//                 <div
//                   className={`w-12 h-6 p-1 rounded-full flex flex-shrink-0 items-center peer peer-focus:ring-4 peer-focus:ring-blue-300
//                   ${flows[currentFlow]?.status === "active"
//                       ? "bg-green-200"
//                       : "bg-gray-200"
//                     }
//                   peer-checked:bg-green-200 peer-disabled:opacity-50`}
//                 >
//                   <div
//                     className={`w-5 h-5 bg-white rounded-full border border-gray-300 transition-all
//                     ${flows[currentFlow]?.status === "active"
//                         ? "translate-x-5"
//                         : "translate-x-0"
//                       }`}
//                   ></div>
//                 </div>
//               </label>
//               <div
//                 className="text-xl bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-800 cursor-pointer p-1 rounded-sm flex justify-center items-center"
//                 onClick={() => setInfoVisible(true)}
//               >
//                 <IoInformationCircleOutline />
//               </div>
//             </div>
//           </div>
//           <div className="flex-1">
//             {currentFlow ? (
//               <ReactFlow
//                 nodes={nodes}
//                 edges={edges}
//                 onNodesChange={onNodesChange}
//                 onEdgesChange={onEdgesChange}
//                 onConnect={onConnect}
//                 nodeTypes={{
//                   question: (props) => (
//                     <CustomNode
//                       {...props}
//                       onEdit={editNodeLabel}
//                       onRemove={removeNode}
//                       onNodeClick={handleNodeClick}
//                     />
//                   ),
//                 }}
//                 fitView
//               >
//                 <Background />
//                 <Controls />
//               </ReactFlow>
//             ) : (
//               <div className="h-full flex items-center justify-center text-gray-500">
//                 Please create or select a flow to begin.
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="max-w-96 bg-white shadow p-4 flex-shrink-0 flex flex-col">
//           <div className="mb-4">
//             <input
//               ref={newFlowInputRef}
//               type="text"
//               value={newFlowName}
//               onChange={handleFlowNameChange}
//               placeholder="New Flow Name"
//               className="w-full p-2 border rounded mb-2"
//             />
//             <button
//               onClick={createNewFlow}
//               className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm w-full flex items-center justify-center gap-2"
//             >
//               <FiPlus /> Create Flow
//             </button>
//           </div>
//           <div className="space-y-2 h-[30%] overflow-y-scroll custom-scrollbar">
//             {Object.keys(flows).map((flowKey) => (
//               <button
//                 key={flowKey}
//                 onClick={() => setCurrentFlow(flowKey)}
//                 className={`w-full text-left flex items-center justify-between p-2 rounded ${currentFlow === flowKey
//                     ? "bg-light-secondary text-primary font-medium border border-primary"
//                     : "hover:bg-gray-100"
//                   }`}
//               >
//                 {flows[flowKey]?.name || "Unnamed Flow"}
//               </button>
//             ))}
//           </div>
//           <div className="flex-1 mt-4">
//             <textarea
//               ref={bigInputRef}
//               value={bigInputContent}
//               onChange={handleBigInputChange}
//               placeholder="Click a node to edit its content here, or type directly..."
//               className="w-full h-full p-4 border rounded resize-none text-lg"
//             />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default ChatbotFlow;




























import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  Handle,
} from "@xyflow/react";
import "reactflow/dist/style.css";
import '@xyflow/react/dist/style.css';
import { FiPlus, FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/layout";
import axios from "axios";
import { toast } from "react-toastify";
import { getCookie } from "../config/webStorage";
import { apiurl } from "../config/config";
import { VscVmActive } from "react-icons/vsc";
import { IoInformationCircleOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const nodeTypesConfig = {
  text: { bg: "bg-blue-100", text: "text-blue-800" },
  button: { bg: "bg-green-100", text: "text-green-800" },
  query: { bg: "bg-yellow-100", text: "text-yellow-800" },
  fetch: { bg: "bg-purple-100", text: "text-purple-800" },
  image: { bg: "bg-pink-100", text: "text-pink-800" }, 
};

const questionTypes = ["text", "button", "query", "fetch","image"];

const CustomNode = ({ data, id, type, onEdit, onRemove, onNodeClick }) => {
  const nodeStyle = nodeTypesConfig[data.questionType] || nodeTypesConfig["text"];
  const labelInputRef = useRef(null);
  const fetchPayloadRef = useRef(null);
  const fetchUrlRef = useRef(null);
  const fetchHeadersRef = useRef(null);
  const fileInputRef = useRef(null); // Ref for file input

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.stopPropagation();
    }
  };

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    onEdit(id, { ...data, [field]: value });
  };

  const handleQuestionTypeChange = (e) => {
    const newType = e.target.value;
    let updatedData = { ...data, questionType: newType };
    if (newType === "fetch") {
      updatedData = {
        ...updatedData,
        fetchUrl: "",
        fetchPayload: "",
        fetchMethod: "get",
        fetchheaders: "",
        fetchResponse: {
          image: false,
          text: true,
          options: true,
        },
        uploadedImageUrl: "", // Reset image fields
        uploadedImageName: "",
      };
    }else if (newType === "image") {
      updatedData = {
        ...updatedData,
        fetchUrl: "", // Reset fetch fields
        fetchPayload: "",
        fetchMethod: "",
        fetchheaders: "",
        fetchResponse: {},
        uploadedImageUrl: data.uploadedImageUrl || "", // Preserve if already set
        uploadedImageName: data.uploadedImageName || "",
      };
    } else {
      updatedData = {
        ...updatedData,
        fetchUrl: "",
        fetchPayload: "",
        fetchMethod: "",
        fetchheaders: "",
        fetchResponse: {},
        uploadedImageUrl: "",
        uploadedImageName: "",
        
      };
    }
    onEdit(id, updatedData);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select an image file!");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);
    const token = getCookie("sctoken");

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/content/imageupload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data?.success) {
        const imageUrl = response.data.urls[0];
        onEdit(id, {
          ...data,
          uploadedImageUrl: imageUrl,
          uploadedImageName: file.name,
        });
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Image upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    }
  };

  const handleToggleChange = (field) => () => {
    onEdit(id, {
      ...data,
      fetchResponse: {
        ...data.fetchResponse,
        [field]: !data.fetchResponse[field],
      },
    });
  };

  return (
    <div
      className={`${nodeStyle.bg} p-4 rounded shadow relative w-64 overflow-hidden`}
      onClick={(e) => e.stopPropagation()}
    >
      <Handle type="target" position="top" className="w-2 h-2 bg-gray-500" />
      <input
        ref={labelInputRef}
        type="text"
        value={data.label}
        onChange={handleInputChange("label")}
        onKeyDown={handleKeyDown}
        onClick={(e) => {
          e.stopPropagation();
          onNodeClick(id, data.label, "label");
        }}
        className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2 truncate`}
        placeholder="Enter Text"
      />
      {type === "question" && (
        <select
          value={data.questionType}
          onChange={handleQuestionTypeChange}
          onClick={(e) => e.stopPropagation()}
          className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1 mb-2`}
        >
          {questionTypes.map((qType) => (
            <option key={qType} value={qType}>
              {qType.charAt(0).toUpperCase() + qType.slice(1)}
            </option>
          ))}
        </select>
      )}
      {data.questionType === "fetch" && (
        <div className="space-y-2">
          <input
            ref={fetchUrlRef}
            type="text"
            value={data.fetchUrl || ""}
            onChange={handleInputChange("fetchUrl")}
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(id, data.fetchUrl || "", "fetchUrl");
            }}
            placeholder="Fetch URL"
            className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
          />
          <input
            ref={fetchPayloadRef}
            type="text"
            value={data.fetchPayload || ""}
            onChange={handleInputChange("fetchPayload")}
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(id, data.fetchPayload || "", "fetchPayload");
            }}
            placeholder="Fetch Payload (JSON)"
            className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
          />
          <select
            value={data.fetchMethod || "get"}
            onChange={handleInputChange("fetchMethod")}
            className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
          >
            <option value="get">GET</option>
            <option value="post">POST</option>
            <option value="put">PUT</option>
            <option value="delete">DELETE</option>
          </select>
          <input
            ref={fetchHeadersRef}
            type="text"
            value={data.fetchheaders || ""}
            onChange={handleInputChange("fetchheaders")}
            onClick={(e) => {
              e.stopPropagation();
              onNodeClick(id, data.fetchheaders || "", "fetchheaders");
            }}
            placeholder="Fetch Headers (JSON)"
            className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
          />
          <div className="flex flex-col">
            <label className="text-sm">Fetch Response:</label>
            <div className="flex space-x-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.fetchResponse?.image || false}
                  onChange={handleToggleChange("image")}
                  className="mr-1"
                />
                Image
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.fetchResponse?.text || false}
                  onChange={handleToggleChange("text")}
                  className="mr-1"
                />
                Text
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={data.fetchResponse?.options || false}
                  onChange={handleToggleChange("options")}
                  className="mr-1"
                />
                Options
              </label>
            </div>
          </div>
        </div>
      )}
      {data.questionType === "image" && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            onClick={(e) => e.stopPropagation()}
            className={`w-full ${nodeStyle.text} bg-transparent border border-gray-300 rounded p-1`}
          />
          {data.uploadedImageUrl && (
            <div className="mt-2">
              <p className={`text-sm ${nodeStyle.text}`}>
                Uploaded: {data.uploadedImageName}
              </p>
              <img
                src={data.uploadedImageUrl}
                alt={data.uploadedImageName || "Uploaded Image"}
                className="mt-2 max-w-full h-auto rounded"
                style={{ maxHeight: "100px" }}
              />
            </div>
          )}
        </div>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(id);
        }}
        className="absolute top-1 right-1 text-red-500"
      >
        <FiX className="text-xs" />
      </button>
      <Handle type="source" position="bottom" className="w-2 h-2 bg-gray-500" />
    </div>
  );
};

const ChatbotFlow = () => {
  const token = getCookie("sctoken");
  const [flows, setFlows] = useState({});
  const [currentFlow, setCurrentFlow] = useState("");
  const [newFlowName, setNewFlowName] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [bigInputContent, setBigInputContent] = useState("");
  const [activeField, setActiveField] = useState("label");
  const [showPopup, setShowPopup] = useState(false);
  const [isInfoVisible, setInfoVisible] = useState(false);

  const newFlowInputRef = useRef(null);
  const bigInputRef = useRef(null);

  const handleFlowNameChange = (e) => {
    setNewFlowName(e.target.value);
    setTimeout(() => {
      if (newFlowInputRef.current) {
        newFlowInputRef.current.focus();
      }
    }, 20);
  };

  // const fetchFlows = async () => {
  //   try {
  //     const response = await axios.get(`${apiurl}/api/whatsapp/flow/getFlows`, {
  //       headers: {
  //         api_key:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.data.success) {
  //       const fetchedFlows = response.data.data.reduce((acc, flowData) => {
  //         const flowKey = `${flowData.flow.name}_${flowData.flow.id}`;
  //         acc[flowKey] = {
  //           name: flowData.flow.name || `Flow_${flowData.flow.id}`,
  //           id: flowData.flow.id,
  //           status: flowData.flow.status,
  //           nodes: flowData.nodes.map((node) => ({
  //             id: node.id,
  //             type: node.type,
  //             position: node.position,
  //             data: {
  //               label: node.label,
  //               questionType: node.questionType,
  //               pastedImageUrl: node.pastedImageUrl,
  //               uploadedImageUrl: node.uploadedImageUrl,
  //               uploadedImageName: node.uploadedImageName,
  //               fetchUrl: node.fetchUrl,
  //               fetchToken: node.fetchToken,
  //               fetchPayload: node.fetchPayload ? JSON.stringify(node.fetchPayload) : "",
  //               fetchType: node.fetchType,
  //               fetchMethod: node.fetchMethod,
  //               fetchheaders: node.fetchheaders ? JSON.stringify(node.fetchheaders) : "",
  //               fetchResponse: node.fetchResponse || {
  //                 image: false,
  //                 text: true,
  //                 options: true,
  //               },
  //             },
  //           })),
  //           edges: flowData.edges.map((edge) => ({
  //             id: `${edge.source}-${edge.target}`,
  //             source: edge.source,
  //             target: edge.target,
  //             animated: true,
  //           })),
  //         };
  //         return acc;
  //       }, {});
  //       setFlows(fetchedFlows);
  //       if (Object.keys(fetchedFlows).length > 0) {
  //         setCurrentFlow(Object.keys(fetchedFlows)[0]);
  //       }
  //     } else {
  //       toast.error("Failed to fetch flows");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching flows:", error);
  //     toast.error("Error fetching flows");
  //   }
  // };
  const fetchFlows = async () => {
    try {
      const response = await axios.get(`${apiurl}/api/whatsapp/flow/getFlows`, {
        headers: {
          api_key:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.success) {
        const fetchedFlows = response.data.data.reduce((acc, flowData) => {
          const flowKey = `${flowData.flow.name}_${flowData.flow.id}`;
          acc[flowKey] = {
            name: flowData.flow.name || `Flow_${flowData.flow.id}`,
            id: flowData.flow.id,
            status: flowData.flow.status,
            nodes: flowData.nodes.map((node) => ({
              id: node.id,
              type: node.type,
              position: node.position,
              data: {
                label: node.label,
                questionType: node.questionType,
                pastedImageUrl: node.pastedImageUrl || "",
                uploadedImageUrl: node.uploadedImageUrl || "", // Added
                uploadedImageName: node.uploadedImageName || "", // Added
                fetchUrl: node.fetchUrl || "",
                fetchToken: node.fetchToken || "",
                fetchPayload: node.fetchPayload ? JSON.stringify(node.fetchPayload) : "",
                fetchType: node.fetchType || "",
                fetchMethod: node.fetchMethod || "",
                fetchheaders: node.fetchheaders ? JSON.stringify(node.fetchheaders) : "",
                fetchResponse: node.fetchResponse || {
                  image: false,
                  text: true,
                  options: true,
                },
              },
            })),
            edges: flowData.edges.map((edge) => ({
              id: `${edge.source}-${edge.target}`,
              source: edge.source,
              target: edge.target,
              animated: true,
            })),
          };
          return acc;
        }, {});
        setFlows(fetchedFlows);
        if (Object.keys(fetchedFlows).length > 0) {
          setCurrentFlow(Object.keys(fetchedFlows)[0]);
        }
      } else {
        toast.error("Failed to fetch flows");
      }
    } catch (error) {
      console.error("Error fetching flows:", error);
      toast.error("Error fetching flows");
    }
  };
  useEffect(() => {
    fetchFlows();
  }, []);

  const nodes = flows[currentFlow]?.nodes || [];
  const edges = flows[currentFlow]?.edges || [];

  const onNodesChange = useCallback(
    (changes) => {
      if (!currentFlow) return;
      setFlows((prevFlows) => ({
        ...prevFlows,
        [currentFlow]: {
          ...prevFlows[currentFlow],
          nodes: applyNodeChanges(changes, prevFlows[currentFlow].nodes),
        },
      }));
    },
    [currentFlow]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      if (!currentFlow) return;
      setFlows((prevFlows) => ({
        ...prevFlows,
        [currentFlow]: {
          ...prevFlows[currentFlow],
          edges: applyEdgeChanges(changes, prevFlows[currentFlow].edges),
        },
      }));
    },
    [currentFlow]
  );

  const onConnect = useCallback(
    (connection) => {
      if (!currentFlow) return;
      setFlows((prevFlows) => ({
        ...prevFlows,
        [currentFlow]: {
          ...prevFlows[currentFlow],
          edges: addEdge(
            { ...connection, animated: true },
            prevFlows[currentFlow].edges
          ),
        },
      }));
    },
    [currentFlow]
  );

  // const addNode = (type = "question") => {
  //   if (!currentFlow) return;
  //   const newNode = {
  //     id: uuidv4(),
  //     type,
  //     position: { x: Math.random() * 400, y: Math.random() * 400 },
  //     data: {
  //       label: "",
  //       questionType: type === "question" ? "text" : "fetch",
  //       pastedImageUrl: "",
  //       uploadedImageUrl: "",
  //       uploadedImageName: "",
  //       fetchUrl:"",
  //       fetchToken: "",
  //       fetchPayload: type === "question" && type !== "fetch" ? "" : "",
  //       fetchType: "",
  //       fetchMethod: type === "question" && type !== "fetch" ? "" : "get",
  //       fetchheaders: "",
  //       fetchResponse:
  //         type === "question" && type !== "fetch"
  //           ? {}
  //           : {
  //               image: false,
  //               text: true,
  //               options: true,
  //             },
  //     },
  //   };
  //   setFlows((prevFlows) => ({
  //     ...prevFlows,
  //     [currentFlow]: {
  //       ...prevFlows[currentFlow],
  //       nodes: [...prevFlows[currentFlow].nodes, newNode],
  //     },
  //   }));
  // };
  const addNode = (type = "question") => {
    if (!currentFlow) return;
    const newNode = {
      id: uuidv4(),
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: {
        label: "",
        questionType: type === "question" ? "text" : "fetch",
        pastedImageUrl: "",
        uploadedImageUrl: "",
        uploadedImageName: "",
        fetchUrl: "",
        fetchToken: "",
        fetchPayload: "",
        fetchType: "",
        fetchMethod: type === "question" && type !== "fetch" ? "" : "get",
        fetchheaders: "",
        fetchResponse:
          type === "question" && type !== "fetch"
            ? {}
            : {
                image: false,
                text: true,
                options: true,
              },
      },
    };
    if (type === "question" && newNode.data.questionType === "image") {
      newNode.data = {
        ...newNode.data,
        questionType: "image",
        fetchUrl: "",
        fetchPayload: "",
        fetchMethod: "",
        fetchheaders: "",
        fetchResponse: {},
      };
    }
    setFlows((prevFlows) => ({
      ...prevFlows,
      [currentFlow]: {
        ...prevFlows[currentFlow],
        nodes: [...prevFlows[currentFlow].nodes, newNode],
      },
    }));
  };
  const removeNode = (id) => {
    if (!currentFlow) return;
    setFlows((prevFlows) => ({
      ...prevFlows,
      [currentFlow]: {
        ...prevFlows[currentFlow],
        nodes: prevFlows[currentFlow].nodes.filter((node) => node.id !== id),
        edges: prevFlows[currentFlow].edges.filter(
          (edge) => edge.source !== id && edge.target !== id
        ),
      },
    }));
    if (selectedNodeId === id) {
      setSelectedNodeId(null);
      setBigInputContent("");
      setActiveField("label");
    }
  };

  const editNodeLabel = useCallback(
    (id, updatedData) => {
      if (!currentFlow) return;
      setFlows((prevFlows) => ({
        ...prevFlows,
        [currentFlow]: {
          ...prevFlows[currentFlow],
          nodes: prevFlows[currentFlow].nodes.map((node) =>
            node.id === id
              ? { ...node, data: { ...node.data, ...updatedData } }
              : node
          ),
        },
      }));
      if (selectedNodeId === id && updatedData[activeField] !== undefined) {
        setBigInputContent(updatedData[activeField]);
      }
    },
    [currentFlow, selectedNodeId, activeField]
  );

  const handleNodeClick = (id, value, field) => {
    setSelectedNodeId(id);
    setBigInputContent(value || "");
    setActiveField(field);
    setTimeout(() => {
      if (bigInputRef.current) {
        bigInputRef.current.focus();
      }
    }, 0);
  };

  // const handleBigInputChange = useCallback(
  //   (e) => {
  //     const newValue = e.target.value;
  //     setBigInputContent(newValue);
  //     if (selectedNodeId) {
  //       let updatedData = {};
  //       if (activeField === "fetchPayload" || activeField === "fetchheaders") {
  //         try {
  //           updatedData[activeField] = newValue ? JSON.parse(newValue) : "";
  //         } catch {
  //           toast.error(`${activeField} must be valid JSON or empty`);
  //           return;
  //         }
  //       } else {
  //         updatedData[activeField] = newValue;
  //       }
  //       editNodeLabel(selectedNodeId, updatedData);
  //     }
  //     setTimeout(() => {
  //       if (bigInputRef.current && document.activeElement !== bigInputRef.current) {
  //         bigInputRef.current.focus();
  //       }
  //     }, 0);
  //   },
  //   [selectedNodeId, activeField, editNodeLabel]
  // );

  const handleBigInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setBigInputContent(newValue);
      if (selectedNodeId) {
        const updatedData = { [activeField]: newValue };
        editNodeLabel(selectedNodeId, updatedData);
      }
      setTimeout(() => {
        if (bigInputRef.current && document.activeElement !== bigInputRef.current) {
          bigInputRef.current.focus();
        }
      }, 0);
    },
    [selectedNodeId, activeField, editNodeLabel]
  );

  const createNewFlow = () => {
    if (!newFlowName) return;
    const newFlowKey = `${newFlowName}_${uuidv4().slice(0, 5)}`;
    setFlows((prevFlows) => ({
      ...prevFlows,
      [newFlowKey]: {
        name: newFlowName,
        id: null,
        status: "in-active",
        nodes: [],
        edges: [],
      },
    }));
    setCurrentFlow(newFlowKey);
    setNewFlowName("");
  };

  const toggleFlowStatus = () => {
    if (!currentFlow) return;
    setFlows((prevFlows) => ({
      ...prevFlows,
      [currentFlow]: {
        ...prevFlows[currentFlow],
        status:
          prevFlows[currentFlow].status === "active" ? "in-active" : "active",
      },
    }));
  };

  // const exportJSON = () => {
  //   if (!currentFlow) return;
  //   const flowData = flows[currentFlow];
  //   const jsonStructure = {
  //     flow: {
  //       name: flowData.name,
  //       ...(flowData.id && { id: flowData.id }),
  //       status: flowData.status || "in-active",
  //     },
  //     nodes: flowData.nodes.map((node) => ({
  //       id: node.id,
  //       type: node.type,
  //       level: 1,
  //       label: node.data.label,
  //       questionType: node.data.questionType || null,
  //       pastedImageUrl: node.data.pastedImageUrl || null,
  //       uploadedImageUrl: node.data.uploadedImageUrl || null,
  //       uploadedImageName: node.data.uploadedImageName || null,
  //       fetchUrl: node.data.fetchUrl || null,
  //       fetchToken: node.data.fetchToken || null,
  //       fetchPayload: node.data.fetchPayload || null,
  //       fetchType: node.data.fetchType || null,
  //       fetchMethod: node.data.fetchMethod || null,
  //       fetchheaders: node.data.fetchheaders || null,
  //       fetchResponse: node.data.fetchResponse || null,
  //       position: node.position,
  //     })),
  //     edges: flowData.edges.map((edge) => ({
  //       source: edge.source,
  //       target: edge.target,
  //     })),
  //   };
  //   console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
  //   return jsonStructure;
  // };
  const exportJSON = () => {
    if (!currentFlow) return;
    const flowData = flows[currentFlow];
    const jsonStructure = {
      flow: {
        name: flowData.name,
        ...(flowData.id && { id: flowData.id }),
        status: flowData.status || "in-active",
      },
      nodes: flowData.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        level: 1,
        label: node.data.label,
        questionType: node.data.questionType || null,
        pastedImageUrl: node.data.pastedImageUrl || null,
        uploadedImageUrl: node.data.uploadedImageUrl || null, // Added
        uploadedImageName: node.data.uploadedImageName || null, // Added
        fetchUrl: node.data.fetchUrl || null,
        fetchToken: node.data.fetchToken || null,
        fetchPayload: node.data.fetchPayload || null,
        fetchType: node.data.fetchType || null,
        fetchMethod: node.data.fetchMethod || null,
        fetchheaders: node.data.fetchheaders || null,
        fetchResponse: node.data.fetchResponse || null,
        position: node.position,
      })),
      edges: flowData.edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };
    console.log("Chatbot Flow JSON:", JSON.stringify(jsonStructure, null, 2));
    return jsonStructure;
  };
  const sendFlowToAPI = async () => {
    if (!currentFlow) return;
    try {
      const flowData = exportJSON();
      const response = await axios.post(
        `${apiurl}/api/whatsapp/flow/create`,
        flowData,
        {
          headers: {
            "Content-Type": "application/json",
            api_key:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDU1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      

      if (response?.data?.success === true) {
        toast.success(response?.data?.message || "Flow saved successfully!");
        if (response.data.data?.flow?.id) {
          const newFlowKey = `${flowData.flow.name}_${response.data.data.flow.id}`;
          setFlows((prevFlows) => {
            const updatedFlows = { ...prevFlows };
            if (newFlowKey !== currentFlow) {
              updatedFlows[newFlowKey] = {
                ...prevFlows[currentFlow],
                id: response.data.data.flow.id,
              };
              delete updatedFlows[currentFlow];
            } else {
              updatedFlows[currentFlow].id = response.data.data.flow.id;
            }
            return updatedFlows;
          });
          setCurrentFlow(newFlowKey);
        }
      } else {
        toast.error(
          response?.data?.message || "Failed to save flow. Please try again."
        );
      }
    } catch (error) {
      console.error("Error sending flow to API:", error);
      toast.error("Error saving flow");
    }
  };

  const handleDelete = async () => {
    const flowData = flows[currentFlow];

    try {
      const response = await axios.post(
        `${apiurl}/api/whatsapp/flow/delete`,
        {
          flow: {
            id: flowData?.id,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            api_key:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzAwMDEsInVzZXJfaWQiOiIxMDAwMDAyIiwiUEhPTkVfTlVNQkVSX0lEIjoiNDgwNTE4NDAxODEyNTUwIiwibWV0YV9hcGlfYWNjZXNzX3Rva2VuIjoiRUFBUnN1TlFDSTFVQk85T2lobmI2blRYRVpBQVlmWEMwNTFZWUJTeFlBMVdqWVB0M3RVdDg1OUNGb3FRaWhqczFIZEZiblpDcFdJcHlqRllsYmpYVTZ5bVJJNlVYelpDUnNoYjM5UU5ZcWtidldWNDRScVhEa3NvaU90bjE5Q0RscDdaQ1NlQUJicWc2UVVaQnVHakFOOXZ0VW9UeGxEaWNaQTlYWkF5TkpkMkZaQmJNQjBOODh4MnU3SFpCT0s1d0wyazZLRVFaRFpEIiwiaWF0IjoxNzQyNDE1ODU0fQ.p5EwlJXR9DsVGYE3G9XeqoCuFfYJC4on2u91DKziSCw",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.success === true) {
        toast.success(response?.data?.message || "Flow deleted successfully!");
      } else {
        toast.error(
          response?.data?.message || "Failed to delete flow. Please try again."
        );
      }

      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting flow:", error);
      toast.error("Failed to delete flow");
    }
  };

  return (
    <Layout>
      <div className="w-full h-full bg-gray-100 flex">
        {showPopup && (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="text-lg font-semibold mb-4">
                Are you sure you want to delete this flow?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {isInfoVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 scale-100 hover:scale-[1.02]">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
                onClick={() => setInfoVisible(false)}
                aria-label="Close modal"
              >
                <IoCloseOutline size={24} />
              </button>
              <h2 className="text-xl font-bold text-gray-500 mb-5 tracking-tight">
                How to Create a Bot Flow
              </h2>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
                  <span className="text-left">
                    The button text length should be between 1 and 20 characters.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-2 h-2 mt-2 mr-3 bg-primary rounded-full" />
                  <span className="text-left">
                    The query text length should be between 1 and 24 characters.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <div className="p-4 flex justify-between bg-white shadow items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => addNode("question")}
                className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base flex items-center gap-4"
                disabled={!currentFlow}
              >
                <FiPlus /> Add Node
              </button>
              <button
                onClick={exportJSON}
                className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
              >
                Export JSON
              </button>
              <button
                onClick={sendFlowToAPI}
                className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
                disabled={!currentFlow}
              >
                Save Flow
              </button>
              <button
                className="border border-red-400 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-sm text-xs md:text-sm lg:text-base"
                disabled={!currentFlow}
                onClick={() => setShowPopup(true)}
              >
                Delete Flow
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={flows[currentFlow]?.status === "active"}
                  onChange={toggleFlowStatus}
                  className="sr-only peer"
                  disabled={!currentFlow}
                />
                <div
                  className={`w-12 h-6 p-1 rounded-full flex flex-shrink-0 items-center peer peer-focus:ring-4 peer-focus:ring-blue-300
                  ${flows[currentFlow]?.status === "active"
                      ? "bg-green-200"
                      : "bg-gray-200"
                    }
                  peer-checked:bg-green-200 peer-disabled:opacity-50`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full border border-gray-300 transition-all
                    ${flows[currentFlow]?.status === "active"
                        ? "translate-x-5"
                        : "translate-x-0"
                      }`}
                  ></div>
                </div>
              </label>
              <div
                className="text-xl bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-800 cursor-pointer p-1 rounded-sm flex justify-center items-center"
                onClick={() => setInfoVisible(true)}
              >
                <IoInformationCircleOutline />
              </div>
            </div>
          </div>
          <div className="flex-1">
            {currentFlow ? (
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={{
                  question: (props) => (
                    <CustomNode
                      {...props}
                      onEdit={editNodeLabel}
                      onRemove={removeNode}
                      onNodeClick={handleNodeClick}
                    />
                  ),
                }}
                fitView
              >
                <Background />
                <Controls />
              </ReactFlow>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Please create or select a flow to begin.
              </div>
            )}
          </div>
        </div>
        <div className="max-w-96 bg-white shadow p-4 flex-shrink-0 flex flex-col">
          <div className="mb-4">
            <input
              ref={newFlowInputRef}
              type="text"
              value={newFlowName}
              onChange={handleFlowNameChange}
              placeholder="New Flow Name"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={createNewFlow}
              className="bg-primary hover:bg-secondary text-secondary hover:text-primary font-medium px-4 py-2 rounded-sm w-full flex items-center justify-center gap-2"
            >
              <FiPlus /> Create Flow
            </button>
          </div>
          <div className="space-y-2 h-[30%] overflow-y-scroll custom-scrollbar">
            {Object.keys(flows).map((flowKey) => (
              <button
                key={flowKey}
                onClick={() => setCurrentFlow(flowKey)}
                className={`w-full text-left flex items-center justify-between p-2 rounded ${currentFlow === flowKey
                    ? "bg-light-secondary text-primary font-medium border border-primary"
                    : "hover:bg-gray-100"
                  }`}
              >
                {flows[flowKey]?.name || "Unnamed Flow"}
              </button>
            ))}
          </div>
          <div className="flex-1 mt-4">
            <textarea
              ref={bigInputRef}
              value={bigInputContent}
              onChange={handleBigInputChange}
              placeholder="Click a node field to edit its content here, or type directly..."
              className="w-full h-full p-4 border rounded resize-none text-lg"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatbotFlow;