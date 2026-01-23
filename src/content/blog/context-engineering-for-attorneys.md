---
title: Context Engineering for Attorneys
summary: >-
  How to change the way you ask AI tools questions to achieve substantially
  better results and reduce frustrating back and forth.
date: 2026-01-14T00:00:00.000Z
type: Op-Ed
published: true
---

RE: How do attorneys get better answers from AI models?

## QUESTION PRESENTED: 
How does the way I ask an AI model a question impact the answer I receive?

## SHORT ANSWER: 
It has a substantial affect. The context that you provide within your question, the constraints you give the agent, and the guidance you give on what a good response looks like all *greatly* affect the quality of the answers you receive. 

## DISCUSSION

#### I. What is Context in this...Context?
When I talk about context and AI models in the same sentence, I'm talking about how much information the AI can remember during your conversation. I will refer to that as AI Context. AI engineers call it a context window, and just like your chat window it continues to expand in size as you interact with the model.  Problems arise when the context window gets too long so the more context you give the model in its context window, the better.

#### II Building Context into Your Prompts (check title case rules)
Let's start with a common problem that you may be asking an AI tool to solve. You want a model to perform an initial review of some discovery. 

> **It is important to remember** that public AI tools such as Google Gemini and ChatGPT do not offer protection or safeguards for the data you upload to their services. If the information you are reviewing is privileged or contains PII, you cannot guarantee it's custody unless you run your own AI tools at your office or home.

Common problem: Perform an initial review of Defendant's discovery responses and identify boilerplate objections or missing documents.

Basic Prompt: 
> Perform an initial review of Defendant's discovery responses look for boilerplate objections.

##### What's the problem?
The response an AI tool will give to the basic prompt will likely perform poorly. You will be frustrated with the results and may conclude that AI tools can't do anything right. This isn't entirely true. You can treat the AI tool like an intern who doesn't know anything about you or your practice.

Context Engineered Prompt: 
> **Role:** You are a senior litigation paralegal and discovery specialist at a premier plaintiffs' personal injury firm. You are an expert at identifying evasive discovery responses and non-compliant objections under the Rules of Civil Procedure.

> **Task:** Review the provided "Defendant’s Responses to Plaintiff’s First Request for Production" and generate a Discovery Deficiency Table.

> **Context:** Our client was injured in a commercial trucking collision. We are seeking maintenance records and driver logs. The defendant is being obstructive.

> **Input Data:** [PASTE DISCOVERY RESPONSES HERE]

> **Instructions:** > 1. Analyze each response for "boilerplate" objections (e.g., "overly broad, unduly burdensome") that lack specificity. 2. Check if the defendant agreed to produce documents but failed to provide a date certain for production. 3. Identify where the defendant claims documents do not exist for categories that are legally required to be maintained (e.g., DOT logs).

> **Output Format:** Provide a Markdown table with the following columns: | RFP # | Summary of Request | Type of Deficiency | Analysis/Reasoning | | :--- | :--- | :--- | :--- |

> **Constraint:** Do not offer legal advice. Limit your analysis strictly to whether the response meets the technical requirements of the Rules of Civil Procedure regarding specificity and completeness.

#### III Breaking it Down
Clearly, the context engineered prompt is more explicit, detailed, and constrained. Simply put, the context engineering gives you a better chance at getting the answer you wanted because you told the model how to respond to you. You would do the same with a new hire. We leave out context in every day communication and we cannot do that with AI tools. 

**1. Role Prompting ("You are a senior litigation paralegal...")**

Most AI models are text based and give you an answer in the context of their perceived role. By giving the AI a role, you prime it to use a professional, detail-oriented tone. It narrows the "probability space" of the model's vocabulary to legal terminology and civil procedure rather than general conversation.

**2. Task & Context ("Our client was injured...")**

AI models like Gemini and ChatGPT perform better when they understand the _stakes_. Telling the model this is a trucking case helps it prioritize certain documents (like maintenance logs) as high-value, which influences the "Analysis/Reasoning" column of the output.

**3. Granular Instructions (The 1-2-3 list)**

This is a form of step-by-step prompting. You are giving the model and example of what a problem looks like so it doesn't make one up. This reduces hallucinations (the model making up errors) by giving it a checklist to follow.

**4. Structured Output (The Markdown Table)**

Asking for your answer in a table (don't worry about the formatting, that is Markdown and we can cover that later) forces the LLM's responses into categories. At the very least, it is easier to parse later on.

#### IV The Power of Constraints
Telling your agent what not to do or what isn't allowed in your prompt is a powerful tool in prompt engineering, especially in the legal context. No hallucinations is an important constraint when reviewing legal documents, for example.

Constrains give you power over how your answer is presented. Do you wish the computer would give you a list of specific objections by Interrogatory Number? Just ask:
> "Format the deficiency report as a table with columns for 'Request Number,' 'Defendant Objection,' and 'Suggested Counter-argument.'"

Want to worry about damages later because you're worried the computer will get it wrong? Just ask:
> "Do not include any information regarding damages; limit this analysis strictly to the issue of liability."

Want to ensure the computer doesn't invent answers? Just ask:
> "Answer using _only_ the provided text. If the answer is not in the text, state 'Information not found.'"

#### V. What now?
The information we have covered are one of many variations on a theme, but you will achieve much better results using this information and examples as a guide. Context engineering is one of many skills that will increase your productivity as a practicing lawyer. The knowledge work economy is changing and we must adapt to the new paradigms and toolsets available to us--our clients depend on it.

If you are interested in learning more about how to incorporate AI tools into your daily workflow, continue reading my series on on [How to use AI as a practicing attorney - Level 1](/blog/how-to-use-ai-as-a-practicing-attorney---level-1)
