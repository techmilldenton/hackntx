---
layout: page
title: "Resources"
permalink: /resources
description: "Useful resources to help you throughout the day."
img: assets/img/tools.jpg
---
<p>&nbsp;</p>

For the hackathon, there are an abundant amount of resources provided by Major League Hacking as part of Local Hack Day, which includes all things in Github's Education pack and a $100 credit for Azure from Microsoft. You can find a list of all MLH resources at [http://lhd.mlh.io/live](http://lhd.mlh.io/live)

Most of the tools in here are limited to students only, but fret not! We've done our research and have created a list of free and cheap resources below that are open to anyone!

{% assign categories = "" | split: ',' %}
{% for item in site.data.resources %}
{% for cat in item.categories %}
{% assign categories = categories | push: cat %}
{% endfor %}
{% endfor %}
{% assign cats = categories | uniq %}

<div id="resources">
	<div class="ml-auto mr-auto text-center">
		<hr class="mt-5 mb-5">
		<ul class="nav nav-pills nav-pills-rose filters-button-group mb-5">
			<li class="nav-item">
				<a class="nav-link active" data-filter="all" data-toggle="tab">All</a>
			</li>
			{% for cat in cats %}
			<li class="nav-item">
				<a class="nav-link" data-filter=".{{ cat }}" data-toggle="tab">{{ cat }}</a>
			</li>
			{% endfor %}
		</ul>
		<div class="card-container row">
			{% for item in site.data.resources %}
			<div class="col-md-3 card-wrapper {{ item.categories | join: " "}}">
				<div class="card card-profile">
					<a href="{{ item.url }}" target="_blank">
						<div class="card-header card-header-image">
							<img class="img img-fluid" src="https://avatars.io/twitter/{{ item.twitter }}">
						</div>
					</a>
					<div class="card-body ">
						<h4 class="card-title">{{ item.name }}</h4>
						<h6 class="card-category text-gray">{{ item.note }}</h6>
					</div>
					<div class="card-footer">
						<div class="bootstrap-tagsinput rose-badge">
							{% for cat in item.categories %}
							<span class="tag badge">{{ cat }}</span>
							{% endfor %}
						</div>
					</div>
				</div>
			</div>
			{% endfor %}
		</div>
	</div>
</div>

<!--
As mentioned in the official Bootstrap 3 documentation (http://getbootstrap.com/components/#thumbnails): You can either do it like in this pen, or see more options at:

https://masonry.desandro.com/
https://isotope.metafizzy.co/
http://salvattore.com/
-->
