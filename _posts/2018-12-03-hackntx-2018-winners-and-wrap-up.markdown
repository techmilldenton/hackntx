---
title: "HackNTX 2018: The Results"
date: 2018-12-03T12:42:55-06:00
author: kyle
tags: hackathon
excerpt: >-
 We wrapped up our first civic tech hackathon on Saturday, December 1 at UNT Inspire Park, and our organizing team was blown away by the presentations!
img: /assets/img/event/teams.jpg
image:
  path: /assets/img/event/teams.jpg
---

What a day! We wrapped up our first civic tech hackathon on Saturday, December 1 at UNT Inspire Park, and our organizing team was blown away by the presentations! We had a wide range of participants from the very experienced and seasoned developers to kids who have never used tools like Tableu before. We even had a team take the data provided for the event and create a GraphQL API that makes the data easier to use in the future. All of them were able to learn something new and build something cool - and we'd call that a success.

Available to the teams were datasets from cities and local organizations that could serve as a foundation for their project. From the City of Denton, we had operation budget data for the past 2 years that needed to be visualized for easy summary. In addition, we had a months worth of traffic incident data from Waze, provided by the North Texas Council of Governments and [511DFW.org](http://511dfw.org). This data could've been used in a number of ways, anything from statistical analysis to predictive reporting.

## The Winners

These teams had less than 12 hours to build an open data or civic tech related project, and they definitely delivered. We had 3 teams create some very cool projects, some using the data, and others focusing on improving local governments in general.

### 3rd place: Krakatoa

A web developer and data enthusiast from Denton, Adam Krawiec, took a simplistic approach to analyzing the Waze traffic data. He imported the 937,482 records into MongoDB and made some quick statistics that could provide insight to any city official. To enrich the data, Adam implemented some simple calculations that gives a rough distance in a stretch of a cooridor that shows the density of traffic incidents by type. For example, in an approximate 11 mile stretch, 237 minor traffic accidents occured on I-35 W Southbound.

**Prize: Google Home Mini**

### 2nd place: Team Default Open Gov

While not transporation related, this team tackled a common civic problem with a very practical solution. When it comes to open data and open record requests, there can often be a lot of overhead that goes into responding to, fetching, and returning documents. By default, most government records are stored privately and not always released on time or at all until the request comes in. These requests could be reduced or eliminated by implementing a better workflow to begin with.

TDOG looked to solve that issue by creating a platform on top of Amazon Web Services (AWS) utilizing DynamoDB, S3, and other tools that creates an auto-release schedule with secure tokens for releasing public documents. When uploading a new document, an expiration date is set on the document, and once the expiration date has been met, a lock is released and that version of the document can be downloaded. With every new version of the document, a new hash is created and expiration timer added.

The team had also considered integrating this approach with blockchain technology to utilize smart contracts for releasing these documents as well.

**Prize: Team set of Google Home Minis**

### 1st place: Watch-Dumpling (predictive traffic incidents)

While their team name is completely unrelated, Dr. Shuyi Wang and Chunying Wang blew the judges away by applying deep learning to the Waze dataset that predicted traffic accidents in a specific area. After analyzing the dataset to identify traffic events, their team first identified what it means for an event to be "serious".

<blockquote class="blockquote">
	<p>What do we consider serious traffic? Minor or medium traffic flow? Probably not, so we only focused on heavy and very heavy traffic jams as the base of our model.</p>
</blockquote>

From there, their model was built to identify a pattern of events that led up to a heavy traffic jam 30 minutes before it happened. After training their model with 29 days worth of Waze traffic data in DFW, the results were fascinating. They were able to predict, up to 70% probability, when an accident or traffic would occur based on a pattern. Stopped car on road and debris on road could lead to an accident on road, and light traffic, then heavy traffic.

Given more data and more training, this algorithm could potentially be used by local governments to detect and deploy public safety patrol units to an area prior to an accident occuring or at least more quickly to help clear accidents and redirect to reduce overall traffic time.

**Prize: $100 each per team member**

### Data Sponsors

We're very grateful for the data sponsors for this event that provided the teams with challenge ideas and data to work with throughout the day, applying different perspectives and techniques on ways to manipulate and repurpose the data for good. We would especially like to highlight a few sponsors:

- North Texas Council of Governments (NTCOG)
- 511DFW.org
- Waze
- Kapsch.net

### Next Steps
If you're interested in open data or civic tech, join us in March 2019 for Open Data Day in DFW. This is a great opportunity to solve civic problems using open data in various ways. Historically, TechMill has hosted this event in Denton the past few years, but in 2019, we're working with local partners to help expand the event and make it a regional initiative as an opportunity for cities to bring their challenges to the table and see how we can address them!

Be on the lookout for the announcement, and in the meantime you can follow us on <a href="https://twitter.com/techmilldenton" class="btn btn-inline btn-sm btn-twitter">Twitter</a> and <a href="https://facebook.com/techmilldenton" class="btn btn-inline btn-sm btn-facebook">Facebook</a> to stay up to date!

<hr>
<div class="mr-auto ml-auto">
	{% include components/carousel.html slides=site.data.hack2018 %}
</div>