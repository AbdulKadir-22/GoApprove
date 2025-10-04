import React, { useState, useRef, useEffect } from 'react';

// This would typically be in an index.html, but for a self-contained component,
// we'll assume pdf.js is loaded or handle it dynamically.
const PDFJS_WORKER_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.worker.min.js';

const ReceiptScanner = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [statusText, setStatusText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState({ message: '', visible: false });
    const [formData, setFormData] = useState({
        vendor: '',
        date: '',
        description: '',
        expenseLines: '',
        amount: '',
        expenseType: 'Other',
    });

    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);

    const expenseCategories = ['Other', 'Food & Dining', 'Stay', 'Travel', 'Fuel', 'Health/Medical', 'Education', 'Office Supplies', 'Utilities', 'Entertainment'];

    useEffect(() => {
        // Dynamically load the pdf.js script and set up the worker.
        if (window.pdfjsLib) {
            window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
            return; // Already loaded
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
        
        script.onload = () => {
            if (window.pdfjsLib) {
                window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_SRC;
            }
        };
        
        script.onerror = () => {
            console.error("Failed to load the pdf.js script.");
            showNotification("Error: Could not load PDF processing library.");
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup: remove the script if the component is unmounted.
            if (script.parentNode) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const showNotification = (message) => {
        setNotification({ message, visible: true });
        setTimeout(() => {
            setNotification({ message: '', visible: false });
        }, 3000);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (file.type === "application/pdf") {
            handlePdfUpload(file);
        } else {
            handleImageUpload(file);
        }
    };

    const handleImageUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handlePdfUpload = (file) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            if (!window.pdfjsLib) {
                showNotification("Error: PDF library is not available. Please try again shortly.");
                return;
            }
            try {
                const pdf = await window.pdfjsLib.getDocument({ data: e.target.result }).promise;
                const page = await pdf.getPage(1);
                const viewport = page.getViewport({ scale: 2.0 });

                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                await page.render({ canvasContext: context, viewport }).promise;
                setImagePreview(canvas.toDataURL('image/jpeg', 0.95));
            } catch (error) {
                showNotification("Error: Failed to render PDF.");
                console.error("Error rendering PDF:", error);
            }
        };
        reader.readAsArrayBuffer(file);
    };
    
    const analyzeReceiptWithAI = async (base64ImageData) => {
        // Reverted to hardcoded key to resolve build environment issue.
        const apiKey = "AIzaSyBglI8ItcPFikZyMucY7YalfNYXk_IjCuY";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
        const imageData = base64ImageData.split(',')[1];

        const prompt = `
            You are an expert receipt scanning AI. Analyze the following receipt image and extract the following details:
            1.  **vendor**: The name of the store or service provider.
            2.  **date**: The full date of the transaction. If possible, format it as YYYY-MM-DD. Handle various date formats including words (e.g., 'Sep 30, 2025').
            3.  **total**: The final total amount paid, including any currency symbol found on the receipt (e.g., ₹, $, €).
            4.  **category**: The most likely expense category. Choose from: 'Food & Dining', 'Stay', 'Travel', 'Fuel', 'Health/Medical', 'Education', 'Office Supplies', 'Utilities', 'Entertainment', 'Other'.
            5.  **lineItems**: An array of objects for each item on the receipt. Each object should have two keys: 'description' (the item name) and 'amount' (the item price as a string). If no clear line items are present, return an empty array [].
            Return the result as a single, clean JSON object with these exact keys: vendor, date, total, category, lineItems. Do not include any other text, explanations, or markdown formatting like \`\`\`json.
        `;
        const payload = {
            contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: "image/jpeg", data: imageData } }] }]
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate?.content?.parts?.[0]?.text) {
            try {
                const cleanedText = candidate.content.parts[0].text.replace(/```json/g, '').replace(/```/g, '').trim();
                return JSON.parse(cleanedText);
            } catch (e) {
                console.error("Failed to parse JSON from AI response:", candidate.content.parts[0].text, e);
                throw new Error("AI returned an invalid format.");
            }
        } else {
            throw new Error("No content returned from AI.");
        }
    };

    const handleAnalyzeClick = async () => {
        if (!imagePreview) {
            showNotification("Please upload an image first.");
            return;
        }

        setIsLoading(true);
        setStatusText('Analyzing receipt with AI... This may take a moment.');

        try {
            const result = await analyzeReceiptWithAI(imagePreview);
            if (result && !result.error) {
                const categoryExists = expenseCategories.includes(result.category);
                setFormData({
                    vendor: result.vendor || '',
                    date: result.date || '',
                    amount: result.total || '',
                    description: result.vendor ? `Purchase from ${result.vendor}` : '',
                    expenseLines: (result.lineItems || []).map(item => `${item.description || 'N/A'} - ${item.amount || 'N/A'}`).join('\n'),
                    expenseType: categoryExists ? result.category : 'Other',
                });
                setStatusText('Analysis complete!');
            } else {
                throw new Error(result.error || 'The AI could not process the receipt.');
            }
        } catch (error) {
            console.error('AI Analysis Error:', error);
            showNotification(`Error: ${error.message}`);
            setStatusText('An error occurred during AI analysis.');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        }
    };
    
    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="container max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">AI-Powered Receipt Scanner</h1>
                <p className="text-gray-500 mt-2">Upload a receipt and let our AI automatically extract the details.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
                    <canvas ref={canvasRef} className="hidden"></canvas>
                    <div className="w-full h-64 mb-4 flex items-center justify-center">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Receipt Preview" className="max-w-full max-h-full rounded-lg object-contain" />
                        ) : (
                            <div className="text-center text-gray-400">
                                <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 4v.01M28 8L16 20m12-12v8m0 4v.01M12 28h12m-12 4h12m4 4h.01M28 8a4 4 0 014 4v4m0 8v4a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <p className="mt-2">Image or PDF preview will appear here</p>
                            </div>
                        )}
                    </div>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,application/pdf" className="hidden" />
                    <button onClick={() => fileInputRef.current.click()} className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                         Choose File
                    </button>
                    {imagePreview && (
                        <div className="w-full mt-3">
                            <button onClick={handleAnalyzeClick} disabled={isLoading} className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                                 <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                                Analyze with AI
                            </button>
                        </div>
                    )}
                    {isLoading && (
                        <div className="w-full mt-4">
                            <p className="text-center text-sm text-gray-600 mb-2">{statusText}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-indigo-600 h-2.5 rounded-full shimmer"></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Extracted Details</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Vendor Name</label>
                                <input type="text" id="vendor" value={formData.vendor} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" id="date" value={formData.date} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea id="description" rows="3" value={formData.description} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="expenseLines" className="block text-sm font-medium text-gray-700">Expense Lines</label>
                            <textarea id="expenseLines" rows="4" value={formData.expenseLines} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 bg-gray-50"></textarea>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Total Amount</label>
                                <input type="text" id="amount" value={formData.amount} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                            </div>
                            <div>
                                <label htmlFor="expenseType" className="block text-sm font-medium text-gray-700">Expense Type</label>
                                <select id="expenseType" value={formData.expenseType} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                    {expenseCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {notification.visible && (
                <div className="fixed bottom-5 right-5 bg-red-600 text-white py-3 px-5 rounded-lg shadow-lg animate-fade-in-up">
                    <p>{notification.message}</p>
                </div>
            )}
        </div>
    );
};

export default ReceiptScanner;

