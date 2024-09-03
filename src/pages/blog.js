// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import { Card } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";


// const Blog = () => {

//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value })
//     };

//     const [content, setContent] = useState("h");
//     const [type, setType] = useState("paragraph");
//     const [editorContent, setEditorContent] = useState(
//         [
//             {
//               type: "paragraph",
//               content: "hello",
//             },

//           ]
//     );

//     const editor = useCreateBlockNote({
//         initialContent: editorContent,
//     });

//     const [showEditor, setShowEditor] = useState(false);




//     // fetching response from openai

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme} words.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await axios.post(ENDPOINT, payload, { headers });
//             const content = response.data.choices[0].message.content;
//             const parsedContent = parseContentToBlocks(content);

//             // Log parsedContent to ensure it's correct
//             console.log("Parsed Content:", parsedContent);

//             // Assume parsedContent is an array of block objects
//             if (parsedContent.length > 0) {
//                 setContent(parsedContent[0].content);
//                 setType(parsedContent[0].type);
//                 setEditorContent(parsedContent);
//             } else {
//                 console.warn("Parsed content is empty.");
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };


//     useEffect(() => {
//         if (content !== "" && type !== "") {
//             const newContent = [
//                 {
//                     type: type,
//                     content: content,
//                 },
//             ];
//             setEditorContent(newContent);
//             console.log("Updated editor content:", newContent);
//         }
//     }, [type, content]);


//     //   parsing the content

//     const parseContentToBlocks = (content) => {
//         // Assuming content is in markdown or plain text, split and map it to BlockNote blocks
//         const lines = content.split("\n");

//         return lines.map(line => {
//           if (line.startsWith("# ")) {
//             return { type: "heading", content: line.replace("# ", "") };
//           } else if (line.startsWith("## ")) {
//             return { type: "heading", content: line.replace("## ", "") };
//           } else if (line.startsWith("- ")) {
//             return { type: "paragraph", content: line }; // You can customize this to bullet points
//           } else {
//             return { type: "paragraph", content: line };
//           }
//         });
//       };




//     const submitUserData = async (e) => {
//         e.preventDefault();

//         const { title, introduction, theme } = inputdata;
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (<div className='Blockeditor'><BlockNoteView editor={editor} content={editorContent} /></div>) :

//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             }

//         </div>
//     )
// }

// export default Blog









// This code is giving the response in single editor without streaming

// import React, { useState, useEffect } from 'react'
// import axios from 'axios';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 type: "paragraph",
//                 content: "hello",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme}.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000, 
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await axios.post(ENDPOINT, payload, { headers });
//             const content = response.data.choices[0].message.content;
//             const parsedContent = parseContentToBlocks(content);

//             // Updating editor blocks
//             if (parsedContent.length > 0) {
//                 editor.replaceBlocks(editor.document.map(block => block.id), parsedContent);
//             } else {
//                 console.warn("Parsed content is empty.");
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };

//     const parseContentToBlocks = (content) => {
//         const lines = content.split("\n");

//         return lines.map(line => {
//           if (line.startsWith("# ")) {
//             return { type: "heading", content: line.replace("# ", "") };
//           } else if (line.startsWith("## ")) {
//             return { type: "heading", content: line.replace("## ", "") };
//           } else if (line.startsWith("### ")) {
//             return { type: "heading", content: line.replace("### ", "") };
//           } else if (line.startsWith("#### ")) {
//             return { type: "heading", content: line.replace("#### ", "") };
//           } else if (line.startsWith("##### ")) {
//             return { type: "heading", content: line.replace("##### ", "") };
//           } else {
//             return { type: "paragraph", content: line };
//           }
//         });
//       };


//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// }

// export default Blog;

















// There is some basic functionality for retreiving the block id and updating the condtent




// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

// let editorId = "1";

//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 type: "paragraph",
//                 content: "hello",
//                 id: editorId,
//             },
//         ],
//     });

//     const testing = () => {
//         editor.insertInlineContent([
//             "Hello ",
//             // { type: "text", text: "World", styles: { bold: true } }
//           ]);
//     };

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme}.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true // Enable streaming response
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let accumulatedContent = "";
//             let currentBlockId = null;

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });
//                 accumulatedContent += chunk;

//                 // Process each line of the stream
//                 const lines = accumulatedContent.split("\n");

//                 // Extract JSON objects from the lines that start with "data:"
//                 for (const line of lines) {
//                     if (line.startsWith("data: ")) {
//                         const jsonString = line.replace("data: ", "").trim();

//                         // Handle empty events (often the end of a message)
//                         if (jsonString === '[DONE]') continue;

//                         try {
//                             const parsedData = JSON.parse(jsonString);

//                             // Check if content exists and update the editor
//                             if (parsedData.choices && parsedData.choices[0] && parsedData.choices[0].delta && parsedData.choices[0].delta.content) {
//                                 const newContent = parsedData.choices[0].delta.content;

//                                 // Determine block type
//                                 const blockType = newContent.startsWith("#") ? "heading" : "paragraph";
//                                 const contentToInsert = newContent.replace(/#+\s*/, ""); // Remove Markdown-style heading syntax

//                                 if (blockType === "heading") {
//                                     // Insert a new block if it's a heading or if no current block exists
//                                     const newBlock = {
//                                         type: blockType,
//                                         content: newContent
//                                     };
//                                     console.log(editor.document.length);
//                                     console.log(newBlock);
//                                     editor.insertBlocks([newBlock], editor.document[editor.document.length - 1].id, 'after');
//                                     // Update the currentBlockId with the newly inserted block's ID
//                                     currentBlockId = editor.document[editor.document.length - 1].id;
//                                 } else {
//                                     // Update the existing block's content
//                                     const currentBlock = editor.getBlock(currentBlockId);
//                                     if (currentBlock) {
//                                         // editor.updateBlock(currentBlockId, { content: editor.getBlock(currentBlock).content + contentToInsert });
//                                         editor.insertInlineContent([contentToInsert, {id: currentBlockId}]);
//                                     }
//                                 }
//                             }
//                         } catch (error) {
//                             console.error("Failed to parse JSON:", error);
//                         }
//                     }
//                 }

//                 // Retain the last incomplete line (if any) for the next loop iteration
//                 accumulatedContent = lines[lines.length - 1];
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };

//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         testing();
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;




















// Giving whole content in only single editor with stream





// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

// let editorId = "1";

//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 type: "paragraph",
//                 content: "hello",
//                 id: editorId,
//             },
//         ],
//     });

//     const testing = () => {
//         editor.insertInlineContent([
//             "Hello ",
//             // { type: "text", text: "World", styles: { bold: true } }
//           ]);
//     };

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme}.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true // Enable streaming response
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let accumulatedContent = "";
//             let currentBlockId = editor.document[0]?.id; // Start with the first block's ID

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });
//                 accumulatedContent += chunk;

//                 const lines = accumulatedContent.split("\n");

//                 for (const line of lines) {
//                     if (line.startsWith("data: ")) {
//                         const jsonString = line.replace("data: ", "").trim();

//                         if (jsonString === '[DONE]') continue;

//                         try {
//                             const parsedData = JSON.parse(jsonString);

//                             if (parsedData.choices && parsedData.choices[0] && parsedData.choices[0].delta && parsedData.choices[0].delta.content) {
//                                 const newContent = parsedData.choices[0].delta.content.trim();

//                                 // Check if it's a heading or a paragraph
//                                 let blockType = "paragraph";
//                                 if (newContent.startsWith("#")) {
//                                     blockType = "heading";
//                                     newContent = newContent.replace(/#+\s*/, ""); // Remove Markdown-style heading syntax
//                                 }

//                                 if (blockType === "heading" || !currentBlockId) {
//                                     // Insert a new block if it's a heading or if currentBlockId is not set
//                                     editor.insertBlocks(
//                                         [{ type: blockType, content: newContent }],
//                                         currentBlockId || editor.document[0].id,
//                                         "after"
//                                     );
//                                     currentBlockId = editor.document[editor.document.length - 1].id; // Update the current block ID
//                                 } else {
//                                     // Update the existing block
//                                     const existingBlock = editor.getBlock(currentBlockId);
//                                     editor.updateBlock(currentBlockId, {
//                                         content: existingBlock.content + " " + newContent
//                                     });
//                                 }
//                             }
//                         } catch (error) {
//                             console.error("Failed to parse JSON:", error);
//                         }
//                     }
//                 }

//                 accumulatedContent = lines[lines.length - 1];
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };


//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         testing();
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;













//  Too many new lines or gaps between the editors while everything is fine

// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: "initial-block",
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);
//     const [currentBlockId, setCurrentBlockId] = useState("initial-block");

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme}.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true // Enable streaming response
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let accumulatedContent = "";
//             let currentBlockContent = "";

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });
//                 accumulatedContent += chunk;

//                 const lines = accumulatedContent.split("\n");

//                 for (const line of lines) {
//                     if (line.startsWith("data: ")) {
//                         const jsonString = line.replace("data: ", "").trim();

//                         if (jsonString === '[DONE]') continue;

//                         try {
//                             const parsedData = JSON.parse(jsonString);

//                             if (parsedData.choices && parsedData.choices[0].delta && parsedData.choices[0].delta.content) {
//                                 const newContent = parsedData.choices[0].delta.content;

//                                 // Accumulate content
//                                 currentBlockContent += newContent;

//                                 // Check if content should be split into a new block
//                                 if (currentBlockContent.match(/(\r?\n){2,}/)) {
//                                     // Insert the previous block content
//                                     if (currentBlockContent.trim().length > 0) {
//                                         const blockType = currentBlockContent.startsWith("#") ? "heading" : "paragraph";
//                                         const newBlockId = `block-${Date.now()}`;


//                                         editor.insertBlocks([{ id: newBlockId, type: blockType, content: currentBlockContent.replace(/#+\s*/, "") }], currentBlockId, "before");
//                                         setCurrentBlockId(newBlockId);
//                                     }

//                                     // Reset current block content
//                                     currentBlockContent = "";
//                                 }
//                             }
//                         } catch (error) {
//                             console.error("Failed to parse JSON:", error);
//                         }
//                     }
//                 }

//                 // Keep the last part of the content
//                 accumulatedContent = lines[lines.length - 1];
//             }

//             // Insert any remaining content after the loop
//             if (currentBlockContent.trim().length > 0) {
//                 const blockType = currentBlockContent.startsWith("#") ? "heading" : "paragraph";
//                 const newBlockId = `block-${Date.now()}`;

//                 editor.insertBlocks([{ id: newBlockId, type: blockType, content: currentBlockContent.replace(/#+\s*/, "") }], currentBlockId, "before");
//                 setCurrentBlockId(newBlockId);
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };

//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;




























// Compact output but paragraphs are read as headings

// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: "initial-block",
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);
//     const [currentBlockId, setCurrentBlockId] = useState("initial-block");

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant that generates blog content. The blog topic is "${inputdata.title}" and the desired theme is ${inputdata.theme}.`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true // Enable streaming response
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder();
//             let accumulatedContent = "";
//             let currentBlockContent = "";

//             while (true) {
//                 const { value, done } = await reader.read();
//                 if (done) break;

//                 const chunk = decoder.decode(value, { stream: true });
//                 accumulatedContent += chunk;

//                 const lines = accumulatedContent.split("\n");

//                 for (const line of lines) {
//                     if (line.startsWith("data: ")) {
//                         const jsonString = line.replace("data: ", "").trim();

//                         if (jsonString === '[DONE]') continue;

//                         try {
//                             const parsedData = JSON.parse(jsonString);

//                             if (parsedData.choices && parsedData.choices[0].delta && parsedData.choices[0].delta.content) {
//                                 let newContent = parsedData.choices[0].delta.content;

//                                 // Accumulate content
//                                 currentBlockContent += newContent;

//                                 // Check if content should be split into a new block
//                                 if (currentBlockContent.match(/(\r?\n){2,}/)) {
//                                     // Trim any trailing whitespace or empty lines
//                                     currentBlockContent = currentBlockContent.trim();

//                                     // Insert the previous block content
//                                     if (currentBlockContent.length > 0) {
//                                         const blockType = currentBlockContent.startsWith("#" || "**") ? "heading" : "paragraph";
//                                         const newBlockId = `block-${Date.now()}`;
//                                         currentBlockContent.split('*').join('');

//                                         editor.insertBlocks([{ id: newBlockId, type: blockType, content: currentBlockContent.replace(/#+\s*/, "") }], currentBlockId, "before");
//                                         setCurrentBlockId(newBlockId);
//                                     }

//                                     // Reset current block content
//                                     currentBlockContent = "";
//                                 }
//                             }
//                         } catch (error) {
//                             console.error("Failed to parse JSON:", error);
//                         }
//                     }
//                 }

//                 // Keep the last part of the content
//                 accumulatedContent = lines[lines.length - 1];
//             }

//             // Insert any remaining content after the loop
//             if (currentBlockContent.trim().length > 0) {
//                 const blockType = currentBlockContent.startsWith("#") ? "heading" : "paragraph";
//                 const newBlockId = `block-${Date.now()}`;

//                 editor.insertBlocks([{ id: newBlockId, type: blockType, content: currentBlockContent.replace(/#+\s*/, "") }], currentBlockId, "before");
//                 setCurrentBlockId(newBlockId);
//             }

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };


//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;












// manual logic implemented

// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };
//     let currentBlockId = "initial-block";
//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: currentBlockId,
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant. Generate "${inputdata.title}".`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true // Enable streaming response
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder("utf-8");
//             let accumulatedContent = "";

//             while(true) {
//                 const chunk = await reader.read();
//                 const { done, value } = chunk;
//                 if(done) {
//                     break;
//                 }
//                 const decodedChunk = decoder.decode(value);
//                 const lines = decodedChunk.split("\n");
//                 let parsedLines = lines.map((line) =>
//                     line.replace(/^data: /, "").trim()
//             ).filter(line => line !== "" && line !== "[DONE]")
//             .map((line) => JSON.parse(line));

//                 for(const parsedLine of parsedLines) {
//                     const { choices } = parsedLine;

//                     if (choices && choices.length > 0) {
//                         const dict = choices[0];

//                         if(dict && dict.delta){
//                             const {content} = dict.delta;
//                             if(content) {
//                                 if(content.startsWith("*")){
//                                     console.log(content);
//                                     accumulatedContent=accumulatedContent+content;
//                                 }
//                                 else if(content==="\n"){
//                                     editor.updateBlock(currentBlockId, {content:"", type: "paragraph" });
//                                     const now = new Date();
//                                         const hours = now.getHours();
//                                         const minutes = now.getMinutes();
//                                         const seconds = now.getSeconds();

//                                     editor.insertBlocks([{id:`${hours}:${minutes}:${seconds}`, type: "paragraph", content: "Hello World"}], currentBlockId, "after")
//                                     accumulatedContent="";
//                                 }
//                                 else{
//                                     if(content.endsWith("*")){
//                                         accumulatedContent+=content;
//                                         editor.updateBlock(currentBlockId, {content:accumulatedContent, type: "heading" });
//                                         const now = new Date();
//                                         const hours = now.getHours();
//                                         const minutes = now.getMinutes();
//                                         const seconds = now.getSeconds();

//                                     editor.insertBlocks([{id: `${hours}:${minutes}:${seconds}`, type: "heading", content: "Hello World"}], currentBlockId, "after");
//                                     currentBlockId = `${hours}:${minutes}:${seconds}`;
//                                     accumulatedContent = "";

//                                     }
//                                     else{
//                                         accumulatedContent+=content;
//                                         editor.updateBlock(currentBlockId, {content:accumulatedContent, type: "paragraph" });
//                                     }
//                                 }
//                             }

//                         }
//                     }
//                     else{
//                         console.log("nothing");
//                     }

//                 }
//             };

//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };

//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />
//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;












// improved logic by chatgpt

// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     let currentBlockId = "initial-block";
//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: currentBlockId,
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant. Generate a blog post with the title "${inputdata.title}".`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder("utf-8");
//             let accumulatedContent = "";

//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     break;
//                 }
//                 const decodedChunk = decoder.decode(value);
//                 const lines = decodedChunk.split("\n").filter(line => line.trim() !== "");

//                 for (const line of lines) {
//                     if (line.startsWith("data:")) {
//                         const jsonString = line.replace("data: ", "").trim();
//                         if (jsonString !== "[DONE]") {
//                             try {
//                                 const parsedLine = JSON.parse(jsonString);
//                                 const { choices } = parsedLine;

//                                 if (choices && choices.length > 0) {
//                                     const dict = choices[0];
//                                     if (dict && dict.delta) {
//                                         let { content } = dict.delta;
//                                         if (content) {
//                                             // Remove special characters like '*' from the content
//                                             content = content.replace(/[*]/g, '');

//                                             // Accumulate content until a new paragraph or heading is detected
//                                             accumulatedContent += content;

//                                             if (content.endsWith("\n") || content.endsWith("#")) {
//                                                 // Create a new block for each new paragraph or heading
//                                                 const newBlockId = `${Date.now()}-${Math.random()}`;
//                                                 editor.insertBlocks([{ id: newBlockId, type: "paragraph", content: "" }], currentBlockId, "after");
//                                                 currentBlockId = newBlockId;
//                                                 accumulatedContent = ""; // Reset for the next block
//                                             } else {
//                                                 // Update the current block if still accumulating content
//                                                 editor.updateBlock(currentBlockId, { content: accumulatedContent.trim(), type: "paragraph" });
//                                             }
//                                         }
//                                     }
//                                 }
//                             } catch (error) {
//                                 console.error("Error parsing JSON:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };









//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} />

//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;















// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";
// import {
//     BasicTextStyleButton,
//     BlockTypeSelect,
//     ColorStyleButton,
//     CreateLinkButton,
//     FileCaptionButton,
//     FileReplaceButton,
//     FormattingToolbar,
//     FormattingToolbarController,
//     NestBlockButton,
//     TextAlignButton,
//     UnnestBlockButton,
// } from "@blocknote/react";

// import Bluebutton from '../components/bluebutton';

// const Blog = () => {
//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     let currentBlockId = "initial-block";
//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: currentBlockId,
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//         onSelectionChange: (selection) => {
//             if (selection && selection.blocks.length > 0) {
//                 setSelectedBlockId(selection.blocks[0].id);
//                 console.log("Text selected in editor ID:", editorId);

//             }
//         }
//     });

//     const [selectedBlockId, setSelectedBlockId] = useState("initial-block");

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant. Generate a blog post with the title "${inputdata.title}".`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder("utf-8");
//             let accumulatedContent = "";

//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     break;
//                 }
//                 const decodedChunk = decoder.decode(value);
//                 const lines = decodedChunk.split("\n").filter(line => line.trim() !== "");

//                 for (const line of lines) {
//                     if (line.startsWith("data:")) {
//                         const jsonString = line.replace("data: ", "").trim();
//                         if (jsonString !== "[DONE]") {
//                             try {
//                                 const parsedLine = JSON.parse(jsonString);
//                                 const { choices } = parsedLine;

//                                 if (choices && choices.length > 0) {
//                                     const dict = choices[0];
//                                     if (dict && dict.delta) {
//                                         let { content } = dict.delta;
//                                         if (content) {
//                                             // Remove special characters like '*' from the content
//                                             content = content.replace(/[*]/g, '');

//                                             // Accumulate content until a new paragraph or heading is detected
//                                             accumulatedContent += content;

//                                             if (content.endsWith("\n") || content.endsWith("#")) {
//                                                 // Create a new block for each new paragraph or heading
//                                                 const newBlockId = `${Date.now()}-${Math.random()}`;
//                                                 editor.insertBlocks([{ id: newBlockId, type: "paragraph", content: "" }], currentBlockId, "after");
//                                                 currentBlockId = newBlockId;
//                                                 accumulatedContent = ""; // Reset for the next block
//                                             } else {
//                                                 // Update the current block if still accumulating content
//                                                 editor.updateBlock(currentBlockId, { content: accumulatedContent.trim(), type: "paragraph" });
//                                             }
//                                         }
//                                     }
//                                 }
//                             } catch (error) {
//                                 console.error("Error parsing JSON:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };









//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
// <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor} formattingToolbar={false} >
//                     <FormattingToolbarController
//                         formattingToolbar={() => (
//                             <FormattingToolbar>
//                                 <BlockTypeSelect key={"blockTypeSelect"} />

//                                 {/* Extra button to toggle blue text & background */}
//                                 <Bluebutton key={"customButton"} editor={editor} selectedBlockId={selectedBlockId} />

//                                 <FileCaptionButton key={"fileCaptionButton"} />
//                                 <FileReplaceButton key={"replaceFileButton"} />

//                                 <BasicTextStyleButton
//                                     basicTextStyle={"bold"}
//                                     key={"boldStyleButton"}
//                                 />
//                                 <BasicTextStyleButton
//                                     basicTextStyle={"italic"}
//                                     key={"italicStyleButton"}
//                                 />
//                                 <BasicTextStyleButton
//                                     basicTextStyle={"underline"}
//                                     key={"underlineStyleButton"}
//                                 />
//                                 <BasicTextStyleButton
//                                     basicTextStyle={"strike"}
//                                     key={"strikeStyleButton"}
//                                 />
//                                 {/* Extra button to toggle code styles */}
//                                 <BasicTextStyleButton
//                                     key={"codeStyleButton"}
//                                     basicTextStyle={"code"}
//                                 />

//                                 <TextAlignButton
//                                     textAlignment={"left"}
//                                     key={"textAlignLeftButton"}
//                                 />
//                                 <TextAlignButton
//                                     textAlignment={"center"}
//                                     key={"textAlignCenterButton"}
//                                 />
//                                 <TextAlignButton
//                                     textAlignment={"right"}
//                                     key={"textAlignRightButton"}
//                                 />

//                                 <ColorStyleButton key={"colorStyleButton"} />

//                                 <NestBlockButton key={"nestBlockButton"} />
//                                 <UnnestBlockButton key={"unnestBlockButton"} />

//                                 <CreateLinkButton key={"createLinkButton"} />
//                             </FormattingToolbar>
//                         )}
//                     />
//                     </BlockNoteView>

//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;







// import { Block } from "@blocknote/core";
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import { useState } from "react";

// // import "./styles.css";

// export default function App() {
//   // Stores the selected blocks as an array of Block objects.
//   const [blocks, setBlocks] = useState([]);
//   // Creates a new editor instance.
//   const editor = useCreateBlockNote({
//     initialContent: [
//       {
//         type: "paragraph",
//         content: "Welcome to this demo!",
//       },
//       {
//         type: "paragraph",
//         content: "Select different blocks to see the JSON change below",
//       },
//       {
//         type: "paragraph",
//       },
//     ],
//   });

//   // Renders the editor instance.
//   return (
//     <div className={"wrapper"}>
//       <div>BlockNote Editor:</div>
//       <div className={"item"}>
//         <BlockNoteView
//           editor={editor}
//           onSelectionChange={() => {
//             const selection = editor.getSelection();

//             // Get the blocks in the current selection and store on the state. If
//             // the selection is empty, store the block containing the text cursor
//             // instead.
//             if (selection !== undefined) {
//               setBlocks(selection.blocks);
//             } else {
//               setBlocks([editor.getTextCursorPosition().block]);
//             }
//           }}
//         />
//       </div>
//       <div>Selection JSON:</div>
//       <div className={"item bordered"}>
//         <pre>
//           <code>{JSON.stringify(blocks, null, 2)}</code>
//         </pre>
//       </div>
//     </div>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import { Card, Button, Form } from 'react-bootstrap';
// import "@blocknote/core/fonts/inter.css";
// import { useCreateBlockNote } from "@blocknote/react";
// import { BlockNoteView } from "@blocknote/mantine";
// import "@blocknote/mantine/style.css";
// import "./blog.css";
// import {
//     BasicTextStyleButton,
//     BlockTypeSelect,
//     ColorStyleButton,
//     CreateLinkButton,
//     FileCaptionButton,
//     FileReplaceButton,
//     FormattingToolbar,
//     FormattingToolbarController,
//     NestBlockButton,
//     TextAlignButton,
//     UnnestBlockButton,
// } from "@blocknote/react";

// import Bluebutton from '../components/bluebutton';


// const Blog = () => {

//     // Stores the selected blocks as an array of Block objects.
//     const [blocks, setBlocks] = useState([]);

//     const [inputdata, setInputData] = useState({
//         title: "",
//         introduction: "",
//         theme: ""
//     });

//     const setInputValue = (e) => {
//         const { name, value } = e.target;
//         setInputData({ ...inputdata, [name]: value });
//     };

//     let currentBlockId = "initial-block";
//     const editor = useCreateBlockNote({
//         initialContent: [
//             {
//                 id: currentBlockId,
//                 type: "paragraph",
//                 content: "",
//             },
//         ],
//     });

//     const [showEditor, setShowEditor] = useState(false);

//     useEffect(() => {
//         console.log("Editor initialized with content:", editor.document);
//     }, [editor]);

//     const fetchBlogContent = async () => {
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": `You are an AI assistant. Generate a blog post with the title "${inputdata.title}".`
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 1000,
//             "stream": true
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             const reader = response.body.getReader();
//             const decoder = new TextDecoder("utf-8");
//             let accumulatedContent = "";

//             while (true) {
//                 const { done, value } = await reader.read();
//                 if (done) {
//                     break;
//                 }
//                 const decodedChunk = decoder.decode(value);
//                 const lines = decodedChunk.split("\n").filter(line => line.trim() !== "");

//                 for (const line of lines) {
//                     if (line.startsWith("data:")) {
//                         const jsonString = line.replace("data: ", "").trim();
//                         if (jsonString !== "[DONE]") {
//                             try {
//                                 const parsedLine = JSON.parse(jsonString);
//                                 const { choices } = parsedLine;

//                                 if (choices && choices.length > 0) {
//                                     const dict = choices[0];
//                                     if (dict && dict.delta) {
//                                         let { content } = dict.delta;
//                                         if (content) {
//                                             // Remove special characters like '*' from the content
//                                             content = content.replace(/[*]/g, '');

//                                             // Accumulate content until a new paragraph or heading is detected
//                                             accumulatedContent += content;

//                                             if (content.endsWith("\n") || content.endsWith("#")) {
//                                                 // Create a new block for each new paragraph or heading
//                                                 const newBlockId = `${Date.now()}-${Math.random()}`;
//                                                 editor.insertBlocks([{ id: newBlockId, type: "paragraph", content: "" }], currentBlockId, "after");
//                                                 currentBlockId = newBlockId;
//                                                 accumulatedContent = ""; // Reset for the next block
//                                             } else {
//                                                 // Update the current block if still accumulating content
//                                                 editor.updateBlock(currentBlockId, { content: accumulatedContent.trim(), type: "paragraph" });
//                                             }
//                                         }
//                                     }
//                                 }
//                             } catch (error) {
//                                 console.error("Error parsing JSON:", error);
//                             }
//                         }
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Error fetching blog content:", error);
//         }
//     };

//     if (blocks[0]) {
//         let { id } = blocks[0];
//         console.log("The id is ", id);
//     }





//     const submitUserData = async (e) => {
//         e.preventDefault();
//         setShowEditor(true);
//         fetchBlogContent();
//     };

//     return (
//         <div>
//             {showEditor ? (
//                 <div className='Blockeditor'>
//                     <BlockNoteView editor={editor}
//                         onSelectionChange={() => {
//                             const selection = editor.getSelection();

//                             // Get the blocks in the current selection and store on the state. If
//                             // the selection is empty, store the block containing the text cursor
//                             // instead.
//                             if (selection !== undefined) {
//                                 setBlocks(selection.blocks);
//                             } else {
//                                 setBlocks([editor.getTextCursorPosition().block]);
//                             }
//                         }}
//                     >

//                         <FormattingToolbarController
//                             formattingToolbar={() => (
//                                 <FormattingToolbar>
//                                     <BlockTypeSelect key={"blockTypeSelect"} />

//                                     {/* Extra button to toggle blue text & background */}
//                                     <Bluebutton key={"customButton"} editor={editor} selectedBlockId={id} />

//                                     <FileCaptionButton key={"fileCaptionButton"} />
//                                     <FileReplaceButton key={"replaceFileButton"} />

//                                     <BasicTextStyleButton
//                                         basicTextStyle={"bold"}
//                                         key={"boldStyleButton"}
//                                     />
//                                     <BasicTextStyleButton
//                                         basicTextStyle={"italic"}
//                                         key={"italicStyleButton"}
//                                     />
//                                     <BasicTextStyleButton
//                                         basicTextStyle={"underline"}
//                                         key={"underlineStyleButton"}
//                                     />
//                                     <BasicTextStyleButton
//                                         basicTextStyle={"strike"}
//                                         key={"strikeStyleButton"}
//                                     />
//                                     {/* Extra button to toggle code styles */}
//                                     <BasicTextStyleButton
//                                         key={"codeStyleButton"}
//                                         basicTextStyle={"code"}
//                                     />

//                                     <TextAlignButton
//                                         textAlignment={"left"}
//                                         key={"textAlignLeftButton"}
//                                     />
//                                     <TextAlignButton
//                                         textAlignment={"center"}
//                                         key={"textAlignCenterButton"}
//                                     />
//                                     <TextAlignButton
//                                         textAlignment={"right"}
//                                         key={"textAlignRightButton"}
//                                     />

//                                     <ColorStyleButton key={"colorStyleButton"} />

//                                     <NestBlockButton key={"nestBlockButton"} />
//                                     <UnnestBlockButton key={"unnestBlockButton"} />

//                                     <CreateLinkButton key={"createLinkButton"} />
//                                 </FormattingToolbar>
//                             )}
//                         />

//                     </BlockNoteView>

//                 </div>
//             ) : (
//                 <Card className='shadow mt-3 p-3'>
//                     <Form>
//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Introduction</Form.Label>
//                             <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
//                         </Form.Group>

//                         <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
//                             <Form.Label>Theme & Style</Form.Label>
//                             <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
//                         </Form.Group>
//                         <Button variant="primary" type="submit" onClick={submitUserData}>
//                             Submit
//                         </Button>
//                     </Form>
//                 </Card>
//             )}
//         </div>
//     );
// };

// export default Blog;



















import React, { useState, useEffect } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./blog.css";
import {
    BasicTextStyleButton,
    BlockTypeSelect,
    ColorStyleButton,
    CreateLinkButton,
    FileCaptionButton,
    FileReplaceButton,
    FormattingToolbar,
    FormattingToolbarController,
    NestBlockButton,
    TextAlignButton,
    UnnestBlockButton,
} from "@blocknote/react";

import Bluebutton from '../components/bluebutton';

const Blog = () => {
    // Stores the selected blocks as an array of Block objects.
    const [blocks, setBlocks] = useState([]);
    const [selectedBlockId, setSelectedBlockId] = useState(null); // Added state for selected block id

    const [inputdata, setInputData] = useState({
        title: "",
        introduction: "",
        theme: ""
    });

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setInputData({ ...inputdata, [name]: value });
    };

    let currentBlockId = "initial-block";
    const editor = useCreateBlockNote({
        initialContent: [
            {
                id: currentBlockId,
                type: "paragraph",
                content: "",
            },
        ],
    });

    const [showEditor, setShowEditor] = useState(false);

    useEffect(() => {
        console.log("Editor initialized with content:", editor.document);
    }, [editor]);

    const fetchBlogContent = async () => {
        const headers = {
            "Content-Type": "application/json",
            "api-key": "61bba28134984fd685c910f191634c10",
        };

        const payload = {
            "messages": [
                {
                    "role": "system",
                    "content": `You are an AI assistant. Generate a blog post with the title "${inputdata.title}".`
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 1000,
            "stream": true
        };

        const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

        try {
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let accumulatedContent = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    break;
                }
                const decodedChunk = decoder.decode(value);
                const lines = decodedChunk.split("\n").filter(line => line.trim() !== "");

                for (const line of lines) {
                    if (line.startsWith("data:")) {
                        const jsonString = line.replace("data: ", "").trim();
                        if (jsonString !== "[DONE]") {
                            try {
                                const parsedLine = JSON.parse(jsonString);
                                const { choices } = parsedLine;

                                if (choices && choices.length > 0) {
                                    const dict = choices[0];
                                    if (dict && dict.delta) {
                                        let { content } = dict.delta;
                                        if (content) {
                                            // Remove special characters like '*' from the content
                                            content = content.replace(/[*]/g, '');

                                            // Accumulate content until a new paragraph or heading is detected
                                            accumulatedContent += content;

                                            if (content.endsWith("\n") || content.endsWith("#")) {
                                                // Create a new block for each new paragraph or heading
                                                const newBlockId = `${Date.now()}-${Math.random()}`;
                                                editor.insertBlocks([{ id: newBlockId, type: "paragraph", content: "" }], currentBlockId, "after");
                                                currentBlockId = newBlockId;
                                                accumulatedContent = ""; // Reset for the next block
                                            } else {
                                                // Update the current block if still accumulating content
                                                editor.updateBlock(currentBlockId, { content: accumulatedContent.trim(), type: "paragraph" });
                                            }
                                        }
                                    }
                                }
                            } catch (error) {
                                console.error("Error parsing JSON:", error);
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching blog content:", error);
        }
    };

    useEffect(() => {
        if (blocks.length > 0) {
            setSelectedBlockId(blocks[0].id);
        }
    }, [blocks]);

    const submitUserData = async (e) => {
        e.preventDefault();
        setShowEditor(true);
        fetchBlogContent();
    };

    return (
        <div>
            {showEditor ? (
                <div className='Blockeditor'>
                    <BlockNoteView editor={editor} formattingToolbar={false}
                        onSelectionChange={() => {
                            const selection = editor.getSelection();

                            // Get the blocks in the current selection and store on the state. If
                            // the selection is empty, store the block containing the text cursor
                            // instead.
                            if (selection !== undefined) {
                                setBlocks(selection.blocks);
                            } else {
                                setBlocks([editor.getTextCursorPosition().block]);
                            }
                        }}
                    >
                        <FormattingToolbarController
                            formattingToolbar={() => (
                                <FormattingToolbar>
                                    <BlockTypeSelect key={"blockTypeSelect"} />

                                    {/* Pass the selectedBlockId to Bluebutton */}
                                    <Bluebutton key={"customButton"} editor={editor} selectedBlockId={selectedBlockId} />

                                    <FileCaptionButton key={"fileCaptionButton"} />
                                    <FileReplaceButton key={"replaceFileButton"} />

                                    <BasicTextStyleButton
                                        basicTextStyle={"bold"}
                                        key={"boldStyleButton"}
                                    />
                                    <BasicTextStyleButton
                                        basicTextStyle={"italic"}
                                        key={"italicStyleButton"}
                                    />
                                    <BasicTextStyleButton
                                        basicTextStyle={"underline"}
                                        key={"underlineStyleButton"}
                                    />
                                    <BasicTextStyleButton
                                        basicTextStyle={"strike"}
                                        key={"strikeStyleButton"}
                                    />
                                    {/* Extra button to toggle code styles */}
                                    <BasicTextStyleButton
                                        key={"codeStyleButton"}
                                        basicTextStyle={"code"}
                                    />

                                    <TextAlignButton
                                        textAlignment={"left"}
                                        key={"textAlignLeftButton"}
                                    />
                                    <TextAlignButton
                                        textAlignment={"center"}
                                        key={"textAlignCenterButton"}
                                    />
                                    <TextAlignButton
                                        textAlignment={"right"}
                                        key={"textAlignRightButton"}
                                    />

                                    <ColorStyleButton key={"colorStyleButton"} />

                                    <NestBlockButton key={"nestBlockButton"} />
                                    <UnnestBlockButton key={"unnestBlockButton"} />

                                    <CreateLinkButton key={"createLinkButton"} />
                                </FormattingToolbar>
                            )}
                        />
                    </BlockNoteView>
                </div>
            ) : (
                <Card className='shadow mt-3 p-3'>
                    <Form>
                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter the title" value={inputdata.title} name='title' onChange={setInputValue} />
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Label>Introduction</Form.Label>
                            <Form.Control type="text" placeholder="Enter some introduction" value={inputdata.introduction} name='introduction' onChange={setInputValue} />
                        </Form.Group>

                        <Form.Group className="mb3 col-lg-6" controlId="formBasicEmail">
                            <Form.Label>Theme & Style</Form.Label>
                            <Form.Control type="text" placeholder="Enter the theme & style" value={inputdata.theme} name='theme' onChange={setInputValue} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={submitUserData}>
                            Submit
                        </Button>
                    </Form>
                </Card>
            )}
        </div>
    );
};

export default Blog;
