---
title: Investigating crash increases around data center construction sites.
summary: Have truck or car crashes increased around rural data center construction sites? I build research software to investigate.
date: 2026-01-03
type: Op-Ed
published: false
---

TO: Readers
FROM: Ben Lovell
RE: How can we use AI to research questions related to our cases and how does AI construction impact local communities?

## QUESTION PRESENTED: 
Do AI data center construction sites correlate to higher traffic wrecks around the often rural areas where these sites are located? How can we find out?

## SHORT ANSWER: 
Yes there is correlation. Local road collisions show an increase in recent years around data center construction sites considered in this research and post. Local road collisions in Potter and Randall County increased by around 20% over the past few years. Data centers are under construction is many rural areas because land is cheaper and local opposition is less likely. These projects may increase commercial vehicle traffic on interstates and especially local roads, possibly leading to an increase in car and truck crashes.

## DISCUSSION

#### I. The Results
I'll start with the results. The analysis I performed on specifically Potter and Randall counties revealed that there is a general increase in local traffic collisions in the construction site areas.

#### Executive Summary

This report isolates crash data on **local roads** (city streets, county roads) to identify neighborhood-level traffic impacts potentially linked to construction activity. Data is compared against major highway trends and regional control groups.

**Key Findings in Potter and Randall Counties:**

- **18,008** crashes on local roads (69.4% of area total)
- **+14.8%** change in local road crash rate (Pre vs Post)
- **4.5%** of post-start local crashes involved commercial vehicles

---

#### 1. Analysis Methodology
#### 1.1 Local Road Definition

"Local Roads" are defined as roadways **excluding** the state highway system (Interstates, US Highways, State Highways).

**Note:** Farm-to-Market (FM) and Ranch-to-Market (RM) roads **ARE INCLUDED** in this local road analysis.

This isolates traffic that is more likely to be residential or "last-mile" construction access.

#### 1.2 Timeline
- **Construction Start Date:** 2025-06-01 (Approximate start of Fermi/Pantex activity)
- **Pre-Period:** 41.6 months
- **Post-Period:** 6.8 months

---

#### 2. Local Road Impact Analysis

#### 2.1 Local vs. Major Road Trends

|Road Type|Pre-Construction Rate (per mo)|Post-Construction Rate (per mo)|% Change|
|---|---|---|---|
|**Local Roads**|364.4|418.5|**+14.8%**|
|Major Highways|163.9|165.4|+1.0%|

#### 2.2 Commercial Vehicle Encroachment

A key indicator of construction impact is the "spillover" of heavy trucks onto local roads.

- **Pre-Construction CMV Rate (Local):** 3.8%
- **Post-Construction CMV Rate (Local):** 4.5%
- **Change:** +0.7 percentage points

---

#### 3. Regional Context (Control Group)

Comparison with similar local roads in non-target counties:

- **Control Group Change:** -8.1%
- **Difference (Target vs Control):** +23.0%

interpretation: If the Target vs Control difference is positive, local roads in Potter/Randall are seeing a disproportionate increase in accidents compared to the region.

#### How to answer this and similar questions

In my ongoing series about [[Law Firm Research Lab]]s we are discussing how to leverage AI tools to conduct preliminary research on questions before getting an expert involved. 

I started with a bigger question covered in my post on [[Data Centers and AI's Impact on your Community]] which led to a smaller and easier to investigate question: Will the substantial increase in activity around data center construction sites lead to increased collisions? I am specifically interested in West Texas and New Mexico because that's where I practice. 

My first step was to design a research project and find the data to crunch. I started by asking Google Gemini to search and compile any research it could find related to this question. My question is too specific so I searched out publically available information covering traffic collisions in specific counties. (cite to DOT files to get the data). I started with West Texas because the New Mexico data I am interested in requires a formal request.

#### Designing Software to Crunch the Numbers

I attempted to double major in computer science and music performance as an undergraduate. I failed to do so and have a degree in classical guitar performance. I am not a software engineer. Thankfully, I don't have to be.

#### "Vibe" Coding
You may have heard the term "vibe coding" and instinctively ignored it as silly. It sounds silly but it is amazingly useful. You no longer need to know how to program a computer to write a computer program. A basic understanding of software helps you to "vibe" code but it is not required. Coding agents such as Claude Code allow anyone, lawyers even, to tell an AI model what they want to create, and watch as the model writes the code for you. You may be frustrated with the back and forth required to get the software working but it just works.

#### The Traffic Data Research Dashboard
With the help of AI, I created a piece of software that runs in my web browser that allows me to upload traffic data downloaded from the TX (whatever) website and break down how many collisions were reported in the specific areas I'm studying. I broke down the output by data center construction project and further separated out interstates such as I-40 to focus on local traffic.

(image of output)

I created a static webpage with the research report's findings

#### What this means for residents near data center construction sites
If you or someone you know was injured by a truck or commercial vehicle around construction sites in Texas, contact info@makerightlaw.com or call 

Outline:
- AI as pre-expert research
- Obtaining traffic information
- Case study - [[Data Centers and AI's Impact on your Community]]
- Check out my traffic information app
- I can help you do this