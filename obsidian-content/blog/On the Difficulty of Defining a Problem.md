Lawyers have to deal with this every day. How do we define a legal problem so that we may solve it more easily?

This paradigm also applies to using AI tools

I have found that designing your own systems to solve problems helps you better understand the problem. Using AI models is somewhat akin to teaching. You learn what you didn't make explicit or explain properly the instant you see a result. Just like a witness who goes off on a tangent during a deposition.

So let's start with a case study. I wanted to write a motion and needed excerpts pulled from a deposition transcript as supporting facts in my motion. 

So let's design a tool to do that. But how? You might think just handing the document to an AI model and saying pull these citations would be simple, but does the AI model know what a deposition is or what it looks like? We've gotten ahead of ourselves.

The first attempt failed. The system wanted to classify the documents and decided if the filename isn't "Deposition.pdf," then it isn't a deposition and should be ignored. We didn't ask it to do that, it assumed, revealing how important explicit instructions are with predictive models. 

So we reclassified the document types and achieved recognition of the document containing deposition citations, and the deposition transcript itself. Let's try again. It failed again. This time it doesn't know how to classify the expert report. Again, if the filename is not ExpertReport.pdf, it doesn't know what to do and fails.

So let's try again. It now recognizes both with a lot of help and runs an extraction. However, only 6 of almost 30 citations are pulled. The Agent tells us it is confused by the citation format used by this particular expert. AI models show you how inconsistent we are with each other because humans have better general intelligence. LLMs don't know the world except through written text.

These are some of the limitations you face with just a computer running your law firm research lab. Of course I will expand the hardware eventually and be able to run larger models locally but for now I am constrained and must be clever. 