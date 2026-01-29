---
title: How does AI work and why do I care?
summary: >-
  The benefits of better understanding how AI systems function and how chatbots
  answer your questions.
date: '2026-01-02'
type: Article
published: true
---


FROM: Ben Lovell

RE: How does AI work and why do I care?

## QUESTION PRESENTED: 
How does it benefit me to better understand how AI chatbots answer my questions?

## SHORT ANSWER: 
AI Models are predictive machines. Understanding the nature of how they analyze input and generate answers will help you evaluate the answers you receive. You can ask the same question and get different answers--how you ask matters.

## DISCUSSION

### I. Can I trust AI models?
No. No you cannot. As stated above, Large Language Models run entirely on vector multiplication and multidimensional manifolds predicting the next word based on the context of all the other words you input into the model. They complete the story. This works wonderfully for confirmable tasks, like math problems with a known solution, but not so great for generating arguments in a legal context. As a lawyer, clients trust me therefore I cannot delegate that trust to an AI model.

### II. So, how do they work?
By multiplying and processing incredibly large collections of numbers and representing connections in higher dimensional manifolds. It is simple and complicated all at once. 
The LLM breaks down your question into tokens (collections of numbers representing the words you used) and embeds those tokens with connections. The model then performs calculations on those embeddings.
![Pasted image 20260129111657](/images/blog/pasted-image-20260129111657.png)
Visualization of the embedding graph for the sentence "AI agents will be the most hot topic of artificial intelligence in 2025," from "LLM Embeddings Explained: A Visual and Intuitive Guide", 2025.[^1] 

LLMs calculate how the words are related to each other to create these embeddings and connect them with other knowledge (more numbers) the models have stored internally. The result is a prediction of the next likeliest word. Wash, rinse, repeat in parallel.

### III. So, what can I use AI for?
Regardless of the math and tendency to hallucinate, LLMs generate remarkable value. LLMs are great for searching PDFs or large data sets and finding connections. This makes them great for use in discovery. 

#### Two examples:
1. Create deadlines from a scheduling order.
	1. Extracting deadlines from a document is a great use case for an LLM. I designed my own system to do this as part of trial preparation software I created--ld5k.com. You can use a more advanced model like Gemini or Claude, but you need to give the model more context to achieve the best result. You need to tell the system what a scheduling order is, how deadlines are presented in the document, how to calculate any relative deadlines--two weeks before trial--and tell it the rules for how weekends are handled. 
2. Outline motions
	1. Drafting motions with LLMs is a disaster. Outlining, however, I find to be useful. Legal arguments are outlined formulaically from statute or case law and LLMs can provide a good start. I use LLMs to outline a motion by section and work from there. Sometimes the LLM will cite case law which may or may not be related to your topic but is a good place to start with research.

### IV. What can't I use AI for?
I do not use AI to write. I do not use LLMs for anything beyond basic outlines or generic email draft responses. Not only will offloading your critical thinking to AI make you worse at your job, it will increase your propensity to make a mistake. You start to trust the LLM and forget to check its work. Try drafting a real motion with ChatGPT and you will be frustrated.

[^1]: https://huggingface.co/spaces/hesamation/primer-llm-embedding?section=what_are_embeddings?
