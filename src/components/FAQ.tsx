import React, { useState } from 'react';

export default function FAQ() {

    const faqs = [
        {
            question: 'What is the AI Voice Interviewer?',
            answer:
                'It’s an AI-powered tool that automatically calls and interviews job candidates using a friendly, human-like voice. It helps small businesses screen faster and more efficiently.'
        },
        {
            question: 'How does it work?',
            answer:
                'You create a job, add your interview questions, and our system calls each candidate. It records their answers, scores them with AI, and sends you a report — all automatically.'
        },
        {
            question: 'Can I customize the interview questions?',
            answer:
                'Yes! You can fully customize the questions for each role. The AI voice will ask them in a natural and conversational tone.'
        },
        {
            question: 'Do I need to be technical to use it?',
            answer:
                'Nope. The setup is simple and doesn’t require any tech knowledge. Just enter your job details, upload your candidates, and you’re good to go.'
        },
        {
            question: 'How are candidates scored?',
            answer:
                'Our system uses natural language understanding to evaluate clarity, relevance, and soft skills. You can also adjust scoring based on what matters to you.'
        },
        {
            question: 'Is the AI voice realistic?',
            answer:
                'Yes — we use industry-leading voice models to create a natural and friendly experience for candidates. It sounds just like a real person.'
        }
    ];

    const [openIndex, setOpenIndex] = useState(-1);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section id="faq" className="py-24 md:py-16 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center mb-3">
                        <span className="inline-flex items-center px-4 py-2 text-md font-medium bg-indigo-100 text-indigo-500 rounded-full">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.39-2.46a1 1 0 00-1.176 0l-3.39 2.46c-.784.57-1.838-.197-1.539-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.045 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                            FAQ
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 max-w-2xl mx-auto">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={index}
                                className="border-b border-gray-200 pb-4"
                            >
                                <button
                                    onClick={() => handleToggle(index)}
                                    className="w-full flex items-center justify-between text-left focus:outline-none"
                                >
                                    <span className="text-gray-800 font-semibold">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <div className="mt-3 text-gray-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
