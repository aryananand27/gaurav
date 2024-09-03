// import React from 'react';

// const Bluebutton = ({ editor, selectedBlockId }) => {

//     const handleClick = async () => {
//         const selectedBlock = editor.getBlock(selectedBlockId);
//         if (selectedBlock) {
//             const currentContent = selectedBlock.content;

//             // Call OpenAI API to modify the content
//             const headers = {
//                 "Content-Type": "application/json",
//                 "api-key": "YOUR_API_KEY",
//             };

//             const payload = {
//                 "messages": [
//                     {
//                         "role": "system",
//                         "content": `You are an AI assistant. Modify the following text: "${currentContent}".`
//                     }
//                 ],
//                 "temperature": 0.7,
//                 "top_p": 0.95,
//                 "max_tokens": 100,
//                 "stream": false
//             };

//             const ENDPOINT = "https://YOUR_OPENAI_API_ENDPOINT";

//             try {
//                 const response = await fetch(ENDPOINT, {
//                     method: 'POST',
//                     headers: headers,
//                     body: JSON.stringify(payload)
//                 });

//                 const data = await response.json();
//                 const modifiedContent = data.choices[0].message.content;

//                 // Update the block with the modified content
//                 editor.updateBlock(selectedBlockId, { content: modifiedContent });
//             } catch (error) {
//                 console.error("Error modifying content:", error);
//             }
//         }
//     };

//     return (
//         <button onClick={handleClick}>
//             Modify Content
//         </button>
//     );
// };

// export default Bluebutton;














// import React from 'react';

// // Define your Bluebutton component
// const Bluebutton = ({ editor, selectedBlockId }) => {
//     const handleClick = async () => {
//         if (!selectedBlockId) {
//             console.error("No block selected");
//             return;
//         }

//         // Define your OpenAI API request headers and payload
//         const headers = {
//             "Content-Type": "application/json",
//             "api-key": "61bba28134984fd685c910f191634c10",
//         };

//         const payload = {
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": "You are an AI assistant. Modify the content with same number of words based on the existing text."
//                 },
//                 {
//                     "role": "user",
//                     "content": editor.getBlock(selectedBlockId)?.content || ""
//                 }
//             ],
//             "temperature": 0.7,
//             "top_p": 0.95,
//             "max_tokens": 500
//         };

//         const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

//         try {
//             const response = await fetch(ENDPOINT, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(payload)
//             });

//             const data = await response.json();

//             if (data.choices && data.choices.length > 0) {
//                 const updatedContent = data.choices[0].message.content;
                
//                 // Update the content of the selected block
//                 editor.updateBlock(selectedBlockId, { content: updatedContent });
//             } else {
//                 console.error("Unexpected response from OpenAI API");
//             }
//         } catch (error) {
//             console.error("Error updating block content:", error);
//         }
//     };

//     return (
//         <button className="btn btn-primary" onClick={handleClick} style={{color: 'blue'}}>
//             Modify
//         </button>
//     );
// };

// export default Bluebutton;























import React from 'react';

// Define your Bluebutton component
const Bluebutton = ({ editor, selectedBlockId }) => {
    const handleClick = async () => {
        if (!selectedBlockId) {
            console.error("No block selected");
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "api-key": "61bba28134984fd685c910f191634c10",
        };

        const payload = {
            "messages": [
                {
                    "role": "system",
                    "content": "You are an AI assistant. Modify the content with same number of words based on the existing text."
                },
                {
                    "role": "user",
                    "content": editor.getBlock(selectedBlockId)?.content || ""
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 500,
            "stream": true // Enable streaming
        };

        const ENDPOINT = "https://scankartadmin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview";

        try {
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload)
            });

            if (!response.body) {
                console.error("ReadableStream not supported in this environment.");
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let accumulatedContent = "";

            // Read the stream data
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const decodedChunk = decoder.decode(value);
                const lines = decodedChunk.split("\n").filter(line => line.trim() !== "");

                // Parse the streaming data and extract the content

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
                                            editor.updateBlock(selectedBlockId, { content: accumulatedContent.trim(), type: "paragraph" });
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
            console.error("Error updating block content:", error);
        }
    };

    return (
        <button className="btn btn-primary" onClick={handleClick} style={{ color: 'blue' }}>
            Modify
        </button>
    );
};

export default Bluebutton;
